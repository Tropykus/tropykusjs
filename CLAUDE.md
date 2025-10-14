# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TropykusJS is a JavaScript library that enables developers to interact with Tropykus Protocol smart contracts deployed on the RSK network. Tropykus is an algorithmic distributed protocol for lending and borrowing crypto assets with interest rates determined by supply and demand.

The library wraps smart contract interactions using ethers.js (v5.1.0) and provides a high-level API for:
- Supplying assets as collateral (minting kTokens)
- Borrowing assets against collateral
- Redeeming supplied assets
- Repaying borrowed amounts
- Managing comptroller operations

## Repository Structure

This is a Lerna monorepo with the main package at `packages/tropykus/`.

**Core Classes:**
- `Tropykus` (index.js): Main entry point, manages provider, accounts, markets, and comptroller instances
- `Market` (Market.js): Base class for all market types, contains core logic for balances, minting, borrowing, redeeming, and repaying
- `Comptroller` (Comptroller.js): Interface to the protocol's comptroller contract (manages risk parameters, market membership, liquidity calculations)
- Market implementations in `Markets/`:
  - `CRBTC.js`: Native RBTC market (inherits from Market)
  - `CRDOC.js`: RIF Dollar on Chain market (inherits from CErc20)
  - `CErc20.js`: Base class for ERC20 token markets (inherits from Market)
  - `CToken.js`: Generic ERC20Immutable token market (inherits from CErc20)

**Key Patterns:**
- Markets use dual provider pattern: `provider` for reads/transactions and `wsProvider` for event subscriptions
- All numerical calculations use `FixedNumber` from ethers to avoid floating-point precision issues (format: 'fixed80x18')
- Amounts are normalized by dividing by `factor` (1e18) after retrieval from contracts
- Account objects have structure: `{ signer, address }` where signer can sign transactions

## Development Commands

### Building
```bash
npm run build              # Build all packages using Lerna
```

### Testing
```bash
npm test                   # Build and run all tests
cd packages/tropykus && npm test  # Run tests for specific package
```

### Linting & Formatting
```bash
npm run lint               # Lint with ESLint (auto-fix enabled)
npm run format             # Format with Prettier
```

### Package Management
```bash
npm run bootstrap          # Bootstrap packages with Lerna
npm run clean              # Clean all packages
```

### Release & Publishing
```bash
npm run release            # Version bump (runs version-check, lerna version, version-update)
npm run publish            # Publish packages (runs custom publish script)
```

## Testing

Tests are located in `packages/tropykus/test/`:
- `00-tropykus.spec.js`: Core Tropykus class tests
- `01-comptroller.spec.js`: Comptroller functionality
- `02-markets.spec.js`: Market operations (mint, borrow, redeem, repay)
- `03-unitroller.spec.js`: Unitroller proxy tests

Tests use Mocha, Chai (with chai-as-promised), and Sinon for stubs/mocks.
Test configuration: `.mocharc.js` and `nyc.config.js` for coverage.

## Architecture Notes

### Provider Management
- Tropykus constructor accepts both HTTP provider and WebSocket provider
- HTTP provider used for read operations and transactions
- WebSocket provider enables event subscriptions via `market.subscribeOnEvent(event, action)`

### Account Management
- Accounts can be retrieved from injected provider: `tropykus.getAccount()`
- Or from mnemonic: `tropykus.getAccountFromMnemonic(mnemonic, derivationPath)`
- Account objects must be passed to all transaction methods

### Market Operations
Markets are added via `tropykus.addMarket(account, artifact, marketAddress, erc20TokenAddress, args)`:
- `artifact`: 'CRBTC', 'CRDOC', or 'CErc20Immutable'
- For CRBTC (native RBTC): only marketAddress needed
- For ERC20 tokens: both marketAddress and erc20TokenAddress required

**Transaction Flow for ERC20 Markets:**
- Mint: Approve ERC20 → Call mint() with approved amount
- RepayBorrow: Approve ERC20 → Call repayBorrow() with approved amount

**Transaction Flow for CRBTC:**
- Mint: Send value directly in transaction options
- RepayBorrow: Send value directly in transaction options

### Balance Calculations
Methods return structured objects with multiple representations:
```javascript
{
  underlying: Number,          // Raw token amount
  usd: Number,                // USD value
  fixedNumber: FixedNumber    // High-precision calculation
}
```

Some methods also include `tokens` (kToken amounts) when relevant.

### Liquidity Calculations
Complex calculations in `Market.maxAllowedToWithdraw()` and `Comptroller` methods:
- Factor in collateral factors per market
- Calculate total supply across all markets with/without collateral weight
- Calculate total borrows across all markets
- Determine available liquidity considering debt obligations
- Account for minimum liquidity delta (1 USD) to prevent rounding issues

### Event Queries
- `suppliedLast24Hours()` and `borrowedLast24Hours()` query past 2880 blocks (~24 hours on RSK)
- Use wsInstance for historical event filtering

## RSK Network Specifics

Derivation paths for RSK:
- RSK Mainnet: `m/44'/137'/0'/0/N`
- RSK Testnet: `m/44'/37310'/0'/0/N`
- Ethereum compatible: `m/44'/60'/0'/0/N`

Block time on RSK is approximately 30 seconds (used in APY calculations).

## Important Considerations

- Gas limits are configurable via `tropykus.gasLimit` and passed to all transactions
- All contract addresses should be lowercased for consistency when comparing
- When repaying all debt or redeeming all tokens, use `maxValue=true` flag and amount can be 0
- Reserved methods (starting with `_`) on contracts require admin privileges
- Market interest rate models determine borrowing/supply APY dynamically based on utilization
