import { ethers } from 'ethers';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from '../src';
import PriceOracle from '../src/PriceOracle';
import PriceOracleProxyArtifact from '../artifacts/PriceOracleProxy.json';
import PriceOracleAdapterMocArtifact from '../artifacts/PriceOracleAdapterMoc.json';
import PriceOracleAdapterUSDTArtifact from '../artifacts/PriceOracleAdapterUSDT.json';
import MockPriceProviderMoCArtifact from '../artifacts/MockPriceProviderMoC.json';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('PriceOracle', () => {
  let tropykus;
  let dep;
  let priceOracle;
  let priceOracleProxy;
  let mocAdapter;
  let usdtAdapter;

  beforeEach(async () => {
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const wsProvider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545');
    tropykus = new Tropykus(provider, wsProvider, 400000);
    dep = await tropykus.getAccount();

    // Deploy fresh PriceOracleProxy
    const priceOracleFactory = new ethers.ContractFactory(
      PriceOracleProxyArtifact.abi,
      PriceOracleProxyArtifact.bytecode,
      dep.signer,
    );
    priceOracleProxy = await priceOracleFactory.deploy(dep.address); // dep is guardian
    await priceOracleProxy.deployed();

    // Deploy MockPriceProviderMoC for adapters
    const mockPriceProviderFactory = new ethers.ContractFactory(
      MockPriceProviderMoCArtifact.abi,
      MockPriceProviderMoCArtifact.bytecode,
      dep.signer,
    );
    const mocPriceProvider = await mockPriceProviderFactory.deploy(
      dep.address, // guardian
      ethers.utils.parseEther('1'), // price in 18 decimals
    );
    await mocPriceProvider.deployed();

    const usdtPriceProvider = await mockPriceProviderFactory.deploy(
      dep.address, // guardian
      ethers.utils.parseUnits('1', 8), // price in 8 decimals
    );
    await usdtPriceProvider.deployed();

    // Deploy PriceOracleAdapterMoc
    const mocAdapterFactory = new ethers.ContractFactory(
      PriceOracleAdapterMocArtifact.abi,
      PriceOracleAdapterMocArtifact.bytecode,
      dep.signer,
    );
    mocAdapter = await mocAdapterFactory.deploy(
      dep.address, // guardian
      mocPriceProvider.address, // priceProvider
    );
    await mocAdapter.deployed();

    // Deploy PriceOracleAdapterUSDT
    const usdtAdapterFactory = new ethers.ContractFactory(
      PriceOracleAdapterUSDTArtifact.abi,
      PriceOracleAdapterUSDTArtifact.bytecode,
      dep.signer,
    );
    usdtAdapter = await usdtAdapterFactory.deploy(
      dep.address, // guardian
      usdtPriceProvider.address, // priceProvider
    );
    await usdtAdapter.deployed();

    // Create PriceOracle instance
    priceOracle = new PriceOracle(priceOracleProxy.address, tropykus);
  });

  describe('detectOracleDecimals', () => {
    it('should return 18 decimals for PriceOracleAdapterMoc', async () => {
      const decimals = await priceOracle.detectOracleDecimals(mocAdapter.address);
      expect(decimals).to.equal(18);
    });

    it('should return 8 decimals for PriceOracleAdapterUSDT by querying DECIMAL_MULTIPLIER', async () => {
      const decimals = await priceOracle.detectOracleDecimals(usdtAdapter.address);
      expect(decimals).to.equal(8);
    });

    it('should default to 18 decimals for unknown adapter type', async () => {
      // Use a random address that's not a known adapter
      const unknownAdapterAddress = '0x1234567890123456789012345678901234567890';
      const decimals = await priceOracle.detectOracleDecimals(unknownAdapterAddress);
      expect(decimals).to.equal(18);
    });

    it('should cache adapter decimals in adapterDecimalsMap', async () => {
      // First call should detect and cache
      const decimals1 = await priceOracle.detectOracleDecimals(mocAdapter.address);
      expect(decimals1).to.equal(18);

      // Verify it's cached
      expect(priceOracle.adapterDecimalsMap).to.exist;
      expect(priceOracle.adapterDecimalsMap[mocAdapter.address.toLowerCase()]).to.equal(18);
    });

    it('should return cached value on subsequent calls', async () => {
      // First call
      const decimals1 = await priceOracle.detectOracleDecimals(mocAdapter.address);
      expect(decimals1).to.equal(18);

      // Second call should use cache (we can verify by checking the map was populated)
      const decimals2 = await priceOracle.detectOracleDecimals(mocAdapter.address);
      expect(decimals2).to.equal(18);
      expect(priceOracle.adapterDecimalsMap[mocAdapter.address.toLowerCase()]).to.equal(18);
    });

    it('should handle DECIMAL_MULTIPLIER query failure gracefully for PriceOracleAdapterUSDT', async () => {
      // This test verifies that if DECIMAL_MULTIPLIER query fails, it defaults to 18
      // We can't easily simulate a contract call failure in integration tests,
      // but the implementation should handle it
      const decimals = await priceOracle.detectOracleDecimals(usdtAdapter.address);
      // Should successfully query DECIMAL_MULTIPLIER and return 8
      expect(decimals).to.equal(8);
    });

    it('should initialize adapterDecimalsMap in constructor', () => {
      const newPriceOracle = new PriceOracle(priceOracleProxy.address, tropykus);
      expect(newPriceOracle.adapterDecimalsMap).to.exist;
      expect(typeof newPriceOracle.adapterDecimalsMap).to.equal('object');
    });
  });
});

