/* eslint-disable no-underscore-dangle */
import { BigNumber, ethers, FixedNumber } from 'ethers';
import ComptrollerArtifact from '../artifacts/ComptrollerG6.json';
import CErc20ImmutableArtifact from '../artifacts/CErc20Immutable.json';
import CToken from './Markets/CToken';
import CRDOC from './Markets/CRDOC';
import CRBTC from './Markets/CRBTC';

const factor = FixedNumber.from(ethers.utils.parseEther('1'), 'fixed80x18');

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
   * @param {string} kRDocAddress Address of kToken's RDOC market
   * @returns {Promise<Array>} List of the market's instances
   */
  getAllMarketsInstances(kSatAddress, kRbtcAddress, kRDocAddress) {
    return new Promise((resolve, reject) => {
      this.allMarkets()
        .then((marketAddresses) => {
          const instances = [];
          return marketAddresses.forEach(async (mktAddress) => {
            let instance;
            const marketAddress = mktAddress.toLowerCase();
            if (marketAddress === kSatAddress.toLowerCase()
              || marketAddress === kRbtcAddress.toLowerCase()) {
              instance = new CRBTC(this.tropykus, marketAddress);
            } else {
              const contractInstance = new ethers.Contract(
                marketAddress, CErc20ImmutableArtifact.abi, this.tropykus.provider,
              );
              const underlyingAddress = await contractInstance.callStatic.underlying()
                .then((result) => result);
              instance = marketAddress === kRDocAddress.toLowerCase()
                ? new CRDOC(this.tropykus, marketAddress, underlyingAddress)
                : new CToken(this.tropykus, marketAddress, underlyingAddress);
            }
            instances.push(instance);
            if (instances.length === marketAddresses.length) resolve(instances);
          });
        })
        .catch(reject);
    });
  }

  /**
   * sets the given markets as collateral
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} marketAddresses array of market addresses in which to add the account
   * @return {Promise}
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
   * @returns {Promise<unknown>}
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
   * @return {Promise} with the array of markets the account has entered as collateral
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
  getAccountLiquidity(account, marketAddress = '') {
    return new Promise((resolve, reject) => {
      const promises = [this.instance.connect(account.signer).callStatic
        .getAccountLiquidity(account.address)];
      if (marketAddress) {
        promises.push(this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(marketAddress));
      } else {
        promises.push(Promise.resolve(BigNumber.from('0')));
      }
      Promise.all(promises)
        .then(([liq, price]) => {
          const fixedNumber = FixedNumber.from(liq[1].toString(), 'fixed80x18');
          const usd = fixedNumber.divUnsafe(factor);
          const underlying = price > 0 ? (fixedNumber
            .divUnsafe(FixedNumber.from(price.toString(), 'fixed80x18')))
            : FixedNumber.from('0', 'fixed80x18');
          return {
            usd: Number(usd._value),
            underlying: Number(underlying._value),
            fixedNumber,
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getHypotheticalAccountLiquidity(account, marketAddress, redeemTokens = 0, borrowAmount = 0) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.instance.connect(account.signer).callStatic
          .getHypotheticalAccountLiquidity(
            account.address,
            marketAddress,
            ethers.utils.parseEther(redeemTokens.toString()),
            ethers.utils.parseEther(borrowAmount.toString()),
          ),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(marketAddress),
      ])
        .then(([res, price]) => {
          const liquidityFixedNumber = FixedNumber.from(res[1].toString(), 'fixed80x18');
          const liquidityUsd = liquidityFixedNumber.divUnsafe(factor);
          const liquidityUnderlying = price > 0 ? (liquidityFixedNumber
            .divUnsafe(FixedNumber.from(price.toString(), 'fixed80x18')))
            : FixedNumber.from('0', 'fixed80x18');
          const shortfallFixedNumber = FixedNumber.from(res[2].toString(), 'fixed80x18');
          const shortfallUsd = shortfallFixedNumber.divUnsafe(factor);
          const shortfallUnderlying = price > 0 ? (shortfallFixedNumber
            .divUnsafe(FixedNumber.from(price.toString(), 'fixed80x18')))
            : FixedNumber.from('0', 'fixed80x18');
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
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getTotalBorrowsInAllMarkets(account, markets, marketAddress = '') {
    return new Promise((resolve, reject) => {
      let fixedNumber = FixedNumber.fromString('0', 'fixed80x18');
      let priceUnderlying = BigNumber.from('0');
      let counter = 0;
      markets.forEach(async (market) => Promise.all([
        market.borrowBalanceCurrent(account),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(market.address),
      ])
        .then(([borrows, priceMantissa]) => {
          const price = FixedNumber.from(priceMantissa.toString(), 'fixed80x18')
            .divUnsafe(factor);
          if (market.address === marketAddress.toLowerCase()) priceUnderlying = price;
          const borrowsAsUSD = (borrows.fixedNumber).mulUnsafe(price)
            .divUnsafe(factor);
          fixedNumber = fixedNumber.addUnsafe(borrowsAsUSD);
          counter += 1;
          if (counter === markets.length) {
            const usd = fixedNumber;
            const underlying = marketAddress ? fixedNumber.divUnsafe(priceUnderlying) : 0;
            resolve({
              underlying: Number(underlying._value),
              usd: Number(usd._value),
              fixedNumber,
            });
          }
        })
        .catch(reject));
    });
  }
}
