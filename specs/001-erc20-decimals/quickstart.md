# Quickstart: ERC20 Multi-Decimal Support

**Feature**: ERC20 Multi-Decimal Support  
**Date**: 2025-01-27

## Overview

The Tropykus SDK now automatically supports ERC20 tokens with any decimal amount (0-18, typically). Decimal detection happens automatically - no code changes needed for existing functionality.

## Basic Usage

### Working with 6-Decimal Tokens (e.g., USDC)

```javascript
const Tropykus = require('@tropykus-finance/tropykus');
const { ethers } = require('ethers');

// Setup (same as before)
const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
const wsProvider = new ethers.providers.WebSocketProvider('YOUR_WS_URL');
const tropykus = new Tropykus(provider, wsProvider);

// Get account
const account = await tropykus.getAccount(privateKey);

// Add market for 6-decimal token (e.g., USDC)
// Decimal detection happens automatically in addMarket
const usdcMarket = await tropykus.addMarket(
  account,
  'CErc20Immutable',
  marketAddress,
  usdcTokenAddress, // 6-decimal token
  {
    comptrollerAddress: comptrollerAddress,
    interestRateModelAddress: interestRateModelAddress,
    initialExchangeRate: 0.02,
    name: 'kUSDC',
    symbol: 'kUSDC',
    decimals: 0, // This is for the market token, not the underlying
  }
);

// Deposit 1.0 USDC (automatically uses 6 decimals)
await usdcMarket.mint(account, 1.0);
// Internally converts: 1.0 → 1000000 (1e6) for contract

// Check balance (automatically formats with 6 decimals)
const balance = await usdcMarket.balanceOfUnderlyingInWallet(account);
console.log(balance.underlying.value); // 1.0 (correctly formatted)

// Borrow 10.5 USDC
await usdcMarket.borrow(account, 10.5);
// Internally converts: 10.5 → 10500000 (10.5e6) for contract

// Repay loan
await usdcMarket.repayBorrow(account, 10.5);
// Uses correct 6-decimal conversion
```

### Working with 8-Decimal Tokens (e.g., WBTC)

```javascript
// Add market for 8-decimal token (e.g., WBTC)
const wbtcMarket = await tropykus.addMarket(
  account,
  'CErc20Immutable',
  marketAddress,
  wbtcTokenAddress, // 8-decimal token
  {
    comptrollerAddress: comptrollerAddress,
    interestRateModelAddress: interestRateModelAddress,
    initialExchangeRate: 0.02,
    name: 'kWBTC',
    symbol: 'kWBTC',
    decimals: 0,
  }
);

// Deposit 0.5 WBTC (automatically uses 8 decimals)
await wbtcMarket.mint(account, 0.5);
// Internally converts: 0.5 → 50000000 (0.5e8) for contract

// All operations work the same way
const balance = await wbtcMarket.balanceOf(account);
console.log(balance.underlying.value); // Correctly formatted with 8 decimals
```

### Working with Standard 18-Decimal Tokens

```javascript
// 18-decimal tokens work exactly as before - no changes needed
const standardMarket = await tropykus.addMarket(
  account,
  'CErc20Immutable',
  marketAddress,
  standardTokenAddress, // 18-decimal token
  {
    comptrollerAddress: comptrollerAddress,
    interestRateModelAddress: interestRateModelAddress,
    initialExchangeRate: 0.02,
    name: 'kTOKEN',
    symbol: 'kTOKEN',
    decimals: 0,
  }
);

// All existing code works identically
await standardMarket.mint(account, 1.0);
// Internally converts: 1.0 → 1000000000000000000 (1e18) for contract
// Same as before - backward compatible!
```

## Advanced Usage

### Checking Token Decimals

```javascript
// Decimals are automatically detected and cached
// You can access them if needed (though usually not necessary)
const decimals = await usdcMarket.erc20Instance.decimals();
console.log(decimals); // 6 for USDC, 8 for WBTC, 18 for standard tokens
```

### Handling Tokens Without `decimals()` Function

