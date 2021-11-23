import { ethers } from 'ethers';

export default class Market {
  /**
   * Construct a new Market
   * @param tropykus instance of the tropykus protocol to be linked with
   * @param abi from which instantiate the market
   * @param marketAddress address of the deployed Market instance to point to
   */
  constructor(tropykus, abi, marketAddress) {
    this.tropykus = tropykus;
    this.address = marketAddress;
    this.instance = new ethers.Contract(marketAddress, abi, this.tropykus.ethersProvider);
  }

  /**
   * Market Balance
   * @param account type account
   * @return {Number} the balance deposited in the market
   */
  balanceOfUnderlying(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).callStatic.balanceOfUnderlying(account.address)
        .then((balance) => Number(balance) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Tokens Blance
   * @param account type account
   * @return the balance of tokens owned in the market
   */
  balanceOf(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).callStatic.balanceOf(account.address)
        .then((balance) => Number(balance) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Borrow Balance
   * @param account type account
   * @return {Number} the amount that has been borrowed in the market
   */
  async borrowBalanceCurrent(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).callStatic.borrowBalanceCurrent(account.address)
        .then((balance) => Number(balance) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * function that allows us to make a deposit in the market
   * @param account type account
   * @param amount type Number
   */
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

  /**
   * function that allows us to make a borrow in the market
   * @param account type account
   * @param amount type Number
   */
  borrow(account, amount) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account)
        .borrow(ethers.utils.parseEther(amount.toString()), { gasLimit: this.tropykus.gasLimit })
        .then(resolve)
        .catch(reject);
    });
  }
}
