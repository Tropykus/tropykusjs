import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";

chai.use(chaiAsPromised);
const { expect } = chai;

const mnemonic = 'elegant ripple curve exhibit capital oblige off inform recall describe warrior earn';
const derivationPath = `m/44'/60'/0'/0/0`;


describe('Core tropykus', () => {
  let tropykus;
  beforeEach(async () => {
    tropykus = new Tropykus('http://localhost:8545', 400000);

  });
  it.skip('should generate an account', async () => {
    tropykus.setAccount(mnemonic, derivationPath);
    expect(tropykus.account.address.toLowerCase()).equals('0xe317349c7279ffF242cc8ADCb575EbA0153760BA'.toLowerCase());
  });

});
