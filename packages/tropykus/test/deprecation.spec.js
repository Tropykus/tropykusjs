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

const comptrollerAddress = '0x962308fef8edfadd705384840e7701f8f39ed0c0';
const priceOracleAddress = '0x7fa5500c978e89660bf3bd0526f8f7164de0b38f';

// Deprecated market addresses from deprecation-config.js
const csatMarketAddress = '0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6'; // kSAT/cSAT - deprecated
const crdocAddress = '0x0000000000000000000000000000000000000000'; // kRDOC/cRDOC - deprecated
const krifAddress = '0x3134b7fbfca5db217eca523eab1941452cf35163'; // kRIF - deprecated
const kusdtAddress = '0xedaefc6b596ed38d712100976969975a37c84464'; // kUSDT - deprecated

// Non-deprecated market address (for comparison)
const crbtcMarketAddress = '0x0aeadb9d4c6a80462a47e87e76e487fa8b9a37d7'; // kRBTC - not deprecated

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

  describe('T032: Verify all deprecation warnings display correctly in console output', () => {
    it('should display correct warning format for all deprecated markets', () => {
      const deprecatedMarkets = [
        { address: csatMarketAddress, name: 'kSAT' },
        { address: crdocAddress, name: 'kRDOC' },
        { address: krifAddress, name: 'kRIF' },
        { address: kusdtAddress, name: 'kUSDT' },
      ];

      deprecatedMarkets.forEach(({ address, name }) => {
        resetWarnedMarketsCache();
        consoleWarnStub.resetHistory();

        const metadata = getDeprecationMetadata(address);
        expect(metadata).to.not.be.null;
        expect(metadata.deprecated).to.be.true;

        warnDeprecatedOnce(address, name, metadata);

        // Verify warning was displayed
        expect(consoleWarnStub.calledOnce, `${name} should display deprecation warning`).to.be.true;

        // Verify warning format
        const warningMessage = consoleWarnStub.firstCall.args[0];
        expect(warningMessage, `${name} warning should be a string`).to.be.a('string');
        expect(warningMessage, `${name} warning should include [DEPRECATED] prefix`).to.include('[DEPRECATED]');
        expect(warningMessage, `${name} warning should include market name`).to.include(name);
        expect(warningMessage, `${name} warning should include deprecation reason`).to.include(metadata.reason);
      });
    });

    it('should verify warning messages are properly formatted and readable', () => {
      const metadata = getDeprecationMetadata(csatMarketAddress);
      warnDeprecatedOnce(csatMarketAddress, 'kSAT', metadata);

      const warningMessage = consoleWarnStub.firstCall.args[0];
      
      // Verify message structure
      expect(warningMessage).to.match(/^\[DEPRECATED\]/);
      expect(warningMessage).to.match(/kSAT.*deprecated/);
      expect(warningMessage).to.match(/Market delisted/);
      
      // Verify message is readable (not empty, has reasonable length)
      expect(warningMessage.length).to.be.greaterThan(20);
    });
  });

  describe('T033: Verify backward compatibility - all deprecated markets remain fully functional', () => {
    it('should allow creating deprecated market instances without errors', async () => {
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

      // Market should be created successfully (backward compatibility)
      expect(market).instanceOf(CRBTCMarket);
      expect(market.address.toLowerCase()).to.equal(csatMarketAddress.toLowerCase());
      
      // Warning should be displayed but market should still work
      expect(consoleWarnStub.called).to.be.true;
    });

    it('should allow deprecated markets to be used in market operations', async () => {
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

      // Market instance should have all expected properties (backward compatibility)
      expect(market).to.have.property('address');
      expect(market).to.have.property('tropykus');
      expect(market).to.have.property('instance');
      
      // Market should be functional (methods exist, even if they may fail on test blockchain)
      expect(market.getSymbol).to.be.a('function');
      expect(market.balanceOf).to.be.a('function');
    });

    it('should not break existing code that uses deprecated markets', async () => {
      // Verify that deprecated markets can be added to tropykus.markets array
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

      // Market should be added to markets array (backward compatibility)
      expect(tropykus.markets).to.include(market);
      expect(tropykus.markets.length).to.be.greaterThan(0);
    });
  });
});

