/**
 * Hardhat configuration for TropykusJS testing
 * This provides a local blockchain for running tests
 */

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        auto: true,
        interval: 0
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};
