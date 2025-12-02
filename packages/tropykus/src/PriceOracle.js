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
}

