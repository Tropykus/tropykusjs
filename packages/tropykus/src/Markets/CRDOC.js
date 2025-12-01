import CRDOCArtifact from '../../artifacts/CRDOC.json';
import CErc20 from './CErc20';
import { getDeprecationMetadata, warnDeprecatedOnce } from '../utils/deprecation';

export default class CRDOC extends CErc20 {
  constructor(tropykus, contractAddress, erc20TokenAddress) {
    super(
      tropykus,
      CRDOCArtifact.abi,
      contractAddress,
      erc20TokenAddress,
    );
    this.type = 'CRDOC';

    // Check for deprecation and display warning once per instance
    // Note: This check is in addition to CErc20's check, but warnDeprecatedOnce
    // ensures it only displays once per address
    const deprecationMetadata = getDeprecationMetadata(contractAddress);
    if (deprecationMetadata) {
      const marketName = 'CRDOC';
      warnDeprecatedOnce(contractAddress, marketName, deprecationMetadata);
    }
  }
}
