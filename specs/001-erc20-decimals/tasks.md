# Implementation Tasks: ERC20 Multi-Decimal Support

**Feature Branch**: `001-erc20-decimals`  
**Created**: 2025-01-27  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Summary

This document breaks down the implementation of ERC20 multi-decimal support into actionable, dependency-ordered tasks. Tasks are organized by user story priority to enable independent implementation and testing.

**Total Tasks**: 65  
**Tasks by Phase**: Phase 0 (5), Phase 1 (5), Phase 2 (8), Phase 3 (15), Phase 4 (8), Phase 5 (10), Phase 6 (14)  
**Tasks by User Story**: US1 (15), US2 (8), US3 (10), Polish (14)  
**Parallel Opportunities**: 18 tasks can be executed in parallel

**CRITICAL**: Phase 0 (Test Suite Verification) MUST be completed before any implementation tasks begin.

## Implementation Strategy

### MVP Scope
Start with **User Story 1 (6-decimal tokens)** - this delivers immediate value by enabling support for popular stablecoins like USDC. Once US1 is complete and tested, proceed to US2 and US3.

### Incremental Delivery
1. **Phase 1-2**: Foundation (utilities + decimal detection)
2. **Phase 3**: US1 - 6-decimal tokens (MVP)
3. **Phase 4**: US2 - 8-decimal tokens
4. **Phase 5**: US3 - All decimal amounts
5. **Phase 6**: Polish - Cross-cutting updates

### Independent Test Criteria

- **US1 (6-decimal)**: Create market for 6-decimal token, deposit 1.0 tokens → contract receives 1000000, balance query returns 1.0
- **US2 (8-decimal)**: Create market for 8-decimal token, deposit 0.5 tokens → contract receives 50000000, all operations work correctly
- **US3 (All decimals)**: Create markets for 0, 2, 4, 6, 8, 18 decimals, verify each uses correct precision

## Dependencies

```
Phase 0 (Test Suite Verification) - BLOCKING PREREQUISITE
  └─> Phase 1 (Setup)
       └─> Phase 2 (Foundational)
            └─> Phase 3 (US1 - 6-decimal)
                 └─> Phase 4 (US2 - 8-decimal)
                      └─> Phase 5 (US3 - All decimals)
                           └─> Phase 6 (Polish)
```

**Story Completion Order**: US1 → US2 → US3 (each builds on previous)

**IMPORTANT**: Phase 0 is a blocking prerequisite. All tests MUST pass before proceeding to Phase 1.

## Parallel Execution Examples

### Phase 3 (US1) - Can run in parallel:
- T010 [P] [US1] Create getTokenDecimals function
- T011 [P] [US1] Create parseTokenAmount function  
- T012 [P] [US1] Create formatTokenAmount function
- T013 [P] [US1] Add decimal detection to CErc20 constructor

### Phase 4 (US2) - Can run in parallel:
- T025 [P] [US2] Add 8-decimal test cases
- T026 [P] [US2] Verify borrow operations with 8 decimals

### Phase 5 (US3) - Can run in parallel:
- T033 [P] [US3] Add test cases for 0-decimal tokens
- T034 [P] [US3] Add test cases for 2-decimal tokens
- T035 [P] [US3] Add test cases for 4-decimal tokens

---

## Phase 0: Test Suite Verification (PREREQUISITE)

**Goal**: Establish a known-good baseline by ensuring the current test suite passes 100% before making any changes

**Why This Phase**: 
- Ensures any test failures during implementation are due to our changes, not pre-existing issues
- Verifies backward compatibility can be measured accurately
- Confirms codebase is in stable state before modifications
- Required by Constitution Principle III: Test-First Development

**Independent Test**: Run full test suite, verify 100% pass rate, document baseline results

**Gate**: ❌ **BLOCKING - CURRENTLY FAILING** - Implementation tasks MUST NOT begin until Phase 0 is complete and all tests pass

**Current Status** (2025-01-27):
- ✅ Build: Successful
- ❌ Tests: 51 passing, 42 failing (54.8% pass rate)
- **Action Required**: Fix all 42 failing tests before proceeding

### Tasks

