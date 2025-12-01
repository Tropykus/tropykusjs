# Data Model: Deprecate Delisted Markets

**Feature**: Deprecate Delisted Markets  
**Date**: 2025-12-01  
**Phase**: 1 - Design & Contracts

## Entities

### DeprecationMetadata

Represents metadata about a deprecated market.

**Attributes**:
- `deprecated` (boolean, required): Whether the market is deprecated
- `reason` (string, required): Explanation of why the market is deprecated
- `alternative` (string, optional): Recommended alternative market to use
- `since` (string, optional): Version when deprecation was introduced (e.g., "v0.3.0")
- `removalDate` (string, optional): Planned removal date (ISO 8601 format)

**Validation Rules**:
- `deprecated` must be `true` if this metadata exists
- `reason` must be non-empty string
- `since` must follow semantic versioning format if provided
- `removalDate` must be valid ISO 8601 date if provided

**Example**:
```javascript
{
  deprecated: true,
  reason: 'Market delisted from protocol on 2025-11-01',
  alternative: 'Use kRBTC market instead',
  since: 'v0.3.0',
  removalDate: '2026-12-01'
}
```

### DeprecationConfiguration

Centralized configuration mapping market addresses to deprecation metadata.

**Structure**:
```javascript
{
  addresses: {
    [marketAddress: string]: DeprecationMetadata
  }
}
```

**Attributes**:
- `addresses` (object, required): Map of market contract addresses (lowercase) to deprecation metadata

**Validation Rules**:
- `addresses` must contain at least one entry for deprecated markets
- All addresses must be valid Ethereum addresses (0x followed by 40 hex characters)
- Addresses must be stored in lowercase for consistent comparison
- Note: Deprecation is address-based, not artifact-based, because the same artifact type (e.g., CRBTC, CErc20Immutable) can be used for both listed and deprecated markets

**Example**:
```javascript
{
  addresses: {
    '0xf2250c3d8e81a562f55e4a207c218d50c62db087': {
      deprecated: true,
      reason: 'Market delisted from protocol (kSAT/cSAT)'
    },
    '0x0981eb51a91e6f89063c963438cadf16c2e44962': {
      deprecated: true,
      reason: 'Market delisted from protocol (kRDOC/cRDOC)'
    }
  }
}
```

## State Transitions

### Market Deprecation Lifecycle

1. **Active Market**: Market is listed and actively supported
   - No deprecation metadata exists
   - No warnings displayed
   - Full functionality available

2. **Deprecated Market**: Market is marked as deprecated
   - Deprecation metadata added to configuration
   - @deprecated JSDoc tags added to code
   - Warnings displayed on instantiation
   - Documentation updated with deprecation notices
   - Market remains fully functional (backward compatibility)

3. **Removed Market** (Future state, not in scope):
   - Market code removed in MAJOR version
   - Breaking change documented in CHANGELOG

## Relationships

- **Market Class** → **DeprecationMetadata**: One-to-one relationship. Each market class/instance can have at most one deprecation metadata entry (by artifact or address).
- **DeprecationConfiguration** → **DeprecationMetadata**: One-to-many relationship. Configuration contains multiple deprecation entries.

## Data Flow

1. **Market Instantiation**:
   - Developer calls `tropykus.addMarket(artifact, ...)` or creates market instance
   - System checks `DeprecationConfiguration` for artifact name or address
   - If found and `deprecated: true`, display warning (once per instance)
   - Market instance created normally (no functional changes)

2. **Documentation Generation**:
   - JSDoc parser reads @deprecated tags from source code
   - Generated documentation includes deprecation notices
   - README.md manually updated with deprecation markers

3. **Runtime Warning**:
   - First instantiation of deprecated market triggers warning
   - Warning cached to prevent repeated messages
   - Warning includes reason and alternative (if available)

## Constraints

- **Backward Compatibility**: Deprecated markets MUST remain fully functional (FR-005)
- **Performance**: Deprecation checks must not impact performance (warnings cached, checks are O(1) lookup)
- **Maintainability**: Deprecation configuration must be easy to update when new markets are delisted

