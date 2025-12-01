# Test Suite Baseline Documentation

**Feature**: ERC20 Multi-Decimal Support  
**Date**: 2025-01-27  
**Phase**: Phase 0 - Test Suite Verification  
**Status**: ❌ **FAILING** - 42 tests failing (54.8% pass rate)

## Executive Summary

This document captures the baseline state of the test suite before implementing ERC20 multi-decimal support. The test suite must achieve 100% pass rate before proceeding with implementation tasks.

**Current Status**:
- ✅ **Build**: Successful
- ❌ **Tests**: 51 passing, 42 failing (54.8% pass rate)
- ⏱️ **Execution Time**: ~6 seconds
- 📊 **Coverage**: 32.82% statements, 40.28% branches, 28.28% functions, 34.13% lines

## Test Suite Overview

### Test Framework & Tools
- **Test Runner**: Mocha
- **Assertion Library**: Chai
- **Coverage Tool**: nyc (Istanbul)
- **Test Command**: `yarn test` (runs `nyc mocha --recursive --exit`)

### Test File Structure

The test suite consists of 8 test files organized by component:

1. **test/00-tropykus.spec.js** - Core tropykus SDK tests
2. **test/01-comptroller.spec.js** - Comptroller contract tests
3. **test/02-markets.spec.js** - Market contract tests
4. **test/03-unitroller.spec.js** - Unitroller contract tests
5. **test/documentation.spec.js** - Documentation validation tests
6. **test/deprecation.spec.js** - Deprecation feature tests
7. **test/utils/deprecation.spec.js** - Deprecation utility tests
8. **test/quickstart-validation.spec.js** - Quickstart guide validation tests

## Test Results Summary

### Overall Statistics
- **Total Tests**: 93
- **Passing**: 51 (54.8%)
- **Failing**: 42 (45.2%)
- **Execution Time**: ~6 seconds

### Test Results by Category

| Category | Total | Passing | Failing | Pass Rate |
|----------|-------|---------|---------|-----------|
| Core tropykus | ~6 | 3 | 3 | 50% |
| Comptroller | ~6 | 3 | 3 | 50% |
| Market | ~15 | 10 | 5 | 66.7% |
| Market setups | ~3 | 1 | 2 | 33.3% |
| Unitroller | ~3 | 1 | 2 | 33.3% |
| Deprecation utilities | ~24 | 6 | 18 | 25% |
| Quickstart validation | ~1 | 0 | 1 | 0% |
| Documentation | ~35 | 27 | 8 | 77.1% |

## Detailed Failure Analysis

### 1. Core tropykus Tests (3 failures)

**File**: `test/00-tropykus.spec.js`

**Failures**:
1. **should get provider's chainId**
   - **Error**: Likely network/provider connection issue
   - **Root Cause**: Test environment setup

2. **should generate an account**
   - **Error**: Account generation failure
   - **Root Cause**: Wallet/provider initialization

3. **should deploy a new comptroller**
   - **Error**: Contract deployment failure
   - **Root Cause**: Test environment or contract deployment setup

**Impact**: High - Core SDK functionality tests failing

### 2. Comptroller Tests (3 failures)

**File**: `test/01-comptroller.spec.js`

**Failures**:
1. **should list the market's addresses**
   - **Error**: Contract call failure
   - **Root Cause**: Comptroller contract state or setup

2. **should list the market's as instances**
   - **Error**: Contract call failure
   - **Root Cause**: Market instance retrieval

3. **should enter the markets**
   - **Error**: Transaction failure
   - **Root Cause**: "before each" hook failure suggests setup issue

**Impact**: High - Comptroller functionality critical for market operations

### 3. Market Tests (5 failures)

**File**: `test/02-markets.spec.js`

**Failures**:
1. **should deployed a new CRBTC market**
   - **Error**: `UNPREDICTABLE_GAS_LIMIT` - execution reverted
   - **Root Cause**: Contract deployment transaction failing

2. **should deployed a new CRDOC market**
   - **Error**: `UNPREDICTABLE_GAS_LIMIT` - execution reverted
   - **Root Cause**: Contract deployment transaction failing

