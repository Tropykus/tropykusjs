# Test Baseline - Phase 1 Complete

**Date:** 2025-10-15
**Status:** ✅ Phase 1 Complete (T003-T004)

## Overview

This document captures the test baseline established after completing Phase 1 infrastructure setup. This baseline will be used to measure progress and ensure no regressions during multi-decimal implementation.

## Test Infrastructure

### Hardhat Setup
- **Version:** 2.26.3 (CommonJS compatible)
- **Network:** Local Hardhat node (chainId: 1337)
- **Auto-deployment:** Yes (via `test-with-hardhat.sh`)

### Test Execution
- **Script:** `npm test` → `./scripts/test-with-hardhat.sh`
- **Process:**
  1. Starts Hardhat node automatically
  2. Deploys complete Tropykus protocol
  3. Runs test suite with NYC coverage
  4. Cleans up on exit

### Deployed Contracts

All contracts deployed automatically via `scripts/deploy-test-contracts.js`:

| Contract | Purpose | Configuration |
|----------|---------|---------------|
| WhitePaperInterestRateModel | Interest rate model for RBTC | Base: 2%, Multiplier: 30% |
| JumpRateModelV2 | Interest rate model for DOC | Base: 0%, Multiplier: 4%, Jump: 109% @ 80% |
| Unitroller | Comptroller proxy | Upgradeable proxy pattern |
| ComptrollerG6 | Comptroller implementation | Close factor: 50%, Liquidation incentive: 8% |
| PriceOracleProxy | Price oracle with adapters | Uses MockPriceProviderMoC |
| StandardToken (DOC) | Test ERC20 token | 18 decimals, 1M supply |
| CErc20Immutable (kDOC) | DOC market | 18 decimals, 75% collateral factor |
| CRBTC (kRBTC) | RBTC market | 18 decimals, 60% collateral factor |
| MockPriceProviderMoC | Mock price provider for DOC | $1.00 USD |
| MockPriceProviderMoC | Mock price provider for RBTC | $54,556.90 USD |
| PriceOracleAdapterMoc | Price adapter for kDOC | Links to DOC price provider |
| PriceOracleAdapterMoc | Price adapter for kRBTC | Links to RBTC price provider |

**Deployment output:** `test-deployment.json` (generated each test run)

## Test Results Baseline

### Summary
- **Total Tests:** 27
- **Passing:** 11 ✅
- **Failing:** 16 ❌
- **Pass Rate:** 40.7%

### Passing Tests (11)
Core functionality that's working:

1. ✅ Core tropykus - should get provider's chainId
2. ✅ Core tropykus - should get internal comptroller instance
3. ✅ Core tropykus - should set package price oracle instance
4. ✅ Comptroller - should instance a comptroller handler
5. ✅ Market - should return the min value between two fixed numbers
6. ✅ Market - should instance a CRBTC Market with an existing contract address
7. ✅ Market - should instance a CToken Market with an existing contract address
8. ✅ Market - should instance a CRDOC Market with an existing contract address
9. ✅ Market - should throw an error if no erc20TokenAddress provided
10. ✅ Market - should return the market's type
11. ✅ Unitroller - should instance a unitroller handler

### Failing Tests (16)
Areas needing work or expecting RSK testnet:

**Account Management (1 test)**
- ❌ should generate an account (mnemonic-based)

**Comptroller Operations (4 tests)**
- ❌ should deploy a new comptroller
- ❌ should list the market's addresses
- ❌ should list the market's as instances
- ❌ should enter the markets

**Market Deployment (3 tests)**
- ❌ should deploy a new CRBTC market
- ❌ should deploy a new CRDOC market
- ❌ should deploy a new CToken market

**Market Symbol Operations (2 tests)**
- ❌ should return the market's kSymbol
- ❌ should return the market's underlying symbol

**Market Transaction Operations (6 tests)**
- ❌ should transfer underlying to the given address
- ❌ should mint kTokens (supply collateral)
- ❌ should borrow underlying
- ❌ should redeem kTokens
- ❌ should repay borrowed amount
- ❌ Market setups (comptroller, reserve factor)

**Unitroller Operations (2 tests)**
- ❌ should set a pending implementation of comptroller
- ❌ should get comptroller implementation

## Coverage Baseline

### Overall Coverage: 30.68%

