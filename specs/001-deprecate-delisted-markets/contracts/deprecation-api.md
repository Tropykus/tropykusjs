# Deprecation API Contract

**Feature**: Deprecate Delisted Markets  
**Date**: 2025-12-01  
**Type**: Internal SDK API (not REST/GraphQL)

## Overview

This document defines the internal API contracts for deprecation functionality within the Tropykus SDK. These are code-level contracts, not HTTP endpoints.

## Deprecation Utility Function

### `warnDeprecated(marketName, metadata)`

Displays a deprecation warning for a market.

**Parameters**:
- `marketName` (string, required): Name or identifier of the deprecated market
- `metadata` (DeprecationMetadata, required): Deprecation metadata object

**Returns**: `void`

**Behavior**:
- Outputs warning to `console.warn()`
- Warning format: `[DEPRECATED] {marketName} is deprecated. {reason}. {alternative message if available}`
- Does not throw errors or interrupt execution
- Idempotent (can be called multiple times safely)

**Example**:
```javascript
warnDeprecated('CRBTC', {
  deprecated: true,
  reason: 'Market delisted from protocol',
  alternative: 'Use kRBTC market instead',
  since: 'v0.3.0'
});
// Output: [DEPRECATED] CRBTC is deprecated. Market delisted from protocol. Use kRBTC market instead.
```

## Deprecation Configuration Access

### `getDeprecationMetadata(address)`

Retrieves deprecation metadata for a market by contract address.

**Parameters**:
- `address` (string, required): Market contract address

**Returns**: `DeprecationMetadata | null`

**Behavior**:
- Checks `address` (converted to lowercase) in `DEPRECATED_MARKETS.addresses`
- Returns `null` if market is not deprecated
- Returns deprecation metadata object if found
- Note: Deprecation is address-based, not artifact-based, because the same artifact type can be used for both listed and deprecated markets

**Example**:
```javascript
const metadata = getDeprecationMetadata('0xf2250c3d8e81a562f55e4a207c218d50c62db087');
// Returns: { deprecated: true, reason: 'Market delisted from protocol (kSAT/cSAT)' }

const metadata = getDeprecationMetadata('0x636b2c156d09cee9516f9afec7a4605e1f43dec1');
// Returns: null (kRBTC is listed, not deprecated)
```

## Market Class Integration

### Market Constructor Contract

All market classes (CRBTC, CRDOC, CErc20, CToken) must:

1. **Check deprecation status** during instantiation
2. **Display warning once** per market type (cached)
3. **Continue normal instantiation** regardless of deprecation status

**Contract**:
```javascript
class Market {
  constructor(tropykus, abi, marketAddress) {
    // ... existing constructor logic ...
    
    // Deprecation check (by address, not artifact)
    const deprecationMetadata = getDeprecationMetadata(this.address);
    
    if (deprecationMetadata) {
      warnDeprecatedOnce(this.address, this.constructor.name, deprecationMetadata);
    }
  }
}
```

### `warnDeprecatedOnce(marketAddress, marketName, metadata)`

Displays deprecation warning only once per market instance.

**Parameters**:
- `marketAddress` (string, required): Market contract address (used as unique key)
- `marketName` (string, required): Display name of the market (e.g., "CRBTC")
- `metadata` (DeprecationMetadata, required): Deprecation metadata

**Returns**: `void`

**Behavior**:
- Uses address-based cache to track warned market instances
- Calls `warnDeprecated()` only on first invocation for each market address
- Subsequent calls for same market address are no-ops
- Address is normalized to lowercase for consistent comparison

## Tropykus.addMarket() Contract

### Modified Behavior

The `tropykus.addMarket()` method must:

1. **Check address deprecation** after creating market instance (if marketAddress is provided)
2. **Display warning** if address is deprecated
3. **Continue normal market creation** (backward compatibility)

**Contract**:
```javascript
async addMarket(account, artifact, marketAddress, erc20TokenAddress, args) {
  // ... existing market creation logic ...
  
  // After market is created, check address deprecation
  if (marketAddress) {
    const addressMetadata = getDeprecationMetadata(marketAddress);
    if (addressMetadata) {
      warnDeprecatedOnce(marketAddress, artifact, addressMetadata);
    }
  }
  
  // ... rest of method unchanged ...
}
```

## JSDoc Contract

### @deprecated Tag Format

All deprecated market classes and methods must include:

```javascript
/**
 * @deprecated Since {version}. {reason}
 * @see {@link AlternativeMarket} for the recommended alternative.
 * 
 * {class/method description}
 */
```

**Required Elements**:
- `@deprecated` tag with version and reason
- `@see` tag pointing to alternative (if available)
- Standard JSDoc description

**Example**:
```javascript
/**
 * CRBTC Market implementation
 * 
 * @deprecated Since v0.3.0. This market has been delisted from the protocol.
 * @see {@link CRBTC} for the recommended alternative.
 */
export default class CRBTC extends Market {
  // ...
}
```

## Error Handling

- **No errors thrown**: Deprecation checks and warnings must never throw errors or interrupt execution
- **Graceful degradation**: If deprecation configuration is missing or invalid, markets should function normally without warnings
- **Backward compatibility**: All deprecated markets must remain fully functional

## Performance Requirements

- **O(1) lookup**: Deprecation checks must be constant time (object property access)
- **Cached warnings**: Warnings displayed only once per market type/instance
- **No async operations**: Deprecation checks must be synchronous