3. **should deployed a new CToken market**
   - **Error**: `UNPREDICTABLE_GAS_LIMIT` - execution reverted
   - **Root Cause**: Contract deployment transaction failing

4. **should return the market's kSymbol**
   - **Error**: `CALL_EXCEPTION` - call revert exception
   - **Root Cause**: Contract not properly deployed or initialized

5. **should return the market's underlying symbol**
   - **Error**: Assertion failure - expected 'tRBTC' but got 'RBTC'
   - **Root Cause**: Symbol format mismatch (test expectation vs actual)

**Impact**: High - Market deployment and query operations failing

### 4. Market Setups Tests (2 failures)

**File**: `test/02-markets.spec.js`

**Failures**:
1. **should set market's comptroller**
   - **Error**: `UNPREDICTABLE_GAS_LIMIT` - execution reverted
   - **Root Cause**: Transaction failing, likely market not properly initialized

2. **should set market's reserve factor**
   - **Error**: `TypeError: Cannot read properties of undefined (reading 'getReserveFactor')`
   - **Root Cause**: Market instance not properly created or initialized

**Impact**: Medium - Market configuration operations failing

### 5. Unitroller Tests (2 failures)

**File**: `test/03-unitroller.spec.js`

**Failures**:
1. **should set a pending implementation of comptroller**
   - **Error**: `UNPREDICTABLE_GAS_LIMIT` - execution reverted
   - **Root Cause**: Transaction failing, contract state issue

2. **should get unitroller's comptroller implementation**
   - **Error**: `CALL_EXCEPTION` - call revert exception
   - **Root Cause**: Contract not properly initialized or method not available

**Impact**: Medium - Unitroller functionality for upgradeable contracts

### 6. Deprecation Utility Tests (18 failures)

**File**: `test/utils/deprecation.spec.js`

**Failures**:
- **getDeprecationMetadata** (7 failures):
  - Tests expecting metadata for deprecated addresses returning `null`
  - Case-insensitive address comparison not working
  - Metadata structure validation failing

- **warnDeprecatedOnce** (11 failures):
  - All tests failing with `TypeError: Cannot read properties of null (reading 'reason')`
  - Root cause: `getDeprecationMetadata` returning `null`, causing `warnDeprecated` to fail
  - Cache functionality tests failing due to upstream issue

**Root Cause**: `getDeprecationMetadata` function returning `null` for all deprecated addresses, suggesting:
- Deprecation config file not loaded correctly
- Address matching logic broken
- Config file missing or incorrect format

**Impact**: Medium - Deprecation warnings not functioning, but not blocking core functionality

### 7. Quickstart Validation Test (1 failure)

**File**: `test/quickstart-validation.spec.js`

**Failure**:
- **"before all" hook failure**
  - **Error**: `ENOENT: no such file or directory, open '/Users/davidcarvajal/Development/Tropykus/tropykusjs/specs/001-deprecate-delisted-markets/quickstart.md'`
  - **Root Cause**: Test hardcoded to look for wrong feature directory (`001-deprecate-delisted-markets` instead of current feature)
  - **Fix**: Update test to use correct feature directory or make it dynamic

**Impact**: Low - Test infrastructure issue, not related to code functionality

## Code Coverage Analysis

### Overall Coverage
- **Statements**: 32.82%
- **Branches**: 40.28%
- **Functions**: 28.28%
- **Lines**: 34.13%

### Coverage by Component

