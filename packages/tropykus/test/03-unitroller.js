import { ethers } from 'ethers';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Unitroller from "../src/Unitroller";

chai.use(chaiAsPromised);
const { expect } = chai;

const mnemonic = 'elegant ripple curve exhibit capital oblige off inform recall describe warrior earn';
const derivationPath = `m/44'/60'/0'/0/0`;

const unitrollerAddress = '0xdC98d636ad43A17bDAcE402997C7c6ABA55EAa28';
const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';
const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';

describe('Unitroller', () => {
    let dep;
    const tropykus = new Tropykus('http://localhost:8545', 400000);
    beforeEach(async () => {
        dep = await tropykus.setAccount(mnemonic, derivationPath);
    });

    it('should instance a unitroller handler', async () => {
        const unitroller = new Unitroller(unitrollerAddress, tropykus);
        expect(unitroller).instanceOf(Unitroller);
        expect(unitroller.address).to.equal(unitrollerAddress);
    });

    it('should set a pending implementation of comptroller', async () => {
        const unitroller = new Unitroller(unitrollerAddress, tropykus);
        const newComptroller = await tropykus.setComptroller(
            dep, null, unitrollerAddress)
        expect(await unitroller.getComptrollerPendingImplementation()).to.not.equal(newComptroller.address);
        await unitroller.setComptrollerPendingImplementation(dep, newComptroller.address);
        expect(await unitroller.getComptrollerPendingImplementation()).to.equal(newComptroller.address);
    });

    it('should get unitroller\'s comptroller implementation', async () => {
        const unitroller = new Unitroller(unitrollerAddress, tropykus);
        expect(await unitroller.getComptrollerImplementation())
            .to.match(/0x[a-fA-F0-9]{40}/);
    });
});

