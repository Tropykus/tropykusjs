import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Market from '../src/Market';
import CRBTCMarket from '../src/Markets/CRBTC.js';
import CRDOCMarket from '../src/Markets/CRDOC.js';
import CTokenMarket from '../src/Markets/CToken';
import CRBTCAbi from '../abis/CRBTC.json';
import CErc20Abi from '../abis/CErc20Immutable.json';
import CRDOCAbi from '../abis/CRDOC.json';


chai.use(chaiAsPromised);
const { expect } = chai;

const mnemonic = 'elegant ripple curve exhibit capital oblige off inform recall describe warrior earn';
const derivationPath = `m/44'/60'/0'/0/0`;

const comptrollerAddress = '0xE22a4c41B94FD91F0c5D52f69b17ed650b334664';
const crbtcMarketAddress = '0x573CA238dB081A8BCBD096340111dE83Cb827a5B';
const cdocAddress = '0x9ED27fcC7A6929fBCa41FD4fe115FA88A022c205';
const docAddress = '0x7C8eAd9Ad135E0a8405FF31ae702771d266f6c11';
const crdocAddress = '0x1a389e93be8ef2B5D105DEa44271d4426736A484';
const rdocAddress = '0x301b50CD6E1a31c56122463aA306290baD3428cf';
const cdocInterestRateModelAddress = '0x17cFe95D999961dAd27E47Af8B9b8A8Ef07832e4';
const crdocInterestRateModelAddress = '0x46342D72503A41f797CC47D5B89C8Cc8F592f5a3';
const crbtcInterestRateModelAddress = '0x466BBE5C0368Ba75EBA90c2f4643c9DbC226B4d7';
const csatInterestRateModelAddress = '0xD0Ed8135F9Ceb504A0484eEF9700D17622569Df2';

describe('Market', () => {
  let tropykus;
  beforeEach(async () => {
    tropykus = new Tropykus('http://localhost:8545', 400000);
    await tropykus.setAccount(mnemonic, derivationPath);
    await tropykus.setComptroller(comptrollerAddress);
  });

  it('should deployed a new CRBTC market', async () => {
    // const crbtc = await tropykus.addMarket(
    //   'CRBTC',
    //   false,
    //   null,
    //   null,
    //   {
    //     comptrollerAddress,
    //     interestRateModelAddress: crbtcInterestRateModelAddress,
    //     initialExchangeRate: 0.02,
    //     name: 'New CRBTC',
    //     symbol: 'CRBTC',
    //     decimals: 18,
    //   });
    // expect(crbtc).instanceOf(CRBTCMarket);
    // expect(crbtc.address).to.match(/0x[a-fA-F0-9]{40}/);
  });

  it('should deployed a new CRDOC market');

  it('should deployed a new CToken market');

  it('should instance a CRBTC Market', async () => {
    const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);
    expect(crbtc).instanceOf(CRBTCMarket);
  })

  it('should instance a CTocken Market', async () => {
    const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);
    expect(cdoc).instanceOf(CTokenMarket);
  });

  describe(('Markets operations'), () => {
    beforeEach(async () => {
      const markets = await tropykus.comptroller.allMarkets();
      await tropykus.comptroller.enterMarkets(tropykus.account, markets);
    });

    it('should deposit in the cRBTC market', async () => {
      const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);

      await crbtc.mint(tropykus.account, 0.5);
      const balance = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(0.5);
    });

    it('should deposit in any token market', async () => {
      const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);

      await cdoc.mint(tropykus.account, 1000);
      const balance = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(1000);
    });

    it('should borrow in cdoc an amount once he has a collateral on cdoc', async() => {
      const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);
      const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);

      await crbtc.mint(tropykus.account, 0.5);
      await cdoc.borrow(tropykus.account, 100);
      const balance = await cdoc.borrowBalanceCurrent(tropykus.account);
      expect(balance).equals(100);
    });

    it('should borrow in crbtc market an amount once he has a collateral on crbtc', async() => {
      const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);
      const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);

      await cdoc.mint(tropykus.account, 1000);
      await crbtc.borrow(tropykus.account, 0.005);
      const balance = await crbtc.borrowBalanceCurrent(tropykus.account);
      expect(balance).equals(0.005);
    });

    it('should redeem from crbtc market', async() => {
      const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);

      await crbtc.mint(tropykus.account, 0.5);
      const balance = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(0.5);

      const balanceBefore = await crbtc.balanceOfUnderlying(tropykus.account);
      await crbtc.redeem(tropykus.account, 0.025);
      const balanceAfter = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balanceAfter).equals(balanceBefore - 0.025);
    });

    it('should redeem from cdoc market', async() => {
      const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);

      await cdoc.mint(tropykus.account, 500);
      const balance = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(500);

      const balanceBefore = await cdoc.balanceOfUnderlying(tropykus.account);
      await cdoc.redeem(tropykus.account, 250);
      const balanceAfter = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balanceAfter).equals(balanceBefore - 250);
    });
  });
});
