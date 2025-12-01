# Implementation Plan: ERC20 Multi-Decimal Support

**Branch**: `001-erc20-decimals` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-erc20-decimals/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Enable support for ERC20 tokens with decimal amounts other than 18 (e.g., 6 decimals for USDC, 8 decimals for WBTC). The system must automatically detect decimal amounts from token contracts and use them for all amount parsing, formatting, and calculations. This requires replacing hardcoded 18-decimal assumptions throughout the codebase with dynamic decimal detection and conversion utilities, while maintaining 100% backward compatibility with existing 18-decimal tokens.

## Technical Context

**Language/Version**: JavaScript (ES6+), Node.js  
**Primary Dependencies**: ethers.js v5.1.0 (for blockchain interactions), BigNumber/FixedNumber from ethers  
**Storage**: N/A (blockchain-based, no local storage)  
**Testing**: Mocha, Chai, Sinon (unit and integration tests)  
**Target Platform**: Node.js SDK/library (consumed as npm package)  
**Project Type**: Single library package (monorepo structure with Lerna)  
**Performance Goals**: No specific performance requirements beyond standard SDK responsiveness  
**Constraints**: 
- Must maintain backward compatibility with existing 18-decimal token functionality
- Must handle all ERC20 standard decimal amounts (0-255, practical focus 0-18)
- Must preserve precision in all calculations (no rounding errors)
- Must gracefully handle tokens without `decimals()` function  
**Scale/Scope**: 
- Update ~10-15 methods across Market.js, CErc20.js, and related classes
- Add decimal detection and conversion utilities
- Update all test files to support multiple decimal amounts
- Estimated impact: ~500-800 lines of code changes across multiple files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. SDK-First Design ✓
- **Status**: PASS
- **Compliance**: Feature extends SDK interface with decimal-aware methods. All public methods will maintain consistent API patterns. JSDoc comments will be updated for all modified methods.
- **Action Required**: Update JSDoc for all methods that handle decimal conversion

### II. Blockchain Safety & Transaction Integrity (NON-NEGOTIABLE) ✓
- **Status**: PASS
- **Compliance**: All transaction methods maintain proper error handling. Decimal conversion must be validated before transaction submission. No changes to transaction safety mechanisms.
- **Action Required**: Add validation for decimal amounts before parsing/formatting. Ensure all transaction methods handle decimal conversion errors gracefully.

### III. Test-First Development (NON-NEGOTIABLE) ✓
- **Status**: PASS
- **Compliance**: Tests MUST be written first for each decimal scenario (0, 2, 6, 8, 18 decimals). Integration tests required for real blockchain interactions with different decimal tokens.
- **Action Required**: Write tests for each decimal amount before implementation. Include integration tests using testnet/local node with tokens of different decimals.

### IV. Integration Testing for Blockchain Interactions ✓
- **Status**: PASS
- **Compliance**: Integration tests required for: market contract interactions with different decimal tokens, decimal detection from token contracts, amount conversions in real transactions.
- **Action Required**: Create integration test suite covering tokens with 0, 2, 6, 8, and 18 decimals

### V. Semantic Versioning & Breaking Changes ✓
- **Status**: PASS
- **Compliance**: This is a MINOR version increment (new feature, backward compatible). Existing 18-decimal functionality remains unchanged. No breaking API changes.
- **Action Required**: Version bump to 0.4.0 (MINOR increment from 0.3.0)

### VI. Code Quality & Consistency ✓
- **Status**: PASS
- **Compliance**: All code must pass ESLint. Code must be formatted with Prettier. Complex decimal conversion logic requires inline comments.
- **Action Required**: Ensure all new code passes linting. Add comments explaining decimal conversion logic.

### VII. Documentation & Examples ✓
- **Status**: PASS
- **Compliance**: All public methods must have updated JSDoc. README examples should demonstrate multi-decimal token support. Error scenarios must be documented.
- **Action Required**: Update JSDoc for all modified methods. Add examples showing 6-decimal and 8-decimal token usage.

**Gate Status (Pre-Phase 0)**: ✅ **PASS** - All constitution principles satisfied. Proceed to Phase 0 research.

**Gate Status (Post-Phase 1)**: ✅ **PASS** - All constitution principles remain satisfied after design phase. Ready for implementation.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
packages/tropykus/
├── src/
│   ├── Market.js                    # Base Market class (needs decimal support)
│   ├── Markets/
│   │   ├── CErc20.js                # ERC20 market (primary changes)
│   │   ├── CRBTC.js                 # May need updates
│   │   ├── CRDOC.js                 # May need updates
│   │   └── CToken.js                # May need updates
│   ├── index.js                     # Main entry (addMarket method)
│   ├── Comptroller.js               # May need decimal-aware calculations
│   ├── PriceOracle.js               # May need decimal conversion
│   └── utils/
│       └── decimals.js              # NEW: Decimal detection/conversion utilities
├── test/
│   ├── 02-markets.spec.js           # Update with multi-decimal tests
│   └── utils/
│       └── decimals.spec.js          # NEW: Decimal utility tests
└── artifacts/
    └── StandardToken.json            # ERC20 ABI (includes decimals() function)
