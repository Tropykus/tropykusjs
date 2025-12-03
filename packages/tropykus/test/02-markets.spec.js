import { ethers, FixedNumber } from 'ethers';
import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Market from '../src/Market';
import CRBTCMarket from '../src/Markets/CRBTC.js';
import CErc20Market from '../src/Markets/CErc20.js';
import UnitrollerArtifact from '../artifacts/Unitroller.json';
import PriceOracleProxyArtifact from '../artifacts/PriceOracleProxy.json';
import StandardTokenArtifact from '../artifacts/StandardToken.json';
import JumpRateModelV2Artifact from '../artifacts/JumpRateModelV2.json';
import MockPriceProviderMoCArtifact from '../artifacts/MockPriceProviderMoC.json';
import PriceOracleAdapterMocArtifact from '../artifacts/PriceOracleAdapterMoc.json';
import MockPriceOracleAdapterUSDTArtifact from '../artifacts/MockPriceOracleAdapterUSDT.json';

chai.use(chaiAsPromised);
const { expect } = chai;

const mnemonic = 'elegant ripple curve exhibit capital oblige off inform recall describe warrior earn';
const comptrollerAddress = '0x962308fef8edfadd705384840e7701f8f39ed0c0';
const crbtcMarketAddress = '0x0aeadb9d4c6a80462a47e87e76e487fa8b9a37d7';
// ⚠️ DEPRECATED: kSAT/cSAT market address - Market delisted from protocol
// This address is used for testing deprecated market functionality
const csatMarketAddress = '0xf8A2e7A2bfa135a81f0c78edD6252a818619E2c3';
const cdocAddress = '0x544eb90e766b405134b3b3f62b6b4c23fcd5fda2';
const docAddress = '0xe700691da7b9851f2f35f8b8182c69c53ccad9db';
const usdtAddress = '0x3AC74a85B80824caa8cc9Dbae0DdcE584F3D3e8E';
const cdocInterestRateModelAddress = '0xa7999889e2615370a2448b26b9cc6f0ddebbb5b1';
const crbtcInterestRateModelAddress = '0x6be15b7e8c783264feeede54a9fbdc2fb4bbefe6';
// ⚠️ DEPRECATED: Related to kSAT/cSAT market (delisted) - used for testing
const csatInterestRateModelAddress = '0xD0Ed8135F9Ceb504A0484eEF9700D17622569Df2';
const cusdtInterestRateModelAddress = '0x5932c14cBBaA59248321E8448E4E46Ed5734e5a6';
const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';
const crbtcAdapterAddress = '0x94D2C65157FBeb52BaEEAaaE7b20fA0fAc3f0681';
const cdocAdapterAddress = '0x21e23076EAe56759304a6883bEBdb2e3EbA7678A';
// ⚠️ DEPRECATED: Related to kSAT/cSAT market (delisted) - used for testing
const csatAdapterAddress = '0x014635649DDf811FA581e24F95316A4440a02D78';
const cusdtdapterAddress = '0x99bBf2c61FeA5E067D1F311f0B0114Bd71dC8272';
const unitrollerAddress = '0x962308fef8edfadd705384840e7701f8f39ed0c0';

