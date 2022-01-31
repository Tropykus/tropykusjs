/* eslint-disable no-underscore-dangle */
import { BigNumber, ethers, FixedNumber } from 'ethers';
import StandartTokenArtifact from '../../artifacts/StandardToken.json';
import Market from '../Market';

const format = 'fixed80x18';
const factor = FixedNumber.fromString(1e18.toString(), format);

export default class CErc20 extends Market {
  constructor(tropykus, abi, contractAddress, erc20TokenAddress) {
    super(tropykus, abi, contractAddress);
    if (erc20TokenAddress === null || erc20TokenAddress === undefined) {
      throw new Error('Must provide a valid erc20 token address');
    }
    this.erc20InstanceAddress = erc20TokenAddress;
    this.erc20Instance = new ethers.Contract(
      erc20TokenAddress,
      StandartTokenArtifact.abi,
      tropykus.provider,
    );
    this.type = 'CErc20Immutable';
  }

  /**
   * Deposits and amount in the name of a given account
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount amount to be deposit
   * @returns {Promise<Object>} transaction
   */
  mint(account, amount) {
    return new Promise((resolve, reject) => {
      this.erc20Instance.connect(account.signer)
        .approve(this.address, ethers.utils.parseEther(amount.toString()))
        .then(() => this.instance.connect(account.signer)
          .mint(ethers.utils.parseEther(amount.toString()), { gasLimit: this.tropykus.gasLimit }))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Pays the debt from an account given
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount amount to be paid
   * @param {boolean} maxValue if true pays all debt
   * @returns {Promise<Object>} transaction
   */
  async repayBorrow(account, amount, maxValue = false) {
    if (maxValue) {
      const borrowBalance = await this.instance
        .connect(account.signer)
        .callStatic
        .borrowBalanceCurrent(account.address);
      const delta = BigNumber.from(1e18.toString());
      await this.erc20Instance.connect(account.signer)
        .approve(this.address, borrowBalance.add(delta));
      return this.instance.connect(account.signer)
        .repayBorrow(
          ethers.constants.MaxUint256,
          { gasLimit: this.tropykus.gasLimit },
        );
    }
    await this.erc20Instance.connect(account.signer)
      .approve(this.address, ethers.utils.parseEther(amount.toString()));
    return this.instance.connect(account.signer)
      .repayBorrow(
        ethers.utils.parseEther(amount.toString()),
        { gasLimit: this.tropykus.gasLimit },
      );
  }

  /**
   * Sends an amount from the given account to the address given
   * @param {object} accountFrom Object get from tropykus.getAccount()
   * @param {string} addressTo address to transfer amount
   * @param {number} amount amount to transfer
   * @returns {Promise<Object>} transaction
   */
  transferUnderlying(accountFrom, addressTo, amount) {
    return new Promise((resolve, reject) => {
      this.erc20Instance.connect(accountFrom.signer)
        .transfer(
          addressTo,
          ethers.utils.parseEther(amount.toString()),
        )
        .then(resolve)
        .catch(reject);
    });
  }

  /** Returns the balance of a given account on the underlying of this market
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Number>} balance of underlying in wallet
   */
  balanceOfUnderlyingInWallet(account) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.erc20Instance.connect(account.signer)
          .balanceOf(account.address),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([balanceMantissa, priceMantissa]) => {
          const price = FixedNumber.from(priceMantissa, format)
            .divUnsafe(factor);
          const underlying = FixedNumber.from(balanceMantissa.toString(), format)
            .divUnsafe(factor);
          const usd = underlying.mulUnsafe(price);
          return {
            underlying: {
              value: Number(underlying._value),
              fixedNumber: underlying,
            },
            usd: {
              value: Number(usd._value),
              fixedNumber: usd,
            },
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getUnderlyingSymbol() {
    return new Promise((resolve, reject) => {
      this.erc20Instance.callStatic.symbol()
        .then(resolve)
        .catch(reject);
    });
  }
}
