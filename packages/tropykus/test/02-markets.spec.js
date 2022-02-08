import { ethers, FixedNumber } from 'ethers';
import sinon from 'sinon';
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
const comptrollerAddress = '0xB173b5EE67b9F38263413Bc29440f89cC5BC3C39';
const crbtcMarketAddress = '0xE498D1E3A0d7fdb80a2d7591D997aFDA34F8c5C5';
const csatMarketAddress = '0xf8A2e7A2bfa135a81f0c78edD6252a818619E2c3';
const cdocAddress = '0x1CbD672Ac9d98F4f033e12eDE3c55f5CB02B983C';
const docAddress = '0xC3b5a61f8fc55fef790165d9f12AD23D47F7De99';
const usdtAddress = '0x3AC74a85B80824caa8cc9Dbae0DdcE584F3D3e8E';
const crdocAddress = '0x1a389e93be8ef2B5D105DEa44271d4426736A484';
const rdocAddress = '0x301b50CD6E1a31c56122463aA306290baD3428cf';
const cdocInterestRateModelAddress = '0x17cFe95D999961dAd27E47Af8B9b8A8Ef07832e4';
const crdocInterestRateModelAddress = '0x46342D72503A41f797CC47D5B89C8Cc8F592f5a3';
const crbtcInterestRateModelAddress = '0x466BBE5C0368Ba75EBA90c2f4643c9DbC226B4d7';
const csatInterestRateModelAddress = '0xD0Ed8135F9Ceb504A0484eEF9700D17622569Df2';
const cusdtInterestRateModelAddress = '0x5932c14cBBaA59248321E8448E4E46Ed5734e5a6';
const priceOracleAddress = '0x4d7Cc3cdb88Fa1EEC3095C9f849c799F1f7D4031';
const crbtcAdapterAddress = '0x94D2C65157FBeb52BaEEAaaE7b20fA0fAc3f0681';
const cdocAdapterAddress = '0x21e23076EAe56759304a6883bEBdb2e3EbA7678A';
const crdocAdapterAddress = '0xB572eee464bFEc3f92189A09fBbb7D7BCD3540C5';
const csatAdapterAddress = '0x014635649DDf811FA581e24F95316A4440a02D78';
const cusdtdapterAddress = '0x99bBf2c61FeA5E067D1F311f0B0114Bd71dC8272';
const unitrollerAddress = '0xdC98d636ad43A17bDAcE402997C7c6ABA55EAa28';

