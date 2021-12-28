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
const unitrollerAddress = '0xdC98d636ad43A17bDAcE402997C7c6ABA55EAa28';

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

  it('should instance a CRDOC Market wit an existing contract address', async () => {
    const crdoc = await tropykus.addMarket('CRDOC', true, crdocAddress, rdocAddress);
    expect(crdoc).instanceOf(CRDOCMarket);
    expect(crdoc.address).equals(crdocAddress);
  });

  describe('Market setups', () => {
      let crbtc;
      let newComptroller;
      it('should set market\'s comptroller', async () => {
          newComptroller = await tropykus.setComptroller(null, unitrollerAddress);
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
              }
          );
          expect(await crbtc.getComptroller()).to.not.equal(newComptroller.address);
          await crbtc.setComptroller(newComptroller.address);
          expect(await crbtc.getComptroller()).equals(newComptroller.address);
      });

      it('should set market\'s reserve factor', async () => {
          expect(await crbtc.getReserveFactor()).to.equal(0);
          await crbtc.setReserveFactor(0.5);
          expect(await crbtc.getReserveFactor()).to.equal(0.5);
      });
  });

  describe(('Markets operations'), () => {
    let crbtc;
    let cdoc;
    let crdoc;
    let newComptroller;
    beforeEach(async () => {
      newComptroller = await tropykus.setComptroller(null, unitrollerAddress);
      crbtc = await tropykus.addMarket(
        'CRBTC',
        false,
        null,
        null,
        {
          comptrollerAddress: newComptroller.address,
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
          comptrollerAddress: newComptroller.address,
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
          comptrollerAddress: newComptroller.address,
          interestRateModelAddress: crdocInterestRateModelAddress,
          initialExchangeRate: 0.02,
          name: 'New CRDOC',
          symbol: 'CRDOC',
          decimals: 18,
        });

      await newComptroller.setOracle(priceOracleAddress);
      await newComptroller.setLiquidationIncentive(0.07);
      await newComptroller.setCloseFactor(0.5);

      await tropykus.setPriceOracle(priceOracleAddress);
      await tropykus.priceOracle.setAdapterToToken(crbtc.address, crbtcAdapterAddress);
      await tropykus.priceOracle.setAdapterToToken(cdoc.address, cdocAdapterAddress);
      await tropykus.priceOracle.setAdapterToToken(crdoc.address, crdocAdapterAddress);

      await crbtc.setComptroller(newComptroller.address);
      await cdoc.setComptroller(newComptroller.address);
      await crdoc.setComptroller(newComptroller.address);

      await newComptroller.supportMarket(crbtc.address);
      await newComptroller.supportMarket(cdoc.address);
      await newComptroller.supportMarket(crdoc.address);

      await newComptroller.setCollateralFactor(crbtc.address, 0.6);
      await newComptroller.setCollateralFactor(cdoc.address, 0.75);
      await newComptroller.setCollateralFactor(crdoc.address, 0.7);

      await crbtc.setReserveFactor(0.2);
      await cdoc.setReserveFactor(0.5);
      await crdoc.setReserveFactor(0.5);

      await newComptroller.enterMarkets(
        tropykus.account,
        [
          crbtc.address,
          cdoc.address,
          crdoc.address,
        ]
      );
    });

    it('should get a user\'s kTokens balance', async () => {
      const crdoc = await tropykus.addMarket('CRDOC', true, crdocAddress, rdocAddress);
      expect(await crdoc.balanceOf(tropykus.account)).to.equal(0);
    });

    it('should get a market\'s current exchange rate', async () => {
        expect(await crbtc.getExchangeRateCurrent(tropykus.account)).to.equal(0.02);
    });

    it('should get a user\'s liquidity', async () => {
      expect(await newComptroller.getAccountLiquidity(tropykus.account))
        .to.equal(0);
      await crbtc.mint(tropykus.account, 0.5);
      const price = await tropykus.priceOracle.getUnderlyingPrice(crbtc.address);
      const collateralFactor = await newComptroller.getCollateralFactor(crbtc.address);
      expect(await newComptroller.getAccountLiquidity(tropykus.account))
          .to.equal(0.5 * price * collateralFactor);
    });

    it('should deposit in the cRBTC market', async () => {
      await crbtc.mint(tropykus.account, 0.5);
      expect(await crbtc.balanceOfUnderlying(tropykus.account)).equals(0.5);
    });

    it('should deposit in any token market', async () => {
      await cdoc.mint(tropykus.account, 1000);
      expect(await cdoc.balanceOfUnderlying(tropykus.account)).equals(1000);
    });

    it('should borrow in cdoc an amount once he has a collateral on cdoc', async() => {
      await crbtc.mint(tropykus.account, 0.8);
      expect(await crbtc.balanceOfUnderlying(tropykus.account)).equals(0.8);
      await cdoc.borrow(tropykus.account, 100);
      expect(await cdoc.borrowBalanceCurrent(tropykus.account)).equals(100);
    });

    it.skip('should borrow in crbtc market an amount once he has a collateral on crbtc', async() => {
      await cdoc.mint(tropykus.account, 1000);
      await crbtc.borrow(tropykus.account, 0.005);
      const balance = await crbtc.borrowBalanceCurrent(tropykus.account);
      expect(balance).equals(0.005);
    });

    it.skip('should redeem from crbtc market', async() => {
      await crbtc.mint(tropykus.account, 0.5);
      const balance = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(0.5);

      const balanceBefore = await crbtc.balanceOfUnderlying(tropykus.account);
      await crbtc.redeem(tropykus.account, 0.025);
      const balanceAfter = await crbtc.balanceOfUnderlying(tropykus.account);
      expect(balanceAfter).equals(balanceBefore - 0.025);
    });

    it.skip('should redeem from cdoc market', async() => {
      await cdoc.mint(tropykus.account, 500);
      const balance = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balance).equals(500);

      const balanceBefore = await cdoc.balanceOfUnderlying(tropykus.account);
      await cdoc.redeem(tropykus.account, 250);
      const balanceAfter = await cdoc.balanceOfUnderlying(tropykus.account);
      expect(balanceAfter).equals(balanceBefore - 250);
    });

    it.skip('should redeem all kTokens from crbtc market', async() => {
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

    it.skip('should repay all debt from crbtc market', async() => {
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
