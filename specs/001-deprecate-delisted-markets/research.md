# Research: Deprecate Delisted Markets

**Feature**: Deprecate Delisted Markets  
**Date**: 2025-12-01  
**Phase**: 0 - Outline & Research

## Research Questions

### Q1: Which markets are delisted and require deprecation?

**Decision**: Markets not in the current listed set (kDOC, kRBPRO, kRBTC, kUSDRF) are deprecated. Specifically: kSAT/cSAT, kRDOC/cRDOC, kRIF, kUSDT, and any other markets not in the listed set. Note: prefix "c" or "k" refers to the same market (e.g., cSAT = kSAT, cRDOC = kRDOC).

**Rationale**: Clarified during specification review. The currently listed markets are: kDOC, kRBPRO, kRBTC, kUSDRF. Any market not in this set is considered deprecated. The "c" and "k" prefixes are interchangeable (both refer to the same market type).

**Alternatives considered**:
- Query Comptroller on-chain to check `isListed` status: Rejected because this requires runtime blockchain access and doesn't help with static code deprecation
- Maintain a hardcoded list in code: Selected approach - maintain a list of deprecated market artifacts that can be checked at instantiation
- Remove delisted markets entirely: Rejected because specification requires backward compatibility (FR-005)

**Implementation**: Create deprecation configuration mapping artifacts (CRBTC for kSAT/cSAT, CRDOC for kRDOC/cRDOC, CErc20Immutable for kRIF/kUSDT) to deprecation metadata.

### Q2: How should deprecation warnings be implemented in JavaScript/Node.js?

**Decision**: Use console.warn() for runtime warnings with structured deprecation messages. JSDoc @deprecated tags for static documentation. Create a deprecation utility function to ensure consistent warning format.

**Rationale**: 
- `console.warn()` is standard in Node.js and visible in development without breaking functionality
- JSDoc @deprecated tags are industry standard and automatically appear in generated documentation
- A utility function ensures consistent formatting and makes it easy to update warning messages

**Alternatives considered**:
- Throw errors: Rejected - violates FR-005 (backward compatibility)
- Silent deprecation (JSDoc only): Rejected - violates FR-003 (must display warnings)
- Custom logging framework: Rejected - adds unnecessary dependency, console.warn is sufficient

**Implementation Pattern**:
```javascript
// Utility function pattern
function warnDeprecated(marketName, reason, alternative) {
  console.warn(
    `[DEPRECATED] ${marketName} is deprecated. ${reason}. ` +
    (alternative ? `Use ${alternative} instead.` : '')
  );
}
```

### Q3: What is the best practice for JSDoc deprecation tags?

**Decision**: Use standard JSDoc @deprecated tag with deprecation reason. No removal timeline or specific alternatives required.

**Rationale**: JSDoc @deprecated is the standard way to mark deprecated code. It automatically appears in generated documentation and is recognized by IDEs. Clarified during specification review that removal timeline and alternatives are not required.

**Format**:
```javascript
/**
 * @deprecated This market has been delisted from the protocol.
 */
```

**Alternatives considered**:
- Include removal timeline: Rejected - not required per specification clarification
- Include @see tag with alternatives: Rejected - no specific alternatives required per specification clarification
- Custom deprecation comments: Rejected - not recognized by tooling
- Separate deprecation file: Rejected - harder to maintain, less discoverable

### Q4: How to handle deprecation warnings without performance impact?

**Decision**: Display warning once per market instance on first instantiation only. Cache deprecation status per instance to avoid repeated warnings.

**Rationale**: 
- Performance requirement: warnings must not impact runtime performance
- User experience: warning once per instance is sufficient, repeated warnings are annoying
- Specification clarification: warnings must be displayed once per instance (on first instantiation only)
- Implementation: track warned instances using instance-level flag or Set of instance identifiers

**Alternatives considered**:
- Warn on every method call: Rejected - performance impact and user annoyance, violates specification
- Warn once per market type (class-level): Rejected - specification requires once per instance
- Environment variable to disable warnings: Considered but not required by spec - can be added later if needed
- Warning only in development: Rejected - violates FR-003 (must display warnings)

