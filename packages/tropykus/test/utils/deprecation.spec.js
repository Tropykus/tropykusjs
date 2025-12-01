import chai from 'chai';
import sinon from 'sinon';
import { getDeprecationMetadata, warnDeprecatedOnce, resetWarnedMarketsCache } from '../../src/utils/deprecation';

const { expect } = chai;

// Deprecated market addresses from deprecation-config.js (lowercase)
const csatMarketAddress = '0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6'; // kSAT/cSAT - deprecated
const crdocAddress = '0x0000000000000000000000000000000000000000'; // kRDOC/cRDOC - deprecated
const krifAddress = '0x3134b7fbfca5db217eca523eab1941452cf35163'; // kRIF - deprecated
const kusdtAddress = '0xedaefc6b596ed38d712100976969975a37c84464'; // kUSDT - deprecated

// Non-deprecated market address (for comparison)
const crbtcMarketAddress = '0xE498D1E3A0d7fdb80a2d7591D997aFDA34F8c5C5'; // kRBTC - not deprecated

describe('getDeprecationMetadata', () => {
  describe('should return deprecation metadata for deprecated addresses', () => {
    it('should return metadata for kSAT/cSAT market address (lowercase)', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      expect(metadata).to.not.be.null;
      expect(metadata).to.be.an('object');
      expect(metadata.deprecated).to.be.true;
      expect(metadata.reason).to.equal('Market delisted from protocol (kSAT/cSAT)');
    });

    it('should return metadata for kSAT/cSAT market address (mixed case)', () => {
      const mixedCaseAddress = '0xd2Ec53E8Dd00D204D3d9313Af5474Eb9F5188Ef6';
      const metadata = getDeprecationMetadata(mixedCaseAddress);
      expect(metadata).to.not.be.null;
      expect(metadata.deprecated).to.be.true;
      expect(metadata.reason).to.include('kSAT/cSAT');
    });

    it('should return metadata for kSAT/cSAT market address (uppercase)', () => {
      const upperCaseAddress = csatMarketAddress.toUpperCase();
      const metadata = getDeprecationMetadata(upperCaseAddress);
      expect(metadata).to.not.be.null;
      expect(metadata.deprecated).to.be.true;
      expect(metadata.reason).to.include('kSAT/cSAT');
    });

    it('should return metadata for kRDOC/cRDOC market address', () => {
      const metadata = getDeprecationMetadata(crdocAddress);
      expect(metadata).to.not.be.null;
      expect(metadata.deprecated).to.be.true;
      expect(metadata.reason).to.equal('Market delisted from protocol (kRDOC/cRDOC)');
    });

    it('should return metadata for kRIF market address', () => {
      const metadata = getDeprecationMetadata(krifAddress);
      expect(metadata).to.not.be.null;
      expect(metadata.deprecated).to.be.true;
      expect(metadata.reason).to.equal('Market delisted from protocol (kRIF)');
    });

    it('should return metadata for kUSDT market address', () => {
      const metadata = getDeprecationMetadata(kusdtAddress);
      expect(metadata).to.not.be.null;
      expect(metadata.deprecated).to.be.true;
      expect(metadata.reason).to.equal('Market delisted from protocol (kUSDT)');
    });
  });

  describe('should return null for non-deprecated addresses', () => {
    it('should return null for non-deprecated kRBTC address (lowercase)', () => {
      const metadata = getDeprecationMetadata(crbtcMarketAddress.toLowerCase());
      expect(metadata).to.be.null;
    });

    it('should return null for non-deprecated kRBTC address (mixed case)', () => {
      const metadata = getDeprecationMetadata(crbtcMarketAddress);
      expect(metadata).to.be.null;
    });

    it('should return null for non-deprecated kRBTC address (uppercase)', () => {
      const metadata = getDeprecationMetadata(crbtcMarketAddress.toUpperCase());
      expect(metadata).to.be.null;
    });

    it('should return null for arbitrary non-deprecated address', () => {
      const arbitraryAddress = '0x1234567890123456789012345678901234567890';
      const metadata = getDeprecationMetadata(arbitraryAddress);
      expect(metadata).to.be.null;
    });
  });

  describe('should handle invalid or edge case inputs', () => {
    it('should return null for null input', () => {
      const metadata = getDeprecationMetadata(null);
      expect(metadata).to.be.null;
    });

    it('should return null for undefined input', () => {
      const metadata = getDeprecationMetadata(undefined);
      expect(metadata).to.be.null;
    });

    it('should return null for empty string', () => {
      const metadata = getDeprecationMetadata('');
      expect(metadata).to.be.null;
    });

    it('should return null for whitespace-only string', () => {
      const metadata = getDeprecationMetadata('   ');
      expect(metadata).to.be.null;
    });

    it('should return null for invalid address format (too short)', () => {
      const metadata = getDeprecationMetadata('0x123');
      expect(metadata).to.be.null;
    });

    it('should return null for invalid address format (no 0x prefix)', () => {
      const metadata = getDeprecationMetadata('d2ec53e8dd00d204d3d9313af5474eb9f5188ef6');
      expect(metadata).to.be.null;
    });

    it('should return null for invalid address format (non-hex characters)', () => {
      const metadata = getDeprecationMetadata('0xd2ec53e8dd00d204d3d9313af5474eb9f5188efG');
      expect(metadata).to.be.null;
    });
  });

  describe('should handle case-insensitive address comparison', () => {
    it('should return same metadata regardless of address case', () => {
      const lowerMetadata = getDeprecationMetadata(csatMarketAddress.toLowerCase());
      const upperMetadata = getDeprecationMetadata(csatMarketAddress.toUpperCase());
      const mixedMetadata = getDeprecationMetadata('0xd2Ec53E8Dd00D204D3d9313Af5474Eb9F5188Ef6');

      expect(lowerMetadata).to.not.be.null;
      expect(upperMetadata).to.not.be.null;
      expect(mixedMetadata).to.not.be.null;

      // All should have the same content
      expect(lowerMetadata.deprecated).to.equal(upperMetadata.deprecated);
      expect(lowerMetadata.reason).to.equal(upperMetadata.reason);
      expect(lowerMetadata.reason).to.equal(mixedMetadata.reason);
    });
  });

  describe('should return correct metadata structure', () => {
    it('should return object with deprecated and reason properties', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      expect(metadata).to.have.property('deprecated');
      expect(metadata).to.have.property('reason');
      expect(metadata.deprecated).to.be.a('boolean');
      expect(metadata.reason).to.be.a('string');
    });

    it('should have deprecated set to true for deprecated markets', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      expect(metadata.deprecated).to.be.true;
    });

    it('should have non-empty reason string for deprecated markets', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      expect(metadata.reason).to.be.a('string');
      expect(metadata.reason.length).to.be.greaterThan(0);
    });
  });
});

