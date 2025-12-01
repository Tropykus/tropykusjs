# API Contract: Decimal-Aware Token Operations

**Feature**: ERC20 Multi-Decimal Support  
**Date**: 2025-01-27  
**Type**: JavaScript SDK API

## Overview

This document describes the API changes for decimal-aware token operations. All changes maintain backward compatibility - existing code using 18-decimal tokens continues to work without modification.

## New Utility Functions

### `getTokenDecimals()`

**Location**: `packages/tropykus/src/utils/decimals.js`

**Signature**:
```javascript
/**
 * Gets the decimal amount for an ERC20 token, with caching
 * @param {ethers.Contract} erc20Instance - The ERC20 token contract instance
 * @returns {Promise<number>} The decimal amount (0-255, typically 0-18)
 */
async function getTokenDecimals(erc20Instance)
```

**Behavior**:
- Calls `erc20Instance.decimals()` via `callStatic`
- Returns cached value if already fetched
- Defaults to 18 if `decimals()` is not implemented or fails
- Logs warning if fallback to 18 is used

**Example**:
```javascript
const decimals = await getTokenDecimals(market.erc20Instance);
// Returns: 6 for USDC, 8 for WBTC, 18 for standard tokens
```

### `parseTokenAmount(amount, decimals)`

**Location**: `packages/tropykus/src/utils/decimals.js`

**Signature**:
```javascript
/**
 * Parses human-readable token amount to contract format
 * @param {string|number} amount - Human-readable amount (e.g., "1.5")
 * @param {number} decimals - Decimal precision for the token
 * @returns {ethers.BigNumber} Amount in contract format
 */
function parseTokenAmount(amount, decimals)
```

**Behavior**:
- Wrapper around `ethers.utils.parseUnits(amount, decimals)`
- Validates input
- Returns BigNumber in contract format

**Example**:
```javascript
const contractAmount = parseTokenAmount("1.5", 6);
// Returns: BigNumber(1500000) for 6-decimal token
```

### `formatTokenAmount(amount, decimals)`

**Location**: `packages/tropykus/src/utils/decimals.js`

**Signature**:
```javascript
/**
 * Formats contract format amount to human-readable
 * @param {ethers.BigNumber|string} amount - Amount in contract format
 * @param {number} decimals - Decimal precision for the token
 * @returns {string} Human-readable amount (e.g., "1.5")
 */
function formatTokenAmount(amount, decimals)
```

**Behavior**:
- Wrapper around `ethers.utils.formatUnits(amount, decimals)`
- Returns formatted string with appropriate decimal places

**Example**:
```javascript
const humanAmount = formatTokenAmount(BigNumber(1500000), 6);
// Returns: "1.5" for 6-decimal token
```

## Modified Market Methods

All methods below now use detected decimals instead of hardcoded 18. The API signatures remain unchanged for backward compatibility.

### `CErc20.mint(account, amount)`

**Changes**:
- Internally uses `parseTokenAmount(amount, this.tokenDecimals)` instead of `parseEther(amount)`
- Decimal amount is detected and cached during constructor

**Backward Compatibility**: ✅ No API changes, 18-decimal tokens work identically

**Example**:
```javascript
// Works for any decimal amount
await market.mint(account, "1.5"); // Automatically uses correct decimals
```

### `CErc20.repayBorrow(account, amount, maxValue)`

**Changes**:
- Uses `parseTokenAmount()` with detected decimals
- Max value calculation uses correct decimal factor

**Backward Compatibility**: ✅ No API changes

### `CErc20.transferUnderlying(accountFrom, addressTo, amount)`

**Changes**:
- Uses `parseTokenAmount()` with detected decimals

**Backward Compatibility**: ✅ No API changes

### `CErc20.balanceOfUnderlyingInWallet(account)`

**Changes**:
- Uses `formatTokenAmount()` with detected decimals for display
- Internal calculations use correct decimal factor

