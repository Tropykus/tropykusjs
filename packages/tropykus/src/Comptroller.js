/* eslint-disable no-underscore-dangle */
import { BigNumber, ethers, FixedNumber } from 'ethers';
import ComptrollerArtifact from '../artifacts/ComptrollerG6.json';
import CErc20ImmutableArtifact from '../artifacts/CErc20Immutable.json';
import CToken from './Markets/CToken';
import CRBTC from './Markets/CRBTC';
import { parseTokenAmount } from './utils/decimals';

const format = 'fixed80x18';
// cToken factor: cTokens, ratios (collateral factors), and liquidity values ALWAYS have 18 decimals
const cTokenFactor = FixedNumber.fromString(1e18.toString(), format);
// Legacy factor for backward compatibility
const factor = FixedNumber.fromString(1e18.toString(), format);

export default class Comptroller {
  /**
   * Construct a new comptroller
   * @param {string} contractAddress address of the deployed Comptroller instance to point to
   * @param {object} tropykus instance of the tropykus protocol to be linked with
   */
  constructor(contractAddress, tropykus) {
    this.tropykus = tropykus;
    this.address = contractAddress.toLowerCase();
    this.instance = new ethers.Contract(
      contractAddress,
      ComptrollerArtifact.abi,
      this.tropykus.provider,
    );
  }

  /**
   * gets all the markets the comptroller has
   * @return {Promise<Array>} markets directions
   */
  allMarkets() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.getAllMarkets()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns a list of the markets as instances of tropykus' Market
   * @param {string} kSatAddress Address of kToken's hurricane market
   * @param {string} kRbtcAddress Address of kToken's RBTC market
   * @returns {Promise<Array>} List of the market's instances
   */
  getAllMarketsInstances(kSatAddress, kRbtcAddress) {
    return this.allMarkets()
      .then(async (marketAddresses) => {
        // Normalize addresses for comparison
        const kSatAddressLower = (kSatAddress || '').toLowerCase();
        const kRbtcAddressLower = (kRbtcAddress || '').toLowerCase();
        
        // Process all markets in parallel
        const instancePromises = marketAddresses.map(async (mktAddress) => {
          const marketAddress = mktAddress.toLowerCase();
          
          // Check if this is kSAT or kRBTC (CRBTC type)
          if (marketAddress === kSatAddressLower || marketAddress === kRbtcAddressLower) {
            return new CRBTC(this.tropykus, marketAddress);
          } else {
            // For other markets, get the underlying token address
            try {
              const contractInstance = new ethers.Contract(
                marketAddress, CErc20ImmutableArtifact.abi, this.tropykus.provider,
              );
              const underlyingAddress = await contractInstance.callStatic.underlying();
              return new CToken(this.tropykus, marketAddress, underlyingAddress);
            } catch (error) {
              // If underlying() call fails (e.g., market is deprecated), still create a CToken
              // but without underlying address - this handles deprecated markets gracefully
              return new CToken(this.tropykus, marketAddress, null);
            }
          }
        });
        
        return Promise.all(instancePromises);
      });
  }

