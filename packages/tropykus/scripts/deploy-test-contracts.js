/**
 * Deploy Tropykus contracts to local Hardhat network for testing
 * This script deploys all necessary contracts for the test suite
 */

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Load contract artifacts
const artifactsDir = path.join(__dirname, '../artifacts');

function loadArtifact(name) {
  const artifactPath = path.join(artifactsDir, `${name}.json`);
  return JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
}

async function main() {
  // Connect to Hardhat network
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const [deployer] = await provider.listAccounts();
  const signer = provider.getSigner(deployer);

  console.log('Deploying contracts with account:', deployer);
  console.log('Account balance:', ethers.utils.formatEther(await provider.getBalance(deployer)));

  const deployedContracts = {};

  try {
    // 1. Deploy Interest Rate Models
    console.log('\n1. Deploying Interest Rate Models...');

    // WhitePaper Interest Rate Model (for RBTC)
    const WhitePaperInterestRateModel = loadArtifact('WhitePaperInterestRateModel');
    const whitePaperFactory = new ethers.ContractFactory(
      WhitePaperInterestRateModel.abi,
      WhitePaperInterestRateModel.bytecode,
      signer
    );
    const baseRatePerYear = ethers.utils.parseEther('0.02'); // 2%
    const multiplierPerYear = ethers.utils.parseEther('0.30'); // 30%
    const whitePaperModel = await whitePaperFactory.deploy(baseRatePerYear, multiplierPerYear);
    await whitePaperModel.deployed();
    deployedContracts.whitePaperInterestRateModel = whitePaperModel.address;
    console.log('  WhitePaperInterestRateModel deployed to:', whitePaperModel.address);

    // Jump Rate Model V2 (for DOC)
    const JumpRateModelV2 = loadArtifact('JumpRateModelV2');
    const jumpRateFactory = new ethers.ContractFactory(
      JumpRateModelV2.abi,
      JumpRateModelV2.bytecode,
      signer
    );
    const baseRatePerYearJump = ethers.utils.parseEther('0.00'); // 0%
    const multiplierPerYearJump = ethers.utils.parseEther('0.04'); // 4%
    const jumpMultiplierPerYear = ethers.utils.parseEther('1.09'); // 109%
    const kink = ethers.utils.parseEther('0.8'); // 80% utilization
    const jumpRateModel = await jumpRateFactory.deploy(
      baseRatePerYearJump,
      multiplierPerYearJump,
      jumpMultiplierPerYear,
      kink,
      deployer // owner address (5th parameter)
    );
    await jumpRateModel.deployed();
    deployedContracts.jumpRateModel = jumpRateModel.address;
    console.log('  JumpRateModelV2 deployed to:', jumpRateModel.address);

    // 2. Deploy Unitroller (Comptroller Proxy)
    console.log('\n2. Deploying Unitroller...');
    const Unitroller = loadArtifact('Unitroller');
    const unitrollerFactory = new ethers.ContractFactory(
      Unitroller.abi,
      Unitroller.bytecode,
      signer
    );
    const unitroller = await unitrollerFactory.deploy();
    await unitroller.deployed();
    deployedContracts.unitroller = unitroller.address;
    console.log('  Unitroller deployed to:', unitroller.address);

    // 3. Deploy Comptroller Implementation
    console.log('\n3. Deploying Comptroller Implementation...');
    const ComptrollerG6 = loadArtifact('ComptrollerG6');
    const comptrollerFactory = new ethers.ContractFactory(
      ComptrollerG6.abi,
      ComptrollerG6.bytecode,
      signer
    );
    const comptroller = await comptrollerFactory.deploy();
    await comptroller.deployed();
    deployedContracts.comptroller = comptroller.address;
    console.log('  Comptroller deployed to:', comptroller.address);

    // 4. Set Comptroller as Unitroller's implementation
    console.log('\n4. Setting Comptroller implementation...');
    await unitroller._setPendingImplementation(comptroller.address);
    const comptrollerAsProxy = new ethers.Contract(
      comptroller.address,
      ComptrollerG6.abi,
      signer
    );
    await comptrollerAsProxy._become(unitroller.address);
    console.log('  Comptroller set as Unitroller implementation');

    // 5. Deploy Simple Price Oracle
    console.log('\n5. Deploying Price Oracle...');
    const PriceOracle = loadArtifact('PriceOracleProxy');
    const oracleFactory = new ethers.ContractFactory(
      PriceOracle.abi,
      PriceOracle.bytecode,
      signer
    );
    const priceOracle = await oracleFactory.deploy(deployer); // guardian address
    await priceOracle.deployed();
    deployedContracts.priceOracle = priceOracle.address;
    console.log('  PriceOracle deployed to:', priceOracle.address);

    // 6. Configure Comptroller
    console.log('\n6. Configuring Comptroller...');
    const comptrollerViaUnitroller = new ethers.Contract(
      unitroller.address,
      ComptrollerG6.abi,
      signer
    );
    await comptrollerViaUnitroller._setPriceOracle(priceOracle.address);
    await comptrollerViaUnitroller._setCloseFactor(ethers.utils.parseEther('0.5')); // 50%
    await comptrollerViaUnitroller._setLiquidationIncentive(ethers.utils.parseEther('1.08')); // 8%
    console.log('  Comptroller configured');

    // 7. Deploy Test ERC20 Token (DOC only)
    console.log('\n7. Deploying Test ERC20 Token...');
    const StandardToken = loadArtifact('StandardToken');
    const tokenFactory = new ethers.ContractFactory(
      StandardToken.abi,
      StandardToken.bytecode,
      signer
    );

    // Deploy DOC (18 decimals)
    const doc = await tokenFactory.deploy(
      ethers.utils.parseEther('1000000'), // 1M DOC
      'Test DOC',
      18,
      'tDOC'
    );
    await doc.deployed();
    deployedContracts.doc = doc.address;
    console.log('  DOC (18 decimals) deployed to:', doc.address);

    // 8. Deploy kToken Markets
    console.log('\n8. Deploying kToken Markets...');

    const initialExchangeRate = ethers.utils.parseEther('0.02'); // 1 kToken = 0.02 underlying

    // Deploy kDOC (CErc20Immutable) with Jump Rate Model
    const CErc20Immutable = loadArtifact('CErc20Immutable');
    const cErc20Factory = new ethers.ContractFactory(
      CErc20Immutable.abi,
      CErc20Immutable.bytecode,
      signer
    );

    const kdoc = await cErc20Factory.deploy(
      doc.address,
      unitroller.address,
      jumpRateModel.address, // Use Jump Rate Model for DOC
      initialExchangeRate,
      'Tropykus DOC',
      'kDOC',
      18, // kToken decimals (18 for Tropykus)
      deployer // admin address
    );
    await kdoc.deployed();
    deployedContracts.kdoc = kdoc.address;
    console.log('  kDOC deployed to:', kdoc.address);

    // Deploy kRBTC (CRBTC) with WhitePaper Interest Rate Model
    const CRBTC = loadArtifact('CRBTC');
    const crbtcFactory = new ethers.ContractFactory(
      CRBTC.abi,
      CRBTC.bytecode,
      signer
    );
    const krbtc = await crbtcFactory.deploy(
      unitroller.address,
      whitePaperModel.address, // Use WhitePaper model for RBTC
      initialExchangeRate,
      'Tropykus RBTC',
      'kRBTC',
      18, // kToken decimals (18 for Tropykus)
      deployer // admin address
    );
    await krbtc.deployed();
    deployedContracts.krbtc = krbtc.address;
    console.log('  kRBTC deployed to:', krbtc.address);

    // 9. Support Markets in Comptroller
    console.log('\n9. Supporting markets in Comptroller...');
    await comptrollerViaUnitroller._supportMarket(kdoc.address);
    await comptrollerViaUnitroller._supportMarket(krbtc.address);
    console.log('  All markets supported');

    // 10. Set Collateral Factors
    console.log('\n10. Setting collateral factors...');
    await comptrollerViaUnitroller._setCollateralFactor(kdoc.address, ethers.utils.parseEther('0.75')); // 75%
    await comptrollerViaUnitroller._setCollateralFactor(krbtc.address, ethers.utils.parseEther('0.6')); // 60%
    console.log('  Collateral factors set');

    // 11. Set Oracle Prices using Mock Price Provider and Adapters
    console.log('\n11. Setting oracle prices...');
    const price1USD = ethers.utils.parseEther('1'); // $1
    const priceRBTC = ethers.utils.parseEther('54556.9'); // ~$54,556.90

    // Deploy Mock Price Providers
    const MockPriceProviderMoC = loadArtifact('MockPriceProviderMoC');
    const mockProviderFactory = new ethers.ContractFactory(
      MockPriceProviderMoC.abi,
      MockPriceProviderMoC.bytecode,
      signer
    );

    const docPriceProvider = await mockProviderFactory.deploy(deployer, price1USD);
    await docPriceProvider.deployed();
    console.log('  DOC Price Provider deployed to:', docPriceProvider.address);

    const rbtcPriceProvider = await mockProviderFactory.deploy(deployer, priceRBTC);
    await rbtcPriceProvider.deployed();
    console.log('  RBTC Price Provider deployed to:', rbtcPriceProvider.address);

    // Deploy Price Oracle Adapters
    const PriceOracleAdapterMoc = loadArtifact('PriceOracleAdapterMoc');
    const adapterFactory = new ethers.ContractFactory(
      PriceOracleAdapterMoc.abi,
      PriceOracleAdapterMoc.bytecode,
      signer
    );

    const docAdapter = await adapterFactory.deploy(deployer, docPriceProvider.address);
    await docAdapter.deployed();
    console.log('  DOC Adapter deployed to:', docAdapter.address);

    const rbtcAdapter = await adapterFactory.deploy(deployer, rbtcPriceProvider.address);
    await rbtcAdapter.deployed();
    console.log('  RBTC Adapter deployed to:', rbtcAdapter.address);

    // Set adapters in PriceOracleProxy
    await priceOracle.setAdapterToToken(kdoc.address, docAdapter.address);
    await priceOracle.setAdapterToToken(krbtc.address, rbtcAdapter.address);
    console.log('  Oracle prices set via adapters');

    deployedContracts.docPriceProvider = docPriceProvider.address;
    deployedContracts.rbtcPriceProvider = rbtcPriceProvider.address;
    deployedContracts.docAdapter = docAdapter.address;
    deployedContracts.rbtcAdapter = rbtcAdapter.address;

    // Save deployment addresses
    const deploymentInfo = {
      network: 'hardhat-local',
      chainId: 31337,
      deployer: deployer,
      timestamp: new Date().toISOString(),
      contracts: deployedContracts
    };

    const outputPath = path.join(__dirname, '../test-deployment.json');
    fs.writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));

    console.log('\n✅ Deployment Complete!');
    console.log('\nDeployment addresses saved to:', outputPath);
    console.log('\n📋 Contract Addresses:');
    console.log(JSON.stringify(deployedContracts, null, 2));

    return deployedContracts;
  } catch (error) {
    console.error('\n❌ Deployment failed:', error);
    throw error;
  }
}

// Execute if run directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = main;
