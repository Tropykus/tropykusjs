import CRDOCArtifact from '../../artifacts/CRDOC.json';
import CErc20 from './CErc20';

export default class CRDOC extends CErc20 {
  constructor(tropykus, contractAddress, erc20TokenAddress) {
    super(
      tropykus,
      CRDOCArtifact.abi,
      contractAddress,
      erc20TokenAddress,
    );
    this.type = 'CRDOC';
  }
}
