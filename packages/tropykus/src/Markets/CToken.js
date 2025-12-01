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

    // Check for deprecation and display warning once per instance
    // Note: This check is in addition to CErc20's check, but warnDeprecatedOnce
    // ensures it only displays once per address
    const deprecationMetadata = getDeprecationMetadata(contractAddress);
    if (deprecationMetadata) {
      const marketName = 'CToken';
      warnDeprecatedOnce(contractAddress, marketName, deprecationMetadata);
    }
  }
}
