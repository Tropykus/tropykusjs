import { ethers } from "ethers";
import BaseMarket from "./BaseMarket";
import StandardTokenAbi from '../../abis/StandardToken.json';

export default class CRBTCMarket extends BaseMarket {
    constructor(contractAddress, ethersProvider) {
        super(ethersProvider, new ethers.Contract(contractAddress, StandardTokenAbi, ethersProvider));
    }
}