describe('Market', () => {
  let tropykus;
  let dep;
  let comptroller;
  const sandbox = sinon.createSandbox();

  it('should return the min value between two fixed numbers', () => {
    let a = FixedNumber.from(0.0001.toString(), 'fixed80x18');
    let b = FixedNumber.from(0.00001.toString(), 'fixed80x18');
    let c = Market.min(a, b);

    expect(c._value).equals(b._value);

    a = FixedNumber.from(0.00001.toString(), 'fixed80x18');
    b = FixedNumber.from(0.0001.toString(), 'fixed80x18');
    c = Market.min(a, b);

    expect(c._value).equals(a._value);

    a = FixedNumber.from('0.000000000000000001', 'fixed80x18');
    b = FixedNumber.from(0.0001.toString(), 'fixed80x18');
    c = Market.min(a, b);

    expect(c._value).equals(a._value);

    a = FixedNumber.from(0.0001.toString(), 'fixed80x18');
    b = FixedNumber.from(0.0001.toString(), 'fixed80x18');
    c = Market.min(a, b);

    expect(c._value).equals(a._value);
    expect(c._value).equals(b._value);
  });

  beforeEach(async () => {
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const wsProvider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:8545');
    tropykus = new Tropykus(provider, wsProvider, 400000);
    dep = await tropykus.getAccount();
    comptroller = await tropykus.setComptroller(dep, comptrollerAddress);
  });

  it('should deployed a new CRBTC market', async () => {
    const crbtc = await tropykus.addMarket(
      dep,
      'CRBTC',
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
    const crbtc = await tropykus.addMarket(dep, 'CRBTC', crbtcMarketAddress);
    expect(crbtc).instanceOf(CRBTCMarket);
    expect(crbtc.address).equals(crbtcMarketAddress.toLowerCase());
  })

  it('should instance a CToken Market with an existing contract address', async () => {
    const cdoc = await tropykus.addMarket(dep, 'CErc20Immutable', cdocAddress, docAddress);
    expect(cdoc).instanceOf(CErc20Market);
    expect(cdoc.address).equals(cdocAddress.toLowerCase());
  });

  it('should instance a CRDOC Market wit an existing contract address', async () => {
    const crdoc = await tropykus.addMarket(dep, 'CRDOC', crdocAddress, rdocAddress);
    expect(crdoc).instanceOf(CRDOCMarket);
    expect(crdoc.address).equals(crdocAddress.toLowerCase());
  });

  it('should throw and error if no erc20TokenAddress provided', async () => {
    try {
      await tropykus
        .addMarket(dep, 'CErc20Immutable', cdocAddress, null);
    } catch (err) {
      expect(err.toString())
        .equals((new Error('Must provide a valid erc20 token address')).toString());
    }
  });

  it('should return the market\'s kSymbol', async () => {
    const cdoc = await tropykus.addMarket(dep, 'CErc20Immutable', cdocAddress, docAddress);
    expect(await cdoc.getSymbol()).to.equal('kDOC');
  });

  it('should return the market\'s underlying symbol', async () => {
    const cdoc = await tropykus.addMarket(dep, 'CErc20Immutable', cdocAddress, docAddress);
    const crdoc = await tropykus.addMarket(dep, 'CRDOC', crdocAddress, rdocAddress);
    const crbtc = await tropykus.addMarket(dep, 'CRBTC', crbtcMarketAddress);
    const csat = await tropykus.addMarket(dep, 'CRBTC', csatMarketAddress);
    expect(await csat.getUnderlyingSymbol()).to.equal('tRBTC');
    expect(await crbtc.getUnderlyingSymbol()).to.equal('tRBTC');
    expect(await cdoc.getUnderlyingSymbol()).to.equal('tDOC');
    expect(await crdoc.getUnderlyingSymbol()).to.equal('tRDOC');
  });

  it('should return the market\'s type', async () => {
    const cdoc = await tropykus.addMarket(dep, 'CErc20Immutable', cdocAddress, docAddress);
    const crdoc = await tropykus.addMarket(dep, 'CRDOC', crdocAddress, rdocAddress);
    const crbtc = await tropykus.addMarket(dep, 'CRBTC', crbtcMarketAddress);
    const csat = await tropykus.addMarket(dep, 'CRBTC', csatMarketAddress);
    expect(await csat.type).to.equal('CRBTC');
    expect(await crbtc.type).to.equal('CRBTC');
    expect(await cdoc.type).to.equal('CErc20Immutable');
    expect(await crdoc.type).to.equal('CRDOC');
  });

  describe('Market setups', () => {
    let crbtc;
    let newComptroller;
    it('should set market\'s comptroller', async () => {
      newComptroller = await tropykus.setComptroller(dep, null, unitrollerAddress);
      crbtc = await tropykus.addMarket(
        dep,
        'CRBTC',
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
    let csat;
    let cdoc;
    let crdoc;
    let cusdt;
    let newComptroller;
    let alice;
    let bob;
    let carlos;
    let david;
    let eve;
    let companionAddress;
    beforeEach(async () => {
      newComptroller = await tropykus.setComptroller(dep, null, unitrollerAddress);
      crbtc = await tropykus.addMarket(
        dep,
        'CRBTC',
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
      csat = await tropykus.addMarket(
        dep,
        'CRBTC',
        null,
        null,
        {
          comptrollerAddress: newComptroller.address,
          interestRateModelAddress: csatInterestRateModelAddress,
          initialExchangeRate: 0.02,
          name: 'New CSAT',
          symbol: 'CSAT',
          decimals: 18,
        });
      cdoc = await tropykus.addMarket(
        dep,
        'CErc20Immutable',
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
      cusdt = await tropykus.addMarket(
        dep,
        'CErc20Immutable',
        null,
        usdtAddress,
        {
          comptrollerAddress: newComptroller.address,
          interestRateModelAddress: cusdtInterestRateModelAddress,
          initialExchangeRate: 0.02,
          name: 'New CUSDT',
          symbol: 'CUSDT',
          decimals: 18,
        });
      crdoc = await tropykus.addMarket(
        dep,
        'CRDOC',
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
      await tropykus.priceOracle.setAdapterToToken(dep, csat.address, csatAdapterAddress);
      await tropykus.priceOracle.setAdapterToToken(dep, cusdt.address, cusdtdapterAddress);

      await crbtc.setComptroller(dep, newComptroller.address);
      await cdoc.setComptroller(dep, newComptroller.address);
      await crdoc.setComptroller(dep, newComptroller.address);
      await csat.setComptroller(dep, newComptroller.address);
      await cusdt.setComptroller(dep, newComptroller.address);

      await newComptroller.supportMarket(dep, crbtc.address);
      await newComptroller.supportMarket(dep, cdoc.address);
      await newComptroller.supportMarket(dep, crdoc.address);
      await newComptroller.supportMarket(dep, csat.address);
      await newComptroller.supportMarket(dep, cusdt.address);

      await newComptroller.setCollateralFactor(dep, crbtc.address, 0.6);
      await newComptroller.setCollateralFactor(dep, cdoc.address, 0.75);
      await newComptroller.setCollateralFactor(dep, crdoc.address, 0.7);
      await newComptroller.setCollateralFactor(dep, csat.address, 0.6);
      await newComptroller.setCollateralFactor(dep, cusdt.address, 0);

      await crbtc.setReserveFactor(dep, 0.2);
      await cdoc.setReserveFactor(dep, 0.5);
      await crdoc.setReserveFactor(dep, 0.5);
      await csat.setReserveFactor(dep, 0.5);
      await cusdt.setReserveFactor(dep, 0.5);

      await crbtc.mint(dep, 1);
      await cdoc.mint(dep, 10000);
      await crdoc.mint(dep, 10000);

      companionAddress = await csat.newCompanion(
        dep,
        newComptroller.address,
        priceOracleAddress,
      );
      await csat.setNewCompanion(dep, companionAddress);
      await csat.setMarketCapThreshold(dep, companionAddress, 0.8);

      alice = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/1`);
      bob = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/2`);
      carlos = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/3`);
      david = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/4`);
      eve = tropykus.getAccountFromMnemonic(mnemonic, `m/44'/60'/0'/0/4`);

      const mkts = [
        crbtc.address,
        cdoc.address,
        crdoc.address,
        csat.address,
        cusdt.address,
      ];

      await newComptroller.enterMarkets(dep, mkts);
      await newComptroller.enterMarkets(alice, mkts);
    });

    it('should transfer underlying to the given address', async () => {
      let cdocBalance = await cdoc.balanceOfUnderlyingInWallet(dep);
      let crdocBalance = await crdoc.balanceOfUnderlyingInWallet(dep);
      expect(cdocBalance.underlying.value)
        .to
        .be
        .at
        .least(10);
      expect(crdocBalance.underlying.value)
        .to
        .be
        .at
        .least(10);

      await crdoc.transferUnderlying(dep, alice.address, 10);
      crdocBalance = await crdoc.balanceOfUnderlyingInWallet(alice);
      expect(crdocBalance.underlying.value)
        .to
        .be
        .at
        .least(10);
      expect(crdocBalance.usd.value)
        .to
        .be
        .at
        .least(10);
      await cdoc.transferUnderlying(dep, alice.address, 10);
      cdocBalance = await cdoc.balanceOfUnderlyingInWallet(alice);
      expect(cdocBalance.underlying.value)
        .to
        .be
        .at
        .least(10);
      expect(cdocBalance.usd.value)
        .to
        .be
        .at
        .least(10);
    });

    it('should return the wallet balance in underlying and usd for rbtc', async () => {
      const balance = await csat.balanceOfUnderlyingInWallet(bob);
      expect(balance.underlying.value)
        .to
        .equal(10000000000000);
      expect(balance.usd.value)
        .to
        .equal(10000000000000 * 54556.9);
    });

    it('should get the supplier snapshot of an account address', async () => {
      await crbtc.mint(alice, 0.001);
      const snapshot = await crbtc.getSupplierSnapshot(alice.address);
      expect(Number(snapshot.underlyingAmount) / 1e18)
        .to
        .equal(0.001);
    });

    it('should tell if the market has hurricane interest model or not', async () => {
      expect(await crbtc.isHurricane()).to.be.false;
      expect(await csat.isHurricane()).to.be.true;
    });

    it('should get market cap limit values', async () => {
      let data = await crbtc.getMarketCap(dep, companionAddress);
      expect(data.totalDeposits.underlying.value)
        .to
        .equal(0);
      expect(data.limit.underlying.value)
        .to
        .equal(0);
      data = await csat.getMarketCap(dep, companionAddress);
      expect(data.totalDeposits.underlying.value)
        .to
        .equal(0);
      expect(data.limit.underlying.value)
        .to
        .equal(0);
      await crbtc.borrow(dep, 0.7);
      data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 7000);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(7000);
      expect(data.usd)
        .to
        .equal(7000);
      await crdoc.borrow(dep, 1000);
      data = await crdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(1000);
      expect(data.usd)
        .to
        .equal(1000);
      await csat.mint(alice, 0.025);
      data = await csat.getMarketCap(dep, companionAddress);
      expect(data.totalDeposits.usd.value)
        .to
        .be
        .closeTo(0.025 * 54556.9, 18);
      expect(data.limit.usd.value)
        .to
        .equal(((0.7 * 54556.9) + 7000 + 1000) * 0.8);
    });

    it('should get the earnings and de underlying value for any interest rate model', async () => {
      await crdoc.transferUnderlying(dep, alice.address, 100);
      await crdoc.mint(alice, 100);
      const {
        underlying,
        usd
      } = await crdoc.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(100);
      expect(usd)
        .equals(100);
      await crdoc.borrow(dep, 1000);
      await cdoc.mint(dep, 10);
      await cdoc.mint(dep, 10);
      const deposit = await crdoc.getEarnings(alice);
      expect(deposit.underlying)
        .to
        .equal(100);
      expect(deposit.earnings)
        .to
        .be
        .closeTo(0.000000029163305, 1e-18);
      expect(deposit.underlyingUSD)
        .to
        .equal(100);
      expect(deposit.earningsUSD)
        .to
        .be
        .closeTo(0.000000029163305, 1e-18);
    });

    it('should get the earnings and de underlying value for hurricane', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 7000);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(7000);
      expect(data.usd)
        .to
        .equal(7000);
      await csat.mint(alice, 0.002);
      const {
        underlying,
        usd
      } = await csat.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(0.002);
      expect(usd)
        .to
        .be
        .closeTo(0.002 * 54556.9, 1e-13);
      await crdoc.mint(dep, 10);
      await crdoc.mint(dep, 10);
      await crdoc.mint(dep, 10);
      await crdoc.mint(dep, 10);
      await crdoc.mint(dep, 10);
      const deposit = await csat.getEarnings(alice);
      expect(deposit.underlying)
        .to
        .equal(0.002);
      expect(deposit.earnings)
        .to
        .be
        .closeTo(0.000000000761035008, 1e-18);
      expect(deposit.underlyingUSD)
        .to
        .be
        .closeTo(0.002 * 54556.9, 18);
      expect(deposit.earningsUSD)
        .to
        .be
        .closeTo(0.000000000761035008 * 54556.9, 1e-18);
    });

    it('should returns the balance on the subsidy fund for csat', async () => {
      let data = await csat.getSubsidyFund();
      expect(data.underlying)
        .to
        .equal(0);
      expect(data.usd)
        .to
        .equal(0);
      await csat.addSubsidy(dep, 0.5);
      data = await csat.getSubsidyFund();
      expect(data.underlying)
        .to
        .equal(0.5);
      expect(data.usd)
        .to
        .equal(0.5 * 54556.9);
    });

    it('should return market\'s cash for cdoc', async () => {
      let cash = await crdoc.getCash();
      expect(cash.underlying)
        .to
        .equal(10000);
      await crdoc.transferUnderlying(dep, alice.address, 100);
      await crdoc.mint(alice, 100);
      cash = await crdoc.getCash();
      expect(cash.underlying)
        .to
        .be
        .closeTo(10100, 18);
      expect(cash.usd)
        .to
        .equal(10100);
    });

    it('should return market\'s cash for crbtc', async () => {
      let cash = await crbtc.getCash();
      expect(cash.underlying)
        .to
        .equal(1);
      expect(cash.usd)
        .to
        .equal(54556.9);
      await crbtc.mint(alice, 0.05);
      cash = await crbtc.getCash();
      expect(cash.underlying)
        .to
        .equal(1.05);
      expect(cash.usd)
        .to
        .be
        .closeTo(1.05 * 54556.9, 1e-18);
    });

    it('should return market\'s reserves', async () => {
      let reserves = await crbtc.getReserves();
      expect(reserves.underlying)
        .to
        .equal(0);
      expect(reserves.usd)
        .to
        .equal(0);
      await crbtc.mint(alice, 0.05);
      await crbtc.borrow(alice, 0.005);
      const borrowBalance = await crbtc.borrowBalanceCurrent(alice);
      const borrowRate = await crbtc.getBorrowAnnualRate();
      await crbtc.repayBorrow(alice, null, true);
      reserves = await crbtc.getReserves();
      const interest = (borrowBalance.underlying * (borrowRate / 1051200)) * 2;
      expect(reserves.underlying)
        .to
        .be
        .closeTo(interest, 1e-8);
    });

    it('should get a user\'s kTokens balance', async () => {
      let tokenBalance = await crbtc.balanceOf(alice);
      expect(tokenBalance.underlying.value)
        .to
        .equal(0);

      await crbtc.mint(alice, 0.001);
      tokenBalance = await crbtc.balanceOf(alice);
      expect(tokenBalance.tokens.value)
        .to
        .equal(0.001 / 0.02);
      expect(tokenBalance.underlying.value)
        .to
        .equal(0.001);
    });

    it('should get a market\'s current exchange rate', async () => {
      expect(await crbtc.getExchangeRateCurrent(alice))
        .to
        .equal(0.02);
    });

    it('should get a user\'s liquidity', async () => {
      let data = await newComptroller.getAccountLiquidity(alice);
      expect(data.usd.value)
        .to
        .equal(0);
      await crbtc.mint(alice, 0.5);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.5);
      expect(balance.usd)
        .equals(0.5 * 54556.9);
      const price = await tropykus.priceOracle.getUnderlyingPrice(crbtc.address);
      const collateralFactor = await newComptroller.getCollateralFactor(crbtc.address);
      const {
        underlying,
        usd
      } = await newComptroller.getAccountLiquidity(alice, crbtc.address);
      expect(usd.value)
        .to
        .equal(0.5 * price * collateralFactor);
      expect(underlying.value)
        .to
        .equal((0.5 * price * collateralFactor) / 54556.9);
      expect(usd.fixedNumber)
        .instanceOf(ethers.FixedNumber);
      expect(underlying.fixedNumber)
        .instanceOf(ethers.FixedNumber);
      expect(Number(underlying.fixedNumber._value))
        .to
        .equal(underlying.value);
      expect(Number(usd.fixedNumber._value))
        .to
        .equal(usd.value);
    });

    it('should get market\'s total borrows', async () => {
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0);
      expect(data.usd)
        .to
        .equal(0);
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);
      await crbtc.borrow(alice, 0.005);
      data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.005);
      expect(data.usd)
        .to
        .be
        .closeTo(0.005 * 54556.9, 1e-13);
    });

    it('should get market\'s total supply', async () => {
      let data = await cdoc.getMarketTotalSupply();
      expect(data.underlying)
        .to
        .equal(10000);
      expect(data.usd)
        .to
        .equal(10000);

      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);

      data = await cdoc.getMarketTotalSupply();
      expect(data.underlying)
        .to
        .equal(10000 + 1000);
      expect(data.usd)
        .to
        .equal(10000 + 1000);
    });

    it('should deposit in the cRBTC market', async () => {
      await crbtc.mint(alice, 0.5);
      const {
        underlying,
        usd
      } = await crbtc.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(0.5);
      expect(usd)
        .equals(0.5 * 54556.9);
    });

    it('should deposit in any token market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);
      const {
        underlying,
        usd
      } = await cdoc.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(1000);
      expect(usd)
        .equals(1000);
    });

    it('should borrow in cdoc an amount once he has a collateral on cdoc', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 0.8);
      const supplyBalance = await cdoc.balanceOfUnderlying(alice);
      expect(supplyBalance.underlying)
        .equals(0.8);
      expect(supplyBalance.usd)
        .equals(0.8);
      await cdoc.borrow(alice, 0.05);
      const borrowBalance = await cdoc.borrowBalanceCurrent(alice);
      expect(borrowBalance.underlying)
        .equals(0.05);
      expect(borrowBalance.usd)
        .equals(0.05);
    });

    it('should borrow in crbtc market an amount once he has a collateral on crbtc', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);
      await crbtc.borrow(alice, 0.005);
      const {
        underlying,
        usd
      } = await crbtc.borrowBalanceCurrent(alice);
      expect(underlying)
        .equals(0.005);
      expect(usd)
        .to
        .be
        .closeTo(0.005 * 54556.9, 1e-13);
    });

    it('should return the borrow Annual Percentage Rate', async () => {
      expect(await cdoc.getBorrowAnnualRate())
        .to
        .be
        .closeTo(0.08, 18);
    });

    it('should return the supply Annual Percentage Rate', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 1000);
      expect(await cdoc.getSupplyAnnualRate())
        .to
        .equal(0);
      await cdoc.mint(alice, 1000);
      await cdoc.borrow(alice, 500);
      const br = await cdoc.getBorrowAnnualRate();
      const rf = await cdoc.getReserveFactor();
      expect(await cdoc.getSupplyAnnualRate())
        .to
        .be
        .closeTo(br * 0.5 * (1 - rf), 18);
    });

    it('should redeem from crbtc market', async () => {
      await crbtc.mint(alice, 0.5);
      const {
        underlying,
        usd
      } = await crbtc.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(0.5);
      expect(usd)
        .equals(0.5 * 54556.9);

      const balanceBefore = await crbtc.balanceOfUnderlying(alice);
      await crbtc.redeem(alice, 0.025);
      const balanceAfter = await crbtc.balanceOfUnderlying(alice);
      expect(balanceAfter.underlying)
        .equals(balanceBefore.underlying - 0.025);
    });

    it('should redeem from cdoc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 500);
      await cdoc.mint(alice, 500);
      const {
        underlying,
        usd
      } = await cdoc.balanceOfUnderlying(alice);
      expect(underlying)
        .equals(500);
      expect(usd)
        .equals(500);

      const balanceBefore = await cdoc.balanceOfUnderlying(alice);
      await cdoc.redeem(alice, 250);
      const balanceAfter = await cdoc.balanceOfUnderlying(alice);
      expect(balanceAfter.underlying)
        .equals(balanceBefore.underlying - 250);
    });

    it('should redeem all kTokens from crbtc market', async () => {
      await crbtc.mint(alice, 0.5);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.5);
      expect(balance.usd)
        .equals(0.5 * 54556.9);
      const kRBTCBalance = await crbtc.balanceOf(alice);
      expect(kRBTCBalance.tokens.value)
        .equals(25);

      await crbtc.redeem(alice, 0, true);
      const balanceAfter = await crbtc.balanceOfUnderlying(alice);
      expect(balanceAfter.underlying)
        .equals(0);
      expect(balanceAfter.usd)
        .equals(0);
      const kRBTCBalanceAfter = await crbtc.balanceOf(alice);
      expect(kRBTCBalanceAfter.tokens.value)
        .equals(0);
    });

    it('should redeem all kTokens from cdoc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 500);
      await cdoc.mint(alice, 500);
      const balance = await cdoc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(500);
      expect(balance.usd)
        .equals(500);
      const kDocBeforeBalance = await cdoc.balanceOf(alice);
      expect(kDocBeforeBalance.tokens.value)
        .to
        .be
        .closeTo(25000, 1e-10);

      await cdoc.redeem(alice, null, true);
      const balanceAfter = await cdoc.balanceOfUnderlying(alice);
      expect(balanceAfter.underlying)
        .equals(0);
      expect(balanceAfter.usd)
        .equals(0);
      const kDocAfterBalance = await cdoc.balanceOf(alice);
      expect(kDocAfterBalance.tokens.value)
        .equals(0);
    });

    it('should get the borrow balance in all the markets', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 7000);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(7000);
      expect(data.usd)
        .to
        .equal(7000);
      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .to
        .equal(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address, crdoc.address);
      await crbtc.mint(alice, 0.5);
      balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .to
        .equal(0.5);
      expect(balance.usd)
        .to
        .equal(0.5 * 54556.9);

      await csat.borrow(alice, 0.025);
      data = await csat.borrowBalanceCurrent(alice);
      expect(data.underlying)
        .to
        .equal(0.025);
      await crdoc.borrow(alice, 1000);
      data = await crdoc.borrowBalanceCurrent(alice);
      expect(data.underlying)
        .to
        .equal(1000);

      const {
        usd,
        underlying
      } = await newComptroller
        .getTotalBorrowsInAllMarkets(alice, markets, crbtc.address);
      expect(underlying)
        .to
        .be
        .closeTo((0.025 * 54556.9 + 1000) / 54556.9, 1e-8);
      expect(usd)
        .to
        .be
        .closeTo(0.025 * 54556.9 + 1000, 1e-3);
    });

    it('should get the supply balance in all the markets', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 7000);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(7000);
      expect(data.usd)
        .to
        .equal(7000);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address, crdoc.address);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .to
        .equal(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-10);

      await crbtc.mint(alice, 0.05);
      balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .to
        .be
        .closeTo(0.05, 1e-12);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.05 * 54556.9, 1e-12);

      await crdoc.transferUnderlying(dep, alice.address, 3000);
      await crdoc.mint(alice, 3000);
      balance = await crdoc.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .to
        .equal(3000);
      expect(balance.usd)
        .to
        .equal(3000);

      const {
        usd,
        underlying
      } = await newComptroller
        .getTotalSupplyInAllMarkets(alice, markets, crbtc.address);
      expect(usd)
        .to
        .be
        .closeTo(0.025 * 54556.9 + 0.05 * 54556.9 + 3000, 1e-3);
      expect(underlying)
        .to
        .be
        .closeTo((0.025 * 54556.9 + 0.05 * 54556.9 + 3000) / 54556.9, 1e-7);
    });

    it('should return the max value that an account can redeem from a market without debts or deposits', async () => {
      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address, crdoc.address);

      const {
        underlying,
        tokens
      } = await csat.maxAllowedToWithdraw(alice, markets);
      expect(underlying)
        .to
        .equal(0);
      expect(tokens.value)
        .to
        .equal(0);

      const data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, tokens.value, 0);
      expect(data.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .equal(0);
    });

    it('should return the max value that an account can redeem when cash its less than user supply', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 7000);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(7000);
      expect(data.usd)
        .to
        .equal(7000);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);

      await csat.borrow(dep, 0.024);

      const cash = await csat.getCash();
      expect(cash.underlying)
        .to
        .equal(0.001);
      expect(cash.usd)
        .to
        .be
        .closeTo(0.001 * 54556.9, 1e-12);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address, crdoc.address);

      data = await csat.maxAllowedToWithdraw(alice, markets);
      expect(data.underlying)
        .to
        .equal(cash.underlying);

      const hy = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, data.tokens.value, 0);
      expect(hy.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, data.underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can redeem from a market without debts', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 7000);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(7000);
      expect(data.usd)
        .to
        .equal(7000);
      await csat.mint(dep, 0.025);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address, crdoc.address);

      const {
        underlying,
        tokens
      } = await csat.maxAllowedToWithdraw(alice, markets);
      expect(underlying)
        .to
        .gte(0.025);

      data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, tokens.value, 0);
      expect(data.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can redeem when cash more than supply', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 7000);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(7000);
      expect(data.usd)
        .to
        .equal(7000);
      await csat.mint(dep, 0.025);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      await cdoc.transferUnderlying(dep, alice.address, 1000);
      await cdoc.mint(alice, 1000);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address, crdoc.address);

      data = await csat.maxAllowedToWithdraw(alice, markets);

      const hy = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, data.tokens.value, 0);
      expect(hy.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, data.underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can redeem from a market with active debts', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 7000);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(7000);
      expect(data.usd)
        .to
        .equal(7000);
      await csat.mint(dep, 0.025);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      const cdocDebt = 50;
      await cdoc.borrow(alice, cdocDebt);
      data = await cdoc.borrowBalanceCurrent(alice);
      expect(data.underlying)
        .equals(cdocDebt);
      expect(data.usd)
        .equals(cdocDebt);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address, crdoc.address);

      const {
        underlying,
        tokens
      } = await csat.maxAllowedToWithdraw(alice, markets);

      data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, tokens.value, 0);
      expect(data.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can redeem from a market with active debts and multiple deposits', async () => {
      await crbtc.borrow(dep, 0.7);
      let data = await crbtc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(0.7);
      expect(data.usd)
        .to
        .equal(0.7 * 54556.9);
      await cdoc.borrow(dep, 7000);
      data = await cdoc.getMarketTotalBorrows();
      expect(data.underlying)
        .to
        .equal(7000);
      expect(data.usd)
        .to
        .equal(7000);
      await csat.mint(dep, 0.025);

      await csat.mint(alice, 0.025);
      let balance = await csat.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(0.025);
      expect(balance.usd)
        .to
        .be
        .closeTo(0.025 * 54556.9, 1e-12);

      await cdoc.transferUnderlying(dep, alice.address, 10000);
      await cdoc.mint(alice, 10000);

      const cdocDebt = 50;
      await cdoc.borrow(alice, cdocDebt);
      data = await cdoc.borrowBalanceCurrent(alice);
      expect(data.underlying)
        .equals(cdocDebt);
      expect(data.usd)
        .equals(cdocDebt);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address, crdoc.address);

      const {
        underlying,
        tokens
      } = await csat.maxAllowedToWithdraw(alice, markets);
      const marketTokens = await csat.balanceOf(alice);
      expect(tokens.fixedNumber._value)
        .equals(marketTokens.tokens.fixedNumber._value);

      data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, csat.address, tokens.value, 0);
      expect(data.shortfall.usd)
        .equals(0);

      await csat.redeem(alice, underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, csat.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can redeem from a market with active debts collateral factor 0', async () => {
      await cusdt.mint(dep, 10000);
      await cusdt.transferUnderlying(dep, alice.address, 1000);

      await cusdt.mint(alice, 1000);
      let balance = await cusdt.balanceOfUnderlying(alice);
      expect(balance.underlying)
        .equals(1000);
      expect(balance.usd)
        .to
        .equals(1000);

      await crbtc.mint(alice, 0.005);

      const cdocDebt = 50;
      await cdoc.borrow(alice, cdocDebt);
      let data = await cdoc.borrowBalanceCurrent(alice);
      expect(data.underlying)
        .equals(cdocDebt);
      expect(data.usd)
        .equals(cdocDebt);

      const markets = await newComptroller
        .getAllMarketsInstances(csat.address, crbtc.address, crdoc.address);

      const {
        underlying,
        tokens
      } = await cusdt.maxAllowedToWithdraw(alice, markets);

      data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, cusdt.address, tokens.value, 0);
      expect(data.shortfall.usd)
        .equals(0);

      await cusdt.redeem(alice, underlying);
      const liquidity = await newComptroller.getAccountLiquidity(alice, cusdt.address);
      expect(liquidity.usd.value)
        .to
        .gt(0);
    });

    it('should return the max value that an account can deposit in stable markets', async () => {
      const randomNumber = (Math.random() * (1000.00 - 1.00 + 1.00) + 1.00)
        .toFixed(18);
      await cdoc.transferUnderlying(dep, carlos.address, randomNumber);

      const maxToDeposit = await cdoc.maxAllowedToDeposit(carlos);
      expect(maxToDeposit.underlying.fixedNumber._value)
        .equals(randomNumber);
      expect(maxToDeposit.usd.fixedNumber._value)
        .equals(randomNumber);

      await cdoc.mint(carlos, maxToDeposit.underlying.fixedNumber._value);
      const balanceOfCDoc = await cdoc.balanceOfUnderlyingInWallet(carlos);
      expect(balanceOfCDoc.underlying.fixedNumber._value)
        .equals('0.0');
    });

    it('should return the max value that an account can deposit in rbtc standard', async () => {
      const balance = await crbtc.balanceOfUnderlyingInWallet(david);

      const maxToDeposit = await crbtc.maxAllowedToDeposit(david);
      expect(maxToDeposit.underlying.fixedNumber._value)
        .equals(balance.underlying.fixedNumber._value);
      expect(Number(maxToDeposit.usd.fixedNumber._value))
        .to
        .be
        .closeTo((balance.underlying.value * 54556.9), 1e-1);
    });

    it('should return the max value that an account can deposit in rbtc micro', async () => {
      let maxToDeposit = await csat.maxAllowedToDeposit(eve);
      expect(maxToDeposit.underlying.fixedNumber._value).equals('0.0');

      await crbtc.borrow(dep, 0.7);
      await cdoc.borrow(dep, 7000);

      maxToDeposit = await csat.maxAllowedToDeposit(eve);
      let max = Math.min((((0.7 * 54556.9) + 7000) * 0.8) / 54556.9, 0.025);
      expect(maxToDeposit.underlying.fixedNumber._value).equals(max.toString());

      await csat.mint(eve, 0.007);

      maxToDeposit = await csat.maxAllowedToDeposit(eve);
      max = Math.min((((0.7 * 54556.9) + 7000) * 0.8) / 54556.9, 0.025 - 0.007);
      expect(Number(maxToDeposit.underlying.fixedNumber._value)).to.be.closeTo(max, 1e-17);
      await csat.redeem(dep, 0.025);
    });

    it('should return the max value that an account can deposit in rbtc micro with little market cap', async () => {
      let maxToDeposit = await csat.maxAllowedToDeposit(eve);
      expect(maxToDeposit.underlying.fixedNumber._value).equals('0.0');

      await crbtc.borrow(dep, 0.01);
      await cdoc.borrow(dep, 1270);
      await csat.mint(dep, 0.025);

      maxToDeposit = await csat.maxAllowedToDeposit(eve);
      await csat.mint(eve, maxToDeposit.underlying.value);

      maxToDeposit = await csat.maxAllowedToDeposit(eve);
      expect(maxToDeposit.underlying.value).equals(0);
      await csat.redeem(dep, 0.025);
    });

    it.skip('should return the max value than an account can borrow from a market with no more debts', async () => {
      let max = await csat.maxAllowedToBorrow(alice);
      expect(max.underlying).to.equal(0);
      expect(max.usd).to.equal(0);

      await crbtc.mint(alice, 0.05);

      const { underlying, usd } = await crbtc.maxAllowedToBorrow(alice);
      expect(underlying.value).to.equal(0.05 * 0.6);
      expect(usd.value).to.equal((0.05 * 54556.9) * 0.6);

      const data = await newComptroller
        .getHypotheticalAccountLiquidity(alice, crbtc.address, 0, underlying.fixedNumber);
      expect(data.shortfall.usd).equals(0);
      expect(data.liquidity.usd).equals(5);
    });

    it('should return the max value than an account can borrow from a market without more debts');

    it('should return the max value than an account can borrow from a market where the cash is less than account liquidity');

    it('should repay a portion of debt on cdoc market', async () => {
      await crbtc.mint(alice, 0.5);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying).equals(0.5);
      expect(balance.usd).equals(0.5 * 54556.9);

      await cdoc.borrow(alice, 500);
      const borrowBalanceBefore = await cdoc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore.underlying).equals(500);
      expect(borrowBalanceBefore.usd).equals(500);

      await cdoc.repayBorrow(alice, 250);
      const borrowBalanceAfter = await cdoc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter.underlying).to.be.closeTo(250, 4);
      expect(borrowBalanceAfter.usd).to.be.closeTo(250, 4);
    });

    it('should repay a portion of debt on crbtc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 500);
      await cdoc.mint(alice, 500);
      const balance = await cdoc.balanceOfUnderlying(alice);
      expect(balance.underlying).equals(500);
      expect(balance.usd).equals(500);

      await crbtc.borrow(alice, 0.005);
      const borrowBalanceBefore = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore.underlying).equals(0.005);
      expect(borrowBalanceBefore.usd).to.be.closeTo(0.005 * 54556.9, 1e-13);

      await crbtc.repayBorrow(alice, 0.0025);
      const borrowBalanceAfter = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter.underlying).to.be.closeTo(0.0025, 1e-9);
      expect(borrowBalanceAfter.usd).to.be.closeTo(0.0025 * 54556.9, 1e-4);
    });

    it('should repay all debt from crbtc market', async () => {
      await cdoc.transferUnderlying(dep, alice.address, 5000);
      await cdoc.mint(alice, 5000);
      const balance = await cdoc.balanceOfUnderlying(alice);
      expect(balance.underlying).equals(5000);
      expect(balance.usd).equals(5000);

      await crbtc.borrow(alice, 0.005);
      const borrowBalanceBefore = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore.underlying).equals(0.005);
      expect(borrowBalanceBefore.usd).to.be.closeTo(0.005 * 54556.9, 1e-13);

      await crbtc.repayBorrow(alice, null, true);
      const borrowBalanceAfter = await crbtc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter.underlying).equals(0);
      expect(borrowBalanceAfter.usd).equals(0);
    });

    it('should repay all debt from crdoc market', async () => {
      await crbtc.mint(alice, 1);
      const balance = await crbtc.balanceOfUnderlying(alice);
      expect(balance.underlying).equals(1);
      expect(balance.usd).equals(54556.9);

      await crdoc.borrow(alice, 1000);
      const borrowBalanceBefore = await crdoc.borrowBalanceCurrent(alice);
      expect(borrowBalanceBefore.underlying).equals(1000);
      expect(borrowBalanceBefore.usd).equals(1000);

      await crdoc.repayBorrow(alice, null, true);
      const borrowBalanceAfter = await crdoc.borrowBalanceCurrent(alice);
      expect(borrowBalanceAfter.underlying).equals(0);
      expect(borrowBalanceAfter.usd).equals(0);
    });

    describe('Events subscription', () => {
      afterEach(() => {
        sandbox.restore();
      });

      it('Should subscribe on mint event', async () => {
        const actionObj = {
          action: () => {
            return 'Action excecuted, mint';
          }
        };
        sandbox.spy(actionObj, "action");

        crbtc.subscribeOnEvent('Mint', actionObj.action);
        await crbtc.mint(alice, 0.0025);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, mint');

        await crbtc.mint(alice, 0.0025);
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
        await crbtc.mint(alice, 0.0025);
        await crbtc.redeem(alice, 0.002);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, redeem');

        await crbtc.redeem(alice, 0.0005);
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
        await crbtc.mint(alice, 0.0025);
        await crbtc.borrow(alice, 0.00001);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, borrow');

        await crbtc.borrow(alice, 0.00001);
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
        await crbtc.mint(alice, 0.0025);
        await crbtc.borrow(alice, 0.001);
        await crbtc.repayBorrow(alice, 0.0005);
        // This is necessary when using ganache to force the blockchain to move one block
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(true);
        expect(actionObj.action.getCall(0).returnValue).equals('Action excecuted, repayBorrow');

        await crbtc.repayBorrow(alice, 0, true);
        await newComptroller.allMarkets();

        expect(actionObj.action.calledOnce).equals(false);
        expect(actionObj.action.calledTwice).equals(true);
      });
    });
  });
});
