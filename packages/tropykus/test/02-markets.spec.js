import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tropykus from "../src";
import CRBTCMarket from '../src/Markets/CRBTC.js';
import CRDOCMarket from '../src/Markets/CRDOC.js';
import CErc20Market from '../src/Markets/CErc20.js';
import sinon from "sinon";


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
  let dep;
  let comptroller;
  const sandbox = sinon.createSandbox();

  beforeEach(async () => {
    tropykus = new Tropykus('http://127.0.0.1:8545', 400000);
    dep = await tropykus.setAccount(mnemonic, derivationPath);
    comptroller = await tropykus.setComptroller(dep, comptrollerAddress);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should deployed a new CRBTC market', async () => {
    const crbtc = await tropykus.addMarket(
      dep,
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
      dep,
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
      dep,
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
    const crbtc = await tropykus.addMarket(dep, 'CRBTC', true, crbtcMarketAddress);
    expect(crbtc).instanceOf(CRBTCMarket);
    expect(crbtc.address).equals(crbtcMarketAddress);
  })

  it('should instance a CToken Market with an existing contract address', async () => {
    const cdoc = await tropykus.addMarket(dep, 'CErc20Immutable', true, cdocAddress, docAddress);
    expect(cdoc).instanceOf(CErc20Market);
    expect(cdoc.address).equals(cdocAddress);
  });

  it('should instance a CRDOC Market wit an existing contract address', async () => {
    const crdoc = await tropykus.addMarket(dep, 'CRDOC', true, crdocAddress, rdocAddress);
    expect(crdoc).instanceOf(CRDOCMarket);
    expect(crdoc.address).equals(crdocAddress);
  });

  describe('Market setups', () => {
    let crbtc;
    let newComptroller;
    it('should set market\'s comptroller', async () => {
      newComptroller = await tropykus.setComptroller(dep, null, unitrollerAddress);
      crbtc = await tropykus.addMarket(
        dep,
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
      await crbtc.setComptroller(dep, newComptroller.address);
      expect(await crbtc.getComptroller()).equals(newComptroller.address);
    });

    it('should set market\'s reserve factor', async () => {
      expect(await crbtc.getReserveFactor()).to.equal(0);
      await crbtc.setReserveFactor(dep, 0.5);
      expect(await crbtc.getReserveFactor()).to.equal(0.5);
    });
  });

  describe(('Markets operations'), () => {
    let crbtc;
    let cdoc;
    let crdoc;
    let newComptroller;
    let alice;
    beforeEach(async () => {
      newComptroller = await tropykus.setComptroller(dep, null, unitrollerAddress);
      crbtc = await tropykus.addMarket(
        dep,
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
        dep,
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
        dep,
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

      await newComptroller.setOracle(dep, priceOracleAddress);
      await newComptroller.setLiquidationIncentive(dep, 0.07);
      await newComptroller.setCloseFactor(dep, 0.5);

      await tropykus.setPriceOracle(priceOracleAddress);
      await tropykus.priceOracle.setAdapterToToken(dep, crbtc.address, crbtcAdapterAddress);
      await tropykus.priceOracle.setAdapterToToken(dep, cdoc.address, cdocAdapterAddress);
      await tropykus.priceOracle.setAdapterToToken(dep, crdoc.address, crdocAdapterAddress);

      await crbtc.setComptroller(dep, newComptroller.address);
      await cdoc.setComptroller(dep, newComptroller.address);
      await crdoc.setComptroller(dep, newComptroller.address);

      await newComptroller.supportMarket(dep, crbtc.address);
      await newComptroller.supportMarket(dep, cdoc.address);
      await newComptroller.supportMarket(dep, crdoc.address);

      await newComptroller.setCollateralFactor(dep, crbtc.address, 0.6);
      await newComptroller.setCollateralFactor(dep, cdoc.address, 0.75);
      await newComptroller.setCollateralFactor(dep, crdoc.address, 0.7);

      await crbtc.setReserveFactor(dep, 0.2);
      await cdoc.setReserveFactor(dep, 0.5);
      await crdoc.setReserveFactor(dep, 0.5);

      await crbtc.mint(dep, 1);
      await cdoc.mint(dep, 10000);
      await crdoc.mint(dep, 10000);

      alice = await tropykus.setAccount(mnemonic, `m/44'/60'/0'/0/1`);

      const mkts = [
        crbtc.address,
        cdoc.address,
        crdoc.address,
      ];

      await newComptroller.enterMarkets(dep, mkts);
      await newComptroller.enterMarkets(alice, mkts);
    });

    it('should transfer underlying to the given address', async () => {
      expect(await cdoc.balanceOfUnderlyingInWallet(dep)).to.be.at.least(10);
      expect(await crdoc.balanceOfUnderlyingInWallet(dep)).to.be.at.least(10);

      await crdoc.transferUnderlying(dep, alice.address, 10);
      expect(await crdoc.balanceOfUnderlyingInWallet(alice)).to.be.at.least(10);
      await cdoc.transferUnderlying(dep, alice.address, 10);
      expect(await cdoc.balanceOfUnderlyingInWallet(alice)).to.be.at.least(10);
    });

    it('should get a user\'s kTokens balance', async () => {
      expect(await crdoc.balanceOf(alice)).to.equal(0);
    });

    it('should get a market\'s current exchange rate', async () => {
      expect(await crbtc.getExchangeRateCurrent(alice)).to.equal(0.02);
    });

    it('should get a user\'s liquidity', async () => {
      expect(await newComptroller.getAccountLiquidity(alice)).to.equal(0);
      await crbtc.mint(alice, 0.5);
      expect(await crbtc.balanceOfUnderlying(alice)).equals(0.5);
      const price = await tropykus.priceOracle.getUnderlyingPrice(crbtc.address);
      const collateralFactor = await newComptroller.getCollateralFactor(crbtc.address);
      expect(await newComptroller.getAccountLiquidity(alice))
        .to.equal(0.5 * price * collateralFactor);
    });

    it('should deposit in the cRBTC market', async () => {
      await crbtc.mint(alice, 0.5);
      expect(await crbtc.balanceOfUnderlying(alice)).equals(0.5);
    });

    it('should deposit in any token market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);
      expect(await cdoc.balanceOfUnderlying(alice)).equals(1000);
    });

    it('should borrow in cdoc an amount once he has a collateral on cdoc', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 0.8);
      expect(await cdoc.balanceOfUnderlying(alice)).equals(0.8);
      await cdoc.borrow(alice, 0.05);
      expect(await cdoc.borrowBalanceCurrent(alice)).equals(0.05);
    });

    it('should borrow in crbtc market an amount once he has a collateral on crbtc', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);
      await crbtc.borrow(alice, 0.005);
      const balance = await crbtc.borrowBalanceCurrent(alice);
      expect(balance).equals(0.005);
    });

    it('should redeem from crbtc market', async () => {
      await crbtc.mint(alice, 0.5);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance).equals(0.5);

      const balanceBefore = await crbtc.balanceOfUnderlying(alice);
      await crbtc.redeem(alice, 0.025);
      const balanceAfter = await crbtc.balanceOfUnderlying(alice);
      expect(balanceAfter).equals(balanceBefore - 0.025);
    });

    it('should redeem from cdoc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 500);
      await cdoc.mint(alice, 500);
      expect(await cdoc.balanceOfUnderlying(alice)).equals(500);

      const balanceBefore = await cdoc.balanceOfUnderlying(alice);
      await cdoc.redeem(alice, 250);
      const balanceAfter = await cdoc.balanceOfUnderlying(alice);
      expect(balanceAfter).equals(balanceBefore - 250);
    });

    it('should redeem all kTokens from crbtc market', async () => {
      await crbtc.mint(alice, 0.5);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance).equals(0.5);
      const kRBTCBalance = await crbtc.balanceOf(alice);
      expect(kRBTCBalance).equals(25);

      await crbtc.redeem(alice, 0, true);
      const balanceAfter = await crbtc.balanceOfUnderlying(alice);
      expect(balanceAfter).equals(0);
      const kRBTCBalanceAfter = await crbtc.balanceOf(alice);
      expect(kRBTCBalanceAfter).equals(0);
    });

    it('should redeem all kTokens from cdoc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 500);
      await cdoc.mint(alice, 500);
      const balance = await cdoc.balanceOfUnderlying(alice);
      expect(balance).equals(500);
      const kDocBeforeBalance = await cdoc.balanceOf(alice);
      expect(kDocBeforeBalance).to.be.closeTo(25000, 1);

      await cdoc.redeem(alice, null, true);
      const balanceAfter = await cdoc.balanceOfUnderlying(alice);
      expect(balanceAfter).equals(0);
      const kDocAfterBalance = await cdoc.balanceOf(alice);
      expect(kDocAfterBalance).equals(0);
    });

    it('should repay a portion of debt on cdoc market', async () => {
      await crbtc.mint(alice, 0.5);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance).equals(0.5);

      await cdoc.borrow(alice, 500);
      const borrowBalanceBefore = await cdoc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore).to.be.closeTo(500, 1);

      await cdoc.repayBorrow(alice, 250);
      const borrowBalanceAfter = await cdoc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter).to.be.closeTo(250, 1);
    });

    it('should repay a portion of debt on crbtc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 500);
      await cdoc.mint(alice, 500);
      const balance = await cdoc.balanceOfUnderlying(alice);
      expect(balance).equals(500);

      await crbtc.borrow(alice, 0.005);
      const borrowBalanceBefore = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore).to.be.closeTo(0.005, 1);

      await crbtc.repayBorrow(alice, 0.0025);
      const borrowBalanceAfter = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter).to.be.closeTo(0.0025, 1);
    });

    it('should repay all debt from crbtc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 5000);
      await cdoc.mint(alice, 5000);
      const balance = await cdoc.balanceOfUnderlying(alice);
      expect(balance).equals(5000);

      await crbtc.borrow(alice, 0.005);
      const borrowBalanceBefore = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore).to.be.closeTo(0.005, 1);

      await crbtc.repayBorrow(alice, null, true);
      const borrowBalanceAfter = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter).equals(0);
    });

    it('should repay all debt from crdoc market', async () => {
      await crbtc.mint(alice, 1);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance).equals(1);

      await crdoc.borrow(alice, 1000);
      const borrowBalanceBefore = await crdoc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore).to.be.closeTo(1000, 1);

      await crdoc.repayBorrow(alice, null, true);
      const borrowBalanceAfter = await crdoc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter).equals(0);
    });

    describe('Events subscription', () => {
      it('Should subscribe on mint event', async () => {
        const actionObj = {
          action: () => {
            return 'Action excecuted, mint';
          }
        };
        sandbox.spy(actionObj, "action");

        crbtc.subscribeOnEvent('Mint', actionObj.action);
        await crbtc.mint(dep, 0.0025);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, mint');

        await crbtc.mint(dep, 0.0025);
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(false);
        expect(actionObj.action.calledTwice).equals(true);
      });

      it('Should subscribe on redeem event', async () => {
        const actionObj = {
          action: () => {
            return 'Action excecuted, redeem';
          }
        };
        sandbox.spy(actionObj, "action");

        crbtc.subscribeOnEvent('Redeem', actionObj.action);
        await crbtc.mint(dep, 0.0025);
        await crbtc.redeem(dep, 0.002);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, redeem');

        await crbtc.redeem(dep, 0.0005);
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(false);
        expect(actionObj.action.calledTwice).equals(true);
      });

      it('Should subscribe on borrow event', async () => {
        const actionObj = {
          action: () => {
            return 'Action excecuted, borrow';
          }
        };
        sandbox.spy(actionObj, "action");

        crbtc.subscribeOnEvent('Borrow', actionObj.action);
        await crbtc.mint(dep, 0.0025);
        await crbtc.borrow(dep, 0.00001);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, borrow');

        await crbtc.borrow(dep, 0.00001);
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(false);
        expect(actionObj.action.calledTwice).equals(true);
      });

      it('Should subscribe on repayBorrow event', async () => {
        const actionObj = {
          action: () => {
            return 'Action excecuted, repayBorrow';
          }
        };
        sandbox.spy(actionObj, "action");

        crbtc.subscribeOnEvent('RepayBorrow', actionObj.action);
        await crbtc.mint(dep, 0.0025);
        await crbtc.borrow(dep, 0.001);
        await crbtc.repayBorrow(dep, 0.0005);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, repayBorrow');

        await crbtc.repayBorrow(dep, 0, true);
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(false);
        expect(actionObj.action.calledTwice).equals(true);
      });
    });
  });
});
