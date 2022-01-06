import { BigNumber, ethers } from 'ethers';
import CRBTCArtifact from '../../artifacts/CRBTC.json';
import Market from '../Market';
import CompanionArtifact from '../../artifacts/CRBTCCompanion.json';

export default class CRBTC extends Market {
  constructor(tropykus, contractAddress) {
    super(
      tropykus,
      CRBTCArtifact.abi,
      contractAddress,
    );
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
      let limit = 0;
      let totalDeposits = 0;
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
          isHurricane, [, totalBorrows, cSatPrice],
          satTotalSupply, satExchangeRate, threshold,
        ]) => {
          if (!isHurricane) return { totalDeposits, limit };
          if (Number(totalBorrows) === 0) return { totalDeposits, limit };
          limit = Number((totalBorrows.mul(threshold))
            .div(BigNumber.from(1e18.toString()))) / 1e18;
          const totalDepositInUnderlying = (satTotalSupply.mul(satExchangeRate))
            .div(BigNumber.from(1e18.toString()));
          totalDeposits = (totalDepositInUnderlying.mul(cSatPrice))
            .div(BigNumber.from(1e18.toString()));
          totalDeposits = Number(totalDeposits) / 1e18;
          return { totalDeposits, limit };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  setCompanion(account, companionAddress) {
    return new Promise((resolve, reject) => {
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
}
