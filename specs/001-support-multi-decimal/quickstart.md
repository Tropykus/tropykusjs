# Quickstart: Multi-Decimal Token Support

**Date**: 2025-10-14
**Feature**: Multi-Decimal Token Support (001-support-multi-decimal)
**Audience**: Developers integrating TropykusJS

## Overview

This guide demonstrates how to use TropykusJS with tokens that have non-18-decimal precision (e.g., USDT with 6 decimals) and price oracles with custom decimal formats (e.g., Chainlink-style 8-decimal prices).

## Prerequisites

- TropykusJS v0.3.0+ installed
- RSK testnet or mainnet access
- Market and token contract addresses
- Account with mnemonic or injected provider

## Basic Setup (18-Decimal Tokens)

**No changes required** for existing integrations:

```javascript
const Tropykus = require('@tropykus-finance/tropykus');

const tropykus = new Tropykus('https://public-node.testnet.rsk.co', 400000);
tropykus.setComptroller('0xd8f5366b7bbe1275336fc3b929646104379e1d7d');

// Add 18-decimal market (DOC, RIF, RBTC) - works as before:
const cdoc = await tropykus.addMarket(
  'CErc20Immutable',
  true,
  '0xe7b4770af8152fc1a0e13d08e70a8c9a70f4d9d9', // kDOC address
  '0x494154243ac77c6ab90dfa0d4d42dd411e1df5f3'  // tDOC address
);

// All operations work identically:
await cdoc.mint(tropykus.account, 100);
const balance = await cdoc.balanceOfUnderlying(tropykus.account);
console.log(`Balance: ${balance.underlying} DOC ($${balance.usd})`);
```

**Result**: Backward compatible - no code changes needed for existing markets.

---

## Adding a 6-Decimal Token Market (USDT)

**New functionality**: Configure token decimals during market initialization.

```javascript
const Tropykus = require('@tropykus-finance/tropykus');

const tropykus = new Tropykus('https://public-node.testnet.rsk.co', 400000);
tropykus.setComptroller('0x7de1ade0c4482ceab96faff408cc9dcc9015b448');

// Set account:
const mnemonic = process.env.MNEMONIC;
tropykus.setAccount(mnemonic, "m/44'/37310'/0'/0/0");

// Add 6-decimal USDT market:
const kusdt = await tropykus.addMarket(
  'CErc20Immutable',          // Artifact type
  true,                       // Already deployed
  '0x495be6b6d8f35748bb8fe657f884f84342043733', // kUSDT address
  '0xcf5137f039578cb10070b91bb30fd3d260bcddde', // tUSDT address
  {
    tokenDecimals: 6,         // USDT has 6 decimals
    oracleDecimals: 18,       // Default oracle (18 decimals)
    comptrollerAddress: tropykus.comptroller.address,
  }
);

console.log('USDT market added with 6-decimal precision');
```

---

## Minting 6-Decimal Tokens

```javascript
// Mint 100 USDT (6 decimals):
const mintAmount = 100;
const tx = await kusdt.mint(tropykus.account, mintAmount);
await tx.wait();

console.log(`Minted ${mintAmount} USDT`);

// Check balance:
const balance = await kusdt.balanceOfUnderlying(tropykus.account);
console.log(`Supplied: ${balance.underlying} USDT`);
console.log(`USD Value: $${balance.usd.toFixed(2)}`);
```

**Expected Output**:
```
Minted 100 USDT
Supplied: 100 USDT
USD Value: $100.00
```

**Behind the scenes**: Library uses `parseUnits(100, 6)` → `100000000` (mantissa) sent to contract.

---

## Borrowing 6-Decimal Tokens

```javascript
// Borrow 50 USDT:
const borrowAmount = 50;
const borrowTx = await kusdt.borrow(tropykus.account, borrowAmount);
await borrowTx.wait();

console.log(`Borrowed ${borrowAmount} USDT`);

// Check borrow balance:
const borrowBalance = await kusdt.borrowBalanceCurrent(tropykus.account);
console.log(`Debt: ${borrowBalance.underlying} USDT ($${borrowBalance.usd.toFixed(2)})`);
```

**Expected Output**:
```
Borrowed 50 USDT
Debt: 50 USDT ($50.00)
```

---

## Redeeming 6-Decimal Tokens

```javascript
// Redeem 25 USDT:
const redeemAmount = 25;
const redeemTx = await kusdt.redeem(tropykus.account, redeemAmount);
await redeemTx.wait();

console.log(`Redeemed ${redeemAmount} USDT`);

// Check remaining balance:
const balance = await kusdt.balanceOfUnderlying(tropykus.account);
console.log(`Remaining: ${balance.underlying} USDT`);
```

**Expected Output**:
```
Redeemed 25 USDT
Remaining: 75 USDT
```

---

## Repaying 6-Decimal Tokens

```javascript
// Repay 30 USDT:
const repayAmount = 30;
const repayTx = await kusdt.repayBorrow(tropykus.account, repayAmount);
await repayTx.wait();

console.log(`Repaid ${repayAmount} USDT`);

// Check remaining debt:
const debt = await kusdt.borrowBalanceCurrent(tropykus.account);
console.log(`Remaining debt: ${debt.underlying} USDT`);
```

