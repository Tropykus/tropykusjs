# Research: Multi-Decimal Token Support

**Date**: 2025-10-14
**Feature**: Multi-Decimal Token Support (001-support-multi-decimal)
**Phase**: 0 - Research & Technical Decisions

## Research Questions

### Q1: How should decimal configuration be passed to markets?

**Decision**: Extend `addMarket()` method in `index.js` to accept optional `tokenDecimals` and `oracleDecimals` in the `args` parameter.

**Rationale**:
- Existing API already uses `args` object for optional configuration (comptrollerAddress, interestRateModelAddress, etc.)
- Maintains backward compatibility - undefined values default to 18
- Consistent with library's configuration pattern
- No signature changes to `addMarket()` required

**Alternatives considered**:
1. **Separate methods (`addMarketWith Decimals`)** - Rejected: Violates Principle VI (backward compatibility), creates API fragmentation
2. **Query decimals from ERC20 contract** - Rejected: Not all tokens implement `decimals()` correctly, adds network calls, oracle decimals can't be queried
3. **Global configuration on Tropykus instance** - Rejected: Markets with different decimals need per-market config

**Implementation approach**:
```javascript
// Current signature (unchanged):
tropykus.addMarket(artifact, deployed, marketAddress, erc20TokenAddress, args)

// New usage with decimals:
tropykus.addMarket('CErc20Immutable', true, usdtMarketAddress, usdtTokenAddress, {
  tokenDecimals: 6,        // defaults to 18 if not provided
  oracleDecimals: 8,       // defaults to 18 if not provided
  comptrollerAddress: '0x...', // existing args still work
  // ...
})
```

---

### Q2: How should decimal factors be computed and stored?

**Decision**: Compute `tokenFactor` and `oracleFactor` as FixedNumber instances during Market constructor and store as instance properties.

**Rationale**:
- Aligns with Principle II (Numerical Precision) - use FixedNumber for all financial math
- One-time computation avoids repeated Math.pow() calls in hot paths
- Stored as FixedNumber enables direct use in divUnsafe/mulUnsafe operations
- Maintains 'fixed80x18' internal precision regardless of token decimals

**Alternatives considered**:
1. **Compute on-demand** - Rejected: Unnecessary performance overhead in balance calculation methods called frequently
2. **Store as BigNumber** - Rejected: Requires conversion to FixedNumber for every calculation, adds complexity
3. **Use ethers.utils.parseUnits() directly** - Rejected: Still requires factor for reverse conversion (mantissa → decimal)

**Implementation approach**:
```javascript
// In Market constructor:
this.tokenDecimals = tokenDecimals || 18;
this.oracleDecimals = oracleDecimals || 18;
this.tokenFactor = FixedNumber.fromString(
  Math.pow(10, this.tokenDecimals).toString(),
  'fixed80x18'
);
this.oracleFactor = FixedNumber.fromString(
  Math.pow(10, this.oracleDecimals).toString(),
  'fixed80x18'
);
```

---

### Q3: How to replace ethers.utils.parseEther() calls?

**Decision**: Replace with `ethers.utils.parseUnits(amount, this.tokenDecimals)` for transaction amount construction. For reverse conversion (mantissa → decimal), use `FixedNumber.from(mantissa).divUnsafe(this.tokenFactor)`.

**Rationale**:
- `parseUnits(value, decimals)` is ethers.js's built-in decimal-aware formatter
- Direct replacement for `parseEther()` which is equivalent to `parseUnits(value, 18)`
- Maintains BigNumber output type expected by smart contract methods
- Reverse conversion using tokenFactor leverages FixedNumber precision

**Alternatives considered**:
1. **Manual BigNumber multiplication** - Rejected: Re-implementing parseUnits is error-prone, violates DRY
2. **String formatting with toFixed()** - Rejected: Loses precision, violates Principle II
3. **Keep parseEther, add scaling** - Rejected: Double conversion (18-decimal → target) loses precision and adds complexity

**Implementation approach**:
```javascript
// OLD:
mint(account, amount) {
  this.instance.connect(account.signer).mint({
    value: ethers.utils.parseEther(amount.toString()),
    gasLimit: this.tropykus.gasLimit,
  })
}

// NEW:
mint(account, amount) {
  this.instance.connect(account.signer).mint({
    value: ethers.utils.parseUnits(amount.toString(), this.tokenDecimals),
    gasLimit: this.tropykus.gasLimit,
  })
}
```

---

### Q4: How to handle USD calculations with oracle decimals?

**Decision**: Oracle price mantissa interpretation changes based on `oracleDecimals`. Formula becomes: `usd = underlying * (priceMantissa / oracleFactor)`.

**Rationale**:
- Price oracle currently returns 18-decimal mantissa (1 USD = 1e18)
- If oracle configured for 8 decimals, 1 USD = 1e8 in mantissa
- Dividing by oracleFactor normalizes to human-readable price
- Maintains FixedNumber precision throughout calculation chain

