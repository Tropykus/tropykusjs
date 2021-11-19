import {ethers, Wallet} from "ethers";
import Comptroller from "./Comptroller";

export default class Tropykus {
    constructor(providerURL) {
        this.ethersProvider = new ethers.providers.JsonRpcProvider(providerURL);
        this.internalComptroller = null;
        this.internalAccount = null;
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
}
