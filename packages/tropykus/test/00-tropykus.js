import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Comptroller from "../src/Comptroller";

chai.use(chaiAsPromised);
const { expect } = chai;

const mnemonic = 'elegant ripple curve exhibit capital oblige off inform recall describe warrior earn';
const derivationPath = `m/44'/60'/0'/0/0`;

const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';
const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';
const unitrollerAddress = '0xdC98d636ad43A17bDAcE402997C7c6ABA55EAa28';

describe('Core tropykus', () => {
  const tropykus = new Tropykus('http://localhost:8545', 400000);

  it('should generate an account', async () => {
    tropykus.setAccount(mnemonic, derivationPath);
    expect(tropykus.account.address.toLowerCase())
        .equals('0xe317349c7279ffF242cc8ADCb575EbA0153760BA'.toLowerCase());
  });

  it('should get internal comptroller instance', async () => {
    await tropykus.setComptroller(comptrollerAddress);
    expect(tropykus.comptroller.address).to.equal(comptrollerAddress);
  });

  it('should deploy a new comptroller', async () => {
    tropykus.setAccount(mnemonic, derivationPath);
    const newComptroller = await tropykus.setComptroller(
        null, unitrollerAddress);
    expect(newComptroller).instanceOf(Comptroller);
    expect(newComptroller.address).to.match(/0x[a-fA-F0-9]{40}/);
  });

  it('should set package price oracle instance', async () => {
    tropykus.setAccount(mnemonic, derivationPath);
    expect(tropykus.internalPriceOracle).to.be.null;
    tropykus.setPriceOracle(priceOracleAddress);
    expect(tropykus.internalPriceOracle.address)
        .to.equal(priceOracleAddress);
  });

});
