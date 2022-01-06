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
   * @param {object} provider ethers http provider
   * @param {object} wsProvider ethers websocket provider
   * @param {number} gasLimit limit of gas to be used in each transaction
   */
  constructor(provider, wsProvider, gasLimit) {
    this.provider = provider;
    this.wsProvider = wsProvider;
    this.internalComptroller = null;
    this.internalPriceOracle = null;
    this.currentGasLimit = gasLimit;
    this.markets = [];
  }

  /**
   * Returns Account's signer and address
   * @returns {Promise<Object>} Object with account's signer and address
   */
  getAccount() {
    return new Promise((resolve, reject) => {
      (this.provider.getSigner()).getAddress()
        .then((address) => ({
          signer: this.provider.getSigner(),
          address,
        }))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Returns account given a mnemonic and a derivation path
   * @param {string} mnemonic words
   * @param {string} derivationPath
   * @returns {Object} account
   */
  getAccountFromMnemonic(mnemonic, derivationPath) {
    const account = Wallet
      .fromMnemonic(mnemonic, derivationPath).connect(this.provider);
    return {
      signer: account,
      address: account.address,
    };
  }

  /**
   * Returns the set gas limit.
   * @return {number}
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
   * Returns the added market instance by providing the contract artifact,
   * its address, its corresponding erc20 token address and some additional
   * market information a Market instance
   * is added to the protocol and is made available.
   * @param {object} account Object get from tropykus.getAccount()
   * @param {('CRDOC'|'CErc20Immutable'|'CRBTC')} artifact to use for the contract instantiation
   * @param {string | null} marketAddress on chain deployed market address.
   * @param {string | null} erc20TokenAddress on chain deployed erc20 token address.
   * @param {object} args additional args to initialize market
   * @return {Market<Object>}
   */
  async addMarket(
    account,
    artifact,
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
    if (!marketAddress) {
      let marketDeployed;
      let marketFactory;
      switch (artifact) {
        case 'CRBTC':
          marketFactory = new ethers
            .ContractFactory(CRBTCArtifact.abi, CRBTCArtifact.bytecode, account.signer);
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
            .ContractFactory(CRDOCArtifact.abi, CRDOCArtifact.bytecode, account.signer);
          break;
        default:
          marketFactory = new ethers
            .ContractFactory(CErc20Artifact.abi, CErc20Artifact.bytecode, account.signer);
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
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} comptrollerAddress comptroller address on chain deployed comptroller address.
   * @param {string} [unitrollerAddress=''] unitrollerAddress
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
          account.signer,
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
