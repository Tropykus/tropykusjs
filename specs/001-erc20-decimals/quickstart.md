# Quickstart: 6-Decimal Token with 8-Decimal Oracle Integration

**Feature**: 6-Decimal Token with 8-Decimal Oracle Integration  
**Date**: 2025-01-27

## Overview

This quickstart focuses on integrating 6-decimal tokens (like USDT0/USDC) with 8-decimal price oracles (PriceOracleAdapterMoc and PriceOracleAdapterUSDT). The SDK automatically detects token decimals and oracle adapter decimal precision - no manual configuration needed.

## Testing Setup: 6-Decimal Token + 8-Decimal Oracle

### Prerequisites

1. **6-Decimal ERC20 Token**: Deploy or use existing mock token with 6 decimals (e.g., USDT0/USDC)
2. **PriceOracleAdapterMoc**: Deploy with 1e8 price for stablecoin
3. **PriceOracleAdapterUSDT**: Deploy for testing DECIMAL_MULTIPLIER (optional)
4. **Local Blockchain**: Use Anvil or Hardhat node for testing

### Complete Test Setup

```javascript
const Tropykus = require('@tropykus-finance/tropykus');
const { ethers } = require('ethers');
const PriceOracleAdapterMocArtifact = require('@tropykus-finance/tropykus/artifacts/PriceOracleAdapterMoc.json');
const PriceOracleAdapterUSDTArtifact = require('@tropykus-finance/tropykus/artifacts/PriceOracleAdapterUSDT.json');

// Setup providers (local Anvil node)
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const wsProvider = new ethers.providers.WebSocketProvider('ws://localhost:8545');
const tropykus = new Tropykus(provider, wsProvider);

// Get account
const [deployer] = await provider.listAccounts();
const account = await tropykus.getAccount(deployer.privateKey);

// 1. Deploy 6-decimal ERC20 token (mock USDT0)
const MockERC20Factory = await ethers.getContractFactory('MockERC20');
const usdtToken = await MockERC20Factory.deploy(
  'USDT0',
  'USDT0',
  6, // 6 decimals
  ethers.utils.parseUnits('1000000', 6) // 1M tokens
);
await usdtToken.deployed();

// 2. Deploy mock price provider with 1e8 price
const MockPriceProviderFactory = await ethers.getContractFactory('MockPriceProvider');
const priceProvider = await MockPriceProviderFactory.deploy(
  deployer.address, // guardian
  ethers.utils.parseUnits('1', 8) // 1.0 USD in 8 decimals (1e8)
);
await priceProvider.deployed();

// 3. Deploy PriceOracleAdapterMoc
const mocAdapterFactory = new ethers.ContractFactory(
  PriceOracleAdapterMocArtifact.abi,
  PriceOracleAdapterMocArtifact.bytecode,
  deployer
);
const mocAdapter = await mocAdapterFactory.deploy(
  deployer.address, // guardian
  priceProvider.address // priceProvider
);
await mocAdapter.deployed();

// 4. Deploy PriceOracleAdapterUSDT (optional)
const usdtAdapterFactory = new ethers.ContractFactory(
  PriceOracleAdapterUSDTArtifact.abi,
  PriceOracleAdapterUSDTArtifact.bytecode,
  deployer
);
const usdtAdapter = await usdtAdapterFactory.deploy(
  deployer.address, // guardian
  priceProvider.address // priceProvider
);
await usdtAdapter.deployed();

// 5. Deploy PriceOracleProxy (if not already deployed)
const PriceOracleProxyFactory = await ethers.getContractFactory('PriceOracleProxy');
const priceOracleProxy = await PriceOracleProxyFactory.deploy();
await priceOracleProxy.deployed();

// 6. Set price oracle in Tropykus
await tropykus.setPriceOracle(priceOracleProxy.address);

// 7. Create market for 6-decimal token
const market = await tropykus.addMarket(
  account,
  'CErc20Immutable',
  marketAddress, // Deploy market contract first
  usdtToken.address, // 6-decimal token
  {
    comptrollerAddress: comptrollerAddress,
    interestRateModelAddress: interestRateModelAddress,
    initialExchangeRate: 0.02,
    name: 'kUSDT0',
    symbol: 'kUSDT0',
    decimals: 0, // Market token decimals
  }
);

// 8. Set oracle adapter to market
await tropykus.priceOracle.setAdapterToToken(
  account,
  market.address,
  mocAdapter.address // PriceOracleAdapterMoc with 8-decimal price
);

// 9. Verify oracle decimal detection
const oraclePrice = await tropykus.priceOracle.getUnderlyingPrice(market.address);
console.log('Oracle price:', oraclePrice); // Should be 1.0 (correctly divided by 1e8)

// 10. Test operations
// Deposit 1.0 USDT0 (6 decimals)
await market.mint(account, 1.0);
// Internally: 1.0 → 1000000 (1e6)

// Check balance with USD value
const balance = await market.balanceOfUnderlying(account);
console.log('Token balance:', balance.underlying.value); // 1.0
console.log('USD value:', balance.usd.value); // Should be 1.0 (correct conversion)

// Borrow 10.5 USDT0
await market.borrow(account, 10.5);
// Internally: 10.5 → 10500000 (10.5e6)

// Repay loan
await market.repayBorrow(account, 10.5);
```

