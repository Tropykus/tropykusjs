import { ethers } from 'ethers';
import ComptrollerArtifact from '../artifacts/ComptrollerG6.json';

export default class Comptroller {
  /**
   * Construct a new comptroller
   * @param contractAddress address of the deployed Comptroller instance to point to
   * @param tropykus instance of the tropykus protocol to be linked with
   */
  constructor(contractAddress, tropykus) {
    this.tropykus = tropykus;
    this.instance = new ethers.Contract(
      contractAddress,
      ComptrollerArtifact.abi,
      this.tropykus.ethersProvider,
    );
  }

  /**
   * gets all the markets the comptroller has
   * @return {Array} markets directions
   */
  allMarkets() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.getAllMarkets()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * gets the markets where the account has collateral
   * @param account to be consulted for the markets
   * @return {Promise} with the array of markets the account has entered as collateral
   */
  getAssetsIn(account) {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.getAssetsIn(account.address)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * sets the given markets as collateral
   * @param account to be added to the markets
   * @param marketAddresses array of market addresses in which to add the account
   * @return {Promise}
   */
  enterMarkets(account, marketAddresses) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).enterMarkets(marketAddresses)
        .then(resolve)
        .catch(reject);
    });
  }

  supportMarket(marketAddresses) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(this.tropykus.account)
        ._supportMarket(marketAddresses)
        .then(resolve)
        .catch(reject);
    });
  }

  setCollateralFactor(marketAddresses, collateralFactor) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(this.tropykus.account)
        ._setCollateralFactor(
          marketAddresses,
          ethers.utils.parseEther(collateralFactor.toString()),
        )
        .then(resolve)
        .catch(reject);
    });
  }

  become(unitrollerAddress) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(this.tropykus.account)
        ._become(unitrollerAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  setOracle(priceOracleAddress) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(this.tropykus.account)
        ._setPriceOracle(priceOracleAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  setCloseFactor(closeFactor) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(this.tropykus.account)
        ._setCloseFactor(ethers.utils.parseEther(closeFactor.toString()))
        .then(resolve)
        .catch(reject);
    });
  }

  setLiquidationIncentive(liquidationIncentive) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(this.tropykus.account)
        ._setLiquidationIncentive(ethers.utils.parseEther(liquidationIncentive.toString()))
        .then(resolve)
        .catch(reject);
    });
  }
}