```javascript
// If a token doesn't implement decimals(), the SDK:
// 1. Defaults to 18 decimals
// 2. Logs a warning to console
// 3. Continues operation normally

// No code changes needed - handled automatically
const legacyMarket = await tropykus.addMarket(
  account,
  'CErc20Immutable',
  marketAddress,
  legacyTokenAddress, // Token without decimals() function
  { /* ... */ }
);

// Works with 18-decimal assumption
await legacyMarket.mint(account, 1.0);
```

### Multiple Markets with Different Decimals

```javascript
// You can use multiple markets with different decimals simultaneously
const usdcMarket = await tropykus.addMarket(/* 6-decimal USDC */);
const wbtcMarket = await tropykus.addMarket(/* 8-decimal WBTC */);
const standardMarket = await tropykus.addMarket(/* 18-decimal token */);

// Each market automatically uses its correct decimal amount
await usdcMarket.mint(account, 1.0);    // Uses 6 decimals
await wbtcMarket.mint(account, 0.5);    // Uses 8 decimals
await standardMarket.mint(account, 1.0); // Uses 18 decimals

// All operations work correctly for each market
```

## Migration from Previous Version

### For Existing Code

**No changes required!** All existing code using 18-decimal tokens continues to work exactly as before.

```javascript
// This code works without any modifications
const market = await tropykus.addMarket(/* ... */);
await market.mint(account, 1.0);
const balance = await market.balanceOf(account);
// All operations work identically for 18-decimal tokens
```

### For New Code Supporting Multi-Decimal Tokens

**Automatic!** Just use the SDK as normal - decimal detection happens automatically.

```javascript
// No special code needed - just use the SDK normally
// Decimal detection and conversion happen automatically
const market = await tropykus.addMarket(account, 'CErc20Immutable', marketAddress, tokenAddress);
await market.mint(account, 1.0); // Automatically uses correct decimals
```

## Common Patterns

### Depositing Tokens

```javascript
// Works for any decimal amount
await market.mint(account, amount);
// amount can be: 1.0, 1.5, 0.001, etc.
// SDK automatically converts using correct decimals
```

### Checking Balances

```javascript
// Returns human-readable amounts with correct decimal precision
const balance = await market.balanceOfUnderlyingInWallet(account);
console.log(balance.underlying.value); // Correctly formatted (e.g., 1.5 for 6-decimal token)
console.log(balance.usd.value);       // USD value with correct precision
```

### Borrowing and Repaying

```javascript
// Borrow with any decimal amount
await market.borrow(account, borrowAmount);

// Repay specific amount
await market.repayBorrow(account, repayAmount);

// Repay all (max value)
await market.repayBorrow(account, 0, true);
// All use correct decimal conversion automatically
```

## Error Handling

### Invalid Decimal Values

The SDK handles edge cases automatically:

```javascript
// If decimals() returns invalid value (>255), defaults to 18
// If decimals() throws error, defaults to 18
// Warning logged to console, but operation continues
```

### Precision in Calculations

All calculations maintain precision:

```javascript
// No rounding errors in critical operations
await market.mint(account, 1.123456); // For 6-decimal token
// Correctly converts to: 1123456 (no precision loss)
```

## Best Practices

1. **Trust the SDK**: Decimal detection happens automatically - don't manually specify decimals
2. **Use Human-Readable Amounts**: Always pass amounts like `1.5`, `10.0` - let the SDK convert
3. **Check Return Values**: Balance queries return human-readable values - use them directly
4. **Handle Warnings**: If you see warnings about missing `decimals()`, the token may need manual decimal specification (future feature)

## Troubleshooting

### Issue: Amounts seem incorrect

**Solution**: Ensure you're using human-readable amounts. The SDK handles conversion automatically.

```javascript
// ✅ Correct
await market.mint(account, 1.5);

// ❌ Incorrect (don't manually convert)
await market.mint(account, 1500000); // Wrong for 6-decimal token
```

### Issue: Warning about missing `decimals()`

**Solution**: This is handled automatically (defaults to 18). If the token actually has different decimals, you may need to wait for manual override feature (future).

### Issue: Backward compatibility concerns

**Solution**: All 18-decimal tokens work identically to before. No breaking changes.

## See Also

- [API Documentation](./contracts/decimal-api.md) - Detailed API reference
- [Data Model](./data-model.md) - Internal data structures
- [Research](./research.md) - Technical decisions and rationale