- [X] T000 Verify npm dependencies are installed (run `npm install` in repo root)
- [X] T001 Verify project builds successfully (run `npm run build` in repo root) ✅ **COMPLETE**
- [X] T002 Run full test suite and capture results (run `npm test` in repo root) ✅ **COMPLETE - 42 failures identified**
- [X] T003 Document test suite baseline (total tests: 93, passing: 51, failing: 42, execution time: ~6s) ✅ **COMPLETE** - See [test-suite-baseline.md](./test-suite-baseline.md)
- [X] T004 Investigate root causes of failing tests (test environment, network, test data) ✅ **COMPLETE** - See [root-cause-investigation.md](./root-cause-investigation.md)
- [X] T005 Fix Core tropykus failing tests (3 failures: chainId, account generation, deploy comptroller) ✅ **COMPLETE** - Updated tests to work with Anvil forking Rootstock Mainnet (chainId 30), fixed account generation to use Anvil default account, fixed comptroller deployment to deploy Unitroller and verify implementation
- [ ] T006 Fix Comptroller failing tests (3 failures: list markets, enter markets, setup hooks)
- [ ] T007 Fix Market failing tests (5 failures: deploy markets, get symbols)
- [ ] T008 Fix Market setups failing tests (2 failures: set comptroller, set reserve factor)
- [ ] T009 Fix Unitroller failing tests (2 failures: set pending implementation, get implementation)
- [ ] T010 Fix deprecation utility tests (18 failures: getDeprecationMetadata, warnDeprecatedOnce)
- [ ] T011 Fix Quickstart validation test (1 failure: before all hook)
- [ ] T012 Re-run full test suite and verify 100% pass rate (all 93 tests passing)
- [ ] T013 Document final test suite baseline (100% pass rate confirmed)
- [ ] T014 Verify test infrastructure is properly configured (local node/testnet accessible)

**Completion Criteria**:
- ✅ All dependencies installed
- ✅ Project builds without errors
- ✅ All tests pass (100% pass rate)
- ✅ Baseline documented
- ✅ No flaky or failing tests
- ✅ Test infrastructure verified

**Note**: If tests fail, stop and fix them before proceeding. Do not start implementation until test suite is green.

---

## Phase 1: Setup

**Goal**: Initialize project structure and create utility module foundation

### Tasks

- [ ] T006 Create utils directory structure in packages/tropykus/src/utils/
- [ ] T007 Create decimals.js utility module file in packages/tropykus/src/utils/decimals.js
- [ ] T008 Add JSDoc header to decimals.js with module description in packages/tropykus/src/utils/decimals.js
- [ ] T009 Create test directory structure in packages/tropykus/test/utils/
- [ ] T010 Create decimals.spec.js test file in packages/tropykus/test/utils/decimals.spec.js

---

## Phase 2: Foundational

**Goal**: Implement core decimal detection and conversion utilities (blocking prerequisites for all user stories)

**Independent Test**: Unit tests for decimal utilities pass - getTokenDecimals returns correct decimals, parseTokenAmount/formatTokenAmount convert correctly

### Tasks

- [ ] T011 [P] Implement getTokenDecimals function with caching in packages/tropykus/src/utils/decimals.js
- [ ] T012 [P] Implement parseTokenAmount function using ethers.utils.parseUnits in packages/tropykus/src/utils/decimals.js
- [ ] T013 [P] Implement formatTokenAmount function using ethers.utils.formatUnits in packages/tropykus/src/utils/decimals.js
- [ ] T014 [P] Add error handling for missing decimals() function with fallback to 18 in packages/tropykus/src/utils/decimals.js
- [ ] T015 [P] Write unit tests for getTokenDecimals in packages/tropykus/test/utils/decimals.spec.js
- [ ] T016 [P] Write unit tests for parseTokenAmount in packages/tropykus/test/utils/decimals.spec.js
- [ ] T017 [P] Write unit tests for formatTokenAmount in packages/tropykus/test/utils/decimals.spec.js
- [ ] T018 [P] Write unit tests for error handling (missing decimals function) in packages/tropykus/test/utils/decimals.spec.js

---

## Phase 3: User Story 1 - 6-Decimal Tokens (P1)

**Goal**: Enable support for 6-decimal tokens (e.g., USDC) with correct parsing and formatting

**Independent Test**: Create market for 6-decimal token, deposit 1.0 tokens → contract receives 1000000 (1e6), balance query returns 1.0 with 6-decimal precision

**Acceptance Criteria**:
1. Market creation detects 6 decimals from token contract
2. Deposit 1.0 tokens converts to 1000000 in contract
3. Balance queries return 1.123456 format (6-decimal precision)
4. Borrow 10.5 tokens converts to 10500000 in contract
5. Repay operations use 6-decimal conversion

### Tasks

