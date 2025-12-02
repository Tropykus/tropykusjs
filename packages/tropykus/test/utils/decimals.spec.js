import chai from 'chai';
import sinon from 'sinon';
import { ethers } from 'ethers';
import {
  getTokenDecimals,
  parseTokenAmount,
  formatTokenAmount,
} from '../../src/utils/decimals';
import StandardTokenArtifact from '../../artifacts/StandardToken.json';

const { expect } = chai;

describe('Decimal Utilities', () => {
  let provider;
  let mockERC20Contract;
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  });

  afterEach(() => {
    sandbox.restore();
  });

  // Helper function to create a mock contract with callStatic.decimals()
  function createMockContract(address, decimalsValue, shouldReject = false) {
    const mockContract = {
      address,
      callStatic: {
        decimals: shouldReject
          ? sandbox.stub().rejects(new Error('function not found'))
          : sandbox.stub().resolves(decimalsValue),
      },
    };
    return mockContract;
  }

  describe('getTokenDecimals', () => {
    it('should return 6 decimals for a 6-decimal token (USDC/USDT)', async () => {
      mockERC20Contract = createMockContract('0x3AC74a85B80824caa8cc9Dbae0DdcE584F3D3e8E', 6);

      const decimals = await getTokenDecimals(mockERC20Contract);
      expect(decimals).to.equal(6);
    });

    it('should return 8 decimals for an 8-decimal token (WBTC)', async () => {
      mockERC20Contract = createMockContract('0x1234567890123456789012345678901234567890', 8);

      const decimals = await getTokenDecimals(mockERC20Contract);
      expect(decimals).to.equal(8);
    });

    it('should return 18 decimals for a standard 18-decimal token', async () => {
      mockERC20Contract = createMockContract('0x1234567890123456789012345678901234567890', 18);

      const decimals = await getTokenDecimals(mockERC20Contract);
      expect(decimals).to.equal(18);
    });

    it('should cache decimals value on subsequent calls', async () => {
      mockERC20Contract = createMockContract('0x1234567890123456789012345678901234567890', 6);
      const decimalsStub = mockERC20Contract.callStatic.decimals;

      // First call
      const decimals1 = await getTokenDecimals(mockERC20Contract);
      expect(decimals1).to.equal(6);
      expect(decimalsStub.calledOnce).to.be.true;

      // Second call should use cache
      const decimals2 = await getTokenDecimals(mockERC20Contract);
      expect(decimals2).to.equal(6);
      expect(decimalsStub.calledOnce).to.be.true; // Still only called once
    });

    it('should default to 18 decimals if decimals() function throws error', async () => {
      mockERC20Contract = createMockContract('0x1234567890123456789012345678901234567890', null, true);

      const consoleWarnStub = sandbox.stub(console, 'warn');

      const decimals = await getTokenDecimals(mockERC20Contract);
      expect(decimals).to.equal(18);
      expect(consoleWarnStub.called).to.be.true;
    });

    it('should default to 18 decimals if decimals() returns invalid value (>255)', async () => {
      mockERC20Contract = createMockContract('0x1234567890123456789012345678901234567890', 256);

      const consoleWarnStub = sandbox.stub(console, 'warn');

      const decimals = await getTokenDecimals(mockERC20Contract);
      expect(decimals).to.equal(18);
      expect(consoleWarnStub.called).to.be.true;
    });
  });

  describe('parseTokenAmount', () => {
    it('should parse 1.0 token with 6 decimals to 1000000', () => {
      const result = parseTokenAmount('1.0', 6);
      expect(result.toString()).to.equal('1000000');
    });

    it('should parse 1.5 tokens with 6 decimals to 1500000', () => {
      const result = parseTokenAmount('1.5', 6);
      expect(result.toString()).to.equal('1500000');
    });

    it('should parse 10.5 tokens with 6 decimals to 10500000', () => {
      const result = parseTokenAmount('10.5', 6);
      expect(result.toString()).to.equal('10500000');
    });

    it('should parse 0.5 tokens with 8 decimals to 50000000', () => {
      const result = parseTokenAmount('0.5', 8);
      expect(result.toString()).to.equal('50000000');
    });

    it('should parse 1.0 token with 18 decimals to 1000000000000000000', () => {
      const result = parseTokenAmount('1.0', 18);
      expect(result.toString()).to.equal('1000000000000000000');
    });

    it('should parse number input (not just string)', () => {
      const result = parseTokenAmount(1.5, 6);
      expect(result.toString()).to.equal('1500000');
    });

    it('should handle very small amounts with high precision', () => {
      const result = parseTokenAmount('0.000001', 6);
      expect(result.toString()).to.equal('1');
    });
  });

  describe('formatTokenAmount', () => {
    it('should format 1000000 (6 decimals) to "1.0"', () => {
      const amount = ethers.BigNumber.from('1000000');
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('1.0');
    });

    it('should format 1500000 (6 decimals) to "1.5"', () => {
      const amount = ethers.BigNumber.from('1500000');
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('1.5');
    });

    it('should format 10500000 (6 decimals) to "10.5"', () => {
      const amount = ethers.BigNumber.from('10500000');
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('10.5');
    });

    it('should format 50000000 (8 decimals) to "0.5"', () => {
      const amount = ethers.BigNumber.from('50000000');
      const result = formatTokenAmount(amount, 8);
      expect(result).to.equal('0.5');
    });

    it('should format 1000000000000000000 (18 decimals) to "1.0"', () => {
      const amount = ethers.BigNumber.from('1000000000000000000');
      const result = formatTokenAmount(amount, 18);
      expect(result).to.equal('1.0');
    });

    it('should format string input (BigNumber as string)', () => {
      const amount = '1500000';
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('1.5');
    });

    it('should handle amounts with full precision (e.g., 1.123456)', () => {
      const amount = ethers.BigNumber.from('1123456');
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('1.123456');
    });

    it('should handle very small amounts', () => {
      const amount = ethers.BigNumber.from('1');
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('0.000001');
    });
  });
});

