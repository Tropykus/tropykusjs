import CErc20ImmutableArtifact from '../../artifacts/CErc20Immutable.json';
import CErc20 from './CErc20';
import { getDeprecationMetadata, warnDeprecatedOnce } from '../utils/deprecation';

export default class cToken extends CErc20 {
  constructor(tropykus, contractAddress, erc20TokenAddress) {
    super(
      tropykus,
      CErc20ImmutableArtifact.abi,
      contractAddress,
      erc20TokenAddress,
    );

    // Deprecation check: We use address-based deprecation (not artifact-based) because
    // CErc20Immutable artifact (used by CToken) is used for both listed markets
    // (e.g., kDOC) and deprecated markets (e.g., kRIF, kUSDT). If we checked by
    // artifact, deprecating CErc20Immutable would incorrectly mark all listed
    // markets as deprecated. By checking the contract address, we can deprecate
    // specific markets without affecting other markets using the same artifact.
    // The warning is displayed only once per market instance.
    // Note: This check is in addition to CErc20's check, but warnDeprecatedOnce
    // ensures it only displays once per address.
    const deprecationMetadata = getDeprecationMetadata(contractAddress);
    if (deprecationMetadata) {
      const marketName = 'CToken';
      warnDeprecatedOnce(contractAddress, marketName, deprecationMetadata);
    }
  }
}
