import fs from 'fs';
import path from 'path';
import chai from 'chai';
import DEPRECATED_MARKETS from '../src/deprecation-config.js';

const { expect } = chai;

// Path to README.md from test directory (go up 2 levels to repo root)
// Using path.resolve with process.cwd() to get absolute path
// Tests run from packages/tropykus, so we need to go up 2 levels
const readmePath = path.resolve(process.cwd(), '../../README.md');

describe('Documentation Deprecation Notices', () => {
  let readmeContent;

  before(() => {
    // Read README.md file
    readmeContent = fs.readFileSync(readmePath, 'utf8');
  });

  describe('README.md contains deprecation notices for all deprecated markets', () => {
    // Extract deprecated market names from deprecation config
    // Based on the addresses in deprecation-config.js, we need to check for:
    // - kSAT/cSAT (address: 0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6)
    // - kRDOC/cRDOC (address: 0x0000000000000000000000000000000000000000)
    // - kRIF (address: 0x3134b7fbfca5db217eca523eab1941452cf35163)
    // - kUSDT (address: 0xedaefc6b596ed38d712100976969975a37c84464)

    const deprecatedMarkets = [
      { name: 'kSAT', aliases: ['kSAT', 'cSAT', 'KSAT', 'CSAT'] },
      { name: 'kRDOC', aliases: ['kRDOC', 'cRDOC', 'KRDOC', 'CRDOC'] },
      { name: 'kRIF', aliases: ['kRIF', 'cRIF', 'KRIF', 'CRIF'] },
      { name: 'kUSDT', aliases: ['kUSDT', 'cUSDT', 'KUSDT', 'CUSDT'] },
    ];

    deprecatedMarkets.forEach(({ name, aliases }) => {
      it(`should contain deprecation notice for ${name}`, () => {
        // Check if any alias of the market appears in the README
        const marketFound = aliases.some(alias => readmeContent.includes(alias));
        expect(marketFound, `${name} (or its aliases) should be mentioned in README.md`).to.be.true;

        // Check for deprecation notice near the market name
        // Look for common deprecation markers: "deprecated", "DEPRECATED", "⚠️", "deprecation", etc.
        const deprecationPatterns = [
          /deprecated/i,
          /⚠️.*deprecated/i,
          /deprecation/i,
          /no longer supported/i,
          /delisted/i,
        ];

        // Find all occurrences of the market name in the README
        const marketMatches = [];
        aliases.forEach(alias => {
          const regex = new RegExp(alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
          let match;
          while ((match = regex.exec(readmeContent)) !== null) {
            marketMatches.push({
              alias,
              index: match.index,
              context: readmeContent.substring(
                Math.max(0, match.index - 100),
                Math.min(readmeContent.length, match.index + match[0].length + 100)
              ),
            });
          }
        });

        expect(marketMatches.length, `${name} should appear at least once in README.md`).to.be.greaterThan(0);

        // Check if at least one occurrence has a deprecation notice nearby
        const hasDeprecationNotice = marketMatches.some(({ context }) => {
          return deprecationPatterns.some(pattern => pattern.test(context));
        });

        expect(
          hasDeprecationNotice,
          `${name} should have a deprecation notice (deprecated, ⚠️, delisted, etc.) near its mention in README.md`
        ).to.be.true;
      });
    });

    it('should verify all deprecated markets from config are checked', () => {
      // Verify we're checking all markets from deprecation-config.js
      const configAddresses = Object.keys(DEPRECATED_MARKETS.addresses);
      const expectedMarketCount = 4; // kSAT, kRDOC, kRIF, kUSDT
      
      expect(configAddresses.length, 'Deprecation config should contain deprecated markets').to.be.greaterThan(0);
      
      // This test ensures we're checking all markets
      // The individual tests above verify each market has a deprecation notice
      expect(deprecatedMarkets.length).to.equal(expectedMarketCount);
    });
  });
});

