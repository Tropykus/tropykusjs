import { ethers } from 'ethers';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Unitroller from "../src/Unitroller";
import UnitrollerArtifact from '../artifacts/Unitroller.json';
import ComptrollerArtifact from '../artifacts/ComptrollerG6.json';

chai.use(chaiAsPromised);
const { expect } = chai;

const unitrollerAddress = '0x962308fef8edfadd705384840e7701f8f39ed0c0';

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
        // Deploy a fresh unitroller (proxy) for testing to avoid permission issues
        // on forked networks where we're not the admin
        const unitrollerFactory = new ethers.ContractFactory(
            UnitrollerArtifact.abi,
            UnitrollerArtifact.bytecode,
            dep.signer,
        );
        const testUnitroller = await unitrollerFactory.deploy();
        await testUnitroller.deployed();
        
        const unitroller = new Unitroller(testUnitroller.address, tropykus);
        
        // Deploy a new comptroller implementation
        const comptrollerFactory = new ethers.ContractFactory(
            ComptrollerArtifact.abi,
            ComptrollerArtifact.bytecode,
            dep.signer,
        );
        const newComptroller = await comptrollerFactory.deploy();
        await newComptroller.deployed();
        
        // Initially, there should be no pending implementation (or it should be different)
        const initialPending = await unitroller.getComptrollerPendingImplementation();
        expect(initialPending).to.not.equal(newComptroller.address.toLowerCase());
        
        // Set the new comptroller as pending implementation
        const tx = await unitroller.setComptrollerPendingImplementation(dep, newComptroller.address);
        // Wait for transaction to be mined
        await tx.wait();
        
        // Verify the pending implementation was set
        const pendingImplementation = await unitroller.getComptrollerPendingImplementation();
        expect(pendingImplementation).to.equal(newComptroller.address.toLowerCase());
    });

    it('should get unitroller\'s comptroller implementation', async () => {
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
        const newComptroller = await tropykus.setComptroller(
            dep, null, testUnitroller.address);
        
        const unitroller = new Unitroller(testUnitroller.address, tropykus);
        const implementation = await unitroller.getComptrollerImplementation();
        expect(implementation).to.match(/0x[a-fA-F0-9]{40}/);
        expect(implementation.toLowerCase()).to.equal(newComptroller.address.toLowerCase());
    });
});

