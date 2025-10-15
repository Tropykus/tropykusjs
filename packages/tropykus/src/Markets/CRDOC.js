/**
 * @deprecated CRDOC market is deprecated and will be removed in a future version.
 * Use CErc20Immutable (CToken) instead for RIF Dollar on Chain markets.
 * This class is kept for backward compatibility only.
 */

import CRDOCArtifact from '../../artifacts/CRDOC.json';
import CErc20 from './CErc20';

export default class CRDOC extends CErc20 {
  constructor(tropykus, contractAddress, erc20TokenAddress, options = {}) {
    console.warn(
      'DEPRECATION WARNING: CRDOC market is deprecated. Use CErc20Immutable (CToken) instead.',
    );
    super(
      tropykus,
      CRDOCArtifact.abi,
      contractAddress,
      erc20TokenAddress,
      options,
    );
    this.type = 'CRDOC';
  }
}
