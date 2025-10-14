# Tasks: Multi-Decimal Token Support

**Input**: Design documents from `/specs/001-support-multi-decimal/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Per TropykusJS Constitution Principle IV (Test-Driven Development - NON-NEGOTIABLE), tests MUST be written before implementation. Red-Green-Refactor cycle strictly enforced.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- Lerna monorepo: `packages/tropykus/src/` for source code
- Tests: `packages/tropykus/test/`
- All paths relative to repository root

## Phase 1: Setup (Project Infrastructure)

**Purpose**: Project initialization and dependency verification

- [ ] T001 Verify Lerna monorepo structure and dependencies in package.json
- [ ] T002 [P] Run `npm run bootstrap` to ensure all packages linked correctly
- [ ] T003 [P] Run existing test suite to establish baseline (`npm test`)
- [ ] T004 [P] Document current test coverage for Market.js, CErc20.js, CRBTC.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core decimal infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Add decimal validation helper function in packages/tropykus/src/Market.js
- [ ] T006 [P] Update Market constructor to accept tokenDecimals and oracleDecimals parameters in packages/tropykus/src/Market.js
- [ ] T007 [P] Compute and store tokenFactor as FixedNumber in Market constructor in packages/tropykus/src/Market.js
- [ ] T008 [P] Compute and store oracleFactor as FixedNumber in Market constructor in packages/tropykus/src/Market.js
- [ ] T009 Add decimal validation with error throwing for invalid ranges (0-18) in Market constructor in packages/tropykus/src/Market.js
- [ ] T010 Update index.js addMarket() method to pass tokenDecimals and oracleDecimals from args to Market constructors in packages/tropykus/src/index.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add 6-Decimal Token Market (Priority: P1) 🎯 MVP

**Goal**: Enable developers to add USDT (6-decimal) markets and execute mint/borrow/redeem/repay operations with correct precision

**Independent Test**: Can be fully tested by adding a 6-decimal token market and verifying all four operations work correctly with proper decimal handling

### Tests for User Story 1 (TDD - MUST WRITE FIRST) ⚠️

**NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] Write unit test for decimal factor computation (0, 6, 8, 18 decimals) in packages/tropykus/test/02-markets.spec.js
- [ ] T012 [P] [US1] Write contract test for minting 100 units of 6-decimal token in packages/tropykus/test/02-markets.spec.js
- [ ] T013 [P] [US1] Write contract test for borrowing from 6-decimal market in packages/tropykus/test/02-markets.spec.js
- [ ] T014 [P] [US1] Write contract test for redeeming from 6-decimal market in packages/tropykus/test/02-markets.spec.js
- [ ] T015 [P] [US1] Write contract test for repaying to 6-decimal market in packages/tropykus/test/02-markets.spec.js
- [ ] T016 [P] [US1] Write contract test for maxValue=true redeem with 6-decimal token in packages/tropykus/test/02-markets.spec.js
- [ ] T017 [P] [US1] Write contract test for maxValue=true repayBorrow with 6-decimal token in packages/tropykus/test/02-markets.spec.js

**Verify all tests FAIL (red state) before proceeding to implementation**

### Implementation for User Story 1

- [ ] T018 [US1] Replace parseEther with parseUnits in CErc20.mint() method in packages/tropykus/src/Markets/CErc20.js
- [ ] T019 [US1] Replace parseEther with parseUnits in CErc20.repayBorrow() method including maxValue handling in packages/tropykus/src/Markets/CErc20.js
- [ ] T020 [US1] Update CErc20.balanceOfUnderlyingInWallet() to use tokenFactor instead of hardcoded 1e18 in packages/tropykus/src/Markets/CErc20.js
- [ ] T021 [US1] Replace parseEther with parseUnits in CRBTC.mint() method in packages/tropykus/src/Markets/CRBTC.js
- [ ] T022 [US1] Replace parseEther with parseUnits in CRBTC.repayBorrow() method including maxValue handling in packages/tropykus/src/Markets/CRBTC.js
- [ ] T023 [US1] Update Market.balanceOfUnderlying() to use tokenFactor for mantissa conversion in packages/tropykus/src/Market.js
- [ ] T024 [US1] Update Market.borrowBalanceCurrent() to use tokenFactor for mantissa conversion in packages/tropykus/src/Market.js
- [ ] T025 [US1] Update Market.balanceOf() to use tokenFactor for kToken balance calculation in packages/tropykus/src/Market.js
- [ ] T026 [US1] Update Market.borrow() to use parseUnits instead of parseEther in packages/tropykus/src/Market.js
- [ ] T027 [US1] Update Market.redeem() to use parseUnits for redeemUnderlying amount in packages/tropykus/src/Market.js
- [ ] T028 [US1] Update Market.getCash() to use tokenFactor for mantissa conversion in packages/tropykus/src/Market.js
- [ ] T029 [US1] Update Market.getReserves() to use tokenFactor for mantissa conversion in packages/tropykus/src/Market.js
- [ ] T030 [US1] Update Market.getMarketTotalBorrows() to use tokenFactor for mantissa conversion in packages/tropykus/src/Market.js
- [ ] T031 [US1] Update Market.getMarketTotalSupply() to use tokenFactor for mantissa conversion in packages/tropykus/src/Market.js
- [ ] T032 [US1] Update Market.getTokensFromUnderlying() to use parseUnits instead of parseEther in packages/tropykus/src/Market.js
- [ ] T033 [US1] Run all User Story 1 tests and verify they PASS (green state)
- [ ] T034 [US1] Add JSDoc comments for tokenDecimals and oracleDecimals parameters in packages/tropykus/src/Market.js

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently with 6-decimal tokens

---

## Phase 4: User Story 2 - Configure Custom Oracle Decimals (Priority: P2)

**Goal**: Enable protocol administrators to configure markets with 8-decimal oracle prices (Chainlink-style) and ensure USD calculations are accurate

**Independent Test**: Can be tested by configuring a market with oracleDecimals=8 and verifying USD value calculations across all balance methods

### Tests for User Story 2 (TDD - MUST WRITE FIRST) ⚠️

- [ ] T035 [P] [US2] Write contract test for USD value calculation with 8-decimal oracle price in packages/tropykus/test/02-markets.spec.js
- [ ] T036 [P] [US2] Write contract test for balanceOfUnderlying USD value with custom oracle decimals in packages/tropykus/test/02-markets.spec.js
- [ ] T037 [P] [US2] Write contract test for borrowBalanceCurrent USD value with custom oracle decimals in packages/tropykus/test/02-markets.spec.js

**Verify all tests FAIL (red state) before proceeding to implementation**

### Implementation for User Story 2

- [ ] T038 [US2] Update Market.balanceOfUnderlying() to use oracleFactor for price normalization in packages/tropykus/src/Market.js
- [ ] T039 [US2] Update Market.borrowBalanceCurrent() to use oracleFactor for price normalization in packages/tropykus/src/Market.js
- [ ] T040 [US2] Update Market.balanceOf() to use oracleFactor for USD calculation in packages/tropykus/src/Market.js
- [ ] T041 [US2] Update Market.balanceOfUnderlyingInWallet() to use oracleFactor for USD calculation in packages/tropykus/src/Market.js
- [ ] T042 [US2] Update Market.getCash() to use oracleFactor for price normalization in packages/tropykus/src/Market.js
- [ ] T043 [US2] Update Market.getReserves() to use oracleFactor for price normalization in packages/tropykus/src/Market.js
- [ ] T044 [US2] Update Market.getMarketTotalBorrows() to use oracleFactor for USD calculation in packages/tropykus/src/Market.js
- [ ] T045 [US2] Update Market.getMarketTotalSupply() to use oracleFactor for USD calculation in packages/tropykus/src/Market.js
- [ ] T046 [US2] Update Market.maxAllowedToWithdraw() to use oracleFactor for liquidity USD calculations in packages/tropykus/src/Market.js
- [ ] T047 [US2] Update Market.maxAllowedToDeposit() to use oracleFactor for USD calculation in packages/tropykus/src/Market.js
- [ ] T048 [US2] Update CErc20.balanceOfUnderlyingInWallet() to use oracleFactor for price normalization in packages/tropykus/src/Markets/CErc20.js
- [ ] T049 [US2] Run all User Story 2 tests and verify they PASS (green state)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently with any decimal combination

---

## Phase 5: User Story 3 - Maintain Backward Compatibility (Priority: P3)

**Goal**: Ensure existing integrations using 18-decimal tokens continue to work without any code changes

**Independent Test**: Can be tested by running existing test suite without modifications and verifying all tests pass with identical behavior

### Tests for User Story 3 (Validation Tests) ⚠️

- [ ] T050 [P] [US3] Run existing 00-tropykus.spec.js test suite and verify all tests pass unchanged in packages/tropykus/test/00-tropykus.spec.js
- [ ] T051 [P] [US3] Run existing 01-comptroller.spec.js test suite and verify all tests pass unchanged in packages/tropykus/test/01-comptroller.spec.js
- [ ] T052 [P] [US3] Run existing 02-markets.spec.js test suite and verify all tests pass unchanged in packages/tropykus/test/02-markets.spec.js
- [ ] T053 [P] [US3] Run existing 03-unitroller.spec.js test suite and verify all tests pass unchanged in packages/tropykus/test/03-unitroller.spec.js

### Implementation for User Story 3

- [ ] T054 [US3] Verify Market constructor defaults tokenDecimals to 18 when not provided in packages/tropykus/src/Market.js
- [ ] T055 [US3] Verify Market constructor defaults oracleDecimals to 18 when not provided in packages/tropykus/src/Market.js
- [ ] T056 [US3] Test addMarket() without decimal args produces 18-decimal market behavior in packages/tropykus/test/00-tropykus.spec.js
- [ ] T057 [US3] Compare numerical output of 18-decimal market operations before and after refactor in packages/tropykus/test/02-markets.spec.js
- [ ] T058 [US3] Verify FixedNumber precision matches previous behavior for 18-decimal tokens in packages/tropykus/test/02-markets.spec.js

**Checkpoint**: All user stories should now be independently functional with full backward compatibility

---

## Phase 6: Multi-Market Aggregation (Cross-Story Integration)

**Purpose**: Ensure Comptroller correctly aggregates balances across markets with different decimal configurations

**Tests** (TDD - MUST WRITE FIRST):

- [ ] T059 [P] Write contract test for getTotalSupplyInAllMarkets with mixed decimals (6 + 18) in packages/tropykus/test/01-comptroller.spec.js
- [ ] T060 [P] Write contract test for getTotalBorrowsInAllMarkets with mixed decimals (6 + 18) in packages/tropykus/test/01-comptroller.spec.js
- [ ] T061 [P] Write contract test for getAccountLiquidity with multi-decimal markets in packages/tropykus/test/01-comptroller.spec.js

**Verify all tests FAIL (red state) before proceeding**

### Implementation:

- [ ] T062 Verify Comptroller.getTotalSupplyInAllMarkets() correctly sums USD values from multi-decimal markets in packages/tropykus/src/Comptroller.js
- [ ] T063 Verify Comptroller.getTotalBorrowsInAllMarkets() correctly sums USD values from multi-decimal markets in packages/tropykus/src/Comptroller.js
- [ ] T064 Verify Comptroller.getAccountLiquidity() handles multi-decimal market aggregation in packages/tropykus/src/Comptroller.js
- [ ] T065 Run all Comptroller multi-decimal tests and verify they PASS (green state)

---

## Phase 7: Event Parsing & Historical Queries

**Purpose**: Ensure historical event queries account for market-specific decimals

**Tests** (TDD - MUST WRITE FIRST):

- [ ] T066 [P] Write contract test for suppliedLast24Hours() with 6-decimal token events in packages/tropykus/test/02-markets.spec.js
- [ ] T067 [P] Write contract test for borrowedLast24Hours() with 6-decimal token events in packages/tropykus/test/02-markets.spec.js

**Verify tests FAIL before implementation**

### Implementation:

- [ ] T068 Update Market.suppliedLast24Hours() to use tokenFactor for event amount parsing in packages/tropykus/src/Market.js
- [ ] T069 Update Market.borrowedLast24Hours() to use tokenFactor for event amount parsing in packages/tropykus/src/Market.js
- [ ] T070 Update Market.getEarnings() to use tokenFactor for earnings calculation in packages/tropykus/src/Market.js
- [ ] T071 Run all event parsing tests and verify they PASS (green state)

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, code quality, and final validations

- [ ] T072 [P] Update JSDoc comments for addMarket() with tokenDecimals and oracleDecimals params in packages/tropykus/src/index.js
- [ ] T073 [P] Add JSDoc examples showing 6-decimal USDT usage in packages/tropykus/src/index.js
- [ ] T074 [P] Update README.md with multi-decimal token examples (mint/borrow/redeem/repay)
- [ ] T075 [P] Add README.md migration guide for upgrading from 0.2.x to 0.3.0
- [ ] T076 Run `npm run lint` and fix any ESLint errors
- [ ] T077 Run `npm run format` to apply Prettier formatting
- [ ] T078 Run full test suite (`npm test`) and verify 100% pass rate
- [ ] T079 Generate test coverage report with nyc and verify >80% coverage for modified files
- [ ] T080 Update CHANGELOG.md with feature description and breaking changes (if any)
- [ ] T081 Run quickstart.md validation by executing documented examples

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Multi-Market Aggregation (Phase 6)**: Depends on US1 and US2 being complete (needs multi-decimal markets)
- **Event Parsing (Phase 7)**: Depends on US1 being complete (needs tokenFactor)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Technically independent but builds on US1 concepts
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Validates US1 and US2 don't break existing behavior

### Within Each User Story

- Tests (TDD) MUST be written and FAIL before implementation
- Test tasks within a story marked [P] can run in parallel
- Implementation tasks must follow test completion
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All test tasks for a user story marked [P] can run in parallel
- Implementation tasks within a story can sometimes run in parallel (when marked [P])

---

## Parallel Example: User Story 1 Tests

```bash
# Launch all tests for User Story 1 together (TDD phase):
Task T011: "Write unit test for decimal factor computation"
Task T012: "Write contract test for minting 100 units of 6-decimal token"
Task T013: "Write contract test for borrowing from 6-decimal market"
Task T014: "Write contract test for redeeming from 6-decimal market"
Task T015: "Write contract test for repaying to 6-decimal market"
Task T016: "Write contract test for maxValue=true redeem"
Task T017: "Write contract test for maxValue=true repayBorrow"

