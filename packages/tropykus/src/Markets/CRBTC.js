/* eslint-disable no-underscore-dangle */
import { BigNumber, ethers, FixedNumber } from 'ethers';
import CRBTCArtifact from '../../artifacts/CRBTC.json';
import Market from '../Market';
import CompanionArtifact from '../../artifacts/CRBTCCompanion.json';

const format = 'fixed80x18';
const factor = FixedNumber.fromString(1e18.toString(), format);
const zero = FixedNumber.fromString('0', format);

export default class CRBTC extends Market {
  constructor(tropykus, contractAddress) {
    super(
      tropykus,
      CRBTCArtifact.abi,
      contractAddress,
    );
    this.type = 'CRBTC';
    this.companionAddress = '';
  }

  addSubsidy(account, amount) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        .addSubsidy({
          value: ethers.utils.parseEther(amount.toString()),
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getSubsidyFund() {
    return new Promise(((resolve, reject) => {
      Promise.all([
        this.isHurricane(),
        this.instance.callStatic.subsidyFund(),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([isHurricane, subsidy, price]) => {
          if (!isHurricane) return { underlying: 0, usd: 0 };
          const toUSD = (subsidy.mul(price))
            .div(BigNumber.from(1e18.toString()));
          return {
            underlying: Number(subsidy) / 1e18,
            usd: Number(toUSD) / 1e18,
          };
        })
        .then(resolve)
        .catch(reject);
    }));
  }

  getMarketCap(account, companionAddress) {
    return new Promise((resolve, reject) => {
      let limit = {
        usd: {
          value: 0,
          fixedNumber: zero,
        },
        underlying: {
          value: 0,
          fixedNumber: zero,
        },
      };
      let totalDeposits = {
        usd: {
          value: 0,
          fixedNumber: zero,
        },
        underlying: {
          value: 0,
          fixedNumber: zero,
        },
      };
      if (!companionAddress) resolve({ totalDeposits, limit });
      const companion = new ethers.Contract(companionAddress,
        CompanionArtifact.abi, this.tropykus.provider);
      Promise.all([
        this.isHurricane(),
        companion.connect(account.signer).callStatic
          .getTotalBorrowsInOtherMarkets(),
        this.instance.callStatic.totalSupply(),
        this.instance.callStatic.exchangeRateCurrent(),
        companion.callStatic.marketCapThresholdMantissa(),
      ])
        .then(([
          isHurricane, [, totalBorrowsMantissa, cSatPriceMantissa],
          satTotalSupplyMantissa, satExchangeRateMantissa, thresholdMantissa,
        ]) => {
          const totalBorrows = FixedNumber.from(totalBorrowsMantissa.toString(), format)
            .divUnsafe(factor);
          const cSatPrice = FixedNumber.from(cSatPriceMantissa.toString(), format)
            .divUnsafe(factor);
          const satTotalSupply = FixedNumber.from(satTotalSupplyMantissa.toString(), format)
            .divUnsafe(factor);
          const satExchangeRate = FixedNumber.from(satExchangeRateMantissa.toString(), format)
            .divUnsafe(factor);
          const threshold = FixedNumber.from(thresholdMantissa.toString(), format)
            .divUnsafe(factor);
          if (!isHurricane) return { totalDeposits, limit };
          if (Number(totalBorrows) === 0) return { totalDeposits, limit };
          limit = totalBorrows.mulUnsafe(threshold);
          const limitInUnderlying = limit.divUnsafe(cSatPrice);
          const totalDepositInUnderlying = satTotalSupply.mulUnsafe(satExchangeRate);
          totalDeposits = totalDepositInUnderlying.mulUnsafe(cSatPrice);
          return {
            totalDeposits: {
              usd: {
                value: Number(totalDeposits._value),
                fixedNumber: totalDeposits,
              },
              underlying: {
                value: Number(totalDepositInUnderlying._value),
                fixedNumber: totalDepositInUnderlying,
              },
            },
            limit: {
              usd: {
                value: Number(limit._value),
                fixedNumber: limit,
              },
              underlying: {
                value: Number(limitInUnderlying._value),
                fixedNumber: limitInUnderlying,
              },
            },
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  setCompanion(account, companionAddress) {
    return new Promise((resolve, reject) => {
      this.companionAddress = companionAddress;
      this.instance.connect(account.signer)
        .setCompanion(companionAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  setMarketCapThreshold(account, companionAddress, threshold) {
    return new Promise((resolve, reject) => {
      const companion = new ethers.Contract(
        companionAddress, CompanionArtifact.abi, this.tropykus.provider,
      );
      companion.connect(account.signer)
        .setMarketCapThreshold(ethers.utils.parseEther(threshold.toString()))
        .then(resolve)
        .catch(reject);
    });
  }

  newCompanion(account, comptrollerAddress, priceOracleAddress) {
    return new Promise((resolve, reject) => {
      const companionFactory = new ethers.ContractFactory(
        CompanionArtifact.abi,
        CompanionArtifact.bytecode,
        account.signer,
      );
      companionFactory.deploy(comptrollerAddress, this.address, priceOracleAddress)
        .then((companion) => companion.address)
        .then(resolve)
        .catch(reject);
    });
  }

  getUnderlyingSymbol() {
    return new Promise((resolve, reject) => {
      this.tropykus.getChainId()
        .then((chainId) => (chainId === 31 || chainId === 1337
          ? 'tRBTC' : 'RBTC'))
        .then(resolve)
        .catch(reject);
    });
  }

  // Needs to be done a setCompanion before
  maxAllowedToDeposit(account) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.balanceOfUnderlyingInWallet(account),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
        this.isHurricane(),
        this.getMarketCap(account, this.companionAddress),
        this.getSupplierSnapshot(account.address),
      ])
        .then(([balanceInWallet, priceMantissa, isHurricane, marketCap, snapshot]) => {
          if (isHurricane) {
            const satMarketCapMaxDeposit = marketCap.limit.underlying.fixedNumber
              .subUnsafe(marketCap.totalDeposits.underlying.fixedNumber);
            if (satMarketCapMaxDeposit._value
              .localeCompare('0', undefined, { numeric: true }) > 0) {
              let depositLimitInSat = FixedNumber.from('0.025'.toString(), format);
              const satBalanceInWallet = balanceInWallet.underlying.fixedNumber;
              const satDepositsBalance = FixedNumber
                .from(snapshot.underlyingAmount.toString(), format)
                .divUnsafe(factor);
              depositLimitInSat = depositLimitInSat.subUnsafe(satDepositsBalance);
              const maxToDeposit = Market.min(Market
                .min(depositLimitInSat, satMarketCapMaxDeposit), satBalanceInWallet);
              const satPrice = FixedNumber.from(priceMantissa.toString(), format)
                .divUnsafe(factor);
              const usd = maxToDeposit.mulUnsafe(satPrice);
              return {
                underlying: {
                  value: Number(maxToDeposit._value),
                  fixedNumber: maxToDeposit,
                },
                usd: {
                  value: Number(usd._value),
                  fixedNumber: usd,
                },
              };
            }
            return {
              underlying: {
                value: 0,
                fixedNumber: zero,
              },
              usd: {
                value: 0,
                fixedNumber: zero,
              },
            };
          }
          return super.maxAllowedToDeposit(account);
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
