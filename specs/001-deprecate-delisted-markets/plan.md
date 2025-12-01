# Implementation Plan: Deprecate Delisted Markets

**Branch**: `001-deprecate-delisted-markets` | **Date**: 2025-12-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-deprecate-delisted-markets/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Deprecate delisted markets in both code and documentation by adding @deprecated JSDoc tags, deprecation warnings at runtime, and updating all documentation references. This feature ensures developers are informed about deprecated markets while maintaining backward compatibility. The implementation will identify delisted markets (kSAT/cSAT, kRDOC/cRDOC, kRIF, kUSDT, and any market not in the listed set), mark code with deprecation annotations, display runtime warnings once per instance, and update README.md and other documentation.

## Technical Context

**Language/Version**: JavaScript (ES6+), Node.js (compatible with LTS versions)  
**Primary Dependencies**: ethers.js v5.1.0, Babel (transpilation), Rollup (bundling)  
**Storage**: N/A (no persistent storage required for deprecation markers)  
**Testing**: Mocha, Chai, chai-as-promised, Sinon (for mocking), NYC (coverage)  
**Target Platform**: Node.js runtime, npm package distribution  
**Project Type**: Single package (monorepo structure with Lerna)  
**Performance Goals**: Deprecation warnings must not impact runtime performance (warnings displayed once per instance, cached)  
**Constraints**: Zero breaking changes - all deprecated markets must remain functionally operational. Deprecation warnings must be non-blocking.  
**Scale/Scope**: ~4-5 deprecated market artifacts (CRBTC for kSAT/cSAT, CRDOC for kRDOC/cRDOC, CErc20Immutable for kRIF/kUSDT), ~5-10 documentation sections to update, backward compatibility for existing users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gates:

✅ **SDK-First Design**: Deprecation warnings maintain clean SDK interface while informing developers  
✅ **Blockchain Safety**: No changes to transaction logic - deprecation is informational only  
✅ **Test-First Development**: Deprecation warnings require tests to verify they display correctly  
✅ **Semantic Versioning**: This is a MINOR version change (new deprecation markers, no breaking changes)  
✅ **Code Quality**: All deprecation markers must follow JSDoc standards, pass ESLint  
✅ **Documentation**: README.md and JSDoc must be updated per requirements

### Post-Phase 1 Re-check:

✅ **SDK-First Design**: Deprecation warnings maintain clean SDK interface - warnings are non-intrusive and informative  
✅ **Blockchain Safety**: No changes to transaction logic - deprecation is purely informational  
✅ **Test-First Development**: Test plan includes deprecation warning verification tests  
✅ **Semantic Versioning**: Implementation follows MINOR version change pattern (deprecation markers, no breaking changes)  
✅ **Code Quality**: Deprecation utilities follow single-purpose principle, JSDoc standards maintained  
✅ **Documentation**: README.md update plan included, JSDoc @deprecated tags specified

**Status**: All constitution gates pass. Ready for implementation.

## Project Structure

### Documentation (this feature)

```text
specs/001-deprecate-delisted-markets/
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
│   ├── index.js                    # Main Tropykus class (addMarket method)
│   ├── Market.js                   # Base Market class (may need deprecation support)
│   ├── Markets/
│   │   ├── CRBTC.js                # CRBTC market (used for kSAT/cSAT - deprecated)
│   │   ├── CRDOC.js                 # CRDOC market (used for kRDOC/cRDOC - deprecated)
│   │   ├── CErc20.js                # CErc20 market (may be deprecated)
│   │   └── CToken.js                # CToken market (may be deprecated)
│   ├── Comptroller.js               # Comptroller (getAllMarketsInstances method)
│   ├── Unitroller.js
│   └── PriceOracle.js
├── test/
│   └── 02-markets.spec.js          # Market tests (may need updates)
└── artifacts/                      # Contract artifacts (may need deprecation markers)

README.md                           # Main documentation (needs deprecation updates)
```

**Structure Decision**: Single package monorepo structure. All market-related code is in `packages/tropykus/src/Markets/` and main SDK entry point is `packages/tropykus/src/index.js`. Documentation is at repository root in `README.md`. No database or external storage needed - deprecation is handled through code annotations and documentation updates.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - implementation follows constitution principles. Deprecation is a standard pattern that doesn't require complexity justification.
