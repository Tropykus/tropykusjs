import { ethers } from 'ethers';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Comptroller from "../src/Comptroller";

chai.use(chaiAsPromised);
const { expect } = chai;

const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';
const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';
const unitrollerAddress = '0xdC98d636ad43A17bDAcE402997C7c6ABA55EAa28';

describe('Core tropykus', () => {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wsProvider = new ethers.providers.JsonRpcProvider('ws://127.0.0.1:8545');
  const tropykus = new Tropykus(provider, wsProvider, 400000);

  it('should generate an account', async () => {
    expect((await tropykus.getAccount()).address.toLowerCase())
      .equals('0xe317349c7279ffF242cc8ADCb575EbA0153760BA'.toLowerCase());
  });

  it('should get internal comptroller instance', async () => {
    const dep = await tropykus.getAccount();
    await tropykus.setComptroller(dep, comptrollerAddress);
    expect(tropykus.comptroller.address).to.equal(comptrollerAddress.toLowerCase());
  });

  it('should deploy a new comptroller', async () => {
    const dep = await tropykus.getAccount();
    const newComptroller = await tropykus.setComptroller(
        dep, null, unitrollerAddress);
    expect(newComptroller).instanceOf(Comptroller);
    expect(newComptroller.address).to.match(/0x[a-fA-F0-9]{40}/);
  });

  it('should set package price oracle instance', async () => {
    expect(tropykus.priceOracle).to.be.null;
    tropykus.setPriceOracle(priceOracleAddress);
    expect(tropykus.priceOracle.address)
        .to.equal(priceOracleAddress.toLowerCase());
  });

});
