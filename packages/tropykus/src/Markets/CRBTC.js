import CRBTCAbi from '../../abis/CRBTC.json';
import Market from '../Market';

export default class CRBTC extends Market {
  constructor(tropykus, contractAddress) {
    super(tropykus, contractAddress, CRBTCAbi);
  }
}
