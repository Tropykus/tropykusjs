# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-12-04

### Added

- Support for 6-decimal ERC20 tokens (USDT0) with dynamic decimal detection
- `detectOracleDecimals` method in PriceOracle class for automatic oracle decimal detection
- Decimal utility functions in `utils/decimals.js` for token and oracle decimal handling
- Comprehensive integration tests for 6-decimal token operations (deposit, borrow, repay, redeem)
- Mock price oracle adapter for USDT0 testing

### Changed

- Refactored Market and CErc20 classes to use dynamic decimal handling instead of hardcoded factors
- Updated `balanceOfUnderlying`, `mint`, `borrow`, `repayBorrow`, and `redeem` methods to support variable token decimals
- Enhanced `getAccountLiquidity`, `getTotalSupplyInAllMarkets`, and `getTotalBorrowsInAllMarkets` in Comptroller for accurate calculations with mixed decimal tokens
- Migrated test suite to use Anvil for forking RSK Mainnet network
- Updated test assertions to use `closeTo` for better precision in liquidity and borrowing calculations
- Improved USD value calculations to handle mixed decimal scenarios (6-decimal tokens with 18-decimal and 30-decimal price oracles)

### Documentation

- Updated README.md to clarify USDT0 (6-decimal) vs deprecated kUSDT (18-decimal rUSDT) distinction
- Enhanced documentation on decimal handling for new token integrations
- Added test execution instructions with Anvil node requirements

### Notes

- **Backward Compatibility**: All existing 18-decimal token operations remain fully functional. The changes are backward compatible.
- **Decimal Detection**: Token and oracle decimals are now automatically detected and cached for improved performance.
- **Test Infrastructure**: Tests now require Anvil node to be running with RSK Mainnet fork. Anvil must be restarted between full test suite runs to ensure clean state.

## [0.3.0] - 2025-01-XX

### Deprecated

- **kSAT/cSAT market**: Market delisted from protocol. The market address `0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6` (mainnet) is now deprecated. This market uses the CRBTC artifact type, which is also used for the active kRBTC market. Use kRBTC market instead.

- **kRDOC/cRDOC market**: Market never listed in the protocol. The market address `0x0000000000000000000000000000000000000000` is deprecated. This market uses the CRDOC artifact type. Use supported markets instead.

- **kRIF market**: Market delisted from protocol. The market address `0x3134b7fbfca5db217eca523eab1941452cf35163` (mainnet) is now deprecated. This market uses the CErc20Immutable artifact type, which is also used for active markets like kDOC. Use kDOC or other supported markets instead.

- **kUSDT market**: Market delisted from protocol. The market address `0xedaefc6b596ed38d712100976969975a37c84464` (mainnet) is now deprecated. This market uses the CErc20Immutable artifact type, which is also used for active markets. Use supported markets instead.

### Added

- Deprecation warning system that displays warnings when deprecated markets are instantiated
- `deprecation-config.js` configuration file for managing deprecated market addresses
- Deprecation utility functions (`getDeprecationMetadata`, `warnDeprecated`, `warnDeprecatedOnce`) in `utils/deprecation.js`
- Address-based deprecation checking (markets are deprecated by contract address, not artifact type)
- Deprecation notices in README.md for all deprecated markets
- Comprehensive test coverage for deprecation warnings and backward compatibility

### Changed

- `Tropykus.addMarket()` now checks for deprecation and displays warnings when deprecated markets are added
- Market constructors (CRBTC, CRDOC, CErc20, CToken) now check for deprecation and display warnings
- README.md updated with deprecation notices for kSAT, kRDOC, kRIF, and kUSDT markets
- README.md network tables now include both testnet and mainnet addresses

### Notes

- **Backward Compatibility**: All deprecated markets remain fully functional. Deprecation warnings are informational only and do not affect market functionality.
- **Address-Based Deprecation**: Markets are deprecated by contract address, not artifact type, because the same artifact type (e.g., CRBTC) can be used for both listed markets (kRBTC) and deprecated markets (kSAT).
- **Warning Display**: Deprecation warnings are displayed once per market instance to avoid warning spam while ensuring developers are informed about deprecated markets.

## [0.2.17] - Previous Release

Previous changelog entries...

