import { ethers } from 'ethers';
import ComptrollerArtifact from '../artifacts/ComptrollerG6.json';

export default class Comptroller {
  /**
   * Construct a new comptroller
   * @param {string} contractAddress address of the deployed Comptroller instance to point to
   * @param {object} tropykus instance of the tropykus protocol to be linked with
   */
  constructor(contractAddress, tropykus) {
    this.tropykus = tropykus;
    this.address = contractAddress;
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
      // eslint-disable-next-line no-underscore-dangle
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
      // eslint-disable-next-line no-underscore-dangle
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
      // eslint-disable-next-line no-underscore-dangle
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
      // eslint-disable-next-line no-underscore-dangle
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
      // eslint-disable-next-line no-underscore-dangle
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
      // eslint-disable-next-line no-underscore-dangle
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
   * @returns {Promise<Number>} total liquidity in USD
   */
  getAccountLiquidity(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer).callStatic
        .getAccountLiquidity(account.address)
        .then((res) => Number(res[1] / 1e18))
        .then(resolve)
        .catch(reject);
    });
  }
}
