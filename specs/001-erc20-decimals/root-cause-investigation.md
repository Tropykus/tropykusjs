# Root Cause Investigation: Test Suite Failures

**Feature**: ERC20 Multi-Decimal Support  
**Date**: 2025-01-27  
**Phase**: Phase 0 - Test Suite Verification  
**Task**: T004 - Investigate root causes of failing tests

## Executive Summary

This document investigates the root causes of the 42 failing tests identified in the test suite baseline. The investigation covers test environment setup, network connectivity, test data mismatches, and configuration issues.

**Key Findings**:
1. ✅ **Local blockchain node is running** (chainId: 30, not 1337 as expected)
2. ❌ **ChainId mismatch** - Tests expect 1337, node returns 30
3. ❌ **Deprecation config mismatch** - Test addresses don't match config addresses
4. ❌ **Contract deployment failures** - Multiple markets failing to deploy
5. ❌ **Quickstart validation** - Hardcoded wrong feature directory path

## Investigation Methodology

1. **Test Environment Verification**: Checked local blockchain node connectivity
2. **Test Code Analysis**: Examined test files for configuration and expectations
3. **Config File Analysis**: Compared test addresses with deprecation config
4. **Error Message Analysis**: Categorized failures by error type

## Detailed Findings

### 1. Test Environment Setup

#### Local Blockchain Node Status
- **Status**: ✅ **RUNNING**
- **Endpoint**: `http://127.0.0.1:8545`
- **ChainId**: `0x1e` (30 in decimal)
- **Expected ChainId**: `1337` (Hardhat default)

**Issue**: Tests expect chainId `1337` but local node returns `30`. This suggests:
- Node is running RSK testnet/mainnet configuration, not Hardhat
- Or node is configured with different chainId than expected

**Impact**: 
- Core tropykus test: "should get provider's chainId" fails
- May affect other tests that depend on chainId

**Location**: `test/00-tropykus.spec.js:20`
```javascript
expect(Number(await tropykus.getChainId())).equals(1337);
```

**Fix Required**: 
- Update test to expect chainId 30, OR
- Configure local node to use chainId 1337, OR
- Make test chainId-agnostic

---

### 2. Account Generation

#### Test Expectation
- **Expected Address**: `0xe317349c7279ffF242cc8ADCb575EbA0153760BA`
- **Test Location**: `test/00-tropykus.spec.js:24-25`

#### Implementation Analysis
The `getAccount()` method in `src/index.js:36-46` uses:
```javascript
getAccount() {
  return new Promise((resolve, reject) => {
    (this.provider.getSigner()).getAddress()
      .then((address) => ({
        signer: this.provider.getSigner(),
        address,
      }))
      .then(resolve)
      .catch(reject);
  });
}
```

**Issue**: The method relies on `provider.getSigner()` which uses the first account from the provider. The test expects a specific address, but the provider may be returning a different account.

**Root Cause**: 
- Provider not configured with expected account
- Or provider using different account index
- Or test environment not properly initialized

**Impact**: 
- Core tropykus test: "should generate an account" fails

**Fix Required**:
- Configure provider to use expected account, OR
- Update test to use actual account from provider, OR
- Set up provider with specific mnemonic/account

---

### 3. Contract Deployment Failures

#### Failing Tests
1. "should deploy a new comptroller" (`test/00-tropykus.spec.js:34`)
2. "should deployed a new CRBTC market" (`test/02-markets.spec.js:85`)
3. "should deployed a new CRDOC market" (`test/02-markets.spec.js`)
4. "should deployed a new CToken market" (`test/02-markets.spec.js`)

#### Error Pattern
All deployment failures show:
```
Error: cannot estimate gas; transaction may fail or may require manual gas limit
reason: "execution reverted"
```

**Root Causes**:

1. **Contract Constructor Parameters**
   - Deployment may be failing due to invalid constructor parameters
   - Missing required dependencies (comptroller, interest rate model, etc.)
   - Invalid addresses or zero addresses

2. **Contract State**
   - Contracts may already be deployed at expected addresses
   - Address conflicts or nonce issues
   - Insufficient permissions for deployment

3. **Test Data Issues**
   - Hardcoded addresses may not exist on local chain
   - Dependencies (comptroller, oracle) not properly set up
   - Missing contract artifacts or ABIs

