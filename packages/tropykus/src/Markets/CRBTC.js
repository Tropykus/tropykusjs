import CRBTCAbi from '../../abis/CRBTC.json';
import Market from '../Market';

export default class CRBTC extends Market {
    constructor(contractAddress, tropykus) {
        super(tropykus, contractAddress, CRBTCAbi);
    }
}