import { ethers } from "ethers";
import BaseMarket from "./BaseMarket";
import CRBTCAbi from '../../abis/CRBTC.json';

export default class CRBTCMarket extends BaseMarket {
    constructor(contractAddress, ethersProvider) {
        super(ethersProvider, new ethers.Contract(contractAddress, CRBTCAbi, ethersProvider));
    }
}