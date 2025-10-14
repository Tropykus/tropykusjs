<!--
Sync Impact Report - Constitution v1.0.0
========================================
Version change: NEW → 1.0.0
Modified principles: N/A (initial creation)
Added sections: All (initial creation)
Removed sections: None

Templates requiring updates:
✅ plan-template.md - Constitution Check section aligns with principles
✅ spec-template.md - User scenarios and requirements align with principles
✅ tasks-template.md - Task structure supports library-first and testing principles
⚠ commands/*.md - No command files exist yet; when created, ensure generic guidance

Follow-up TODOs: None
-->

# TropykusJS Constitution

## Core Principles

### I. Library-First Development

Every feature MUST be developed as a self-contained, independently testable library module. Libraries MUST have clear purpose and boundaries - no organizational-only libraries allowed. Each module MUST expose functionality through well-defined interfaces that can be consumed independently.

**Rationale**: TropykusJS is a library consumed by external developers. Each component (Market, Comptroller, etc.) must function independently while integrating seamlessly. This enables incremental adoption and testing.

### II. Numerical Precision (NON-NEGOTIABLE)

All monetary and token calculations MUST use `ethers.FixedNumber` with format 'fixed80x18'. Floating-point arithmetic is PROHIBITED for any financial calculation. All contract values MUST be normalized by dividing by factor (1e18) after retrieval.

**Rationale**: DeFi protocols handle real value. Floating-point precision errors are unacceptable and can lead to financial loss. The blockchain uses 18-decimal fixed-point arithmetic; our library must match this exactly.

### III. Dual Provider Pattern

Every market MUST support both HTTP provider (for reads/transactions) and WebSocket provider (for event subscriptions). Provider initialization and fallback handling MUST be consistent across all market types.

**Rationale**: Real-time event monitoring is critical for DeFi applications. Separating concerns allows optimal protocol usage while maintaining backward compatibility for users who don't need events.

### IV. Test-Driven Development (NON-NEGOTIABLE)

Tests MUST be written before implementation. Red-Green-Refactor cycle strictly enforced:
1. Write tests that define expected behavior
2. Verify tests FAIL (red)
3. User/maintainer approval of test coverage
4. Implement to make tests PASS (green)
5. Refactor while keeping tests green

**Rationale**: TropykusJS interacts with immutable smart contracts controlling real assets. Bugs cannot be "patched" on-chain. Comprehensive testing before deployment is mandatory.

### V. Contract Test Coverage

Every smart contract interaction MUST have contract tests verifying:
- Correct ABI encoding/decoding
- Proper gas limit handling
- Transaction signing and broadcast
- Event parsing and filtering
- Error handling for reverts

**Rationale**: Contract interactions are the core value proposition. Each method (mint, borrow, redeem, repay) must be proven to work with actual contract ABIs before release.

### VI. Backward Compatibility & Versioning

TropykusJS follows semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Breaking API changes, removed methods, changed signatures
- **MINOR**: New features, new market types, additional methods (backward compatible)
- **PATCH**: Bug fixes, documentation, internal refactoring

Breaking changes require deprecation warnings in prior MINOR version when feasible.

**Rationale**: Developers build production DeFi applications on TropykusJS. Breaking their code without warning undermines trust. RSK deployment is live with real funds.

### VII. Simplicity & Documentation

Start simple. YAGNI (You Ain't Gonna Need It) principles apply. Every public method MUST have JSDoc comments explaining:
- Purpose and use case
- Parameter types and constraints
- Return value structure
- Example usage
- Error conditions

README MUST include runnable examples for core workflows (mint, borrow, redeem, repay).

**Rationale**: Library adoption depends on clear documentation. Complex abstractions add maintenance burden. DeFi developers need working examples, not architectural puzzles.

## Blockchain Integration Standards

### RSK Network Specificity

All network-specific logic (derivation paths, block times, gas limits) MUST be explicitly documented and configurable. Default derivation paths for RSK Mainnet (`m/44'/137'/0'/0/N`) and Testnet (`m/44'/37310'/0'/0/N`) MUST be provided as constants.

### Gas Limit Configuration

Gas limits MUST be configurable at the Tropykus instance level and overridable per transaction. Default gas limits MUST be conservative (sufficient for worst-case scenarios) but allow optimization by experienced users.

### Address Normalization

All contract addresses MUST be lowercased before comparison or storage. This prevents case-sensitivity bugs when interacting with blockchain explorers and other tools.

### Transaction Flow Consistency

ERC20 market operations (mint, repayBorrow) MUST follow approve-then-call pattern. Native RBTC operations MUST use value field in transaction options. These patterns MUST be abstracted away from users through method interfaces.

## Development Workflow

### Monorepo Management

Lerna MUST be used for package orchestration. Bootstrap, build, test, and publish operations MUST work from repository root. Individual packages MAY be tested in isolation via `cd packages/[name] && npm test`.

### Code Quality Gates

Before any commit:
- ESLint MUST pass with auto-fix enabled (`npm run lint`)
- Prettier formatting MUST be applied (`npm run format`)
- All tests MUST pass (`npm test`)

### Release Process

Version bumps MUST follow this sequence:
1. Run `npm run version-check` (validate consistency)
2. Run `lerna version --no-git-tag-version` (bump package versions)
3. Run `npm run version-update` (sync version metadata)
4. Run `npm run publish` (custom publish script)

Pre-publish and post-publish checksums MUST be generated to ensure package integrity.

## Governance

This Constitution supersedes all other development practices and guidelines. All feature specifications, implementation plans, and pull requests MUST verify compliance with these principles.

**Amendment Procedure**: Constitutional amendments require:
1. Documented justification for change
2. Impact analysis on existing codebase
3. Migration plan for affected code
4. Version bump (MAJOR for breaking governance changes, MINOR for additive, PATCH for clarifications)
5. Update to all dependent templates and documentation

**Compliance Review**: Every `/speckit.plan` execution MUST include a Constitution Check section validating that proposed design adheres to all principles. Violations MUST be explicitly justified in the Complexity Tracking section.

**Runtime Guidance**: Development practices not rising to constitutional level SHOULD be documented in `CLAUDE.md` (agent-specific guidance) or project `README.md` (general development guide).

**Version**: 1.0.0 | **Ratified**: 2025-10-14 | **Last Amended**: 2025-10-14