**Backward Compatibility**: ✅ Return format unchanged, values now accurate for non-18-decimal tokens

### `Market.balanceOf(account)`

**Changes**:
- Uses detected decimals for underlying token formatting
- USD calculations convert between token decimals and 18-decimal price oracle correctly

**Backward Compatibility**: ✅ Return format unchanged

### `Market.balanceOfUnderlying(account)`

**Changes**:
- Uses detected decimals for formatting
- Price calculations handle decimal conversion correctly

**Backward Compatibility**: ✅ Return format unchanged

### `Market.getTokensFromUnderlying(account, amount)`

**Changes**:
- Uses `parseTokenAmount()` with detected decimals
- Exchange rate calculations use correct decimal factor

**Backward Compatibility**: ✅ No API changes

### `Market.borrow(account, amount)`

**Changes**:
- Uses `parseTokenAmount()` with detected decimals

**Backward Compatibility**: ✅ No API changes

### `Market.redeem(account, amount)`

**Changes**:
- Uses `parseTokenAmount()` with detected decimals

**Backward Compatibility**: ✅ No API changes

### `Market.redeemUnderlying(account, amount)`

**Changes**:
- Uses `parseTokenAmount()` with detected decimals

**Backward Compatibility**: ✅ No API changes

## Internal Changes (Not Public API)

### `Market` and `CErc20` Constructors

**Changes**:
- Automatically detect and cache `tokenDecimals` during initialization
- Store as `this.tokenDecimals` property

**Impact**: Internal only, no API changes

### FixedNumber Factor Calculations

**Changes**:
- Replace hardcoded `1e18` with `10 ** this.tokenDecimals`
- Factor calculated dynamically based on token decimals

**Impact**: Internal only, ensures correct calculations

## Error Handling

### Missing `decimals()` Function

**Behavior**:
- Defaults to 18 decimals
- Logs warning: `"Token at ${address} does not implement decimals(), defaulting to 18"`

**User Impact**: None - operation continues with 18-decimal assumption

### Invalid Decimal Value

**Behavior**:
- If `decimals()` returns value outside 0-255 range, default to 18
- Logs warning with invalid value

**User Impact**: None - operation continues safely

## Migration Guide

### For Existing Code

**No changes required** for 18-decimal tokens. All existing code continues to work.

### For New Code Supporting Multi-Decimal Tokens

**Automatic**: Decimal detection happens automatically. No code changes needed.

**Manual Decimal Override** (if needed in future):
```javascript
// Not implemented in this feature, but could be added later
market.tokenDecimals = 6; // Override detected decimals
```

## Testing Contract

### Test Cases Required

1. **Decimal Detection**:
   - Token with 6 decimals → `getTokenDecimals()` returns 6
   - Token with 8 decimals → `getTokenDecimals()` returns 8
   - Token with 18 decimals → `getTokenDecimals()` returns 18
   - Token without `decimals()` → defaults to 18 with warning

2. **Amount Parsing**:
   - `parseTokenAmount("1.5", 6)` → `BigNumber(1500000)`
   - `parseTokenAmount("1.5", 8)` → `BigNumber(150000000)`
   - `parseTokenAmount("1.5", 18)` → `BigNumber("1500000000000000000")`

3. **Amount Formatting**:
   - `formatTokenAmount(BigNumber(1500000), 6)` → `"1.5"`
   - `formatTokenAmount(BigNumber(150000000), 8)` → `"1.5"`
   - `formatTokenAmount(BigNumber("1500000000000000000"), 18)` → `"1.5"`

4. **Market Operations**:
   - Deposit 1.0 token with 6 decimals → contract receives 1000000
   - Withdraw 1.0 token with 6 decimals → user receives 1000000 from contract
   - Balance queries return correct human-readable amounts

5. **Backward Compatibility**:
   - All existing 18-decimal token operations work identically
   - No breaking changes to return formats
   - All existing tests pass without modification

