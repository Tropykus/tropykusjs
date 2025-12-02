import chai from 'chai';
import sinon from 'sinon';
import { BigNumber, ethers } from 'ethers';
import {
  getTokenDecimals,
  parseTokenAmount,
  formatTokenAmount,
} from '../../src/utils/decimals';

const { expect } = chai;

describe('decimals utilities', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getTokenDecimals', () => {
    it('should return 18 for a standard 18-decimal token', async () => {
      const mockErc20Instance = {
        callStatic: {
          decimals: sandbox.stub().resolves(18),
        },
      };

      const decimals = await getTokenDecimals(mockErc20Instance);
      expect(decimals).to.equal(18);
      expect(mockErc20Instance.callStatic.decimals.calledOnce).to.be.true;
    });

    it('should return 6 for a 6-decimal token (USDT/USDC)', async () => {
      const mockErc20Instance = {
        callStatic: {
          decimals: sandbox.stub().resolves(6),
        },
      };

      const decimals = await getTokenDecimals(mockErc20Instance);
      expect(decimals).to.equal(6);
      expect(mockErc20Instance.callStatic.decimals.calledOnce).to.be.true;
    });

    it('should return 8 for an 8-decimal token (WBTC)', async () => {
      const mockErc20Instance = {
        callStatic: {
          decimals: sandbox.stub().resolves(8),
        },
      };

      const decimals = await getTokenDecimals(mockErc20Instance);
      expect(decimals).to.equal(8);
      expect(mockErc20Instance.callStatic.decimals.calledOnce).to.be.true;
    });

    it('should return 0 for a 0-decimal token', async () => {
      const mockErc20Instance = {
        callStatic: {
          decimals: sandbox.stub().resolves(0),
        },
      };

      const decimals = await getTokenDecimals(mockErc20Instance);
      expect(decimals).to.equal(0);
    });

    it('should return 2 for a 2-decimal token', async () => {
      const mockErc20Instance = {
        callStatic: {
          decimals: sandbox.stub().resolves(2),
        },
      };

      const decimals = await getTokenDecimals(mockErc20Instance);
      expect(decimals).to.equal(2);
    });

    it('should return 18 as fallback when decimals() call throws an error', async () => {
      const consoleWarnStub = sandbox.stub(console, 'warn');
      const mockErc20Instance = {
        callStatic: {
          decimals: sandbox.stub().rejects(new Error('decimals() not implemented')),
        },
      };

      const decimals = await getTokenDecimals(mockErc20Instance);
      expect(decimals).to.equal(18);
      expect(consoleWarnStub.calledOnce).to.be.true;
      expect(consoleWarnStub.firstCall.args[0]).to.include('decimals()');
      expect(consoleWarnStub.firstCall.args[0]).to.include('fallback');
    });

    it('should return 18 as fallback when callStatic.decimals is undefined', async () => {
      const consoleWarnStub = sandbox.stub(console, 'warn');
      const mockErc20Instance = {
        callStatic: {},
      };

      const decimals = await getTokenDecimals(mockErc20Instance);
      expect(decimals).to.equal(18);
      expect(consoleWarnStub.calledOnce).to.be.true;
    });

    it('should return 18 as fallback when erc20Instance is null', async () => {
      const consoleWarnStub = sandbox.stub(console, 'warn');
      const decimals = await getTokenDecimals(null);
      expect(decimals).to.equal(18);
      expect(consoleWarnStub.calledOnce).to.be.true;
    });

    it('should return 18 as fallback when erc20Instance is undefined', async () => {
      const consoleWarnStub = sandbox.stub(console, 'warn');
      const decimals = await getTokenDecimals(undefined);
      expect(decimals).to.equal(18);
      expect(consoleWarnStub.calledOnce).to.be.true;
    });

    it('should handle BigNumber return values from decimals()', async () => {
      const mockErc20Instance = {
        callStatic: {
          decimals: sandbox.stub().resolves(BigNumber.from(6)),
        },
      };

      const decimals = await getTokenDecimals(mockErc20Instance);
      expect(decimals).to.equal(6);
    });

    it('should handle string return values from decimals()', async () => {
      const mockErc20Instance = {
        callStatic: {
          decimals: sandbox.stub().resolves('8'),
        },
      };

      const decimals = await getTokenDecimals(mockErc20Instance);
      expect(decimals).to.equal(8);
    });
  });

  describe('parseTokenAmount', () => {
    it('should parse 1.0 token with 18 decimals correctly', () => {
      const result = parseTokenAmount('1.0', 18);
      expect(result.toString()).to.equal(ethers.utils.parseUnits('1.0', 18).toString());
      expect(result.toString()).to.equal('1000000000000000000');
    });

    it('should parse 1.0 token with 6 decimals correctly (USDT/USDC)', () => {
      const result = parseTokenAmount('1.0', 6);
      expect(result.toString()).to.equal(ethers.utils.parseUnits('1.0', 6).toString());
      expect(result.toString()).to.equal('1000000');
    });

    it('should parse 1.0 token with 8 decimals correctly (WBTC)', () => {
      const result = parseTokenAmount('1.0', 8);
      expect(result.toString()).to.equal(ethers.utils.parseUnits('1.0', 8).toString());
      expect(result.toString()).to.equal('100000000');
    });

    it('should parse 0.5 tokens with 6 decimals correctly', () => {
      const result = parseTokenAmount('0.5', 6);
      expect(result.toString()).to.equal('500000');
    });

    it('should parse 10.5 tokens with 6 decimals correctly', () => {
      const result = parseTokenAmount('10.5', 6);
      expect(result.toString()).to.equal('10500000');
    });

    it('should parse 1.23 tokens with 2 decimals correctly', () => {
      const result = parseTokenAmount('1.23', 2);
      expect(result.toString()).to.equal('123');
    });

    it('should parse 100 tokens with 0 decimals correctly', () => {
      const result = parseTokenAmount('100', 0);
      expect(result.toString()).to.equal('100');
    });

    it('should parse number input (not just string)', () => {
      const result = parseTokenAmount(1.5, 6);
      expect(result.toString()).to.equal('1500000');
    });

    it('should handle very small amounts with high decimals', () => {
      const result = parseTokenAmount('0.000000000000000001', 18);
      expect(result.toString()).to.equal('1');
    });

    it('should handle large amounts', () => {
      const result = parseTokenAmount('1000000', 6);
      expect(result.toString()).to.equal('1000000000000');
    });

    it('should return BigNumber instance', () => {
      const result = parseTokenAmount('1.0', 18);
      expect(BigNumber.isBigNumber(result)).to.be.true;
    });
  });

  describe('formatTokenAmount', () => {
    it('should format 1e18 to "1.0" with 18 decimals', () => {
      const amount = BigNumber.from('1000000000000000000');
      const result = formatTokenAmount(amount, 18);
      expect(result).to.equal('1.0');
    });

    it('should format 1e6 to "1.0" with 6 decimals (USDT/USDC)', () => {
      const amount = BigNumber.from('1000000');
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('1.0');
    });

    it('should format 1e8 to "1.0" with 8 decimals (WBTC)', () => {
      const amount = BigNumber.from('100000000');
      const result = formatTokenAmount(amount, 8);
      expect(result).to.equal('1.0');
    });

    it('should format 500000 to "0.5" with 6 decimals', () => {
      const amount = BigNumber.from('500000');
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('0.5');
    });

    it('should format 10500000 to "10.5" with 6 decimals', () => {
      const amount = BigNumber.from('10500000');
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('10.5');
    });

    it('should format 123 to "1.23" with 2 decimals', () => {
      const amount = BigNumber.from('123');
      const result = formatTokenAmount(amount, 2);
      expect(result).to.equal('1.23');
    });

    it('should format 100 to "100" with 0 decimals', () => {
      const amount = BigNumber.from('100');
      const result = formatTokenAmount(amount, 0);
      expect(result).to.equal('100');
    });

    it('should format zero amount correctly', () => {
      const amount = BigNumber.from('0');
      const result = formatTokenAmount(amount, 18);
      expect(result).to.equal('0.0');
    });

    it('should format very small amounts correctly', () => {
      const amount = BigNumber.from('1');
      const result = formatTokenAmount(amount, 18);
      expect(result).to.equal('0.000000000000000001');
    });

    it('should format large amounts correctly', () => {
      const amount = BigNumber.from('1000000000000');
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('1000000.0');
    });

    it('should handle string input (converts to BigNumber)', () => {
      const amount = '1000000';
      const result = formatTokenAmount(amount, 6);
      expect(result).to.equal('1.0');
    });

    it('should return string', () => {
      const amount = BigNumber.from('1000000');
      const result = formatTokenAmount(amount, 6);
      expect(typeof result).to.equal('string');
    });
  });

  describe('integration: parseTokenAmount and formatTokenAmount', () => {
    it('should round-trip correctly for 18-decimal token', () => {
      const original = '1.5';
      const parsed = parseTokenAmount(original, 18);
      const formatted = formatTokenAmount(parsed, 18);
      expect(formatted).to.equal(original);
    });

    it('should round-trip correctly for 6-decimal token', () => {
      const original = '1.5';
      const parsed = parseTokenAmount(original, 6);
      const formatted = formatTokenAmount(parsed, 6);
      expect(formatted).to.equal(original);
    });

    it('should round-trip correctly for 8-decimal token', () => {
      const original = '0.5';
      const parsed = parseTokenAmount(original, 8);
      const formatted = formatTokenAmount(parsed, 8);
      expect(formatted).to.equal(original);
    });

    it('should round-trip correctly for 2-decimal token', () => {
      const original = '1.23';
      const parsed = parseTokenAmount(original, 2);
      const formatted = formatTokenAmount(parsed, 2);
      expect(formatted).to.equal(original);
    });

    it('should round-trip correctly for 0-decimal token', () => {
      const original = '100';
      const parsed = parseTokenAmount(original, 0);
      const formatted = formatTokenAmount(parsed, 0);
      expect(formatted).to.equal(original);
    });
  });
});