  /**
   * sets the given markets as collateral
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} marketAddresses array of market addresses in which to add the account
   * @return {Promise<Object>} transaction object
   */
  enterMarkets(account, marketAddresses) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer).enterMarkets(marketAddresses)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Add a market to be supported by comptroller
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} marketAddress address of the market to support by a comptroller
   * @returns {Promise<Object>} transaction object
   */
  supportMarket(account, marketAddress) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        ._supportMarket(marketAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Changes the collateral factor from a market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} marketAddress address of the market to support by a comptroller
   * @param {number} collateralFactor collateral factor percentage expressed from 0 to 1
   * @returns {Promise<Object>} transaction object
   */
  setCollateralFactor(account, marketAddress, collateralFactor) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        ._setCollateralFactor(
          marketAddress,
          ethers.utils.parseEther(collateralFactor.toString()),
          { gasLimit: this.tropykus.gasLimit },
        )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Makes a pending comptroller implementation the current comptroller
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} unitrollerAddress address of unitroller
   * @returns {Promise<Object>} transaction
   */
  become(account, unitrollerAddress) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        ._become(unitrollerAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sets a price oracle for a comptroller
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} priceOracleAddress address of the price oracle
   * @returns {Promise<Object>} transaction
   */
  setOracle(account, priceOracleAddress) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        ._setPriceOracle(priceOracleAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sets a close factor for a comptroller
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} closeFactor Percentage of close factor from 0 to 1
   * @returns {Promise<Object>} transaction
   */
  setCloseFactor(account, closeFactor) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        ._setCloseFactor(
          ethers.utils.parseEther(closeFactor.toString()),
        )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sets a liquidation incentive for a comptroller
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} liquidationIncentive Percentage of liquidation incentive from 0 to 1
   * @returns {Promise<Object>} transaction
   */
  setLiquidationIncentive(account, liquidationIncentive) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        ._setLiquidationIncentive(
          ethers.utils.parseEther(liquidationIncentive.toString()),
        )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Gets the markets where the account has collateral
   * @param accountAddress<String> Address of the account to consult its markets as collateral
   * @return {Promise<Array>} with the array of markets the account has entered as collateral
   */
  getAssetsIn(accountAddress) {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.getAssetsIn(accountAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Gets the comptroller price oracle address
   * @returns {Promise<String>} Price Oracle Proxy address set for this comptroller
   */
  getOracle() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.oracle()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Gets the collateral factor set for a given market address
   * @param {string} marketAddress
   * @returns {Promise<Number>} market's collateral factor
   */
  getCollateralFactor(marketAddress) {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.markets(marketAddress)
        .then((market) => market.collateralFactorMantissa)
        .then((cFMantissa) => Number(cFMantissa / 1e18))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Gets the close factor set for this comptroller
   * @returns {Promise<Number>} close factor
   */
  getCloseFactor() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.closeFactorMantissa()
        .then((cF) => Number(cF / 1e18))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Gets liquidation incentive set for this comptroller
   * @returns {Promise<Number>} liquidation incentive
   */
  getLiquidationIncentive() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.liquidationIncentiveMantissa()
        .then((lF) => Number(lF / 1e18))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Gets an account's liquidity on USD
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} marketAddress Address of the market to get underlying representation
   * @returns {Promise<Object>} total liquidity in usd, underlying and fixedNumber
   */
  async getAccountLiquidity(account, marketAddress = '') {
    // If marketAddress is provided, calculate market-specific liquidity
    if (marketAddress) {
      // Create market instance to get balance
      const marketContract = new ethers.Contract(
        marketAddress,
        CErc20ImmutableArtifact.abi,
        this.tropykus.provider,
      );
      
      // Get token decimals for this market
      let tokenDecimals = 18;
      try {
        const underlyingAddress = await marketContract.callStatic.underlying();
        const underlyingContract = new ethers.Contract(
          underlyingAddress,
          ['function decimals() view returns (uint8)'],
          this.tropykus.provider,
        );
        tokenDecimals = await underlyingContract.callStatic.decimals();
      } catch (error) {
        // If underlying() fails (e.g., CRBTC market), default to 18 decimals
        tokenDecimals = 18;
      }
      
      // Get oracle decimals for this market
      const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(marketAddress);
      const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
      
      // Create factors
      const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
      const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
      const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
      const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
      
      // Get balance, price, and collateral factor in parallel
      const [balanceOfUnderlyingResult, priceMantissa, marketData] = await Promise.all([
        marketContract.connect(account.signer).callStatic.balanceOfUnderlying(account.address),
        this.tropykus.priceOracle.instance.callStatic.getUnderlyingPrice(marketAddress),
        this.instance.callStatic.markets(marketAddress),
      ]);
      
      // Convert collateral factor from mantissa (18 decimals) to human-readable
      const collateralFactor = FixedNumber
        .from(marketData.collateralFactorMantissa.toString(), format)
        .divUnsafe(cTokenFactor);
      
      // Convert balance from token decimals to human-readable
      const balanceHumanReadable = FixedNumber.from(balanceOfUnderlyingResult.toString(), format)
        .divUnsafe(tokenFactor);
      
      // Convert price from oracle decimals to human-readable
      const priceHumanReadable = FixedNumber.from(priceMantissa.toString(), format)
        .divUnsafe(oracleFactor);
      
      // Calculate liquidity: balance × price × collateralFactor
      const liquidityUSD = balanceHumanReadable
        .mulUnsafe(priceHumanReadable)
        .mulUnsafe(collateralFactor);
      
      // Calculate underlying: liquidityUSD / price
      const liquidityUnderlying = liquidityUSD.divUnsafe(priceHumanReadable);
      
      return {
        usd: {
          value: Number(liquidityUSD._value),
          fixedNumber: liquidityUSD,
        },
        underlying: {
          value: Number(liquidityUnderlying._value),
          fixedNumber: liquidityUnderlying,
        },
      };
    }
    
    // If no marketAddress provided, return total liquidity across all markets
    const liq = await this.instance.connect(account.signer).callStatic
      .getAccountLiquidity(account.address);
    
    // Liquidity from contract is in USD with 18 decimals (always)
    const fixedNumber = FixedNumber.from(liq[1].toString(), format);
    const usd = fixedNumber.divUnsafe(cTokenFactor);
    
    return {
      usd: {
        value: Number(usd._value),
        fixedNumber: usd,
      },
      underlying: {
        value: Number(usd._value),
        fixedNumber: usd,
      },
    };
  }

  async getHypotheticalAccountLiquidity(account, marketAddress, redeemTokens = 0, borrowAmount = 0) {
    // Get token decimals for this market to parse amounts correctly
    // Try to get market instance to detect decimals
    let tokenDecimals = 18; // default
    try {
      // Check if marketAddress is a CRBTC market (native currency, always 18 decimals)
      // For ERC20 markets, we need to get the underlying token address and check decimals
      const marketContract = new ethers.Contract(
        marketAddress,
        CErc20ImmutableArtifact.abi,
        this.tropykus.provider,
      );
      try {
        const underlyingAddress = await marketContract.callStatic.underlying();
        const underlyingContract = new ethers.Contract(
          underlyingAddress,
          ['function decimals() view returns (uint8)'],
          this.tropykus.provider,
        );
        tokenDecimals = await underlyingContract.callStatic.decimals();
      } catch (error) {
        // If underlying() fails (e.g., CRBTC market), default to 18 decimals
        tokenDecimals = 18;
      }
    } catch (error) {
      // If market contract creation fails, default to 18 decimals
      tokenDecimals = 18;
    }
    
    // Parse amounts
    // redeemTokens is in cToken units (always 18 decimals), not underlying token units
    const parsedRedeemTokens = redeemTokens > 0 
      ? parseTokenAmount(redeemTokens.toString(), 18) // cTokens always have 18 decimals
      : BigNumber.from(0);
    // borrowAmount is in underlying token units (use tokenDecimals)
    const parsedBorrowAmount = borrowAmount > 0
      ? parseTokenAmount(borrowAmount.toString(), tokenDecimals)
      : BigNumber.from(0);
    
    const [res, price] = await Promise.all([
      this.instance.connect(account.signer).callStatic
        .getHypotheticalAccountLiquidity(
          account.address,
          marketAddress,
          parsedRedeemTokens,
          parsedBorrowAmount,
        ),
      this.tropykus.priceOracle.instance.callStatic
        .getUnderlyingPrice(marketAddress),
    ]);
    
    // Liquidity and shortfall from contract are in USD with 18 decimals (always)
    const liquidityFixedNumber = FixedNumber.from(res[1].toString(), format);
    const liquidityUsd = liquidityFixedNumber.divUnsafe(cTokenFactor);
    const shortfallFixedNumber = FixedNumber.from(res[2].toString(), format);
    const shortfallUsd = shortfallFixedNumber.divUnsafe(cTokenFactor);
    
    // Price needs oracle decimals detection
    const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(marketAddress);
    const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
    const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
    const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
    const priceHumanReadable = FixedNumber.from(price.toString(), format)
      .divUnsafe(oracleFactor);
    
    // Convert human-readable USD liquidity to underlying token amount
    // Divide human-readable USD by human-readable price to get human-readable underlying
    const liquidityUnderlying = liquidityUsd.divUnsafe(priceHumanReadable);
    const shortfallUnderlying = shortfallUsd.divUnsafe(priceHumanReadable);
    
    return {
      liquidity: {
        usd: Number(liquidityUsd._value),
        underlying: Number(liquidityUnderlying._value),
        fixedNumber: liquidityFixedNumber,
      },
      shortfall: {
        usd: Number(shortfallUsd._value),
        underlying: Number(shortfallUnderlying._value),
        fixedNumber: shortfallFixedNumber,
      },
    };
  }

  /**
   * Calculates the total borrowed amount (in USD and underlying token units) across all specified markets for an account.
   *
   * - Handles mixed token decimals (6, 8, 18, etc.) and oracle decimals (18, 30, etc.).
   * - Computes the borrow amount in both human-readable underlying and USD values.
   * - If a specific `marketAddress` is provided, also calculates the borrowed amount in that market's underlying token unit.
   *
   * @param {object} account - The account object obtained from tropykus.getAccount().
   * @param {Array<Object>} markets - Array of Market instances to include in calculation.
   * @param {string} [marketAddress=''] - Optional. Market address to use for returning an accurate underlying value (set to empty string for USD sum only).
   * @returns {Promise<Object>} Borrow stats across all supplied markets:
   * @returns {number} return.underlying - Total borrowed amount (in selected market's underlying units if marketAddress specified, otherwise 0).
   * @returns {number} return.usd - Total borrowed amount in USD across all supplied markets.
   * @returns {FixedNumber} return.fixedNumber - The raw FixedNumber sum of borrowed USD amounts.
   *
   * @example
   * const borrows = await comptroller.getTotalBorrowsInAllMarkets(alice, [cusdt0, cbtc]);
   * // borrows.usd = 505.0 (if 5 BTC and 500 USDT borrowed and prices are $1 and $100)
   * // borrows.underlying = 0 (if marketAddress not specified)
   *
   * const borrowsWithUnderlying = await comptroller.getTotalBorrowsInAllMarkets(alice, [cusdt0, cbtc], cbtc.address);
   * // borrowsWithUnderlying.underlying = 5 (BTC)
   */
  async getTotalBorrowsInAllMarkets(account, markets, marketAddress = '') {
    let fixedNumber = FixedNumber.fromString('0', format);
    let underlyingBorrowAmount = FixedNumber.fromString('0', format);
    
    // Process all markets in parallel
    const marketPromises = markets.map(async (market) => {
      // Get token decimals for this market
      let tokenDecimals = 18;
      if (market._ensureDecimals) {
        tokenDecimals = await market._ensureDecimals();
      } else if (market.tokenDecimals !== null && market.tokenDecimals !== undefined) {
        tokenDecimals = market.tokenDecimals;
      }
      
      // Get oracle decimals for this market
      const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(market.address);
      const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
      
      // Create factors
      const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
      const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
      const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
      const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
      
      const [borrows, priceMantissa] = await Promise.all([
        market.borrowBalanceCurrent(account),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(market.address),
      ]);
      
      // borrows.fixedNumber is raw balance in token decimals
      // Convert to human-readable
      const borrowsHumanReadable = borrows.fixedNumber.divUnsafe(tokenFactor);
      
      // Convert price to human-readable
      const priceHumanReadable = FixedNumber.from(priceMantissa.toString(), format)
        .divUnsafe(oracleFactor);
      
      // Calculate USD: (human-readable borrow) * (human-readable price)
      const borrowsAsUSD = borrowsHumanReadable.mulUnsafe(priceHumanReadable);
      
      return {
        borrowsAsUSD,
        borrowsHumanReadable,
        isTargetMarket: market.address.toLowerCase() === marketAddress.toLowerCase(),
      };
    });
    
    const results = await Promise.all(marketPromises);
    
    // Sum all borrows in USD and get underlying borrow for target market
    results.forEach((result) => {
      fixedNumber = fixedNumber.addUnsafe(result.borrowsAsUSD);
      if (result.isTargetMarket) {
        underlyingBorrowAmount = result.borrowsHumanReadable;
      }
    });
    
    const usd = fixedNumber;
    const underlying = marketAddress && underlyingBorrowAmount._value !== '0.0'
      ? underlyingBorrowAmount
      : FixedNumber.fromString('0', format);
    
    return {
      underlying: Number(underlying._value),
      usd: Number(usd._value),
      fixedNumber,
    };
  }

  /**
   * Calculates the total supplied amount (in USD and underlying token units) across all specified markets for an account.
   *
   * - Handles mixed token decimals (6, 8, 18, etc.) and oracle decimals (18, 30, etc.).
   * - Computes the supplied amount in both human-readable underlying units and USD values.
   * - Also computes the USD value of the supplied amount that is eligible as collateral, using the collateral factor of each market.
   * - If a specific `marketAddress` is provided, also calculates the total supplied amount in that market's underlying token unit.
   *
   * @param {object} account - The account object obtained from tropykus.getAccount().
   * @param {Array<Object>} markets - Array of Market instances to include in the calculation.
   * @param {string} marketAddress - Optional. Market address to use for returning an accurate underlying value (set to empty string for USD sum only).
   * @returns {Promise<Object>} Supply stats across all supplied markets:
   * @returns {number} return.underlying - Total supplied amount (in selected market's underlying units if marketAddress specified, otherwise 0).
   * @returns {number} return.usd - Total supplied amount in USD across all supplied markets.
   * @returns {FixedNumber} return.fixedNumber - The raw FixedNumber sum of supplied USD amounts.
   * @returns {FixedNumber} return.withCollateral - The raw FixedNumber sum of collateral-eligible supplied USD amounts.
   *
   * @example
   * const supplies = await comptroller.getTotalSupplyInAllMarkets(alice, [cusdt0, cbtc]);
   * // supplies.usd = 505.0 (if 5 BTC and 500 USDT supplied and prices are $1 and $100)
   * // supplies.underlying = 0 (if marketAddress not specified)
   *
   * const suppliesWithUnderlying = await comptroller.getTotalSupplyInAllMarkets(alice, [cusdt0, cbtc], cbtc.address);
   * // suppliesWithUnderlying.underlying = 5 (BTC)
   */
  async getTotalSupplyInAllMarkets(account, markets, marketAddress) {
    let fixedNumber = FixedNumber.fromString('0', format);
    let withCollateral = FixedNumber.fromString('0', format);
    let marketSupplyUSD = FixedNumber.fromString('0', format);
    let marketSupplyWithCollateral = FixedNumber.fromString('0', format);
    
    // Process all markets in parallel
    const marketPromises = markets.map(async (market) => {
      // Get token decimals for this market
      let tokenDecimals = 18;
      if (market._ensureDecimals) {
        tokenDecimals = await market._ensureDecimals();
      } else if (market.tokenDecimals !== null && market.tokenDecimals !== undefined) {
        tokenDecimals = market.tokenDecimals;
      }
      
      // Get oracle decimals for this market
      const adapterAddress = await this.tropykus.priceOracle.instance.callStatic.tokenAdapter(market.address);
      const oracleDecimals = await this.tropykus.priceOracle.detectOracleDecimals(adapterAddress);
      
      // Create factors
      const tokenFactorValue = BigNumber.from(10).pow(tokenDecimals).toString();
      const oracleFactorValue = BigNumber.from(10).pow(oracleDecimals).toString();
      const tokenFactor = FixedNumber.fromString(tokenFactorValue, format);
      const oracleFactor = FixedNumber.fromString(oracleFactorValue, format);
      
      const [supply, priceMantissa, marketData] = await Promise.all([
        market.balanceOfUnderlying(account),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(market.address),
        this.instance.callStatic.markets(market.address),
      ]);
      
      // Collateral factor is a ratio (always 18 decimals)
      const collateralFactor = FixedNumber
        .from(marketData.collateralFactorMantissa.toString(), format)
        .divUnsafe(cTokenFactor);
      
      // Convert price to human-readable
      const priceHumanReadable = FixedNumber.from(priceMantissa.toString(), format)
        .divUnsafe(oracleFactor);
      
      // supply.fixedNumber is raw balance in token decimals
      // Convert to human-readable
      const supplyHumanReadable = supply.fixedNumber.divUnsafe(tokenFactor);
      
      // Calculate USD: (human-readable supply) * (human-readable price)
      const supplyAsUSD = supplyHumanReadable.mulUnsafe(priceHumanReadable);
      const withCollateralASUSD = supplyAsUSD.mulUnsafe(collateralFactor);
      
      return {
        supplyAsUSD,
        withCollateralASUSD,
        supplyHumanReadable,
        collateralFactor,
        isTargetMarket: market.address.toLowerCase() === (marketAddress || '').toLowerCase(),
      };
    });
    
    const results = await Promise.all(marketPromises);
    
    // Sum all supplies and track target market supply
    results.forEach((result) => {
      fixedNumber = fixedNumber.addUnsafe(result.supplyAsUSD);
      withCollateral = withCollateral.addUnsafe(result.withCollateralASUSD);
      
      // If this is the target market, store its supply values
      if (result.isTargetMarket) {
        marketSupplyUSD = result.supplyAsUSD;
        marketSupplyWithCollateral = result.withCollateralASUSD;
      }
    });
    
    // If marketAddress is provided, return that market's supply with collateral factor applied
    // Otherwise return total supply across all markets
    const usd = marketAddress ? marketSupplyUSD : fixedNumber;
    const underlying = marketAddress && marketSupplyWithCollateral._value !== '0.0'
      ? marketSupplyWithCollateral
      : FixedNumber.fromString('0', format);
    
    return {
      underlying: Number(underlying._value),
      usd: Number(usd._value),
      fixedNumber,
      withCollateral: Number(withCollateral._value),
    };
  }
}
