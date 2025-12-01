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
    '0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6': {
      deprecated: true,
      reason: 'Market delisted from protocol (kSAT/cSAT)',
    },
    // kRDOC/cRDOC market address (uses CRDOC artifact)
    '0x0000000000000000000000000000000000000000': {
      deprecated: true,
      reason: 'Market never listed (kRDOC/cRDOC)',
    },
    // kRIF market address (uses CErc20Immutable artifact)
    '0x3134b7fbfca5db217eca523eab1941452cf35163': {
      deprecated: true,
      reason: 'Market delisted from protocol (kRIF)',
    },
    // kUSDT market address (uses CErc20Immutable artifact)
    '0xedaefc6b596ed38d712100976969975a37c84464': {
      deprecated: true,
      reason: 'Market delisted from protocol (kUSDT)',
    },
    // Add more deprecated addresses as needed
  },
};

export default DEPRECATED_MARKETS;
