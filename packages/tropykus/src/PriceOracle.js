import { ethers } from 'ethers';
import PriceOracleProxyArtifact from '../artifacts/PriceOracleProxy.json';

export default class PriceOracle {
  constructor(contractAddress, tropykus) {
    this.tropykus = tropykus;
    this.address = contractAddress;
    this.instance = new ethers.Contract(
      contractAddress,
      PriceOracleProxyArtifact.abi,
      this.tropykus.ethersProvider,
    );
  }

  setAdapterToToken(marketAddress, adapterMarketAddress) {
    return new Promise((resolve, reject) => {
      this.instance.connect(this.tropykus.account)
        .setAdapterToToken(marketAddress, adapterMarketAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  getUnderlyingPrice(marketAddress) {
    return new Promise((resolve, reject) => {
      this.instance.connect(this.tropykus.account).callStatic
        .getUnderlyingPrice(marketAddress)
        .then((p) => Number(p) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }
}