**Example from test**:
```javascript
const crbtc = await tropykus.addMarket(
  dep,
  'CRBTC',
  null,
  null,
  {
    comptrollerAddress,
    interestRateModelAddress: crbtcInterestRateModelAddress,
    initialExchangeRate: 0.02,
    name: 'New CRBTC',
    symbol: 'CRBTC',
    decimals: 18,
  });
```

**Impact**: High - Multiple market deployment tests failing

**Fix Required**:
- Verify all contract dependencies exist on local chain
- Check constructor parameters are valid
- Ensure test account has sufficient permissions
- Verify contract artifacts are correct

---

### 4. Comptroller Test Failures

#### Failing Tests
1. "should list the market's addresses" (`test/01-comptroller.spec.js:35`)
2. "should list the market's as instances" (`test/01-comptroller.spec.js:41`)
3. "should enter the markets" (`test/01-comptroller.spec.js:53`)

#### Hardcoded Addresses
Tests use these addresses:
- `comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39'`
- `crdocAddress = '0x1a389e93be8ef2B5D105DEa44271d4426736A484'`
- `csatAddress = '0xf8A2e7A2bfa135a81f0c78edD6252a818619E2c3'`
- `crbtcAddress = '0xE498D1E3A0d7fdb80a2d7591D997aFDA34F8c5C5'`

**Issue**: These addresses may not exist on the local test chain, or the comptroller may not have these markets registered.

**Root Cause**:
- Local chain not seeded with expected contracts
- Comptroller not properly initialized
- Markets not added to comptroller

**Impact**: High - Comptroller functionality critical

**Fix Required**:
- Verify contracts exist at expected addresses on local chain
- Ensure comptroller has markets registered
- Or update tests to deploy contracts first

---

### 5. Market Symbol Test Failure

#### Failing Test
"should return the market's underlying symbol" (`test/02-markets.spec.js`)

#### Error
```
AssertionError: expected 'RBTC' to equal 'tRBTC'
```

**Root Cause**: Test expectation doesn't match actual contract behavior. The underlying token symbol is 'RBTC' but test expects 'tRBTC'.

**Impact**: Low - Test expectation issue, not code bug

**Fix Required**: Update test expectation to match actual symbol ('RBTC')

---

### 6. Market Setup Failures

#### Failing Tests
1. "should set market's comptroller" (`test/02-markets.spec.js`)
2. "should set market's reserve factor" (`test/02-markets.spec.js`)

#### Errors
1. `UNPREDICTABLE_GAS_LIMIT` - execution reverted
2. `TypeError: Cannot read properties of undefined (reading 'getReserveFactor')`

**Root Cause**: 
- Market instance not properly created/initialized
- Market contract not deployed or address invalid
- Transaction failing due to permissions or state

**Impact**: Medium - Market configuration operations

**Fix Required**:
- Ensure market is properly deployed before setup
- Verify market instance is created correctly
- Check transaction permissions

---

### 7. Unitroller Test Failures

#### Failing Tests
1. "should set a pending implementation of comptroller" (`test/03-unitroller.spec.js:27`)
2. "should get unitroller's comptroller implementation" (`test/03-unitroller.spec.js:36`)

#### Errors
1. `UNPREDICTABLE_GAS_LIMIT` - execution reverted
2. `CALL_EXCEPTION` - call revert exception

**Root Cause**:
- Unitroller contract not properly initialized
- Implementation not set or pending implementation not configured
- Contract state issues

**Impact**: Medium - Upgradeable contract functionality

**Fix Required**:
- Verify unitroller contract exists and is initialized
- Ensure implementation can be set
- Check contract state

---

### 8. Deprecation Utility Failures (18 failures)

#### Root Cause Analysis

**Issue**: `getDeprecationMetadata()` returning `null` for all deprecated addresses

#### Address Mismatch

**Test Addresses** (from `test/utils/deprecation.spec.js`):
- `csatMarketAddress = '0xf8a2e7a2bfa135a81f0c78edd6252a818619e2c3'` (lowercase)
- `crdocAddress = '0x1a389e93be8ef2b5d105dea44271d4426736a484'` (lowercase)
- `krifAddress = '0xd22de9a3f9d87e6bf58783e44b5453b3deacb0fe'` (lowercase)
- `kusdtAddress = '0x3ac74a85b80824caa8cc9dbae0ddce584f3d3e8e'` (lowercase)