describe('warnDeprecatedOnce', () => {
  let consoleWarnStub;
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    // Reset the cache before each test to ensure clean state
    resetWarnedMarketsCache();
    // Stub console.warn to capture deprecation warnings
    consoleWarnStub = sandbox.stub(console, 'warn');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('should display warning on first call', () => {
    it('should call console.warn on first call with deprecated address', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      expect(metadata).to.not.be.null;

      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);

      expect(consoleWarnStub.calledOnce).to.be.true;
      expect(consoleWarnStub.firstCall.args[0]).to.include('[DEPRECATED]');
      expect(consoleWarnStub.firstCall.args[0]).to.include('kSAT');
      expect(consoleWarnStub.firstCall.args[0]).to.include(metadata.reason);
    });

    it('should format warning message correctly', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);

      const warningMessage = consoleWarnStub.firstCall.args[0];
      expect(warningMessage).to.be.a('string');
      expect(warningMessage).to.match(/^\[DEPRECATED\]/);
      expect(warningMessage).to.include('kSAT is deprecated');
    });
  });

  describe('should cache warnings and not display on subsequent calls', () => {
    it('should only display warning once per address', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);

      // First call should display warning
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true;

      // Second call with same address should NOT display warning
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true; // Still only called once

      // Third call should also NOT display warning
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true; // Still only called once
    });

    it('should cache multiple calls with same address', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);

      // Make multiple calls
      for (let i = 0; i < 5; i += 1) {
        warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      }

      // Should only be called once
      expect(consoleWarnStub.callCount).to.equal(1);
    });
  });

  describe('should display separate warnings for different addresses', () => {
    it('should display warning for each unique deprecated address', () => {
      const csatMetadata = getDeprecationMetadata(csatMarketAddress);
      const crdocMetadata = getDeprecationMetadata(crdocAddress);
      const krifMetadata = getDeprecationMetadata(krifAddress);

      warnDeprecatedOnce(csatMarketAddress, 'kSAT', csatMetadata);
      expect(consoleWarnStub.calledOnce).to.be.true;

      warnDeprecatedOnce(crdocAddress, 'kRDOC', crdocMetadata);
      expect(consoleWarnStub.calledTwice).to.be.true;

      warnDeprecatedOnce(krifAddress, 'kRIF', krifMetadata);
      expect(consoleWarnStub.calledThrice).to.be.true;
    });

    it('should cache each address independently', () => {
      const csatMetadata = getDeprecationMetadata(csatMarketAddress);
      const crdocMetadata = getDeprecationMetadata(crdocAddress);

      // First call for each address
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', csatMetadata);
      warnDeprecatedOnce(crdocAddress, 'kRDOC', crdocMetadata);
      expect(consoleWarnStub.callCount).to.equal(2);

      // Second call for each address should not trigger warnings
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', csatMetadata);
      warnDeprecatedOnce(crdocAddress, 'kRDOC', crdocMetadata);
      expect(consoleWarnStub.callCount).to.equal(2); // Still only 2 calls
    });
  });

  describe('should handle case-insensitive address caching', () => {
    it('should treat addresses with different cases as the same address', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);

      // First call with lowercase
      warnDeprecatedOnce(csatMarketAddress.toLowerCase(), 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true;

      // Second call with uppercase should NOT trigger another warning
      warnDeprecatedOnce(csatMarketAddress.toUpperCase(), 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true; // Still only once
    });

    it('should cache address regardless of case variation', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      
      // Call with different case variations
      warnDeprecatedOnce(csatMarketAddress.toLowerCase(), 'kSAT', metadata);
      warnDeprecatedOnce(csatMarketAddress.toUpperCase(), 'kSAT', metadata);
      warnDeprecatedOnce('0xd2Ec53E8Dd00D204D3d9313Af5474Eb9F5188Ef6', 'kSAT', metadata);

      // Should only warn once
      expect(consoleWarnStub.callCount).to.equal(1);
    });
  });

  describe('should handle cache reset', () => {
    it('should allow warning again after cache reset', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);

      // First call
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true;

      // Second call should not warn (cached)
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true;

      // Reset cache
      resetWarnedMarketsCache();

      // Third call after reset should warn again
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      expect(consoleWarnStub.calledTwice).to.be.true;
    });

    it('should reset all cached addresses', () => {
      const csatMetadata = getDeprecationMetadata(csatMarketAddress);
      const crdocMetadata = getDeprecationMetadata(crdocAddress);

      // Warn for both addresses
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', csatMetadata);
      warnDeprecatedOnce(crdocAddress, 'kRDOC', crdocMetadata);
      expect(consoleWarnStub.callCount).to.equal(2);

      // Reset cache
      resetWarnedMarketsCache();

      // Both should warn again after reset
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', csatMetadata);
      warnDeprecatedOnce(crdocAddress, 'kRDOC', crdocMetadata);
      expect(consoleWarnStub.callCount).to.equal(4);
    });
  });

  describe('should handle edge cases', () => {
    it('should handle calls with same address but different metadata', () => {
      const metadata1 = getDeprecationMetadata(csatMarketAddress);
      const metadata2 = { ...metadata1, reason: 'Different reason' };

      // First call
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata1);
      expect(consoleWarnStub.calledOnce).to.be.true;

      // Second call with different metadata but same address should not warn
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata2);
      expect(consoleWarnStub.calledOnce).to.be.true; // Still only once (cached by address)
    });

    it('should handle calls with same address but different market names', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);

      // First call
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true;

      // Second call with different name but same address should not warn
      warnDeprecatedOnce(csatMarketAddress, 'cSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true; // Still only once (cached by address)
    });
  });

  describe('should work correctly with getDeprecationMetadata integration', () => {
    it('should work with metadata from getDeprecationMetadata', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      expect(metadata).to.not.be.null;

      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true;
      expect(consoleWarnStub.firstCall.args[0]).to.include(metadata.reason);
    });

    it('should handle all deprecated markets from config', () => {
      const addresses = [csatMarketAddress, crdocAddress, krifAddress, kusdtAddress];
      const names = ['kSAT', 'kRDOC', 'kRIF', 'kUSDT'];

      addresses.forEach((address, index) => {
        const metadata = getDeprecationMetadata(address);
        expect(metadata).to.not.be.null;
        warnDeprecatedOnce(address, names[index], metadata);
      });

      // Should warn for each unique address
      expect(consoleWarnStub.callCount).to.equal(4);
    });
  });
});