**Expected Output**:
```
Repaid 30 USDT
Remaining debt: 20 USDT
```

---

## Repaying All Debt (MaxValue)

```javascript
// Repay all remaining debt:
const repayAllTx = await kusdt.repayBorrow(tropykus.account, 0, true);
await repayAllTx.wait();

console.log('Repaid all USDT debt');

// Verify:
const remainingDebt = await kusdt.borrowBalanceCurrent(tropykus.account);
console.log(`Remaining debt: ${remainingDebt.underlying} USDT`); // Should be ~0
```

**Expected Output**:
```
Repaid all USDT debt
Remaining debt: 0 USDT
```

**Note**: Works correctly with 6-decimal tokens - library handles decimal conversion internally.

---

## Configuring Custom Oracle Decimals

**Scenario**: Market uses a Chainlink-style oracle returning 8-decimal prices.

```javascript
// Add market with 18-decimal token, 8-decimal oracle:
const kbtc = await tropykus.addMarket(
  'CErc20Immutable',
  true,
  '0x...', // kBTC market address
  '0x...', // BTC token address
  {
    tokenDecimals: 18,      // Token has 18 decimals
    oracleDecimals: 8,      // Chainlink oracle has 8 decimals
    comptrollerAddress: tropykus.comptroller.address,
  }
);

// Query balance - USD calculation accounts for 8-decimal price:
const balance = await kbtc.balanceOfUnderlying(tropykus.account);
console.log(`BTC Balance: ${balance.underlying}`);
console.log(`USD Value: $${balance.usd.toFixed(2)}`); // Correctly computed
```

**Behind the scenes**: Library divides oracle price mantissa by `10^8` instead of `10^18`.

---

## Multi-Market Portfolio (Mixed Decimals)

```javascript
// Setup markets with different decimals:
const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddr, docAddr);
// DOC: 18 decimals (default)

const kusdt = await tropykus.addMarket('CErc20Immutable', true, kusdtAddr, usdtAddr, {
  tokenDecimals: 6,
});
// USDT: 6 decimals

const crbtc = await tropykus.addMarket('CRBTC', true, crbtcAddr);
// RBTC: 18 decimals (default)

// Get total supply across all markets:
const markets = [cdoc, kusdt, crbtc];
const totalSupply = await tropykus.comptroller.getTotalSupplyInAllMarkets(
  tropykus.account,
  markets
);

console.log(`Total supplied across all markets: $${totalSupply.usd.toFixed(2)}`);
```

**Expected Output**:
```
Total supplied across all markets: $5,234.56
```

**Note**: Comptroller correctly aggregates USD values from markets with different decimal configurations.

---

## Checking Available Liquidity

```javascript
// Calculate max allowed to withdraw from 6-decimal USDT market:
const maxWithdraw = await kusdt.maxAllowedToWithdraw(
  tropykus.account,
  [cdoc, kusdt, crbtc]
);

console.log(`Max USDT withdrawal: ${maxWithdraw.underlying} USDT`);
console.log(`USD equivalent: $${maxWithdraw.usd.toFixed(2)}`);
```

**Expected Output**:
```
Max USDT withdrawal: 1500.5 USDT
USD equivalent: $1500.50
```

**Note**: Liquidity calculation accounts for decimal differences across all supplied/borrowed markets.

---

## Wallet Balance (6-Decimal Token)

```javascript
// Check USDT balance in wallet (not supplied to market):
const walletBalance = await kusdt.balanceOfUnderlyingInWallet(tropykus.account);

console.log(`USDT in wallet: ${walletBalance.underlying.value} USDT`);
console.log(`USD value: $${walletBalance.usd.value.toFixed(2)}`);
```

**Expected Output**:
```
USDT in wallet: 2500 USDT
USD value: $2500.00
```

---

## Historical Activity (24-Hour Volume)

```javascript
// Query last 24 hours of USDT supply activity:
const supplied = await kusdt.suppliedLast24Hours();
console.log(`USDT supplied (24h): ${supplied.supplied}`);
console.log(`USD value (24h): $${supplied.suppliedInUsd.toFixed(2)}`);

// Query last 24 hours of USDT borrow activity:
const borrowed = await kusdt.borrowedLast24Hours();
console.log(`USDT borrowed (24h): ${borrowed.borrowed}`);
console.log(`USD value (24h): $${borrowed.borrowedInUsd.toFixed(2)}`);
```

**Expected Output**:
```
USDT supplied (24h): 125000
USD value (24h): $125000.00
USDT borrowed (24h): 67500
USD value (24h): $67500.00
```

**Note**: Event parsing correctly handles 6-decimal amounts from Mint/Borrow events.

---

## Error Handling

### Invalid Decimal Configuration

```javascript
try {
  const invalid = await tropykus.addMarket('CErc20Immutable', true, addr1, addr2, {
    tokenDecimals: 24,  // Invalid: exceeds 18
  });
} catch (error) {
  console.error(error.message);
  // Output: "tokenDecimals must be between 0 and 18, got: 24"
}
```

