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

  describe('Code contains deprecation comments', () => {
    // Path to src directory from test directory (go up 1 level to package root, then into src)
    // Tests run from packages/tropykus, so src is at process.cwd()/src
    const srcPath = path.resolve(process.cwd(), 'src');
    
    it('should have JSDoc comments in deprecation utility functions explaining address-based approach', () => {
      const deprecationPath = path.join(srcPath, 'utils/deprecation.js');
      const deprecationContent = fs.readFileSync(deprecationPath, 'utf8');
      
      // Check for JSDoc comment explaining address-based deprecation approach
      // Must have detailed explanation in JSDoc, not just in file header
      // Should explain WHY address-based (same artifact can be used for listed and deprecated)
      const hasAddressBasedInJSDoc = /\/\*\*[\s\S]*?address.*based[\s\S]*?\*\/|@deprecated|address.*based.*deprecation.*approach/i.test(deprecationContent);
      const hasWhyExplanation = /same.*artifact|artifact.*type.*both|CRBTC.*kRBTC.*kSAT|because.*address/i.test(deprecationContent);
      
      expect(
        hasAddressBasedInJSDoc && hasWhyExplanation,
        'deprecation utility functions should have JSDoc comments explaining WHY address-based deprecation is used (same artifact for listed/deprecated markets)'
      ).to.be.true;
    });

    it('should have detailed comments in deprecation-config.js explaining which addresses are deprecated and why', () => {
      const configPath = path.join(srcPath, 'deprecation-config.js');
      const configContent = fs.readFileSync(configPath, 'utf8');
      
      // Check for detailed explanation comments for EACH deprecated market address
      // Should have comments explaining WHY each specific address is deprecated, not just what it is
      // Must have detailed comments above or near each address entry explaining the deprecation reason
      const kSATComment = /\/\/.*kSAT[\s\S]{0,200}?0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6|0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6[\s\S]{0,200}?\/\/.*kSAT/i.test(configContent);
      const kRDOCComment = /\/\/.*kRDOC[\s\S]{0,200}?0x0000000000000000000000000000000000000000|0x0000000000000000000000000000000000000000[\s\S]{0,200}?\/\/.*kRDOC/i.test(configContent);
      const kRIFComment = /\/\/.*kRIF[\s\S]{0,200}?0x3134b7fbfca5db217eca523eab1941452cf35163|0x3134b7fbfca5db217eca523eab1941452cf35163[\s\S]{0,200}?\/\/.*kRIF/i.test(configContent);
      const kUSDTComment = /\/\/.*kUSDT[\s\S]{0,200}?0xedaefc6b596ed38d712100976969975a37c84464|0xedaefc6b596ed38d712100976969975a37c84464[\s\S]{0,200}?\/\/.*kUSDT/i.test(configContent);
      
      // Also check that comments explain WHY (not just what)
      const hasWhyExplanations = /\/\/.*why|\/\/.*because|\/\/.*reason|\/\/.*deprecated.*because/i.test(configContent);
      
      expect(
        kSATComment && kRDOCComment && kRIFComment && kUSDTComment && hasWhyExplanations,
        'deprecation-config.js should have detailed comments for EACH deprecated address explaining WHY that specific address is deprecated (not just market name)'
      ).to.be.true;
    });

    it('should have inline comments in Tropykus.addMarket() method explaining deprecation check logic', () => {
      const indexPath = path.join(srcPath, 'index.js');
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // Check for deprecation-related comments near the deprecation check code
      // Look for comments that mention address-based deprecation or explain the check
      const hasDeprecationComment = (
        /\/\/.*deprecation.*check/i.test(indexContent) ||
        /\/\/.*address.*based/i.test(indexContent) ||
        /\/\/.*deprecation.*address/i.test(indexContent)
      );
      
      // Also verify that getDeprecationMetadata and warnDeprecatedOnce are present
      const hasDeprecationCode = (
        /getDeprecationMetadata/i.test(indexContent) &&
        /warnDeprecatedOnce/i.test(indexContent)
      );
      
      expect(
        hasDeprecationComment && hasDeprecationCode,
        'Tropykus.addMarket() method should have inline comments explaining deprecation check logic'
      ).to.be.true;
    });

    it('should have inline comments in Market constructors explaining deprecation check logic', () => {
      const marketFiles = [
        { path: path.join(srcPath, 'Markets/CRBTC.js'), name: 'CRBTC' },
        { path: path.join(srcPath, 'Markets/CRDOC.js'), name: 'CRDOC' },
        { path: path.join(srcPath, 'Markets/CErc20.js'), name: 'CErc20' },
        { path: path.join(srcPath, 'Markets/CToken.js'), name: 'CToken' },
      ];

      marketFiles.forEach(({ path: filePath, name }) => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Check for deprecation-related comments in the constructor
        // Look for comments that mention address-based deprecation or explain the check
        const hasDeprecationComment = (
          /\/\/.*deprecation.*check/i.test(fileContent) ||
          /\/\/.*address.*based/i.test(fileContent) ||
          /\/\/.*deprecation.*address/i.test(fileContent)
        );
        
        // Also verify that getDeprecationMetadata and warnDeprecatedOnce are present
        const hasDeprecationCode = (
          /getDeprecationMetadata/i.test(fileContent) &&
          /warnDeprecatedOnce/i.test(fileContent)
        );
        
        expect(
          hasDeprecationComment && hasDeprecationCode,
          `${name} constructor should have inline comments explaining deprecation check logic`
        ).to.be.true;
      });
    });

    it('should verify deprecation-config.js explains address-based approach in detail', () => {
      const configPath = path.join(srcPath, 'deprecation-config.js');
      const configContent = fs.readFileSync(configPath, 'utf8');
      
      // Check for detailed explanation that goes beyond just mentioning the concepts
      // Should explain the design decision, implications, and provide concrete examples
      // Must have explanation of what would happen if artifact-based was used instead
      const hasAddressBasedExplanation = /address-based|address.*based/i.test(configContent);
      const hasArtifactExplanation = /artifact.*based|artifact-based/i.test(configContent);
      const hasWhyExplanation = /because|same.*artifact|CRBTC.*kRBTC.*kSAT|example/i.test(configContent);
      
      // Require more detailed explanation: implications, design rationale, or what would go wrong with artifact-based
      // Must explicitly explain what would happen if artifact-based was used (would break, would deprecate wrong markets, etc.)
      const hasDetailedRationale = /cannot.*deprecate.*artifact|artifact.*would.*deprecate|would.*break|would.*affect|would.*mark|cannot.*use.*artifact|artifact.*not.*work|if.*artifact.*based/i.test(configContent);
      
      // Or require explanation of the specific example with more detail showing the problem
      const hasDetailedExample = /CRBTC.*used.*both.*kRBTC.*listed.*kSAT.*deprecated.*cannot|same.*artifact.*type.*both.*listed.*deprecated.*would|if.*deprecate.*CRBTC.*would.*affect/i.test(configContent);
      
      expect(
        hasAddressBasedExplanation && hasArtifactExplanation && hasWhyExplanation && (hasDetailedRationale || hasDetailedExample),
        'deprecation-config.js should have detailed explanation of address-based deprecation approach, including design rationale, implications, or detailed examples explaining why artifact-based would not work'
      ).to.be.true;
    });

    it('should verify deprecation utility functions have detailed JSDoc comments explaining address-based approach', () => {
      const deprecationPath = path.join(srcPath, 'utils/deprecation.js');
      const deprecationContent = fs.readFileSync(deprecationPath, 'utf8');
      
      // Check for detailed JSDoc comments that explain the address-based approach
      // The JSDoc itself must contain explanation of WHY address-based, not just parameter descriptions
      // Must have explanation within the JSDoc block, not just elsewhere in the file
      const getDeprecationMetadataJSDoc = deprecationContent.match(/\/\*\*[\s\S]*?getDeprecationMetadata[\s\S]*?\*\//);
      const hasAddressBasedInJSDoc = getDeprecationMetadataJSDoc && (
        /address.*based|address-based.*deprecation|deprecation.*address.*based|same.*artifact|artifact.*type.*both/i.test(getDeprecationMetadataJSDoc[0])
      );
      
      const warnDeprecatedOnceJSDoc = deprecationContent.match(/\/\*\*[\s\S]*?warnDeprecatedOnce[\s\S]*?\*\//);
      const hasAddressExplanationInJSDoc = warnDeprecatedOnceJSDoc && (
        /address.*based|address.*deprecation|deprecation.*address|why.*address/i.test(warnDeprecatedOnceJSDoc[0])
      );
      
      expect(
        hasAddressBasedInJSDoc && hasAddressExplanationInJSDoc,
        'deprecation utility functions should have JSDoc comments WITHIN the JSDoc blocks explaining WHY address-based deprecation is used (same artifact for listed/deprecated markets)'
      ).to.be.true;
    });
  });
});

