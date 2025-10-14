# Data Model: Multi-Decimal Token Support

**Date**: 2025-10-14
**Feature**: Multi-Decimal Token Support (001-support-multi-decimal)
**Phase**: 1 - Design

## Overview

This feature extends the existing TropykusJS data model to support configurable decimal precision for tokens and price oracles. The core entities (Market, CErc20, CRBTC, Comptroller) gain new decimal-related properties while maintaining backward compatibility with existing structures.

## Core Entities

### DecimalConfiguration

**Purpose**: Encapsulates decimal precision settings for a market

**Properties**:
- `tokenDecimals` (number, 0-18): Number of decimal places for the underlying token
- `oracleDecimals` (number, 0-18): Number of decimal places for price oracle responses
- `tokenFactor` (FixedNumber): Computed as 10^tokenDecimals, used for mantissa conversion
- `oracleFactor` (FixedNumber): Computed as 10^oracleDecimals, used for price normalization

**Validation Rules**:
- `tokenDecimals` must be integer in range [0, 18]
- `oracleDecimals` must be integer in range [0, 18]
- Both default to 18 when not explicitly provided
- Factors are computed once during market initialization

**Relationships**:
- Each Market instance has exactly one DecimalConfiguration
- Configuration is immutable after market creation

**State Diagram**:
```
[User provides args] → [Validate decimals] → [Compute factors] → [Store in Market]
                              ↓
                      [Invalid: throw Error]
```

---

### Market (Extended)

**Purpose**: Base class for all market types, now with decimal awareness

**New Properties**:
- `tokenDecimals` (number): Decimal precision of underlying token (default: 18)
- `oracleDecimals` (number): Decimal precision of price oracle (default: 18)
- `tokenFactor` (FixedNumber): Factor for token amount conversion (computed)
- `oracleFactor` (FixedNumber): Factor for oracle price conversion (computed)

**Existing Properties** (unchanged):
- `tropykus` (Tropykus): Parent protocol instance
- `address` (string): Market contract address
- `instance` (ethers.Contract): HTTP provider contract instance
- `wsInstance` (ethers.Contract): WebSocket provider contract instance

**Validation Rules**:
- Constructor validates decimals are in range [0, 18]
- Throws descriptive error if validation fails
- Factors computed using Math.pow() and FixedNumber.fromString()

**Relationships**:
- Extends: None (base class)
- Extended by: CErc20, CRBTC
- Contains: DecimalConfiguration (as properties)
- References: Tropykus instance (parent)

**Constructor Signature Change**:
```javascript
// OLD:
constructor(tropykus, abi, marketAddress)

// NEW (signature unchanged, args optional):
constructor(tropykus, abi, marketAddress, { tokenDecimals, oracleDecimals } = {})
// Note: Actual implementation may pass args via subclass constructors
```

---

### CErc20 (Extended)

**Purpose**: ERC20 token market implementation with decimal support

**New Behavior**:
- Inherits decimal properties from Market
- Overrides transaction methods to use `parseUnits(amount, this.tokenDecimals)`
- Balance queries use `this.tokenFactor` for mantissa conversion

**Existing Properties** (unchanged):
- `erc20InstanceAddress` (string): Underlying ERC20 token address
- `erc20Instance` (ethers.Contract): ERC20 token contract instance
- `type` (string): Market type identifier ('CErc20Immutable')

**Relationships**:
- Extends: Market
- Extended by: CToken (inherits decimal support)
- Related to: CRDOC (similar pattern)

**Method Changes**:
- `mint(account, amount)`: Uses `parseUnits(amount, this.tokenDecimals)`
- `repayBorrow(account, amount, maxValue)`: Uses `parseUnits(amount, this.tokenDecimals)`
- `balanceOfUnderlyingInWallet(account)`: Uses `this.tokenFactor` for mantissa → decimal

---

### CRBTC (Extended)

**Purpose**: Native RBTC market implementation with decimal support

**New Behavior**:
- Inherits decimal properties from Market (defaults to 18 for RBTC)
- Overrides transaction methods to use `parseUnits(amount, this.tokenDecimals)`
- For RBTC, tokenDecimals should always be 18 (native ETH/RBTC precision)

**Relationships**:
- Extends: Market
- Note: RBTC is native currency, always 18 decimals in practice
- Decimal configuration still supported for consistency

**Method Changes**:
- `mint(account, amount)`: Uses `parseUnits(amount, this.tokenDecimals)` in value field
- `repayBorrow(account, amount, maxValue)`: Uses `parseUnits(amount, this.tokenDecimals)` in value field

---

### Comptroller (Extended)

**Purpose**: Protocol-wide risk management, now handles multi-decimal aggregation

**New Behavior**:
- No new properties (stateless aggregation)
- Multi-market calculations aggregate USD values from markets with different decimals
- Each market normalizes its own balances using its tokenFactor/oracleFactor

**Affected Methods**:
- `getTotalSupplyInAllMarkets(account, markets, excludeMarket)`: Sums USD values pre-normalized by markets
- `getTotalBorrowsInAllMarkets(account, markets, excludeMarket)`: Sums USD values pre-normalized by markets
- `getAccountLiquidity(account, marketAddress)`: Uses per-market normalized balances

**Relationships**:
- References: Multiple Market instances (different decimal configs)
- Aggregation pattern: Markets normalize → Comptroller sums

---

### BalanceResult (Unchanged Structure, New Semantics)

**Purpose**: Standardized balance return object

**Structure** (unchanged):
```javascript
{
  underlying: Number,      // Token amount in human-readable decimals
  usd: Number,            // USD value
  fixedNumber: FixedNumber // High-precision calculation
}
```