# All 7 test tasks can be written concurrently
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (tests → implementation)
4. **STOP and VALIDATE**: Test User Story 1 independently with 6-decimal token
5. Deploy/demo if ready (functional 6-decimal support)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP - 6-decimal tokens work!)
3. Add User Story 2 → Test independently → Deploy/Demo (Oracle decimals work!)
4. Add User Story 3 → Test independently → Deploy/Demo (Backward compat verified!)
5. Add Phase 6 → Multi-market aggregation tested
6. Add Phase 7 → Event parsing tested
7. Add Phase 8 → Documentation and polish
8. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (6-decimal tokens)
   - Developer B: User Story 2 (oracle decimals)
   - Developer C: User Story 3 (backward compat validation)
3. Stories complete and integrate independently
4. Final integration testing for multi-market scenarios

---

## Test-Driven Development (TDD) Enforcement

**CRITICAL**: Per TropykusJS Constitution Principle IV (NON-NEGOTIABLE):

1. **Red Phase**: Write all test tasks for a story FIRST
2. **Verify Red**: Run tests and confirm they FAIL (red state)
3. **User Approval**: Get maintainer approval of test coverage before implementing
4. **Green Phase**: Implement functionality to make tests PASS (green state)
5. **Refactor Phase**: Clean up code while keeping tests green

**Test Task IDs**:
- US1 Tests: T011-T017 (7 tests)
- US2 Tests: T035-T037 (3 tests)
- US3 Tests: T050-T053 (4 validation tests)
- Multi-Market Tests: T059-T061 (3 tests)
- Event Parsing Tests: T066-T067 (2 tests)

**Total Test Tasks**: 19 tests
**Total Implementation Tasks**: 62 tasks (including setup, foundational, implementation, documentation)
**Grand Total**: 81 tasks

---

## Notes

- [P] tasks = different files, no dependencies, can run concurrently
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- **TDD REQUIRED**: Verify tests fail before implementing (Constitution Principle IV)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- **Testing Framework**: Mocha + Chai + Sinon (contract mocking)
- **Precision Format**: FixedNumber 'fixed80x18' throughout (Constitution Principle II)
- **Backward Compat**: Default to 18 decimals (Constitution Principle VI)
