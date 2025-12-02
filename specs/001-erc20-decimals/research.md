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

**Decision**: Handle 8-decimal oracle prices (1e8) for 6-decimal tokens, with adapter-specific conversion logic

**Rationale**:
- PriceOracleAdapterMoc returns prices in 1e8 format (8 decimals) for stablecoins
- PriceOracleAdapterUSDT has DECIMAL_MULTIPLIER constant (needs investigation of actual value)
- Current PriceOracle.getUnderlyingPrice() divides by 1e18, assuming 18-decimal prices
- Need to detect oracle adapter type and apply correct decimal conversion

**Oracle Adapter Analysis**:

1. **PriceOracleAdapterMoc**:
   - Uses PriceProviderMoC contract
   - Returns prices in 1e8 format (8 decimals) per user requirement
   - Used for stablecoin pricing
   - Current code incorrectly divides by 1e18 instead of 1e8

2. **PriceOracleAdapterUSDT**:
   - Has DECIMAL_MULTIPLIER constant (view function)
   - Uses IRedstoneAdapter interface
   - DECIMAL_MULTIPLIER value needs to be queried at runtime
   - Likely also uses 8 decimals based on user requirement

**Implementation Strategy**:
- Detect oracle adapter type (Moc vs USDT) or query DECIMAL_MULTIPLIER
- Store oracle decimal precision (8) in PriceOracle instance
- Modify `getUnderlyingPrice()` to divide by correct factor (1e8 instead of 1e18)
- USD calculations: 
  - Token amount (6 decimals) → convert to 18 decimals for internal calculation
  - Oracle price (8 decimals) → convert to 18 decimals
  - Multiply: (token_amount_18dec) * (price_18dec) / 1e18 = USD value
  - Or: (token_amount_6dec) * (price_8dec) * (1e18 / 1e6 / 1e8) = USD value

**Conversion Formula**:
```
USD Value = (tokenAmount * 10^(18 - tokenDecimals)) * (oraclePrice * 10^(18 - oracleDecimals)) / 10^18
For 6-decimal token with 8-decimal oracle:
USD Value = (tokenAmount * 10^12) * (oraclePrice * 10^10) / 10^18
         = tokenAmount * oraclePrice * 10^4 / 10^18
         = tokenAmount * oraclePrice / 10^14
```

**Alternative (Simpler) Approach**:
- Keep oracle price in native format (8 decimals)
- Convert token amount to match oracle decimals: tokenAmount * 10^(oracleDecimals - tokenDecimals)
- Multiply directly: (tokenAmount * 10^2) * oraclePrice / 10^oracleDecimals
- For 6-decimal token, 8-decimal oracle: (tokenAmount * 100) * oraclePrice / 1e8

### 7. Testing Strategy (Reduced Scope)

**Decision**: Focus on 6-decimal token with 8-decimal oracle integration testing

**Rationale**:
- Reduced scope focuses on specific use case: 6-decimal tokens (USDT/USDC) with 8-decimal oracle
- Need real blockchain interactions to test decimal detection and oracle conversion
- Integration tests catch issues unit tests might miss
- Specific adapters: PriceOracleAdapterMoc.json and PriceOracleAdapterUSDT.json

**Test Setup Required**:
1. **6-Decimal Token**: Deploy or use existing 6-decimal ERC20 token (e.g., USDT/USDC mock)
2. **PriceOracleAdapterMoc**: Deploy with 1e8 price for stablecoin
3. **PriceOracleAdapterUSDT**: Deploy and connect to market
4. **Market Creation**: Create market for 6-decimal token
5. **Oracle Setup**: Connect adapters to PriceOracleProxy
6. **Operations**: Test deposit, withdraw, borrow, repay with correct decimal handling
7. **USD Calculations**: Verify USD value calculations use correct decimal conversion

**Test Scenarios**:
- Deposit 1.0 token → Verify 1000000 (1e6) sent to contract
- Query balance → Verify 1.0 displayed (6-decimal formatting)
- Get USD value → Verify correct conversion: (tokenAmount * price) / 10^14
- Borrow 10.5 tokens → Verify 10500000 (10.5e6) borrowed
- Repay loan → Verify correct 6-decimal parsing

## Summary

All research questions resolved. Key decisions:
1. Use `parseUnits()`/`formatUnits()` with decimal parameter
2. Cache decimals per token instance
3. Fallback to 18 decimals with warning if `decimals()` missing
4. Maintain backward compatibility by detecting decimals automatically
5. Adjust FixedNumber factors based on detected decimals
6. Handle 8-decimal oracle prices correctly (divide by 1e8, not 1e18)
7. Test with 6-decimal token + 8-decimal oracle using PriceOracleAdapterMoc and PriceOracleAdapterUSDT

**Oracle-Specific Findings**:
- PriceOracleAdapterMoc returns prices in 1e8 format (8 decimals)
- PriceOracleAdapterUSDT has DECIMAL_MULTIPLIER (query at runtime)
- Current PriceOracle.getUnderlyingPrice() incorrectly assumes 18 decimals
- Need to detect/store oracle decimal precision and apply correct conversion

**Reduced Scope Focus**:
- 6-decimal tokens (USDT/USDC stablecoins)
- 8-decimal oracle (1e8 prices)
- Specific adapters: PriceOracleAdapterMoc.json and PriceOracleAdapterUSDT.json

No blocking issues identified. Ready to proceed with design phase.

