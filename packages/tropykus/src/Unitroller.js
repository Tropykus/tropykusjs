import { ethers } from 'ethers';
import UnitrollerArtifact from '../artifacts/Unitroller.json';

export default class Unitroller {
  constructor(contractAddress, tropykus) {
    this.tropykus = tropykus;
    this.address = contractAddress.toLowerCase();
    this.instance = new ethers.Contract(
      contractAddress,
      UnitrollerArtifact.abi,
      this.tropykus.provider,
    );
  }

  /**
   * Sets a new comptroller as a candidate to be implemented
   * @param {object} account Object get from tropykus.getAccount()
   * @param comptrollerAddress<Address> Comptroller address
   * @returns {Promise<Object>} Transaction
   */
  setComptrollerPendingImplementation(account, comptrollerAddress) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(account.signer)
        ._setPendingImplementation(comptrollerAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the address of a comptroller pending to be implemented
   * @returns {Promise<String>} pending comptroller address
   */
  getComptrollerPendingImplementation() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic
        .pendingComptrollerImplementation()
        .then((address) => address.toLowerCase())
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the address of a comptroller implemented
   * @returns {Promise<String>} comptroller address implemented
   */
  getComptrollerImplementation() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic
        .comptrollerImplementation()
        .then((address) => address.toLowerCase())
        .then(resolve)
        .catch(reject);
    });
  }
}