- [ ] T019 [US1] Import decimals utilities in packages/tropykus/src/Markets/CErc20.js
- [ ] T020 [US1] Add decimal detection to CErc20 constructor in packages/tropykus/src/Markets/CErc20.js
- [ ] T021 [US1] Cache tokenDecimals as instance property in CErc20 constructor in packages/tropykus/src/Markets/CErc20.js
- [ ] T022 [US1] Update mint method to use parseTokenAmount with detected decimals in packages/tropykus/src/Markets/CErc20.js
- [ ] T023 [US1] Update repayBorrow method to use parseTokenAmount with detected decimals in packages/tropykus/src/Markets/CErc20.js
- [ ] T024 [US1] Update transferUnderlying method to use parseTokenAmount with detected decimals in packages/tropykus/src/Markets/CErc20.js
- [ ] T025 [US1] Update balanceOfUnderlyingInWallet to use formatTokenAmount with detected decimals in packages/tropykus/src/Markets/CErc20.js
- [ ] T026 [US1] Update balanceOfUnderlyingInWallet to use correct decimal factor for calculations in packages/tropykus/src/Markets/CErc20.js
- [ ] T027 [US1] Create integration test for 6-decimal token market creation in packages/tropykus/test/02-markets.spec.js
- [ ] T028 [US1] Create integration test for 6-decimal token deposit operation in packages/tropykus/test/02-markets.spec.js
- [ ] T029 [US1] Create integration test for 6-decimal token balance query in packages/tropykus/test/02-markets.spec.js
- [ ] T030 [US1] Create integration test for 6-decimal token borrow operation in packages/tropykus/test/02-markets.spec.js
- [ ] T031 [US1] Create integration test for 6-decimal token repay operation in packages/tropykus/test/02-markets.spec.js
- [ ] T032 [US1] Verify 6-decimal token operations maintain precision (no rounding errors) in packages/tropykus/test/02-markets.spec.js
- [ ] T033 [US1] Update JSDoc comments for modified CErc20 methods in packages/tropykus/src/Markets/CErc20.js

---

## Phase 4: User Story 2 - 8-Decimal Tokens (P2)

**Goal**: Enable support for 8-decimal tokens (e.g., WBTC) with correct parsing and formatting

**Independent Test**: Create market for 8-decimal token, deposit 0.5 tokens → contract receives 50000000 (0.5e8), all operations work with 8-decimal precision

**Acceptance Criteria**:
1. Market creation detects 8 decimals from token contract
2. Deposit 0.5 tokens converts to 50000000 in contract
3. All operations (deposit, withdraw, borrow, repay) use 8-decimal precision
4. USD value calculations maintain 8-decimal precision for underlying amounts

### Tasks

- [ ] T034 [US2] Create integration test for 8-decimal token market creation in packages/tropykus/test/02-markets.spec.js
- [ ] T035 [US2] Create integration test for 8-decimal token deposit (0.5 tokens → 50000000) in packages/tropykus/test/02-markets.spec.js
- [ ] T036 [US2] Create integration test for 8-decimal token withdraw operation in packages/tropykus/test/02-markets.spec.js
- [ ] T037 [US2] Create integration test for 8-decimal token borrow operation in packages/tropykus/test/02-markets.spec.js
- [ ] T038 [US2] Create integration test for 8-decimal token repay operation in packages/tropykus/test/02-markets.spec.js
- [ ] T039 [US2] Verify 8-decimal token USD calculations maintain precision in packages/tropykus/test/02-markets.spec.js
- [ ] T040 [US2] Verify all operations work correctly with 8-decimal precision in packages/tropykus/test/02-markets.spec.js
- [ ] T041 [US2] Document 8-decimal token support in quickstart examples in packages/tropykus/README.md

---

## Phase 5: User Story 3 - All Valid Decimal Amounts (P3)

**Goal**: Enable support for all valid ERC20 decimal amounts (0-18, typically)

**Independent Test**: Create markets for tokens with 0, 2, 4, 6, 8, 18 decimals, verify each uses correct decimal precision automatically

**Acceptance Criteria**:
1. Token with 0 decimals: deposit 100 → contract receives 100
2. Token with 2 decimals: deposit 1.23 → contract receives 123
3. Any valid decimal (0-18) automatically detected and used
4. Multiple markets with different decimals work simultaneously

### Tasks

