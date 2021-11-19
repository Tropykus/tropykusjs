import { ethers } from "ethers";
import CRBTCAbi from '../../abis/CRBTC.json';
import Market from '../Market';

export default class CRBTCMarket extends Market {
    constructor(contractAddress, ethersProvider) {
        super(ethersProvider, new ethers.Contract(contractAddress, CRBTCAbi, ethersProvider));
    }
}