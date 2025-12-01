# Data Model: ERC20 Multi-Decimal Support

**Feature**: ERC20 Multi-Decimal Support  
**Date**: 2025-01-27

## Entities

### Token Decimal Configuration

**Purpose**: Represents the decimal precision for an ERC20 token, determining how amounts are parsed and formatted.

**Attributes**:
- `decimals` (uint8): The number of decimal places for the token (0-255, typically 0-18)
- `tokenAddress` (string): The ERC20 token contract address
- `cached` (boolean): Whether the decimal value has been fetched and cached

**Relationships**:
- One-to-one with Market/CErc20 instance
- Retrieved from ERC20 token contract via `decimals()` function

**Validation Rules**:
- Must be within ERC20 standard range (0-255)
- Defaults to 18 if `decimals()` function is not implemented or fails
- Immutable once set (token contracts don't change decimals)

**State**:
- **Uninitialized**: `decimals` is `undefined`, not yet fetched
- **Cached**: `decimals` has been fetched and stored in instance property
- **Defaulted**: `decimals()` call failed, defaulted to 18

### Token Amount

**Purpose**: Represents a quantity of tokens in either human-readable or contract format.

**Attributes**:
- `humanReadable` (number/string): Amount in human-readable format (e.g., "1.5" tokens)
- `contractFormat` (BigNumber): Amount in contract format (e.g., 1500000 for 1.5 tokens with 6 decimals)
- `decimals` (uint8): The decimal precision used for conversion

**Relationships**:
- Converted using Token Decimal Configuration
- Used in all Market operations (deposit, withdraw, borrow, repay, transfer)

**Validation Rules**:
- Human-readable format must be a valid number
- Contract format must be a valid BigNumber
- Decimals must match the token's decimal configuration
- Conversions must maintain precision (no rounding errors)

**State Transitions**:
- **Human → Contract**: `parseUnits(humanReadable, decimals)` → `contractFormat`
- **Contract → Human**: `formatUnits(contractFormat, decimals)` → `humanReadable`

### Market Instance (Extended)

**Purpose**: Market instances now include decimal awareness for their underlying ERC20 tokens.

**New Attributes** (added to existing Market/CErc20):
- `tokenDecimals` (uint8, optional): Cached decimal amount for the underlying token
- `erc20Instance` (Contract): ERC20 token contract instance (already exists in CErc20)

**Behavior Changes**:
- Constructor or initialization: Fetches and caches `tokenDecimals` from ERC20 contract
- All amount operations: Use `tokenDecimals` instead of hardcoded 18
- Backward compatibility: If `tokenDecimals` is 18, behavior identical to current implementation

## Data Flow

### Decimal Detection Flow

```
Market/CErc20 Constructor
  ↓
Check if erc20Instance exists
  ↓
Call erc20Instance.decimals() (callStatic)
  ↓
Success? → Cache as this.tokenDecimals
  ↓
Failure? → Default to 18, log warning
```

### Amount Conversion Flow

```
User provides: "1.5" tokens (human-readable)
  ↓
Get tokenDecimals (e.g., 6)
  ↓
ethers.utils.parseUnits("1.5", 6)
  ↓
Result: BigNumber(1500000) (contract format)
  ↓
Use in transaction
```

### Balance Display Flow

```
Contract returns: BigNumber(1500000)
  ↓
Get tokenDecimals (e.g., 6)
  ↓
ethers.utils.formatUnits(BigNumber(1500000), 6)
  ↓
Result: "1.5" (human-readable)
  ↓
Display to user
```

## Validation Rules

### Decimal Amount Validation
- Must be integer between 0 and 255
- If `decimals()` returns invalid value, default to 18
- If `decimals()` throws error, default to 18 with warning

### Amount Conversion Validation
- Human-readable input must be valid number string
- Cannot be negative (unless explicitly allowed by operation)
- Must not exceed token's total supply
- Precision must be maintained (no rounding in critical operations)

### Backward Compatibility Validation
- 18-decimal tokens must behave identically to current implementation
- All existing tests must pass without modification for 18-decimal tokens
- No breaking changes to public API

## Edge Cases

1. **Token without `decimals()` function**: Default to 18, log warning
2. **Token with 0 decimals**: Handle integer-only amounts correctly
3. **Token with decimals > 18**: Support up to 255 (ERC20 standard max)
4. **Very small amounts with high decimals**: Maintain precision in calculations
5. **Price oracle with 18 decimals, token with different decimals**: Convert correctly for USD calculations

