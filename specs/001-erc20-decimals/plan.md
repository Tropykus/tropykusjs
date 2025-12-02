# Implementation Plan: 6-Decimal Token with 8-Decimal Oracle Integration

**Branch**: `001-erc20-decimals` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-erc20-decimals/spec.md`

**Note**: This plan focuses on a reduced scope: integrating 6-decimal tokens (like USDT/USDC) with price oracles. PriceOracleAdapterMoc uses 18 decimals (matching onchain provider), while PriceOracleAdapterUSDT uses 8 decimals. PriceOracleAdapterUSDT adds 22 decimals internally for liquidity calculations via ComptrollerG6.getAccountLiquidity.

## Summary

This implementation plan focuses on integrating 6-decimal ERC20 tokens (stablecoins like USDT/USDC) with price oracle systems. The scope is reduced from the original full multi-decimal support to specifically handle:
- 6-decimal tokens (e.g., USDT, USDC)
- PriceOracleAdapterMoc with 18-decimal precision (1e18, matching onchain provider)
- PriceOracleAdapterUSDT with 8-decimal precision (1e8) for price queries, plus 22 decimals added internally for liquidity calculations
- Testing with MockPriceProviderMoC using 18 decimals for MoC adapter tests and 8 decimals for USDT adapter tests

The technical approach involves:
1. Detecting token decimals (6 for target tokens)
2. Handling oracle price conversion from 18 decimals (MoC) or 8 decimals (USDT) to internal calculations
3. Converting between token decimals (6) and oracle decimals (18 for MoC, 8 for USDT) for USD value calculations
4. Accounting for PriceOracleAdapterUSDT's 22-decimal addition in liquidity calculations
5. Testing with the specific oracle adapters and mock providers mentioned

## Technical Context

**Language/Version**: JavaScript (Node.js), Ethers.js v5.x  
**Primary Dependencies**: ethers.js v5.x, Hardhat (for testing), Anvil (local blockchain)  
**Storage**: N/A (blockchain-based, no local storage)  
**Testing**: Mocha, Chai, Hardhat, Anvil (local blockchain node)  
**Target Platform**: Node.js runtime (SDK library)  
**Project Type**: Single package SDK library  
**Performance Goals**: No specific performance requirements for this feature (decimal conversion is lightweight)  
**Constraints**: 
- Must maintain backward compatibility with 18-decimal tokens
- Must handle precision correctly (no rounding errors in financial calculations)
- Must work with existing PriceOracle contract interface
**Scale/Scope**: 
- Focus on 6-decimal tokens initially
- Support PriceOracleAdapterMoc and PriceOracleAdapterUSDT adapters
- Single market testing scenario

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. SDK-First Design ✅
- **Status**: PASS
- **Compliance**: All changes maintain clean SDK interface. Decimal detection and conversion utilities are encapsulated within Market/CErc20 classes. Public API remains unchanged - backward compatible.
- **Rationale**: No violations. Decimal handling is internal implementation detail, public methods maintain same signatures.

### II. Blockchain Safety & Transaction Integrity (NON-NEGOTIABLE) ✅
- **Status**: PASS
- **Compliance**: All decimal conversions use BigNumber/FixedNumber for precision. No rounding errors in critical operations. Error handling for missing decimals() function.
- **Rationale**: No violations. Precision maintained throughout calculations.

### III. Test-First Development (NON-NEGOTIABLE) ✅
- **Status**: PASS
- **Compliance**: Integration tests required for 6-decimal token with 18-decimal oracle (MoC) and 8-decimal oracle (USDT). Tests must cover PriceOracleAdapterMoc (18 decimals) and PriceOracleAdapterUSDT (8 decimals for prices, 22 decimals for liquidity) scenarios.
- **Rationale**: No violations. Testing strategy defined in research phase.

### IV. Integration Testing for Blockchain Interactions ✅
- **Status**: PASS
- **Compliance**: Integration tests required for:
  - 6-decimal token market creation
  - Price oracle adapter interactions (PriceOracleAdapterMoc with 18 decimals, PriceOracleAdapterUSDT with 8 decimals)
  - USD value calculations with 18-decimal oracle (MoC) and 8-decimal oracle (USDT)
  - Liquidity calculations with PriceOracleAdapterUSDT (accounting for 22-decimal addition)
  - Deposit/withdraw/borrow/repay operations
- **Rationale**: No violations. Integration testing explicitly required for oracle interactions.

### V. Semantic Versioning & Breaking Changes ✅
- **Status**: PASS
- **Compliance**: No breaking API changes. All changes are backward compatible. MINOR version increment appropriate.
- **Rationale**: No violations. Public API unchanged.

### VI. Code Quality & Consistency ✅
- **Status**: PASS
- **Compliance**: Code must pass ESLint, Prettier. Follow existing code patterns.
- **Rationale**: No violations. Standard code quality requirements.

### VII. Documentation & Examples ✅
- **Status**: PASS
- **Compliance**: JSDoc comments required for new utility functions. Examples in quickstart.md.
- **Rationale**: No violations. Documentation requirements standard.

**GATE RESULT**: ✅ PASS - All constitution checks pass. Proceed to Phase 0 research.

## Project Structure

### Documentation (this feature)

```text
specs/001-erc20-decimals/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── oracle-adapter-api.md  # Oracle adapter integration API
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
packages/tropykus/
├── src/
│   ├── Markets/
│   │   └── CErc20.js          # Modified: Add decimal detection, use parseUnits/formatUnits
│   ├── Market.js              # Modified: Handle oracle decimal conversion (18 for MoC, 8 for USDT)
│   ├── PriceOracle.js         # Modified: Handle 18-decimal (MoC) and 8-decimal (USDT) oracle prices, plus USDT 22-decimal liquidity addition
│   └── utils/
│       └── decimals.js        # New: Decimal detection and conversion utilities
├── artifacts/
│   ├── PriceOracleAdapterMoc.json    # Existing: Used for testing
│   └── PriceOracleAdapterUSDT.json   # Existing: Used for testing
└── test/
    └── 02-markets.spec.js     # Modified: Add 6-decimal token + 8-decimal oracle tests
