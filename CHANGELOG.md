# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

