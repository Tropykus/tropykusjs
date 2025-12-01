<!--
Sync Impact Report:
Version change: N/A → 1.0.0 (initial constitution)
Modified principles: N/A (initial creation)
Added sections: Core Principles, SDK Design Standards, Development Workflow, Governance
Removed sections: N/A
Templates requiring updates:
  ✅ .specify/templates/plan-template.md (Constitution Check section compatible)
  ✅ .specify/templates/spec-template.md (compatible with principles)
  ✅ .specify/templates/tasks-template.md (compatible with testing principles)
  ✅ .specify/templates/checklist-template.md (compatible)
Follow-up TODOs: None
-->

# Tropykus JS SDK Constitution

## Core Principles

### I. SDK-First Design
Every feature MUST be designed as a clean, reusable SDK interface. The SDK MUST provide a consistent, intuitive API that abstracts blockchain complexity while maintaining transparency. All public methods MUST be well-documented with JSDoc comments. The SDK MUST handle errors gracefully and provide meaningful error messages. Internal implementation details MUST be encapsulated; only public APIs are exposed.

**Rationale**: As a library consumed by external developers, the SDK must prioritize developer experience, reliability, and maintainability over internal convenience.

### II. Blockchain Safety & Transaction Integrity (NON-NEGOTIABLE)
All blockchain interactions MUST include proper error handling and transaction validation. Transaction methods MUST support both synchronous and asynchronous patterns via Promises. All transaction methods MUST return transaction objects that can be awaited. Critical operations (mint, borrow, redeem, repay) MUST validate inputs before submission. The SDK MUST never expose private keys or mnemonics in logs or errors.

**Rationale**: Financial operations require absolute reliability. Transaction failures must be handled gracefully, and security must never be compromised.

### III. Test-First Development (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement. Red-Green-Refactor cycle strictly enforced. All new features MUST include corresponding tests. Integration tests MUST cover real blockchain interactions (using testnet/local node). Unit tests MUST cover all public methods and edge cases. Test coverage MUST be maintained above 80% for critical paths.

**Rationale**: Given the financial nature of the protocol, bugs can have severe consequences. Comprehensive testing is essential for reliability and confidence.

### IV. Integration Testing for Blockchain Interactions
Focus areas requiring integration tests: New market contract interactions, Contract method changes, Multi-contract operations (e.g., comptroller + market), Price oracle interactions, Account management and signing. Integration tests MUST use a local blockchain node or testnet. Integration tests MUST be isolated and not depend on external state.

**Rationale**: Blockchain interactions are complex and stateful. Integration tests catch issues that unit tests cannot, especially around contract interactions and transaction sequencing.

### V. Semantic Versioning & Breaking Changes
Version format: MAJOR.MINOR.PATCH (semantic versioning). MAJOR version increments for breaking API changes. MINOR version increments for new features (backward compatible). PATCH version increments for bug fixes. Breaking changes MUST be documented in CHANGELOG.md with migration guides. Deprecated methods MUST be marked with @deprecated JSDoc tag and removed only in MAJOR versions.

**Rationale**: As an npm package, consumers depend on stable APIs. Clear versioning prevents breaking changes from disrupting users.

### VI. Code Quality & Consistency
All code MUST pass ESLint checks with zero errors. All code MUST be formatted with Prettier. Code reviews MUST verify constitution compliance. Complex logic MUST include inline comments explaining the "why", not just the "what". Functions MUST be single-purpose and well-named.

**Rationale**: Consistent code quality reduces bugs, improves maintainability, and makes onboarding easier for new contributors.

### VII. Documentation & Examples
All public methods MUST have JSDoc comments with parameter descriptions, return types, and examples. README.md MUST include working code examples for all major operations. Complex features MUST include detailed usage examples. Error scenarios MUST be documented with example error messages.

**Rationale**: Good documentation reduces support burden and enables developers to use the SDK effectively without reading source code.

## SDK Design Standards

### API Consistency
Market operations (mint, borrow, redeem, repay) MUST follow consistent patterns across all market types (CRBTC, CErc20Immutable, CRDOC). Account management MUST use a single, consistent interface. Error handling MUST use consistent error types and messages. All async operations MUST return Promises.

### Ethers.js Integration
The SDK MUST use Ethers.js v5.x for blockchain interactions. Contract instances MUST be properly typed and validated. Provider management MUST support both JSON-RPC and WebSocket providers. The SDK MUST handle provider failures gracefully with retry logic where appropriate.

### Market Abstraction
All market types MUST implement a common Market interface. Market-specific implementations MUST extend the base Market class. Market operations MUST abstract away contract-specific details while preserving necessary flexibility.

## Development Workflow

### Pre-Commit Requirements
All code MUST pass linting (`npm run lint`). All code MUST be formatted (`npm run format`). All tests MUST pass (`npm test`). No console.log statements in production code (use proper logging if needed).

### Code Review Process
All PRs MUST be reviewed by at least one maintainer. Reviews MUST verify constitution compliance. Reviews MUST check test coverage for new features. Reviews MUST verify documentation is updated.

### Release Process
Version bumps MUST follow semantic versioning rules. CHANGELOG.md MUST be updated with all changes. Release notes MUST highlight breaking changes prominently. All tests MUST pass before release. Build MUST succeed before publishing to npm.

## Governance

This constitution supersedes all other development practices and guidelines. Amendments to this constitution require:

1. Documentation of the proposed change and rationale
2. Review and approval by project maintainers
3. Update of version number according to semantic versioning:
   - MAJOR: Backward incompatible governance/principle removals or redefinitions
   - MINOR: New principle/section added or materially expanded guidance
   - PATCH: Clarifications, wording, typo fixes, non-semantic refinements
4. Propagation of changes to all dependent templates and documentation
5. Update of LAST_AMENDED_DATE

All PRs and code reviews MUST verify compliance with this constitution. Complexity beyond these principles MUST be justified with clear rationale. Violations of NON-NEGOTIABLE principles MUST be addressed before merge.

**Version**: 1.0.0 | **Ratified**: 2025-12-01 | **Last Amended**: 2025-12-01
