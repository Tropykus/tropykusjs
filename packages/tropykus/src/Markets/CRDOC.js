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

    // Deprecation check: We use address-based deprecation (not artifact-based) because
    // the CRDOC artifact could potentially be used for other markets in the future.
    // If we checked by artifact, deprecating CRDOC would affect all markets using
    // this artifact type. By checking the contract address, we can deprecate
    // specific markets (e.g., kRDOC) without affecting other potential uses of
    // the CRDOC artifact. The warning is displayed only once per market instance.
    // Note: This check is in addition to CErc20's check, but warnDeprecatedOnce
    // ensures it only displays once per address.
    const deprecationMetadata = getDeprecationMetadata(contractAddress);
    if (deprecationMetadata) {
      const marketName = 'CRDOC';
      warnDeprecatedOnce(contractAddress, marketName, deprecationMetadata);
    }
  }
}