| File | Statements | Branch | Functions | Lines | Uncovered Lines |
|------|-----------|---------|-----------|-------|-----------------|
| **src/index.js** | 89.89% | 75.34% | 92.00% | 90.90% | 54-66,115,130,135,187 |
| **src/Comptroller.js** | 15.75% | 8.53% | 16.12% | 17.51% | 51-116,148-404 |
| **src/Market.js** | 8.72% | 10.81% | 6.59% | 9.70% | 30-259,281-790 |
| **src/PriceOracle.js** | 58.82% | 100.00% | 37.50% | 56.25% | 22-40 |
| **src/Unitroller.js** | 76.19% | 100.00% | 63.63% | 75.00% | 35-39,53 |
| **src/Markets/CErc20.js** | 42.85% | 34.14% | 38.88% | 46.51% | 30-34,48-69,79-109 |
| **src/Markets/CRBTC.js** | 22.33% | 28.00% | 24.00% | 22.89% | 23-172,189-238 |
| **src/Markets/CRDOC.js** | 100.00% | 80.00% | 100.00% | 100.00% | 2 |
| **src/Markets/CToken.js** | 100.00% | 80.00% | 100.00% | 100.00% | 2 |

### Key Observations

**Well-tested (>75% coverage):**
- ✅ `index.js` (89.89%) - Main entry point, provider management, market instantiation
- ✅ `Unitroller.js` (76.19%) - Basic unitroller operations
- ✅ `CRDOC.js` (100%) - Small inheritance class
- ✅ `CToken.js` (100%) - Small inheritance class

**Needs Work (<50% coverage):**
- ⚠️ `Market.js` (8.72%) - **CRITICAL** Core market operations barely tested
- ⚠️ `Comptroller.js` (15.75%) - Comptroller operations need tests
- ⚠️ `CRBTC.js` (22.33%) - Native RBTC market operations
- ⚠️ `CErc20.js` (42.85%) - ERC20 market operations

### Coverage Goals for Multi-Decimal Implementation

Target coverage after implementation:
- **Market.js:** Increase from 8.72% → 60%+ (focus on decimal handling)
- **CErc20.js:** Increase from 42.85% → 70%+ (ERC20 decimal operations)
- **CRBTC.js:** Increase from 22.33% → 60%+ (native token operations)
- **Comptroller.js:** Increase from 15.75% → 50%+ (multi-market calculations)
- **Overall:** Increase from 30.68% → 55%+

## Files Affected by Multi-Decimal Implementation

Based on coverage analysis, these files will need changes:

### High Priority (Core Decimal Logic)
1. **src/Market.js** (Lines 30-259, 281-790)
   - Factor calculation (currently hardcoded `1e18`)
   - Amount normalization
   - Balance calculations
   - APY calculations

2. **src/Markets/CErc20.js** (Lines 30-34, 48-69, 79-109)
   - ERC20 approval amounts
   - parseUnits/formatUnits conversions
   - Token decimal handling

3. **src/Markets/CRBTC.js** (Lines 23-172, 189-238)
   - Native token value handling
   - Exchange rate calculations

### Medium Priority (Aggregations)
4. **src/Comptroller.js** (Lines 51-116, 148-404)
   - Cross-market balance aggregations
   - Liquidity calculations with different decimals
   - USD value conversions

5. **src/index.js** (Lines 54-66, 115, 130, 135, 187)
   - Market initialization with decimal config
   - Provider setup

## Test Environment Validation

### ✅ Working
- Hardhat node auto-start/stop
- Complete protocol deployment
- Contract artifact loading
- Basic instantiation tests
- Test coverage reporting

### ⚠️ Known Issues
- Some tests expect RSK testnet addresses
- Transaction-based tests need proper account setup
- Gas configuration may need adjustment
- 16 failing tests expected (documented above)

## Next Steps (Phase 2)

With test infrastructure complete, proceed to Phase 2 foundational tasks:

1. **T005:** Add decimal validation to Market constructor
2. **T006:** Add factor computation helper in Market
3. **T007:** Add parseAmount/formatAmount helpers in Market
4. **T008:** Write unit tests for decimal validation
5. **T009:** Write unit tests for factor computation
6. **T010:** Write unit tests for parseAmount/formatAmount

## Metrics for Success

Track these metrics through implementation:

- ✅ Test count should increase (27 → 35+ by Phase 3)
- ✅ Pass rate should improve (40.7% → 60%+ by Phase 3)
- ✅ Coverage should increase (30.68% → 55%+ by Phase 8)
- ✅ No regressions in passing tests (maintain 11+ passing)
- ✅ All new features covered by tests (TDD principle)

---

**Baseline Established:** 2025-10-15
**Phase 1 Status:** ✅ Complete
**Ready for Phase 2:** Yes
