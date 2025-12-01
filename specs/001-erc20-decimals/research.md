# Research: ERC20 Multi-Decimal Support

**Date**: 2025-01-27  
**Feature**: ERC20 Multi-Decimal Support  
**Status**: Complete

## Research Questions

1. How to use ethers.js utilities for different decimal amounts?
2. Best practices for decimal detection and caching?
3. Error handling for tokens without `decimals()` function?
4. Backward compatibility strategies?

## Findings

### 1. Ethers.js Decimal Handling

**Decision**: Use `ethers.utils.parseUnits()` and `ethers.utils.formatUnits()` instead of `parseEther()`/`formatEther()`

**Rationale**: 
- `parseEther()` and `formatEther()` are convenience functions that hardcode 18 decimals
- `parseUnits(value, decimals)` and `formatUnits(value, decimals)` accept decimal amount as parameter
- These functions handle all valid decimal amounts (0-255) correctly
- They maintain precision using BigNumber internally

**Alternatives Considered**:
- Manual calculation with `BigNumber.from(value).mul(BigNumber.from(10).pow(decimals))` - More error-prone, less readable
- Creating custom utility functions - Unnecessary when ethers.js provides the functionality

**Example Usage**:
```javascript
// Instead of: ethers.utils.parseEther('1.0')
// Use: ethers.utils.parseUnits('1.0', 6) // for 6-decimal token

// Instead of: ethers.utils.formatEther(bigNumber)
// Use: ethers.utils.formatUnits(bigNumber, 6) // for 6-decimal token
```

### 2. Decimal Detection and Caching

**Decision**: Cache decimal amount per token address in Market/CErc20 instance

**Rationale**:
- ERC20 `decimals()` is a view function (read-only, no gas cost for callStatic)
- Decimal amount never changes for a token contract (immutable)
- Caching avoids repeated contract calls
- Store in instance property (e.g., `this.tokenDecimals`) after first fetch

**Alternatives Considered**:
- Global cache across all instances - More complex, potential memory issues
- Fetch on every operation - Inefficient, unnecessary contract calls
- Hardcode common decimals - Not flexible, doesn't handle all tokens

**Implementation Pattern**:
```javascript
async getTokenDecimals() {
  if (this.tokenDecimals === undefined) {
    try {
      this.tokenDecimals = await this.erc20Instance.decimals();
    } catch (error) {
      // Fallback to 18 if decimals() not implemented
      this.tokenDecimals = 18;
    }
  }
  return this.tokenDecimals;
}
```

### 3. Error Handling for Missing `decimals()` Function

**Decision**: Fallback to 18 decimals with warning/error logging

**Rationale**:
- ERC20 standard makes `decimals()` optional (though ERC20Metadata requires it)
- Most modern tokens implement it, but legacy tokens may not
- Fallback to 18 maintains backward compatibility
- Log warning to help developers identify tokens without decimals()

**Alternatives Considered**:
- Throw error and fail - Too strict, breaks compatibility with legacy tokens
- Require manual decimal specification - Poor developer experience
- Default to 0 decimals - Incorrect for most tokens

**Implementation**:
- Try-catch around `decimals()` call
- If error occurs, default to 18 and log warning
- Document this behavior in JSDoc

### 4. Backward Compatibility Strategy

**Decision**: Maintain all existing 18-decimal code paths, add new decimal-aware paths

**Rationale**:
- Existing code uses `parseEther()`/`formatEther()` and hardcoded `1e18` factors
- Must ensure 18-decimal tokens continue working exactly as before
- New decimal-aware code should be opt-in or automatic (via detection)
- No breaking changes to public API

**Alternatives Considered**:
- Replace all code immediately - High risk, potential bugs
- Feature flag - Unnecessary complexity for this feature
- Separate code paths - Code duplication, maintenance burden

**Implementation Strategy**:
1. Add decimal detection to Market/CErc20 constructors
2. Create utility functions that use detected decimals
3. Replace `parseEther()`/`formatEther()` calls with `parseUnits()`/`formatUnits()` using detected decimals
4. Replace hardcoded `1e18` factors with `10^decimals` calculations
5. Ensure 18-decimal tokens get decimals=18, maintaining exact same behavior

### 5. FixedNumber and Decimal Precision

**Decision**: Continue using FixedNumber for calculations, but adjust factor based on decimals

**Rationale**:
- Current codebase uses `FixedNumber` with `format = 'fixed80x18'`
- FixedNumber format specifies bit width and decimal places
- For calculations, we can use FixedNumber with appropriate scaling
- Factor should be `10^decimals` instead of hardcoded `1e18`

**Implementation**:
```javascript
// Instead of: const factor = FixedNumber.fromString(1e18.toString(), format);
// Use: const factor = FixedNumber.fromString((10 ** decimals).toString(), format);
```

**Note**: FixedNumber format 'fixed80x18' refers to 80-bit width with 18 decimal places in the format itself, not the token decimals. This is fine for internal calculations as long as we scale correctly.

### 6. Price Oracle Decimal Handling

**Decision**: Price oracle returns values in 18-decimal format (standard), convert token amounts accordingly

**Rationale**:
- Price oracles typically return prices with 18 decimals (wei precision)
- Token amounts need conversion from their native decimals to 18 decimals for USD calculations
- Then convert back for display/operations

**Implementation**:
- When calculating USD: Convert token amount (native decimals) → 18 decimals → multiply by price (18 decimals) → result in 18 decimals
- When displaying: Convert from 18 decimals back to native decimals for user display

### 7. Testing Strategy

**Decision**: Create test tokens with different decimal amounts (0, 2, 6, 8, 18) for integration tests

**Rationale**:
- Need real blockchain interactions to test decimal detection
- Multiple decimal amounts ensure comprehensive coverage
- Integration tests catch issues unit tests might miss

**Test Tokens Needed**:
- 0 decimals: Simple integer token
- 2 decimals: Common for fiat-pegged tokens
- 6 decimals: USDC-like stablecoin
- 8 decimals: WBTC-like wrapped asset
- 18 decimals: Standard ERC20 (backward compatibility)

## Summary

All research questions resolved. Key decisions:
1. Use `parseUnits()`/`formatUnits()` with decimal parameter
2. Cache decimals per token instance
3. Fallback to 18 decimals with warning if `decimals()` missing
4. Maintain backward compatibility by detecting decimals automatically
5. Adjust FixedNumber factors based on detected decimals
6. Handle price oracle conversions correctly
7. Test with multiple decimal amounts

No blocking issues identified. Ready to proceed with design phase.

