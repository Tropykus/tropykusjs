# Feature Specification: Deprecate Delisted Markets

**Feature Branch**: `001-deprecate-delisted-markets`  
**Created**: 2025-12-01  
**Status**: Draft  
**Input**: User description: "Deprecate delisted markets both in code and in documentation"

## Clarifications

### Session 2025-12-01

- Q: Which specific markets are delisted and require deprecation? → A: Markets not in the current listed set (kDOC, kRBPRO, kRBTC, kUSDRF) are deprecated. Specifically: kSAT/cSAT, kRDOC/cRDOC, kRIF, kUSDT, and any other markets not in the listed set. Note: prefix "c" or "k" refers to the same market (e.g., cSAT = kSAT, cRDOC = kRDOC).
- Q: How frequently should deprecation warnings be displayed? → A: Once per market instance (on first instantiation only)
- Q: What migration alternatives should be recommended for deprecated markets? → A: No specific alternatives - just state markets are deprecated
- Q: Should deprecation markers include a removal timeline or date? → A: Not required - only deprecation reason needed

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Encounters Deprecation Warning (Priority: P1)

A developer using the SDK attempts to interact with a delisted market. The SDK provides clear deprecation warnings indicating that the market is no longer actively supported, while still allowing existing functionality to work for backward compatibility.

**Why this priority**: This is the primary mechanism for communicating deprecation to developers. Without clear warnings, developers may continue using deprecated markets unknowingly, leading to potential issues and confusion.

**Independent Test**: Can be fully tested by attempting to create or interact with a deprecated market instance and verifying that deprecation warnings are displayed in console output, logs, or returned error messages.

**Acceptance Scenarios**:

1. **Given** a developer attempts to add a delisted market using `tropykus.addMarket()` with a deprecated market artifact, **When** the market instance is created, **Then** a deprecation warning is logged or returned indicating the market is deprecated (displayed once per instance)
2. **Given** a developer calls a method on a deprecated market instance that was already instantiated, **When** the method executes, **Then** no additional deprecation warning is displayed (warning was shown only on instantiation)
3. **Given** a developer reads JSDoc documentation for deprecated market classes or methods, **When** they view the documentation, **Then** they see clear @deprecated tags with deprecation reason (no specific alternatives required)

---

### User Story 2 - Documentation Reflects Deprecation Status (Priority: P2)

A developer or user reading the SDK documentation (README.md, API docs, examples) can clearly identify which markets are deprecated and understand why they should avoid using them.

**Why this priority**: Documentation is often the first point of contact for developers. Clear deprecation notices in documentation prevent new adoption of deprecated markets and guide developers toward supported alternatives.

**Independent Test**: Can be fully tested by reviewing all documentation files and verifying that deprecated markets are clearly marked with deprecation notices explaining why they are deprecated.

**Acceptance Scenarios**:

1. **Given** a developer reads the README.md file, **When** they view market examples or network tables, **Then** deprecated markets are clearly marked with deprecation notices
2. **Given** a developer searches for a deprecated market in documentation, **When** they find references to it, **Then** all references include deprecation warnings explaining the market is deprecated
3. **Given** a developer views code examples in documentation, **When** examples use deprecated markets, **Then** the examples are updated to use supported markets or include deprecation warnings

---

### User Story 3 - Code Maintainability Through Deprecation Markers (Priority: P3)

Code maintainers and contributors can easily identify deprecated market-related code through standardized deprecation markers, making it clear what code should eventually be removed.

**Why this priority**: Clear deprecation markers in code help maintainers understand technical debt and plan for future removal. This supports long-term code health and reduces confusion during maintenance.

**Independent Test**: Can be fully tested by searching codebase for deprecated market references and verifying that all relevant classes, methods, and constants are marked with @deprecated JSDoc tags or equivalent deprecation markers.

**Acceptance Scenarios**:

1. **Given** a code maintainer reviews market-related source files, **When** they examine deprecated market classes, **Then** all classes are marked with @deprecated JSDoc tags including deprecation reason (removal timeline not required)
2. **Given** a code maintainer searches for deprecated market artifacts or constants, **When** they find references, **Then** all references include deprecation comments explaining why they are deprecated
3. **Given** automated tooling scans the codebase for deprecated code, **When** it encounters deprecated market markers, **Then** it can reliably identify and report them for future removal planning

---

### Edge Cases

- What happens when a developer uses a deprecated market that still has active users with funds? (Deprecation should not break existing functionality - markets should remain functional but marked as deprecated)
- How does the system handle deprecated markets in test files? (Test files should be updated to use supported markets or clearly document that they test deprecated functionality)
- What if a market is re-listed after being deprecated? (Deprecation markers should be removed and documentation updated to reflect active status)
- How are deprecated markets handled in automated documentation generation? (JSDoc @deprecated tags should automatically appear in generated API documentation)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST identify all delisted markets that require deprecation. Deprecated markets include: kSAT/cSAT, kRDOC/cRDOC, kRIF, kUSDT, and any market not in the currently listed set (kDOC, kRBPRO, kRBTC, kUSDRF). Note: prefix "c" or "k" refers to the same market.
- **FR-002**: System MUST mark all deprecated market classes with @deprecated JSDoc tags including deprecation reason (no specific alternatives required)
- **FR-003**: System MUST display deprecation warnings once per market instance (on first instantiation only). Warnings must not be displayed on subsequent method calls to the same instance.
- **FR-004**: System MUST update README.md to clearly mark deprecated markets in all relevant sections (examples, network tables, usage instructions)
- **FR-005**: System MUST ensure deprecated markets remain functionally operational for backward compatibility (deprecation is informational, not breaking)
- **FR-006**: System MUST provide migration guidance in documentation explaining why markets are deprecated. No specific alternative markets need to be recommended - simply state that the market is deprecated.
- **FR-007**: System MUST mark deprecated market artifacts, constants, and related code with deprecation comments or tags
- **FR-008**: System MUST update all code examples in documentation to use supported markets or include deprecation warnings if using deprecated markets

### Key Entities *(include if feature involves data)*

- **Delisted Market**: A market that has been removed from active listing in the Tropykus protocol but may still exist on-chain. Currently deprecated markets include: kSAT/cSAT, kRDOC/cRDOC, kRIF, kUSDT, and any market not in the listed set (kDOC, kRBPRO, kRBTC, kUSDRF). Key attributes: market address, artifact type (note: "c" and "k" prefixes refer to the same market), delisting date, reason for delisting, recommended alternative (if any)
- **Deprecation Marker**: A code annotation or documentation element that indicates deprecated status. Key attributes: deprecation reason (required), deprecation date (optional), removal timeline (optional, not required)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of deprecated market classes and public methods include @deprecated JSDoc tags with deprecation reason
- **SC-002**: 100% of documentation references to deprecated markets include visible deprecation notices
- **SC-003**: Developers receive deprecation warnings within 5 seconds of instantiating a deprecated market instance (measured from instantiation). Warning is displayed exactly once per instance.
- **SC-004**: All code examples in README.md and other documentation use supported markets or clearly indicate deprecation status
- **SC-005**: Automated documentation generation (if used) correctly displays deprecation status for all deprecated markets
- **SC-006**: Zero breaking changes introduced - all deprecated markets remain functionally operational for existing users
