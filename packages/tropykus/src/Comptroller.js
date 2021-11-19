import {ethers} from "ethers";
import ComptrollerAbi from '../abis/ComptrollerG6.json';

export default class Comptroller {
    constructor(contractAddress, ethersProvider) {
        this.ethersProvider = ethersProvider;
        this.instance = new ethers.Contract(contractAddress, ComptrollerAbi, this.ethersProvider);
    }

    allMarkets() {
        return new Promise((resolve, reject) => {
            this.instance.callStatic.getAllMarkets()
                .then(resolve)
                .catch(reject);
        });
    }

    getAssetsIn(account) {
        return new Promise((resolve, reject) => {
            this.instance.callStatic.getAssetsIn(account.address)
            .then(resolve)
            .catch(reject);
        });
    }

    enterMarkets(account, marketAddresses) {
        return new Promise((resolve,reject) => { 
            this.instance.connect(account).enterMarkets(marketAddresses)
                .then(resolve)
                .catch(reject);
        });
    }
}
