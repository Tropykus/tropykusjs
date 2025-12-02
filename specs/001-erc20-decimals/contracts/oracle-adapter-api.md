# API Contract: Oracle Adapter Decimal Integration

**Feature**: 6-Decimal Token with 8-Decimal Oracle Integration  
**Date**: 2025-01-27  
**Type**: JavaScript SDK API

## Overview

This document describes the API changes for integrating 6-decimal tokens (like USDT/USDC) with 8-decimal price oracles (PriceOracleAdapterMoc and PriceOracleAdapterUSDT). All changes maintain backward compatibility - existing code using 18-decimal tokens and 18-decimal oracles continues to work without modification.

## Oracle Adapter Detection

### `detectOracleDecimals(adapterAddress)`

**Location**: `packages/tropykus/src/PriceOracle.js`

**Signature**:
```javascript
/**
 * Detects the decimal precision for an oracle adapter
 * @param {string} adapterAddress - The oracle adapter contract address
 * @returns {Promise<number>} The decimal precision (8 for Moc/USDT, 18 default)
 */
async detectOracleDecimals(adapterAddress)
```

**Behavior**:
- Checks adapter type by examining contract interface
- For PriceOracleAdapterUSDT: Queries DECIMAL_MULTIPLIER constant
- For PriceOracleAdapterMoc: Returns 8 (1e8 format)
- Defaults to 18 if adapter type unknown
- Caches result in `adapterDecimalsMap`

**Example**:
```javascript
const oracleDecimals = await priceOracle.detectOracleDecimals(adapterAddress);
// Returns: 8 for PriceOracleAdapterMoc/USDT, 18 for unknown adapters
```

## Modified Methods

### `PriceOracle.getUnderlyingPrice(marketAddress)`

**Changes**:
- Detects oracle adapter decimals for the market's adapter
- Divides price by correct factor (1e8 for 8-decimal oracle, 1e18 for 18-decimal)
- Maintains backward compatibility (defaults to 1e18 if adapter unknown)

**Before**:
```javascript
getUnderlyingPrice(marketAddress) {
  return this.instance.callStatic
    .getUnderlyingPrice(marketAddress)
    .then((p) => Number(p) / 1e18); // Always divides by 1e18
}
```

**After**:
```javascript
async getUnderlyingPrice(marketAddress) {
  const priceMantissa = await this.instance.callStatic
    .getUnderlyingPrice(marketAddress);
  
  // Detect oracle decimals for this market's adapter
  const adapterAddress = await this.getAdapterAddress(marketAddress);
  const oracleDecimals = await this.detectOracleDecimals(adapterAddress);
  const divisor = BigNumber.from(10).pow(oracleDecimals);
  
  return Number(priceMantissa) / Number(divisor);
}
```

**Backward Compatibility**: ✅ Returns same format (number), only internal calculation changes

### `PriceOracle.setAdapterToToken(account, marketAddress, adapterAddress)`

**Changes**:
- Automatically detects and caches oracle decimals when adapter is set
- Stores adapter → decimals mapping for future price queries

**Behavior**:
- Sets adapter to token (existing functionality)
- Detects oracle decimals for the adapter
- Caches in `adapterDecimalsMap[adapterAddress]`

**Backward Compatibility**: ✅ No API changes, internal enhancement only

## USD Value Calculations

### `Market.balanceOfUnderlying(account)`

**Changes**:
- Handles 6-decimal token amounts correctly
- Converts oracle price from 8 decimals to internal calculation format
- Calculates USD value using correct decimal conversion

**Calculation Flow**:
1. Get token balance (6 decimals): e.g., 1500000 (1.5 tokens)
2. Get oracle price (8 decimals): e.g., 100000000 (1.0 USD)
3. Convert for calculation:
   - Option A: Convert both to 18 decimals, multiply, divide by 1e18
   - Option B: Convert token to match oracle decimals, multiply, divide by oracle decimals
4. Return USD value in human-readable format

**Example**:
```javascript
// Token: 1.5 USDT (6 decimals = 1500000)
// Oracle: 1.0 USD (8 decimals = 100000000)
// USD Value = (1500000 * 10^2) * 100000000 / 10^8
//          = 150000000 * 100000000 / 100000000
//          = 150000000 / 10^8
//          = 1.5 USD
```