**Alternatives considered**:
1. **Assume oracle always returns 18 decimals** - Rejected: Doesn't meet FR-002, blocks Chainlink-style oracle integration
2. **Query oracle decimals from contract** - Rejected: Not all oracles expose decimals(), adds network overhead
3. **Separate PriceOracle classes per decimal config** - Rejected: Violates simplicity principle, causes class explosion

**Implementation approach**:
```javascript
// OLD (hardcoded 1e18):
.then(([balance, priceMantissa]) => {
  const price = FixedNumber.from(priceMantissa.toString(), format)
    .divUnsafe(factor);  // factor = 1e18
  const usd = balance.mulUnsafe(price);
})

// NEW (configurable oracle decimals):
.then(([balance, priceMantissa]) => {
  const price = FixedNumber.from(priceMantissa.toString(), format)
    .divUnsafe(this.oracleFactor);  // oracleFactor = 10^oracleDecimals
  const usd = balance.mulUnsafe(price);
})
```

---

### Q5: How to preserve protocol parameter precision (exchange rate, collateral factor)?

**Decision**: Exchange rate, collateral factor, close factor, reserve factor remain 18-decimal in smart contracts. These are NOT affected by token/oracle decimals. No changes required to methods accessing these values.

**Rationale**:
- Smart contracts define these as 18-decimal mantissas regardless of underlying token
- Per spec FR-008: "MUST remain unchanged (continue using 18-decimal representation)"
- Changing these would require smart contract upgrades (out of scope)
- Existing code using `/ 1e18` for these parameters continues to work

**Alternatives considered**:
1. **Make these configurable too** - Rejected: Out of scope, would break smart contract assumptions
2. **Use tokenFactor for these** - Rejected: Would cause incorrect calculations, violates contract spec

**Implementation approach**:
```javascript
// NO CHANGE - these remain 18-decimal:
getExchangeRateCurrent(account) {
  return this.instance.connect(account.signer).callStatic.exchangeRateCurrent()
    .then((er) => Number(er) / 1e18)  // Still correct
}

getReserveFactor() {
  return this.instance.callStatic.reserveFactorMantissa()
    .then((rf) => Number(rf) / 1e18)  // Still correct
}
```

---

### Q6: How to handle multi-market aggregation in Comptroller?

**Decision**: When aggregating supply/borrow across markets in Comptroller methods, each market's balance must be converted using its own tokenFactor before summing in USD.

**Rationale**:
- Different markets may have different token decimals (USDT 6, DOC 18)
- Different markets may use different oracle decimals (Chainlink 8, native 18)
- USD is the common denomination for cross-market calculations
- Each market must normalize its own balance before aggregation

**Alternatives considered**:
1. **Require all markets use same decimals** - Rejected: Defeats feature purpose, violates FR-001
2. **Normalize in Comptroller** - Rejected: Comptroller doesn't have access to Market instances' decimal config
3. **Pass decimals to Comptroller** - Rejected: Leaky abstraction, violates encapsulation

**Implementation approach**:
```javascript
// In Comptroller.getTotalSupplyInAllMarkets():
Promise.all(markets.map(market => market.balanceOfUnderlying(account)))
  .then(balances => {
    // Each balance.usd already normalized by market's tokenFactor and oracleFactor
    const totalUSD = balances.reduce((sum, bal) =>
      sum.addUnsafe(FixedNumber.from(bal.usd.toString())),
      zero
    );
    return totalUSD;
  })
```

---

### Q7: Testing strategy for multi-decimal support?

**Decision**: Implement three-tier testing approach:
1. **Unit tests**: Test decimal factor computation in isolation
2. **Contract tests**: Mock 6-decimal and 8-decimal oracle scenarios with Sinon stubs
3. **Integration tests**: Use testnet deployment with actual 6-decimal token

**Rationale**:
- Aligns with Principle IV (Test-Driven Development) and Principle V (Contract Test Coverage)
- Unit tests verify factor math without blockchain dependency
- Contract tests verify ABI encoding/decoding with non-18-decimal values
- Integration tests prove end-to-end functionality on actual RSK testnet

**Test cases required**:
- [ ] Unit: Factor computation for decimals 0, 6, 8, 18
- [ ] Unit: parseUnits produces correct BigNumber for all decimal values
- [ ] Contract: Mint 100 units of 6-decimal token → verify transaction data
- [ ] Contract: Borrow from 6-decimal market → verify balance calculation
- [ ] Contract: USD value with 8-decimal oracle price
- [ ] Contract: Liquidity aggregation across 6-decimal and 18-decimal markets
- [ ] Contract: maxValue=true redeem with 6-decimal token
- [ ] Contract: maxValue=true repay with 6-decimal token
- [ ] Integration: Historical event parsing (suppliedLast24Hours) with 6-decimal amounts
- [ ] Integration: Backward compat - existing 18-decimal tests pass unchanged

