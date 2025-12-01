import { ethers } from 'ethers';
import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from '../src';
import CRBTCMarket from '../src/Markets/CRBTC.js';
import CRDOCMarket from '../src/Markets/CRDOC.js';
import { getDeprecationMetadata, warnDeprecatedOnce, resetWarnedMarketsCache } from '../src/utils/deprecation';
import CToken from '../src/Markets/CToken';

chai.use(chaiAsPromised);
const { expect } = chai;

const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';
const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';

// Deprecated market addresses from deprecation-config.js
const csatMarketAddress = '0xf8A2e7A2bfa135a81f0c78edD6252a818619E2c3'; // kSAT/cSAT - deprecated
const crdocAddress = '0x1a389e93be8ef2B5D105DEa44271d4426736A484'; // kRDOC/cRDOC - deprecated
const krifAddress = '0xd22de9a3f9d87e6bf58783e44b5453b3deacb0fe'; // kRIF - deprecated
const kusdtAddress = '0x3AC74a85B80824caa8cc9Dbae0DdcE584F3D3e8E'; // kUSDT - deprecated

// Non-deprecated market address (for comparison)
const crbtcMarketAddress = '0xE498D1E3A0d7fdb80a2d7591D997aFDA34F8c5C5'; // kRBTC - not deprecated

