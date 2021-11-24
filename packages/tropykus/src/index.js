import { ethers, Wallet } from 'ethers';
import Comptroller from './Comptroller';
import PriceOracle from './PriceOracle';
import CRBTC from './Markets/CRBTC';
import CRDOC from './Markets/CRDOC';
import CToken from './Markets/CToken';
import ComptrollerArtifact from '../artifacts/ComptrollerG6.json';
import UnitrollerArtifact from '../artifacts/Unitroller.json';
import CRBTCArtifact from '../artifacts/CRBTC.json';
import CRDOCArtifact from '../artifacts/CRDOC.json';
import CErc20Artifact from '../artifacts/CErc20Immutable.json';
import Unitroller from './Unitroller';

export default class Tropykus {
  constructor(providerURL, gasLimit) {
    this.ethersProvider = new ethers.providers.JsonRpcProvider(providerURL);
    this.internalAccount = null;
    this.internalComptroller = null;
    this.internalPriceOracle = null;
    this.currentGasLimit = gasLimit;
    this.markets = [];
  }

  /**
   * Returns the initialized account instance.
   * @return {Object}
   */
  get account() { return this.internalAccount; }

  /**
   * By providing the mnemonic, a wallet instance is made available.
   * @param {string} mnemonic to generate the wallet.
   * @param derivationPath
   */
  setAccount(mnemonic, derivationPath) {
    this.internalAccount = Wallet
      .fromMnemonic(mnemonic, derivationPath).connect(this.ethersProvider);
  }

  get gasLimit() { return this.currentGasLimit; }

  /**
   * Returns the initialized comptroller instance.
   * @return {Comptroller}
   */
  get comptroller() { return this.internalComptroller; }

  /**
   * Returns the initialized priceOracle instance.
   * @returns {PriceOracle}
   */
  get priceOracle() { return this.internalPriceOracle; }

  /**
   * By providing the contract address and if it is a cRBTC market,
   * a Market instance is made available.
   * @param artifact
   * @param deployed
   * @param marketAddress on chain deployed market address.
   * @param erc20TokenAddress
   * @param args
   */
  async addMarket(
    artifact,
    deployed = true,
    marketAddress = null,
    erc20TokenAddress = null,
    args = {
      comptrollerAddress: '',
      interestRateModelAddress: '',
      initialExchangeRate: 0.02,
      name: '',
      symbol: '',
      decimals: 0,
    },
  ) {
    let market;
    let address = marketAddress;
    if (!deployed) {
      let marketDeployed;
      let marketFactory;
      switch (artifact) {
        case 'CRBTC':
          marketFactory = new ethers
            .ContractFactory(CRBTCArtifact.abi, CRBTCArtifact.bytecode, this.account);
          marketDeployed = await marketFactory.deploy(
            args.comptrollerAddress,
            args.interestRateModelAddress,
            ethers.utils.parseEther(args.initialExchangeRate.toString()),
            args.name,
            args.symbol,
            args.decimals,
            this.account.address,
          );
          break;
        case 'CRDOC':
          marketFactory = new ethers
            .ContractFactory(CRDOCArtifact.abi, CRDOCArtifact.bytecode, this.account);
          break;
        default:
          marketFactory = new ethers
            .ContractFactory(CErc20Artifact.abi, CErc20Artifact.bytecode, this.account);
          break;
      }
      if (artifact !== 'CRBTC') {
        marketDeployed = await marketFactory.deploy(
          erc20TokenAddress,
          args.comptrollerAddress,
          args.interestRateModelAddress,
          ethers.utils.parseEther(args.initialExchangeRate.toString()),
          args.name,
          args.symbol,
          args.decimals,
          this.account.address,
        );
      }
      address = marketDeployed.address;
    }
    switch (artifact) {
      case 'CRDOC':
        market = new CRDOC(this, address, erc20TokenAddress);
        break;
      case 'CRBTC':
        market = new CRBTC(this, address);
        break;
      default:
        market = new CToken(this, address, erc20TokenAddress);
        break;
    }
    this.markets.push(market);
    return market;
  }

  /**
   * By providing the on chain deployed comptroller address,
   * a comptroller instance is made available.
   * @param {string} comptrollerAddress on chain deployed comptroller address.
   * @param {boolean} deployed flag that indicates if is provided a comptroller
   * address of a deployed contract, if false deploys a new Comptroller.
   * @param {object} args
   */
  async setComptroller(
    comptrollerAddress,
    deployed = true,
    args = {
      priceOracleAddress: '',
      closeFactor: 0.5,
      liquidationIncentive: 0.07,
      markets: [],
    },
  ) {
    if (!deployed) {
      const unitrollerFactory = new ethers
        .ContractFactory(
          UnitrollerArtifact.abi,
          UnitrollerArtifact.bytecode,
          this.account,
        );
      const unitrollerDeployed = await unitrollerFactory.deploy();
      const unitroller = new Unitroller(unitrollerDeployed.address, this);
      const comptrollerFactory = new ethers
        .ContractFactory(
          ComptrollerArtifact.abi,
          ComptrollerArtifact.bytecode,
          this.account,
        );
      const comptrollerDeployed = await comptrollerFactory.deploy();
      await unitroller.setPendingImplementation(comptrollerDeployed.address);
      this.internalComptroller = new Comptroller(comptrollerDeployed.address, this);
      await this.internalComptroller.become(unitroller.address);
      await this.internalComptroller.setOracle(args.priceOracleAddress);
      await this.internalComptroller.setCloseFactor(args.closeFactor);
      await this.internalComptroller
        .setLiquidationIncentive(args.liquidationIncentive);
      markets.forEach((marketAddress) => {
        await this.internalComptroller.supportMarket(marketAddress)
      });
    } else {
      this.internalComptroller = new Comptroller(comptrollerAddress, this);
    }
    return this.internalComptroller;
  }

  /**
   * By providing the on chain deployed price oracle address,
   * a price oracle instance is made available.
   * @param {string} priceOracleAddress on chain deployed Price Oracle address.
   */
  setPriceOracle(priceOracleAddress) {
    this.internalPriceOracle = new PriceOracle(priceOracleAddress, this);
  }
}