**Implementation Pattern**:
```javascript
class DeprecatedMarket {
  constructor() {
    // ... existing constructor logic ...
    
    // Warn once per instance
    if (!this._deprecationWarned) {
      warnDeprecated('MarketName', { reason: 'Market delisted' });
      this._deprecationWarned = true;
    }
  }
}
```

### Q5: How to identify deprecated markets in code for marking?

**Decision**: Create a centralized deprecation configuration object mapping market addresses to deprecation metadata. Deprecation must be address-based, not artifact-based, because the same artifact type is used for both listed and deprecated markets.

**Rationale**: 
- CRBTC artifact is used for both kRBTC (listed) and kSAT/cSAT (deprecated) - distinguished by address
- CErc20Immutable artifact is used for kDOC, kUSDRIF, kBPRO (listed) and kRIF, kUSDT (deprecated) - distinguished by address
- CRDOC artifact is used for kRDOC/cRDOC (deprecated) - but may also be used for listed markets in the future
- Centralized address-based configuration makes it easy to update when markets are delisted
- Can be checked at market instantiation time using the marketAddress parameter

**Structure**:
```javascript
const DEPRECATED_MARKETS = {
  addresses: {
    // kSAT/cSAT market address (uses CRBTC artifact)
    '0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6': {
      deprecated: true,
      reason: 'Market delisted from protocol (kSAT/cSAT)'
    },
    // kRDOC/cRDOC market address (uses CRDOC artifact)
    '0x0000000000000000000000000000000000000000': {
      deprecated: true,
      reason: 'Market never listed (kRDOC/cRDOC)'
    },
    // kRIF market address (uses CErc20Immutable artifact)
    '0x3134b7fbfca5db217eca523eab1941452cf35163': {
      deprecated: true,
      reason: 'Market delisted from protocol (kRIF)'
    },
    // kUSDT market address (uses CErc20Immutable artifact)
    '0xedaefc6b596ed38d712100976969975a37c84464': {
      deprecated: true,
      reason: 'Market delisted from protocol (kUSDT)'
    }
  }
};
```

**Note**: The "c" and "k" prefixes refer to the same market (e.g., cSAT = kSAT, cRDOC = kRDOC). Deprecation is based on market address, not artifact type or prefix. Addresses should be stored in lowercase for consistent comparison.

**Alternatives considered**:
- Hardcode in each market class: Rejected - harder to maintain, violates DRY
- External config file: Considered but overkill for this use case
- Database/API lookup: Rejected - adds complexity and external dependency

## Technical Decisions Summary

1. **Deprecation Detection**: Centralized address-based configuration object (DEPRECATED_MARKETS.addresses). Markets are identified by contract address, not artifact type, because the same artifact can be used for both listed and deprecated markets (e.g., CRBTC for both kRBTC and kSAT, CErc20Immutable for kDOC/kUSDRIF/kBPRO and kRIF/kUSDT)
2. **Runtime Warnings**: console.warn() with utility function, displayed once per market instance (on first instantiation only)
3. **Static Documentation**: JSDoc @deprecated tags with deprecation reason (no alternatives or removal timeline required)
4. **Performance**: Cache warnings per instance to display only once per instance
5. **Backward Compatibility**: All deprecated markets remain fully functional

## Resolved Clarifications

1. **Which specific markets are delisted?** - RESOLVED: kSAT/cSAT, kRDOC/cRDOC, kRIF, kUSDT, and any market not in listed set (kDOC, kRBPRO, kRBTC, kUSDRF)
2. **Deprecation timeline?** - RESOLVED: Not required - only deprecation reason needed
3. **Migration path?** - RESOLVED: No specific alternatives required - just state markets are deprecated

## Next Steps

1. Implement deprecation utility function
3. Add deprecation configuration
4. Mark code with JSDoc @deprecated tags
5. Update documentation

