import { ethers, Wallet } from 'ethers';
import Comptroller from './Comptroller';
import CRBTC from './Markets/CRBTC';
import CRDOC from './Markets/CRDOC';
import CToken from './Markets/CToken';

export default class Tropykus {
  constructor(providerURL, gasLimit) {
    this.ethersProvider = new ethers.providers.JsonRpcProvider(providerURL);
    this.internalAccount = null;
    this.internalComptroller = null;
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
      const marketFactory = new ethers.ContractFactory(artifact);
      if (artifact === 'CRBTC') {
        marketDeployed = await marketFactory.deploy(
          args.comptrollerAddress,
          args.interestRateModelAddress,
          ethers.utils.parseEther(args.initialExchangeRate.toString()),
          args.name,
          args.symbol,
          args.decimals,
          this.account.address,
        );
      } else {
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
   */
  setComptroller(comptrollerAddress) {
    this.internalComptroller = new Comptroller(comptrollerAddress, this);
  }
}