| Component | Statements | Branches | Functions | Lines |
|-----------|-----------|----------|-----------|-------|
| **src/** | 28.59% | 36.31% | 24.87% | 28.8% |
| Comptroller.js | 15.24% | 9.85% | 16.12% | 16.91% |
| Market.js | 8.39% | 10.81% | 6.59% | 9.32% |
| PriceOracle.js | 56.25% | 33.33% | 37.5% | 53.33% |
| Unitroller.js | 75% | 33.33% | 63.63% | 73.68% |
| index.js | 90.09% | 77.14% | 92% | 91.02% |
| **src/Markets/** | 40.31% | 43.42% | 34.69% | 44.65% |
| CErc20.js | 41.37% | 34.28% | 27.77% | 47.82% |
| CRBTC.js | 24.52% | 33.33% | 24% | 27.27% |
| CRDOC.js | 100% | 85.71% | 100% | 100% |
| CToken.js | 100% | 85.71% | 100% | 100% |
| **src/utils/** | 88.88% | 83.33% | 100% | 88.23% |
| deprecation.js | 88.88% | 83.33% | 100% | 88.23% |

**Note**: Low coverage in Market.js and Comptroller.js is expected given the number of failing tests in these areas.

## Root Cause Analysis

### Primary Issues Identified

1. **Test Environment Setup**
   - Local blockchain node (Hardhat/Ganache) may not be running or properly configured
   - Provider connection issues affecting contract calls
   - Account/wallet initialization problems

2. **Contract Deployment Failures**
   - Multiple market deployment tests failing with "execution reverted"
   - Suggests contract constructor parameters or deployment setup issues
   - May be related to test data or contract state

3. **Deprecation Config Issue**
   - `getDeprecationMetadata` returning `null` for all addresses
   - Config file loading or address matching logic broken
   - Cascading failures in deprecation utility tests

4. **Test Data/Expectations**
   - Symbol format mismatch (RBTC vs tRBTC)
   - Test expectations may not match current contract behavior

5. **Test Infrastructure**
   - Quickstart validation test hardcoded to wrong feature directory
   - Test hooks failing due to setup issues

## Action Plan

### Priority 1: Critical Blockers (Must Fix Before Implementation)

1. **Fix Core tropykus Tests** (T005)
   - Verify test environment (local node running)
   - Fix provider/chainId connection
   - Fix account generation
   - Fix comptroller deployment

2. **Fix Comptroller Tests** (T006)
   - Fix "before each" hook setup
   - Fix market listing functionality
   - Fix market entry operations

3. **Fix Market Deployment Tests** (T007)
   - Investigate contract deployment failures
   - Fix deployment parameters or test setup
   - Fix symbol retrieval tests

### Priority 2: Important (Should Fix)

4. **Fix Market Setup Tests** (T008)
   - Fix market initialization
   - Fix comptroller and reserve factor setup

5. **Fix Unitroller Tests** (T009)
   - Fix contract initialization
   - Fix implementation getter/setter

### Priority 3: Nice to Have (Can Fix Later)

6. **Fix Deprecation Utility Tests** (T010)
   - Fix config loading
   - Fix address matching logic
   - Fix metadata retrieval

7. **Fix Quickstart Validation Test** (T011)
   - Update test to use correct feature directory
   - Make test path dynamic

## Test Execution Commands

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test

# Run specific test file
npx mocha test/00-tropykus.spec.js

# Run tests in watch mode (if configured)
yarn test:watch
```

## Test Environment Requirements

- **Node.js**: Version compatible with project
- **Local Blockchain**: Hardhat/Ganache local node running on port 8545
- **Dependencies**: All npm packages installed (`yarn install`)
- **Network**: Local test network accessible at `http://127.0.0.1:8545`

## Next Steps

1. ✅ **T003**: Document test suite baseline (THIS DOCUMENT)
2. ⏳ **T004**: Investigate root causes of failing tests
3. ⏳ **T005-T011**: Fix failing tests by category
4. ⏳ **T012**: Re-run full test suite and verify 100% pass rate
5. ⏳ **T013**: Document final test suite baseline (100% pass rate)
6. ⏳ **T014**: Verify test infrastructure is properly configured

## Notes

- All test failures must be resolved before proceeding to Phase 1 (Setup)
- Test suite baseline is critical for measuring backward compatibility
- Current failures appear to be infrastructure/setup related rather than code bugs
- Coverage is low but expected given number of failing tests
- Once tests pass, coverage should improve significantly

---

**Document Status**: ✅ Complete  
**Last Updated**: 2025-01-27  
**Next Review**: After T012 (test suite verification)

