import CRBTCArtifact from '../../artifacts/CRBTC.json';
import Market from '../Market';

export default class CRBTC extends Market {
  constructor(tropykus, contractAddress) {
    super(
      tropykus,
      CRBTCArtifact.abi,
      contractAddress,
    );
  }
}
