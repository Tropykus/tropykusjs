import DEPRECATED_MARKETS from '../deprecation-config';

// Cache to track which markets have already been warned
const warnedMarkets = new Set();

/**
 * Get deprecation metadata for a market by address
 * @param {string} address - Market contract address (required)
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
 * @param {string} marketAddress - Market contract address (used as unique key)
 * @param {string} marketName - Display name of the market
 * @param {Object} metadata - Deprecation metadata
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
