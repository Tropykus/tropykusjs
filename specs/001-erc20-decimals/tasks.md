# Tasks: ERC20 Multi-Decimal Support with Oracle Integration

**Input**: Design documents from `/specs/001-erc20-decimals/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/oracle-adapter-api.md ✓

**Scope**: Support for ERC20 tokens with different decimal amounts (0-18), with focus on 6-decimal tokens (USDT/USDC) and 8-decimal tokens (WBTC). Oracle integration handles PriceOracleAdapterMoc (assetPrices() returns 1e18) and PriceOracleAdapterUSDT (assetPrices() returns 1e30).

**Tests**: Integration tests required per Constitution (Test-First Development). Tests must cover operations with various decimal amounts and oracle adapter integrations.

**Organization**: Tasks organized by user story priority to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1 = 6-decimal tokens, US2 = 8-decimal tokens, US3 = all valid decimals)
- Include exact file paths in descriptions

## Path Conventions

- **SDK Package**: `packages/tropykus/src/` for source code
- **Tests**: `packages/tropykus/test/` for integration tests
- **Artifacts**: `packages/tropykus/artifacts/` for contract artifacts

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and verification of existing structure

- [X] T001 Verify project structure exists: `packages/tropykus/src/`, `packages/tropykus/test/`, `packages/tropykus/artifacts/`
- [X] T002 [P] Verify PriceOracleAdapterMoc.json exists in `packages/tropykus/artifacts/PriceOracleAdapterMoc.json`
- [X] T003 [P] Verify PriceOracleAdapterUSDT.json exists in `packages/tropykus/artifacts/PriceOracleAdapterUSDT.json`
- [X] T004 [P] Verify existing Market.js, CErc20.js, and PriceOracle.js files structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core decimal detection and oracle adapter detection infrastructure that MUST be complete before user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Create decimal utility module `packages/tropykus/src/utils/decimals.js` with `getTokenDecimals(erc20Instance)` function
- [X] T006 [P] Implement `parseTokenAmount(amount, decimals)` helper in `packages/tropykus/src/utils/decimals.js` using `ethers.utils.parseUnits()`
- [X] T007 [P] Implement `formatTokenAmount(amount, decimals)` helper in `packages/tropykus/src/utils/decimals.js` using `ethers.utils.formatUnits()`
- [X] T008 Add error handling and fallback to 18 decimals in `getTokenDecimals()` in `packages/tropykus/src/utils/decimals.js`
- [X] T009 Update `detectOracleDecimals(adapterAddress)` method in `packages/tropykus/src/PriceOracle.js` to return 30 for USDT (assetPrices() returns 1e30), 18 for MoC (assetPrices() returns 1e18)
- [X] T010 [P] Add `adapterDecimalsMap` property initialization in PriceOracle constructor in `packages/tropykus/src/PriceOracle.js`
- [X] T011 Update adapter type detection logic to correctly identify MoC (returns 18) vs USDT (returns 30) in `detectOracleDecimals()` in `packages/tropykus/src/PriceOracle.js`
- [X] T012 Update DECIMAL_MULTIPLIER handling: PriceOracleAdapterUSDT.assetPrices() returns 1e30 (8-decimal oracle * 1e22), not 8 decimals in `detectOracleDecimals()` in `packages/tropykus/src/PriceOracle.js`

**Checkpoint**: Foundation ready - decimal detection utilities and oracle adapter detection are complete. User story implementation can now begin.

---

## Phase 3: User Story 1 - 6-Decimal Tokens (Priority: P1) 🎯 MVP

**Goal**: Enable developers to interact with 6-decimal ERC20 tokens (like USDC/USDT). The system should correctly parse and format all amounts using 6-decimal precision, ensuring that 1.0 token units are represented correctly in the underlying token contract.

**Independent Test**: Create a market for a 6-decimal token, perform deposit and withdrawal operations, and verify that amounts are correctly parsed and formatted. This delivers immediate value by enabling support for popular stablecoins.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T013 [P] [US1] Create integration test for 6-decimal token decimal detection in `packages/tropykus/test/02-markets.spec.js`
- [ ] T014 [P] [US1] Create integration test for 6-decimal token deposit operation (1.0 token → 1000000) in `packages/tropykus/test/02-markets.spec.js`
- [ ] T015 [P] [US1] Create integration test for 6-decimal token balance query with 6-decimal precision display in `packages/tropykus/test/02-markets.spec.js`
- [ ] T016 [P] [US1] Create integration test for 6-decimal token borrow operation (10.5 tokens → 10500000) in `packages/tropykus/test/02-markets.spec.js`
- [ ] T017 [P] [US1] Create integration test for 6-decimal token repay operation with correct 6-decimal parsing in `packages/tropykus/test/02-markets.spec.js`

### Implementation for User Story 1

- [ ] T018 [US1] Add decimal detection to CErc20 constructor in `packages/tropykus/src/Markets/CErc20.js` - call `getTokenDecimals()` and cache as `this.tokenDecimals`
- [ ] T019 [US1] Replace `parseEther()` calls with `parseTokenAmount()` using detected decimals in `mint()` method in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T020 [US1] Replace `parseEther()` calls with `parseTokenAmount()` using detected decimals in `repayBorrow()` method in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T021 [US1] Replace `parseEther()` calls with `parseTokenAmount()` using detected decimals in `transferUnderlying()` method in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T022 [US1] Replace `formatEther()` calls with `formatTokenAmount()` using detected decimals in `balanceOfUnderlyingInWallet()` method in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T023 [US1] Replace hardcoded `factor` (1e18) with dynamic factor based on `tokenDecimals` in CErc20 constructor in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T024 [US1] Update all Market methods that use hardcoded `factor` (1e18) to use `10^tokenDecimals` in `packages/tropykus/src/Market.js`
- [ ] T025 [US1] Add JSDoc comments to all new utility functions in `packages/tropykus/src/utils/decimals.js`
- [ ] T026 [US1] Add JSDoc comments to modified methods in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T027 [US1] Add JSDoc comments to modified methods in `packages/tropykus/src/Market.js`

**Checkpoint**: At this point, User Story 1 should be fully functional. A developer can create a market for a 6-decimal token, perform all operations (deposit, withdraw, borrow, repay), and amounts are correctly parsed and formatted. All tests should pass.

---

## Phase 4: User Story 2 - 8-Decimal Tokens (Priority: P2)

**Goal**: Enable developers to interact with 8-decimal ERC20 tokens (like WBTC). The system should handle all operations with 8-decimal precision, ensuring accurate amount conversions and balance calculations.

**Independent Test**: Create a market for an 8-decimal token and perform the full lifecycle of operations (deposit, borrow, repay, withdraw). This delivers value by enabling support for wrapped Bitcoin and similar assets.

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T028 [P] [US2] Create integration test for 8-decimal token decimal detection in `packages/tropykus/test/02-markets.spec.js`
- [ ] T029 [P] [US2] Create integration test for 8-decimal token deposit operation (0.5 tokens → 50000000) in `packages/tropykus/test/02-markets.spec.js`
- [ ] T030 [P] [US2] Create integration test for 8-decimal token operations (deposit, withdraw, borrow, repay) with 8-decimal precision in `packages/tropykus/test/02-markets.spec.js`
- [ ] T031 [P] [US2] Create integration test for 8-decimal token USD value calculations maintaining 8-decimal precision in `packages/tropykus/test/02-markets.spec.js`

### Implementation for User Story 2

- [ ] T032 [US2] Verify 8-decimal token support works with existing decimal detection (no new code needed, should work automatically) in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T033 [US2] Add integration test validation for 8-decimal token edge cases in `packages/tropykus/test/02-markets.spec.js`

**Checkpoint**: At this point, User Story 2 should be fully functional. 8-decimal tokens work correctly with the decimal detection system. All tests should pass.

---

## Phase 5: User Story 3 - Oracle Integration with 6-Decimal Tokens (Priority: P1 Extension)

**Goal**: Enable correct USD value calculations for 6-decimal tokens using price oracle adapters. PriceOracleAdapterMoc.assetPrices() returns 1e18, PriceOracleAdapterUSDT.assetPrices() returns 1e30. The system must correctly convert between token decimals and oracle return values.

**Independent Test**: Create a market for a 6-decimal token, set up PriceOracleAdapterMoc (1e18) or PriceOracleAdapterUSDT (1e30), perform operations, and verify USD values are correctly calculated.

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T034 [P] [US3] Create integration test for PriceOracleAdapterMoc with 1e18 return value handling in `packages/tropykus/test/02-markets.spec.js`
- [ ] T035 [P] [US3] Create integration test for PriceOracleAdapterUSDT with 1e30 return value handling in `packages/tropykus/test/02-markets.spec.js`
- [ ] T036 [P] [US3] Create integration test for 6-decimal token balance query with USD value using MoC adapter (1e18) in `packages/tropykus/test/02-markets.spec.js`
- [ ] T037 [P] [US3] Create integration test for 6-decimal token balance query with USD value using USDT adapter (1e30) in `packages/tropykus/test/02-markets.spec.js`
- [ ] T038 [P] [US3] Create integration test for PriceOracleAdapterUSDT DECIMAL_MULTIPLIER (1e22) verification in `packages/tropykus/test/02-markets.spec.js`
- [ ] T039 [P] [US3] Create integration test for liquidity calculation with USDT adapter (1e30 * amount * 1e16 = 1e36) in `packages/tropykus/test/02-markets.spec.js`

### Implementation for User Story 3

- [ ] T040 [US3] Update `getUnderlyingPrice()` to use `detectOracleDecimals()` and divide by correct factor (1e30 for USDT, 1e18 for MoC) in `packages/tropykus/src/PriceOracle.js`
- [ ] T041 [US3] Modify `setAdapterToToken()` to detect and cache oracle decimals (30 for USDT, 18 for MoC) when adapter is set in `packages/tropykus/src/PriceOracle.js`
- [ ] T042 [US3] Add `getAdapterAddress(marketAddress)` helper method to PriceOracle for retrieving adapter address in `packages/tropykus/src/PriceOracle.js`
- [ ] T043 [US3] Update `balanceOfUnderlying()` to handle 6-decimal token amounts and oracle prices (1e18 for MoC, 1e30 for USDT) correctly in `packages/tropykus/src/Market.js`
- [ ] T044 [US3] Update `balanceOf()` to handle 6-decimal token amounts and oracle prices (1e18 for MoC, 1e30 for USDT) correctly in `packages/tropykus/src/Market.js`
- [ ] T045 [US3] Update USD value calculation formula to handle 6-decimal token × 1e18 oracle (MoC) conversion in `balanceOfUnderlying()` in `packages/tropykus/src/Market.js`
- [ ] T046 [US3] Update USD value calculation formula to handle 6-decimal token × 1e30 oracle (USDT) conversion in `balanceOfUnderlying()` in `packages/tropykus/src/Market.js`
- [ ] T047 [US3] Update USD value calculation formula to handle 6-decimal token × 1e18 oracle (MoC) conversion in `balanceOf()` in `packages/tropykus/src/Market.js`
- [ ] T048 [US3] Update USD value calculation formula to handle 6-decimal token × 1e30 oracle (USDT) conversion in `balanceOf()` in `packages/tropykus/src/Market.js`
- [ ] T049 [US3] Add JSDoc comments to modified methods in `packages/tropykus/src/PriceOracle.js` explaining 1e18 vs 1e30 return values

**Checkpoint**: At this point, User Story 3 should be fully functional. A developer can create a market for a 6-decimal token, set up oracle adapters (MoC or USDT), perform operations, and get correct USD values. All tests should pass.

---

## Phase 6: User Story 4 - Support All Valid Decimal Amounts (Priority: P3)

**Goal**: Enable developers to interact with ERC20 tokens that use any valid decimal amount (0-18 decimals). The system should automatically detect the decimal amount from the token contract and use it for all operations.

**Independent Test**: Create markets for tokens with various decimal amounts (0, 2, 4, 6, 8, 18) and verify that each correctly uses its specific decimal precision.

### Tests for User Story 4 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T050 [P] [US4] Create integration test for 0-decimal token (100 tokens → 100) in `packages/tropykus/test/02-markets.spec.js`
- [ ] T051 [P] [US4] Create integration test for 2-decimal token (1.23 tokens → 123) in `packages/tropykus/test/02-markets.spec.js`
- [ ] T052 [P] [US4] Create integration test for 4-decimal token operations in `packages/tropykus/test/02-markets.spec.js`
- [ ] T053 [P] [US4] Create integration test for multiple markets with different decimal amounts in same protocol instance in `packages/tropykus/test/02-markets.spec.js`

### Implementation for User Story 4

- [ ] T054 [US4] Verify all valid decimal amounts (0-18) work with existing decimal detection (no new code needed, should work automatically) in `packages/tropykus/src/Markets/CErc20.js`
- [ ] T055 [US4] Add edge case handling for 0-decimal tokens (integer-only amounts) in `packages/tropykus/src/utils/decimals.js`
- [ ] T056 [US4] Add validation for decimal amounts exceeding 18 (should support up to 255 per ERC20 standard) in `packages/tropykus/src/utils/decimals.js`

**Checkpoint**: At this point, User Story 4 should be fully functional. Tokens with any valid decimal amount (0-18) work correctly. All tests should pass.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements, edge case handling, and validation

- [ ] T057 [P] Add error handling for missing `decimals()` function with warning logging in `packages/tropykus/src/utils/decimals.js`
- [ ] T058 [P] Add error handling for invalid decimal values (>255) with fallback to 18 in `packages/tropykus/src/utils/decimals.js`
- [ ] T059 [P] Add error handling for DECIMAL_MULTIPLIER query failures in `detectOracleDecimals()` in `packages/tropykus/src/PriceOracle.js`
- [ ] T060 [P] Add backward compatibility validation: ensure 18-decimal tokens still work identically in `packages/tropykus/test/02-markets.spec.js`
- [ ] T061 [P] Add edge case test for very small amounts with high-decimal precision in `packages/tropykus/test/02-markets.spec.js`
- [ ] T062 [P] Add edge case test for oracle adapter type detection edge cases in `packages/tropykus/test/02-markets.spec.js`
- [ ] T063 [P] Add edge case test for tokens with decimals > 18 (up to 255) in `packages/tropykus/test/02-markets.spec.js`
- [ ] T064 [P] Add integration test for multiple markets with different oracle adapters in `packages/tropykus/test/02-markets.spec.js`
- [ ] T065 [P] Add integration test for oracle adapter change after market creation in `packages/tropykus/test/02-markets.spec.js`
- [ ] T066 [P] Run ESLint and fix any linting errors in modified files
- [ ] T067 [P] Run Prettier and format all modified files
- [ ] T068 [P] Verify all existing tests still pass (backward compatibility check)
- [ ] T069 [P] Update quickstart.md validation: verify test setup instructions work correctly

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion
- **User Story 2 (Phase 4)**: Depends on User Story 1 completion (uses same decimal detection)
- **User Story 3 (Phase 5)**: Depends on User Story 1 completion (uses decimal detection + adds oracle)
- **User Story 4 (Phase 6)**: Depends on User Story 1 completion (uses same decimal detection)
- **Polish (Phase 7)**: Depends on all user story phases completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on User Story 1 (uses same decimal detection infrastructure)
- **User Story 3 (P1 Extension)**: Depends on User Story 1 (adds oracle integration to 6-decimal tokens)
- **User Story 4 (P3)**: Depends on User Story 1 (uses same decimal detection infrastructure)

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Decimal utilities (T005-T008) must be complete before CErc20 modifications
- Oracle detection (T009-T012) must be complete before PriceOracle modifications
- CErc20 decimal detection (T018) must be complete before using decimals in operations
- PriceOracle modifications (T040-T042) must be complete before Market USD calculations
- Market modifications (T043-T048) depend on both token decimals and oracle decimals being available

### Parallel Opportunities

- **Setup Phase**: T002, T003, T004 can run in parallel
- **Foundational Phase**: T006, T007, T010 can run in parallel
- **User Story 1 Tests**: T013-T017 can all run in parallel (all create different test cases)
- **User Story 1 Implementation**: 
  - T019, T020, T021 can run in parallel (different methods in same file, but no dependencies)
  - T025, T026, T027 can run in parallel (JSDoc additions to different files)
- **User Story 2 Tests**: T028-T031 can run in parallel
- **User Story 3 Tests**: T034-T039 can run in parallel
- **User Story 4 Tests**: T050-T053 can run in parallel
- **Polish Phase**: T057-T069 can mostly run in parallel (different concerns)

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task T013: "Create integration test for 6-decimal token decimal detection"
Task T014: "Create integration test for 6-decimal token deposit operation"
Task T015: "Create integration test for 6-decimal token balance query"
Task T016: "Create integration test for 6-decimal token borrow operation"
Task T017: "Create integration test for 6-decimal token repay operation"

# Launch parallel implementation tasks (after dependencies met):
Task T019: "Replace parseEther() in mint() method"
Task T020: "Replace parseEther() in repayBorrow() method"
Task T021: "Replace parseEther() in transferUnderlying() method"

Task T025: "Add JSDoc to decimals.js"
Task T026: "Add JSDoc to CErc20.js"
Task T027: "Add JSDoc to Market.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 + 3)

1. Complete Phase 1: Setup (verify structure)
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
   - Decimal utilities (T005-T008)
   - Oracle adapter detection (T009-T012) - returns 30 for USDT, 18 for MoC
3. Complete Phase 3: User Story 1 (6-decimal tokens)
   - Write tests first (T013-T017) - ensure they FAIL
   - Implement decimal detection in CErc20 (T018)
   - Update CErc20 methods (T019-T023)
   - Update Market methods (T024)
   - Add documentation (T025-T027)
4. Complete Phase 5: User Story 3 (Oracle integration)
   - Write tests first (T034-T039) - ensure they FAIL
   - Update PriceOracle methods (T040-T042)
   - Update Market USD calculations (T043-T048)
   - Add documentation (T049)
5. **STOP and VALIDATE**: Run all tests, verify 6-decimal token + oracle integration works correctly
6. Complete Phase 4: User Story 2 (8-decimal tokens) - should work automatically
7. Complete Phase 6: User Story 4 (all valid decimals) - should work automatically
8. Complete Phase 7: Polish (edge cases, validation, cleanup)

### Incremental Delivery

1. **Foundation** (Phase 1 + 2): Decimal utilities + Oracle detection ready
2. **Core Functionality** (Phase 3): Decimal detection + basic operations (deposit, withdraw, borrow, repay)
3. **Oracle Integration** (Phase 5): Oracle adapter integration + USD value calculations
4. **Extended Support** (Phase 4 + 6): 8-decimal tokens and all valid decimals (should work automatically)
5. **Polish** (Phase 7): Edge cases, error handling, validation

### Parallel Team Strategy

With multiple developers:

1. **Team completes Setup + Foundational together** (Phase 1 + 2)
2. **Once Foundational is done**:
   - Developer A: Write all integration tests for US1 (T013-T017)
   - Developer B: Implement CErc20 decimal detection and methods (T018-T023)
   - Developer C: Implement PriceOracle oracle detection (T009-T012, T040-T042)
3. **After core detection is done**:
   - Developer A: Implement Market balance methods (T024, T043-T048)
   - Developer B: Add JSDoc documentation (T025-T027, T049)
   - Developer C: Work on edge cases and polish (Phase 7)

---

## Notes

- **[P] tasks** = different files or different methods, no dependencies
- **[US1] label** = task belongs to User Story 1 (6-decimal tokens)
- **[US2] label** = task belongs to User Story 2 (8-decimal tokens)
- **[US3] label** = task belongs to User Story 3 (Oracle integration)
- **[US4] label** = task belongs to User Story 4 (All valid decimals)
- **Test-First**: Write tests FIRST, ensure they FAIL before implementation
- **Backward Compatibility**: All changes must maintain 18-decimal token compatibility
- **Precision**: Use BigNumber/FixedNumber for all calculations to avoid rounding errors
- **Oracle Decimals**: PriceOracleAdapterMoc.assetPrices() returns 1e18, PriceOracleAdapterUSDT.assetPrices() returns 1e30
- **Token Decimals**: Default to 18 if `decimals()` function missing (backward compatibility)
- **Liquidity Calculations**: ComptrollerG6 uses 1e30 * amount * 1e16 = 1e36 for USDT, 1e18 * amount * 1e18 = 1e36 for standard tokens
- Commit after each logical group of tasks
- Stop at checkpoints to validate functionality independently
- Verify all existing tests still pass after each phase

---

## Task Summary

- **Total Tasks**: 69
- **Setup Phase**: 4 tasks
- **Foundational Phase**: 8 tasks (CRITICAL - blocks all user stories)
- **User Story 1**: 15 tasks (5 tests + 10 implementation)
- **User Story 2**: 5 tasks (4 tests + 1 implementation)
- **User Story 3**: 16 tasks (6 tests + 10 implementation)
- **User Story 4**: 7 tasks (4 tests + 3 implementation)
- **Polish Phase**: 14 tasks

**MVP Scope**: Phases 1-3 + 5 (User Story 1 + Oracle Integration) = 43 tasks
**Full Scope**: All phases = 69 tasks

**Independent Test Criteria**:
- **User Story 1**: Create a market for a 6-decimal token, perform deposit/withdraw/borrow/repay operations, verify correct decimal handling
- **User Story 2**: Create a market for an 8-decimal token, perform full lifecycle operations, verify 8-decimal precision
- **User Story 3**: Create a market for a 6-decimal token, set up oracle adapters (MoC 1e18 or USDT 1e30), verify correct USD value calculations
- **User Story 4**: Create markets for tokens with various decimal amounts (0, 2, 4, 6, 8, 18), verify each uses correct decimal precision
