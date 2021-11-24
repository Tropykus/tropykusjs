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

const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';
const crbtcMarketAddress = '0xE498D1E3A0d7fdb80a2d7591D997aFDA34F8c5C5';
const cdocAddress = '0x1CbD672Ac9d98F4f033e12eDE3c55f5CB02B983C';
const docAddress = '0xC3b5a61f8fc55fef790165d9f12AD23D47F7De99';
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

    it.skip('should deposit in the cRBTC market', async () => {
      const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);

      await crbtc.mint(tropykus.account, 0.5);
      const balance = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(0.5);
    });

    it.skip('should deposit in any token market', async () => {
      const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);

      await cdoc.mint(tropykus.account, 1000);
      const balance = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(1000);
    });

    it.skip('should borrow in cdoc an amount once he has a collateral on cdoc', async() => {
      const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);
      const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);

      await crbtc.mint(tropykus.account, 0.5);
      await cdoc.borrow(tropykus.account, 100);
      const balance = await cdoc.borrowBalanceCurrent(tropykus.account);
      expect(balance).equals(100);
    });

    it.skip('should borrow in crbtc market an amount once he has a collateral on crbtc', async() => {
      const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);
      const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);

      await cdoc.mint(tropykus.account, 1000);
      await crbtc.borrow(tropykus.account, 0.005);
      const balance = await crbtc.borrowBalanceCurrent(tropykus.account);
      expect(balance).equals(0.005);
    });

    it.skip('should redeem from crbtc market', async() => {
      const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);

      await crbtc.mint(tropykus.account, 0.5);
      const balance = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(0.5);

      const balanceBefore = await crbtc.balanceOfUnderlying(tropykus.account);
      await crbtc.redeem(tropykus.account, 0.025);
      const balanceAfter = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balanceAfter).equals(balanceBefore - 0.025);
    });

    it.skip('should redeem from cdoc market', async() => {
      const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);

      await cdoc.mint(tropykus.account, 500);
      const balance = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(500);

      const balanceBefore = await cdoc.balanceOfUnderlying(tropykus.account);
      await cdoc.redeem(tropykus.account, 250);
      const balanceAfter = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balanceAfter).equals(balanceBefore - 250);
    });

    it.skip('should redeem all kTokens from crbtc market', async() => {
      const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);

      await crbtc.mint(tropykus.account, 0.5);
      const balance = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(0.5);
      const kRBTCBalance = await crbtc.balanceOf(tropykus.account);
      expect(kRBTCBalance).equals(25);

      await crbtc.redeem(tropykus.account, 0, true);
      const balanceAfter = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balanceAfter).equals(0);
      const kRBTCBalanceAfter = await crbtc.balanceOf(tropykus.account);
      expect(kRBTCBalanceAfter).equals(0);
    });

    it.skip('should repay a portion of debt on cdoc market', async() => {
      const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);

      await cdoc.mint(tropykus.account, 1000);
      const balance = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(1000);

      await cdoc.borrow(tropykus.account, 500);
      const borrowBalanceBefore = await cdoc.borrowBalanceCurrent(tropykus.account);
      expect(borrowBalanceBefore).to.be.closeTo(500, 1);

      await cdoc.repayBorrow(tropykus.account, 250);
      const borrowBalanceAfter = await cdoc.borrowBalanceCurrent(tropykus.account);
      expect(borrowBalanceAfter).to.be.closeTo(250, 1);
    });

    it('should repay all debt from crbtc market', async() => {
      const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);

      await crbtc.mint(tropykus.account, 1);
      const balance = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(1);

      await crbtc.borrow(tropykus.account, 0.5);
      const borrowBalanceBefore = await crbtc.borrowBalanceCurrent(tropykus.account);
      expect(borrowBalanceBefore).to.be.closeTo(0.5, 1);

      await crbtc.repayBorrow(tropykus.account, 0, true);
      const borrowBalanceAfter = await crbtc.borrowBalanceCurrent(tropykus.account);
      expect(borrowBalanceAfter).equals(0);
    });
  });
});