### Testing USD Value Calculations

The key test is verifying that USD calculations work correctly with mixed decimals:

```javascript
// Test case: 1.5 USDT0 (6 decimals) with 1.0 USD price (8-decimal oracle)
// Expected USD value: 1.5 USD

// Deposit 1.5 USDT0
await market.mint(account, 1.5);

// Get balance
const balance = await market.balanceOfUnderlying(account);

// Verify calculations
expect(balance.underlying.value).to.equal(1.5); // 6-decimal token correctly formatted
expect(balance.usd.value).to.be.closeTo(1.5, 0.0001); // USD value correctly calculated

// Internal calculation:
// Token: 1500000 (6 decimals = 1.5 tokens)
// Oracle: 100000000 (8 decimals = 1.0 USD)
// USD = (1500000 * 10^2) * 100000000 / 10^8
//     = 150000000 * 100000000 / 100000000
//     = 150000000 / 10^8
//     = 1.5 USD ✓
```

### Testing PriceOracleAdapterUSDT DECIMAL_MULTIPLIER

```javascript
// Query DECIMAL_MULTIPLIER from USDT adapter
const usdtAdapterContract = new ethers.Contract(
  usdtAdapter.address,
  PriceOracleAdapterUSDTArtifact.abi,
  provider
);
const decimalMultiplier = await usdtAdapterContract.DECIMAL_MULTIPLIER();
console.log('DECIMAL_MULTIPLIER:', decimalMultiplier.toString());

// Use adapter for market
await tropykus.priceOracle.setAdapterToToken(
  account,
  market.address,
  usdtAdapter.address
);

// Verify price retrieval works correctly
const price = await tropykus.priceOracle.getUnderlyingPrice(market.address);
// Should correctly handle DECIMAL_MULTIPLIER-based conversion
```

## Basic Usage

### Working with 6-Decimal Tokens (e.g., USDC/USDT0)

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

## Oracle Integration Notes

### PriceOracleAdapterMoc
- Returns prices in **8-decimal format** (1e8)
- Used for stablecoin pricing
- SDK automatically detects and divides by 1e8 (not 1e18)

### PriceOracleAdapterUSDT
- Has `DECIMAL_MULTIPLIER` constant
- SDK queries this value at runtime to determine decimal precision
- Typically also uses 8 decimals

### Decimal Conversion Formula

For 6-decimal token with 8-decimal oracle:
```
USD Value = (tokenAmount * 10^(oracleDecimals - tokenDecimals)) * oraclePrice / 10^oracleDecimals
          = (tokenAmount * 10^2) * oraclePrice / 10^8
          = tokenAmount * oraclePrice / 10^6
```

Example:
- Token: 1.5 USDT0 = 1500000 (6 decimals)
- Oracle: 1.0 USD = 100000000 (8 decimals)
- USD = (1500000 * 100) * 100000000 / 100000000 = 1.5 USD ✓

## See Also

- [Oracle Adapter API](./contracts/oracle-adapter-api.md) - Oracle integration API reference
- [API Documentation](./contracts/decimal-api.md) - Detailed API reference
- [Data Model](./data-model.md) - Internal data structures
- [Research](./research.md) - Technical decisions and rationale

