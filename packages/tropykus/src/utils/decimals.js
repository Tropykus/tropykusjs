import { ethers } from 'ethers';

// Cache for token decimals per contract instance
const decimalsCache = new WeakMap();

/**
 * Gets the decimal amount for an ERC20 token, with caching
 * @param {ethers.Contract} erc20Instance - The ERC20 token contract instance
 * @returns {Promise<number>} The decimal amount (0-255, typically 0-18)
 */
export async function getTokenDecimals(erc20Instance) {
  // Check cache first
  if (decimalsCache.has(erc20Instance)) {
    return decimalsCache.get(erc20Instance);
  }

  try {
    // Call decimals() via callStatic (view function, no gas cost)
    const decimals = await erc20Instance.callStatic.decimals();

    // Validate decimal value (ERC20 standard allows 0-255, but practical max is 18)
    const decimalValue = typeof decimals === 'object' && decimals.toNumber
      ? decimals.toNumber()
      : Number(decimals);

    // Validate range
    if (decimalValue < 0 || decimalValue > 255) {
      console.warn(
        `Token at ${erc20Instance.address} returned invalid decimal value: ${decimalValue}. Defaulting to 18.`,
      );
      decimalsCache.set(erc20Instance, 18);
      return 18;
    }

    // Cache and return
    decimalsCache.set(erc20Instance, decimalValue);
    return decimalValue;
  } catch (error) {
    // Fallback to 18 if decimals() is not implemented or fails
    console.warn(
      `Token at ${erc20Instance.address} does not implement decimals() or call failed: ${error.message}. Defaulting to 18.`,
    );
    decimalsCache.set(erc20Instance, 18);
    return 18;
  }
}

/**
 * Parses human-readable token amount to contract format
 * @param {string|number} amount - Human-readable amount (e.g., "1.5")
 * @param {number} decimals - Decimal precision for the token
 * @returns {ethers.BigNumber} Amount in contract format
 */
export function parseTokenAmount(amount, decimals) {
  if (decimals < 0 || decimals > 255) {
    throw new Error(`Invalid decimal value: ${decimals}. Must be between 0 and 255.`);
  }

  return ethers.utils.parseUnits(amount.toString(), decimals);
}

/**
 * Formats contract format amount to human-readable
 * @param {ethers.BigNumber|string} amount - Amount in contract format
 * @param {number} decimals - Decimal precision for the token
 * @returns {string} Human-readable amount (e.g., "1.5")
 */
export function formatTokenAmount(amount, decimals) {
  if (decimals < 0 || decimals > 255) {
    throw new Error(`Invalid decimal value: ${decimals}. Must be between 0 and 255.`);
  }

  const bigNumber = ethers.BigNumber.from(amount);
  return ethers.utils.formatUnits(bigNumber, decimals);
}