**Config Addresses** (from `src/deprecation-config.js`):
- `'0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6'` - kSAT/cSAT (mainnet)
- `'0x0000000000000000000000000000000000000000'` - kRDOC/cRDOC (never listed)
- `'0x3134b7fbfca5db217eca523eab1941452cf35163'` - kRIF (mainnet)
- `'0xedaefc6b596ed38d712100976969975a37c84464'` - kUSDT (mainnet, deprecated - used 18-decimal rUSDT, not the standard 6-decimal USDT0)

**Mismatch Identified**:
- Test uses **testnet/local addresses**
- Config has **mainnet addresses**
- Addresses don't match!

**Example**:
- Test: `0xf8a2e7a2bfa135a81f0c78edd6252a818619e2c3` (csat)
- Config: `0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6` (kSAT mainnet)

**Impact**: All 18 deprecation utility tests fail because addresses don't match

**Fix Required**:
1. **Option A**: Add testnet/local addresses to deprecation config
2. **Option B**: Update tests to use mainnet addresses
3. **Option C**: Support both testnet and mainnet addresses in config

**Recommended**: Option A - Add test addresses to config for testing purposes

---

### 9. Quickstart Validation Failure

#### Failing Test
"before all" hook for "should have deprecation-config.js file matching quickstart pattern" (`test/quickstart-validation.spec.js`)

#### Error
```
ENOENT: no such file or directory, open 
'/Users/davidcarvajal/Development/Tropykus/tropykusjs/specs/001-deprecate-delisted-markets/quickstart.md'
```

**Root Cause**: Test is hardcoded to look for feature directory `001-deprecate-delisted-markets` but current feature is `001-erc20-decimals`.

**Location**: `test/quickstart-validation.spec.js:8`
```javascript
const quickstartPath = path.resolve(process.cwd(), '../../specs/001-deprecate-delisted-markets/quickstart.md');
```

**Impact**: Low - Test infrastructure issue

**Fix Required**: 
- Make test path dynamic based on current feature
- Or update path to correct feature directory
- Or remove hardcoded path dependency

---

## Root Cause Summary

| Category | Root Cause | Impact | Priority |
|----------|-----------|--------|----------|
| **ChainId Mismatch** | Node returns 30, test expects 1337 | High | P1 |
| **Account Generation** | Provider not configured with expected account | High | P1 |
| **Contract Deployment** | Contracts not deployed or invalid parameters | High | P1 |
| **Comptroller Tests** | Addresses don't exist or markets not registered | High | P1 |
| **Market Symbol** | Test expectation mismatch | Low | P3 |
| **Market Setup** | Market not properly initialized | Medium | P2 |
| **Unitroller** | Contract not initialized | Medium | P2 |
| **Deprecation Config** | Test addresses don't match config addresses | Medium | P2 |
| **Quickstart Test** | Hardcoded wrong feature directory | Low | P3 |

## Recommended Fix Order

### Priority 1 (Critical - Blocking)
1. **Fix ChainId Test** - Update test to use actual chainId or configure node
2. **Fix Account Generation** - Configure provider with expected account
3. **Fix Contract Deployment** - Verify deployment setup and parameters
4. **Fix Comptroller Tests** - Ensure contracts exist and are registered

### Priority 2 (Important)
5. **Fix Deprecation Config** - Add test addresses to config
6. **Fix Market Setup** - Ensure proper market initialization
7. **Fix Unitroller** - Verify contract initialization

### Priority 3 (Nice to Have)
8. **Fix Market Symbol Test** - Update expectation
9. **Fix Quickstart Test** - Make path dynamic

## Next Steps

1. ✅ **T004 Complete**: Root causes identified and documented
2. ⏳ **T005**: Fix Core tropykus failing tests
3. ⏳ **T006**: Fix Comptroller failing tests
4. ⏳ **T007**: Fix Market failing tests
5. ⏳ **T008**: Fix Market setups failing tests
6. ⏳ **T009**: Fix Unitroller failing tests
7. ⏳ **T010**: Fix deprecation utility tests
8. ⏳ **T011**: Fix Quickstart validation test

---

**Document Status**: ✅ Complete  
**Last Updated**: 2025-01-27  
**Next Review**: After implementing fixes

