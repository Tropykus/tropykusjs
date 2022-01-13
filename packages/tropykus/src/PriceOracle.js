import { ethers } from 'ethers';
import PriceOracleProxyArtifact from '../artifacts/PriceOracleProxy.json';

export default class PriceOracle {
  constructor(contractAddress, tropykus) {
    this.tropykus = tropykus;
    this.address = contractAddress.toLowerCase();
    this.instance = new ethers.Contract(
      contractAddress,
      PriceOracleProxyArtifact.abi,
      this.tropykus.provider,
    );
  }

  /**
   * Sets an adapter to the given market address
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} marketAddress address of the market
   * @param {string} adapterMarketAddress address of the market adapter
   * @returns {Promise<unknown>}
   */
  setAdapterToToken(account, marketAddress, adapterMarketAddress) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        .setAdapterToToken(marketAddress, adapterMarketAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the market's price
   * @param {string} marketAddress address of the market
   * @returns {Promise<unknown>}
   */
  getUnderlyingPrice(marketAddress) {
    return new Promise((resolve, reject) => {
      this.instance.callStatic
        .getUnderlyingPrice(marketAddress)
        .then((p) => Number(p) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }
}
