import {ethers, Wallet} from "ethers";
import Comptroller from "./Comptroller";
import CRBTCMarket from './Markets/CRBTCMarket';
import CTokenMarket from './Markets/CTokenMarket';

export default class Tropykus {
    constructor(providerURL) {
        this.ethersProvider = new ethers.providers.JsonRpcProvider(providerURL);
        this.internalAccount = null;
        this.internalComptroller = null;
        this.currentMarket = null;
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
    setAccount(mnemonic) {
        this.internalAccount = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`).connect(this.ethersProvider);
    }

    /**
     * Returns the initialized comptroller instance.
     * @return {Comptroller}
     */
    get comptroller() { return this.internalComptroller; }

    /**
     * By providing the on chain deployed comptroller address, a comptroller instance is made available.
     * @param {string} comptrollerAddress on chain deployed comptroller address.
     */
    setComptroller(comptrollerAddress) {
        this.internalComptroller = new Comptroller(comptrollerAddress, this.ethersProvider);
    }

    /**
     * Returns the initialized market instance.
     * @return {CRBTCMarket | CTokenMarket}
     */
    get market() { return this.currentMarket; }

    /**
     * By providing the contract address and if it is a cRBTC market, a Market instance is made available.
     * @param {string} marketAddress on chain deployed market address.
     * @param {boolean} isCRBTCMarket indicating if the market is a cRBTC market
     */
    setMarket(marketAddress, isCRBTCMarket = true) {
        if (isCRBTCMarket) {
            this.currentMarket = new CRBTCMarket(marketAddress, this.ethersProvider);
        } else {
            this.currentMarket = new CTokenMarket(marketAddress, this.ethersProvider);
        }
    }
}
