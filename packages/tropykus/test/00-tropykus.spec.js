import { ethers } from 'ethers';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Comptroller from "../src/Comptroller";
import Unitroller from "../src/Unitroller";
import UnitrollerArtifact from '../artifacts/Unitroller.json';

chai.use(chaiAsPromised);
const { expect } = chai;

// Rootstock Mainnet addresses (when forking mainnet)
const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';
// Rootstock Mainnet Unitroller address (from README)
const unitrollerAddress = '0x962308fEf8edFaDD705384840e7701F8f39eD0c0';

describe('Core tropykus', () => {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wsProvider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545');
  const tropykus = new Tropykus(provider, wsProvider, 400000);

  it('should get provider\'s chainId', async () => {
    const chainId = Number(await tropykus.getChainId());
    // Accept Rootstock Mainnet (30), Rootstock Testnet (31), Hardhat default (1337), or Anvil default (31337)
    expect([30, 31, 1337, 31337]).to.include(chainId);
  });

  it('should generate an account', async () => {
    const account = await tropykus.getAccount();
    // Anvil/Hardhat default first account
    const expectedAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    expect(account.address.toLowerCase()).to.equal(expectedAddress.toLowerCase());
    expect(account.signer).to.exist;
    expect(account.address).to.match(/0x[a-fA-F0-9]{40}/);
  });

  it('should get internal comptroller instance', async () => {
    const dep = await tropykus.getAccount();
    await tropykus.setComptroller(dep, unitrollerAddress);
    expect(tropykus.comptroller.address).to.equal(unitrollerAddress.toLowerCase());
  });

  it('should deploy a new comptroller', async () => {
    const dep = await tropykus.getAccount();
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
    
    // Verify the comptroller was deployed
    expect(newComptroller).instanceOf(Comptroller);
    expect(newComptroller.address).to.match(/0x[a-fA-F0-9]{40}/);
    
    // Verify the unitroller is using the deployed comptroller as its implementation
    const unitroller = new Unitroller(testUnitroller.address, tropykus);
    const implementation = await unitroller.getComptrollerImplementation();
    expect(implementation.toLowerCase()).to.equal(newComptroller.address.toLowerCase());
  });

  it('should set package price oracle instance', async () => {
    expect(tropykus.priceOracle).to.be.null;
    tropykus.setPriceOracle(priceOracleAddress);
    expect(tropykus.priceOracle.address)
        .to.equal(priceOracleAddress.toLowerCase());
  });

});