```

**Structure Decision**: Single package SDK library structure. Changes are localized to:
1. Market/CErc20 classes for decimal-aware operations
2. PriceOracle class for 8-decimal oracle handling
3. New utility module for decimal detection/conversion
4. Test file updates for integration testing

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations identified. All constitution checks pass.

## Implementation Phases

### Phase 0: Research & Oracle Decimal Handling

**Objective**: Research and document how to handle 8-decimal oracle prices with 6-decimal tokens.

**Tasks**:
1. Research PriceOracleAdapterMoc.json structure and 18-decimal (1e18) price format (matching onchain provider)
2. Research PriceOracleAdapterUSDT.json structure, 8-decimal price format, and 22-decimal addition for liquidity calculations
3. Document conversion logic: 6-decimal token amounts ↔ 18-decimal oracle prices (MoC) and 8-decimal oracle prices (USDT)
4. Document PriceOracleAdapterUSDT's 22-decimal addition for getAccountLiquidity calculations
5. Identify all places in codebase where oracle prices are used
6. Document USD value calculation flow with mixed decimals (6-decimal tokens with 18-decimal MoC oracle or 8-decimal USDT oracle)

**Output**: Updated `research.md` with oracle decimal handling section

### Phase 1: Design & Contracts

**Objective**: Design the decimal-aware oracle integration and create API contracts.

**Tasks**:
1. Update `data-model.md` with oracle decimal conversion entities (18 for MoC, 8 for USDT, plus 22 for USDT liquidity)
2. Create `contracts/oracle-adapter-api.md` documenting oracle adapter integration (MoC 18-decimal, USDT 8-decimal with 22-decimal liquidity addition)
3. Update `quickstart.md` with testing instructions for 6-decimal token + 18-decimal oracle (MoC) and 8-decimal oracle (USDT)
4. Update agent context with new technology patterns

**Output**: 
- `data-model.md` (updated)
- `contracts/oracle-adapter-api.md` (new)
- `quickstart.md` (updated)
- Agent context files (updated)

### Phase 2: Implementation Tasks

**Note**: Phase 2 is handled by `/speckit.tasks` command, not this plan.

**Objective**: Break down implementation into concrete tasks.

**Output**: `tasks.md` (created by `/speckit.tasks` command)
