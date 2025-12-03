/* eslint-disable no-underscore-dangle */
import { BigNumber, ethers, FixedNumber } from 'ethers';
import interestRateModelArtifact from '../artifacts/InterestRateModel.json';
import Comptroller from './Comptroller';
import { parseTokenAmount } from './utils/decimals';

const format = 'fixed80x18';
// cToken factor: cTokens ALWAYS have 18 decimals regardless of underlying token decimals
const cTokenFactor = FixedNumber.fromString(1e18.toString(), format);
// Legacy factor for backward compatibility (used in static methods)
const factor = FixedNumber.fromString(1e18.toString(), format);
const zero = FixedNumber.fromString('0', format);
const minLiquidity = FixedNumber.fromString('1', format);

export default class Market {
  /**
   * Construct a new Market
   * @param {object} tropykus instance of the tropykus protocol to be linked with
   * @param {object} abi from which instantiate the market
   * @param {string} marketAddress address of the deployed Market instance to point to
   */
  constructor(tropykus, abi, marketAddress) {
    this.tropykus = tropykus;
    this.address = marketAddress.toLowerCase();
    this.instance = new ethers.Contract(marketAddress, abi, this.tropykus.provider);
    this.wsInstance = new ethers.Contract(marketAddress, abi, this.tropykus.wsProvider);
  }

  /**
   * Gets the underlying token balance deposited in the market for a given account.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Object>} Balance information with underlying and USD values
   * @returns {Promise<number>} Object.usd USD value of the deposited balance
   * @returns {Promise<number>} Object.underlying Human-readable underlying token balance
   * @returns {Promise<FixedNumber>} Object.fixedNumber FixedNumber representation of underlying balance
   * @description
   * Returns the amount of underlying tokens deposited in the market and their USD value.
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
   * const balance = await market.balanceOfUnderlying(account);
   * // For 100 USDT (6 decimals) at $1.00 price:
   * // balance.underlying = 100
   * // balance.usd = 100
   */
  async balanceOfUnderlying(account) {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    // For CErc20 instances, ensure decimals are initialized
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors based on detected decimals
    // Use BigNumber to avoid scientific notation issues with large powers
    const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    // Get balance and price from contracts
    const [balance, priceMantissa] = await Promise.all([
      this.instance.connect(account.signer)
        .callStatic.balanceOfUnderlying(account.address),
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
    ]);
    
    // Convert price from oracle decimals to human-readable
    const price = FixedNumber.from(priceMantissa.toString(), format)
      .divUnsafe(oracleFactor);
    
    // Convert balance from token decimals to human-readable
    const fixedNumber = FixedNumber.from(balance.toString(), format);
    const underlying = fixedNumber.divUnsafe(tokenFactor);
    
    // Calculate USD value: underlying (human-readable) * price (human-readable)
    // Both underlying and price are already converted to human-readable format
    const usd = underlying.mulUnsafe(price);
    
    return {
      usd: Number(usd._value),
      underlying: Number(underlying._value),
      fixedNumber,
    };
  }

