# Feature Specification: Multi-Decimal Token Support

**Feature Branch**: `001-support-multi-decimal`
**Created**: 2025-10-14
**Status**: Draft
**Input**: User description: "Right now this project works perfectly for tokens with 18 decimals. However we want to list markets in which the underlying tokens have 6 decimals and with different decimals in the price oracle. We want to make this project more flexible. Help us to refactor this code to support this. Some parameters are unchanged like the collateral factor, exchange rate, close factor, among others."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add 6-Decimal Token Market (Priority: P1)

A DeFi application developer wants to add a USDT market (6 decimals) to their Tropykus integration. They need to mint, borrow, redeem, and repay operations to work correctly with the token's native decimal precision.

**Why this priority**: This is the core capability that unblocks listing new token markets. Without this, the library cannot support common stablecoins like USDT which use 6 decimals.

**Independent Test**: Can be fully tested by adding a 6-decimal token market and verifying mint/borrow/redeem/repay operations return correct balances and execute transactions without precision errors.

**Acceptance Scenarios**:

1. **Given** a developer has a 6-decimal token (USDT) deployed, **When** they add the market using `tropykus.addMarket()`, **Then** the market is initialized with correct decimal configuration
2. **Given** a 6-decimal token market is added, **When** a user mints 100 USDT, **Then** the transaction uses correct decimal precision (100 * 10^6) and balance calculations are accurate
3. **Given** a user has supplied 6-decimal tokens, **When** they check their balance via `balanceOfUnderlying()`, **Then** the returned values (underlying, usd, fixedNumber) reflect correct decimal-adjusted amounts
4. **Given** a user borrows from a 6-decimal market, **When** they call `borrowBalanceCurrent()`, **Then** the borrow balance is calculated with correct decimal precision
5. **Given** a user wants to redeem 6-decimal tokens, **When** they call `redeem()`, **Then** the transaction uses correct decimal precision and amount is redeemed successfully

---

### User Story 2 - Configure Custom Oracle Decimals (Priority: P2)

A protocol administrator needs to configure price oracle adapters that return prices in different decimal formats (e.g., 8 decimals for BTC-style prices, 6 decimals for certain feeds) and have the library correctly interpret these prices when calculating USD values.

**Why this priority**: Different oracle providers and token pairs may use different decimal conventions. This enables flexibility in oracle integration while maintaining calculation accuracy.

**Independent Test**: Can be tested by configuring a market with a custom oracle decimal setting and verifying USD value calculations are correct across all balance and liquidity methods.

**Acceptance Scenarios**:

1. **Given** a market uses an oracle returning 8-decimal prices, **When** oracle decimals are configured during market initialization, **Then** all USD calculations use the correct decimal adjustment
2. **Given** a market has custom oracle decimals configured, **When** `balanceOfUnderlying()` is called, **Then** the USD value is calculated correctly by accounting for both token decimals and oracle decimals
3. **Given** multiple markets with different oracle decimals, **When** `getTotalSupplyInAllMarkets()` is called, **Then** total USD values aggregate correctly across different decimal configurations
4. **Given** a market with custom oracle decimals, **When** `maxAllowedToWithdraw()` calculates liquidity, **Then** price conversions use correct decimal adjustments

---

### User Story 3 - Maintain Backward Compatibility (Priority: P3)

Existing integrations using 18-decimal tokens (RBTC, DOC, RIF) continue to work without any code changes, configuration updates, or behavior differences.

**Why this priority**: Breaking existing integrations would harm adoption and trust. Backward compatibility ensures seamless migration.

**Independent Test**: Can be tested by running existing test suite against 18-decimal markets without modifications and verifying all tests pass with identical behavior.

**Acceptance Scenarios**:

1. **Given** an existing integration uses 18-decimal markets, **When** the library is upgraded to the multi-decimal version, **Then** all operations continue to work without configuration changes
2. **Given** a developer adds a market without specifying decimals, **When** the market is initialized, **Then** it defaults to 18 decimals for both token and oracle
3. **Given** existing 18-decimal markets (CRBTC, CRDOC, CErc20), **When** any operation is performed, **Then** numerical precision matches previous library behavior exactly
4. **Given** an integration migrates to multi-decimal support, **When** they enable custom decimals on new markets only, **Then** old and new markets coexist without interference