```

**Structure Decision**: Monorepo structure with Lerna. Primary changes in `packages/tropykus/src/` with new utility module for decimal handling. Tests in `packages/tropykus/test/`. This follows existing project structure.

## Phase 0: Research - ✅ COMPLETE

**Status**: Complete  
**Output**: [research.md](./research.md)

### Research Findings Summary

1. **Ethers.js Utilities**: Use `parseUnits()`/`formatUnits()` instead of `parseEther()`/`formatEther()` - supports variable decimals
2. **Decimal Detection**: Cache decimals per token instance after first fetch - efficient and simple
3. **Error Handling**: Fallback to 18 decimals with warning if `decimals()` missing - maintains compatibility
4. **Backward Compatibility**: Automatic detection ensures 18-decimal tokens work identically
5. **FixedNumber Calculations**: Adjust factor based on detected decimals instead of hardcoded 1e18
6. **Price Oracle**: Handle conversion between token decimals and 18-decimal oracle values

**All research questions resolved. No blocking issues.**

## Phase 1: Design & Contracts - ✅ COMPLETE

**Status**: Complete  
**Outputs**: 
- [data-model.md](./data-model.md) - Entity definitions and data flow
- [contracts/decimal-api.md](./contracts/decimal-api.md) - API documentation
- [quickstart.md](./quickstart.md) - Usage examples and migration guide

### Design Decisions

1. **Utility Module**: New `utils/decimals.js` with `getTokenDecimals()`, `parseTokenAmount()`, `formatTokenAmount()`
2. **Instance Caching**: Store `tokenDecimals` as instance property in Market/CErc20 classes
3. **API Compatibility**: All public methods maintain same signatures - no breaking changes
4. **Automatic Detection**: Decimals detected during Market/CErc20 construction
5. **Error Handling**: Graceful fallback to 18 decimals with console warnings

### Contracts Defined

- Decimal utility functions API
- Modified Market methods (backward compatible)
- Error handling contracts
- Testing requirements

## Phase 2: Implementation Planning

**Status**: Ready for `/speckit.tasks` command  
**Next Step**: Break down implementation into tasks

## Prerequisites: Test Suite Verification

**CRITICAL**: Before starting implementation, the current test suite MUST pass completely.

### Pre-Implementation Checklist

- [ ] **Install Dependencies**: Ensure all npm dependencies are installed (`npm install`)
- [ ] **Build Project**: Verify project builds successfully (`npm run build`)
- [ ] **Run Full Test Suite**: Execute all tests and verify 100% pass rate (`npm test`)
- [ ] **Document Test Results**: Record test count, pass rate, and any flaky tests
- [ ] **Fix Any Failing Tests**: Address any existing test failures before starting multi-decimal implementation
- [ ] **Verify Test Infrastructure**: Ensure test environment (local node/testnet) is properly configured

### Test Suite Baseline

**Purpose**: Establish a known-good baseline before making changes. This ensures:
1. Any test failures during implementation are due to our changes, not pre-existing issues
2. Backward compatibility can be verified by comparing test results
3. Confidence that the codebase is in a stable state before modifications

**Required Actions**:
1. Run `npm install` to ensure all dependencies are installed
2. Run `npm run build` to verify project builds
3. Run `npm test` and capture:
   - Total test count
   - Pass/fail status
   - Test execution time
   - Any warnings or errors
4. Document baseline in implementation notes
5. Fix any failing tests before proceeding

**Gate**: Test suite MUST pass 100% before Phase 1 (Setup) tasks begin.

### Test Suite Status

**Current Status**: ❌ **FAILING** - Test suite has failures that must be fixed before implementation

**Test Results** (as of 2025-01-27):
- **Total Tests**: 93
- **Passing**: 51 (54.8%)
- **Failing**: 42 (45.2%)
- **Build Status**: ✅ Successful

**Failing Test Categories**:
1. **Core tropykus** (3 failures):
   - should get provider's chainId
   - should generate an account
   - should deploy a new comptroller

2. **Comptroller** (3 failures):
   - should list the market's addresses
   - should list the market's as instances
   - should enter the markets
   - "before each" hook failure

3. **Market** (5 failures):
   - should deployed a new CRBTC market
   - should deployed a new CRDOC market
   - should deployed a new CToken market
   - should return the market's kSymbol
   - should return the market's underlying symbol

4. **Market setups** (2 failures):
   - should set market's comptroller
   - should set market's reserve factor

5. **Unitroller** (2 failures):
   - should set a pending implementation of comptroller
   - should get unitroller's comptroller implementation

6. **Deprecation utilities** (multiple failures):
   - getDeprecationMetadata tests (6 failures)
   - warnDeprecatedOnce tests (12 failures)

7. **Quickstart validation** (1 failure):
   - "before all" hook failure

**Action Required**: 
1. **CRITICAL**: Fix all 42 failing tests before proceeding with multi-decimal implementation
2. Investigate root causes (likely test environment setup, network connectivity, or test data issues)
3. Document fixes and ensure tests are stable
4. Re-run test suite to verify 100% pass rate
5. Mark Phase 0 as complete only when all tests pass

**Note**: This is a blocking prerequisite. Implementation tasks MUST NOT begin until test suite baseline is established with 100% pass rate. The failing tests appear to be related to test infrastructure and setup, not the codebase itself, but they must be resolved to ensure a stable baseline.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all constitution principles satisfied.
