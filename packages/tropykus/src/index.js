import { ethers, Wallet } from 'ethers';
import Comptroller from './Comptroller';
import PriceOracle from './PriceOracle';
import CRBTC from './Markets/CRBTC';
import CRDOC from './Markets/CRDOC';
import CToken from './Markets/CToken';
import ComptrollerArtifact from '../artifacts/ComptrollerG6.json';
import CRBTCArtifact from '../artifacts/CRBTC.json';
import CRDOCArtifact from '../artifacts/CRDOC.json';
import CErc20Artifact from '../artifacts/CErc20Immutable.json';
import Unitroller from './Unitroller';

ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

export default class Tropykus {
  /**
   * Construct a new Tropykus instance
   * @param providerURL network url to be connected with
   * @param gasLimit limit of gas to be used in each transaction
   */
  // TODO: fix wsProviderURL = ''
  constructor(providerURL, gasLimit, wsProviderURL = 'ws://127.0.0.1:8545') {
    this.ethersProvider = new ethers.providers.JsonRpcProvider(providerURL);
    this.wsProvider = new ethers.providers.WebSocketProvider(wsProviderURL);
    this.internalComptroller = null;
    this.internalPriceOracle = null;
    this.currentGasLimit = gasLimit;
    this.markets = [];
  }

  /**
   * By providing the mnemonic, a wallet instance is made available.
   * @param {string} mnemonic to generate the wallet.
   * @param derivationPath
   */
  setAccount(mnemonic, derivationPath) {
    return Wallet
      .fromMnemonic(mnemonic, derivationPath).connect(this.ethersProvider);
  }

  /**
   * Returns the set gas limit.
   * @return {Number}
   */
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
   * By providing the contract artifact, its address, its corresponding erc20
   * token address and some additional market information a Market instance
   * is added to the protocol and is made available.
   * @param artifact to use for the contract instantiation
   * @param deployed flag to indicate if the contract is already deployed
   * @param marketAddress on chain deployed market address.
   * @param erc20TokenAddress on chain deployed erc20 token address.
   * @param args additional args to initialize market
   * * Returns the added market instance.
   * @return {Market}
   */
  async addMarket(
    account,
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
            .ContractFactory(CRBTCArtifact.abi, CRBTCArtifact.bytecode, account);
          marketDeployed = await marketFactory.deploy(
            args.comptrollerAddress,
            args.interestRateModelAddress,
            ethers.utils.parseEther(args.initialExchangeRate.toString()),
            args.name,
            args.symbol,
            args.decimals,
            account.address,
          );
          break;
        case 'CRDOC':
          marketFactory = new ethers
            .ContractFactory(CRDOCArtifact.abi, CRDOCArtifact.bytecode, account);
          break;
        default:
          marketFactory = new ethers
            .ContractFactory(CErc20Artifact.abi, CErc20Artifact.bytecode, account);
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
          account.address,
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
   * @param account
   * @param {string} comptrollerAddress on chain deployed comptroller address.
   * @param unitrollerAddress
   * address of a deployed contract, if false deploys a new Comptroller.
   */
  async setComptroller(
    account,
    comptrollerAddress,
    unitrollerAddress = '',
  ) {
    if (!comptrollerAddress) {
      const unitroller = new Unitroller(unitrollerAddress, this);
      const comptrollerFactory = new ethers
        .ContractFactory(
          ComptrollerArtifact.abi,
          ComptrollerArtifact.bytecode,
          account,
        );
      const comptrollerDeployed = await comptrollerFactory.deploy();
      await unitroller.setComptrollerPendingImplementation(account, comptrollerDeployed.address);
      this.internalComptroller = new Comptroller(comptrollerDeployed.address, this);
      await this.internalComptroller.become(account, unitroller.address);
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
