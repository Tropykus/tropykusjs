/* eslint-disable no-underscore-dangle */
import { BigNumber, ethers, FixedNumber } from 'ethers';
import StandartTokenArtifact from '../../artifacts/StandardToken.json';
import Market from '../Market';
import { getDeprecationMetadata, warnDeprecatedOnce } from '../utils/deprecation';
import { getTokenDecimals, parseTokenAmount } from '../utils/decimals';

const format = 'fixed80x18';
const factor = FixedNumber.fromString(1e18.toString(), format);

export default class CErc20 extends Market {
  constructor(tropykus, abi, contractAddress, erc20TokenAddress) {
    super(tropykus, abi, contractAddress);
    if (erc20TokenAddress === null || erc20TokenAddress === undefined) {
      throw new Error('Must provide a valid erc20 token address');
    }
    this.erc20InstanceAddress = erc20TokenAddress;
    this.erc20Instance = new ethers.Contract(
      erc20TokenAddress,
      StandartTokenArtifact.abi,
      tropykus.provider,
    );
    this.type = 'CErc20Immutable';

    // Detect and cache token decimals for accurate amount parsing/formatting
    // This supports tokens with various decimal precisions (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens)
    // Falls back to 18 decimals if detection fails (backward compatibility)
    this.tokenDecimals = null; // Will be initialized async in _initializeDecimals()
    this._decimalsPromise = this._initializeDecimals();

    // Deprecation check: We use address-based deprecation (not artifact-based) because
    // CErc20Immutable artifact is used for both listed markets (e.g., kDOC)
    // and deprecated markets (e.g., kRIF, kUSDT). If we checked by artifact,
    // deprecating CErc20Immutable would incorrectly mark all kDOC markets as
    // deprecated. By checking the contract address, we can deprecate specific
    // markets (e.g., kRIF at 0x3134b7...) without affecting other markets using
    // the same artifact (e.g., kDOC). The warning is displayed only once per
    // market instance to avoid warning spam.
    const deprecationMetadata = getDeprecationMetadata(contractAddress);
    if (deprecationMetadata) {
      const marketName = 'CErc20';
      warnDeprecatedOnce(contractAddress, marketName, deprecationMetadata);
    }
  }

  /**
   * Initialize token decimals asynchronously
   * @private
   */
  async _initializeDecimals() {
    this.tokenDecimals = await getTokenDecimals(this.erc20Instance);
    return this.tokenDecimals;
  }

  /**
   * Ensure decimals are initialized before using them
   * @private
   */
  async _ensureDecimals() {
    if (this.tokenDecimals === null) {
      await this._decimalsPromise;
    }
    return this.tokenDecimals;
  }

  /**
   * Deposits and amount in the name of a given account
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount amount to be deposit
   * @returns {Promise<Object>} transaction
   */
  async mint(account, amount) {
    const decimals = await this._ensureDecimals();
    const parsedAmount = parseTokenAmount(amount.toString(), decimals);
    
    await this.erc20Instance.connect(account.signer)
      .approve(this.address, parsedAmount);
    
    return this.instance.connect(account.signer)
      .mint(parsedAmount, { gasLimit: this.tropykus.gasLimit });
  }

  /**
   * Pays the debt from an account given
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount amount to be paid
   * @param {boolean} maxValue if true pays all debt
   * @returns {Promise<Object>} transaction
   */
  async repayBorrow(account, amount, maxValue = false) {
    if (maxValue) {
      const borrowBalance = await this.instance
        .connect(account.signer)
        .callStatic
        .borrowBalanceCurrent(account.address);
      const delta = BigNumber.from(1e18.toString());
      await this.erc20Instance.connect(account.signer)
        .approve(this.address, borrowBalance.add(delta));
      return this.instance.connect(account.signer)
        .repayBorrow(
          ethers.constants.MaxUint256,
          { gasLimit: this.tropykus.gasLimit },
        );
    }
    await this.erc20Instance.connect(account.signer)
      .approve(this.address, ethers.utils.parseEther(amount.toString()));
    return this.instance.connect(account.signer)
      .repayBorrow(
        ethers.utils.parseEther(amount.toString()),
        { gasLimit: this.tropykus.gasLimit },
      );
  }

  /**
   * Borrows an amount from the market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount amount to be borrowed
   * @returns {Promise<Object>} transaction
   */
  async borrow(account, amount) {
    const decimals = await this._ensureDecimals();
    const parsedAmount = parseTokenAmount(amount.toString(), decimals);
    
    return this.instance.connect(account.signer)
      .borrow(parsedAmount, { gasLimit: this.tropykus.gasLimit });
  }

  /**
   * Sends an amount from the given account to the address given
   * @param {object} accountFrom Object get from tropykus.getAccount()
   * @param {string} addressTo address to transfer amount
   * @param {number} amount amount to transfer
   * @returns {Promise<Object>} transaction
   */
  transferUnderlying(accountFrom, addressTo, amount) {
    return new Promise((resolve, reject) => {
      this.erc20Instance.connect(accountFrom.signer)
        .transfer(
          addressTo,
          ethers.utils.parseEther(amount.toString()),
        )
        .then(resolve)
        .catch(reject);
    });
  }

  /** Returns the balance of a given account on the underlying of this market
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Number>} balance of underlying in wallet
   */
  async balanceOfUnderlyingInWallet(account) {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    const decimals = await this._ensureDecimals();
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors based on detected decimals
    // Use BigNumber to avoid scientific notation issues with large powers
    const tokenFactorValue = BigNumber.from(10).pow(decimals).toString();
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    // Get balance and price from contracts
    const [balanceMantissa, priceMantissa] = await Promise.all([
      this.erc20Instance.connect(account.signer)
        .balanceOf(account.address),
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
    ]);
    
    // Convert price from oracle decimals to human-readable
    const price = FixedNumber.from(priceMantissa.toString(), format)
      .divUnsafe(oracleFactor);
    
    // Convert balance from token decimals to human-readable
    const underlying = FixedNumber.from(balanceMantissa.toString(), format)
      .divUnsafe(tokenFactor);
    
    // Calculate USD value: underlying (human-readable) * price (human-readable)
    const usd = underlying.mulUnsafe(price);
    
    return {
      underlying: {
        value: Number(underlying._value),
        fixedNumber: underlying,
      },
      usd: {
        value: Number(usd._value),
        fixedNumber: usd,
      },
    };
  }

  getUnderlyingSymbol() {
    return new Promise((resolve, reject) => {
      this.erc20Instance.callStatic.symbol()
        .then(resolve)
        .catch(reject);
    });
  }
}
