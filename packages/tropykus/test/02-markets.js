import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Market from '../src/Market';
import CRBTCMarket from '../src/Markets/CRBTC.js';
import CTokenMarket from '../src/Markets/CToken';

chai.use(chaiAsPromised);
const { expect } = chai;

const mnemonic = 'elegant ripple curve exhibit capital oblige off inform recall describe warrior earn';
const derivationPath = `m/44'/60'/0'/0/0`;

const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';
const crbtcMarketAddress = '0xE498D1E3A0d7fdb80a2d7591D997aFDA34F8c5C5';
const cdocAddress = '0x1CbD672Ac9d98F4f033e12eDE3c55f5CB02B983C';
const docAddress = '0xC3b5a61f8fc55fef790165d9f12AD23D47F7De99';


describe('Market', () => {
  let tropykus;
  beforeEach(async () => {
    tropykus = new Tropykus('http://localhost:8545', 400000);
    await tropykus.setAccount(mnemonic, derivationPath);
    await tropykus.setComptroller(comptrollerAddress);
  });

  it('should instance a CRBTC Market', async () => {
    const crbtc = tropykus.addMarket(crbtcMarketAddress);
    expect(crbtc).instanceOf(CRBTCMarket);
  })

  it('should instance a CTocken Market', async () => {
    const cdoc = tropykus.addMarket(cdocAddress, false, docAddress);
    expect(cdoc).instanceOf(CTokenMarket);
  });

  describe(('Markets operations'), () => {
    beforeEach(async () => {
      const markets = await tropykus.comptroller.allMarkets();
      await tropykus.comptroller.enterMarkets(tropykus.account, markets);
    });

    it('should deposit in the cRBTC market', async () => {
      const crbtc = tropykus.addMarket(crbtcMarketAddress);

      await crbtc.mint(tropykus.account, 0.5);
      const balance = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(0.5);
    });

    it('should deposit in any token market', async () => {
      const cdoc = tropykus.addMarket(cdocAddress, false, docAddress);

      await cdoc.mint(tropykus.account, 1000);
      const balance = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(1000);
    });

    it.skip('should borrow in cdoc an amount once he has a collateral on cdoc', async() => {
      const crbtc = tropykus.addMarket(crbtcMarketAddress);
      const cdoc = tropykus.addMarket(cdocAddress, false, docAddress);

      await crbtc.mint(tropykus.account, 0.5);
      await cdoc.borrow(tropykus.account, 100);
      const balance = await cdoc.borrowBalanceCurrent(tropykus.account);
      expect(balance).equals(100);
    });

    it('should borrow in crbtc market an amount once he has a collateral on crbtc', async() => {
      const crbtc = tropykus.addMarket(crbtcMarketAddress);
      const cdoc = tropykus.addMarket(cdocAddress, false, docAddress);

      await cdoc.mint(tropykus.account, 1000);
      await crbtc.borrow(tropykus.account, 0.005);
      const balance = await crbtc.borrowBalanceCurrent(tropykus.account);
      expect(balance).equals(0.005);
    });
  });
});
