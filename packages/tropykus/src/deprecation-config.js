/**
 * Configuration for deprecated markets
 * Update this file when markets are delisted
 *
 * Note: Deprecation is address-based, not artifact-based, because the same
 * artifact type can be used for both listed and deprecated markets.
 * For example, CRBTC is used for both kRBTC (listed) and kSAT (deprecated).
 *
 * Addresses are stored in lowercase for consistent comparison.
 */

const DEPRECATED_MARKETS = {
  addresses: {
    // kSAT/cSAT market address (uses CRBTC artifact)
    '0xf8a2e7a2bfa135a81f0c78edd6252a818619e2c3': {
      deprecated: true,
      reason: 'Market delisted from protocol (kSAT/cSAT)',
    },
    // kRDOC/cRDOC market address (uses CRDOC artifact)
    '0x1a389e93be8ef2b5d105dea44271d4426736a484': {
      deprecated: true,
      reason: 'Market delisted from protocol (kRDOC/cRDOC)',
    },
    // kRIF market address (uses CErc20Immutable artifact)
    '0xd22de9a3f9d87e6bf58783e44b5453b3deacb0fe': {
      deprecated: true,
      reason: 'Market delisted from protocol (kRIF)',
    },
    // kUSDT market address (uses CErc20Immutable artifact)
    '0x3ac74a85b80824caa8cc9dbae0ddce584f3d3e8e': {
      deprecated: true,
      reason: 'Market delisted from protocol (kUSDT)',
    },
    // Add more deprecated addresses as needed
  },
};

export default DEPRECATED_MARKETS;
