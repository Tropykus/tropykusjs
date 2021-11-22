export default class Market {
    constructor(ethersProvider, instance) {
        this.ethersProvider = ethersProvider;
        this.instance = instance;
    }

    balanceOfUnderlying(account) {
        return new Promise((resolve, reject) => {
            this.instance.callStatic.balanceOf(account.address)
            .then(resolve)
            .catch(reject);
        });
    }

    mint(account, amount) {
        return new Promise((resolve, reject) => {
            this.instance.connect(account).mint({ value: amount, gasLimit: this.gasLimit })
            .then(resolve)
            .catch(reject);
        });
    }
}