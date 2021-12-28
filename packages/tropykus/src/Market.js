import { BigNumber, ethers } from 'ethers';

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
   * @return {Promise<Number>} the balance deposited in the market
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
   * @return {Promise<Number>} the amount that has been borrowed in the market
   */
  borrowBalanceCurrent(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).callStatic
        .borrowBalanceCurrent(account.address)
        .then((balance) => Number(balance) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * function that allows us to make a deposit in the market
   * @param account type account
   * @param amount type Number - value to be minted
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
   * @param amount type Number - value to be borrowed
   */
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

  /**
   * function that allows us to redeem from the market
   * @param {account} account object with signer info
   * @param {number} amount value to be redeemed
   * @param {boolean} maxValue if true ignores amount and redeems all
   * kTokens from the account, if the account has collateral compromised
   * in debts the transactions reverts.
   */
  redeem(account, amount, maxValue = false) {
    return new Promise((resolve, reject) => {
      if (maxValue) {
        this.instance.callStatic.balanceOf(account.address)
          .then((kTokens) => this.instance.connect(account)
            .redeem(
              kTokens,
              { gasLimit: this.tropykus.gasLimit },
            ))
          .then(resolve)
          .catch(reject);
      } else {
        this.instance.connect(account)
          .redeemUnderlying(
            ethers.utils.parseEther(amount.toString()),
            { gasLimit: this.tropykus.gasLimit },
          )
          .then(resolve)
          .catch(reject);
      }
    });
  }

  /**
   * function that allows us to repay a borrow from the market
   * @param account type account
   * @param amount type Number - value to be repayed
   * @param maxValue
   */
  repayBorrow(account, amount, maxValue = false) {
    return new Promise((resolve, reject) => {
      if (maxValue) {
        this.instance.connect(account).callStatic
          .borrowBalanceCurrent(account.address)
          .then((borrowBalance) => {
            const delta = BigNumber.from(0.0001e18);
            return this.instance.connect(account)
              .repayBorrowAll({ value: borrowBalance.add(delta) });
          })
          .then(resolve)
          .catch(reject);
      } else {
        this.instance.connect(account)
          .repayBorrow({
            value: ethers.utils.parseEther(amount.toString()),
            gasLimit: this.tropykus.gasLimit,
          });
      }
    });
  }

  setReserveFactor(account, reserveFactor) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(account)
        ._setReserveFactor(ethers.utils.parseEther(reserveFactor.toString()))
        .then(resolve)
        .catch(reject);
    });
  }

  setComptroller(account, comptrollerAddress) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(account)
        ._setComptroller(comptrollerAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  getReserveFactor() {
    return new Promise((resolve, reject) => {
      this.instance.reserveFactorMantissa()
        .then((rf) => Number(rf) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  getComptroller() {
    return new Promise((resolve, reject) => {
      this.instance.comptroller()
        .then(resolve)
        .catch(reject);
    });
  }

  getExchangeRateCurrent(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account).callStatic.exchangeRateCurrent()
        .then((er) => Number(er) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }
}
