# Tasks: 6-Decimal Token with 8-Decimal Oracle Integration

**Input**: Design documents from `/specs/001-erc20-decimals/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/oracle-adapter-api.md ✓

**Scope**: Reduced scope focusing on 6-decimal tokens (USDT/USDC) with 8-decimal price oracle integration using PriceOracleAdapterMoc and PriceOracleAdapterUSDT.

**Tests**: Integration tests required per Constitution (Test-First Development). Tests must cover 6-decimal token operations with 8-decimal oracle.

**Organization**: Tasks organized to enable independent implementation and testing of the 6-decimal token + 8-decimal oracle integration.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1 = 6-decimal tokens with 8-decimal oracle)
- Include exact file paths in descriptions

## Path Conventions

- **SDK Package**: `packages/tropykus/src/` for source code
- **Tests**: `packages/tropykus/test/` for integration tests
- **Artifacts**: `packages/tropykus/artifacts/` for contract artifacts

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and verification of existing structure

- [x] T001 Verify project structure exists: `packages/tropykus/src/`, `packages/tropykus/test/`, `packages/tropykus/artifacts/`
- [x] T002 [P] Verify PriceOracleAdapterMoc.json exists in `packages/tropykus/artifacts/PriceOracleAdapterMoc.json`
- [x] T003 [P] Verify PriceOracleAdapterUSDT.json exists in `packages/tropykus/artifacts/PriceOracleAdapterUSDT.json`
- [x] T004 [P] Verify existing Market.js, CErc20.js, and PriceOracle.js files structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core decimal detection and oracle adapter detection infrastructure that MUST be complete before user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Create decimal utility module `packages/tropykus/src/utils/decimals.js` with `getTokenDecimals()` function
- [X] T006 [P] Implement `parseTokenAmount(amount, decimals)` helper in `packages/tropykus/src/utils/decimals.js`
- [X] T007 [P] Implement `formatTokenAmount(amount, decimals)` helper in `packages/tropykus/src/utils/decimals.js`
- [X] T008 Add error handling and fallback to 18 decimals in `getTokenDecimals()` in `packages/tropykus/src/utils/decimals.js`
- [ ] T009 Implement `detectOracleDecimals(adapterAddress)` method in `packages/tropykus/src/PriceOracle.js`
- [ ] T010 [P] Add `adapterDecimalsMap` property initialization in PriceOracle constructor in `packages/tropykus/src/PriceOracle.js`
- [ ] T011 Implement adapter type detection logic (Moc vs USDT vs Unknown) in `detectOracleDecimals()` in `packages/tropykus/src/PriceOracle.js`
- [ ] T012 Implement DECIMAL_MULTIPLIER query for PriceOracleAdapterUSDT in `detectOracleDecimals()` in `packages/tropykus/src/PriceOracle.js`

**Checkpoint**: Foundation ready - decimal detection utilities and oracle adapter detection are complete. User story implementation can now begin.

---

## Phase 3: User Story 1 - 6-Decimal Tokens with 8-Decimal Oracle (Priority: P1) 🎯 MVP

**Goal**: Enable developers to interact with 6-decimal ERC20 tokens (like USDT/USDC) using an 8-decimal price oracle. The system should correctly parse and format all amounts using 6-decimal precision for tokens and handle 8-decimal oracle prices correctly for USD value calculations.

**Independent Test**: Create a market for a 6-decimal token, set up PriceOracleAdapterMoc with 1e8 price, perform deposit/withdraw/borrow/repay operations, and verify that amounts are correctly parsed/formatted and USD values are correctly calculated.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T013 [P] [US1] Create integration test for 6-decimal token decimal detection in `packages/tropykus/test/02-markets.spec.js`
- [ ] T014 [P] [US1] Create integration test for PriceOracleAdapterMoc 8-decimal price handling in `packages/tropykus/test/02-markets.spec.js`
- [ ] T015 [P] [US1] Create integration test for 6-decimal token deposit operation in `packages/tropykus/test/02-markets.spec.js`
- [ ] T016 [P] [US1] Create integration test for 6-decimal token balance query with USD value calculation in `packages/tropykus/test/02-markets.spec.js`
- [ ] T017 [P] [US1] Create integration test for 6-decimal token borrow operation in `packages/tropykus/test/02-markets.spec.js`
- [ ] T018 [P] [US1] Create integration test for 6-decimal token repay operation in `packages/tropykus/test/02-markets.spec.js`
- [ ] T019 [P] [US1] Create integration test for PriceOracleAdapterUSDT DECIMAL_MULTIPLIER handling in `packages/tropykus/test/02-markets.spec.js`

### Implementation for User Story 1

- [ ] T020 [US1] Add decimal detection to CErc20 constructor in `packages/tropykus/src/Markets/CErc20.js` - call `getTokenDecimals()` and cache as `this.tokenDecimals`
- [ ] T021 [US1] Replace `parseEther()` calls with `parseTokenAmount()` using detected decimals in `mint()` method in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T022 [US1] Replace `parseEther()` calls with `parseTokenAmount()` using detected decimals in `repayBorrow()` method in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T023 [US1] Replace `parseEther()` calls with `parseTokenAmount()` using detected decimals in `transferUnderlying()` method in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T024 [US1] Replace `formatEther()` calls with `formatTokenAmount()` using detected decimals in `balanceOfUnderlyingInWallet()` method in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T025 [US1] Update `getUnderlyingPrice()` to use `detectOracleDecimals()` and divide by correct factor (1e8 for 8-decimal oracle) in `packages/tropykus/src/PriceOracle.js`
- [ ] T026 [US1] Modify `setAdapterToToken()` to detect and cache oracle decimals when adapter is set in `packages/tropykus/src/PriceOracle.js`
- [ ] T027 [US1] Update `balanceOfUnderlying()` to handle 6-decimal token amounts and 8-decimal oracle prices correctly in `packages/tropykus/src/Market.js`
- [ ] T028 [US1] Update `balanceOf()` to handle 6-decimal token amounts and 8-decimal oracle prices correctly in `packages/tropykus/src/Market.js`
- [ ] T029 [US1] Replace hardcoded `1e18` factors with `10^tokenDecimals` calculations in `balanceOfUnderlying()` in `packages/tropykus/src/Market.js`
- [ ] T030 [US1] Replace hardcoded `1e18` factors with `10^tokenDecimals` calculations in `balanceOf()` in `packages/tropykus/src/Market.js`
- [ ] T031 [US1] Update USD value calculation formula to handle 6-decimal token × 8-decimal oracle conversion in `balanceOfUnderlying()` in `packages/tropykus/src/Market.js`
- [ ] T032 [US1] Update USD value calculation formula to handle 6-decimal token × 8-decimal oracle conversion in `balanceOf()` in `packages/tropykus/src/Market.js`
- [ ] T033 [US1] Add `getAdapterAddress(marketAddress)` helper method to PriceOracle for retrieving adapter address in `packages/tropykus/src/PriceOracle.js`
- [ ] T034 [US1] Update all Market methods that use `parseEther()`/`formatEther()` to use decimal-aware utilities in `packages/tropykus/src/Market.js`
- [ ] T035 [US1] Add JSDoc comments to all new utility functions in `packages/tropykus/src/utils/decimals.js`
- [ ] T036 [US1] Add JSDoc comments to modified methods in `packages/tropykus/src/PriceOracle.js`
- [ ] T037 [US1] Add JSDoc comments to modified methods in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T038 [US1] Add JSDoc comments to modified methods in `packages/tropykus/src/Market.js`

**Checkpoint**: At this point, User Story 1 should be fully functional. A developer can create a market for a 6-decimal token, set up an 8-decimal oracle adapter, perform all operations (deposit, withdraw, borrow, repay), and get correct USD values. All tests should pass.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements, edge case handling, and validation

- [ ] T039 [P] Add error handling for missing `decimals()` function with warning logging in `packages/tropykus/src/utils/decimals.js`
- [ ] T040 [P] Add error handling for invalid decimal values (>255) with fallback to 18 in `packages/tropykus/src/utils/decimals.js`
- [ ] T041 [P] Add error handling for DECIMAL_MULTIPLIER query failures in `detectOracleDecimals()` in `packages/tropykus/src/PriceOracle.js`
- [ ] T042 [P] Add backward compatibility validation: ensure 18-decimal tokens still work identically in `packages/tropykus/test/02-markets.spec.js`
- [ ] T043 [P] Add edge case test for very small amounts with 6-decimal precision in `packages/tropykus/test/02-markets.spec.js`
- [ ] T044 [P] Add edge case test for oracle adapter type detection edge cases in `packages/tropykus/test/02-markets.spec.js`
- [ ] T045 [P] Run ESLint and fix any linting errors in modified files
- [ ] T046 [P] Run Prettier and format all modified files
- [ ] T047 [P] Verify all existing tests still pass (backward compatibility check)
- [ ] T048 [P] Update quickstart.md validation: verify test setup instructions work correctly
- [ ] T049 [P] Add integration test for multiple markets with different oracle adapters in `packages/tropykus/test/02-markets.spec.js`
- [ ] T050 [P] Add integration test for oracle adapter change after market creation in `packages/tropykus/test/02-markets.spec.js`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within User Story 1

- Tests (T013-T019) MUST be written and FAIL before implementation
- Decimal utilities (T005-T008) must be complete before CErc20 modifications
- Oracle detection (T009-T012) must be complete before PriceOracle modifications
- CErc20 decimal detection (T020) must be complete before using decimals in operations
- PriceOracle modifications (T025-T026, T033) must be complete before Market USD calculations
- Market modifications (T027-T032, T034) depend on both token decimals and oracle decimals being available

### Parallel Opportunities

- **Setup Phase**: T002, T003, T004 can run in parallel
- **Foundational Phase**: T006, T007, T010 can run in parallel
- **User Story 1 Tests**: T013-T019 can all run in parallel (all create different test cases)
- **User Story 1 Implementation**: 
  - T021, T022, T023 can run in parallel (different methods in same file, but no dependencies)
  - T027, T028 can run in parallel (different methods in same file)
  - T029, T030 can run in parallel (different methods in same file)
  - T031, T032 can run in parallel (different methods in same file)
  - T035, T036, T037, T038 can run in parallel (JSDoc additions to different files)
- **Polish Phase**: T039-T050 can mostly run in parallel (different concerns)

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task T013: "Create integration test for 6-decimal token decimal detection"
Task T014: "Create integration test for PriceOracleAdapterMoc 8-decimal price handling"
Task T015: "Create integration test for 6-decimal token deposit operation"
Task T016: "Create integration test for 6-decimal token balance query with USD value"
Task T017: "Create integration test for 6-decimal token borrow operation"
Task T018: "Create integration test for 6-decimal token repay operation"
Task T019: "Create integration test for PriceOracleAdapterUSDT DECIMAL_MULTIPLIER handling"

# Launch parallel implementation tasks (after dependencies met):
Task T021: "Replace parseEther() in mint() method"
Task T022: "Replace parseEther() in repayBorrow() method"
Task T023: "Replace parseEther() in transferUnderlying() method"

Task T027: "Update balanceOfUnderlying() for 6-decimal tokens"
Task T028: "Update balanceOf() for 6-decimal tokens"

Task T035: "Add JSDoc to decimals.js"
Task T036: "Add JSDoc to PriceOracle.js"
Task T037: "Add JSDoc to CErc20.js"
Task T038: "Add JSDoc to Market.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify structure)
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
   - Decimal utilities (T005-T008)
   - Oracle adapter detection (T009-T012)
3. Complete Phase 3: User Story 1
   - Write tests first (T013-T019) - ensure they FAIL
   - Implement decimal detection in CErc20 (T020)
   - Update CErc20 methods (T021-T024)
   - Update PriceOracle methods (T025-T026, T033)
   - Update Market methods (T027-T032, T034)
   - Add documentation (T035-T038)
4. **STOP and VALIDATE**: Run all tests, verify 6-decimal token + 8-decimal oracle works correctly
5. Complete Phase 4: Polish (edge cases, validation, cleanup)

### Incremental Delivery

1. **Foundation** (Phase 1 + 2): Decimal utilities + Oracle detection ready
2. **Core Functionality** (Phase 3, Part 1): Decimal detection + basic operations (deposit, withdraw)
3. **USD Calculations** (Phase 3, Part 2): Oracle integration + USD value calculations
4. **Complete Operations** (Phase 3, Part 3): Borrow, repay with correct decimals
5. **Polish** (Phase 4): Edge cases, error handling, validation

### Parallel Team Strategy

With multiple developers:

1. **Team completes Setup + Foundational together** (Phase 1 + 2)
2. **Once Foundational is done**:
   - Developer A: Write all integration tests (T013-T019)
   - Developer B: Implement CErc20 decimal detection and methods (T020-T024)
   - Developer C: Implement PriceOracle oracle detection (T025-T026, T033)
3. **After core detection is done**:
   - Developer A: Implement Market balance methods (T027-T032)
   - Developer B: Add JSDoc documentation (T035-T038)
   - Developer C: Work on edge cases and polish (Phase 4)

---

## Notes

- **[P] tasks** = different files or different methods, no dependencies
- **[US1] label** = task belongs to User Story 1 (6-decimal tokens with 8-decimal oracle)
- **Test-First**: Write tests (T013-T019) FIRST, ensure they FAIL before implementation
- **Backward Compatibility**: All changes must maintain 18-decimal token compatibility
- **Precision**: Use BigNumber/FixedNumber for all calculations to avoid rounding errors
- **Oracle Decimals**: Default to 18 if adapter type unknown (backward compatibility)
- **Token Decimals**: Default to 18 if `decimals()` function missing (backward compatibility)
- Commit after each logical group of tasks
- Stop at checkpoints to validate functionality independently
- Verify all existing tests still pass after each phase

---

## Task Summary

- **Total Tasks**: 50
- **Setup Phase**: 4 tasks
- **Foundational Phase**: 8 tasks (CRITICAL - blocks all user stories)
- **User Story 1**: 26 tasks (13 tests + 19 implementation)
- **Polish Phase**: 12 tasks

**MVP Scope**: Phases 1-3 (User Story 1) = 38 tasks
**Full Scope**: All phases = 50 tasks

**Independent Test Criteria**: User Story 1 can be fully tested by creating a market for a 6-decimal token, setting up PriceOracleAdapterMoc with 1e8 price, performing deposit/withdraw/borrow/repay operations, and verifying correct decimal handling and USD value calculations.
