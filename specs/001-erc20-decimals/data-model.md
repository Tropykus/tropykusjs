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

### Oracle Decimal Configuration

**Purpose**: Represents the decimal precision for price oracle adapters, determining how oracle prices are parsed and converted.

**Attributes**:
- `assetPricesReturnDecimals` (uint8): The decimal precision returned by assetPrices() function (18 for PriceOracleAdapterMoc returning 1e18, 30 for PriceOracleAdapterUSDT returning 1e30)
- `oracleSourceDecimals` (uint8): The decimal precision of the underlying oracle (18 for MoC onchain provider, 8 for USDT oracle)
- `adapterAddress` (string): The oracle adapter contract address
- `adapterType` (string): Type of adapter ('Moc' or 'USDT' or 'Unknown')
- `decimalMultiplier` (BigNumber, optional): DECIMAL_MULTIPLIER value for USDT adapter (1e22, queried at runtime)
- `liquidityCalculationOrder` (string): Order of magnitude for liquidity calculations (1e36 for both standard tokens and USDT via ComptrollerG6)

**Relationships**:
- One-to-many with Market instances (multiple markets can use same oracle adapter)
- Retrieved from PriceOracleAdapter contract or detected from adapter type
- Stored in PriceOracle instance

**Validation Rules**:
- assetPricesReturnDecimals must be within reasonable range (18 for MoC, 30 for USDT)
- Defaults to 18 if adapter type unknown (backward compatibility)
- For PriceOracleAdapterUSDT: assetPrices() returns 1e30 (8-decimal oracle * 1e22 DECIMAL_MULTIPLIER); ComptrollerG6 multiplies 1e30 by amount * 1e16 to achieve 1e36 for liquidity
- For PriceOracleAdapterMoc: assetPrices() returns 1e18 matching onchain price provider behavior; ComptrollerG6 multiplies 1e18 by amount * 1e18 to achieve 1e36 for liquidity

**State**:
- **Uninitialized**: `assetPricesReturnDecimals` is `undefined`, not yet detected
- **Detected**: `assetPricesReturnDecimals` has been detected from adapter type (18 for MoC, 30 for USDT)
- **Defaulted**: Adapter type unknown, defaulted to 18

### Market Instance (Extended)

**Purpose**: Market instances now include decimal awareness for their underlying ERC20 tokens and oracle prices.

**New Attributes** (added to existing Market/CErc20):
- `tokenDecimals` (uint8, optional): Cached decimal amount for the underlying token
- `erc20Instance` (Contract): ERC20 token contract instance (already exists in CErc20)

**Behavior Changes**:
- Constructor or initialization: Fetches and caches `tokenDecimals` from ERC20 contract
- All amount operations: Use `tokenDecimals` instead of hardcoded 18
- Backward compatibility: If `tokenDecimals` is 18, behavior identical to current implementation

### PriceOracle Instance (Extended)

**Purpose**: PriceOracle instances now include decimal awareness for oracle adapter prices.

**New Attributes** (added to existing PriceOracle):
- `oracleDecimals` (uint8, optional): Cached decimal amount for oracle prices (defaults to 18)
- `adapterDecimalsMap` (Map<string, uint8>): Map of adapter address → decimal precision

**Behavior Changes**:
- `getUnderlyingPrice()`: Divides by correct factor (1e30 for PriceOracleAdapterUSDT.assetPrices(), 1e18 for PriceOracleAdapterMoc.assetPrices())
- Adapter detection: Detects adapter type or queries DECIMAL_MULTIPLIER when adapter is set
- Backward compatibility: Defaults to 18 decimals (1e18) if adapter type unknown

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

### Oracle Decimal Detection Flow

```
PriceOracle.setAdapterToToken() called
  ↓
Check adapter address
  ↓
Detect adapter type (Moc vs USDT vs Unknown)
  ↓
If PriceOracleAdapterUSDT:
  Set assetPricesReturnDecimals = 30 (assetPrices() returns 1e30)
  Set oracleSourceDecimals = 8 (underlying oracle uses 8 decimals)
  Query DECIMAL_MULTIPLIER constant (1e22) to verify calculation
  Note: ComptrollerG6 multiplies 1e30 by amount * 1e16 = 1e36 for liquidity
Else If PriceOracleAdapterMoc:
  Set assetPricesReturnDecimals = 18 (assetPrices() returns 1e18) matching onchain provider
  Set oracleSourceDecimals = 18
  Note: ComptrollerG6 multiplies 1e18 by amount * 1e18 = 1e36 for liquidity
Else:
  Default to assetPricesReturnDecimals = 18
  ↓
Cache in adapterDecimalsMap[adapterAddress] = oracleDecimals
```

### USD Value Calculation Flow (6-decimal token, 1e18 oracle for MoC, 1e30 oracle for USDT)

```
User queries balance with USD value (USDT adapter)
  ↓
Get token balance: BigNumber(1500000) (6 decimals = 1.5 tokens)
  ↓
Get oracle price from assetPrices(): BigNumber(1000000000000000000000000000000) (1e30 = 1.0 USD)
  ↓
Convert for calculation:
  tokenAmount (6 decimals) * oraclePrice (1e30) / 10^30
  1500000 * 1000000000000000000000000000000 / 10^30
  = 1500000000000000000000000000000000000 / 10^30
  = 1500000 (in 6 decimals)
  ↓
Convert to human-readable: 1500000 / 10^6 = 1.5 USD
```

**Alternative Calculation** (MoC adapter with 1e18):
```
Token amount: 1500000 (6 decimals)
Oracle price from assetPrices(): 1000000000000000000 (1e18 = 1.0 USD)
  ↓
Convert token to 18 decimals: 1500000 * 10^12 = 1500000000000000000
  ↓
Multiply: (1500000000000000000 * 1000000000000000000) / 10^18
  = 1500000000000000000000000000000000000 / 10^18
  = 1500000000000000000 (in 18 decimals)
  ↓
Convert to USD: 1500000000000000000 / 10^18 = 1.5 USD
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
5. **Oracle adapter type unknown**: Default to 18 decimals, maintain backward compatibility
6. **PriceOracleAdapterUSDT DECIMAL_MULTIPLIER query fails**: Default to 18 decimals, log warning
7. **6-decimal token with 1e18 oracle (MoC)**: assetPrices() returns 1e18; correct conversion formula: (tokenAmount * 10^12) * oraclePrice / 10^18
8. **6-decimal token with 1e30 oracle (USDT)**: assetPrices() returns 1e30 (8-decimal oracle * 1e22); correct conversion formula: tokenAmount * oraclePrice / 10^30
9. **PriceOracleAdapterUSDT liquidity calculations**: ComptrollerG6 multiplies 1e30 (from assetPrices()) by amount * 1e16 to achieve 1e36 order of magnitude for correct liquidity calculations
10. **Standard token liquidity calculations**: ComptrollerG6 multiplies 1e18 (from assetPrices()) by amount * 1e18 to achieve 1e36 order of magnitude
11. **Multiple markets with different oracle adapters**: Each adapter's assetPrices() return value cached separately (18 for MoC, 30 for USDT)
12. **Oracle adapter changed after market creation**: Re-detect assetPrices() return decimals when adapter is updated
13. **MockPriceProviderMoC for testing**: Use 18 decimals for MoC adapter tests (results in 1e18 from assetPrices()), 8 decimals for USDT adapter tests (results in 1e30 from assetPrices() after DECIMAL_MULTIPLIER)

