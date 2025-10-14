# API Contracts: Multi-Decimal Token Support

**Date**: 2025-10-14
**Feature**: Multi-Decimal Token Support (001-support-multi-decimal)

## Overview

This feature is a **library refactoring**, not a new API surface. Therefore, there are no new API contracts to define. The existing TropykusJS API remains unchanged in terms of method signatures and return structures.

## API Compatibility Statement

### Unchanged Public API

All public methods maintain their existing signatures:

- `tropykus.addMarket(artifact, deployed, marketAddress, erc20TokenAddress, args)`
- `market.mint(account, amount)`
- `market.borrow(account, amount)`
- `market.redeem(account, amount, maxValue)`
- `market.repayBorrow(account, amount, maxValue)`
- `market.balanceOfUnderlying(account)` → `{underlying, usd, fixedNumber}`
- `market.borrowBalanceCurrent(account)` → `{underlying, usd, fixedNumber}`
- `comptroller.getTotalSupplyInAllMarkets(account, markets, excludeMarket)`
- `comptroller.getTotalBorrowsInAllMarkets(account, markets, excludeMarket)`

### Extended Configuration (Backward Compatible)

The `args` parameter in `addMarket()` now accepts optional decimal configuration:

```javascript
// Existing usage (still works):
tropykus.addMarket('CErc20Immutable', true, marketAddr, tokenAddr, {
  comptrollerAddress: '0x...',
  interestRateModelAddress: '0x...',
});

// New usage with decimals:
tropykus.addMarket('CErc20Immutable', true, usdtMarketAddr, usdtTokenAddr, {
  tokenDecimals: 6,              // NEW: Optional, defaults to 18
  oracleDecimals: 8,             // NEW: Optional, defaults to 18
  comptrollerAddress: '0x...',   // Existing args still work
  interestRateModelAddress: '0x...',
});
```

## Configuration Schema

Since this is a library (not a REST/GraphQL API), the "contract" is the TypeScript/JSDoc type definition:

### DecimalConfiguration (Extended Args)

```typescript
interface MarketArgs {
  // Existing properties (unchanged):
  comptrollerAddress?: string;
  interestRateModelAddress?: string;
  initialExchangeRate?: number;
  name?: string;
  symbol?: string;
  decimals?: number;  // Note: This is kToken decimals (always 8), not underlying token decimals

  // NEW properties:
  tokenDecimals?: number;   // Underlying token decimals (0-18), defaults to 18
  oracleDecimals?: number;  // Price oracle decimals (0-18), defaults to 18
}
```

### Validation Contract

```typescript
// Pseudo-code contract:
function validateDecimalConfig(tokenDecimals?: number, oracleDecimals?: number): void {
  const td = tokenDecimals ?? 18;
  const od = oracleDecimals ?? 18;

  if (td < 0 || td > 18 || !Number.isInteger(td)) {
    throw new Error(`tokenDecimals must be integer 0-18, got: ${td}`);
  }

  if (od < 0 || od > 18 || !Number.isInteger(od)) {
    throw new Error(`oracleDecimals must be integer 0-18, got: ${od}`);
  }
}
```

## Return Value Contracts (Unchanged)

### BalanceResult

```typescript
interface BalanceResult {
  underlying: number;      // Token amount in human-readable form
  usd: number;            // USD value
  fixedNumber: FixedNumber; // High-precision representation
}
```

**Contract**: Structure unchanged. Semantics enhanced to correctly reflect token decimals.

### ExtendedBalanceResult

```typescript
interface ExtendedBalanceResult {
  underlying: {
    value: number;
    fixedNumber: FixedNumber;
  };
  usd: {
    value: number;
    fixedNumber: FixedNumber;
  };
  tokens: {
    value: number;
    fixedNumber: FixedNumber;
  };
}
```

**Contract**: Structure unchanged. Used by `balanceOf()` method.

## No REST/GraphQL Contracts

TropykusJS is a **JavaScript library**, not a web service. It does not expose HTTP endpoints, so there are no:

- OpenAPI/Swagger specifications
- GraphQL schemas
- REST endpoint definitions
- HTTP status codes
- Authentication/authorization contracts

## Smart Contract Interaction Patterns (Unchanged)

The library continues to interact with Tropykus Protocol smart contracts using the same ABI patterns:

### Transaction Methods

```javascript
// Mint operation (ERC20):
// 1. Approve ERC20 token
await erc20Instance.connect(signer).approve(marketAddress, amount);
// 2. Call mint on cToken
await marketInstance.connect(signer).mint(amount, { gasLimit });

// Borrow operation:
await marketInstance.connect(signer).borrow(amount, { gasLimit });

// Redeem operation:
await marketInstance.connect(signer).redeemUnderlying(amount, { gasLimit });
// OR (for maxValue):
await marketInstance.connect(signer).redeem(kTokens, { gasLimit });

// RepayBorrow operation (ERC20):
// 1. Approve ERC20 token
await erc20Instance.connect(signer).approve(marketAddress, amount);
// 2. Call repayBorrow on cToken
await marketInstance.connect(signer).repayBorrow(amount, { gasLimit });
```

**Change**: `amount` parameter now computed using `parseUnits(amount, tokenDecimals)` instead of `parseEther(amount)`.

### Read Methods

```javascript
// Balance queries:
const balance = await marketInstance.callStatic.balanceOfUnderlying(accountAddress);
const borrowBalance = await marketInstance.callStatic.borrowBalanceCurrent(accountAddress);
const exchangeRate = await marketInstance.callStatic.exchangeRateCurrent();

// Oracle price query:
const price = await oracleInstance.callStatic.getUnderlyingPrice(marketAddress);
```

**Change**: Returned mantissa values now divided by market-specific `tokenFactor` or `oracleFactor` instead of hardcoded `1e18`.

## Testing Contracts

### Test Coverage Requirements

Per Constitution Principle V (Contract Test Coverage), the following test scenarios MUST pass:

1. **6-Decimal Token Operations**:
   - Mint 100 units → transaction uses correct mantissa
   - Borrow 50 units → transaction uses correct mantissa
   - Redeem 75 units → transaction uses correct mantissa
   - RepayBorrow 50 units → transaction uses correct mantissa

2. **8-Decimal Oracle Calculations**:
   - Query balance → USD value computed correctly
   - Query borrow balance → USD value computed correctly
   - Liquidity calculation → aggregates correctly across markets

3. **Backward Compatibility**:
   - Existing 18-decimal tests pass without modification
   - No behavioral changes when decimals not configured

4. **Edge Cases**:
   - 0-decimal token operations
   - MaxValue redemption with 6-decimal token
   - MaxValue repayment with 6-decimal token
   - Multi-market aggregation (6-decimal + 18-decimal)

## Summary

**API Contract Status**: ✅ No breaking changes

**New Functionality**: Configurable via optional parameters, fully backward compatible

**Return Structures**: Unchanged

**Validation**: Enforced at construction time

**This refactoring maintains API stability while enabling new capabilities.**
