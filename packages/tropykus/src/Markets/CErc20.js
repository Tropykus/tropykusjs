import { ethers } from 'ethers';
import StandartTokenAbi from '../../abis/StandardToken.json';
import Market from '../Market';

export default class CErc20 extends Market {
  constructor(tropykus, abi, contractAddress, erc20TokenAddress) {
    super(tropykus, abi, contractAddress);
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
    await this.erc20Instance.connect(account)
      .approve(this.address, ethers.utils.parseEther(amount.toString()));
    return this.instance.connect(account)
      .mint(ethers.utils.parseEther(amount.toString()), { gasLimit: this.tropykus.gasLimit });
  }

  async repayBorrow(account, amount, maxValue = false) {
    if (maxValue) {
      const borrowBalance = Number(await this.instance.connect(account)
        .callStatic.borrowBalanceCurrent(account.address));
      const borrowBalancePlusDelta = borrowBalance + 1e18;
      await this.erc20Instance.connect(account)
        .approve(
          this.address,
          ethers.utils.parseEther(borrowBalancePlusDelta.toString()),
        );
      return this.instance.connect(account)
        .repayBorrow(
          ethers.constants.MaxUint256,
          { gasLimit: this.tropykus.gasLimit },
        );
    }
    await this.erc20Instance.connect(account)
      .approve(this.address, ethers.utils.parseEther(amount.toString()));
    return this.instance.connect(account)
      .repayBorrow(
        ethers.utils.parseEther(amount.toString()),
        { gasLimit: this.tropykus.gasLimit },
      );
  }
}