describe('Deprecation Warnings', () => {
  let tropykus;
  let dep;
  let consoleWarnStub;
  const sandbox = sinon.createSandbox();

  beforeEach(async () => {
    // Reset the warned markets cache before each test
    resetWarnedMarketsCache();
    
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const wsProvider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545');
    tropykus = new Tropykus(provider, wsProvider, 400000);
    dep = await tropykus.getAccount();
    await tropykus.setComptroller(dep, comptrollerAddress);
    tropykus.setPriceOracle(priceOracleAddress);

    // Stub console.warn to capture deprecation warnings
    consoleWarnStub = sandbox.stub(console, 'warn');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getDeprecationMetadata', () => {
    it('should return deprecation metadata for deprecated market addresses', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      expect(metadata).to.not.be.null;
      expect(metadata.deprecated).to.be.true;
      expect(metadata.reason).to.include('kSAT/cSAT');
    });

    it('should return null for non-deprecated market addresses', () => {
      const metadata = getDeprecationMetadata(crbtcMarketAddress);
      expect(metadata).to.be.null;
    });

    it('should handle case-insensitive address comparison', () => {
      const upperAddress = csatMarketAddress.toUpperCase();
      const metadata = getDeprecationMetadata(upperAddress);
      expect(metadata).to.not.be.null;
      expect(metadata.deprecated).to.be.true;
    });

    it('should return null for invalid or empty addresses', () => {
      expect(getDeprecationMetadata(null)).to.be.null;
      expect(getDeprecationMetadata('')).to.be.null;
      expect(getDeprecationMetadata('0xInvalid')).to.be.null;
    });
  });

  describe('warnDeprecatedOnce', () => {
    it('should display deprecation warning once per market instance', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      expect(metadata).to.not.be.null;

      // First call should display warning
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true;
      expect(consoleWarnStub.firstCall.args[0]).to.include('[DEPRECATED]');
      expect(consoleWarnStub.firstCall.args[0]).to.include('kSAT');
      expect(consoleWarnStub.firstCall.args[0]).to.include(metadata.reason);

      // Second call with same address should NOT display warning again
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true; // Still only called once
    });

    it('should display warning for different deprecated market instances', () => {
      const csatMetadata = getDeprecationMetadata(csatMarketAddress);
      const crdocMetadata = getDeprecationMetadata(crdocAddress);

      warnDeprecatedOnce(csatMarketAddress, 'kSAT', csatMetadata);
      expect(consoleWarnStub.calledOnce).to.be.true;

      warnDeprecatedOnce(crdocAddress, 'kRDOC', crdocMetadata);
      expect(consoleWarnStub.calledTwice).to.be.true;
    });

    it('should handle case-insensitive address caching', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      
      // First call with lowercase
      warnDeprecatedOnce(csatMarketAddress.toLowerCase(), 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true;

      // Second call with uppercase should not trigger another warning
      warnDeprecatedOnce(csatMarketAddress.toUpperCase(), 'kSAT', metadata);
      expect(consoleWarnStub.calledOnce).to.be.true; // Still only once
    });
  });

  describe('Market instantiation via addMarket()', () => {
    it('should display deprecation warning when adding deprecated CRBTC market (kSAT)', async () => {
      const market = await tropykus.addMarket(
        dep,
        'CRBTC',
        csatMarketAddress, // Deprecated kSAT address
        null,
        {
          comptrollerAddress,
          interestRateModelAddress: '0xD0Ed8135F9Ceb504A0484eEF9700D17622569Df2',
          initialExchangeRate: 0.02,
          name: 'kSAT',
          symbol: 'kSAT',
          decimals: 18,
        },
      );

      expect(market).instanceOf(CRBTCMarket);
      expect(market.address.toLowerCase()).to.equal(csatMarketAddress.toLowerCase());
      
      // This test should FAIL until T009 is implemented (addMarket should check deprecation)
      expect(consoleWarnStub.called).to.be.true;
      expect(consoleWarnStub.firstCall.args[0]).to.include('[DEPRECATED]');
    });

    it('should display deprecation warning when adding deprecated CRDOC market (kRDOC)', async () => {
      const rdocAddress = '0x301b50CD6E1a31c56122463aA306290baD3428cf';
      const market = await tropykus.addMarket(
        dep,
        'CRDOC',
        crdocAddress, // Deprecated kRDOC address
        rdocAddress,
        {
          comptrollerAddress,
          interestRateModelAddress: '0x46342D72503A41f797CC47D5B89C8Cc8F592f5a3',
          initialExchangeRate: 0.02,
          name: 'kRDOC',
          symbol: 'kRDOC',
          decimals: 18,
        },
      );

      expect(market).instanceOf(CRDOCMarket);
      expect(market.address.toLowerCase()).to.equal(crdocAddress.toLowerCase());
      
      // This test should FAIL until T009 is implemented (addMarket should check deprecation)
      expect(consoleWarnStub.called).to.be.true;
      expect(consoleWarnStub.firstCall.args[0]).to.include('[DEPRECATED]');
    });

    it('should NOT display deprecation warning when adding non-deprecated market', async () => {
      const market = await tropykus.addMarket(
        dep,
        'CRBTC',
        crbtcMarketAddress, // Non-deprecated kRBTC address
        null,
        {
          comptrollerAddress,
          interestRateModelAddress: '0x466BBE5C0368Ba75EBA90c2f4643c9DbC226B4d7',
          initialExchangeRate: 0.02,
          name: 'kRBTC',
          symbol: 'kRBTC',
          decimals: 18,
        },
      );

      expect(market).instanceOf(CRBTCMarket);
      expect(consoleWarnStub.called).to.be.false;
    });
  });

  describe('Market constructor deprecation warnings', () => {
    it('should display deprecation warning when creating CRBTC market with deprecated address', () => {
      const market = new CRBTCMarket(tropykus, csatMarketAddress);
      expect(market.address.toLowerCase()).to.equal(csatMarketAddress.toLowerCase());
      
      // This test should FAIL until T011 is implemented (CRBTC constructor should check deprecation)
      expect(consoleWarnStub.called).to.be.true;
      expect(consoleWarnStub.firstCall.args[0]).to.include('[DEPRECATED]');
    });

    it('should display deprecation warning when creating CRDOC market with deprecated address', () => {
      const rdocAddress = '0x301b50CD6E1a31c56122463aA306290baD3428cf';
      const market = new CRDOCMarket(tropykus, crdocAddress, rdocAddress);
      expect(market.address.toLowerCase()).to.equal(crdocAddress.toLowerCase());
      
      // This test should FAIL until T012 is implemented (CRDOC constructor should check deprecation)
      expect(consoleWarnStub.called).to.be.true;
      expect(consoleWarnStub.firstCall.args[0]).to.include('[DEPRECATED]');
    });

    it('should display deprecation warning when creating CToken market with deprecated address', () => {
      const underlyingAddress = '0x0000000000000000000000000000000000000001';
      const market = new CToken(tropykus, kusdtAddress, underlyingAddress);
      expect(market.address.toLowerCase()).to.equal(kusdtAddress.toLowerCase());
      
      // This test should FAIL until T014 is implemented (CToken constructor should check deprecation)
      expect(consoleWarnStub.called).to.be.true;
      expect(consoleWarnStub.firstCall.args[0]).to.include('[DEPRECATED]');
    });
  });

  describe('Warning display once per instance', () => {
    it('should display warning only once when same market instance is used multiple times', async () => {
      const market = await tropykus.addMarket(
        dep,
        'CRBTC',
        csatMarketAddress,
        null,
        {
          comptrollerAddress,
          interestRateModelAddress: '0xD0Ed8135F9Ceb504A0484eEF9700D17622569Df2',
          initialExchangeRate: 0.02,
          name: 'kSAT',
          symbol: 'kSAT',
          decimals: 18,
        },
      );

      expect(market).instanceOf(CRBTCMarket);
      
      // Verify warning displayed once during addMarket()
      expect(consoleWarnStub.calledOnce).to.be.true;
      expect(consoleWarnStub.firstCall.args[0]).to.include('[DEPRECATED]');
      
      // Verify no additional warnings on subsequent operations
      // Note: The cache ensures no additional warnings even if we create another instance
      // with the same address. The cache is tested in unit tests (T008).
      const initialCallCount = consoleWarnStub.callCount;
      
      // Try to call a method on the market - should not trigger another warning
      // (wrapped in try-catch in case contract doesn't exist on test blockchain)
      try {
        await market.getSymbol();
      } catch (error) {
        // Contract method may fail if contract doesn't exist, but that's okay
        // The important part is that no additional warnings were triggered
      }
      
      expect(consoleWarnStub.callCount).to.equal(initialCallCount); // No new warnings
    });
  });
});

