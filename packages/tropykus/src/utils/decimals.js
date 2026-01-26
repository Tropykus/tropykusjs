import { BigNumber, ethers } from 'ethers';

/**
 * Gets the decimal precision for an ERC20 token by calling the decimals() function
 * on the token contract. Falls back to 18 decimals if the call fails or if the
 * token contract doesn't implement the decimals() function.
 *
 * @param {object} erc20Instance - The ERC20 token contract instance (ethers.Contract)
 * @returns {Promise<number>} The decimal precision (0-255, defaults to 18)
 *
 * @example
 * const decimals = await getTokenDecimals(erc20Instance);
 * // Returns: 18 for standard tokens, 6 for USDT/USDC, 8 for WBTC, etc.
 */
export async function getTokenDecimals(erc20Instance) {
  // Handle null/undefined erc20Instance
  if (!erc20Instance || !erc20Instance.callStatic) {
    console.warn(
      '[decimals] Invalid erc20Instance provided, falling back to 18 decimals',
    );
    return 18;
  }

  try {
    // Call the decimals() function on the token contract
    const decimals = await erc20Instance.callStatic.decimals();

    // Handle BigNumber or string return values
    const decimalsNumber = BigNumber.isBigNumber(decimals)
      ? decimals.toNumber()
      : parseInt(decimals, 10);

    // Validate the result is a valid number
    if (Number.isNaN(decimalsNumber) || decimalsNumber < 0 || decimalsNumber > 255) {
      console.warn(
        `[decimals] Invalid decimals value: ${decimals}, falling back to 18 decimals`,
      );
      return 18;
    }

    return decimalsNumber;
  } catch (error) {
    // If decimals() function is not implemented or call fails, fallback to 18
    console.warn(
      `[decimals] Failed to get token decimals() from contract: ${error.message}. fallback to 18 decimals`,
    );
    return 18;
  }
}

/**
 * Parses a human-readable token amount into contract format (BigNumber)
 * using the specified decimal precision.
 *
 * @param {string|number} amount - The human-readable amount (e.g., "1.5" or 1.5)
 * @param {number} decimals - The decimal precision (0-255)
 * @returns {BigNumber} The amount in contract format
 *
 * @example
 * const contractAmount = parseTokenAmount("1.5", 6);
 * // Returns: BigNumber(1500000) for 6-decimal tokens (USDT/USDC)
 *
 * @example
 * const contractAmount = parseTokenAmount("1.0", 18);
 * // Returns: BigNumber(1000000000000000000) for 18-decimal tokens
 */
export function parseTokenAmount(amount, decimals) {
  return ethers.utils.parseUnits(amount.toString(), decimals);
}

/**
 * Formats a contract format amount (BigNumber) into human-readable format
 * using the specified decimal precision.
 *
 * @param {BigNumber|string} amount - The amount in contract format
 * @param {number} decimals - The decimal precision (0-255)
 * @returns {string} The human-readable amount (e.g., "1.5")
 *
 * @example
 * const humanAmount = formatTokenAmount(BigNumber.from("1500000"), 6);
 * // Returns: "1.5" for 6-decimal tokens (USDT/USDC)
 *
 * @example
 * const humanAmount = formatTokenAmount(BigNumber.from("1000000000000000000"), 18);
 * // Returns: "1.0" for 18-decimal tokens
 */
export function formatTokenAmount(amount, decimals) {
  // Convert string to BigNumber if needed
  const bigNumberAmount = BigNumber.isBigNumber(amount)
    ? amount
    : BigNumber.from(amount.toString());

  return ethers.utils.formatUnits(bigNumberAmount, decimals);
}

