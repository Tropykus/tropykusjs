import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { ethers } from 'ethers';
import PriceOracle from '../src/PriceOracle';
import PriceOracleAdapterMocArtifact from '../artifacts/PriceOracleAdapterMoc.json';
import PriceOracleAdapterUSDTArtifact from '../artifacts/PriceOracleAdapterUSDT.json';
import PriceOracleProxyArtifact from '../artifacts/PriceOracleProxy.json';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('PriceOracle - Oracle Decimal Detection', () => {
  let provider;
  let tropykus;
  let priceOracle;
  let mockTropykus;
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    
    // Create mock Tropykus object
    mockTropykus = {
      provider,
      wsProvider: provider,
    };

    const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';
    priceOracle = new PriceOracle(priceOracleAddress, mockTropykus);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('adapterDecimalsMap initialization', () => {
    it('should initialize adapterDecimalsMap as empty Map in constructor', () => {
      expect(priceOracle.adapterDecimalsMap).to.be.instanceOf(Map);
      expect(priceOracle.adapterDecimalsMap.size).to.equal(0);
    });
  });

  describe('detectOracleDecimals', () => {
    let originalContract;

    beforeEach(() => {
      originalContract = ethers.Contract;
    });

    it('should return 8 decimals for PriceOracleAdapterMoc (no DECIMAL_MULTIPLIER)', async () => {
      const mocAdapterAddress = '0x1234567890123456789012345678901234567890';
      
      // Create mock adapter contract - Moc doesn't have DECIMAL_MULTIPLIER
      const mockMocAdapter = {
        address: mocAdapterAddress,
        callStatic: {
          DECIMAL_MULTIPLIER: sandbox.stub().rejects(new Error('function not found')),
        },
      };

      // Stub the contract creation to return our mock
      sandbox.stub(ethers, 'Contract').callsFake((address, abi, provider) => {
        if (address.toLowerCase() === mocAdapterAddress.toLowerCase() && 
            abi === PriceOracleAdapterUSDTArtifact.abi) {
          return mockMocAdapter;
        }
        return new originalContract(address, abi, provider);
      });

      const decimals = await priceOracle.detectOracleDecimals(mocAdapterAddress);
      expect(decimals).to.equal(8);
    });

    it('should query DECIMAL_MULTIPLIER and return 8 decimals for PriceOracleAdapterUSDT', async () => {
      const usdtAdapterAddress = '0x9876543210987654321098765432109876543210';
      
      // DECIMAL_MULTIPLIER = 1e20 (from bytecode: 69021e19e0c9bab2400000)
      // This indicates 8-decimal oracle
      const decimalMultiplier = ethers.BigNumber.from('100000000000000000000'); // 1e20
      
      const mockUsdtAdapter = {
        address: usdtAdapterAddress,
        callStatic: {
          DECIMAL_MULTIPLIER: sandbox.stub().resolves(decimalMultiplier),
        },
      };

      sandbox.stub(ethers, 'Contract').callsFake((address, abi, provider) => {
        if (address.toLowerCase() === usdtAdapterAddress.toLowerCase() && 
            abi === PriceOracleAdapterUSDTArtifact.abi) {
          return mockUsdtAdapter;
        }
        return new originalContract(address, abi, provider);
      });

      const decimals = await priceOracle.detectOracleDecimals(usdtAdapterAddress);
      expect(decimals).to.equal(8);
    });

    it('should return 8 decimals when DECIMAL_MULTIPLIER query fails (Moc adapter)', async () => {
      const mocAdapterAddress = '0x1234567890123456789012345678901234567890';
      
      // Moc adapter - DECIMAL_MULTIPLIER doesn't exist, should return 8
      const mockMocAdapter = {
        address: mocAdapterAddress,
        callStatic: {
          DECIMAL_MULTIPLIER: sandbox.stub().rejects(new Error('function not found')),
        },
      };

      sandbox.stub(ethers, 'Contract').callsFake((address, abi, provider) => {
        if (address.toLowerCase() === mocAdapterAddress.toLowerCase() && 
            abi === PriceOracleAdapterUSDTArtifact.abi) {
          return mockMocAdapter;
        }
        return new originalContract(address, abi, provider);
      });

      const decimals = await priceOracle.detectOracleDecimals(mocAdapterAddress);
      expect(decimals).to.equal(8);
    });

    it('should cache decimals value in adapterDecimalsMap', async () => {
      const mocAdapterAddress = '0x1234567890123456789012345678901234567890';
      
      const mockMocAdapter = {
        address: mocAdapterAddress,
        callStatic: {
          DECIMAL_MULTIPLIER: sandbox.stub().rejects(new Error('function not found')),
        },
      };

      sandbox.stub(ethers, 'Contract').callsFake((address, abi, provider) => {
        if (address.toLowerCase() === mocAdapterAddress.toLowerCase() && 
            abi === PriceOracleAdapterUSDTArtifact.abi) {
          return mockMocAdapter;
        }
        return new originalContract(address, abi, provider);
      });

      // First call
      const decimals1 = await priceOracle.detectOracleDecimals(mocAdapterAddress);
      expect(decimals1).to.equal(8);
      expect(priceOracle.adapterDecimalsMap.has(mocAdapterAddress.toLowerCase())).to.be.true;
      expect(priceOracle.adapterDecimalsMap.get(mocAdapterAddress.toLowerCase())).to.equal(8);

      // Second call should use cache (no new contract call)
      const decimals2 = await priceOracle.detectOracleDecimals(mocAdapterAddress);
      expect(decimals2).to.equal(8);
      expect(priceOracle.adapterDecimalsMap.get(mocAdapterAddress.toLowerCase())).to.equal(8);
    });

    it('should handle contract creation failure and default to 18', async () => {
      const unknownAdapterAddress = '0x1111111111111111111111111111111111111111';
      
      // Make contract creation fail
      sandbox.stub(ethers, 'Contract').throws(new Error('Contract creation failed'));

      const consoleWarnStub = sandbox.stub(console, 'warn');

      const decimals = await priceOracle.detectOracleDecimals(unknownAdapterAddress);
      expect(decimals).to.equal(18);
      expect(consoleWarnStub.called).to.be.true;
    });
  });
});

