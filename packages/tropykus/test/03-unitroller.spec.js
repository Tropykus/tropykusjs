import { ethers } from 'ethers';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Unitroller from "../src/Unitroller";

chai.use(chaiAsPromised);
const { expect } = chai;

const unitrollerAddress = '0xdC98d636ad43A17bDAcE402997C7c6ABA55EAa28';

describe('Unitroller', () => {
    let dep;
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const wsProvider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545');
    const tropykus = new Tropykus(provider, wsProvider, 400000);
    beforeEach(async () => {
        dep = await tropykus.getAccount();
    });

    it('should instance a unitroller handler', async () => {
        const unitroller = new Unitroller(unitrollerAddress, tropykus);
        expect(unitroller).instanceOf(Unitroller);
        expect(unitroller.address).to.equal(unitrollerAddress.toLowerCase());
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

