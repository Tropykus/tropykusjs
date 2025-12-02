import { ethers } from 'ethers';
import PriceOracleProxyArtifact from '../artifacts/PriceOracleProxy.json';
import PriceOracleAdapterUSDTArtifact from '../artifacts/PriceOracleAdapterUSDT.json';
import PriceOracleAdapterMocArtifact from '../artifacts/PriceOracleAdapterMoc.json';

export default class PriceOracle {
  constructor(contractAddress, tropykus) {
    this.tropykus = tropykus;
    this.address = contractAddress.toLowerCase();
    this.instance = new ethers.Contract(
      contractAddress,
      PriceOracleProxyArtifact.abi,
      this.tropykus.provider,
    );
    // Initialize adapter decimals map for caching
    this.adapterDecimalsMap = {};
  }

  /**
   * Sets an adapter to the given market address
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} marketAddress address of the market
   * @param {string} adapterMarketAddress address of the market adapter
   * @returns {Promise<unknown>}
   */
  setAdapterToToken(account, marketAddress, adapterMarketAddress) {
    return new Promise((resolve, reject) => {
      this.instance.connect(account.signer)
        .setAdapterToToken(marketAddress, adapterMarketAddress)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Detects the decimal precision for an oracle adapter
   * @param {string} adapterAddress - The oracle adapter contract address
   * @returns {Promise<number>} The decimal precision (8 for USDT, 18 for Moc/default)
   */
  async detectOracleDecimals(adapterAddress) {
    const normalizedAddress = adapterAddress.toLowerCase();

    // Check cache first
    if (this.adapterDecimalsMap[normalizedAddress]) {
      return this.adapterDecimalsMap[normalizedAddress];
    }

    let decimals = 18; // Default to 18 for backward compatibility

    try {
      // Try to detect PriceOracleAdapterUSDT by querying DECIMAL_MULTIPLIER
      const usdtAdapter = new ethers.Contract(
        adapterAddress,
        PriceOracleAdapterUSDTArtifact.abi,
        this.tropykus.provider,
      );

      try {
        // Try to query DECIMAL_MULTIPLIER - if it exists, it's a USDT adapter (8 decimals)
        await usdtAdapter.callStatic.DECIMAL_MULTIPLIER();
        // If DECIMAL_MULTIPLIER exists, it's a PriceOracleAdapterUSDT which uses 8 decimals
        decimals = 8;
      } catch (err) {
        // DECIMAL_MULTIPLIER doesn't exist or query failed, try Moc adapter detection
        try {
          // Try to detect PriceOracleAdapterMoc by checking for priceProviderMoC function
          const mocAdapter = new ethers.Contract(
            adapterAddress,
            PriceOracleAdapterMocArtifact.abi,
            this.tropykus.provider,
          );
          await mocAdapter.callStatic.priceProviderMoC();
          // If priceProviderMoC exists, it's a Moc adapter (18 decimals)
          decimals = 18;
        } catch (mocErr) {
          // Not a Moc adapter either, default to 18
          decimals = 18;
        }
      }
    } catch (err) {
      // Contract creation failed or unknown adapter type, default to 18
      decimals = 18;
    }

    // Cache the result
    this.adapterDecimalsMap[normalizedAddress] = decimals;

    return decimals;
  }

  /**
   * Returns the market's price
   * @param {string} marketAddress address of the market
   * @returns {Promise<unknown>}
   */
  getUnderlyingPrice(marketAddress) {
    return new Promise((resolve, reject) => {
      this.instance.callStatic
        .getUnderlyingPrice(marketAddress)
        .then((p) => Number(p) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }
}