**New Semantics**:
- `underlying`: Now correctly reflects token's native decimals (e.g., 100.5 for 6-decimal token)
- `usd`: Now correctly accounts for oracle decimals in price conversion
- `fixedNumber`: Still uses 'fixed80x18' internal precision, represents underlying amount

**Validation Rules** (unchanged):
- All three properties must be present
- fixedNumber must be FixedNumber instance
- underlying and usd are Number type (converted from FixedNumber._value)

---

## Data Flow Diagrams

### Transaction Amount Conversion (Mint/Borrow/Redeem/Repay)

```
User Input (Number)
     ↓
parseUnits(amount, tokenDecimals)
     ↓
BigNumber (mantissa) ← Sent to smart contract
     ↓
Contract stores/processes mantissa
     ↓
Contract returns mantissa
     ↓
FixedNumber.from(mantissa)
     ↓
.divUnsafe(tokenFactor) ← Normalize to human-readable
     ↓
Number(fixedNumber._value) ← Return to user
```

### USD Value Calculation

```
Token Balance (mantissa from contract)
     ↓
FixedNumber.from(balance) / tokenFactor → underlying
     ↓
Oracle Price (mantissa from contract)
     ↓
FixedNumber.from(price) / oracleFactor → pricePerToken
     ↓
underlying * pricePerToken → USD value
     ↓
Return {underlying, usd, fixedNumber}
```

### Multi-Market Aggregation (Comptroller)

```
Market 1 (6-decimal USDT)  |  Market 2 (18-decimal DOC)  |  Market 3 (18-decimal RBTC)
         ↓                 |           ↓                  |           ↓
balanceOfUnderlying()      | balanceOfUnderlying()       | balanceOfUnderlying()
         ↓                 |           ↓                  |           ↓
{usd: 1000}                |   {usd: 500}                |   {usd: 2500}
         ↓                 |           ↓                  |           ↓
         └─────────────────┴───────────┴──────────────────→ Comptroller.sum()
                                    ↓
                            Total USD: 4000
```

---

## Backward Compatibility Guarantees

### Default Behavior

**Guarantee**: Existing code that doesn't specify decimals continues to work identically.

**Mechanism**:
```javascript
constructor(tropykus, abi, marketAddress, { tokenDecimals = 18, oracleDecimals = 18 } = {}) {
  this.tokenDecimals = tokenDecimals;  // 18 if not provided
  this.oracleDecimals = oracleDecimals; // 18 if not provided
  // ... rest of initialization
}
```

**Test Coverage**:
- Run existing 02-markets.spec.js without modifications
- Verify identical behavior for all balance queries
- Verify identical transaction amounts for mint/borrow/redeem/repay

---

### Return Structure Stability

**Guarantee**: All methods returning balance objects maintain the same structure.

**Unchanged Methods**:
- `balanceOfUnderlying(account)` → `{underlying, usd, fixedNumber}`
- `borrowBalanceCurrent(account)` → `{underlying, usd, fixedNumber}`
- `balanceOf(account)` → `{underlying: {value, fixedNumber}, usd: {value, fixedNumber}, tokens: {value, fixedNumber}}`

**Note**: Only internal calculation changes (factor used), not return types or keys.

---

## Edge Case Handling

### Zero Decimals

**Scenario**: Token with 0 decimals (e.g., old-style NFT or rare token)

**Handling**:
- `tokenFactor = 10^0 = 1`
- `parseUnits(100, 0) = BigNumber(100)`
- Balance of 100 tokens displays as `100` (no fractional component)

**Validation**: Allowed (0 is within range [0, 18])

---

### Oracle Decimals Exceeding 18

**Scenario**: Unusual oracle returning prices in 24-decimal precision

**Handling**:
- **Validation fails**: Constructor throws error
- Rationale: FixedNumber 'fixed80x18' format has 18-decimal limit
- Exceeding this would require format change (out of scope)

**Validation**: Rejected (>18 exceeds format capacity)

---

### Decimal Mismatch (Token Contract vs Configuration)

**Scenario**: Token contract has `decimals() → 6`, but user configures `tokenDecimals: 18`

**Handling**:
- Configuration takes precedence (library trusts user input)
- Calculations will be incorrect (user responsibility)
- Validation only checks range [0, 18], not contract agreement

**Recommendation**: Document that users must configure decimals to match token contract

---

### MaxValue Operations with Non-18-Decimal Tokens

**Scenario**: `redeem(account, 0, maxValue=true)` with 6-decimal token

**Handling**:
```javascript
// Query all kTokens (always 8 decimals, per cToken spec)
const kTokens = await this.instance.callStatic.balanceOf(account.address);
// Redeem all kTokens (amount is in kToken units, not underlying)
await this.instance.connect(account.signer).redeem(kTokens, { gasLimit });
```

**Result**: Works correctly - redeem() takes kToken amount, not underlying amount

**Note**: repayBorrow(maxValue=true) uses `MaxUint256` constant, which is decimal-agnostic

---

## Summary

**Entities Modified**:
- Market: +4 properties (tokenDecimals, oracleDecimals, tokenFactor, oracleFactor)
- CErc20: Behavior changes in mint, repayBorrow, balanceOfUnderlyingInWallet
- CRBTC: Behavior changes in mint, repayBorrow
- Comptroller: No structure changes, aggregation logic updated

**Entities Unchanged**:
- PriceOracle: Structure unchanged (oracle decimals configured per-market, not per-oracle)
- Tropykus: Minimal change (addMarket passes decimals to Market constructor)
- BalanceResult: Structure unchanged, semantics refined

**Key Invariants**:
- Internal calculations always use FixedNumber 'fixed80x18' precision
- Decimal factors computed once at construction, never mutated
- Return object structures remain identical (backward compatibility)
- Default decimals = 18 for both token and oracle

**Ready to proceed to contracts generation and quickstart documentation.**
