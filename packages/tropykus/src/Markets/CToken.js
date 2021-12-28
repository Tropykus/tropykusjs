import CErc20ImmutableArtifact from '../../artifacts/CErc20Immutable.json';
import CErc20 from './CErc20';

export default class cToken extends CErc20 {
  constructor(tropykus, contractAddress, erc20TokenAddress) {
    super(
      tropykus,
      CErc20ImmutableArtifact.abi,
      contractAddress,
      erc20TokenAddress,
    );
  }
}
