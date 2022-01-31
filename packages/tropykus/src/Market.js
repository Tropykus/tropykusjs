/* eslint-disable no-underscore-dangle */
import { BigNumber, ethers, FixedNumber } from 'ethers';
import interestRateModelArtifact from '../artifacts/InterestRateModel.json';
import Comptroller from './Comptroller';

const format = 'fixed80x18';
const factor = FixedNumber.fromString(1e18.toString(), format);
const zero = FixedNumber.fromString('0', format);
const minLiquidity = FixedNumber.fromString('1', format);

export default class Market {
  /**
   * Construct a new Market
   * @param {object} tropykus instance of the tropykus protocol to be linked with
   * @param {object} abi from which instantiate the market
   * @param {string} marketAddress address of the deployed Market instance to point to
   */
  constructor(tropykus, abi, marketAddress) {
    this.tropykus = tropykus;
    this.address = marketAddress.toLowerCase();
    this.instance = new ethers.Contract(marketAddress, abi, this.tropykus.provider);
    this.wsInstance = new ethers.Contract(marketAddress, abi, this.tropykus.wsProvider);
  }

  /**
   * Market Balance
   * @param {object} account Object get from tropykus.getAccount()
   * @return {Promise<Number>} the balance deposited in the market
   */
  balanceOfUnderlying(account) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.instance.connect(account.signer)
          .callStatic.balanceOfUnderlying(account.address),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([balance, priceMantissa]) => {
          const price = FixedNumber.from(priceMantissa.toString(), format)
            .divUnsafe(factor);
          const fixedNumber = FixedNumber.from(balance.toString(), format);
          const underlying = fixedNumber.divUnsafe(factor);
          const usd = fixedNumber.mulUnsafe(price).divUnsafe(factor);
          return {
            usd: Number(usd._value),
            underlying: Number(underlying._value),
            fixedNumber,
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Tokens Balance
   * @param {object} account Object get from tropykus.getAccount()
   * @return the balance of tokens owned in the market
   */
  balanceOf(account) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.instance.connect(account.signer)
          .callStatic.balanceOf(account.address),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
        this.instance.connect(account.signer)
          .callStatic.exchangeRateCurrent(),
      ])
        .then(([balanceMantissa, priceMantissa, exchangeRateMantissa]) => {
          const tokens = FixedNumber.from(balanceMantissa.toString(), format)
            .divUnsafe(factor);
          const exchangeRate = FixedNumber.from(exchangeRateMantissa.toString(), format)
            .divUnsafe(factor);
          const underlying = tokens.mulUnsafe(exchangeRate);
          const usd = underlying
            .mulUnsafe(FixedNumber.from(priceMantissa.toString(), format)
              .divUnsafe(factor));
          return {
            underlying: {
              value: Number(underlying._value),
              fixedNumber: underlying,
            },
            usd: {
              value: Number(usd._value),
              fixedNumber: usd,
            },
            tokens: {
              value: Number(tokens._value),
              fixedNumber: tokens,
            },
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Borrow Balance
   * @param {object} account Object get from tropykus.getAccount()
   * @return {Promise<Number>} the amount that has been borrowed in the market
   */
  borrowBalanceCurrent(account) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.instance.connect(account.signer)
          .callStatic.borrowBalanceCurrent(account.address),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([balanceMantissa, priceMantissa]) => {
          const fixedNumber = FixedNumber.from(balanceMantissa.toString(), format);
          const underlying = fixedNumber.divUnsafe(factor);
          const usd = fixedNumber
            .mulUnsafe(FixedNumber.from(priceMantissa.toString(), format))
            .divUnsafe(factor).divUnsafe(factor);
          return {
            underlying: Number(underlying._value),
            usd: Number(usd._value),
            fixedNumber,
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * function that allows us to make a deposit in the market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount value to be minted
   */
  mint(account, amount) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer).mint({
        value: ethers.utils.parseEther(amount.toString()),
        gasLimit: this.tropykus.gasLimit,
      })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * function that allows us to make a borrow in the market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount value to be borrowed
   */
  borrow(account, amount) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        .borrow(
          ethers.utils.parseEther(amount.toString()),
          { gasLimit: this.tropykus.gasLimit },
        )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * function that allows us to redeem from the market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount value to be redeemed
   * @param {boolean} maxValue if true ignores amount and redeems all
   * kTokens from the account, if the account has collateral compromised
   * in debts the transactions reverts.
   */
  redeem(account, amount, maxValue = false) {
    return new Promise((resolve, reject) => {
      if (maxValue) {
        this.instance.callStatic.balanceOf(account.address)
          .then((kTokens) => this.instance.connect(account.signer)
            .redeem(kTokens, { gasLimit: this.tropykus.gasLimit }))
          .then(resolve)
          .catch(reject);
      } else {
        this.instance.connect(account.signer)
          .redeemUnderlying(
            ethers.utils.parseEther(amount.toString()),
            { gasLimit: this.tropykus.gasLimit },
          )
          .then(resolve)
          .catch(reject);
      }
    });
  }

  /**
   * function that allows us to repay a borrow from the market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} amount value to be paid
   * @param {boolean} maxValue true if it's the max value
   */
  repayBorrow(account, amount, maxValue = false) {
    return new Promise((resolve, reject) => {
      if (maxValue) {
        this.instance.connect(account.signer).callStatic
          .borrowBalanceCurrent(account.address)
          .then((borrowBalance) => {
            const delta = BigNumber.from(0.0001e18);
            return this.instance.connect(account.signer)
              .repayBorrowAll({ value: borrowBalance.add(delta) });
          })
          .then(resolve)
          .catch(reject);
      } else {
        this.instance.connect(account.signer)
          .repayBorrow({
            value: ethers.utils.parseEther(amount.toString()),
            gasLimit: this.tropykus.gasLimit,
          })
          .then(resolve)
          .catch(reject);
      }
    });
  }

  /**
   * Sets a reserve factor for a market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {number} reserveFactor percentage of reserve factor from 0 to 1
   * @returns {Promise<Object>} transaction
   */
  setReserveFactor(account, reserveFactor) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(account.signer)
        ._setReserveFactor(ethers.utils.parseEther(reserveFactor.toString()))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Sets a new comptroller for this market
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} comptrollerAddress new comptroller address
   * @returns {Promise<Object> | Promise<Error>} Object Transaction or error.
   */
  setComptroller(account, comptrollerAddress) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      this.instance.connect(account.signer)
        ._setComptroller(comptrollerAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the reserved factor set for the market
   * @returns {Promise<Number>} Reserve factor without mantissa
   */
  getReserveFactor() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.reserveFactorMantissa()
        .then((rf) => Number(rf) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the market's kToken symbol
   * @returns {Promise<String>} Market's kSymbol
   */
  getSymbol() {
    return new Promise((resolve, reject) => {
      this.instance.callStatic.symbol()
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the comptroller set from this market
   * @returns {Promise<String>} Comptroller address
   */
  getComptroller() {
    return new Promise((resolve, reject) => {
      this.instance.comptroller()
        .then((address) => address.toLowerCase())
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the exchange rate of the market for the given account
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Number>} exchange rate
   */
  getExchangeRateCurrent(account) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        .callStatic.exchangeRateCurrent()
        .then((er) => Number(er) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the borrow annual percentage rate for this market
   * @returns {Promise<Number>} percentage of borrow annual rate
   */
  getBorrowAnnualRate() {
    return new Promise((resolve, reject) => {
      this.instance.interestRateModel()
        .then((modelAddress) => {
          const model = new ethers.Contract(modelAddress,
            interestRateModelArtifact.abi, this.tropykus.provider);
          return Promise.all([
            model.callStatic.blocksPerYear(),
            this.instance.callStatic.borrowRatePerBlock(),
          ]);
        })
        .then(([blocksPerYear, borrowRatePerBlock]) => borrowRatePerBlock
          .mul(blocksPerYear))
        .then((bAPY) => Number(bAPY) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns the supply annual percentage rate for this market
   * @returns {Promise<Number>} supply rate
   */
  getSupplyAnnualRate() {
    return new Promise((resolve, reject) => {
      this.instance.interestRateModel()
        .then((modelAddress) => {
          const model = new ethers.Contract(modelAddress,
            interestRateModelArtifact.abi, this.tropykus.provider);
          return Promise.all([
            model.callStatic.blocksPerYear(),
            this.instance.callStatic.supplyRatePerBlock(),
          ]);
        })
        .then(([blocksPerYear, supplyRatePerBlock]) => supplyRatePerBlock
          .mul(blocksPerYear))
        .then((sAPY) => Number(sAPY) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   *
   * @param {string} event name to subscribe on
   * @param {function} action which shall be excecuted once the even has been listened
   */
  subscribeOnEvent(event, action) {
    this.wsInstance.on(event, action);
  }

  /** Returns the balance of a given account on the underlying of this market
   * @param {object} account Object get from tropykus.getAccount()
   * @returns {Promise<Number>} balance of underlying in wallet in usd,
   * underlying and fixedNumber
   */
  balanceOfUnderlyingInWallet(account) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.tropykus.provider
          .getBalance(account.address),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([balance, priceMantissa]) => {
          const underlying = FixedNumber.from(balance, format).divUnsafe(factor);
          const price = FixedNumber.from(priceMantissa.toString(), format)
            .divUnsafe(factor);
          const usd = underlying.mulUnsafe(price);
          return {
            underlying: {
              value: Number(underlying._value),
              fixedNumber: underlying,
            },
            usd: {
              value: Number(usd._value),
              fixedNumber: usd,
            },
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns market cash
   * @returns {Promise<Object>} cash in usd, underlying and fixedNumber
   */
  getCash() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.instance.callStatic.getCash(),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([cashMantissa, priceMantissa]) => {
          const fixedNumber = FixedNumber.from(cashMantissa.toString(), format)
            .divUnsafe(factor);
          const price = FixedNumber.from(priceMantissa.toString(), format)
            .divUnsafe(factor);
          const usd = fixedNumber.mulUnsafe(price);
          return {
            underlying: Number(fixedNumber._value),
            usd: Number(usd._value),
            fixedNumber,
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getReserves() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.instance.callStatic.totalReserves(),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([reservesMantissa, priceMantissa]) => {
          const fixedNumber = FixedNumber.from(reservesMantissa.toString(), format)
            .divUnsafe(factor);
          const price = FixedNumber.from(priceMantissa.toString(), format)
            .divUnsafe(factor);
          const usd = fixedNumber.mulUnsafe(price);
          return {
            underlying: Number(fixedNumber._value),
            usd: Number(usd._value),
            fixedNumber,
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns market's total borrows
   * @returns {Promise<Object>} total borrows as underlying, usd and fixedNumber
   */
  getMarketTotalBorrows() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.instance.callStatic.totalBorrows(),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([totalBorrowsMantissa, priceMantissa]) => {
          const fixedNumber = FixedNumber.from(totalBorrowsMantissa.toString(), format);
          const underlying = fixedNumber.divUnsafe(factor);
          const usd = fixedNumber
            .mulUnsafe(FixedNumber.from(priceMantissa.toString(), format))
            .divUnsafe(factor).divUnsafe(factor);
          return {
            underlying: Number(underlying._value),
            usd: Number(usd._value),
            fixedNumber,
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getMarketTotalSupply() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.instance.callStatic.totalSupply(),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
        this.instance.callStatic.exchangeRateCurrent(),
      ])
        .then(([totalSupplyMantissa, priceMantissa, exchangeRateMantissa]) => {
          const fixedNumber = FixedNumber.from(totalSupplyMantissa.toString(), format)
            .divUnsafe(factor);
          const exchangeRate = FixedNumber.from(exchangeRateMantissa.toString(), format)
            .divUnsafe(factor);
          const underlying = fixedNumber.mulUnsafe(exchangeRate);
          const usd = underlying
            .mulUnsafe(FixedNumber.from(priceMantissa.toString(), format))
            .divUnsafe(factor);
          return {
            underlying: Number(underlying._value),
            usd: Number(usd._value),
            fixedNumber: underlying,
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  getEarnings(account) {
    return new Promise(((resolve, reject) => {
      Promise.all([
        this.instance.callStatic
          .getSupplierSnapshotStored(account.address),
        this.instance.connect(account.signer).callStatic
          .balanceOfUnderlying(account.address),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([snapshotM, balanceM, price]) => {
          let earnings = balanceM.sub(snapshotM.underlyingAmount);
          earnings = Number(earnings) / 1e18 <= 0 ? 0 : earnings;
          const underlyingUSD = (price.mul(snapshotM.underlyingAmount))
            .div(BigNumber.from(1e18.toString()));
          const earningsUSD = (earnings.mul(price))
            .div(BigNumber.from(1e18.toString()));
          return {
            underlying: Number(snapshotM.underlyingAmount) / 1e18,
            underlyingUSD: Number(underlyingUSD) / 1e18,
            earnings: Number(earnings) / 1e18,
            earningsUSD: Number(earningsUSD) / 1e18,
          };
        })
        .then(resolve)
        .catch(reject);
    }));
  }

  getSupplierSnapshot(accountAddress) {
    return new Promise((resolve, reject) => this
      .instance.callStatic
      .getSupplierSnapshotStored(accountAddress)
      .then(resolve)
      .catch(reject));
  }

  isHurricane() {
    return new Promise((resolve, reject) => {
      this.instance.interestRateModel()
        .then((modelAddress) => {
          const model = new ethers.Contract(modelAddress,
            interestRateModelArtifact.abi, this.tropykus.provider);
          return model.isTropykusInterestRateModel();
        })
        .then(resolve)
        .catch(reject);
    });
  }

  maxAllowedToWithdraw(account, markets) {
    return new Promise((resolve, reject) => {
      this.getComptroller()
        .then((comptrollerAddress) => new Comptroller(comptrollerAddress, this.tropykus))
        .then((comptroller) => Promise.all([
          comptroller.getTotalBorrowsInAllMarkets(account, markets, this.address),
          comptroller.getTotalSupplyInAllMarkets(account, markets, this.address),
          this.tropykus.priceOracle.instance.callStatic.getUnderlyingPrice(this.address),
          comptroller.instance.callStatic.markets(this.address),
          this.instance.connect(account.signer).callStatic.balanceOfUnderlying(account.address),
          this.instance.connect(account.signer).callStatic.exchangeRateCurrent(),
          this.getCash(),
          this.instance.connect(account.signer).callStatic.balanceOf(account.address),
        ]))
        .then(([
          totalBorrows,
          totalSupply,
          priceMantissa,
          marketData,
          supplyBalanceMantissa,
          exchangeRateMantissa,
          cash,
          tokensMantissa,
        ]) => {
          if (Number(totalSupply.fixedNumber._value) <= 0) {
            return {
              usd: 0,
              underlying: 0,
              fixedNumber: zero,
              tokens: { value: 0, fixedNumber: zero },
            };
          }
          const supplyBalance = FixedNumber
            .from(supplyBalanceMantissa.toString(), format)
            .divUnsafe(factor);
          const price = FixedNumber.from(priceMantissa.toString(), format)
            .divUnsafe(factor);
          const exchangeRate = FixedNumber.from(exchangeRateMantissa, format)
            .divUnsafe(factor);
          const marketDepositUSD = FixedNumber
            .from(supplyBalanceMantissa.toString(), format).mulUnsafe(price)
            .divUnsafe(factor);
          let tokens = cash.fixedNumber.divUnsafe(exchangeRate);
          if (Number(cash.fixedNumber._value) < Number(supplyBalance._value)) {
            return {
              usd: cash.usd,
              underlying: cash.underlying,
              fixedNumber: cash.fixedNumber,
              tokens: {
                value: Number(tokens._value),
                fixedNumber: tokens,
              },
            };
          }
          tokens = FixedNumber.from(tokensMantissa.toString(), format)
            .divUnsafe(factor);
          if (Number(totalBorrows.fixedNumber._value) <= 0) {
            return {
              usd: Number(marketDepositUSD._value),
              underlying: Number(supplyBalance._value),
              fixedNumber: supplyBalance,
              tokens: {
                value: Number(tokens._value),
                fixedNumber: tokens,
              },
            };
          }
          const collateralFactor = FixedNumber
            .from(marketData.collateralFactorMantissa.toString(), format)
            .divUnsafe(factor);
          if (Number(collateralFactor._value) <= 0) {
            return {
              usd: Number(marketDepositUSD._value),
              underlying: Number(supplyBalance._value),
              fixedNumber: supplyBalance,
              tokens: {
                value: Number(tokens._value),
                fixedNumber: tokens,
              },
            };
          }
          const marketLiquidity = marketDepositUSD.mulUnsafe(collateralFactor);
          const liquidity = totalSupply.withCollateral.subUnsafe(marketLiquidity);
          const totalDebtPlusDelta = totalBorrows.fixedNumber
            .addUnsafe(minLiquidity);
          let fixedNumber = marketDepositUSD.subUnsafe((totalDebtPlusDelta.subUnsafe(liquidity))
            .divUnsafe(collateralFactor));
          const diff = fixedNumber.subUnsafe(marketDepositUSD);
          if (Number(diff._value) >= 0) fixedNumber = marketDepositUSD;
          const underlying = fixedNumber.divUnsafe(price);
          const calculatedTokens = underlying.divUnsafe(exchangeRate);
          const supplyMinusUnderlying = supplyBalance.subUnsafe(underlying);
          if (supplyMinusUnderlying._value
            .localeCompare('0.00000000000000005', undefined, { numeric: true }) < 0) {
            return {
              usd: Number(marketDepositUSD._value),
              underlying: Number(supplyBalance._value),
              fixedNumber: supplyBalance,
              tokens: {
                value: Number(tokens._value),
                fixedNumber: tokens,
              },
            };
          }
          return {
            underlying: Number(underlying._value),
            usd: Number(fixedNumber._value),
            fixedNumber,
            tokens: {
              value: Number(calculatedTokens._value),
              fixedNumber: calculatedTokens,
            },
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  maxAllowedToDeposit(account) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.balanceOfUnderlyingInWallet(account),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([balance, priceMantissa]) => {
          const underlying = balance.underlying.fixedNumber;
          const usd = underlying.mulUnsafe(FixedNumber.from(priceMantissa.toString(), format))
            .divUnsafe(factor);
          return {
            underlying: {
              value: Number(underlying.value),
              fixedNumber: underlying,
            },
            usd: {
              value: Number(usd.value),
              fixedNumber: usd,
            },
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  // maxAllowedToBorrow(account) {
  //   return new Promise((resolve, reject) => {
  //     Promise.all([
  //       this.tropykus.comptroller.getAccountLiquidity(account, this.address),
  //       this.getCash(),
  //     ])
  //       .then(([liquidity, cash]) => {
  //         console.log('liquidity', liquidity.underlying.fixedNumber._value);
  //         console.log('cash', cash.fixedNumber._value);
  //         if (Number(cash.fixedNumber._value) === 0) {
  //           return {
  //             underlying: 0,
  //             usd: 0,
  //             fixedNumber: zero,
  //           };
  //         }
  //         if (Number(liquidity.underlying.fixedNumber._value) > Number(cash
  //           .fixedNumber._value)) return cash;
  //         return liquidity;
  //       })
  //       .then(resolve)
  //       .catch(reject);
  //   });
  // }

  getTokensFromUnderlying(account, amount) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        .callStatic.exchangeRateCurrent()
        .then((exchangeRateMantissa) => {
          const amountAsFixedNumber = FixedNumber
            .from(ethers.utils.parseEther(amount.toString()), format)
            .divUnsafe(factor);
          const exchangeRate = FixedNumber.from(exchangeRateMantissa.toString(), format)
            .divUnsafe(factor);
          const fixedNumber = amountAsFixedNumber.divUnsafe(exchangeRate);
          return {
            value: Number(fixedNumber._value),
            fixedNumber,
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  suppliedLast24Hours() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.wsInstance.queryFilter('Mint', -2880),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([supplyEvents, price]) => {
          let supplied = FixedNumber.from(ethers.utils.parseEther('0'), format);
          supplyEvents.forEach((supplyEvent) => {
            supplied = supplied
              .addUnsafe(FixedNumber.from(supplyEvent.args.mintAmount.toString(), format));
          });
          supplied = supplied.divUnsafe(factor);

          let suppliedInUsd = supplied.mulUnsafe(FixedNumber.from(price.toString(), format))
            .divUnsafe(factor);
          supplied = Number(supplied._value);
          suppliedInUsd = Number(suppliedInUsd._value);
          return { supplied, suppliedInUsd };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  borrowedLast24Hours() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.wsInstance.queryFilter('Borrow', -2880),
        this.tropykus.priceOracle.instance.callStatic
          .getUnderlyingPrice(this.address),
      ])
        .then(([borrowEvents, price]) => {
          let borrowed = FixedNumber.from(ethers.utils.parseEther('0'), format);
          borrowEvents.forEach((borrowEvent) => {
            borrowed = borrowed
              .addUnsafe(FixedNumber.from(borrowEvent.args.borrowAmount.toString(), format));
          });
          borrowed = borrowed.divUnsafe(factor);

          let borrowedInUsd = borrowed
            .mulUnsafe(FixedNumber.from(price.toString(), format))
            .divUnsafe(factor);
          borrowed = Number(borrowed._value);
          borrowedInUsd = Number(borrowedInUsd._value);
          return { borrowed, borrowedInUsd };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  static min(aFixedNumber, bFixedNumber) {
    const a = aFixedNumber.mulUnsafe(factor);
    const b = bFixedNumber.mulUnsafe(factor);
    if (a._value
      .localeCompare(b._value, undefined, { numeric: true }) < 0) {
      return aFixedNumber;
    }
    return bFixedNumber;
  }
}
