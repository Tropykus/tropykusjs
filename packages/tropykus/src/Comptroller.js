import { ethers } from 'ethers';
import ComptrollerAbi from '../abis/ComptrollerG6.json';

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
      ComptrollerAbi,
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
}