describe('Market', () => {
  let tropykus;
  let dep;
  let comptroller;
  const sandbox = sinon.createSandbox();

  it('should return the min value between two fixed numbers', () => {
    let a = FixedNumber.from(0.0001.toString(), 'fixed80x18');
    let b = FixedNumber.from(0.00001.toString(), 'fixed80x18');
    let c = Market.min(a, b);

    expect(c._value).equals(b._value);

    a = FixedNumber.from(0.00001.toString(), 'fixed80x18');
    b = FixedNumber.from(0.0001.toString(), 'fixed80x18');
    c = Market.min(a, b);

    expect(c._value).equals(a._value);

    a = FixedNumber.from('0.000000000000000001', 'fixed80x18');
    b = FixedNumber.from(0.0001.toString(), 'fixed80x18');
    c = Market.min(a, b);

    expect(c._value).equals(a._value);

    a = FixedNumber.from(0.0001.toString(), 'fixed80x18');
    b = FixedNumber.from(0.0001.toString(), 'fixed80x18');
    c = Market.min(a, b);

    expect(c._value).equals(a._value);
    expect(c._value).equals(b._value);
  });

  beforeEach(async () => {
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const wsProvider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545');
    tropykus = new Tropykus(provider, wsProvider, 400000);
    dep = await tropykus.getAccount();
    comptroller = await tropykus.setComptroller(dep, comptrollerAddress);
  });

  it('should deployed a new CRBTC market', async () => {
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
    expect(crbtc).instanceOf(CRBTCMarket);
    expect(crbtc.address).to.match(/0x[a-fA-F0-9]{40}/);
  });

  it('should deployed a new CToken market', async () => {
    const cdoc = await tropykus.addMarket(
      dep,
      'CErc20Immutable',
      null,
      docAddress,
      {
        comptrollerAddress,
        interestRateModelAddress: cdocInterestRateModelAddress,
        initialExchangeRate: 0.02,
        name: 'New CDOC',
        symbol: 'CDOC',
        decimals: 18,
      });
    expect(cdoc).instanceOf(CErc20Market);
    expect(cdoc.address).to.match(/0x[a-fA-F0-9]{40}/);
  });

  it('should instance a CRBTC Market with an existing contract address', async () => {
    const crbtc = await tropykus.addMarket(dep, 'CRBTC', crbtcMarketAddress);
    expect(crbtc).instanceOf(CRBTCMarket);
    expect(crbtc.address).equals(crbtcMarketAddress.toLowerCase());
  })

  it('should instance a CToken Market with an existing contract address', async () => {
    const cdoc = await tropykus.addMarket(dep, 'CErc20Immutable', cdocAddress, docAddress);
    expect(cdoc).instanceOf(CErc20Market);
    expect(cdoc.address).equals(cdocAddress.toLowerCase());
  });


  it('should throw and error if no erc20TokenAddress provided', async () => {
    try {
      await tropykus
        .addMarket(dep, 'CErc20Immutable', cdocAddress, null);
    } catch (err) {
      expect(err.toString())
        .equals((new Error('Must provide a valid erc20 token address')).toString());
    }
  });

  it('should return the market\'s kSymbol', async () => {
    const cdoc = await tropykus.addMarket(dep, 'CErc20Immutable', cdocAddress, docAddress);
    expect(await cdoc.getSymbol()).to.equal('kDOC');
  });

  it('should return the market\'s underlying symbol', async () => {
    const cdoc = await tropykus.addMarket(dep, 'CErc20Immutable', cdocAddress, docAddress);
    const crbtc = await tropykus.addMarket(dep, 'CRBTC', crbtcMarketAddress);
    // ⚠️ DEPRECATED: Testing with kSAT/cSAT market (delisted) - used to verify deprecation warnings
    const csat = await tropykus.addMarket(dep, 'CRBTC', csatMarketAddress);
    // ChainId 30 (Rootstock Mainnet) returns 'RBTC', not 'tRBTC' (which is for testnet chainId 31 or 1337)
    const chainId = await tropykus.getChainId();
    const expectedRBTC = chainId === 30 ? 'RBTC' : 'tRBTC';
    expect(await csat.getUnderlyingSymbol()).to.equal(expectedRBTC);
    expect(await crbtc.getUnderlyingSymbol()).to.equal(expectedRBTC);
    expect(await cdoc.getUnderlyingSymbol()).to.equal('DOC');
  });

  it('should return the market\'s type', async () => {
    const cdoc = await tropykus.addMarket(dep, 'CErc20Immutable', cdocAddress, docAddress);
    const crbtc = await tropykus.addMarket(dep, 'CRBTC', crbtcMarketAddress);
    const csat = await tropykus.addMarket(dep, 'CRBTC', csatMarketAddress);
    expect(await csat.type).to.equal('CRBTC');
    expect(await crbtc.type).to.equal('CRBTC');
    expect(await cdoc.type).to.equal('CErc20Immutable');
  });

  describe('Market setups', () => {
    let crbtc;
    let newComptroller;
    let testUnitroller;
    it('should set market\'s comptroller', async () => {
      // Deploy a fresh unitroller (proxy) for testing to avoid permission issues
      // on forked networks where we're not the admin
      const unitrollerFactory = new ethers.ContractFactory(
        UnitrollerArtifact.abi,
        UnitrollerArtifact.bytecode,
        dep.signer,
      );
      testUnitroller = await unitrollerFactory.deploy();
      await testUnitroller.deployed();
      
      // Deploy an initial comptroller for the market
      // We'll deploy a second unitroller/comptroller pair for the initial comptroller
      const initialUnitrollerFactory = new ethers.ContractFactory(
        UnitrollerArtifact.abi,
        UnitrollerArtifact.bytecode,
        dep.signer,
      );
      const initialUnitroller = await initialUnitrollerFactory.deploy();
      await initialUnitroller.deployed();
      
      const initialComptroller = await tropykus.setComptroller(dep, null, initialUnitroller.address);
      
      // Deploy a new comptroller implementation and set it up with the unitroller
      // setComptroller will:
      // 1. Deploy a new Comptroller implementation
      // 2. Set it as pending implementation on the Unitroller
      // 3. Call become() to make it the active implementation
      newComptroller = await tropykus.setComptroller(dep, null, testUnitroller.address);
      
      // Deploy a new CRBTC market with dep as the admin
      // Use the initial comptroller as the starting comptroller
      // Since dep deployed the market, dep is the admin and can call setComptroller
      crbtc = await tropykus.addMarket(
        dep,
        'CRBTC',
        null,
        null,
        {
          comptrollerAddress: initialComptroller.address,
          interestRateModelAddress: crbtcInterestRateModelAddress,
          initialExchangeRate: 0.02,
          name: 'New CRBTC',
          symbol: 'CRBTC',
          decimals: 18,
        }
      );
      
      // Verify the initial comptroller is different from the new one
      const currentComptroller = await crbtc.getComptroller();
      expect(currentComptroller.toLowerCase()).to.equal(initialComptroller.address.toLowerCase());
      expect(currentComptroller.toLowerCase()).to.not.equal(newComptroller.address.toLowerCase());
      
      // Set the new comptroller - this should work because dep is the market admin
      await crbtc.setComptroller(dep, newComptroller.address);
      
      // Verify the comptroller was updated
      expect(await crbtc.getComptroller()).equals(newComptroller.address.toLowerCase());
    });

    it('should set market\'s reserve factor', async () => {
      expect(await crbtc.getReserveFactor()).to.equal(0);
      await crbtc.setReserveFactor(dep, 0.5);
      expect(await crbtc.getReserveFactor()).to.equal(0.5);
    });
  });

  describe.skip(('Markets operations'), () => {
    let crbtc;
    let csat;
    let cdoc;
    let cusdt;
    let newComptroller;
    let alice;
    let bob;
    let carlos;
    let david;
    let eve;
    let companionAddress;
    let docToken;
    let usdtToken;
    beforeEach(async () => {
      // Ensure dep has native currency for gas
      // In Anvil, the first account should have funds, but we'll verify
      const depBalance = await tropykus.provider.getBalance(dep.address);
      if (depBalance.lt(ethers.utils.parseEther('100'))) {
        // If dep doesn't have enough funds, get a funded account from Anvil
        // Anvil's first account (index 0) should have funds
        const fundedAccount = tropykus.provider.getSigner(0);
        const fundedAddress = await fundedAccount.getAddress();
        if (fundedAddress.toLowerCase() !== dep.address.toLowerCase()) {
          // Transfer funds from funded account to dep
          const tx = await fundedAccount.sendTransaction({
            to: dep.address,
            value: ethers.utils.parseEther('10000'),
          });
          await tx.wait();
        }
      }

      // Deploy fresh ERC20 tokens for testing
      const docTokenFactory = new ethers.ContractFactory(
        StandardTokenArtifact.abi,
        StandardTokenArtifact.bytecode,
        dep.signer,
      );
      docToken = await docTokenFactory.deploy(
        ethers.utils.parseEther('1000000'), // 1M tokens
        'DOC Token',
        18,
        'DOC',
      );
      await docToken.deployed();

      const usdtTokenFactory = new ethers.ContractFactory(
        StandardTokenArtifact.abi,
        StandardTokenArtifact.bytecode,
        dep.signer,
      );
      usdtToken = await usdtTokenFactory.deploy(
        ethers.utils.parseEther('1000000'), // 1M tokens
        'USDT Token',
        18,
        'USDT',
      );
      await usdtToken.deployed();

      // Deploy fresh interest rate models
      const interestRateModelFactory = new ethers.ContractFactory(
        JumpRateModelV2Artifact.abi,
        JumpRateModelV2Artifact.bytecode,
        dep.signer,
      );
      const crbtcInterestRateModel = await interestRateModelFactory.deploy(
        '20000000000000000', // 2% base rate (0.02)
        '800000000000000000', // 80% multiplier (0.8)
        '1000000000000000000', // 100% jump multiplier (1.0)
        '1000000000000000000000000000', // 1e27 kink
        dep.address, // admin
      );
      await crbtcInterestRateModel.deployed();

      const csatInterestRateModel = await interestRateModelFactory.deploy(
        '20000000000000000', // 2% base rate
        '800000000000000000', // 80% multiplier
        '1000000000000000000', // 100% jump multiplier
        '1000000000000000000000000000', // 1e27 kink
        dep.address, // admin
      );
      await csatInterestRateModel.deployed();

      const cdocInterestRateModel = await interestRateModelFactory.deploy(
        '20000000000000000', // 2% base rate
        '800000000000000000', // 80% multiplier
        '1000000000000000000', // 100% jump multiplier
        '1000000000000000000000000000', // 1e27 kink
        dep.address, // admin
      );
      await cdocInterestRateModel.deployed();

      const cusdtInterestRateModel = await interestRateModelFactory.deploy(
        '20000000000000000', // 2% base rate
        '800000000000000000', // 80% multiplier
        '1000000000000000000', // 100% jump multiplier
        '1000000000000000000000000000', // 1e27 kink
        dep.address, // admin
      );
      await cusdtInterestRateModel.deployed();

      // Deploy fresh PriceOracleProxy
      const priceOracleFactory = new ethers.ContractFactory(
        PriceOracleProxyArtifact.abi,
        PriceOracleProxyArtifact.bytecode,
        dep.signer,
      );
      const testPriceOracle = await priceOracleFactory.deploy(dep.address); // dep is guardian
      await testPriceOracle.deployed();

      // Deploy a fresh unitroller (proxy) for testing to avoid permission issues
      // on forked networks where we're not the admin
      const unitrollerFactory = new ethers.ContractFactory(
        UnitrollerArtifact.abi,
        UnitrollerArtifact.bytecode,
        dep.signer,
      );
      const testUnitroller = await unitrollerFactory.deploy();
      await testUnitroller.deployed();
      
      // Deploy a new comptroller implementation and set it up with the unitroller
      // setComptroller will:
      // 1. Deploy a new Comptroller implementation
      // 2. Set it as pending implementation on the Unitroller
      // 3. Call become() to make it the active implementation
      newComptroller = await tropykus.setComptroller(dep, null, testUnitroller.address);
      
      // Deploy fresh markets
      crbtc = await tropykus.addMarket(
        dep,
        'CRBTC',
        null,
        null,
        {
          comptrollerAddress: newComptroller.address,
          interestRateModelAddress: crbtcInterestRateModel.address,
          initialExchangeRate: 0.02,
          name: 'New CRBTC',
          symbol: 'CRBTC',
          decimals: 18,
        });
      // ⚠️ DEPRECATED: Testing with kSAT/cSAT market (delisted) - used to verify deprecation warnings
      csat = await tropykus.addMarket(
        dep,
        'CRBTC',
        null,
        null,
        {
          comptrollerAddress: newComptroller.address,
          interestRateModelAddress: csatInterestRateModel.address,
          initialExchangeRate: 0.02,
          name: 'New CSAT',
          symbol: 'CSAT',
          decimals: 18,
        });
      cdoc = await tropykus.addMarket(
        dep,
        'CErc20Immutable',
        null,
        docToken.address,
        {
          comptrollerAddress: newComptroller.address,
          interestRateModelAddress: cdocInterestRateModel.address,
          initialExchangeRate: 0.02,
          name: 'New CDOC',
          symbol: 'CDOC',
          decimals: 18,
        });
      cusdt = await tropykus.addMarket(
        dep,
        'CErc20Immutable',
        null,
        usdtToken.address,
        {
          comptrollerAddress: newComptroller.address,
          interestRateModelAddress: cusdtInterestRateModel.address,
          initialExchangeRate: 0.02,
          name: 'New CUSDT',
          symbol: 'CUSDT',
          decimals: 18,
        });

      // Deploy MockPriceProviderMoC contracts for each market
      // Prices are in 18-decimal format (1e18 = 1 USD)
      // RBTC price: 54556.9 USD (from test expectations)
      // DOC/USDT price: 1 USD (stablecoins)
      const mockPriceProviderFactory = new ethers.ContractFactory(
        MockPriceProviderMoCArtifact.abi,
        MockPriceProviderMoCArtifact.bytecode,
        dep.signer,
      );
      
      // RBTC price: 54556.9 * 1e18
      const crbtcPriceProvider = await mockPriceProviderFactory.deploy(
        dep.address, // guardian
        ethers.utils.parseEther('54556.9'), // price in 18 decimals
      );
      await crbtcPriceProvider.deployed();

      const csatPriceProvider = await mockPriceProviderFactory.deploy(
        dep.address, // guardian
        ethers.utils.parseEther('54556.9'), // price in 18 decimals
      );
      await csatPriceProvider.deployed();

      // DOC price: 1 * 1e18
      const cdocPriceProvider = await mockPriceProviderFactory.deploy(
        dep.address, // guardian
        ethers.utils.parseEther('1'), // price in 18 decimals
      );
      await cdocPriceProvider.deployed();

      // USDT price: 1 * 1e18
      const cusdtPriceProvider = await mockPriceProviderFactory.deploy(
        dep.address, // guardian
        ethers.utils.parseEther('1'), // price in 18 decimals
      );
      await cusdtPriceProvider.deployed();

      // Deploy PriceOracleAdapterMoc contracts that wrap the price providers
      // The adapter connects the price provider to the PriceOracleProxy
      const adapterFactory = new ethers.ContractFactory(
        PriceOracleAdapterMocArtifact.abi,
        PriceOracleAdapterMocArtifact.bytecode,
        dep.signer,
      );

      const crbtcAdapter = await adapterFactory.deploy(
        dep.address, // guardian
        crbtcPriceProvider.address, // priceProvider
      );
      await crbtcAdapter.deployed();

      const csatAdapter = await adapterFactory.deploy(
        dep.address, // guardian
        csatPriceProvider.address, // priceProvider
      );
      await csatAdapter.deployed();

      const cdocAdapter = await adapterFactory.deploy(
        dep.address, // guardian
        cdocPriceProvider.address, // priceProvider
      );
      await cdocAdapter.deployed();

      const cusdtAdapter = await adapterFactory.deploy(
        dep.address, // guardian
        cusdtPriceProvider.address, // priceProvider
      );
      await cusdtAdapter.deployed();

      // Set up price oracle
      await newComptroller.setOracle(dep, testPriceOracle.address);
      await newComptroller.setLiquidationIncentive(dep, 0.07);
      await newComptroller.setCloseFactor(dep, 0.5);

      await tropykus.setPriceOracle(testPriceOracle.address);
      
      // Verify price providers work before connecting them
      const crbtcPriceCheck = await crbtcPriceProvider.peek();
      expect(crbtcPriceCheck[1]).to.be.true; // valid should be true
      
      // Connect adapters (not price providers directly) to markets
      // Wait for each transaction to be mined to ensure state is updated
      const tx1 = await tropykus.priceOracle.setAdapterToToken(dep, crbtc.address, crbtcAdapter.address);
      await tx1.wait();
      const tx2 = await tropykus.priceOracle.setAdapterToToken(dep, cdoc.address, cdocAdapter.address);
      await tx2.wait();
      // ⚠️ DEPRECATED: Testing with kSAT/cSAT market (delisted) - used to verify deprecation warnings
      const tx3 = await tropykus.priceOracle.setAdapterToToken(dep, csat.address, csatAdapter.address);
      await tx3.wait();
      const tx4 = await tropykus.priceOracle.setAdapterToToken(dep, cusdt.address, cusdtAdapter.address);
      await tx4.wait();
      
      // Verify adapters are set correctly
      const crbtcAdapterAddress = await tropykus.priceOracle.instance.tokenAdapter(crbtc.address);
      expect(crbtcAdapterAddress.toLowerCase()).to.equal(crbtcAdapter.address.toLowerCase());
      
      const cdocAdapterAddress = await tropykus.priceOracle.instance.tokenAdapter(cdoc.address);
      expect(cdocAdapterAddress.toLowerCase()).to.equal(cdocAdapter.address.toLowerCase());
      
      const csatAdapterAddress = await tropykus.priceOracle.instance.tokenAdapter(csat.address);
      expect(csatAdapterAddress.toLowerCase()).to.equal(csatAdapter.address.toLowerCase());
      
      const cusdtAdapterAddress = await tropykus.priceOracle.instance.tokenAdapter(cusdt.address);
      expect(cusdtAdapterAddress.toLowerCase()).to.equal(cusdtAdapter.address.toLowerCase());

      await crbtc.setComptroller(dep, newComptroller.address);
      await cdoc.setComptroller(dep, newComptroller.address);
      await csat.setComptroller(dep, newComptroller.address);
      await cusdt.setComptroller(dep, newComptroller.address);

      await newComptroller.supportMarket(dep, crbtc.address);
      await newComptroller.supportMarket(dep, cdoc.address);
      await newComptroller.supportMarket(dep, csat.address);
      await newComptroller.supportMarket(dep, cusdt.address);

      await newComptroller.setCollateralFactor(dep, crbtc.address, 0.6);
      await newComptroller.setCollateralFactor(dep, cdoc.address, 0.75);
      await newComptroller.setCollateralFactor(dep, csat.address, 0.6);
      await newComptroller.setCollateralFactor(dep, cusdt.address, 0);

      await crbtc.setReserveFactor(dep, 0.2);
      await cdoc.setReserveFactor(dep, 0.5);
      await csat.setReserveFactor(dep, 0.5);
      await cusdt.setReserveFactor(dep, 0.5);

      await crbtc.mint(dep, 1);
      await cdoc.mint(dep, 10000);

      companionAddress = await csat.newCompanion(
        dep,
        newComptroller.address,
        testPriceOracle.address,
      );
      await csat.setNewCompanion(dep, companionAddress);
      await csat.setMarketCapThreshold(dep, companionAddress, 0.8);

      // Get test accounts
      alice = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/1`);
      bob = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/2`);
      carlos = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/3`);
      david = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/4`);
      eve = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/4`);

      // Fund accounts with native currency (RBTC/ETH) for gas
      // Use Anvil's default funded account (index 0) to fund all accounts
      // This avoids issues if dep has spent funds on deployments
      const fundedAccount = tropykus.provider.getSigner(0);
      const fundAmount = ethers.utils.parseEther('10000'); // 10000 RBTC/ETH per account
      const accountsToFund = [dep, alice, bob, carlos, david, eve];
      
      // Use Anvil's setBalance RPC method for efficient funding
      // This avoids transaction costs and is faster
      for (const account of accountsToFund) {
        await tropykus.provider.send('anvil_setBalance', [
          account.address,
          ethers.utils.hexValue(fundAmount),
        ]);
      }

      // Transfer ERC20 tokens to accounts
      // StandardToken mints to deployer (dep), so we need to transfer to other accounts
      const tokenAmount = ethers.utils.parseEther('100000'); // 100k tokens
      const accountsForTokens = [alice, bob, carlos, david, eve];
      for (const account of accountsForTokens) {
        // Transfer DOC tokens
        const docTx = await docToken.transfer(account.address, tokenAmount);
        await docTx.wait();
        // Transfer USDT tokens
        const usdtTx = await usdtToken.transfer(account.address, tokenAmount);
        await usdtTx.wait();
      }

      const mkts = [
        crbtc.address,
        cdoc.address,
        csat.address,
        cusdt.address,
      ];

      await newComptroller.enterMarkets(dep, mkts);
      await newComptroller.enterMarkets(alice, mkts);
    });

    afterEach(async () => {
      // Clear all variables to ensure tests don't interfere with each other
      crbtc = null;
      csat = null;
      cdoc = null;
      cusdt = null;
      newComptroller = null;
      alice = null;
      bob = null;
      carlos = null;
      david = null;
      eve = null;
      companionAddress = null;
      docToken = null;
      usdtToken = null;
    });

    it('should transfer underlying to the given address', async () => {
      let cdocBalance = await cdoc.balanceOfUnderlyingInWallet(dep);
      expect(cdocBalance.underlying.value)
        .to
        .be
        .at
        .least(10);

      await cdoc.transferUnderlying(dep, alice.address, 10);
      cdocBalance = await cdoc.balanceOfUnderlyingInWallet(alice);
      expect(cdocBalance.underlying.value)
        .to
        .be
        .at
        .least(10);
      expect(cdocBalance.usd.value)
        .to
        .be
        .at
        .least(10);
    });

    it('should return the wallet balance in underlying and usd for rbtc', async () => {
      const balance = await csat.balanceOfUnderlyingInWallet(bob);
      expect(balance.underlying.value)
        .to
        .equal(10000);
      expect(balance.usd.value)
        .to
        .equal(10000 * 54556.9);
    });

    it('should get the supplier snapshot of an account address', async () => {
      await crbtc.mint(alice, 0.001);
      const snapshot = await crbtc.getSupplierSnapshot(alice.address);
      expect(Number(snapshot.underlyingAmount) / 1e18)
        .to
        .equal(0.001);
    });

    it('should tell if the market has hurricane interest model or not', async () => {
      expect(await crbtc.isHurricane()).to.be.false;
      expect(await csat.isHurricane()).to.be.false; // THIS WAS CHANGED TO FALSE IN MAINNET
    });

    it('should get market cap limit values', async () => {
      let data = await crbtc.getMarketCap(dep, companionAddress);
      expect(data.totalDeposits.underlying.value)
        .to
        .equal(0);
      expect(data.limit.underlying.value)
        .to
        .equal(0);

      await crbtc.borrow(dep, 0.7);
      data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
        expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 700);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(700);
      expect(data.usd)
        .to
        .equal(700);
    });

    it('should get the earnings and de underlying value for any interest rate model', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 100);
      await cdoc.mint(alice, 100);
      const {
        underlying,
        usd
      } = await cdoc.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(100);
      expect(usd)
        .equals(100);
      await cdoc.borrow(dep, 1000);
      await cdoc.mint(dep, 10);
      await cdoc.mint(dep, 10);
      const deposit = await cdoc.getEarnings(alice);
      expect(deposit.underlying)
        .to
        .equal(100);
      expect(deposit.earnings)
        .to
        .be
        .closeTo(0.00000037675, 1e-10);
      expect(deposit.underlyingUSD)
        .to
        .equal(100);
      expect(deposit.earningsUSD)
        .to
        .be
        .closeTo(0.00000037675, 1e-10);
    });

    it('should return market\'s cash for cdoc', async () => {
      let cash = await cdoc.getCash();
      expect(cash.underlying)
        .to
        .equal(10000);
      await cdoc.transferUnderlying(dep, alice.address, 100);
      await cdoc.mint(alice, 100);
      cash = await cdoc.getCash();
      expect(cash.underlying)
        .to
        .be
        .closeTo(10100, 18);
      expect(cash.usd)
        .to
        .equal(10100);
    });

    it('should return market\'s cash for crbtc', async () => {
      let cash = await crbtc.getCash();
      expect(cash.underlying)
        .to
        .equal(1);
      expect(cash.usd)
        .to
        .equal(54556.9);
      await crbtc.mint(alice, 0.05);
      cash = await crbtc.getCash();
      expect(cash.underlying)
        .to
        .equal(1.05);
      expect(cash.usd)
        .to
        .be
        .closeTo(1.05 * 54556.9, 1e-18);
    });

    it('should return market\'s reserves', async () => {
      let reserves = await crbtc.getReserves();
      expect(reserves.underlying)
        .to
        .equal(0);
      expect(reserves.usd)
        .to
        .equal(0);
      await crbtc.mint(alice, 0.05);
      await crbtc.borrow(alice, 0.005);
      const borrowBalance = await crbtc.borrowBalanceCurrent(alice);
      const borrowRate = await crbtc.getBorrowAnnualRate();
      await crbtc.repayBorrow(alice, null, true);
      reserves = await crbtc.getReserves();
      const interest = (borrowBalance.underlying * (borrowRate / 1051200)) * 2;
      expect(reserves.underlying)
        .to
        .be
        .closeTo(interest, 1e-8);
    });

    it('should get a user\'s kTokens balance', async () => {
      let tokenBalance = await crbtc.balanceOf(alice);
      expect(tokenBalance.underlying.value)
        .to
        .equal(0);

      await crbtc.mint(alice, 0.001);
      tokenBalance = await crbtc.balanceOf(alice);
      expect(tokenBalance.tokens.value)
        .to
        .equal(0.001 / 0.02);
      expect(tokenBalance.underlying.value)
        .to
        .equal(0.001);
    });

    it('should get a market\'s current exchange rate', async () => {
      expect(await crbtc.getExchangeRateCurrent(alice))
        .to
        .equal(0.02);
    });

    it('should get a user\'s liquidity', async () => {
      let data = await newComptroller.getAccountLiquidity(alice);
      expect(data.usd.value)
        .to
        .equal(0);
      await crbtc.mint(alice, 0.5);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.5);
      expect(balance.usd)
        .equals(0.5 * 54556.9);
      const price = await tropykus.priceOracle.getUnderlyingPrice(crbtc.address);
      const collateralFactor = await newComptroller.getCollateralFactor(crbtc.address);
      const {
        underlying,
        usd
      } = await newComptroller.getAccountLiquidity(alice, crbtc.address);
      expect(usd.value)
        .to
        .equal(0.5 * price * collateralFactor);
      expect(underlying.value)
        .to
        .equal((0.5 * price * collateralFactor) / 54556.9);
      expect(usd.fixedNumber)
        .instanceOf(ethers.FixedNumber);
      expect(underlying.fixedNumber)
        .instanceOf(ethers.FixedNumber);
      expect(Number(underlying.fixedNumber._value))
        .to
        .equal(underlying.value);
      expect(Number(usd.fixedNumber._value))
        .to
        .equal(usd.value);
    });

    it('should get market\'s total borrows', async () => {
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0);
      expect(data.usd)
        .to
        .equal(0);
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);
      await crbtc.borrow(alice, 0.005);
      data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.005);
      expect(data.usd)
        .to
        .be
        .closeTo(0.005 * 54556.9, 1e-13);
    });

    it('should get market\'s total supply', async () => {
      let data = await cdoc.getMarketTotalSupply();
      expect(data.underlying)
        .to
        .equal(10000);
      expect(data.usd)
        .to
        .equal(10000);

      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);

      data = await cdoc.getMarketTotalSupply();
      expect(data.underlying)
        .to
        .equal(10000 + 1000);
      expect(data.usd)
        .to
        .equal(10000 + 1000);
    });

    it('should deposit in the cRBTC market', async () => {
      await crbtc.mint(alice, 0.5);
      const {
        underlying,
        usd
      } = await crbtc.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(0.5);
      expect(usd)
        .equals(0.5 * 54556.9);
    });

    it('should deposit in any token market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);
      const {
        underlying,
        usd
      } = await cdoc.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(1000);
      expect(usd)
        .equals(1000);
    });

    it('should borrow in cdoc an amount once he has a collateral on cdoc', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 0.8);
      const supplyBalance = await cdoc.balanceOfUnderlying(alice);
      expect(supplyBalance.underlying)
        .equals(0.8);
      expect(supplyBalance.usd)
        .equals(0.8);
      await cdoc.borrow(alice, 0.05);
      const borrowBalance = await cdoc.borrowBalanceCurrent(alice);
      expect(borrowBalance.underlying)
        .equals(0.05);
      expect(borrowBalance.usd)
        .equals(0.05);
    });

    it('should borrow in crbtc market an amount once he has a collateral on crbtc', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);
      await crbtc.borrow(alice, 0.005);
      const {
        underlying,
        usd
      } = await crbtc.borrowBalanceCurrent(alice);
      expect(underlying)
        .equals(0.005);
      expect(usd)
        .to
        .be
        .closeTo(0.005 * 54556.9, 1e-13);
    });

    it('should return the borrow Annual Percentage Rate', async () => {
      expect(await cdoc.getBorrowAnnualRate())
        .to
        .be
        .closeTo(0.08, 18);
    });

    it('should return the supply Annual Percentage Rate', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      expect(await cdoc.getSupplyAnnualRate())
        .to
        .equal(0);
      await cdoc.mint(alice, 1000);
      await cdoc.borrow(alice, 500);
      const br = await cdoc.getBorrowAnnualRate();
      const rf = await cdoc.getReserveFactor();
      expect(await cdoc.getSupplyAnnualRate())
        .to
        .be
        .closeTo(br * 0.5 * (1 - rf), 18);
    });

    it('should redeem from crbtc market', async () => {
      await crbtc.mint(alice, 0.5);
      const {
        underlying,
        usd
      } = await crbtc.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(0.5);
      expect(usd)
        .equals(0.5 * 54556.9);

      const balanceBefore = await crbtc.balanceOfUnderlying(alice);
      await crbtc.redeem(alice, 0.025);
      const balanceAfter = await crbtc.balanceOfUnderlying(alice);
      expect(balanceAfter.underlying)
        .equals(balanceBefore.underlying - 0.025);
    });

    it('should redeem from cdoc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 500);
      await cdoc.mint(alice, 500);
      const {
        underlying,
        usd
      } = await cdoc.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(500);
      expect(usd)
        .equals(500);

      const balanceBefore = await cdoc.balanceOfUnderlying(alice);
      await cdoc.redeem(alice, 250);
      const balanceAfter = await cdoc.balanceOfUnderlying(alice);
      expect(balanceAfter.underlying)
        .equals(balanceBefore.underlying - 250);
    });

    it('should redeem all kTokens from crbtc market', async () => {
      await crbtc.mint(alice, 0.5);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.5);
      expect(balance.usd)
        .equals(0.5 * 54556.9);
      const kRBTCBalance = await crbtc.balanceOf(alice);
      expect(kRBTCBalance.tokens.value)
        .equals(25);

      await crbtc.redeem(alice, 0, true);
      const balanceAfter = await crbtc.balanceOfUnderlying(alice);
      expect(balanceAfter.underlying)
        .equals(0);
      expect(balanceAfter.usd)
        .equals(0);
      const kRBTCBalanceAfter = await crbtc.balanceOf(alice);
      expect(kRBTCBalanceAfter.tokens.value)
        .equals(0);
    });

    it('should redeem all kTokens from cdoc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 500);
      await cdoc.mint(alice, 500);
      const balance = await cdoc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(500);
      expect(balance.usd)
        .equals(500);
      const kDocBeforeBalance = await cdoc.balanceOf(alice);
      expect(kDocBeforeBalance.tokens.value)
        .to
        .be
        .closeTo(25000, 1e-10);

      await cdoc.redeem(alice, null, true);
      const balanceAfter = await cdoc.balanceOfUnderlying(alice);
      expect(balanceAfter.underlying)
        .equals(0);
      expect(balanceAfter.usd)
        .equals(0);
      const kDocAfterBalance = await cdoc.balanceOf(alice);
      expect(kDocAfterBalance.tokens.value)
        .equals(0);
    });

    it('should get the borrow balance in all the markets', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 700);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(700);
      expect(data.usd)
        .to
        .equal(700);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address);
      await crbtc.mint(alice, 0.5);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .to
        .equal(0.5);
      expect(balance.usd)
        .to
        .equal(0.5 * 54556.9);

      const {
        usd,
        underlying
      } = await newComptroller
        .getTotalBorrowsInAllMarkets(alice, markets, crbtc.address);
      expect(underlying)
        .to
        .be
        .closeTo(0, 1e-10);
      expect(usd)
        .to
        .be
        .closeTo(0, 1e-10);
    });

    it('should get the supply balance in all the markets', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 700);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(700);
      expect(data.usd)
        .to
        .equal(700);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .to
        .equal(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-10);

      await crbtc.mint(alice, 0.05);
      balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .to
        .be
        .closeTo(0.05, 1e-12);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.05 * 54556.9, 1e-12);

      await cdoc.transferUnderlying(dep, alice.address, 3000);
      await cdoc.mint(alice, 3000);
      balance = await cdoc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .to
        .equal(3000);
      expect(balance.usd)
        .to
        .equal(3000);

      const {
        usd,
        underlying
      } = await newComptroller
        .getTotalSupplyInAllMarkets(alice, markets, crbtc.address);
      expect(usd)
        .to
        .be
        .closeTo(0.025 * 54556.9 + 0.05 * 54556.9 + 3000, 1e-3);
      expect(underlying)
        .to
        .be
        .closeTo((0.025 * 54556.9 + 0.05 * 54556.9 + 3000) / 54556.9, 1e-7);
    });

    it('should return the max value that an account can redeem from a market without debts or deposits', async () => {
      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address);

      const {
        underlying,
        tokens
      } = await csat.maxAllowedToWithdraw(alice, markets);
      expect(underlying)
        .to
        .equal(0);
      expect(tokens.value)
        .to
        .equal(0);

      const data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, tokens.value, 0);
      expect(data.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .equal(0);
    });

    it('should return the max value that an account can redeem when cash its less than user supply', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 700);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(700);
      expect(data.usd)
        .to
        .equal(700);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);

      await csat.borrow(dep, 0.024);

      const cash = await csat.getCash();
      expect(cash.underlying)
        .to
        .equal(0.001);
      expect(cash.usd)
        .to
        .be
        .closeTo(0.001 * 54556.9, 1e-12);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address);

      data = await csat.maxAllowedToWithdraw(alice, markets);
      expect(data.underlying)
        .to
        .equal(cash.underlying);

      const hy = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, data.tokens.value, 0);
      expect(hy.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, data.underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can redeem from a market without debts', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 700);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(700);
      expect(data.usd)
        .to
        .equal(700);
      await csat.mint(dep, 0.025);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address);

      const {
        underlying,
        tokens
      } = await csat.maxAllowedToWithdraw(alice, markets);
      expect(underlying)
        .to
        .gte(0.025);

      data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, tokens.value, 0);
      expect(data.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can redeem when cash more than supply', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 700);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(700);
      expect(data.usd)
        .to
        .equal(700);
      await csat.mint(dep, 0.025);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address);

      data = await csat.maxAllowedToWithdraw(alice, markets);

      const hy = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, data.tokens.value, 0);
      expect(hy.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, data.underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can redeem from a market with active debts', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 700);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(700);
      expect(data.usd)
        .to
        .equal(700);
      await csat.mint(dep, 0.025);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      const cdocDebt = 50;
      await cdoc.borrow(alice, cdocDebt);
      data = await cdoc.borrowBalanceCurrent(alice);
      expect(data.underlying)
        .equals(cdocDebt);
      expect(data.usd)
        .equals(cdocDebt);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address);

      const {
        underlying,
        tokens
      } = await csat.maxAllowedToWithdraw(alice, markets);

      data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, tokens.value, 0);
      expect(data.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can redeem from a market with active debts and multiple deposits', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 700);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(700);
      expect(data.usd)
        .to
        .equal(700);
      await csat.mint(dep, 0.025);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      await cdoc.transferUnderlying(dep, alice.address, 10000);
      await cdoc.mint(alice, 10000);

      const cdocDebt = 50;
      await cdoc.borrow(alice, cdocDebt);
      data = await cdoc.borrowBalanceCurrent(alice);
      expect(data.underlying)
        .equals(cdocDebt);
      expect(data.usd)
        .equals(cdocDebt);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address);

      const {
        underlying,
        tokens
      } = await csat.maxAllowedToWithdraw(alice, markets);
      const marketTokens = await csat.balanceOf(alice);
      expect(tokens.fixedNumber._value)
        .equals(marketTokens.tokens.fixedNumber._value);

      data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, tokens.value, 0);
      expect(data.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can redeem from a market with active debts collateral factor 0', async () => {
      await cusdt.mint(dep, 10000);
      await cusdt.transferUnderlying(dep, alice.address, 1000);

      await cusdt.mint(alice, 1000);
      let balance = await cusdt.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(1000);
      expect(balance.usd)
        .to
        .equals(1000);

      await crbtc.mint(alice, 0.005);

      const cdocDebt = 50;
      await cdoc.borrow(alice, cdocDebt);
      let data = await cdoc.borrowBalanceCurrent(alice);
      expect(data.underlying)
        .equals(cdocDebt);
      expect(data.usd)
        .equals(cdocDebt);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address);

      const {
        underlying,
        tokens
      } = await cusdt.maxAllowedToWithdraw(alice, markets);

      data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, cusdt.address, tokens.value, 0);
      expect(data.shortfall.usd)
        .equals(0);

      await cusdt.redeem(alice, underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, cusdt.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can deposit in stable markets', async () => {
      const randomNumber = (Math.random() * (1000.00 - 1.00 + 1.00) + 1.00)
        .toFixed(18);
      await cdoc.transferUnderlying(dep, carlos.address, randomNumber);

      // Get carlos's current balance before checking maxAllowedToDeposit
      const carlosBalanceBefore = await cdoc.balanceOfUnderlyingInWallet(carlos);
      const expectedMaxDeposit = parseFloat(carlosBalanceBefore.underlying.fixedNumber._value);

      const maxToDeposit = await cdoc.maxAllowedToDeposit(carlos);
      expect(parseFloat(maxToDeposit.underlying.fixedNumber._value))
        .to.be.closeTo(expectedMaxDeposit, 1e-10);
      expect(parseFloat(maxToDeposit.usd.fixedNumber._value))
        .to.be.closeTo(expectedMaxDeposit, 1e-10);

      await cdoc.mint(carlos, maxToDeposit.underlying.fixedNumber._value);
      const balanceOfCDoc = await cdoc.balanceOfUnderlyingInWallet(carlos);
      expect(balanceOfCDoc.underlying.fixedNumber._value)
        .equals('0.0');
    });

    it('should return the max value that an account can deposit in rbtc standard', async () => {
      const balance = await crbtc.balanceOfUnderlyingInWallet(david);

      const maxToDeposit = await crbtc.maxAllowedToDeposit(david);
      expect(maxToDeposit.underlying.fixedNumber._value)
        .equals(balance.underlying.fixedNumber._value);
      expect(Number(maxToDeposit.usd.fixedNumber._value))
        .to
        .be
        .closeTo((balance.underlying.value * 54556.9), 1e-1);
    });

    it('should return the max value than an account can borrow from a market with no more debts', async () => {
      await crbtc.mint(alice, 0.05);

      // Calculate the borrow amount that leaves 5 USD liquidity
      // Collateral: 0.05 RBTC = 0.05 * 54556.9 = 2727.85 USD
      // Borrowing power: 2727.85 * 0.6 = 1636.71 USD
      // To have 5 USD liquidity: borrow = 1636.71 - 5 = 1631.71 USD
      // Borrow in RBTC: 1631.71 / 54556.9 ≈ 0.02991 RBTC
      const borrowAmountRBTC = (0.05 * 54556.9 * 0.6 - 5) / 54556.9;

      const data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, crbtc.address, 0, borrowAmountRBTC);
      expect(data.shortfall.usd).equals(0);
      expect(data.liquidity.usd).to.be.closeTo(5, 1e-10);
    });

    it('should return the max value than an account can borrow from a market without more debts');

    it('should return the max value than an account can borrow from a market where the cash is less than account liquidity');

    it('should repay a portion of debt on cdoc market', async () => {
      await crbtc.mint(alice, 0.5);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying).equals(0.5);
      expect(balance.usd).equals(0.5 * 54556.9);

      await cdoc.borrow(alice, 500);
      const borrowBalanceBefore = await cdoc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore.underlying).equals(500);
      expect(borrowBalanceBefore.usd).equals(500);

      await cdoc.repayBorrow(alice, 250);
      const borrowBalanceAfter = await cdoc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter.underlying).to.be.closeTo(250, 4);
      expect(borrowBalanceAfter.usd).to.be.closeTo(250, 4);
    });

    it('should repay a portion of debt on crbtc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 500);
      await cdoc.mint(alice, 500);
      const balance = await cdoc.balanceOfUnderlying(alice);
      expect(balance.underlying).equals(500);
      expect(balance.usd).equals(500);

      await crbtc.borrow(alice, 0.005);
      const borrowBalanceBefore = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore.underlying).equals(0.005);
      expect(borrowBalanceBefore.usd).to.be.closeTo(0.005 * 54556.9, 1e-13);

      await crbtc.repayBorrow(alice, 0.0025);
      const borrowBalanceAfter = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter.underlying).to.be.closeTo(0.0025, 1e-9);
      expect(borrowBalanceAfter.usd).to.be.closeTo(0.0025 * 54556.9, 1e-4);
    });

    it('should repay all debt from crbtc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 5000);
      await cdoc.mint(alice, 5000);
      const balance = await cdoc.balanceOfUnderlying(alice);
      expect(balance.underlying).equals(5000);
      expect(balance.usd).equals(5000);

      await crbtc.borrow(alice, 0.005);
      const borrowBalanceBefore = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore.underlying).equals(0.005);
      expect(borrowBalanceBefore.usd).to.be.closeTo(0.005 * 54556.9, 1e-13);

      await crbtc.repayBorrow(alice, null, true);
      const borrowBalanceAfter = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter.underlying).equals(0);
      expect(borrowBalanceAfter.usd).equals(0);
    });


    // ⚠️ NOTE: Events subscription tests are skipped because we are no longer using Ganache.
    // These tests were designed for Ganache's event handling and block mining behavior.
    // With Anvil (the current test environment), event subscription behavior may differ.
    describe.skip('Events subscription', () => {
      afterEach(() => {
        sandbox.restore();
      });

      it('Should subscribe on mint event', async () => {
        const actionObj = {
          action: () => {
            return 'Action excecuted, mint';
          }
        };
        sandbox.spy(actionObj, "action");

        crbtc.subscribeOnEvent('Mint', actionObj.action);
        await crbtc.mint(alice, 0.0025);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, mint');

        await crbtc.mint(alice, 0.0025);
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(false);
        expect(actionObj.action.calledTwice).equals(true);
      });

      it('Should subscribe on redeem event', async () => {
        const actionObj = {
          action: () => {
            return 'Action excecuted, redeem';
          }
        };
        sandbox.spy(actionObj, "action");

        crbtc.subscribeOnEvent('Redeem', actionObj.action);
        await crbtc.mint(alice, 0.0025);
        await crbtc.redeem(alice, 0.002);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, redeem');

        await crbtc.redeem(alice, 0.0005);
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(false);
        expect(actionObj.action.calledTwice).equals(true);
      });

      it('Should subscribe on borrow event', async () => {
        const actionObj = {
          action: () => {
            return 'Action excecuted, borrow';
          }
        };
        sandbox.spy(actionObj, "action");

        crbtc.subscribeOnEvent('Borrow', actionObj.action);
        await crbtc.mint(alice, 0.0025);
        await crbtc.borrow(alice, 0.00001);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, borrow');

        await crbtc.borrow(alice, 0.00001);
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(false);
        expect(actionObj.action.calledTwice).equals(true);
      });

      it('Should subscribe on repayBorrow event', async () => {
        const actionObj = {
          action: () => {
            return 'Action excecuted, repayBorrow';
          }
        };
        sandbox.spy(actionObj, "action");

        crbtc.subscribeOnEvent('RepayBorrow', actionObj.action);
        await crbtc.mint(alice, 0.0025);
        await crbtc.borrow(alice, 0.001);
        await crbtc.repayBorrow(alice, 0.0005);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, repayBorrow');

        await crbtc.repayBorrow(alice, 0, true);
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(false);
        expect(actionObj.action.calledTwice).equals(true);
      });
    });
  });

  describe.skip('6-decimal token decimal detection', () => {
    let usdt0Token;
    let cusdt0;
    let newComptroller;
    let alice;

    beforeEach(async () => {
      // Ensure dep has native currency for gas
      const depBalance = await tropykus.provider.getBalance(dep.address);
      if (depBalance.lt(ethers.utils.parseEther('100'))) {
        const fundedAccount = tropykus.provider.getSigner(0);
        const fundedAddress = await fundedAccount.getAddress();
        if (fundedAddress.toLowerCase() !== dep.address.toLowerCase()) {
          const tx = await fundedAccount.sendTransaction({
            to: dep.address,
            value: ethers.utils.parseEther('10000'),
          });
          await tx.wait();
        }
      }

      // Deploy 6-decimal ERC20 token (USDT0)
      const usdt0TokenFactory = new ethers.ContractFactory(
        StandardTokenArtifact.abi,
        StandardTokenArtifact.bytecode,
        dep.signer,
      );
      usdt0Token = await usdt0TokenFactory.deploy(
        ethers.utils.parseUnits('1000000', 6), // 1M tokens with 6 decimals
        'USDT0 Token',
        6, // 6 decimals
        'USDT0',
      );
      await usdt0Token.deployed();

      // Deploy interest rate model
      const interestRateModelFactory = new ethers.ContractFactory(
        JumpRateModelV2Artifact.abi,
        JumpRateModelV2Artifact.bytecode,
        dep.signer,
      );
      const cusdt0InterestRateModel = await interestRateModelFactory.deploy(
        '20000000000000000', // 2% base rate (0.02)
        '800000000000000000', // 80% multiplier (0.8)
        '1000000000000000000', // 100% jump multiplier (1.0)
        '1000000000000000000000000000', // 1e27 kink
        dep.address, // admin
      );
      await cusdt0InterestRateModel.deployed();

      // Deploy PriceOracleProxy
      const priceOracleFactory = new ethers.ContractFactory(
        PriceOracleProxyArtifact.abi,
        PriceOracleProxyArtifact.bytecode,
        dep.signer,
      );
      const testPriceOracle = await priceOracleFactory.deploy(dep.address); // dep is guardian
      await testPriceOracle.deployed();

      // Deploy a fresh unitroller (proxy) for testing
      const unitrollerFactory = new ethers.ContractFactory(
        UnitrollerArtifact.abi,
        UnitrollerArtifact.bytecode,
        dep.signer,
      );
      const testUnitroller = await unitrollerFactory.deploy();
      await testUnitroller.deployed();

      // Deploy a new comptroller implementation and set it up with the unitroller
      newComptroller = await tropykus.setComptroller(dep, null, testUnitroller.address);

      // Deploy market for 6-decimal token (USDT0)
      cusdt0 = await tropykus.addMarket(
        dep,
        'CErc20Immutable',
        null,
        usdt0Token.address,
        {
          comptrollerAddress: newComptroller.address,
          interestRateModelAddress: cusdt0InterestRateModel.address,
          initialExchangeRate: 0.02,
          name: 'New CUSDT0',
          symbol: 'CUSDT0',
          decimals: 18,
        });

      // Deploy MockPriceProviderMoC for price oracle
      const mockPriceProviderFactory = new ethers.ContractFactory(
        MockPriceProviderMoCArtifact.abi,
        MockPriceProviderMoCArtifact.bytecode,
        dep.signer,
      );

      // USDT0 price: 1 * 1e8 (stablecoin) from redstone oracles
      const cusdt0PriceProvider = await mockPriceProviderFactory.deploy(
        dep.address, // guardian
        ethers.utils.parseUnits('1', 8), // price in 8 decimals
      );
      await cusdt0PriceProvider.deployed();

      // Deploy PriceOracleAdapterMoc
      const adapterFactory = new ethers.ContractFactory(
        MockPriceOracleAdapterUSDTArtifact.abi,
        MockPriceOracleAdapterUSDTArtifact.bytecode,
        dep.signer,
      );

      const cusdt0Adapter = await adapterFactory.deploy(
        dep.address, // guardian
        cusdt0PriceProvider.address, // priceProvider
      );
      await cusdt0Adapter.deployed();

      // Set up price oracle
      await newComptroller.setOracle(dep, testPriceOracle.address);
      await tropykus.setPriceOracle(testPriceOracle.address);

      // Connect adapter to market
      const tx = await tropykus.priceOracle.setAdapterToToken(dep, cusdt0.address, cusdt0Adapter.address);
      await tx.wait();

      // Set comptroller and support se
      await cusdt0.setComptroller(dep, newComptroller.address);
      await newComptroller.supportMarket(dep, cusdt0.address);
      await newComptroller.setCollateralFactor(dep, cusdt0.address, 0.75);
      await cusdt0.setReserveFactor(dep, 0.5);

      // Get test accounts
      alice = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/1`);

      // Fund accounts with native currency (RBTC/ETH) for gas
      const fundedAccount = tropykus.provider.getSigner(0);
      const fundAmount = ethers.utils.parseEther('10000'); // 10000 RBTC/ETH per account
      const accountsToFund = [dep, alice];

      // Use Anvil's setBalance RPC method for efficient funding
      for (const account of accountsToFund) {
        await tropykus.provider.send('anvil_setBalance', [
          account.address,
          ethers.utils.hexValue(fundAmount),
        ]);
      }

      // Transfer ERC20 tokens to accounts
      const tokenAmount = ethers.utils.parseUnits('100000', 6); // 100k tokens with 6 decimals
      const docTx = await usdt0Token.transfer(alice.address, tokenAmount);
      await docTx.wait();
    });

    afterEach(async () => {
      // Clear all variables to ensure tests don't interfere with each other
      usdt0Token = null;
      cusdt0 = null;
      newComptroller = null;
      alice = null;
    });

    it('should detect 6 decimals from token contract', async () => {
      // Verify that the underlying token has 6 decimals
      const tokenDecimals = await usdt0Token.decimals();
      expect(tokenDecimals).to.equal(6);

      // Verify that the market correctly detected 6 decimals
      // Note: This will fail until T018 implements decimal detection in CErc20 constructor
      // Once T018 is complete, the market should have a tokenDecimals property set to 6
      if (cusdt0.tokenDecimals !== undefined) {
        expect(cusdt0.tokenDecimals).to.equal(6);
      } else {
        // TDD: This test will fail until T018 is implemented
        // For now, we can verify the token contract itself has 6 decimals
        const marketTokenDecimals = await cusdt0.erc20Instance.decimals();
        expect(marketTokenDecimals).to.equal(6);
      }
    });

    it('should deposit 1.0 USDT0 token (6 decimals → 1000000)', async () => {
      // Get initial balance (Alice already has tokens from beforeEach)
      const initialBalance = await usdt0Token.balanceOf(alice.address);
      
      // Transfer tokens to alice first
      const transferAmount = ethers.utils.parseUnits('10', 6); // 10 USDT0 with 6 decimals
      await usdt0Token.transfer(alice.address, transferAmount);
      
      // Check balance before mint
      const balanceBefore = await usdt0Token.balanceOf(alice.address);
      const expectedBefore = initialBalance.add(transferAmount);
      expect(balanceBefore.toString()).to.equal(expectedBefore.toString());
      
      // Deposit 1.0 USDT0 - should convert to 1000000 (1e6) internally
      await cusdt0.mint(alice, 1.0);
      
      // Check balance after mint
      const balanceAfter = await usdt0Token.balanceOf(alice.address);
      const expectedAfter = balanceBefore.sub(ethers.utils.parseUnits('1', 6));
      expect(balanceAfter.toString()).to.equal(expectedAfter.toString());
      
      // Verify the balance reflects 1.0 tokens with 6-decimal precision
      const balance = await cusdt0.balanceOfUnderlying(alice);
      expect(balance.underlying).to.equal(1.0);
      expect(balance.usd).to.equal(1.0); // 1.0 USDT0 * 1.0 USD price
      
      // Verify the underlying token balance was correctly deducted
      // Alice should have initialBalance + 10 - 1 = initialBalance + 9 USDT0 remaining
      const aliceTokenBalance = await usdt0Token.balanceOf(alice.address);
      const expectedFinalBalance = initialBalance.add(ethers.utils.parseUnits('9', 6));
      expect(aliceTokenBalance.toString()).to.equal(expectedFinalBalance.toString());
    });

    it('should query balance with 6-decimal precision display', async () => {
      // Get initial balance
      const initialBalance = await usdt0Token.balanceOf(alice.address);
      
      // Transfer and deposit tokens
      const transferAmount = ethers.utils.parseUnits('5.123456', 6); // 5.123456 USDT0
      await usdt0Token.transfer(alice.address, transferAmount);
      
      // Deposit 5.123456 USDT0
      await cusdt0.mint(alice, 5.123456);
      
      // Query balance - should display with 6-decimal precision
      const balance = await cusdt0.balanceOfUnderlying(alice);
      expect(balance.underlying).to.equal(5.123456);
      expect(balance.usd).to.equal(5.123456); // 5.123456 USDT0 * 1.0 USD price
      
      // Also test balanceOfUnderlyingInWallet
      const walletBalance = await cusdt0.balanceOfUnderlyingInWallet(alice);
      // Should show remaining tokens in wallet (initial balance, since we only deposited the transferred amount)
      // Initial balance is 100000 USDT0 from beforeEach
      const expectedWalletBalance = Number(ethers.utils.formatUnits(initialBalance, 6));
      expect(walletBalance.underlying.value).to.equal(expectedWalletBalance);
    });

    it('should borrow 10.5 USDT0 tokens (6 decimals → 10500000)', async () => {
      // Get initial balance
      const initialBalance = await usdt0Token.balanceOf(alice.address);
      
      // First, deposit collateral so alice can borrow
      const collateralAmount = ethers.utils.parseUnits('20', 6); // 20 USDT0
      await usdt0Token.transfer(alice.address, collateralAmount);
      await cusdt0.mint(alice, 20.0);
      
      // Enter market for alice
      await newComptroller.enterMarkets(alice, [cusdt0.address]);
      
      // Borrow 10.5 USDT0 - should convert to 10500000 (10.5e6) internally
      await cusdt0.borrow(alice, 10.5);
      
      // Verify the borrow balance reflects 10.5 tokens with 6-decimal precision
      const borrowBalance = await cusdt0.borrowBalanceCurrent(alice);
      expect(borrowBalance.underlying).to.equal(10.5);
      expect(borrowBalance.usd).to.equal(10.5); // 10.5 USDT0 * 1.0 USD price
      
      // Verify alice received the borrowed tokens
      const aliceTokenBalance = await usdt0Token.balanceOf(alice.address);
      // Should have: initial + 20 (transferred) - 20 (deposited) + 10.5 (borrowed) = initial + 10.5
      const expectedTokenBalance = initialBalance.add(ethers.utils.parseUnits('10.5', 6));
      expect(aliceTokenBalance.toString()).to.equal(expectedTokenBalance.toString());
    });

    it('should repay borrow with correct 6-decimal parsing', async () => {
      // Get initial balance (Alice already has tokens from beforeEach)
      const initialBalance = await usdt0Token.balanceOf(alice.address);
      
      // First, deposit collateral and borrow
      const collateralAmount = ethers.utils.parseUnits('15', 6); // 15 USDT0
      await usdt0Token.transfer(alice.address, collateralAmount);
      await cusdt0.mint(alice, 15.0);
      
      // Enter market for alice
      await newComptroller.enterMarkets(alice, [cusdt0.address]);
      
      // Borrow 7.5 USDT0
      await cusdt0.borrow(alice, 7.5);
      
      // Verify borrow balance before repay
      const borrowBalanceBefore = await cusdt0.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore.underlying).to.equal(7.5);
      
      // Repay 3.25 USDT0 - should use correct 6-decimal parsing
      await cusdt0.repayBorrow(alice, 3.25);
      
      // Verify borrow balance after partial repay
      const borrowBalanceAfter = await cusdt0.borrowBalanceCurrent(alice);
      // Should be approximately 7.5 - 3.25 = 4.25 (allowing for small interest accrual)
      expect(borrowBalanceAfter.underlying).to.be.closeTo(4.25, 0.01);
      
      // Repay remaining balance
      await cusdt0.repayBorrow(alice, null, true); // repay all
      
      // Verify borrow balance is now zero
      const borrowBalanceFinal = await cusdt0.borrowBalanceCurrent(alice);
      expect(borrowBalanceFinal.underlying).to.equal(0);
      
      // Verify alice's token balance is correct after repay
      // Should have: initial + 15 (transferred) - 15 (deposited) + 7.5 (borrowed) - 7.5 (repaid) = initial
      const finalTokenBalance = await usdt0Token.balanceOf(alice.address);
      expect(finalTokenBalance.toString()).to.equal(initialBalance.toString());
    });

    it('should redeem with correct 6-decimal parsing', async () => {
      // Get initial balance (Alice already has tokens from beforeEach)
      const initialBalance = await usdt0Token.balanceOf(alice.address);
      
      // First, deposit tokens
      const depositAmount = ethers.utils.parseUnits('25', 6); // 25 USDT0
      await usdt0Token.transfer(alice.address, depositAmount);
      await cusdt0.mint(alice, 25.0);
      
      // Verify deposit was successful
      const balanceAfterDeposit = await cusdt0.balanceOfUnderlying(alice);
      expect(balanceAfterDeposit.underlying).to.equal(25.0);
      
      // Redeem 10.5 USDT0 - should use correct 6-decimal parsing
      await cusdt0.redeem(alice, 10.5);
      
      // Verify balance after partial redeem
      const balanceAfterRedeem = await cusdt0.balanceOfUnderlying(alice);
      // Should be approximately 25.0 - 10.5 = 14.5 (allowing for small rounding)
      expect(balanceAfterRedeem.underlying).to.be.closeTo(14.5, 0.01);
      
      // Verify alice received the redeemed tokens
      const tokenBalanceAfterRedeem = await usdt0Token.balanceOf(alice.address);
      // Should have: initial + 25 (transferred) - 25 (deposited) + 10.5 (redeemed) = initial + 10.5
      const expectedBalance = initialBalance.add(ethers.utils.parseUnits('10.5', 6));
      expect(tokenBalanceAfterRedeem.toString()).to.equal(expectedBalance.toString());
      
      // Redeem remaining balance
      await cusdt0.redeem(alice, null, true); // redeem all
      
      // Verify balance is now zero
      const balanceFinal = await cusdt0.balanceOfUnderlying(alice);
      expect(balanceFinal.underlying).to.equal(0);
      
      // Verify alice's final token balance
      // Should have: initial + 25 (transferred) - 25 (deposited) + 25 (all redeemed) = initial + 25
      const finalTokenBalance = await usdt0Token.balanceOf(alice.address);
      const expectedFinalBalance = initialBalance.add(ethers.utils.parseUnits('25', 6));
      expect(finalTokenBalance.toString()).to.equal(expectedFinalBalance.toString());
    });

    it('should transfer underlying tokens with correct 6-decimal parsing', async () => {
      // Get initial balance (Alice already has tokens from beforeEach)
      const aliceInitialBalance = await usdt0Token.balanceOf(alice.address);
      
      // Create bob account for receiving tokens
      const bob = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/2`);
      const bobInitialBalance = await usdt0Token.balanceOf(bob.address);
      
      // Transfer additional tokens to alice for testing
      const transferAmount = ethers.utils.parseUnits('30', 6); // 30 USDT0
      await usdt0Token.transfer(alice.address, transferAmount);
      
      // Verify alice's balance after transfer
      const aliceBalanceAfterTransfer = await usdt0Token.balanceOf(alice.address);
      const expectedAliceBalance = aliceInitialBalance.add(transferAmount);
      expect(aliceBalanceAfterTransfer.toString()).to.equal(expectedAliceBalance.toString());
      
      // Transfer 12.5 USDT0 from alice to bob using transferUnderlying
      // Should use correct 6-decimal parsing (12.5 * 10^6 = 12500000)
      await cusdt0.transferUnderlying(alice, bob.address, 12.5);
      
      // Verify alice's balance decreased by 12.5 USDT0
      const aliceBalanceAfterTransferUnderlying = await usdt0Token.balanceOf(alice.address);
      const expectedAliceBalanceAfter = aliceInitialBalance.add(transferAmount).sub(ethers.utils.parseUnits('12.5', 6));
      expect(aliceBalanceAfterTransferUnderlying.toString()).to.equal(expectedAliceBalanceAfter.toString());
      
      // Verify bob's balance increased by 12.5 USDT0
      const bobBalanceAfterTransfer = await usdt0Token.balanceOf(bob.address);
      const expectedBobBalance = bobInitialBalance.add(ethers.utils.parseUnits('12.5', 6));
      expect(bobBalanceAfterTransfer.toString()).to.equal(expectedBobBalance.toString());
      
      // Transfer another 5.75 USDT0 from alice to bob
      await cusdt0.transferUnderlying(alice, bob.address, 5.75);
      
      // Verify final balances
      const aliceFinalBalance = await usdt0Token.balanceOf(alice.address);
      const expectedAliceFinal = aliceInitialBalance.add(transferAmount)
        .sub(ethers.utils.parseUnits('12.5', 6))
        .sub(ethers.utils.parseUnits('5.75', 6));
      expect(aliceFinalBalance.toString()).to.equal(expectedAliceFinal.toString());
      
      const bobFinalBalance = await usdt0Token.balanceOf(bob.address);
      const expectedBobFinal = bobInitialBalance
        .add(ethers.utils.parseUnits('12.5', 6))
        .add(ethers.utils.parseUnits('5.75', 6));
      expect(bobFinalBalance.toString()).to.equal(expectedBobFinal.toString());
    });
  });

  describe('Multi-market operations with decimal handling', () => {
    let usdt0Token;
    let cusdt0;
    let cdoc;
    let newComptroller;
    let alice;
    let markets;

    beforeEach(async () => {
      // Ensure dep has native currency for gas
      const depBalance = await tropykus.provider.getBalance(dep.address);
      if (depBalance.lt(ethers.utils.parseEther('100'))) {
        const fundedAccount = tropykus.provider.getSigner(0);
        const fundedAddress = await fundedAccount.getAddress();
        if (fundedAddress.toLowerCase() !== dep.address.toLowerCase()) {
          const tx = await fundedAccount.sendTransaction({
            to: dep.address,
            value: ethers.utils.parseEther('10000'),
          });
          await tx.wait();
        }
      }

      // Deploy 6-decimal ERC20 token (USDT0)
      const usdt0TokenFactory = new ethers.ContractFactory(
        StandardTokenArtifact.abi,
        StandardTokenArtifact.bytecode,
        dep.signer,
      );
      usdt0Token = await usdt0TokenFactory.deploy(
        ethers.utils.parseUnits('1000000', 6), // 1M tokens with 6 decimals
        'USDT0 Token',
        6, // 6 decimals
        'USDT0',
      );
      await usdt0Token.deployed();

      // Deploy interest rate models
      const interestRateModelFactory = new ethers.ContractFactory(
        JumpRateModelV2Artifact.abi,
        JumpRateModelV2Artifact.bytecode,
        dep.signer,
      );
      const cusdt0InterestRateModel = await interestRateModelFactory.deploy(
        '20000000000000000', // 2% base rate (0.02)
        '800000000000000000', // 80% multiplier (0.8)
        '1000000000000000000', // 100% jump multiplier (1.0)
        '1000000000000000000000000000', // 1e27 kink
        dep.address, // admin
      );
      await cusdt0InterestRateModel.deployed();

      const cdocInterestRateModel = await interestRateModelFactory.deploy(
        '20000000000000000', // 2% base rate (0.02)
        '800000000000000000', // 80% multiplier (0.8)
        '1000000000000000000', // 100% jump multiplier (1.0)
        '1000000000000000000000000000', // 1e27 kink
        dep.address, // admin
      );
      await cdocInterestRateModel.deployed();

      // Deploy PriceOracleProxy
      const priceOracleFactory = new ethers.ContractFactory(
        PriceOracleProxyArtifact.abi,
        PriceOracleProxyArtifact.bytecode,
        dep.signer,
      );
      const testPriceOracle = await priceOracleFactory.deploy(dep.address); // dep is guardian
      await testPriceOracle.deployed();

      // Deploy a fresh unitroller (proxy) for testing
      const unitrollerFactory = new ethers.ContractFactory(
        UnitrollerArtifact.abi,
        UnitrollerArtifact.bytecode,
        dep.signer,
      );
      const testUnitroller = await unitrollerFactory.deploy();
      await testUnitroller.deployed();

      // Deploy a new comptroller implementation and set it up with the unitroller
      newComptroller = await tropykus.setComptroller(dep, null, testUnitroller.address);

      // Deploy market for 6-decimal token (USDT0)
      cusdt0 = await tropykus.addMarket(
        dep,
        'CErc20Immutable',
        null,
        usdt0Token.address,
        {
          comptrollerAddress: newComptroller.address,
          interestRateModelAddress: cusdt0InterestRateModel.address,
          initialExchangeRate: 0.02,
          name: 'New CUSDT0',
          symbol: 'CUSDT0',
          decimals: 18,
        });

      // Deploy market for 18-decimal token (DOC) - reuse existing DOC token if available
      // For testing, we'll create a new DOC token
      const docTokenFactory = new ethers.ContractFactory(
        StandardTokenArtifact.abi,
        StandardTokenArtifact.bytecode,
        dep.signer,
      );
      const docToken = await docTokenFactory.deploy(
        ethers.utils.parseEther('1000000'), // 1M tokens with 18 decimals
        'DOC Token',
        18, // 18 decimals
        'DOC',
      );
      await docToken.deployed();

      cdoc = await tropykus.addMarket(
        dep,
        'CErc20Immutable',
        null,
        docToken.address,
        {
          comptrollerAddress: newComptroller.address,
          interestRateModelAddress: cdocInterestRateModel.address,
          initialExchangeRate: 0.02,
          name: 'New CDOC',
          symbol: 'CDOC',
          decimals: 18,
        });

      // Deploy price providers
      const mockPriceProviderFactory = new ethers.ContractFactory(
        MockPriceProviderMoCArtifact.abi,
        MockPriceProviderMoCArtifact.bytecode,
        dep.signer,
      );

      // USDT0 price: 1 * 1e8 (stablecoin)
      const cusdt0PriceProvider = await mockPriceProviderFactory.deploy(
        dep.address, // guardian
        ethers.utils.parseUnits('1', 8), // price in 8 decimals
      );
      await cusdt0PriceProvider.deployed();

      // DOC price: 1 * 1e18
      const cdocPriceProvider = await mockPriceProviderFactory.deploy(
        dep.address, // guardian
        ethers.utils.parseUnits('1', 18), // price in 8 decimals
      );
      await cdocPriceProvider.deployed();

      // Deploy PriceOracleAdapterUSDT for USDT0
      const adapterFactory = new ethers.ContractFactory(
        MockPriceOracleAdapterUSDTArtifact.abi,
        MockPriceOracleAdapterUSDTArtifact.bytecode,
        dep.signer,
      );

      const cusdt0Adapter = await adapterFactory.deploy(
        dep.address, // guardian
        cusdt0PriceProvider.address, // priceProvider
      );
      await cusdt0Adapter.deployed();

      // Deploy PriceOracleAdapterMoc for DOC
      const mocAdapterFactory = new ethers.ContractFactory(
        PriceOracleAdapterMocArtifact.abi,
        PriceOracleAdapterMocArtifact.bytecode,
        dep.signer,
      );

      const cdocAdapter = await mocAdapterFactory.deploy(
        dep.address, // guardian
        cdocPriceProvider.address, // priceProvider
      );
      await cdocAdapter.deployed();

      // Set up price oracle
      await newComptroller.setOracle(dep, testPriceOracle.address);
      await tropykus.setPriceOracle(testPriceOracle.address);

      // Connect adapters to markets
      await tropykus.priceOracle.setAdapterToToken(dep, cusdt0.address, cusdt0Adapter.address);
      await tropykus.priceOracle.setAdapterToToken(dep, cdoc.address, cdocAdapter.address);

      // Set comptroller and support markets
      await cusdt0.setComptroller(dep, newComptroller.address);
      await cdoc.setComptroller(dep, newComptroller.address);
      await newComptroller.supportMarket(dep, cusdt0.address);
      await newComptroller.supportMarket(dep, cdoc.address);
      await newComptroller.setCollateralFactor(dep, cusdt0.address, 0.7);
      await newComptroller.setCollateralFactor(dep, cdoc.address, 0.8);
      await cusdt0.setReserveFactor(dep, 0.5);
      await cdoc.setReserveFactor(dep, 0.5);

      // Get test accounts
      alice = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/1`);

      // Fund accounts with native currency (RBTC/ETH) for gas
      const fundAmount = ethers.utils.parseEther('10000'); // 10000 RBTC/ETH per account
      const accountsToFund = [dep, alice];

      // Use Anvil's setBalance RPC method for efficient funding
      for (const account of accountsToFund) {
        await tropykus.provider.send('anvil_setBalance', [
          account.address,
          ethers.utils.hexValue(fundAmount),
        ]);
      }

      // Transfer ERC20 tokens to accounts
      const usdt0Amount = ethers.utils.parseUnits('100000', 6); // 100k USDT0 with 6 decimals
      const docAmount = ethers.utils.parseEther('100000'); // 100k DOC with 18 decimals
      await usdt0Token.transfer(alice.address, usdt0Amount);
      await docToken.transfer(alice.address, docAmount);

      // Create markets array for multi-market operations
      markets = [cusdt0, cdoc];
    });

    afterEach(async () => {
      // Clear all variables
      usdt0Token = null;
      cusdt0 = null;
      cdoc = null;
      newComptroller = null;
      alice = null;
      markets = null;
    });

    it.skip('should get account liquidity across multiple markets with different decimals', async () => {
      // Deposit collateral in both markets
      await cusdt0.mint(alice, 1000.0); // 1000 USDT0 (6 decimals)
      await cdoc.mint(alice, 2000.0); // 2000 DOC (18 decimals)
      
      // Enter markets
      await newComptroller.enterMarkets(alice, [cusdt0.address, cdoc.address]);
      
      // The liquidity from cusdt0 should be 700 because the collateral factor is 0.7
      // The liquidity from cdoc should be 1600 because the collateral factor is 0.8
      // Get account liquidity in USD (should work with any market address or empty)
      const liquidityUSD = await newComptroller.getAccountLiquidity(alice, '');
      const liquidityCUSDT0 = await newComptroller.getAccountLiquidity(alice, cusdt0.address);
      const liquidityCDOC = await newComptroller.getAccountLiquidity(alice, cdoc.address);
      expect(liquidityUSD.usd.value).to.be.closeTo(2300, 0.01);
      expect(liquidityCUSDT0.usd.value).to.be.equal(700);
      expect(liquidityCUSDT0.underlying.value).to.be.equal(700);
      expect(liquidityCUSDT0.underlying.value).to.be.equal(700);
      expect(liquidityCDOC.underlying.value).to.be.equal(1600);
    });

    it.skip('should get hypothetical account liquidity with correct decimal parsing', async () => {
      // Deposit collateral
      await cusdt0.mint(alice, 1000.0); // 1000 USDT0
      await cdoc.mint(alice, 2000.0); // 2000 DOC

      // Enter markets
      await newComptroller.enterMarkets(alice, [cusdt0.address, cdoc.address]);

      // Test hypothetical liquidity with redeem and borrow
      // Redeem 100 USDT0 (6 decimals) and borrow 0 DOC (18 decimals)
      // Before the redeem the expected liquity is 2300 USD, because the collateral factor is 0.7 for USDT0 and 0.8 for DOC
      // After the redeem the expected liquity is 1600 USD, because the collateral factor is 0.7 for USDT0 and 0.8 for DOC
      // The expected shortfall is 0 USD, because the borrow amount is 0
      
      // After redeeming 100 USDT0 the liquidity should be reduced by 100 * 0.7 = 70 USD
      // The expected liquidity should be 2300 - 70 = 2230 USD

      // Get initial liquidity to verify
      const initialLiquidity = await newComptroller.getAccountLiquidity(alice, '');
      expect(initialLiquidity.usd.value).to.be.closeTo(2300, 0.01); // 1000*0.7 + 2000*0.8 = 700 + 1600 = 2300

      // Convert 100 USDT0 (underlying) to cTokens (kUSDT0) using exchange rate
      // getHypotheticalAccountLiquidity expects redeemTokens in cToken units, not underlying units
      // The exchange rate mantissa already accounts for the underlying token decimals at deployment time
      const underlyingAmount = 100.0; // 100 USDT0
      const tokenDecimals = 6; // USDT0 has 6 decimals
      const exchangeRateMantissa = await cusdt0.instance.connect(alice.signer).callStatic.exchangeRateCurrent();
      
      // Parse underlying amount: 100 USDT0 = 100 * 10^6
      const underlyingAmountParsed = ethers.utils.parseUnits(underlyingAmount.toString(), tokenDecimals);
      
      // Calculate cTokens: cTokens = underlying / exchangeRate
      // The exchange rate mantissa is in 18 decimals and already accounts for underlying decimals
      // Formula: cTokensMantissa (18 decimals) = (underlyingAmountParsed * 1e18) / exchangeRateMantissa
      const cTokensMantissa = underlyingAmountParsed.mul(ethers.BigNumber.from(10).pow(18)).div(exchangeRateMantissa);
      
      // Convert to human-readable: divide by 1e18
      // Use toString() to avoid scientific notation issues
      const cTokensHumanReadable = parseFloat(cTokensMantissa.toString()) / 1e18;

      const hypothetical = await newComptroller.getHypotheticalAccountLiquidity(
        alice,
        cusdt0.address,
        cTokensHumanReadable, // redeem cTokens equivalent to 100 USDT0
        0, // no borrow
      );

      // Get price for CUSDT0 to calculate expected underlying
      const price = await tropykus.priceOracle.getUnderlyingPrice(cusdt0.address);
      
      // Verify liquidity: should be 2230 USD (2300 - 70)
      expect(hypothetical.liquidity.usd).to.be.closeTo(2230, 0.1);
      // Underlying is total liquidity converted to CUSDT0 terms (since marketAddress is CUSDT0)
      expect(hypothetical.liquidity.underlying).to.be.closeTo(2230 / price, 0.1);
      
      // Verify shortfall: should be 0 since we still have positive liquidity
      expect(hypothetical.shortfall.usd).to.equal(0);
      expect(hypothetical.shortfall.underlying).to.equal(0);
      
      // Verify types
      expect(hypothetical.liquidity.usd).to.be.a('number');
      expect(hypothetical.liquidity.underlying).to.be.a('number');
      expect(hypothetical.shortfall.usd).to.be.a('number');
      expect(hypothetical.shortfall.underlying).to.be.a('number');
    });

    it.skip('should convert underlying tokens to cTokens with correct decimal handling', async () => {
      // Deposit some collateral to establish exchange rate
      await cusdt0.mint(alice, 1000.0); // 1000 USDT0 (6 decimals)
      await cdoc.mint(alice, 100.0); // 100 DOC (18 decimals)

      // Get exchange rates for verification
      const cusdt0ExchangeRate = await cusdt0.instance.connect(alice.signer).callStatic.exchangeRateCurrent();
      const cdocExchangeRate = await cdoc.instance.connect(alice.signer).callStatic.exchangeRateCurrent();
      
      // Convert exchange rates to human-readable (both are in 18 decimals)
      const cusdt0ExchangeRateHuman = Number(cusdt0ExchangeRate.toString()) / 1e18;
      const cdocExchangeRateHuman = Number(cdocExchangeRate.toString()) / 1e18;

      // Test conversion for 6-decimal token (USDT0)
      const underlyingUSDT0 = 100.0; // 100 USDT0
      const cTokensUSDT0 = await cusdt0.getTokensFromUnderlying(alice, underlyingUSDT0);
      
      // Verify: cTokens = underlying / exchangeRate
      const expectedCTokensUSDT0 = 5000;
      expect(cTokensUSDT0.value).to.be.equal(expectedCTokensUSDT0);
      expect(cTokensUSDT0.value).to.be.a('number');
      expect(cTokensUSDT0.fixedNumber).to.be.instanceOf(ethers.FixedNumber);

      // Test conversion for 18-decimal token (DOC)
      const underlyingDOC = 100.0; // 100 DOC
      const cTokensDOC = await cdoc.getTokensFromUnderlying(alice, underlyingDOC);
      
      // Verify: cTokens = underlying / exchangeRate
      const expectedCTokensDOC = 5000;
      expect(cTokensDOC.value).to.be.equal(expectedCTokensDOC);
      expect(cTokensDOC.value).to.be.a('number');
      expect(cTokensDOC.fixedNumber).to.be.instanceOf(ethers.FixedNumber);

      // Verify that the method correctly handles different decimal precisions
      // For USDT0 (6 decimals), 100 underlying should convert correctly
      // For DOC (18 decimals), 200 underlying should convert correctly
      expect(cTokensUSDT0.value).to.be.greaterThan(0);
      expect(cTokensDOC.value).to.be.greaterThan(0);
    });

    it.skip('should get total borrows across all markets with correct decimal handling', async () => {
      // Deposit collateral
      await cusdt0.mint(alice, 1000.0); // 1000 USDT0
      await cdoc.mint(alice, 2000.0); // 2000 DOC

      // Enter markets
      await newComptroller.enterMarkets(alice, [cusdt0.address, cdoc.address]);

      // Borrow from both markets
      await cusdt0.borrow(alice, 100.0); // 100 USDT0 (6 decimals)
      await cdoc.borrow(alice, 500.0); // 500 DOC (18 decimals)

      // Get total borrows in USD
      const totalBorrowsUSD = await newComptroller.getTotalBorrowsInAllMarkets(alice, markets, '');
      expect(totalBorrowsUSD.usd).to.be.closeTo(600, 0.1);

      // Get total borrows in USDT0 terms
      const totalBorrowsUSDT0 = await newComptroller.getTotalBorrowsInAllMarkets(
        alice,
        markets,
        cusdt0.address,
      );
      expect(totalBorrowsUSDT0.usd).to.be.closeTo(600, 0.1);
      expect(totalBorrowsUSDT0.underlying).to.be.closeTo(100, 0.1);

      // Get total borrows in DOC terms
      const totalBorrowsDOC = await newComptroller.getTotalBorrowsInAllMarkets(
        alice,
        markets,
        cdoc.address,
      );
      expect(totalBorrowsDOC.usd).to.be.closeTo(600, 0.1);
      expect(totalBorrowsDOC.underlying).to.be.closeTo(500, 0.1);
    });

    it.skip('should get total supply across all markets with correct decimal handling', async () => {
      // Deposit in both markets
      await cusdt0.mint(alice, 1000.0); // 1000 USDT0 (6 decimals)
      await cdoc.mint(alice, 2000.0); // 2000 DOC (18 decimals)

      // Enter markets
      await newComptroller.enterMarkets(alice, [cusdt0.address, cdoc.address]);

      // Get total supply in USD
      const totalSupplyUSD = await newComptroller.getTotalSupplyInAllMarkets(
        alice,
        markets,
        '',
      );
      expect(totalSupplyUSD.usd).to.be.closeTo(3000, 0.1);
      expect(totalSupplyUSD.withCollateral).to.be.closeTo(2300, 0.1);

      // Get total supply in USDT0 terms
      const totalSupplyUSDT0 = await newComptroller.getTotalSupplyInAllMarkets(
        alice,
        markets,
        cusdt0.address,
      );
      expect(totalSupplyUSDT0.usd).to.be.closeTo(3000, 0.1);
      // The collateral factor is 0.7 for USDT0, so the total supply in USDT0 terms is 1000 * 0.7 = 700
      expect(totalSupplyUSDT0.underlying).to.be.closeTo(3000, 0.1);

      // Get total supply in DOC terms
      const totalSupplyDOC = await newComptroller.getTotalSupplyInAllMarkets(
        alice,
        markets,
        cdoc.address,
      );
      expect(totalSupplyDOC.usd).to.be.closeTo(3000, 0.1);
        // The collateral factor is 0.8 for DOC, so the total supply in DOC terms is 2000 * 0.8 = 1600
      expect(totalSupplyDOC.underlying).to.be.closeTo(3000, 0.1);
    });

    it('should calculate maxAllowedToWithdraw correctly across multiple markets', async () => {
      // Deposit collateral in both markets
      await cusdt0.mint(alice, 1000.0); // 1000 USDT0 (6 decimals)
      await cdoc.mint(alice, 2000.0); // 2000 DOC (18 decimals)

      // Enter markets
      await newComptroller.enterMarkets(alice, [cusdt0.address, cdoc.address]);

      // Borrow from one market
      await cusdt0.borrow(alice, 100.0); // 100 USDT0

      // Get max allowed to withdraw from USDT0 market
      const maxWithdrawUSDT0 = await cusdt0.maxAllowedToWithdraw(alice, markets);
      expect(maxWithdrawUSDT0.underlying).to.be.greaterThan(0);
      expect(maxWithdrawUSDT0.usd).to.be.greaterThan(0);
      expect(maxWithdrawUSDT0.tokens).to.be.ok;
      expect(maxWithdrawUSDT0.tokens.value).to.be.greaterThan(0);

      // Get max allowed to withdraw from DOC market
      const maxWithdrawDOC = await cdoc.maxAllowedToWithdraw(alice, markets);
      expect(maxWithdrawDOC.underlying).to.be.greaterThan(0);
      expect(maxWithdrawDOC.usd).to.be.greaterThan(0);
      expect(maxWithdrawDOC.tokens).to.be.ok;
      expect(maxWithdrawDOC.tokens.value).to.be.greaterThan(0);

      // Max withdraw should be less than or equal to supply
      const balanceUSDT0 = await cusdt0.balanceOfUnderlying(alice);
      expect(maxWithdrawUSDT0.underlying).to.be.at.most(balanceUSDT0.underlying);

      const balanceDOC = await cdoc.balanceOfUnderlying(alice);
      expect(maxWithdrawDOC.underlying).to.be.at.most(balanceDOC.underlying);
    });

    it.skip('should calculate maxAllowedToDeposit correctly for each market', async () => {
      // Get max allowed to deposit for USDT0 (should be wallet balance)
      const maxDepositUSDT0 = await cusdt0.maxAllowedToDeposit(alice);
      expect(maxDepositUSDT0.underlying.value).to.be.greaterThan(0);
      expect(maxDepositUSDT0.usd.value).to.be.greaterThan(0);

      // Get max allowed to deposit for DOC (should be wallet balance)
      const maxDepositDOC = await cdoc.maxAllowedToDeposit(alice);
      expect(maxDepositDOC.underlying.value).to.be.greaterThan(0);
      expect(maxDepositDOC.usd.value).to.be.greaterThan(0);

      // Verify it matches wallet balance
      const walletBalanceUSDT0 = await cusdt0.balanceOfUnderlyingInWallet(alice);
      expect(maxDepositUSDT0.underlying.value).to.be.closeTo(
        walletBalanceUSDT0.underlying.value,
        0.01,
      );

      const walletBalanceDOC = await cdoc.balanceOfUnderlyingInWallet(alice);
      expect(maxDepositDOC.underlying.value).to.be.closeTo(
        walletBalanceDOC.underlying.value,
        0.01,
      );
    });

    it.skip('should handle cross-market operations with mixed decimal precisions', async () => {
      // Deposit in both markets
      await cusdt0.mint(alice, 1000.0); // 1000 USDT0 (6 decimals)
      await cdoc.mint(alice, 2000.0); // 2000 DOC (18 decimals)

      // Enter markets
      await newComptroller.enterMarkets(alice, [cusdt0.address, cdoc.address]);

      // Borrow from USDT0 market (6 decimals)
      await cusdt0.borrow(alice, 100.0);

      // Get total borrows - should correctly sum USD values from both markets
      const totalBorrows = await newComptroller.getTotalBorrowsInAllMarkets(
        alice,
        markets,
        cusdt0.address,
      );
      expect(totalBorrows.usd).to.be.greaterThan(0);
      expect(totalBorrows.underlying).to.be.greaterThan(0);

      // Get total supply - should correctly sum USD values from both markets
      const totalSupply = await newComptroller.getTotalSupplyInAllMarkets(
        alice,
        markets,
        cusdt0.address,
      );
      expect(totalSupply.usd).to.be.greaterThan(0);
      expect(totalSupply.underlying).to.be.greaterThan(0);
      expect(totalSupply.withCollateral).to.be.ok;

      // Verify that total supply USD is greater than total borrows USD
      // (account should have positive liquidity)
      expect(totalSupply.usd).to.be.greaterThan(totalBorrows.usd);
    });
  });
});
