import { ethers, Wallet } from 'ethers';
import Comptroller from './Comptroller';
import CRBTCMarket from './Markets/CRBTC';
import CTokenMarket from './Markets/CToken';

export default class Tropykus {
  constructor(providerURL, gasLimit) {
    this.ethersProvider = new ethers.providers.JsonRpcProvider(providerURL);
    this.internalAccount = null;
    this.internalComptroller = null;
    this.currentMarket = null;
    this.currentGasLimit = gasLimit;
    this.markets = [];
  }

  /**
   * Returns the initialized account instance.
   * @return {Object}
   */
  get account() { return this.internalAccount; }

  /**
   * By providing the mnemonic, a wallet instance is made available.
   * @param {string} mnemonic to generate the wallet.
   */
  setAccount(mnemonic, derivationPath) {
    this.internalAccount = Wallet
      .fromMnemonic(mnemonic, derivationPath).connect(this.ethersProvider);
  }

  get gasLimit() { return this.currentGasLimit; }

  /**
   * Returns the initialized comptroller instance.
   * @return {Comptroller}
   */
  get comptroller() { return this.internalComptroller; }

  /**
   * By providing the on chain deployed comptroller address,
   * a comptroller instance is made available.
   * @param {string} comptrollerAddress on chain deployed comptroller address.
   */
  setComptroller(comptrollerAddress) {
    this.internalComptroller = new Comptroller(comptrollerAddress, this);
  }

  /**
   * Returns the initialized market instance.
   * @return {CRBTCMarket | CTokenMarket}
   */
  get market() { return this.currentMarket; }

  /**
   * By providing the contract address and if it is a cRBTC market,
   * a Market instance is made available.
   * @param {string} marketAddress on chain deployed market address.
   * @param {boolean} isCRBTCMarket indicating if the market is a cRBTC market
   */
  addMarket(marketAddress, isCRBTCMarket = true, erc20TokenAddress = null) {
    if (isCRBTCMarket) {
      this.currentMarket = new CRBTCMarket(this, marketAddress);
    } else {
      this.currentMarket = new CTokenMarket(this, marketAddress, erc20TokenAddress);
    }
    this.markets.push(this.currentMarket);
    return this.currentMarket;
  }
}
