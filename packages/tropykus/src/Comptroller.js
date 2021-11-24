import { ethers } from 'ethers';
import ComptrollerArtifact from '../artifacts/ComptrollerG6.json';

export default class Comptroller {
  constructor(contractAddress, tropykus) {
    this.tropykus = tropykus;
    this.instance = new ethers.Contract(
      contractAddress,
      ComptrollerArtifact.abi,
      this.tropykus.ethersProvider,
    );
  }

  allMarkets() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.getAllMarkets()
        .then(resolve)
        .catch(reject);
    });
  }

  getAssetsIn(account) {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.getAssetsIn(account.address)
        .then(resolve)
        .catch(reject);
    });
  }

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
