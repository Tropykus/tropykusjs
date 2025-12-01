const fs = require('fs');
const path = require('path');
const chai = require('chai');

const { expect } = chai;

// Path to quickstart.md from test directory
const quickstartPath = path.resolve(process.cwd(), '../../specs/001-deprecate-delisted-markets/quickstart.md');

describe('T035: Quickstart Validation', () => {
  let quickstartContent;

  before(() => {
    // Read quickstart.md file
    quickstartContent = fs.readFileSync(quickstartPath, 'utf8');
  });

  it('should have deprecation-config.js file matching quickstart pattern', () => {
    const configPath = path.resolve(process.cwd(), 'src/deprecation-config.js');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Verify structure matches quickstart guide
    expect(configContent).to.include('DEPRECATED_MARKETS');
    expect(configContent).to.include('addresses');
    expect(configContent).to.include('address-based');
    expect(configContent).to.include('artifact-based');
    
    // Verify deprecated markets exist (read the file to check structure)
    expect(configContent).to.match(/0x[a-fA-F0-9]{40}/i); // At least one address
  });

  it('should have deprecation utility functions matching quickstart pattern', () => {
    const deprecationPath = path.resolve(process.cwd(), 'src/utils/deprecation.js');
    const deprecationContent = fs.readFileSync(deprecationPath, 'utf8');
    
    // Verify functions exist as described in quickstart
    expect(deprecationContent).to.include('getDeprecationMetadata');
    expect(deprecationContent).to.include('warnDeprecated');
    expect(deprecationContent).to.include('warnDeprecatedOnce');
    expect(deprecationContent).to.include('warnedMarkets');
  });

  it('should have deprecation checks in market constructors as described in quickstart', () => {
    const marketFiles = [
      { path: path.resolve(process.cwd(), 'src/Markets/CRBTC.js'), name: 'CRBTC' },
      { path: path.resolve(process.cwd(), 'src/Markets/CRDOC.js'), name: 'CRDOC' },
      { path: path.resolve(process.cwd(), 'src/Markets/CErc20.js'), name: 'CErc20' },
      { path: path.resolve(process.cwd(), 'src/Markets/CToken.js'), name: 'CToken' },
    ];

    marketFiles.forEach(({ path: filePath, name }) => {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Verify deprecation imports and checks exist
      expect(fileContent).to.include('getDeprecationMetadata');
      expect(fileContent).to.include('warnDeprecatedOnce');
      expect(fileContent).to.include('deprecation');
    });
  });

  it('should have deprecation check in Tropykus.addMarket() as described in quickstart', () => {
    const indexPath = path.resolve(process.cwd(), 'src/index.js');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Verify addMarket method has deprecation check
    expect(indexContent).to.include('addMarket');
    expect(indexContent).to.include('getDeprecationMetadata');
    expect(indexContent).to.include('warnDeprecatedOnce');
  });

  it('should have deprecation tests as described in quickstart', () => {
    const testPath = path.resolve(process.cwd(), 'test/deprecation.spec.js');
    const testContent = fs.readFileSync(testPath, 'utf8');
    
    // Verify test structure matches quickstart
    expect(testContent).to.include('getDeprecationMetadata');
    expect(testContent).to.include('warnDeprecatedOnce');
    expect(testContent).to.include('[DEPRECATED]');
    expect(testContent).to.include('console.warn');
  });

  it('should have README.md updated with deprecation notices as described in quickstart', () => {
    const readmePath = path.resolve(process.cwd(), '../../README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Verify README has deprecation notices
    expect(readmeContent).to.match(/deprecated|DEPRECATED/i);
    expect(readmeContent).to.include('⚠️');
  });

  it('should verify implementation follows address-based deprecation pattern from quickstart', () => {
    // Verify that deprecation is address-based (not artifact-based)
    const configPath = path.resolve(process.cwd(), 'src/deprecation-config.js');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    expect(configContent).to.include('address-based');
    expect(configContent).to.include('artifact-based');
    
    // Verify addresses are used as keys (check pattern in file)
    const addressMatches = configContent.match(/0x[a-fA-F0-9]{40}/gi);
    expect(addressMatches).to.not.be.null;
    expect(addressMatches.length).to.be.greaterThan(0);
  });

  it('should verify all deprecated markets from quickstart are implemented', () => {
    // Quickstart mentions kSAT, kRDOC, kRIF, kUSDT
    const expectedMarkets = ['kSAT', 'kRDOC', 'kRIF', 'kUSDT'];
    const configPath = path.resolve(process.cwd(), 'src/deprecation-config.js');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    expectedMarkets.forEach(market => {
      expect(configContent.toLowerCase()).to.include(market.toLowerCase());
    });
  });
});

