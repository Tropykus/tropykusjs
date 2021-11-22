import { ethers } from 'ethers';

export default class Market {
  constructor(tropykus, marketAddress, ABI) {
    this.tropykus = tropykus;
    this.instance = new ethers.Contract(marketAddress, ABI, this.tropykus.ethersProvider);
    this.address = marketAddress;
  }

  balanceOfUnderlying(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).callStatic.balanceOf(account.address)
        .then(resolve)
        .catch(reject);
    });
  }

  mint(account, amount) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).mint({ value: amount, gasLimit: this.tropykus.gasLimit })
        .then(resolve)
        .catch(reject);
    });
  }
}