**Implementation approach**:
```javascript
// Example contract test structure:
describe('Multi-decimal support', () => {
  describe('6-decimal tokens', () => {
    beforeEach(() => {
      // Stub market with tokenDecimals: 6
      // Stub ERC20 contract responses
    });

    it('should mint 100 USDT (6 decimals) correctly', async () => {
      const tx = await market.mint(account, 100);
      expect(tx.value).to.equal(ethers.utils.parseUnits('100', 6));
    });
  });
});
```

---

## Technology Decisions

### Ethers.js utilities for decimal handling

**Chosen**: `ethers.utils.parseUnits(value, decimals)` and `ethers.utils.formatUnits(bigNumber, decimals)`

**Why**: Built-in, well-tested, standard library approach. Maintains BigNumber type compatibility with smart contract methods. No additional dependencies required.

**Best practices**:
- Always use `parseUnits()` when converting user input to on-chain amounts
- Always use `formatUnits()` when displaying on-chain amounts to users (though TropykusJS returns Number/FixedNumber objects, not formatted strings)
- Never use floating-point arithmetic for intermediate calculations
- Store decimals as integer property, not as the factor itself (compute factor from decimals)

---

### FixedNumber precision preservation

**Chosen**: Continue using 'fixed80x18' format for ALL internal calculations, regardless of token decimals.

**Why**: FixedNumber's 18-decimal internal precision can represent any token decimal (0-18) without loss. Converting to FixedNumber at boundaries (parseUnits result → FixedNumber) ensures precision in intermediate calculations.

**Best practices**:
- Boundary conversion: BigNumber (from parseUnits) → FixedNumber → calculations → Number (for return)
- Never convert Number → FixedNumber → calculations (Number already lost precision)
- Use `divUnsafe()`/`mulUnsafe()` for FixedNumber operations (checked versions throw on overflow)
- Factor division ALWAYS uses FixedNumber factors, not raw Number division

---

### Decimal validation

**Chosen**: Validate decimals in Market constructor: `if (decimals < 0 || decimals > 18) throw Error()`

**Why**: Prevents invalid configuration at construction time. Fails fast before any calculations occur. Aligns with FR-010 requirement.

**Best practices**:
- Validate both tokenDecimals and oracleDecimals
- Provide clear error messages: "tokenDecimals must be between 0 and 18, got: {value}"
- Document valid range in JSDoc comments
- Consider warning (console.warn) for unusual values like 0 or >18, but allow them

---

## Integration Patterns

### Backward compatibility strategy

**Pattern**: Optional parameters with sensible defaults

**Implementation**:
- `tokenDecimals` defaults to 18 if undefined/null
- `oracleDecimals` defaults to 18 if undefined/null
- Existing code that doesn't pass these params continues to work identically
- `addMarket()` signature unchanged (args object is optional)

**Migration path for users**:
1. Upgrade library version (MINOR bump, e.g., 0.2.17 → 0.3.0)
2. Existing code continues working (18-decimal assumption)
3. Add decimal config when adding new markets: `{ tokenDecimals: 6 }`
4. No code changes required for existing markets

---

### Event parsing with decimals

**Pattern**: Event amounts are in token's native decimals

**Implementation**:
- `suppliedLast24Hours()` / `borrowedLast24Hours()` currently assume 18 decimals
- Event args (mintAmount, borrowAmount) are in token decimals
- Must divide by `this.tokenFactor` instead of hardcoded `factor (1e18)`

**Code change**:
```javascript
// OLD:
supplyEvents.forEach((supplyEvent) => {
  supplied = supplied.addUnsafe(
    FixedNumber.from(supplyEvent.args.mintAmount.toString(), format)
  );
});
supplied = supplied.divUnsafe(factor);  // factor = 1e18

// NEW:
supplyEvents.forEach((supplyEvent) => {
  supplied = supplied.addUnsafe(
    FixedNumber.from(supplyEvent.args.mintAmount.toString(), format)
  );
});
supplied = supplied.divUnsafe(this.tokenFactor);  // uses market's decimals
```

---

## Summary

All technical decisions resolved. No blocking unknowns remain. Key decisions:

1. **Configuration**: Pass decimals via `args` object in `addMarket()`
2. **Storage**: Compute tokenFactor and oracleFactor in constructor, store as FixedNumber
3. **Transaction amounts**: Replace parseEther with parseUnits(amount, tokenDecimals)
4. **USD calculations**: Divide oracle price mantissa by oracleFactor
5. **Protocol parameters**: Keep 18-decimal handling unchanged (exchange rate, collateral factor)
6. **Aggregation**: Each market normalizes its own balances before cross-market sum
7. **Testing**: Three-tier approach (unit, contract, integration)
8. **Backward compatibility**: Default to 18 decimals, no breaking changes

**Ready to proceed to Phase 1: Design & Contracts**
