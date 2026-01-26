/* eslint-disable no-underscore-dangle */
import { BigNumber, ethers, FixedNumber } from 'ethers';
import StandartTokenArtifact from '../../artifacts/StandardToken.json';
import Market from '../Market';
import { getDeprecationMetadata, warnDeprecatedOnce } from '../utils/deprecation';
import { getTokenDecimals, parseTokenAmount } from '../utils/decimals';

const format = 'fixed80x18';

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
   * Initialize token decimals asynchronously by detecting the decimal precision
   * from the underlying ERC20 token contract.
   * 
   * @private
   * @returns {Promise<number>} The detected token decimal precision (0-255, defaults to 18)
   * @description
   * Detects the decimal precision of the underlying token by calling the decimals() function
   * on the ERC20 contract. Supports tokens with various decimal precisions:
   * - 6 decimals: USDT, USDC
   * - 8 decimals: WBTC
   * - 18 decimals: Standard ERC20 tokens (default fallback)
   * Falls back to 18 decimals if detection fails for backward compatibility.
   */
  async _initializeDecimals() {
    this.tokenDecimals = await getTokenDecimals(this.erc20Instance);
    return this.tokenDecimals;
  }

  /**
   * Ensure decimals are initialized before using them.
   * Waits for the async decimal detection to complete if not already initialized.
   * 
   * @private
   * @returns {Promise<number>} The token decimal precision (0-255, defaults to 18)
   * @description
   * This method ensures that token decimals have been detected and cached before
   * they are used in amount parsing/formatting operations. If decimals are not yet
   * initialized, it waits for the initialization promise to complete.
   */
  async _ensureDecimals() {
    if (this.tokenDecimals === null) {
      await this._decimalsPromise;
    }
    return this.tokenDecimals;
  }

  /**
   * Get the token factor (10^tokenDecimals) as a FixedNumber
   * @private
   * @returns {Promise<FixedNumber>} The token factor
   */
  async _getTokenFactor() {
    const decimals = await this._ensureDecimals();
    const tokenFactorValue = BigNumber.from(10).pow(decimals).toString();
    return FixedNumber.fromString(tokenFactorValue, format);
  }

  /**
   * Deposits an amount in the name of a given account.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount Amount to be deposited (human-readable format)
   * @returns {Promise<Object>} Transaction object
   * @description
   * Deposits the specified amount of underlying tokens into the market. The amount
   * is automatically parsed using the detected token decimal precision, supporting
   * tokens with various decimal precisions (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens).
   * The method first approves the market contract to spend the tokens, then mints cTokens.
   * 
   * @example
   * // For a 6-decimal token (USDT), 1.5 tokens = 1500000 in contract format
   * await cusdt.mint(account, 1.5);
   * 
   * @example
   * // For an 18-decimal token, 1.0 tokens = 1000000000000000000 in contract format
   * await cdoc.mint(account, 1.0);
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
   * Pays the debt from an account given.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount Amount to be paid (human-readable format). Ignored if maxValue is true.
   * @param {boolean} maxValue If true, pays all debt (ignores amount parameter)
   * @returns {Promise<Object>} Transaction object
   * @description
   * Repays a borrow debt for the specified account. The amount is automatically parsed
   * using the detected token decimal precision, supporting tokens with various decimal
   * precisions (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens).
   * 
   * When maxValue is true, the method:
   * - Calculates the current borrow balance
   * - Adds a small delta (10^tokenDecimals) to account for interest accrual
   * - Approves and repays the maximum amount
   * 
   * The delta calculation uses dynamic token decimals instead of hardcoded 1e18,
   * ensuring correct behavior for non-18-decimal tokens.
   * 
   * @example
   * // Partial repay: 10.5 USDT (6 decimals = 10500000 in contract format)
   * await cusdt.repayBorrow(account, 10.5);
   * 
   * @example
   * // Full repay: pays all debt including accrued interest
   * await cusdt.repayBorrow(account, null, true);
   */
  async repayBorrow(account, amount, maxValue = false) {
    const decimals = await this._ensureDecimals();
    
    if (maxValue) {
      const borrowBalance = await this.instance
        .connect(account.signer)
        .callStatic
        .borrowBalanceCurrent(account.address);
      // Use token decimals for delta instead of hardcoded 1e18
      const delta = BigNumber.from(10).pow(decimals);
      await this.erc20Instance.connect(account.signer)
        .approve(this.address, borrowBalance.add(delta));
      return this.instance.connect(account.signer)
        .repayBorrow(
          ethers.constants.MaxUint256,
          { gasLimit: this.tropykus.gasLimit },
        );
    }
    const parsedAmount = parseTokenAmount(amount.toString(), decimals);
    await this.erc20Instance.connect(account.signer)
      .approve(this.address, parsedAmount);
    return this.instance.connect(account.signer)
      .repayBorrow(
        parsedAmount,
        { gasLimit: this.tropykus.gasLimit },
      );
  }

  /**
   * Borrows an amount from the market.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount Amount to be borrowed (human-readable format)
   * @returns {Promise<Object>} Transaction object
   * @description
   * Borrows the specified amount of underlying tokens from the market. The amount
   * is automatically parsed using the detected token decimal precision, supporting
   * tokens with various decimal precisions (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens).
   * 
   * The account must have sufficient collateral in the market to borrow the requested amount.
   * 
   * @example
   * // Borrow 10.5 USDT (6 decimals = 10500000 in contract format)
   * await cusdt.borrow(account, 10.5);
   * 
   * @example
   * // Borrow 1.0 DOC (18 decimals = 1000000000000000000 in contract format)
   * await cdoc.borrow(account, 1.0);
   */
  async borrow(account, amount) {
    const decimals = await this._ensureDecimals();
    const parsedAmount = parseTokenAmount(amount.toString(), decimals);
    
    return this.instance.connect(account.signer)
      .borrow(parsedAmount, { gasLimit: this.tropykus.gasLimit });
  }

  /**
   * Sends an amount from the given account to the address given.
   * 
   * @param {object} accountFrom Object get from tropykus.getAccount()
   * @param {string} addressTo Address to transfer amount to
   * @param {number} amount Amount to transfer (human-readable format)
   * @returns {Promise<Object>} Transaction object
   * @description
   * Transfers the specified amount of underlying tokens from the given account to
   * the specified address. The amount is automatically parsed using the detected token
   * decimal precision, supporting tokens with various decimal precisions
   * (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens).
   * 
   * @example
   * // Transfer 12.5 USDT (6 decimals = 12500000 in contract format)
   * await cusdt.transferUnderlying(account, recipientAddress, 12.5);
   */
  async transferUnderlying(accountFrom, addressTo, amount) {
    const decimals = await this._ensureDecimals();
    const parsedAmount = parseTokenAmount(amount.toString(), decimals);
    
    return this.erc20Instance.connect(accountFrom.signer)
      .transfer(addressTo, parsedAmount);
  }

  /**
   * Returns the balance of a given account on the underlying token in their wallet.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Object>} Balance information with underlying and USD values
   * @returns {Promise<Object.underlying>} Underlying balance information
   * @returns {Promise<number>} Object.underlying.value Human-readable underlying token balance
   * @returns {Promise<FixedNumber>} Object.underlying.fixedNumber FixedNumber representation of underlying balance
   * @returns {Promise<Object.usd>} USD value information
   * @returns {Promise<number>} Object.usd.value Human-readable USD value of the balance
   * @returns {Promise<FixedNumber>} Object.usd.fixedNumber FixedNumber representation of USD value
   * @description
   * Gets the underlying token balance in the account's wallet and calculates its USD value.
   * 
   * This method dynamically detects:
   * - Token decimals: From the underlying ERC20 token contract (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens)
   * - Oracle decimals: From the price oracle adapter (18 for MoC adapter, 30 for USDT adapter, default 18)
   * 
   * Both the underlying balance and price are converted to human-readable format using their
   * respective decimal precisions before calculating the USD value, ensuring accurate
   * calculations for tokens with non-standard decimal precisions.
   * 
   * @example
   * const balance = await cusdt.balanceOfUnderlyingInWallet(account);
   * // For 100000 USDT (6 decimals) at $1.00 price:
   * // balance.underlying.value = 100000
   * // balance.usd.value = 100000
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

  /**
   * Redeems an amount from the market.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount Amount to be redeemed in underlying tokens (human-readable format). Ignored if maxValue is true.
   * @param {boolean} maxValue If true, redeems all kTokens (ignores amount parameter)
   * @returns {Promise<Object>} Transaction object
   * @description
   * Redeems the specified amount of underlying tokens from the market by burning cTokens.
   * The amount is automatically parsed using the detected token decimal precision, supporting
   * tokens with various decimal precisions (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens).
   * 
   * When maxValue is true, the method redeems all cTokens owned by the account, converting
   * them back to underlying tokens at the current exchange rate.
   * 
   * @example
   * // Partial redeem: 10.5 USDT (6 decimals = 10500000 in contract format)
   * await cusdt.redeem(account, 10.5);
   * 
   * @example
   * // Full redeem: redeems all cTokens
   * await cusdt.redeem(account, null, true);
   */
  async redeem(account, amount, maxValue = false) {
    if (maxValue) {
      const kTokens = await this.instance.callStatic.balanceOf(account.address);
      return this.instance.connect(account.signer)
        .redeem(kTokens, { gasLimit: this.tropykus.gasLimit });
    }
    const decimals = await this._ensureDecimals();
    const parsedAmount = parseTokenAmount(amount.toString(), decimals);
    
    return this.instance.connect(account.signer)
      .redeemUnderlying(parsedAmount, { gasLimit: this.tropykus.gasLimit });
  }

  getUnderlyingSymbol() {
    return new Promise((resolve, reject) => {
      this.erc20Instance.callStatic.symbol()
        .then(resolve)
        .catch(reject);
    });
  }
}
