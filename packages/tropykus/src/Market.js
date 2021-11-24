import { ethers } from 'ethers';

export default class Market {
  constructor(tropykus, abi, marketAddress) {
    this.tropykus = tropykus;
    this.address = marketAddress;
    this.instance = new ethers.Contract(marketAddress, abi, this.tropykus.ethersProvider);
  }

  balanceOfUnderlying(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).callStatic.balanceOfUnderlying(account.address)
        .then((balance) => Number(balance) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  balanceOf(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).callStatic.balanceOf(account.address)
        .then((balance) => Number(balance) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  async borrowBalanceCurrent(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).callStatic.borrowBalanceCurrent(account.address)
        .then((balance) => Number(balance) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  mint(account, amount) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).mint({
        value: ethers.utils.parseEther(amount.toString()),
        gasLimit: this.tropykus.gasLimit,
      })
        .then(resolve)
        .catch(reject);
    });
  }

  borrow(account, amount) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account)
        .borrow(
          ethers.utils.parseEther(amount.toString()),
          { gasLimit: this.tropykus.gasLimit },
        )
        .then(resolve)
        .catch(reject);
    });
  }

  setReserveFactor(reserveFactor) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(this.tropykus.account)
        ._setReserveFactor(
          ethers.utils.parseEther(reserveFactor.toString()),
        )
        .then(resolve)
        .catch(reject);
    });
  }
}
