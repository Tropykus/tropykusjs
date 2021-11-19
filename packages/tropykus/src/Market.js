import CRBTCMarket from "./Markets/CRBTCMarket";
import CTokenMarket from "./Markets/CTokenMarket";

export default class Market {
    constructor(ethersProvider) {
        this.ethersProvider = ethersProvider;
        this.internalMarket = null;
    }

    get market() { return this.internalMarket; }

    setMarket(contractAddress, isCRBTCMarket = true) {
        if (isCRBTCMarket) {
            this.internalMarket = new CRBTCMarket(contractAddress, this.ethersProvider);
        } else {
            this.internalMarket = new CTokenMarket(contractAddress, this.ethersProvider);
        }
    }

    balanceOfUnderlying(account) {
        return this.market.balanceOfUnderlying(account);
    }

    supply(account, amount) {
        return this.internalMarket.supply(account, amount);
    }
}