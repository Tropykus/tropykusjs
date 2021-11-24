import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import Market from '../src/Market';
import CRBTCMarket from '../src/Markets/CRBTC.js';
import CRDOCMarket from '../src/Markets/CRDOC.js';
import CErc20Market from '../src/Markets/CErc20.js';

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
const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';
const crbtcAdapterAddress = '0x94D2C65157FBeb52BaEEAaaE7b20fA0fAc3f0681';
const cdocAdapterAddress = '0x21e23076EAe56759304a6883bEBdb2e3EbA7678A';
const crdocAdapterAddress = '0xB572eee464bFEc3f92189A09fBbb7D7BCD3540C5';

describe('Market', () => {
  let tropykus;
  let comptroller;
  beforeEach(async () => {
    tropykus = new Tropykus('http://localhost:8545', 400000);
    await tropykus.setAccount(mnemonic, derivationPath);
    comptroller = await tropykus.setComptroller(comptrollerAddress);
  });

  it('should deployed a new CRBTC market', async () => {
    const crbtc = await tropykus.addMarket(
      'CRBTC',
      false,
      null,
      null,
      {
        comptrollerAddress,
        interestRateModelAddress: crbtcInterestRateModelAddress,
        initialExchangeRate: 0.02,
        name: 'New CRBTC',
        symbol: 'CRBTC',
        decimals: 18,
      });
    expect(crbtc).instanceOf(CRBTCMarket);
    expect(crbtc.address).to.match(/0x[a-fA-F0-9]{40}/);
  });

  it('should deployed a new CRDOC market', async () => {
    const crdoc = await tropykus.addMarket(
      'CRDOC',
      false,
      null,
      rdocAddress,
      {
        comptrollerAddress,
        interestRateModelAddress: crdocInterestRateModelAddress,
        initialExchangeRate: 0.02,
        name: 'New CRDOC',
        symbol: 'CRDOC',
        decimals: 18,
      });
    expect(crdoc).instanceOf(CRDOCMarket);
    expect(crdoc.address).to.match(/0x[a-fA-F0-9]{40}/);
  });

  it('should deployed a new CToken market', async () => {
    const cdoc = await tropykus.addMarket(
      'CRDOC',
      false,
      null,
      docAddress,
      {
        comptrollerAddress,
        interestRateModelAddress: cdocInterestRateModelAddress,
        initialExchangeRate: 0.02,
        name: 'New CDOC',
        symbol: 'CDOC',
        decimals: 18,
      });
    expect(cdoc).instanceOf(CErc20Market);
    expect(cdoc.address).to.match(/0x[a-fA-F0-9]{40}/);
  });

  it('should instance a CRBTC Market with an existing contract address', async () => {
    const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);
    expect(crbtc).instanceOf(CRBTCMarket);
    expect(crbtc.address).equals(crbtcMarketAddress);
  })

  it('should instance a CToken Market with an existing contract address', async () => {
    const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);
    expect(cdoc).instanceOf(CErc20Market);
    expect(cdoc.address).equals(cdocAddress);
  });

  it('should instance a CRDOC Market with an existing contract address', async () => {
    const crdoc = await tropykus.addMarket('CRDOC', true, crdocAddress, rdocAddress);
    expect(crdoc).instanceOf(CRDOCMarket);
    expect(crdoc.address).equals(crdocAddress);
  });

  describe(('Markets operations'), () => {
    let markets;
    let crbtc;
    let cdoc;
    let crdoc;
    beforeEach(async () => {
      markets = await comptroller.allMarkets();
      await comptroller.enterMarkets(tropykus.account, markets);
      crbtc = await tropykus.addMarket(
        'CRBTC',
        false,
        null,
        null,
        {
          comptrollerAddress,
          interestRateModelAddress: crbtcInterestRateModelAddress,
          initialExchangeRate: 0.02,
          name: 'New CRBTC',
          symbol: 'CRBTC',
          decimals: 18,
        });
      cdoc = await tropykus.addMarket(
        'CRDOC',
        false,
        null,
        docAddress,
        {
          comptrollerAddress,
          interestRateModelAddress: cdocInterestRateModelAddress,
          initialExchangeRate: 0.02,
          name: 'New CDOC',
          symbol: 'CDOC',
          decimals: 18,
        });
      crdoc = await tropykus.addMarket(
        'CRDOC',
        false,
        null,
        rdocAddress,
        {
          comptrollerAddress,
          interestRateModelAddress: crdocInterestRateModelAddress,
          initialExchangeRate: 0.02,
          name: 'New CRDOC',
          symbol: 'CRDOC',
          decimals: 18,
        });

      await tropykus.setPriceOracle(priceOracleAddress);

      await tropykus.priceOracle.setAdapterToToken(crbtc.address, crbtcAdapterAddress);
      await tropykus.priceOracle.setAdapterToToken(cdoc.address, cdocAdapterAddress);
      await tropykus.priceOracle.setAdapterToToken(crdoc.address, crdocAdapterAddress);

      await comptroller.supportMarket(crbtc.address);
      await comptroller.supportMarket(cdoc.address);
      await comptroller.supportMarket(crdoc.address);

      await comptroller.setCollateralFactor(crbtc.address, 0.6);
      await comptroller.setCollateralFactor(cdoc.address, 0.75);
      await comptroller.setCollateralFactor(crdoc.address, 0.7);

      await crbtc.setReserveFactor(0.2);
      await cdoc.setReserveFactor(0.5);
      await crdoc.setReserveFactor(0.5);

      await comptroller.enterMarkets(
        tropykus.account,
        [
          crbtc.address,
          cdoc.address,
          crdoc.address,
        ]
      );
    });

    it('should deposit in the cRBTC market', async () => {
      await crbtc.mint(tropykus.account, 0.5);
      const balance = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(0.5);
      const kTokenBalance = await crbtc.balanceOf(tropykus.account);
      expect(kTokenBalance).equals(25);
    });

    it('should deposit in any token market', async () => {
      await cdoc.mint(tropykus.account, 1000);
      const balance = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(1000);
      const kTokenBalance = await cdoc.balanceOf(tropykus.account);
      expect(kTokenBalance).to.be.closeTo(50000, 0.1);
    });

    it('should borrow in cdoc an amount once he has a collateral on crbtc', async() => {
      await crbtc.mint(tropykus.account, 0.5);
      expect(await cdoc.balanceOfUnderlying(tropykus.account)).equals(0.5);
      console.log("trying to borrow");
      const tmp = await cdoc.borrow(tropykus.account, 100);
      console.log("Did it work?", tmp);
      const balance = await cdoc.borrowBalanceCurrent(tropykus.account);
      expect(balance).equals(100);
    });

    it('should borrow in crbtc market an amount once he has a collateral on cdoc', async() => {
      await crdoc.mint(tropykus.account, 1000);
      expect(await cdoc.balanceOfUnderlying(tropykus.account)).equals(1000);
      await crbtc.borrow(tropykus.account, 0.005);
      const balance = await crbtc.borrowBalanceCurrent(tropykus.account);
      expect(balance).equals(0.005);
    });
  });
});
