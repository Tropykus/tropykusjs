import { ethers } from 'ethers';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Comptroller from "../src/Comptroller";
import Unitroller from "../src/Unitroller";

chai.use(chaiAsPromised);
const { expect } = chai;

const mnemonic = 'elegant ripple curve exhibit capital oblige off inform recall describe warrior earn';
const derivationPath = `m/44'/60'/0'/0/0`;

const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';
const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';
const crdocAddress = '0x1a389e93be8ef2B5D105DEa44271d4426736A484';
const unitrollerAddress = '0xdC98d636ad43A17bDAcE402997C7c6ABA55EAa28';

describe('Comptroller', () => {
    const tropykus = new Tropykus('http://127.0.0.1:8545', 600000);
    let comptroller;
    let dep;
    beforeEach(async () => {
        dep = await tropykus.setAccount(mnemonic, derivationPath);
    });

    it('should instance a comptroller handler', async () => {
        comptroller = await tropykus.setComptroller(dep, comptrollerAddress);
        expect(comptroller).instanceOf(Comptroller);
        expect(comptroller.address).to.equal(comptrollerAddress);
    });

    it('should list the markets', async () => {
        comptroller = await tropykus.setComptroller(dep, comptrollerAddress);
        return comptroller.allMarkets()
            .then((markets) => markets.forEach((market) => expect(market).to.match(/0x[a-fA-F0-9]{40}/)));
    });

    it('should enter the markets', async () => {
        comptroller = await tropykus.setComptroller(dep,null, unitrollerAddress);

        let assetsIn = await comptroller.getAssetsIn(dep);
        expect(assetsIn.length).equals(0);

        const markets = await comptroller.allMarkets();
        await comptroller.enterMarkets(dep, markets);

        assetsIn = await comptroller.getAssetsIn(dep);
        expect(assetsIn.length).equals(markets.length);
        assetsIn.forEach((asset, idx) => {
            expect(asset).equals(markets[idx]);
        });
    });
    describe('Setups', () => {
        let newComptroller;
        let dep;
        beforeEach(async () => {
            dep = await tropykus.setAccount(mnemonic, derivationPath);
            newComptroller = await tropykus.setComptroller(
                dep, null, unitrollerAddress);
        });

        it('should add a market to be supported by a comptroller', async () => {
            expect(await newComptroller.allMarkets()).to.be.an('array').that.is.empty;
            await newComptroller.supportMarket(dep, crdocAddress);
            const mkts = await newComptroller.allMarkets();
            expect(mkts[0]).to.equal(crdocAddress);
        });

        it('should confirm to unitroller\'s a new comptroller', async () => {
            const unitroller = new Unitroller(unitrollerAddress, tropykus);
            const newComptroller = await tropykus.setComptroller(
                dep, null, unitrollerAddress);
            expect(await unitroller.getComptrollerPendingImplementation())
                .to.not.equal(newComptroller.address);
            await unitroller
                .setComptrollerPendingImplementation(dep, newComptroller.address);
            expect(await unitroller.getComptrollerPendingImplementation())
                .to.equal(newComptroller.address);
            await newComptroller.become(dep, unitroller.address);
            expect(await unitroller.getComptrollerImplementation())
                .to.equal(newComptroller.address);
        });

        it('should set a comptroller\'s price oracle', async () => {
            expect(await newComptroller.getOracle()).to.equal(ethers.constants.AddressZero);
            await newComptroller.setOracle(dep, priceOracleAddress);
            expect(await newComptroller.getOracle()).to.equal(priceOracleAddress);
        });

        it('should set a market\'s collateral factor', async () => {
            await newComptroller.supportMarket(dep, crdocAddress);
            await newComptroller.setOracle(dep, priceOracleAddress);
            expect(await newComptroller.getCollateralFactor(crdocAddress)).to.equal(0);
            await newComptroller.setCollateralFactor(dep, crdocAddress, 0.7);
            expect(await newComptroller.getCollateralFactor(crdocAddress)).to.equal(0.7);
        });

        it('should set comptroller\'s close factor', async () => {
            await newComptroller.supportMarket(dep, crdocAddress);
            expect(await newComptroller.getCloseFactor()).to.equal(0);
            await newComptroller.setCloseFactor(dep,0.07);
            expect(await newComptroller.getCloseFactor()).to.equal(0.07);
        });

        it('should set comptroller\'s liquidation incentive', async () => {
            await newComptroller.supportMarket(dep, crdocAddress);
            expect(await newComptroller.getLiquidationIncentive()).to.equal(0);
            await newComptroller.setLiquidationIncentive(dep,0.07);
            expect(await newComptroller.getLiquidationIncentive()).to.equal(0.07);
        });
    });
});

