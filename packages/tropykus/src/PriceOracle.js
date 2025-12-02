import { ethers, BigNumber } from 'ethers';
import PriceOracleProxyArtifact from '../artifacts/PriceOracleProxy.json';
import PriceOracleAdapterUSDTArtifact from '../artifacts/PriceOracleAdapterUSDT.json';
import PriceOracleAdapterMocArtifact from '../artifacts/PriceOracleAdapterMoc.json';

/**
 * PriceOracle class for interacting with PriceOracleProxy contract
 * and detecting oracle adapter decimal precision.
 */
export default class PriceOracle {
  /**
   * Construct a new PriceOracle instance
   * @param {string} priceOracleAddress - Address of the deployed PriceOracleProxy contract
   * @param {object} tropykus - Tropykus protocol instance
   */
  constructor(priceOracleAddress, tropykus) {
    this.tropykus = tropykus;
    this.address = priceOracleAddress.toLowerCase();
    this.instance = new ethers.Contract(
      priceOracleAddress,
      PriceOracleProxyArtifact.abi,
      tropykus.provider,
    );

    // Initialize adapterDecimalsMap to cache adapter decimal precision
    // Key: adapter address (lowercase), Value: decimal precision (18 or 30)
    this.adapterDecimalsMap = new Map();
  }

  /**
   * Detects the decimal precision returned by assetPrices() for an oracle adapter
   * @param {string} adapterAddress - The oracle adapter contract address
   * @returns {Promise<number>} The decimal precision (18 for Moc returning 1e18, 30 for USDT returning 1e30, 18 default)
   */
  async detectOracleDecimals(adapterAddress) {
    // Handle null/undefined adapterAddress
    if (!adapterAddress) {
      console.warn(
        '[PriceOracle] Invalid adapterAddress provided, falling back to 18 decimals',
      );
      return 18;
    }

    // Check cache first
    const normalizedAddress = adapterAddress.toLowerCase();
    if (this.adapterDecimalsMap.has(normalizedAddress)) {
      return this.adapterDecimalsMap.get(normalizedAddress);
    }

    try {
      // Create adapter contract instance to query DECIMAL_MULTIPLIER
      const adapterContract = new ethers.Contract(
        adapterAddress,
        PriceOracleAdapterUSDTArtifact.abi, // Use USDT ABI to check for DECIMAL_MULTIPLIER
        this.tropykus.provider,
      );

      // Try to query DECIMAL_MULTIPLIER
      // If it exists and equals 1e22, this is a USDT adapter (returns 1e30)
      // If it doesn't exist, this is a MoC adapter (returns 1e18)
      const decimalMultiplier = await adapterContract.callStatic.DECIMAL_MULTIPLIER();

      // Check if DECIMAL_MULTIPLIER equals 1e22 (USDT adapter)
      const expectedMultiplier = BigNumber.from('10000000000000000000000'); // 1e22
      if (BigNumber.from(decimalMultiplier).eq(expectedMultiplier)) {
        // USDT adapter: assetPrices() returns 1e30 (8-decimal oracle * 1e22)
        this.adapterDecimalsMap.set(normalizedAddress, 30);
        return 30;
      }

      // Unexpected DECIMAL_MULTIPLIER value, fallback to 18
      console.warn(
        `[PriceOracle] Unexpected DECIMAL_MULTIPLIER value: ${decimalMultiplier}, falling back to 18 decimals`,
      );
      this.adapterDecimalsMap.set(normalizedAddress, 18);
      return 18;
    } catch (error) {
      // DECIMAL_MULTIPLIER doesn't exist (MoC adapter) or query failed
      // MoC adapter: assetPrices() returns 1e18 (matching onchain provider)
      // Note: In tests, this catch block handles MoC adapters (no DECIMAL_MULTIPLIER)
      // and any other errors during detection
      this.adapterDecimalsMap.set(normalizedAddress, 18);
      return 18;
    }
  }

  /**
   * Sets an adapter to the given market address
   * @param {object} account Object get from tropykus.getAccount()
   * @param {string} marketAddress address of the market
   * @param {string} adapterMarketAddress address of the market adapter
   * @returns {Promise<unknown>}
   */
  async setAdapterToToken(account, marketAddress, adapterMarketAddress) {
    // Set the adapter on the contract
    const tx = await this.instance.connect(account.signer)
      .setAdapterToToken(marketAddress, adapterMarketAddress);
    
    // Detect and cache oracle decimals for the adapter
    await this.detectOracleDecimals(adapterMarketAddress);
    
    return tx;
  }

  /**
   * Returns the market's price
   * @param {string} marketAddress address of the market
   * @returns {Promise<number>} The price in human-readable format (e.g., 1.0 for $1)
   */
  async getUnderlyingPrice(marketAddress) {
    // Get the adapter address for this market
    const adapterAddress = await this.instance.callStatic.tokenAdapter(marketAddress);
    
    // Detect oracle decimals (18 for MoC, 30 for USDT, default 18)
    const oracleDecimals = await this.detectOracleDecimals(adapterAddress);
    
    // Get the raw price from the contract
    // The contract calls the adapter's assetPrices() which returns:
    // - 1e18 for MoC adapter
    // - 1e30 for USDT adapter
    const rawPrice = await this.instance.callStatic.getUnderlyingPrice(marketAddress);
    
    // Divide by the correct factor based on adapter type to get human-readable price
    // MoC: divide by 1e18, USDT: divide by 1e30
    const divisor = BigNumber.from(10).pow(oracleDecimals);
    const price = BigNumber.from(rawPrice).div(divisor);
    
    return Number(price.toString());
  }
}

