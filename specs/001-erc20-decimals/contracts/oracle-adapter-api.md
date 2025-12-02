# API Contract: Oracle Adapter Decimal Integration

**Feature**: 6-Decimal Token with 8-Decimal Oracle Integration  
**Date**: 2025-01-27  
**Type**: JavaScript SDK API

## Overview

This document describes the API changes for integrating 6-decimal tokens (like USDT0/USDC) with 8-decimal price oracles (PriceOracleAdapterUSDT). All changes maintain backward compatibility - existing code using 18-decimal tokens and 18-decimal oracles (PriceOracleAdapterMoc) continues to work without modification.

## Oracle Adapter Detection

### `detectOracleDecimals(adapterAddress)`

**Location**: `packages/tropykus/src/PriceOracle.js`

**Signature**:
```javascript
/**
 * Detects the decimal precision returned by assetPrices() for an oracle adapter
 * @param {string} adapterAddress - The oracle adapter contract address
 * @returns {Promise<number>} The decimal precision (18 for Moc returning 1e18, 30 for USDT returning 1e30, 18 default)
 */
async detectOracleDecimals(adapterAddress)
```

**Behavior**:
- Checks adapter type by examining contract interface
- For PriceOracleAdapterUSDT: Returns 30 (assetPrices() returns 1e30 = 8-decimal oracle * 1e22 DECIMAL_MULTIPLIER)
- For PriceOracleAdapterMoc: Returns 18 (assetPrices() returns 1e18 matching onchain price provider behavior)
- Defaults to 18 if adapter type unknown
- Caches result in `adapterDecimalsMap`

**Example**:
```javascript
const oracleDecimals = await priceOracle.detectOracleDecimals(adapterAddress);
// Returns: 18 for PriceOracleAdapterMoc (assetPrices() returns 1e18), 30 for PriceOracleAdapterUSDT (assetPrices() returns 1e30), 18 for unknown adapters
// Note: PriceOracleAdapterUSDT.assetPrices() multiplies 8-decimal oracle price by 1e22 to return 1e30
// ComptrollerG6 uses 1e30 * amount * 1e16 = 1e36 for liquidity calculations
```

## Modified Methods

### `PriceOracle.getUnderlyingPrice(marketAddress)`

**Changes**:
- Detects oracle adapter decimals for the market's adapter (30 for USDT, 18 for MoC)
- Divides price by correct factor (1e30 for PriceOracleAdapterUSDT.assetPrices(), 1e18 for PriceOracleAdapterMoc.assetPrices())
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
  
  // Detect oracle decimals for this market's adapter (30 for USDT, 18 for MoC)
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
2. Get oracle price from assetPrices() (30 decimals for USDT, 18 decimals for MoC): e.g., 1000000000000000000000000000000 (1e30 = 1.0 USD for USDT) or 1000000000000000000 (1e18 = 1.0 USD for MoC)
3. Convert for calculation:
   - For MoC (1e18): Convert token to 18 decimals, multiply, divide by 1e18
   - For USDT (1e30): Multiply token amount by oracle price, divide by 1e30
4. Return USD value in human-readable format

**Example (USDT with 1e30 oracle from assetPrices())**:
```javascript
// Token: 1.5 USDT (6 decimals = 1500000)
// Oracle from assetPrices(): 1.0 USD (1e30 = 1000000000000000000000000000000)
// USD Value = (1500000 * 1000000000000000000000000000000) / 10^30
//          = 1500000000000000000000000000000000000 / 10^30
//          = 1500000 / 10^6
//          = 1.5 USD
```

**Example (MoC with 1e18 oracle from assetPrices())**:
```javascript
// Token: 1.5 tokens (6 decimals = 1500000)
// Oracle from assetPrices(): 1.0 USD (1e18 = 1000000000000000000)
// USD Value = (1500000 * 10^12) * 1000000000000000000 / 10^18
//          = 1500000000000000000 * 1000000000000000000 / 1000000000000000000
//          = 1500000000000000000 / 10^18
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
- New method `detectOracleDecimals()` to identify adapter type and return value from assetPrices()
- Caching mechanism for adapter decimal precision
- Support for PriceOracleAdapterMoc (assetPrices() returns 1e18, matching onchain provider) and PriceOracleAdapterUSDT (assetPrices() returns 1e30 = 8-decimal oracle * 1e22 DECIMAL_MULTIPLIER)
- ComptrollerG6 uses 1e30 * amount * 1e16 = 1e36 for USDT liquidity calculations, and 1e18 * amount * 1e18 = 1e36 for standard token liquidity calculations

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
1. 6-decimal ERC20 token (mock USDT0/USDC)
2. PriceOracleAdapterMoc deployed with MockPriceProviderMoC using 18 decimals (1e18 price format)
3. PriceOracleAdapterUSDT deployed with MockPriceProviderMoC using 8 decimals (1e8 price format)
4. Market created for 6-decimal token
5. Oracle adapter connected to market

**Test Scenarios**:
```javascript
// 1. Deploy 6-decimal token
const usdtToken = await deployMockERC20(6); // 6 decimals

// 2. Deploy PriceOracleAdapterMoc with 18-decimal price provider
const mocPriceProvider = await deployMockPriceProvider(18); // 18 decimals for MoC
const mocAdapter = await deployPriceOracleAdapterMoc(
  guardian,
  mocPriceProvider.address
);

// 2b. Deploy PriceOracleAdapterUSDT with 8-decimal price provider
const usdtPriceProvider = await deployMockPriceProvider(8); // 8 decimals for USDT
const usdtAdapter = await deployPriceOracleAdapterUSDT(
  guardian,
  usdtPriceProvider.address
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
// Should return 1.0 (correctly divided by 1e18 for MoC adapter, 1e30 for USDT adapter)

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

- **Oracle decimal detection**: Automatic, based on adapter type (18 for MoC assetPrices() returning 1e18, 30 for USDT assetPrices() returning 1e30)
- **Price calculations**: Correct conversion for 1e18 (MoC) and 1e30 (USDT) return values from assetPrices()
- **USD value calculations**: Handles 6-decimal tokens with both 1e18 (MoC) and 1e30 (USDT) oracle prices correctly
- **Liquidity calculations**: ComptrollerG6 multiplies 1e30 (USDT) or 1e18 (MoC) by amount * 1e16 (USDT) or amount * 1e18 (MoC) to achieve 1e36 order of magnitude for correct liquidity calculations
- **Backward compatibility**: 100% - no breaking changes
- **Testing**: Integration tests required for 6-decimal token + 8-decimal oracle scenario

