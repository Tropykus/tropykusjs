# Quickstart: Deprecate Delisted Markets

**Feature**: Deprecate Delisted Markets  
**Date**: 2025-12-01  
**Phase**: 1 - Design & Contracts

## Overview

This quickstart guide demonstrates how to implement market deprecation in the Tropykus SDK. It covers the key components and patterns needed to mark delisted markets as deprecated in both code and documentation.

## Implementation Steps

### Step 1: Create Deprecation Configuration

Create a centralized configuration file for deprecated markets:

**File**: `packages/tropykus/src/deprecation-config.js`

```javascript
/**
 * Configuration for deprecated markets
 * Update this file when markets are delisted
 * 
 * Note: Deprecation is address-based, not artifact-based, because the same
 * artifact type can be used for both listed and deprecated markets.
 * For example, CRBTC is used for both kRBTC (listed) and kSAT (deprecated).
 */
export const DEPRECATED_MARKETS = {
  addresses: {
    // kSAT/cSAT market address (uses CRBTC artifact)
    '0xf2250c3d8e81a562f55e4a207c218d50c62db087': {
      deprecated: true,
      reason: 'Market delisted from protocol (kSAT/cSAT)'
    },
    // kRDOC/cRDOC market address (uses CRDOC artifact)
    '0x0981eb51a91e6f89063c963438cadf16c2e44962': {
      deprecated: true,
      reason: 'Market delisted from protocol (kRDOC/cRDOC)'
    },
    // kRIF market address (uses CErc20Immutable artifact)
    '0xd22de9a3f9d87e6bf58783e44b5453b3deacb0fe': {
      deprecated: true,
      reason: 'Market delisted from protocol (kRIF)'
    },
    // kUSDT market address (uses CErc20Immutable artifact)
    '0x495be6b6d8f35748bb8fe657f884f84342043733': {
      deprecated: true,
      reason: 'Market delisted from protocol (kUSDT)'
    }
    // Add more deprecated addresses as needed
  }
};
```

### Step 2: Create Deprecation Utility Functions

Create utility functions for deprecation warnings:

**File**: `packages/tropykus/src/utils/deprecation.js`

```javascript
import { DEPRECATED_MARKETS } from '../deprecation-config.js';

// Cache to track which markets have already been warned
const warnedMarkets = new Set();

/**
 * Get deprecation metadata for a market by address
 * @param {string} address - Market contract address (required)
 * @returns {Object|null} Deprecation metadata or null if not deprecated
 */
export function getDeprecationMetadata(address) {
  if (!address) {
    return null;
  }
  const lowerAddress = address.toLowerCase();
  return DEPRECATED_MARKETS.addresses[lowerAddress] || null;
}

/**
 * Display deprecation warning (called once per market type)
 * @param {string} marketName - Name of the deprecated market
 * @param {Object} metadata - Deprecation metadata
 */
export function warnDeprecated(marketName, metadata) {
  let message = `[DEPRECATED] ${marketName} is deprecated. ${metadata.reason}`;
  if (metadata.alternative) {
    message += ` Use ${metadata.alternative} instead.`;
  }
  if (metadata.since) {
    message += ` Deprecated since ${metadata.since}.`;
  }
  console.warn(message);
}

/**
 * Warn about deprecated market (only once per market instance)
 * @param {string} marketAddress - Market contract address (used as unique key)
 * @param {string} marketName - Display name of the market
 * @param {Object} metadata - Deprecation metadata
 */
export function warnDeprecatedOnce(marketAddress, marketName, metadata) {
  const lowerAddress = marketAddress.toLowerCase();
  if (!warnedMarkets.has(lowerAddress)) {
    warnDeprecated(marketName, metadata);
    warnedMarkets.add(lowerAddress);
  }
}
```

### Step 3: Update Market Classes with Deprecation

Add deprecation checks to market constructors:

**Example**: `packages/tropykus/src/Markets/CRBTC.js`

```javascript
import Market from '../Market.js';
import { getDeprecationMetadata, warnDeprecatedOnce } from '../utils/deprecation.js';

/**
 * CRBTC Market implementation
 * 
 * @deprecated Since v0.3.0. This market has been delisted from the protocol.
 * @see Use kRBTC market instead.
 */
export default class CRBTC extends Market {
  constructor(tropykus, marketAddress) {
    super(tropykus, CRBTCArtifact.abi, marketAddress);
    
    // Check and warn if deprecated (by address, not artifact)
    const metadata = getDeprecationMetadata(this.address);
    if (metadata) {
      warnDeprecatedOnce(this.address, 'CRBTC', metadata);
    }
  }
  
  // ... rest of class implementation ...
}
```