**Backward Compatibility**: ✅ Return format unchanged

### `Market.balanceOf(account)`

**Changes**:
- Similar to `balanceOfUnderlying()`, handles decimal conversion correctly
- Uses detected token decimals and oracle decimals

**Backward Compatibility**: ✅ Return format unchanged

## Internal Changes (Not Public API)

### `PriceOracle` Constructor

**Changes**:
- Initializes `adapterDecimalsMap` property
- Sets default `oracleDecimals` to 18 (backward compatibility)

**Impact**: Internal only, no API changes

### Oracle Decimal Detection Logic

**Changes**:
- New method `detectOracleDecimals()` to identify adapter type
- Caching mechanism for adapter decimal precision
- Support for PriceOracleAdapterMoc (8 decimals) and PriceOracleAdapterUSDT (query DECIMAL_MULTIPLIER)

**Impact**: Internal only, improves accuracy of price calculations

## Error Handling

### Unknown Adapter Type

**Behavior**:
- Defaults to 18 decimals
- Logs warning: `"Unknown oracle adapter type at ${address}, defaulting to 18 decimals"`
- Operation continues with 18-decimal assumption

**User Impact**: None - operation continues safely, maintains backward compatibility

### DECIMAL_MULTIPLIER Query Failure

**Behavior**:
- If PriceOracleAdapterUSDT DECIMAL_MULTIPLIER query fails, default to 18
- Logs warning with error details
- Operation continues with safe default

**User Impact**: None - operation continues with conservative default

### Adapter Not Set

**Behavior**:
- If adapter not set for market, use default 18 decimals
- Maintains backward compatibility for markets without adapters

**User Impact**: None - existing behavior preserved

## Testing API

### Test Setup for 6-Decimal Token + 8-Decimal Oracle

**Required Components**:
1. 6-decimal ERC20 token (mock USDT/USDC)
2. PriceOracleAdapterMoc deployed with 1e8 price
3. PriceOracleAdapterUSDT deployed (optional, for testing DECIMAL_MULTIPLIER)
4. Market created for 6-decimal token
5. Oracle adapter connected to market

**Test Scenarios**:
```javascript
// 1. Deploy 6-decimal token
const usdtToken = await deployMockERC20(6); // 6 decimals

// 2. Deploy PriceOracleAdapterMoc with 1e8 price
const priceProvider = await deployMockPriceProvider(1e8); // 8 decimals
const mocAdapter = await deployPriceOracleAdapterMoc(
  guardian,
  priceProvider.address
);

// 3. Create market
const market = await tropykus.addMarket(
  account,
  'CErc20Immutable',
  marketAddress,
  usdtToken.address, // 6-decimal token
  marketConfig
);

// 4. Set oracle adapter
await tropykus.priceOracle.setAdapterToToken(
  account,
  market.address,
  mocAdapter.address
);

// 5. Test price retrieval
const price = await tropykus.priceOracle.getUnderlyingPrice(market.address);
// Should return 1.0 (correctly divided by 1e8, not 1e18)

// 6. Test USD calculations
const balance = await market.balanceOfUnderlying(account);
// Should show correct USD value using 6-decimal token and 8-decimal oracle
```

## Migration Guide

### For Existing Code

**No changes required** - All changes are backward compatible. Existing code continues to work.

### For New Code Using 6-Decimal Tokens

1. Create market as usual - decimal detection is automatic
2. Set oracle adapter - decimal detection happens automatically
3. Use market methods as before - decimal conversion is handled internally

**Example**:
```javascript
// No code changes needed - everything works automatically
const market = await tropykus.addMarket(...);
await tropykus.priceOracle.setAdapterToToken(account, market.address, adapterAddress);
const balance = await market.balanceOfUnderlying(account); // Correct USD calculation
```

## Summary

- **Oracle decimal detection**: Automatic, based on adapter type
- **Price calculations**: Correct conversion for 8-decimal oracles
- **USD value calculations**: Handles 6-decimal tokens with 8-decimal oracles correctly
- **Backward compatibility**: 100% - no breaking changes
- **Testing**: Integration tests required for 6-decimal token + 8-decimal oracle scenario

