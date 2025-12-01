import DEPRECATED_MARKETS from '../deprecation-config';

// Cache to track which markets have already been warned
const warnedMarkets = new Set();

/**
 * Get deprecation metadata for a market by address
 * 
 * Note: Deprecation is address-based, not artifact-based, because the same
 * artifact type can be used for both listed and deprecated markets.
 * For example, CRBTC artifact is used for both kRBTC (listed) and kSAT (deprecated).
 * If we used artifact-based deprecation, deprecating CRBTC would incorrectly
 * mark all kRBTC markets as deprecated, breaking the protocol.
 * 
 * @param {string} address - Market contract address (required). Address is used
 *   as the unique identifier because each market has a unique on-chain address,
 *   allowing us to deprecate specific markets (e.g., kSAT) without affecting
 *   other markets using the same artifact type (e.g., kRBTC).
 * @returns {Object|null} Deprecation metadata or null if not deprecated
 */
export function getDeprecationMetadata(address) {
  if (!address) {
    return null;
  }
  const lowerAddress = address.toLowerCase();
  return DEPRECATED_MARKETS.addresses[lowerAddress] || null;
}

/**
 * Display deprecation warning (called once per market type)
 * @param {string} marketName - Name of the deprecated market
 * @param {Object} metadata - Deprecation metadata
 */
export function warnDeprecated(marketName, metadata) {
  let message = `[DEPRECATED] ${marketName} is deprecated. ${metadata.reason}`;
  if (metadata.alternative) {
    message += ` Use ${metadata.alternative} instead.`;
  }
  if (metadata.since) {
    message += ` Deprecated since ${metadata.since}.`;
  }
  // eslint-disable-next-line no-console
  console.warn(message);
}

/**
 * Warn about deprecated market (only once per market instance)
 * 
 * This function uses address-based deprecation checking. The marketAddress is
 * used as the unique key to ensure warnings are displayed only once per market
 * instance, even if the same market is instantiated multiple times. This prevents
 * warning spam while ensuring developers are informed about deprecated markets.
 * 
 * @param {string} marketAddress - Market contract address (used as unique key
 *   for caching warnings). Address-based checking allows us to deprecate specific
 *   markets without affecting other markets using the same artifact type.
 * @param {string} marketName - Display name of the market
 * @param {Object} metadata - Deprecation metadata containing reason and optional
 *   alternative market suggestions
 */
export function warnDeprecatedOnce(marketAddress, marketName, metadata) {
  const lowerAddress = marketAddress.toLowerCase();
  if (!warnedMarkets.has(lowerAddress)) {
    warnDeprecated(marketName, metadata);
    warnedMarkets.add(lowerAddress);
  }
}

/**
 * Reset the warned markets cache (for testing purposes only)
 * @private
 */
export function resetWarnedMarketsCache() {
  warnedMarkets.clear();
}
