import CRDOCAbi from '../../abis/CRDOC.json';
import CErc20 from './CErc20';

export default class CRDOC extends CErc20 {
  constructor(tropykus, contractAddress, erc20TokenAddress) {
    super(
      tropykus,
      CRDOCAbi,
      contractAddress,
      erc20TokenAddress,
    );
  }
}