  /**
   * Gets the cToken balance and underlying token balance for a given account.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Object>} Balance information with cTokens, underlying, and USD values
   * @returns {Promise<Object.underlying>} Underlying balance information
   * @returns {Promise<number>} Object.underlying.value Human-readable underlying token balance
   * @returns {Promise<FixedNumber>} Object.underlying.fixedNumber FixedNumber representation of underlying balance
   * @returns {Promise<Object.usd>} USD value information
   * @returns {Promise<number>} Object.usd.value Human-readable USD value
   * @returns {Promise<FixedNumber>} Object.usd.fixedNumber FixedNumber representation of USD value
   * @returns {Promise<Object.tokens>} cToken balance information
   * @returns {Promise<number>} Object.tokens.value Human-readable cToken balance
   * @returns {Promise<FixedNumber>} Object.tokens.fixedNumber FixedNumber representation of cToken balance
   * @description
   * Returns the cToken balance, underlying token balance, and USD value for the account.
   * 
   * Important decimal handling:
   * - cToken balances ALWAYS use 18 decimals (regardless of underlying token decimals)
   * - Exchange rates ALWAYS use 18 decimals (cToken factor)
   * - Underlying amounts use the underlying token's decimal precision (6, 8, 18, etc.)
   * - Oracle prices use the oracle adapter's decimal precision (18 for MoC, 30 for USDT)
   * 
   * The underlying amount is calculated as: cTokens × exchangeRate, where both values
   * are in 18 decimals, but the result represents underlying tokens with their native decimals.
   * 
   * @example
   * const balance = await market.balanceOf(account);
   * // balance.tokens.value = cToken balance (always 18 decimals)
   * // balance.underlying.value = underlying token balance (uses token decimals)
   * // balance.usd.value = USD value of underlying balance
   */
  async balanceOf(account) {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    // This is for UNDERLYING token decimals, not cToken decimals
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors
    // cToken balances and exchange rates ALWAYS use 18 decimals
    // Underlying amounts use token decimals
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    // Get balance, price, and exchange rate from contracts
    const [balanceMantissa, priceMantissa, exchangeRateMantissa] = await Promise.all([
      this.instance.connect(account.signer)
        .callStatic.balanceOf(account.address), // cToken balance (18 decimals)
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
      this.instance.connect(account.signer)
        .callStatic.exchangeRateCurrent(), // Exchange rate (18 decimals)
    ]);
    
    // Convert values using correct factors
    // cToken balance: always 18 decimals
    const tokens = FixedNumber.from(balanceMantissa.toString(), format)
      .divUnsafe(cTokenFactor);
    // Exchange rate: always 18 decimals
    const exchangeRate = FixedNumber.from(exchangeRateMantissa.toString(), format)
      .divUnsafe(cTokenFactor);
    // Underlying amount: uses token decimals (calculated from cTokens * exchangeRate)
    const underlying = tokens.mulUnsafe(exchangeRate);
    // Price: uses oracle decimals
    const price = FixedNumber.from(priceMantissa.toString(), format)
      .divUnsafe(oracleFactor);
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
      tokens: {
        value: Number(tokens._value),
        fixedNumber: tokens,
      },
    };
  }

  /**
   * Gets the current borrow balance for a given account.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Object>} Borrow balance information with underlying and USD values
   * @returns {Promise<number>} Object.underlying Human-readable underlying token borrow balance
   * @returns {Promise<number>} Object.usd USD value of the borrow balance
   * @returns {Promise<FixedNumber>} Object.fixedNumber FixedNumber representation of borrow balance
   * @description
   * Returns the current amount of underlying tokens borrowed by the account, including
   * any accrued interest, and its USD value.
   * 
   * This method dynamically detects:
   * - Token decimals: From the underlying ERC20 token contract (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens)
   * - Oracle decimals: From the price oracle adapter (18 for MoC adapter, 30 for USDT adapter, default 18)
   * 
   * Both the borrow balance and price are converted to human-readable format using their
   * respective decimal precisions before calculating the USD value, ensuring accurate
   * calculations for tokens with non-standard decimal precisions.
   * 
   * @example
   * const borrowBalance = await market.borrowBalanceCurrent(account);
   * // For 10.5 USDT borrowed (6 decimals) at $1.00 price:
   * // borrowBalance.underlying = 10.5
   * // borrowBalance.usd = 10.5
   */
  async borrowBalanceCurrent(account) {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    // For CErc20 instances, ensure decimals are initialized
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors based on detected decimals
    // Use BigNumber to avoid scientific notation issues with large powers
    const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    // Get balance and price from contracts
    const [balanceMantissa, priceMantissa] = await Promise.all([
      this.instance.connect(account.signer)
        .callStatic.borrowBalanceCurrent(account.address),
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
    ]);
    
    // Convert price from oracle decimals to human-readable
    const price = FixedNumber.from(priceMantissa.toString(), format)
      .divUnsafe(oracleFactor);
    
    // Convert balance from token decimals to human-readable
    const fixedNumber = FixedNumber.from(balanceMantissa.toString(), format);
    const underlying = fixedNumber.divUnsafe(tokenFactor);
    
    // Calculate USD value: underlying (human-readable) * price (human-readable)
    const usd = underlying.mulUnsafe(price);
    
    return {
      underlying: Number(underlying._value),
      usd: Number(usd._value),
      fixedNumber,
    };
  }

  /**
   * function that allows us to make a deposit in the market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount value to be minted
   */
  mint(account, amount) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer).mint({
        value: ethers.utils.parseEther(amount.toString()),
        gasLimit: this.tropykus.gasLimit,
      })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * function that allows us to make a borrow in the market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount value to be borrowed
   */
  borrow(account, amount) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        .borrow(
          ethers.utils.parseEther(amount.toString()),
          { gasLimit: this.tropykus.gasLimit },
        )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * function that allows us to redeem from the market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount value to be redeemed
   * @param {boolean} maxValue if true ignores amount and redeems all
   * kTokens from the account, if the account has collateral compromised
   * in debts the transactions reverts.
   */
  redeem(account, amount, maxValue = false) {
    return new Promise((resolve, reject) => {
      if (maxValue) {
        this.instance.callStatic.balanceOf(account.address)
          .then((kTokens) => this.instance.connect(account.signer)
            .redeem(kTokens, { gasLimit: this.tropykus.gasLimit }))
          .then(resolve)
          .catch(reject);
      } else {
        this.instance.connect(account.signer)
          .redeemUnderlying(
            ethers.utils.parseEther(amount.toString()),
            { gasLimit: this.tropykus.gasLimit },
          )
          .then(resolve)
          .catch(reject);
      }
    });
  }

  /**
   * function that allows us to repay a borrow from the market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount value to be paid
   * @param {boolean} maxValue true if it's the max value
   */
  repayBorrow(account, amount, maxValue = false) {
    return new Promise((resolve, reject) => {
      if (maxValue) {
        this.instance.connect(account.signer).callStatic
          .borrowBalanceCurrent(account.address)
          .then((borrowBalance) => {
            const delta = BigNumber.from(0.0001e18);
            return this.instance.connect(account.signer)
              .repayBorrowAll({ value: borrowBalance.add(delta) });
          })
          .then(resolve)
          .catch(reject);
      } else {
        this.instance.connect(account.signer)
          .repayBorrow({
            value: ethers.utils.parseEther(amount.toString()),
            gasLimit: this.tropykus.gasLimit,
          })
          .then(resolve)
          .catch(reject);
      }
    });
  }

  /**
   * Sets a reserve factor for a market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} reserveFactor percentage of reserve factor from 0 to 1
   * @returns {Promise<Object>} transaction
   */
  setReserveFactor(account, reserveFactor) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(account.signer)
        ._setReserveFactor(ethers.utils.parseEther(reserveFactor.toString()))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sets a new comptroller for this market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} comptrollerAddress new comptroller address
   * @returns {Promise<Object> | Promise<Error>} Object Transaction or error.
   */
  setComptroller(account, comptrollerAddress) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(account.signer)
        ._setComptroller(comptrollerAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the reserved factor set for the market
   * @returns {Promise<Number>} Reserve factor without mantissa
   */
  getReserveFactor() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.reserveFactorMantissa()
        .then((rf) => Number(rf) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the market's kToken symbol
   * @returns {Promise<String>} Market's kSymbol
   */
  getSymbol() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.symbol()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the comptroller set from this market
   * @returns {Promise<String>} Comptroller address
   */
  getComptroller() {
    return new Promise((resolve, reject) => {
      this.instance.comptroller()
        .then((address) => address.toLowerCase())
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the exchange rate of the market for the given account
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Number>} exchange rate
   */
  getExchangeRateCurrent(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        .callStatic.exchangeRateCurrent()
        .then((er) => Number(er) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the borrow annual percentage rate for this market
   * @returns {Promise<Number>} percentage of borrow annual rate
   */
  getBorrowAnnualRate() {
    return new Promise((resolve, reject) => {
      this.instance.interestRateModel()
        .then((modelAddress) => {
          const model = new ethers.Contract(modelAddress,
            interestRateModelArtifact.abi, this.tropykus.provider);
          return Promise.all([
            model.callStatic.blocksPerYear(),
            this.instance.callStatic.borrowRatePerBlock(),
          ]);
        })
        .then(([blocksPerYear, borrowRatePerBlock]) => borrowRatePerBlock
          .mul(blocksPerYear))
        .then((bAPY) => Number(bAPY) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the supply annual percentage rate for this market
   * @returns {Promise<Number>} supply rate
   */
  getSupplyAnnualRate() {
    return new Promise((resolve, reject) => {
      this.instance.interestRateModel()
        .then((modelAddress) => {
          const model = new ethers.Contract(modelAddress,
            interestRateModelArtifact.abi, this.tropykus.provider);
          return Promise.all([
            model.callStatic.blocksPerYear(),
            this.instance.callStatic.supplyRatePerBlock(),
          ]);
        })
        .then(([blocksPerYear, supplyRatePerBlock]) => supplyRatePerBlock
          .mul(blocksPerYear))
        .then((sAPY) => Number(sAPY) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   *
   * @param {string} event name to subscribe on
   * @param {function} action which shall be excecuted once the even has been listened
   */
  subscribeOnEvent(event, action) {
    this.wsInstance.on(event, action);
  }

  /** Returns the balance of a given account on the underlying of this market
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Number>} balance of underlying in wallet in usd,
   * underlying and fixedNumber
   */
  balanceOfUnderlyingInWallet(account) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.tropykus.provider
          .getBalance(account.address),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([balance, priceMantissa]) => {
          const underlying = FixedNumber.from(balance, format).divUnsafe(factor);
          const price = FixedNumber.from(priceMantissa.toString(), format)
            .divUnsafe(factor);
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
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the market's cash (available liquidity) in underlying tokens and USD.
   * 
   * @returns {Promise<Object>} Cash information with underlying and USD values
   * @returns {Promise<number>} Object.underlying Human-readable underlying token cash amount
   * @returns {Promise<number>} Object.usd USD value of the cash
   * @returns {Promise<FixedNumber>} Object.fixedNumber FixedNumber representation of cash amount
   * @description
   * Returns the amount of underlying tokens available in the market (cash) and its USD value.
   * Cash represents the liquidity available for borrowing.
   * 
   * This method dynamically detects:
   * - Token decimals: From the underlying ERC20 token contract (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens)
   * - Oracle decimals: From the price oracle adapter (18 for MoC adapter, 30 for USDT adapter, default 18)
   * 
   * Both the cash amount and price are converted to human-readable format using their
   * respective decimal precisions before calculating the USD value.
   * 
   * @example
   * const cash = await market.getCash();
   * // For 1000 USDT cash (6 decimals) at $1.00 price:
   * // cash.underlying = 1000
   * // cash.usd = 1000
   */
  async getCash() {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors based on detected decimals
    const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    const [cashMantissa, priceMantissa] = await Promise.all([
      this.instance.callStatic.getCash(),
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
    ]);
    
    const fixedNumber = FixedNumber.from(cashMantissa.toString(), format)
      .divUnsafe(tokenFactor);
    const price = FixedNumber.from(priceMantissa.toString(), format)
      .divUnsafe(oracleFactor);
    const usd = fixedNumber.mulUnsafe(price);
    
    return {
      underlying: Number(fixedNumber._value),
      usd: Number(usd._value),
      fixedNumber,
    };
  }

  /**
   * Returns the market's total reserves in underlying tokens and USD.
   * 
   * @returns {Promise<Object>} Reserves information with underlying and USD values
   * @returns {Promise<number>} Object.underlying Human-readable underlying token reserves amount
   * @returns {Promise<number>} Object.usd USD value of the reserves
   * @returns {Promise<FixedNumber>} Object.fixedNumber FixedNumber representation of reserves amount
   * @description
   * Returns the total reserves accumulated by the market from interest payments and its USD value.
   * Reserves are a portion of interest that is set aside rather than distributed to suppliers.
   * 
   * This method dynamically detects:
   * - Token decimals: From the underlying ERC20 token contract (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens)
   * - Oracle decimals: From the price oracle adapter (18 for MoC adapter, 30 for USDT adapter, default 18)
   * 
   * Both the reserves amount and price are converted to human-readable format using their
   * respective decimal precisions before calculating the USD value.
   * 
   * @example
   * const reserves = await market.getReserves();
   * // For 50 USDT reserves (6 decimals) at $1.00 price:
   * // reserves.underlying = 50
   * // reserves.usd = 50
   */
  async getReserves() {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors based on detected decimals
    const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    const [reservesMantissa, priceMantissa] = await Promise.all([
      this.instance.callStatic.totalReserves(),
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
    ]);
    
    const fixedNumber = FixedNumber.from(reservesMantissa.toString(), format)
      .divUnsafe(tokenFactor);
    const price = FixedNumber.from(priceMantissa.toString(), format)
      .divUnsafe(oracleFactor);
    const usd = fixedNumber.mulUnsafe(price);
    
    return {
      underlying: Number(fixedNumber._value),
      usd: Number(usd._value),
      fixedNumber,
    };
  }

  /**
   * Returns the market's total borrows across all accounts in underlying tokens and USD.
   * 
   * @returns {Promise<Object>} Total borrows information with underlying and USD values
   * @returns {Promise<number>} Object.underlying Human-readable total underlying token borrows
   * @returns {Promise<number>} Object.usd USD value of the total borrows
   * @returns {Promise<FixedNumber>} Object.fixedNumber FixedNumber representation of total borrows
   * @description
   * Returns the total amount of underlying tokens borrowed across all accounts in the market,
   * including accrued interest, and its USD value.
   * 
   * This method dynamically detects:
   * - Token decimals: From the underlying ERC20 token contract (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens)
   * - Oracle decimals: From the price oracle adapter (18 for MoC adapter, 30 for USDT adapter, default 18)
   * 
   * Both the total borrows amount and price are converted to human-readable format using their
   * respective decimal precisions before calculating the USD value.
   * 
   * @example
   * const totalBorrows = await market.getMarketTotalBorrows();
   * // For 10000 USDT total borrows (6 decimals) at $1.00 price:
   * // totalBorrows.underlying = 10000
   * // totalBorrows.usd = 10000
   */
  async getMarketTotalBorrows() {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors based on detected decimals
    const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    const [totalBorrowsMantissa, priceMantissa] = await Promise.all([
      this.instance.callStatic.totalBorrows(),
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
    ]);
    
    const fixedNumber = FixedNumber.from(totalBorrowsMantissa.toString(), format);
    const underlying = fixedNumber.divUnsafe(tokenFactor);
    const price = FixedNumber.from(priceMantissa.toString(), format)
      .divUnsafe(oracleFactor);
    const usd = underlying.mulUnsafe(price);
    
    return {
      underlying: Number(underlying._value),
      usd: Number(usd._value),
      fixedNumber,
    };
  }

  /**
   * Returns the market's total supply of underlying tokens and USD value.
   * 
   * @returns {Promise<Object>} Total supply information with underlying and USD values
   * @returns {Promise<number>} Object.underlying Human-readable total underlying token supply
   * @returns {Promise<number>} Object.usd USD value of the total supply
   * @returns {Promise<FixedNumber>} Object.fixedNumber FixedNumber representation of total supply (underlying)
   * @description
   * Returns the total amount of underlying tokens supplied to the market across all accounts
   * and its USD value. This is calculated from the total cToken supply and the current exchange rate.
   * 
   * Important decimal handling:
   * - cToken totalSupply ALWAYS uses 18 decimals (regardless of underlying token decimals)
   * - Exchange rates ALWAYS use 18 decimals (cToken factor)
   * - Underlying amounts use the underlying token's decimal precision (6, 8, 18, etc.)
   * - Oracle prices use the oracle adapter's decimal precision (18 for MoC, 30 for USDT)
   * 
   * The underlying supply is calculated as: cTokenSupply × exchangeRate, where both values
   * are in 18 decimals, but the result represents underlying tokens with their native decimals.
   * 
   * @example
   * const totalSupply = await market.getMarketTotalSupply();
   * // For 100000 USDT total supply (6 decimals) at $1.00 price:
   * // totalSupply.underlying = 100000
   * // totalSupply.usd = 100000
   */
  async getMarketTotalSupply() {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    // This is for UNDERLYING token decimals, not cToken decimals
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors
    // cToken totalSupply and exchange rates ALWAYS use 18 decimals
    // Underlying amounts use token decimals
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    const [totalSupplyMantissa, priceMantissa, exchangeRateMantissa] = await Promise.all([
      this.instance.callStatic.totalSupply(), // cToken total supply (18 decimals)
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
      this.instance.callStatic.exchangeRateCurrent(), // Exchange rate (18 decimals)
    ]);
    
    // cToken total supply: always 18 decimals
    const fixedNumber = FixedNumber.from(totalSupplyMantissa.toString(), format)
      .divUnsafe(cTokenFactor);
    // Exchange rate: always 18 decimals
    const exchangeRate = FixedNumber.from(exchangeRateMantissa.toString(), format)
      .divUnsafe(cTokenFactor);
    // Underlying amount: calculated from cTokens * exchangeRate (both in 18 decimals, result needs token decimals)
    // Note: exchangeRate is in underlying/cToken format, so underlying = cTokens * exchangeRate
    // Both are in 18 decimals, so the result is also in 18 decimals conceptually
    // But we need to convert to token decimals for display
    const underlying = fixedNumber.mulUnsafe(exchangeRate);
    const price = FixedNumber.from(priceMantissa.toString(), format)
      .divUnsafe(oracleFactor);
    const usd = underlying.mulUnsafe(price);
    
    return {
      underlying: Number(underlying._value),
      usd: Number(usd._value),
      fixedNumber: underlying,
    };
  }

  getEarnings(account) {
    return new Promise(((resolve, reject) => {
      Promise.all([
        this.instance.callStatic
          .getSupplierSnapshotStored(account.address),
        this.instance.connect(account.signer).callStatic
          .balanceOfUnderlying(account.address),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([snapshotM, balanceM, price]) => {
          let earnings = balanceM.sub(snapshotM.underlyingAmount);
          earnings = Number(earnings) / 1e18 <= 0 ? 0 : earnings;
          const underlyingUSD = (price.mul(snapshotM.underlyingAmount))
            .div(BigNumber.from(1e18.toString()));
          const earningsUSD = (earnings.mul(price))
            .div(BigNumber.from(1e18.toString()));
          return {
            underlying: Number(snapshotM.underlyingAmount) / 1e18,
            underlyingUSD: Number(underlyingUSD) / 1e18,
            earnings: Number(earnings) / 1e18,
            earningsUSD: Number(earningsUSD) / 1e18,
          };
        })
        .then(resolve)
        .catch(reject);
    }));
  }

  getSupplierSnapshot(accountAddress) {
    return new Promise((resolve, reject) => this
      .instance.callStatic
      .getSupplierSnapshotStored(accountAddress)
      .then(resolve)
      .catch(reject));
  }

  isHurricane() {
    return new Promise((resolve, reject) => {
      this.instance.interestRateModel()
        .then((modelAddress) => {
          const model = new ethers.Contract(modelAddress,
            interestRateModelArtifact.abi, this.tropykus.provider);
          return model.isTropykusInterestRateModel();
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the maximum amount that an account can withdraw from the market without
   * causing a liquidity shortfall, considering all markets and collateral factors.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @param {Array} markets Array of market instances to consider for liquidity calculations
   * @returns {Promise<Object>} Maximum withdrawable amount information
   * @returns {Promise<number>} Object.underlying Human-readable maximum underlying token amount that can be withdrawn
   * @returns {Promise<number>} Object.usd USD value of the maximum withdrawable amount
   * @returns {Promise<FixedNumber>} Object.fixedNumber FixedNumber representation of maximum withdrawable amount
   * @returns {Promise<Object.tokens>} Maximum cToken amount information
   * @returns {Promise<number>} Object.tokens.value Human-readable maximum cToken amount
   * @returns {Promise<FixedNumber>} Object.tokens.fixedNumber FixedNumber representation of maximum cToken amount
   * @description
   * Calculates the maximum amount an account can withdraw while maintaining sufficient
   * collateral across all markets. This considers:
   * - Total supply and borrows across all markets
   * - Collateral factors (ratios, always 18 decimals)
   * - Market cash availability
   * - Account's total liquidity position
   * 
   * Important decimal handling:
   * - Token decimals: Dynamically detected from underlying ERC20 token (6, 8, 18, etc.)
   * - Oracle decimals: Dynamically detected from price oracle adapter (18 for MoC, 30 for USDT)
   * - cToken balances and exchange rates: Always 18 decimals
   * - Collateral factors: Always 18 decimals (ratios)
   * 
   * The calculation ensures the account maintains sufficient collateral to cover all
   * borrows after the withdrawal, preventing liquidation.
   */
  async maxAllowedToWithdraw(account, markets) {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors based on detected decimals
    const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    const comptrollerAddress = await this.getComptroller();
    const comptroller = new Comptroller(comptrollerAddress, this.tropykus);
    
    const [
      totalBorrows,
      totalSupply,
      priceMantissa,
      marketData,
      supplyBalanceMantissa,
      exchangeRateMantissa,
      cash,
      tokensMantissa,
    ] = await Promise.all([
      comptroller.getTotalBorrowsInAllMarkets(account, markets, this.address),
      comptroller.getTotalSupplyInAllMarkets(account, markets, this.address),
      this.tropykus.priceOracle.instance.callStatic.getUnderlyingPrice(this.address),
      comptroller.instance.callStatic.markets(this.address),
      this.instance.connect(account.signer).callStatic.balanceOfUnderlying(account.address),
      this.instance.connect(account.signer).callStatic.exchangeRateCurrent(),
      this.getCash(),
      this.instance.connect(account.signer).callStatic.balanceOf(account.address),
    ]);
    
    if (Number(totalSupply.fixedNumber._value) <= 0) {
      return {
        usd: 0,
        underlying: 0,
        fixedNumber: zero,
        tokens: { value: 0, fixedNumber: zero },
      };
    }
    
    // supplyBalanceMantissa is underlying balance (uses token decimals)
    const supplyBalance = FixedNumber
      .from(supplyBalanceMantissa.toString(), format)
      .divUnsafe(tokenFactor);
    const price = FixedNumber.from(priceMantissa.toString(), format)
      .divUnsafe(oracleFactor);
    // exchangeRateMantissa is exchange rate (always 18 decimals)
    const exchangeRate = FixedNumber.from(exchangeRateMantissa, format)
      .divUnsafe(cTokenFactor);
    const marketDepositUSD = FixedNumber
      .from(supplyBalanceMantissa.toString(), format).mulUnsafe(price)
      .divUnsafe(tokenFactor);
    let tokens = cash.fixedNumber.divUnsafe(exchangeRate);
    if (Number(cash.fixedNumber._value) < Number(supplyBalance._value)) {
      return {
        usd: cash.usd,
        underlying: cash.underlying,
        fixedNumber: cash.fixedNumber,
        tokens: {
          value: Number(tokens._value),
          fixedNumber: tokens,
        },
      };
    }
    // tokensMantissa is cToken balance (always 18 decimals)
    tokens = FixedNumber.from(tokensMantissa.toString(), format)
      .divUnsafe(cTokenFactor);
    if (Number(totalBorrows.fixedNumber._value) <= 0) {
      return {
        usd: Number(marketDepositUSD._value),
        underlying: Number(supplyBalance._value),
        fixedNumber: supplyBalance,
        tokens: {
          value: Number(tokens._value),
          fixedNumber: tokens,
        },
      };
    }
    // collateralFactorMantissa is a ratio (always 18 decimals)
    const collateralFactor = FixedNumber
      .from(marketData.collateralFactorMantissa.toString(), format)
      .divUnsafe(cTokenFactor);
    if (Number(collateralFactor._value) <= 0) {
      return {
        usd: Number(marketDepositUSD._value),
        underlying: Number(supplyBalance._value),
        fixedNumber: supplyBalance,
        tokens: {
          value: Number(tokens._value),
          fixedNumber: tokens,
        },
      };
    }
    const marketLiquidity = marketDepositUSD.mulUnsafe(collateralFactor);
    const liquidity = totalSupply.withCollateral.subUnsafe(marketLiquidity);
    const totalDebtPlusDelta = totalBorrows.fixedNumber
      .addUnsafe(minLiquidity);
    let fixedNumber = marketDepositUSD.subUnsafe((totalDebtPlusDelta.subUnsafe(liquidity))
      .divUnsafe(collateralFactor));
    const diff = fixedNumber.subUnsafe(marketDepositUSD);
    if (Number(diff._value) >= 0) fixedNumber = marketDepositUSD;
    const underlying = fixedNumber.divUnsafe(price);
    const calculatedTokens = underlying.divUnsafe(exchangeRate);
    const supplyMinusUnderlying = supplyBalance.subUnsafe(underlying);
    if (supplyMinusUnderlying._value
      .localeCompare('0.00000000000000005', undefined, { numeric: true }) < 0) {
      return {
        usd: Number(marketDepositUSD._value),
        underlying: Number(supplyBalance._value),
        fixedNumber: supplyBalance,
        tokens: {
          value: Number(tokens._value),
          fixedNumber: tokens,
        },
      };
    }
    return {
      underlying: Number(underlying._value),
      usd: Number(fixedNumber._value),
      fixedNumber,
      tokens: {
        value: Number(calculatedTokens._value),
        fixedNumber: calculatedTokens,
      },
    };
  }

  /**
   * Returns the maximum amount that an account can deposit into the market,
   * based on their current wallet balance of underlying tokens.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Object>} Maximum deposit amount information
   * @returns {Promise<Object.underlying>} Underlying balance information
   * @returns {Promise<number>} Object.underlying.value Human-readable maximum underlying token amount
   * @returns {Promise<FixedNumber>} Object.underlying.fixedNumber FixedNumber representation of maximum amount
   * @returns {Promise<Object.usd>} USD value information
   * @returns {Promise<number>} Object.usd.value Human-readable USD value of maximum deposit
   * @returns {Promise<FixedNumber>} Object.usd.fixedNumber FixedNumber representation of USD value
   * @description
   * Returns the maximum amount the account can deposit, which is equal to their current
   * wallet balance of underlying tokens. The USD value is calculated using the current
   * market price.
   * 
   * This method dynamically detects:
   * - Oracle decimals: From the price oracle adapter (18 for MoC adapter, 30 for USDT adapter, default 18)
   * 
   * The underlying balance comes from `balanceOfUnderlyingInWallet()`, which already
   * handles token decimal detection. The price is converted to human-readable format
   * using oracle decimals before calculating USD value.
   * 
   * @example
   * const maxDeposit = await market.maxAllowedToDeposit(account);
   * // If account has 1000 USDT in wallet at $1.00 price:
   * // maxDeposit.underlying.value = 1000
   * // maxDeposit.usd.value = 1000
   */
  async maxAllowedToDeposit(account) {
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic oracle factor based on detected decimals
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    const [balance, priceMantissa] = await Promise.all([
      this.balanceOfUnderlyingInWallet(account),
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
    ]);
    
    const underlying = balance.underlying.fixedNumber;
    const price = FixedNumber.from(priceMantissa.toString(), format)
      .divUnsafe(oracleFactor);
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

  // maxAllowedToBorrow(account) {
  //   return new Promise((resolve, reject) => {
  //     Promise.all([
  //       this.tropykus.comptroller.getAccountLiquidity(account, this.address),
  //       this.getCash(),
  //     ])
  //       .then(([liquidity, cash]) => {
  //         console.log('liquidity', liquidity.underlying.fixedNumber._value);
  //         console.log('cash', cash.fixedNumber._value);
  //         if (Number(cash.fixedNumber._value) === 0) {
  //           return {
  //             underlying: 0,
  //             usd: 0,
  //             fixedNumber: zero,
  //           };
  //         }
  //         if (Number(liquidity.underlying.fixedNumber._value) > Number(cash
  //           .fixedNumber._value)) return cash;
  //         return liquidity;
  //       })
  //       .then(resolve)
  //       .catch(reject);
  //   });
  // }

  /**
   * Converts an underlying token amount to the equivalent cToken amount using
   * the current exchange rate.
   * 
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount Amount of underlying tokens (human-readable format)
   * @returns {Promise<Object>} cToken amount information
   * @returns {Promise<number>} Object.value Human-readable cToken amount
   * @returns {Promise<FixedNumber>} Object.fixedNumber FixedNumber representation of cToken amount
   * @description
   * Calculates how many cTokens are equivalent to the specified amount of underlying tokens
   * based on the current exchange rate.
   * 
   * Important decimal handling:
   * - Token decimals: Dynamically detected from underlying ERC20 token (6, 8, 18, etc.)
   * - Exchange rates: Always 18 decimals (cToken factor)
   * - cTokens: Always 18 decimals (cToken factor)
   * - This method properly handles tokens with any decimal precision using `parseTokenAmount()`
   * 
   * The calculation: cTokens = underlyingAmount / exchangeRate
   * - The exchange rate mantissa already accounts for underlying token decimals at deployment
   * - Formula: cTokensMantissa (18 decimals) = (underlyingAmountParsed * 1e18) / exchangeRateMantissa
   * 
   * @example
   * // For 100 underlying tokens at exchange rate 0.02:
   * const tokens = await market.getTokensFromUnderlying(account, 100);
   * // tokens.value = 5000 (cTokens)
   */
  async getTokensFromUnderlying(account, amount) {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Parse underlying amount using correct token decimals
    const underlyingAmountParsed = parseTokenAmount(amount.toString(), tokenDecimals);
    
    // Get exchange rate (always in 18 decimals: underlying/cToken ratio)
    // The exchange rate mantissa already accounts for underlying token decimals at deployment
    const exchangeRateMantissa = await this.instance.connect(account.signer)
      .callStatic.exchangeRateCurrent();
    
    // Calculate cTokens: cTokens = underlying / exchangeRate
    // Formula: cTokensMantissa (18 decimals) = (underlyingAmountParsed * 1e18) / exchangeRateMantissa
    const cTokensMantissa = underlyingAmountParsed.mul(BigNumber.from(10).pow(18)).div(exchangeRateMantissa);
    
    // Convert cTokens mantissa (18 decimals) to FixedNumber and then to human-readable
    const cTokensFixedNumber = FixedNumber.from(cTokensMantissa.toString(), format);
    const cTokensHumanReadable = cTokensFixedNumber.divUnsafe(cTokenFactor);
    
    return {
      value: Number(cTokensHumanReadable._value),
      fixedNumber: cTokensFixedNumber,
    };
  }

  /**
   * Returns the total amount of underlying tokens supplied to the market in the last 24 hours.
   * 
   * @returns {Promise<Object>} Supply information for the last 24 hours
   * @returns {Promise<number>} Object.supplied Human-readable total underlying tokens supplied
   * @returns {Promise<number>} Object.suppliedInUsd USD value of the total supplied amount
   * @description
   * Queries all Mint events from the last 2880 blocks (approximately 24 hours) and calculates
   * the total amount of underlying tokens supplied and its USD value.
   * 
   * This method dynamically detects:
   * - Token decimals: From the underlying ERC20 token contract (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens)
   * - Oracle decimals: From the price oracle adapter (18 for MoC adapter, 30 for USDT adapter, default 18)
   * 
   * The supplied amounts from events are in token decimals and are converted to human-readable
   * format. The price is converted from oracle decimals to human-readable format before
   * calculating the USD value.
   * 
   * @example
   * const supply = await market.suppliedLast24Hours();
   * // For 5000 USDT supplied (6 decimals) at $1.00 price:
   * // supply.supplied = 5000
   * // supply.suppliedInUsd = 5000
   */
  async suppliedLast24Hours() {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors based on detected decimals
    const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    const [supplyEvents, price] = await Promise.all([
      this.wsInstance.queryFilter('Mint', -2880),
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
    ]);
    
    let supplied = FixedNumber.from(ethers.utils.parseEther('0'), format);
    supplyEvents.forEach((supplyEvent) => {
      supplied = supplied
        .addUnsafe(FixedNumber.from(supplyEvent.args.mintAmount.toString(), format));
    });
    supplied = supplied.divUnsafe(tokenFactor);

    const priceFixed = FixedNumber.from(price.toString(), format)
      .divUnsafe(oracleFactor);
    let suppliedInUsd = supplied.mulUnsafe(priceFixed);
    supplied = Number(supplied._value);
    suppliedInUsd = Number(suppliedInUsd._value);
    return { supplied, suppliedInUsd };
  }

  /**
   * Returns the total amount of underlying tokens borrowed from the market in the last 24 hours.
   * 
   * @returns {Promise<Object>} Borrow information for the last 24 hours
   * @returns {Promise<number>} Object.borrowed Human-readable total underlying tokens borrowed
   * @returns {Promise<number>} Object.borrowedInUsd USD value of the total borrowed amount
   * @description
   * Queries all Borrow events from the last 2880 blocks (approximately 24 hours) and calculates
   * the total amount of underlying tokens borrowed and its USD value.
   * 
   * This method dynamically detects:
   * - Token decimals: From the underlying ERC20 token contract (6 for USDT/USDC, 8 for WBTC, 18 for standard tokens)
   * - Oracle decimals: From the price oracle adapter (18 for MoC adapter, 30 for USDT adapter, default 18)
   * 
   * The borrowed amounts from events are in token decimals and are converted to human-readable
   * format. The price is converted from oracle decimals to human-readable format before
   * calculating the USD value.
   * 
   * @example
   * const borrows = await market.borrowedLast24Hours();
   * // For 3000 USDT borrowed (6 decimals) at $1.00 price:
   * // borrows.borrowed = 3000
   * // borrows.borrowedInUsd = 3000
   */
  async borrowedLast24Hours() {
    // Get token decimals (from CErc20.tokenDecimals if available, default to 18)
    let tokenDecimals = 18;
    if (this._ensureDecimals) {
      tokenDecimals = await this._ensureDecimals();
    } else if (this.tokenDecimals !== null && this.tokenDecimals !== undefined) {
      tokenDecimals = this.tokenDecimals;
    }
    
    // Get adapter address for this market
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(this.address);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    
    // Create dynamic factors based on detected decimals
    const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    
    const [borrowEvents, price] = await Promise.all([
      this.wsInstance.queryFilter('Borrow', -2880),
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(this.address),
    ]);
    
    let borrowed = FixedNumber.from(ethers.utils.parseEther('0'), format);
    borrowEvents.forEach((borrowEvent) => {
      borrowed = borrowed
        .addUnsafe(FixedNumber.from(borrowEvent.args.borrowAmount.toString(), format));
    });
    borrowed = borrowed.divUnsafe(tokenFactor);

    const priceFixed = FixedNumber.from(price.toString(), format)
      .divUnsafe(oracleFactor);
    let borrowedInUsd = borrowed.mulUnsafe(priceFixed);
    borrowed = Number(borrowed._value);
    borrowedInUsd = Number(borrowedInUsd._value);
    return { borrowed, borrowedInUsd };
  }

  static min(aFixedNumber, bFixedNumber) {
    const a = aFixedNumber.mulUnsafe(factor);
    const b = bFixedNumber.mulUnsafe(factor);
    if (a._value
      .localeCompare(b._value, undefined, { numeric: true }) < 0) {
      return aFixedNumber;
    }
    return bFixedNumber;
  }
}
