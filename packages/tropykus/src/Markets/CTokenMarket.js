import { ethers } from "ethers";
import StandardTokenAbi from '../../abis/StandardToken.json';
import Market from '../Market';

export default class CRBTCMarket extends Market {
    constructor(contractAddress, ethersProvider) {
        super(ethersProvider, new ethers.Contract(contractAddress, StandardTokenAbi, ethersProvider));
    }
}