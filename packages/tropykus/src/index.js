import {ethers} from "ethers";
import Comptroller from "./Comptroller";

export default class Tropykus {
    constructor(providerURL) {
        this.ethersProvider = new ethers.providers.JsonRpcProvider(providerURL);
        this.internalController = null;
    }

    /**
     * Returns the initialized controller instance.
     * @return {Comptroller}
     */
    get comptroller() { return this.internalController; }

    /**
     * By providing the on chain deployed controller address, a controller instance is made available.
     * @param {string} controllerAddress on chain deployed controller address.
     */
    set controller(controllerAddress) {
        this.internalController = new Comptroller(controllerAddress, this.ethersProvider);
        this.markets();
    }
}
