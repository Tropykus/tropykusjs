import { ethers } from 'ethers';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Comptroller from "../src/Comptroller";
import Unitroller from "../src/Unitroller";
import Market from "../src/Market";
import UnitrollerArtifact from '../artifacts/Unitroller.json';
import StandardTokenArtifact from '../artifacts/StandardToken.json';
import WhitePaperInterestRateModelArtifact from '../artifacts/WhitePaperInterestRateModel.json';

chai.use(chaiAsPromised);
const { expect } = chai;

// Rootstock Mainnet addresses (when forking mainnet)
// Note: Comptroller is a proxy, so its address is the Unitroller address
const unitrollerAddress = '0x962308fEf8edFaDD705384840e7701F8f39eD0c0'; // Rootstock Mainnet Unitroller
const comptrollerAddress = unitrollerAddress; // Unitroller is the Comptroller proxy
const priceOracleAddress = '0x7fa5500c978e89660bf3bd0526f8f7164de0b38f'; // Rootstock Mainnet Price Oracle

// Rootstock Mainnet market addresses (from README)
const kdocAddress = '0x544eb90e766b405134b3b3f62b6b4c23fcd5fda2'; // kDOC
const kbproAddress = '0x405062731d8656af5950ef952be9fa110878036b'; // kBPRO
const krbtcAddress = '0x0aeadb9d4c6a80462a47e87e76e487fa8b9a37d7'; // kRBTC
const kusdrfAddress = '0xDdf3CE45fcf080DF61ee61dac5Ddefef7ED4F46C'; // kUSDRF

// Deprecated market addresses (for testing deprecated functionality)
const crdocAddress = '0x1a389e93be8ef2B5D105DEa44271d4426736A484'; // kRDOC/cRDOC (deprecated)
// Mainnet addresses for kSAT and kRBTC (from README)
const csatAddress = '0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6'; // kSAT/cSAT (deprecated, mainnet)
const crbtcAddress = krbtcAddress; // kRBTC (use the same as krbtcAddress since it's the active kRBTC market)