---

### Edge Cases

- What happens when a token reports 0 decimals (non-standard but possible)?
- What happens when oracle decimals exceed 18 (unusual but theoretically possible)?
- How does the system handle decimal mismatches between token contract reported decimals and configured decimals?
- What happens when exchange rate calculations involve different decimal precisions across numerator and denominator?
- How are rounding errors minimized when converting between different decimal bases?
- What happens when `maxValue=true` redemption/repayment is used with non-18-decimal tokens?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Library MUST support adding token markets with configurable decimal precision (minimum 0, maximum 18)
- **FR-002**: Library MUST support configurable oracle decimal precision for price feeds (minimum 0, maximum 18)
- **FR-003**: Library MUST default to 18 decimals for both token and oracle when not explicitly configured
- **FR-004**: All numeric operations (mint, borrow, redeem, repay) MUST use token-specific decimal precision when constructing transaction amounts
- **FR-005**: All balance calculation methods MUST normalize returned values using token-specific decimals
- **FR-006**: All USD value calculations MUST account for both token decimals and oracle decimals
- **FR-007**: Library MUST preserve `FixedNumber` precision throughout calculations regardless of input decimals
- **FR-008**: Exchange rate, collateral factor, close factor, and reserve factor calculations MUST remain unchanged (continue using 18-decimal representation internally)
- **FR-009**: Methods returning structured objects (`{underlying, usd, fixedNumber}`) MUST maintain existing return structure
- **FR-010**: Market initialization MUST validate that decimals are within acceptable range (0-18)
- **FR-011**: Library MUST handle decimal conversion at the boundary: external amounts in native decimals, internal calculations in normalized representation
- **FR-012**: Event parsing for historical queries (`suppliedLast24Hours`, `borrowedLast24Hours`) MUST account for market-specific decimals
- **FR-013**: Wallet balance queries (`balanceOfUnderlyingInWallet`) MUST use correct token decimals when retrieving ERC20 balances
- **FR-014**: Liquidity calculations (`maxAllowedToWithdraw`, `maxAllowedToBorrow`) MUST correctly handle decimal conversions when aggregating across markets with different precisions

### Key Entities

- **Token Decimals**: The number of decimal places used by the underlying ERC20 token (e.g., 18 for DAI, 6 for USDT). Determines how amounts are represented on-chain.
- **Oracle Decimals**: The number of decimal places used by the price oracle when returning prices (e.g., 18 for standard oracles, 8 for Chainlink-style feeds). Determines how prices must be normalized.
- **Market Configuration**: Extended market initialization parameters including `tokenDecimals` and `oracleDecimals` alongside existing parameters.
- **Decimal Factor**: Computed factor (10^decimals) used for conversion between mantissa (on-chain integer representation) and human-readable decimal amounts.

### Assumptions

- Smart contracts (cToken, comptroller, price oracle) continue to return values in their native precision as they do currently
- Token decimals are static properties that do not change after market deployment
- Oracle decimal configuration is set at market initialization and does not change dynamically
- All tokens supported will have decimals between 0 and 18 (standard ERC20 range)
- Price oracle mantissa values are always returned as 18-decimal fixed-point numbers scaled by the configured oracle decimals

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developer can add a 6-decimal token market and successfully execute mint/borrow/redeem/repay operations with correct precision
- **SC-002**: All balance queries return accurate values for markets with any decimal configuration between 0 and 18
- **SC-003**: USD value calculations are accurate within 0.01% error margin for all supported decimal combinations
- **SC-004**: Existing test suite for 18-decimal markets passes without modification after refactoring
- **SC-005**: Liquidity calculations involving multiple markets with different decimals produce correct aggregated values
- **SC-006**: No breaking API changes - existing method signatures and return structures remain identical
- **SC-007**: Transaction amounts sent to blockchain match expected values when verified on block explorer for both 18-decimal and 6-decimal tokens