### Step 4: Update Tropykus.addMarket() Method

Add deprecation check to the main market creation method:

**File**: `packages/tropykus/src/index.js`

```javascript
import { getDeprecationMetadata, warnDeprecatedOnce } from './utils/deprecation.js';

export default class Tropykus {
  // ... existing code ...
  
  async addMarket(account, artifact, marketAddress = null, erc20TokenAddress = null, args = {}) {
    // ... existing market creation logic ...
    
    // After market is created, check address deprecation
    if (marketAddress) {
      const addressMetadata = getDeprecationMetadata(marketAddress);
      if (addressMetadata) {
        warnDeprecatedOnce(marketAddress, artifact, addressMetadata);
      }
    }
    
    // ... rest of method unchanged ...
  }
}
```

### Step 5: Update Documentation

Update README.md to mark deprecated markets:

**File**: `README.md`

```markdown
## Markets

### Active Markets

- **kRBTC**: RBTC market (recommended)
- **kDOC**: DOC market
- **kUSDT**: USDT market

### Deprecated Markets

> ⚠️ **Deprecated**: The following markets have been delisted and are no longer recommended for new integrations.

- **CRBTC** (deprecated since v0.3.0): Use kRBTC instead
  - Reason: Market delisted from protocol on 2025-11-01
  - Removal planned: v1.0.0 (2026-12-01)

**For cRBTC (deprecated):**
```javascript
// ⚠️ DEPRECATED: Use kRBTC instead
const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);
```
```

### Step 6: Add Tests

Create tests to verify deprecation warnings:

**File**: `packages/tropykus/test/deprecation.spec.js`

```javascript
import { expect } from 'chai';
import sinon from 'sinon';
import Tropykus from '../src';
import { getDeprecationMetadata, warnDeprecatedOnce } from '../src/utils/deprecation.js';

describe('Market Deprecation', () => {
  let consoleWarnStub;
  
  beforeEach(() => {
    consoleWarnStub = sinon.stub(console, 'warn');
  });
  
  afterEach(() => {
    consoleWarnStub.restore();
  });
  
  it('should return deprecation metadata for deprecated artifact', () => {
    const metadata = getDeprecationMetadata('CRBTC');
    expect(metadata).to.not.be.null;
    expect(metadata.deprecated).to.be.true;
  });
  
  it('should display warning when creating deprecated market', async () => {
    const tropykus = new Tropykus(provider, wsProvider, 400000);
    await tropykus.addMarket(account, 'CRBTC', true, crbtcAddress);
    
    expect(consoleWarnStub.calledOnce).to.be.true;
    expect(consoleWarnStub.firstCall.args[0]).to.include('[DEPRECATED]');
    expect(consoleWarnStub.firstCall.args[0]).to.include('CRBTC');
  });
  
  it('should only warn once per market type', async () => {
    const tropykus = new Tropykus(provider, wsProvider, 400000);
    
    // Create multiple instances
    await tropykus.addMarket(account, 'CRBTC', true, crbtcAddress1);
    await tropykus.addMarket(account, 'CRBTC', true, crbtcAddress2);
    
    // Should only warn once
    expect(consoleWarnStub.callCount).to.equal(1);
  });
});
```

## Validation Checklist

After implementation, verify:

- [ ] Deprecation warnings display when creating deprecated markets
- [ ] Warnings only appear once per market type
- [ ] Deprecated markets remain fully functional
- [ ] JSDoc @deprecated tags appear in generated documentation
- [ ] README.md clearly marks deprecated markets
- [ ] All code examples in docs use supported markets or show deprecation warnings
- [ ] Tests verify deprecation behavior
- [ ] No breaking changes introduced

## Next Steps

1. Identify which markets are actually delisted (coordinate with protocol team)
2. Update `deprecation-config.js` with actual delisted markets
3. Mark corresponding market classes with @deprecated JSDoc tags
4. Update README.md with deprecation notices
5. Run tests to verify deprecation warnings work correctly
6. Update CHANGELOG.md with deprecation information

