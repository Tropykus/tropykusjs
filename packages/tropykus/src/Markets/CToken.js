import { ethers } from 'ethers';
import CTokenAbi from '../../abis/CToken.json';
import StandartTokenAbi from '../../abis/StandardToken.json';
import Market from '../Market';

export default class CToken extends Market {
  constructor(tropykus, contractAddress, erc20TokenAddress) {
    super(tropykus, contractAddress, CTokenAbi);
    if (erc20TokenAddress === null || erc20TokenAddress === undefined) {
      throw new Error('Must provide a valid erc20 token address');
    }
    this.erc20Instance = new ethers.Contract(
      erc20TokenAddress,
      StandartTokenAbi,
      this.tropykus.ethersProvider,
    );
  }

  async mint(account, amount) {
    await this.erc20Instance.connect(account).approve(this.address, amount);
    return this.instance.connect(account).mint(amount, { gasLimit: this.tropykus.gasLimit });
  }
}
