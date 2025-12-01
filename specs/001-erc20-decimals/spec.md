# Feature Specification: ERC20 Multi-Decimal Support

**Feature Branch**: `001-erc20-decimals`  
**Created**: 2025-01-27  
**Status**: Draft  
**Input**: User description: "Provide support for ERC20 tokens that use a different amount of decimals besides 18"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Interact with 6-Decimal Tokens (Priority: P1)

A developer wants to deposit, withdraw, borrow, and repay using an ERC20 token that uses 6 decimals (such as USDC). The system should correctly parse and format all amounts using 6 decimal precision, ensuring that 1.0 token units are represented correctly in the underlying token contract.

**Why this priority**: 6-decimal tokens (like USDC) are among the most common non-18-decimal tokens in DeFi. Supporting these tokens enables integration with major stablecoins and expands the protocol's utility.

**Independent Test**: Can be fully tested by creating a market for a 6-decimal token, performing deposit and withdrawal operations, and verifying that amounts are correctly parsed and formatted. This delivers immediate value by enabling support for popular stablecoins.

**Acceptance Scenarios**:

1. **Given** a market is created for an ERC20 token with 6 decimals, **When** a user deposits 1.0 token units, **Then** the system correctly converts this to 1000000 (1e6) in the token contract and the user's balance reflects 1.0 tokens
2. **Given** a user has deposited tokens in a 6-decimal market, **When** they query their balance, **Then** the system displays the balance with 6-decimal precision (e.g., 1.123456 tokens)
3. **Given** a user wants to borrow from a 6-decimal market, **When** they specify 10.5 tokens to borrow, **Then** the system correctly converts this to 10500000 (10.5e6) in the token contract
4. **Given** a user has borrowed from a 6-decimal market, **When** they repay the loan, **Then** the system correctly parses the repayment amount using 6 decimals

---

### User Story 2 - Interact with 8-Decimal Tokens (Priority: P2)

A developer wants to interact with an ERC20 token that uses 8 decimals (such as WBTC). The system should handle all operations with 8-decimal precision, ensuring accurate amount conversions and balance calculations.

**Why this priority**: 8-decimal tokens represent another common category (wrapped Bitcoin tokens). Supporting these expands the protocol to major asset classes beyond standard 18-decimal ERC20 tokens.

**Independent Test**: Can be fully tested by creating a market for an 8-decimal token and performing the full lifecycle of operations (deposit, borrow, repay, withdraw). This delivers value by enabling support for wrapped Bitcoin and similar assets.

**Acceptance Scenarios**:

1. **Given** a market is created for an ERC20 token with 8 decimals, **When** a user deposits 0.5 tokens, **Then** the system correctly converts this to 50000000 (0.5e8) in the token contract
2. **Given** a user interacts with an 8-decimal token market, **When** they perform any operation (deposit, withdraw, borrow, repay), **Then** all amounts are correctly parsed and formatted using 8-decimal precision
3. **Given** balance calculations for an 8-decimal token, **When** the system displays USD values, **Then** the underlying token amounts maintain 8-decimal precision in all calculations

---

### User Story 3 - Support All Valid Decimal Amounts (Priority: P3)

A developer wants to interact with ERC20 tokens that use any valid decimal amount (0-18 decimals). The system should automatically detect the decimal amount from the token contract and use it for all operations, ensuring the protocol can support the full range of ERC20 tokens.

**Why this priority**: While less common, tokens with other decimal amounts (0, 2, 4, etc.) exist in the ecosystem. Supporting the full range ensures maximum compatibility and future-proofs the protocol.

**Independent Test**: Can be fully tested by creating markets for tokens with various decimal amounts (0, 2, 4, 6, 8, 18) and verifying that each correctly uses its specific decimal precision. This delivers value by ensuring comprehensive ERC20 token support.

**Acceptance Scenarios**:

1. **Given** a token with 0 decimals, **When** a user deposits 100 tokens, **Then** the system correctly converts this to 100 (no decimal places) in the token contract
2. **Given** a token with 2 decimals, **When** a user deposits 1.23 tokens, **Then** the system correctly converts this to 123 (1.23e2) in the token contract
3. **Given** any valid decimal amount (0-18), **When** the system initializes a market, **Then** it automatically detects and uses the correct decimal amount from the token contract
4. **Given** tokens with different decimal amounts in the same protocol instance, **When** users interact with different markets, **Then** each market correctly uses its token's specific decimal precision

### Edge Cases

- What happens when a token contract doesn't implement the `decimals()` function? The system should handle this gracefully with appropriate error handling or fallback behavior
- How does the system handle tokens with 18 decimals? The system must maintain full backward compatibility, ensuring existing functionality continues to work without changes
- What happens when decimal amounts exceed 18? The system should validate that decimal amounts are within the ERC20 standard range (0-255, though practical max is typically 18) and handle out-of-range values appropriately
- How does the system handle very small amounts for high-decimal tokens? The system must maintain precision for fractional amounts, ensuring no rounding errors occur in critical calculations
- What happens when price oracle values use different decimal precision than the underlying token? The system must correctly convert between different decimal precisions when calculating USD values

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST automatically detect the decimal amount from ERC20 token contracts by calling the `decimals()` function
- **FR-002**: System MUST use the detected decimal amount for parsing human-readable token amounts into contract units (wei-equivalent)
- **FR-003**: System MUST use the detected decimal amount for formatting contract units back into human-readable token amounts
- **FR-004**: System MUST apply the correct decimal precision to all token operations including deposits, withdrawals, borrows, repayments, and transfers
- **FR-005**: System MUST maintain backward compatibility with existing 18-decimal tokens, ensuring no breaking changes to current functionality
- **FR-006**: System MUST handle balance calculations (underlying balances, USD values, token balances) using the correct decimal precision for each token
- **FR-007**: System MUST support all valid ERC20 decimal amounts within the standard range (0-255, though practical focus is 0-18)
- **FR-008**: System MUST handle errors gracefully when a token contract doesn't implement `decimals()` or returns invalid values
- **FR-009**: System MUST maintain precision in all calculations, avoiding rounding errors that could affect user balances or transaction amounts
- **FR-010**: System MUST correctly convert between different decimal precisions when calculating USD values from token amounts and price oracle data

### Key Entities *(include if feature involves data)*

- **Token Decimal Configuration**: Represents the decimal amount for a specific ERC20 token, retrieved from the token contract's `decimals()` function. This value determines how amounts are parsed and formatted for that token.
- **Token Amount**: Represents a quantity of tokens, which can be in human-readable format (e.g., 1.5 tokens) or contract format (e.g., 1500000 for 1.5 tokens with 6 decimals). The system must convert between these formats using the correct decimal precision.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully interact with ERC20 tokens using any decimal amount from 0 to 18, with 100% of operations completing without decimal-related errors
- **SC-002**: All amount conversions maintain precision with zero rounding errors in critical operations (deposits, withdrawals, borrows, repayments) for tokens with decimal amounts 0, 6, 8, and 18
- **SC-003**: Existing functionality for 18-decimal tokens continues to work without any breaking changes, maintaining 100% backward compatibility
- **SC-004**: The system correctly handles at least 5 different decimal amounts (0, 2, 6, 8, 18) in production-like scenarios, with all operations completing successfully
- **SC-005**: Balance calculations and USD value conversions maintain accuracy within acceptable precision bounds (no loss of significant digits) for all supported decimal amounts
- **SC-006**: Error handling for invalid or missing decimal values provides clear feedback without causing system failures