### Missing Token Address (6-Decimal ERC20)

```javascript
try {
  const invalid = await tropykus.addMarket('CErc20Immutable', true, marketAddr, null, {
    tokenDecimals: 6,
  });
} catch (error) {
  console.error(error.message);
  // Output: "Must provide a valid erc20 token address"
}
```

---

## Migration Guide (Existing Integrations)

### Step 1: Upgrade Library

```bash
npm install @tropykus-finance/tropykus@latest
# or
npm update @tropykus-finance/tropykus
```

### Step 2: Verify Existing Code

**No changes required** - run your existing integration tests:

```bash
npm test
```

All existing 18-decimal markets continue to work identically.

### Step 3: Add New Markets with Decimals

**Only when adding new non-18-decimal markets**:

```javascript
// OLD (for 18-decimal tokens):
const market = await tropykus.addMarket('CErc20Immutable', true, marketAddr, tokenAddr);

// NEW (for 6-decimal tokens):
const market = await tropykus.addMarket('CErc20Immutable', true, marketAddr, tokenAddr, {
  tokenDecimals: 6,
});
```

---

## Complete Example: 6-Decimal USDT Integration

```javascript
const Tropykus = require('@tropykus-finance/tropykus');

async function main() {
  // Initialize Tropykus
  const tropykus = new Tropykus('https://public-node.testnet.rsk.co', 400000);
  tropykus.setComptroller('0x7de1ade0c4482ceab96faff408cc9dcc9015b448');

  // Set account
  const mnemonic = process.env.MNEMONIC;
  tropykus.setAccount(mnemonic, "m/44'/37310'/0'/0/0");

  // Add USDT market (6 decimals)
  const kusdt = await tropykus.addMarket(
    'CErc20Immutable',
    true,
    '0x495be6b6d8f35748bb8fe657f884f84342043733',
    '0xcf5137f039578cb10070b91bb30fd3d260bcddde',
    { tokenDecimals: 6 }
  );

  // Mint 1000 USDT
  console.log('Minting 1000 USDT...');
  const mintTx = await kusdt.mint(tropykus.account, 1000);
  await mintTx.wait();

  // Check balance
  const balance = await kusdt.balanceOfUnderlying(tropykus.account);
  console.log(`✓ Supplied: ${balance.underlying} USDT ($${balance.usd.toFixed(2)})`);

  // Borrow 200 USDT
  console.log('Borrowing 200 USDT...');
  const borrowTx = await kusdt.borrow(tropykus.account, 200);
  await borrowTx.wait();

  // Check debt
  const debt = await kusdt.borrowBalanceCurrent(tropykus.account);
  console.log(`✓ Borrowed: ${debt.underlying} USDT ($${debt.usd.toFixed(2)})`);

  // Repay 100 USDT
  console.log('Repaying 100 USDT...');
  const repayTx = await kusdt.repayBorrow(tropykus.account, 100);
  await repayTx.wait();

  // Final state
  const finalDebt = await kusdt.borrowBalanceCurrent(tropykus.account);
  console.log(`✓ Remaining debt: ${finalDebt.underlying} USDT`);

  console.log('\n✓ All operations completed successfully!');
}

main().catch(console.error);
```

**Expected Output**:
```
Minting 1000 USDT...
✓ Supplied: 1000 USDT ($1000.00)
Borrowing 200 USDT...
✓ Borrowed: 200 USDT ($200.00)
Repaying 100 USDT...
✓ Remaining debt: 100 USDT

✓ All operations completed successfully!
```

---

## Testing with Mock 6-Decimal Token

For development/testing without deploying a real 6-decimal token:

```javascript
const { ethers } = require('ethers');

// Deploy mock ERC20 with 6 decimals:
const MockERC20 = await ethers.getContractFactory('StandardToken');
const usdt = await MockERC20.deploy(
  ethers.utils.parseUnits('1000000', 6), // 1M USDT supply
  'Tether USD',
  6,            // 6 decimals
  'USDT'
);
await usdt.deployed();

console.log(`Mock USDT deployed at: ${usdt.address}`);

// Use with TropykusJS:
const kusdt = await tropykus.addMarket('CErc20Immutable', true, marketAddr, usdt.address, {
  tokenDecimals: 6,
});
```

---

## Further Reading

- [TropykusJS README](https://github.com/Tropykus/tropykusjs#readme)
- [ethers.js parseUnits documentation](https://docs.ethers.org/v5/api/utils/display-logic/#utils-parseUnits)
- [Tropykus Protocol Whitepaper](https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/Tropykus_Protocol%20V4.pdf)
- [RSK Network Documentation](https://developers.rsk.co/)

---

## Summary

✅ **Backward Compatible**: Existing code works without changes
✅ **Simple Configuration**: Add `{ tokenDecimals: 6 }` to args
✅ **No API Changes**: All methods work identically
✅ **Automatic Precision**: Library handles decimal conversion internally
✅ **Multi-Market Support**: Mix 6, 8, 18-decimal markets in same portfolio

**Ready to integrate 6-decimal tokens like USDT into your Tropykus DeFi application!**
