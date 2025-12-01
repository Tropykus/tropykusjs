# Tasks: Deprecate Delisted Markets

**Input**: Design documents from `/specs/001-deprecate-delisted-markets/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included per constitution requirement (Test-First Development - NON-NEGOTIABLE)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single package**: `packages/tropykus/src/`, `packages/tropykus/test/` at package root
- Paths shown below use the actual project structure from plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create utils directory structure in packages/tropykus/src/utils/
- [X] T002 [P] Verify existing project structure matches plan.md requirements

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Create deprecation configuration file packages/tropykus/src/deprecation-config.js with DEPRECATED_MARKETS.addresses mapping deprecated market addresses to metadata
- [X] T004 [P] Create deprecation utility functions in packages/tropykus/src/utils/deprecation.js with getDeprecationMetadata(address), warnDeprecated(marketName, metadata), and warnDeprecatedOnce(marketAddress, marketName, metadata)
- [X] T005 [P] Export deprecation utilities from packages/tropykus/src/utils/deprecation.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Developer Encounters Deprecation Warning (Priority: P1) 🎯 MVP

**Goal**: Developers receive clear deprecation warnings when interacting with deprecated markets, displayed once per instance on first instantiation

**Independent Test**: Can be fully tested by attempting to create or interact with a deprecated market instance and verifying that deprecation warnings are displayed in console output, logs, or returned error messages. Warning should appear only once per instance.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T006 [P] [US1] Create integration test for deprecated market warning display in packages/tropykus/test/deprecation.spec.js
- [X] T007 [P] [US1] Create unit test for getDeprecationMetadata function in packages/tropykus/test/utils/deprecation.spec.js
- [X] T008 [P] [US1] Create unit test for warnDeprecatedOnce function caching behavior in packages/tropykus/test/utils/deprecation.spec.js

### Implementation for User Story 1

- [X] T009 [US1] Update Tropykus.addMarket() method in packages/tropykus/src/index.js to check address deprecation and display warning once per instance
- [X] T010 [US1] Update Market constructor in packages/tropykus/src/Market.js to check deprecation and display warning once per instance
- [X] T011 [US1] Update CRBTC constructor in packages/tropykus/src/Markets/CRBTC.js to check deprecation by address and display warning once per instance
- [X] T012 [US1] Update CRDOC constructor in packages/tropykus/src/Markets/CRDOC.js to check deprecation by address and display warning once per instance
- [X] T013 [US1] Update CToken constructor in packages/tropykus/src/Markets/CToken.js to check deprecation by address and display warning once per instance
- [X] T014 [US1] Update CErc20 constructor in packages/tropykus/src/Markets/CErc20.js to check deprecation by address and display warning once per instance
- [X] T015 [US1] Verify deprecation warnings are displayed exactly once per market instance (not on subsequent method calls)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Developers will see deprecation warnings when creating deprecated market instances.

---

## Phase 4: User Story 2 - Documentation Reflects Deprecation Status (Priority: P2)

**Goal**: All documentation clearly marks deprecated markets with deprecation notices explaining why they are deprecated

**Independent Test**: Can be fully tested by reviewing all documentation files and verifying that deprecated markets are clearly marked with deprecation notices explaining why they are deprecated.

### Tests for User Story 2 ⚠️

- [ ] T016 [P] [US2] Create test to verify README.md contains deprecation notices for all deprecated markets in packages/tropykus/test/documentation.spec.js

### Implementation for User Story 2

- [ ] T017 [US2] Update README.md to mark kSAT/cSAT market with deprecation notice in network table section
- [ ] T018 [US2] Update README.md to mark kRDOC/cRDOC market with deprecation notice in network table section
- [ ] T019 [US2] Update README.md to mark kRIF market with deprecation notice in network table section
- [ ] T020 [US2] Update README.md to mark kUSDT market with deprecation notice in network table section
- [ ] T021 [US2] Update README.md code examples to use supported markets or include deprecation warnings for deprecated markets
- [ ] T022 [US2] Add deprecation notices to all README.md sections that reference deprecated markets (minting, borrowing, redeeming examples)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Documentation clearly marks all deprecated markets.

---

## Phase 5: User Story 3 - Code Maintainability Through Deprecation Markers (Priority: P3)

**Goal**: Code maintainers can easily identify deprecated market-related code through standardized @deprecated JSDoc tags

**Independent Test**: Can be fully tested by searching codebase for deprecated market references and verifying that all relevant classes, methods, and constants are marked with @deprecated JSDoc tags or equivalent deprecation markers.

### Tests for User Story 3 ⚠️

- [ ] T023 [P] [US3] Create test to verify deprecation comments are present in code in packages/tropykus/test/documentation.spec.js

### Implementation for User Story 3

- [ ] T024 [US3] Add JSDoc comments to deprecation utility functions in packages/tropykus/src/utils/deprecation.js explaining address-based deprecation approach
- [ ] T025 [US3] Add deprecation comments to deprecation configuration file in packages/tropykus/src/deprecation-config.js explaining which addresses are deprecated and why
- [ ] T026 [US3] Add inline comments in Market constructor in packages/tropykus/src/Market.js explaining deprecation check logic
- [ ] T027 [US3] Add inline comments in Tropykus.addMarket() method in packages/tropykus/src/index.js explaining deprecation check logic
- [ ] T028 [US3] Verify all deprecated market references in test files include deprecation comments in packages/tropykus/test/02-markets.spec.js

**Checkpoint**: All user stories should now be independently functional. Code maintainers can identify deprecated code through JSDoc tags and comments.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T029 [P] Run ESLint on all modified files to ensure code quality standards
- [ ] T030 [P] Run Prettier on all modified files to ensure formatting consistency
- [ ] T031 [P] Run full test suite to verify no regressions in packages/tropykus/test/
- [ ] T032 Verify all deprecation warnings display correctly in console output
- [ ] T033 Verify backward compatibility - all deprecated markets remain fully functional
- [ ] T034 Update CHANGELOG.md with deprecation information
- [ ] T035 Run quickstart.md validation to ensure implementation matches guide

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1, focuses on documentation
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2, focuses on code markers

### Within Each User Story

- Tests (included per constitution) MUST be written and FAIL before implementation
- Configuration/utilities before market class updates
- Market class updates before integration
- Core implementation before verification
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Market class updates within a story marked [P] can run in parallel (different files)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Create integration test for deprecated market warning display in packages/tropykus/test/deprecation.spec.js"
Task: "Create unit test for getDeprecationMetadata function in packages/tropykus/test/utils/deprecation.spec.js"
Task: "Create unit test for warnDeprecatedOnce function caching behavior in packages/tropykus/test/utils/deprecation.spec.js"

# Launch all market class updates for User Story 1 together (after tests):
Task: "Update CRBTC constructor in packages/tropykus/src/Markets/CRBTC.js"
Task: "Update CRDOC constructor in packages/tropykus/src/Markets/CRDOC.js"
Task: "Update CToken constructor in packages/tropykus/src/Markets/CToken.js"
Task: "Update CErc20 constructor in packages/tropykus/src/Markets/CErc20.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently - verify warnings display correctly
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP! - developers see warnings)
3. Add User Story 2 → Test independently → Deploy/Demo (documentation updated)
4. Add User Story 3 → Test independently → Deploy/Demo (code markers added)
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (runtime warnings)
   - Developer B: User Story 2 (documentation)
   - Developer C: User Story 3 (code markers)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Deprecation is address-based, not artifact-based (same artifact can be used for listed and deprecated markets)
- Warnings must display exactly once per market instance (on first instantiation only)
- All deprecated markets must remain fully functional (backward compatibility)

