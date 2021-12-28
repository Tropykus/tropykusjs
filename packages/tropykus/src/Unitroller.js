import { ethers } from 'ethers';
import UnitrollerArtifact from '../artifacts/Unitroller.json';

export default class Unitroller {
  constructor(contractAddress, tropykus) {
    this.tropykus = tropykus;
    this.address = contractAddress;
    this.instance = new ethers.Contract(
      contractAddress,
      UnitrollerArtifact.abi,
      this.tropykus.ethersProvider,
    );
  }

  setComptrollerPendingImplementation(comptrollerAddress) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(this.tropykus.account)
        ._setPendingImplementation(comptrollerAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  getComptrollerPendingImplementation() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic
        .pendingComptrollerImplementation()
        .then(resolve)
        .catch(reject);
    });
  }

  getComptrollerImplementation() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic
        .comptrollerImplementation()
        .then(resolve)
        .catch(reject);
    });
  }
}