- [ ] T042 [US3] Add validation for decimal range (0-255) in getTokenDecimals function in packages/tropykus/src/utils/decimals.js
- [ ] T043 [US3] Handle edge case for 0-decimal tokens in parseTokenAmount in packages/tropykus/src/utils/decimals.js
- [ ] T044 [US3] Handle edge case for 0-decimal tokens in formatTokenAmount in packages/tropykus/src/utils/decimals.js
- [ ] T045 [US3] Create integration test for 0-decimal token (deposit 100 → 100) in packages/tropykus/test/02-markets.spec.js
- [ ] T046 [US3] Create integration test for 2-decimal token (deposit 1.23 → 123) in packages/tropykus/test/02-markets.spec.js
- [ ] T047 [US3] Create integration test for 4-decimal token in packages/tropykus/test/02-markets.spec.js
- [ ] T048 [US3] Create integration test for multiple markets with different decimals simultaneously in packages/tropykus/test/02-markets.spec.js
- [ ] T049 [US3] Verify automatic decimal detection works for all tested amounts (0, 2, 4, 6, 8, 18) in packages/tropykus/test/02-markets.spec.js
- [ ] T050 [US3] Add test for decimal amounts > 18 (up to 255) validation in packages/tropykus/test/utils/decimals.spec.js
- [ ] T051 [US3] Document support for all decimal amounts in README in packages/tropykus/README.md

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Update remaining code, ensure backward compatibility, add documentation

**Independent Test**: All existing 18-decimal token tests pass without modification, new multi-decimal tests pass

### Tasks

- [ ] T052 Update Market.js balanceOf method to use detected decimals in packages/tropykus/src/Market.js
- [ ] T053 Update Market.js balanceOfUnderlying method to use detected decimals in packages/tropykus/src/Market.js
- [ ] T054 Update Market.js getTokensFromUnderlying method to use parseTokenAmount in packages/tropykus/src/Market.js
- [ ] T055 Update Market.js borrow method to use parseTokenAmount in packages/tropykus/src/Market.js
- [ ] T056 Update Market.js redeem method to use parseTokenAmount in packages/tropykus/src/Market.js
- [ ] T057 Update Market.js redeemUnderlying method to use parseTokenAmount in packages/tropykus/src/Market.js
- [ ] T058 Update Market.js to use dynamic factor (10^decimals) instead of hardcoded 1e18 in packages/tropykus/src/Market.js
- [ ] T059 Update Comptroller.js getHypotheticalAccountLiquidity to use parseTokenAmount in packages/tropykus/src/Comptroller.js
- [ ] T060 Update PriceOracle.js to handle decimal conversion for USD calculations in packages/tropykus/src/PriceOracle.js
- [ ] T061 Verify backward compatibility: all existing 18-decimal tests pass without modification in packages/tropykus/test/02-markets.spec.js
- [ ] T062 Run ESLint and fix any linting errors in packages/tropykus/src/
- [ ] T063 Run Prettier and format all modified files in packages/tropykus/src/
- [ ] T064 Update README.md with multi-decimal token examples in packages/tropykus/README.md
- [ ] T065 Update CHANGELOG.md with feature description and version bump to 0.4.0 in CHANGELOG.md

---

## Task Summary

**Total Tasks**: 74  
**By Phase**:
- Phase 0 (Test Suite Verification): 14 tasks ❌ **BLOCKING PREREQUISITE - 42 TESTS FAILING**
- Phase 1 (Setup): 5 tasks
- Phase 2 (Foundational): 8 tasks
- Phase 3 (US1 - 6-decimal): 15 tasks
- Phase 4 (US2 - 8-decimal): 8 tasks
- Phase 5 (US3 - All decimals): 10 tasks
- Phase 6 (Polish): 14 tasks

**Parallelizable Tasks**: 18 tasks marked with [P]

**Estimated Effort**:
- Phase 0: 4-8 hours (test suite verification + fixing 42 failing tests) ⚠️ **CRITICAL BLOCKER**
- Phase 1-2: 2-3 hours (foundation)
- Phase 3: 4-6 hours (MVP - 6-decimal)
- Phase 4: 2-3 hours (8-decimal)
- Phase 5: 3-4 hours (all decimals)
- Phase 6: 4-5 hours (polish)

**Total Estimated**: 15.5-22 hours

---

## Notes

- All tasks follow TDD approach: Write tests first, then implement
- Backward compatibility is critical: 18-decimal tokens must work identically
- Precision is non-negotiable: No rounding errors in critical operations
- Error handling: Graceful fallback to 18 decimals with warnings
- Documentation: Update JSDoc for all modified methods