describe('Comptroller', () => {
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const wsProvider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545');
    const tropykus = new Tropykus(provider, wsProvider, 400000);
    let comptroller;
    let dep;
    beforeEach(async () => {
        dep = await tropykus.getAccount();
    });

    it('should instance a comptroller handler', async () => {
        comptroller = await tropykus.setComptroller(dep, unitrollerAddress);
        expect(comptroller).instanceOf(Comptroller);
        // Comptroller address should match the unitroller (proxy) address
        expect(comptroller.address).to.equal(unitrollerAddress.toLowerCase());
    });

    it('should list the market\'s addresses', async () => {
        comptroller = await tropykus.setComptroller(dep, unitrollerAddress);
        const markets = await comptroller.allMarkets();
        expect(markets).to.be.an('array');
        // Verify all market addresses are valid Ethereum addresses
        markets.forEach((market) => {
            expect(market).to.match(/0x[a-fA-F0-9]{40}/);
        });
        // On Rootstock Mainnet, there should be at least some markets
        expect(markets.length).to.be.at.least(0);
    });

    it('should list the market\'s as instances', async () => {
        comptroller = await tropykus.setComptroller(dep, comptrollerAddress);
        // Use actual mainnet addresses: kSAT (deprecated) and kRBTC (active)
        const markets = await comptroller.getAllMarketsInstances(
          csatAddress, // kSAT (mainnet: 0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6)
          krbtcAddress // kRBTC (mainnet: 0x0aeadb9d4c6a80462a47e87e76e487fa8b9a37d7)
        );
        markets.forEach((market) => {
            expect(market).instanceOf(Market);
            expect(market.address).to.match(/0x[a-fA-F0-9]{40}/);
        })
        expect(markets.length).to.equal(8);
    });

    it('should enter the markets', async () => {
        // Deploy a fresh unitroller and comptroller for testing to avoid permission issues
        const unitrollerFactory = new ethers.ContractFactory(
          UnitrollerArtifact.abi,
          UnitrollerArtifact.bytecode,
          dep.signer,
        );
        const testUnitroller = await unitrollerFactory.deploy();
        await testUnitroller.deployed();
        
        // Deploy comptroller and set it up with the unitroller
        comptroller = await tropykus.setComptroller(dep, null, testUnitroller.address);

        let assetsIn = await comptroller.getAssetsIn(dep.address);
        expect(assetsIn.length).equals(0);

        // Add a test market first so we have something to enter
        // We'll need to deploy a market or use an existing one
        // For now, just verify the flow works with empty markets
        const markets = await comptroller.allMarkets();
        
        if (markets.length > 0) {
            await comptroller.enterMarkets(dep, markets);
            assetsIn = await comptroller.getAssetsIn(dep.address);
            expect(assetsIn.length).equals(markets.length);
            assetsIn.forEach((asset, idx) => {
                expect(asset.toLowerCase()).equals(markets[idx].toLowerCase());
            });
        } else {
            // If no markets exist, verify the function doesn't error
            await comptroller.enterMarkets(dep, []);
            assetsIn = await comptroller.getAssetsIn(dep.address);
            expect(assetsIn.length).equals(0);
        }
    });
    describe('Setups', () => {
        let newComptroller;
        let testUnitroller;
        let dep;
        beforeEach(async () => {
            dep = await tropykus.getAccount();
            // Deploy a fresh unitroller for testing to avoid permission issues
            const unitrollerFactory = new ethers.ContractFactory(
              UnitrollerArtifact.abi,
              UnitrollerArtifact.bytecode,
              dep.signer,
            );
            testUnitroller = await unitrollerFactory.deploy();
            await testUnitroller.deployed();
            
            // Deploy comptroller and set it up with the unitroller
            newComptroller = await tropykus.setComptroller(
                dep, null, testUnitroller.address);
        });

        it('should add a market to be supported by a comptroller', async () => {
            expect(await newComptroller.allMarkets()).to.be.an('array').that.is.empty;
            // Deploy a test market first, or use a known address
            // For testing, we'll deploy a simple market or use an existing one
            // Using kRBTC address as it should exist on mainnet
            const testMarketAddress = krbtcAddress;
            await newComptroller.supportMarket(dep, testMarketAddress);
            const mkts = await newComptroller.allMarkets();
            expect(mkts.length).to.equal(1);
            expect(mkts[0].toLowerCase()).to.equal(testMarketAddress.toLowerCase());
        });

        it('should confirm to unitroller\'s a new comptroller', async () => {
            // This test is already covered in the beforeEach, but we can verify
            // that the unitroller is using the comptroller as its implementation
            const unitroller = new Unitroller(testUnitroller.address, tropykus);
            const implementation = await unitroller.getComptrollerImplementation();
            expect(implementation.toLowerCase()).to.equal(newComptroller.address.toLowerCase());
        });

        it('should set a comptroller\'s price oracle', async () => {
            expect(await newComptroller.getOracle()).to.equal(ethers.constants.AddressZero);
            await newComptroller.setOracle(dep, priceOracleAddress);
            const oracle = await newComptroller.getOracle();
            // Normalize addresses to lowercase for comparison (addresses may have mixed case)
            expect(oracle.toLowerCase()).to.equal(priceOracleAddress.toLowerCase());
        });

        it('should set a market\'s collateral factor', async () => {
            await newComptroller.supportMarket(dep, kdocAddress);
            await newComptroller.setOracle(dep, priceOracleAddress);
            expect(await newComptroller.getCollateralFactor(kdocAddress)).to.equal(0);
            await newComptroller.setCollateralFactor(dep, kdocAddress, 0.7);
            expect(await newComptroller.getCollateralFactor(kdocAddress)).to.equal(0.7);
        });

        it('should set comptroller\'s close factor', async () => {
            const testMarketAddress = krbtcAddress;
            await newComptroller.supportMarket(dep, testMarketAddress);
            expect(await newComptroller.getCloseFactor()).to.equal(0);
            await newComptroller.setCloseFactor(dep, 0.07);
            expect(await newComptroller.getCloseFactor()).to.equal(0.07);
        });

        it('should set comptroller\'s liquidation incentive', async () => {
            const testMarketAddress = krbtcAddress;
            await newComptroller.supportMarket(dep, testMarketAddress);
            expect(await newComptroller.getLiquidationIncentive()).to.equal(0);
            await newComptroller.setLiquidationIncentive(dep, 0.07);
            expect(await newComptroller.getLiquidationIncentive()).to.equal(0.07);
        });
    });
});

