import { BigNumber, ethers } from 'ethers';
import StandartTokenArtifact from '../../artifacts/StandardToken.json';
import Market from '../Market';

export default class CErc20 extends Market {
  constructor(tropykus, abi, contractAddress, erc20TokenAddress) {
    super(tropykus, abi, contractAddress);
    if (erc20TokenAddress === null || erc20TokenAddress === undefined) {
      throw new Error('Must provide a valid erc20 token address');
    }
    this.erc20InstanceAddress = erc20TokenAddress;
    this.erc20Instance = new ethers.Contract(
      erc20TokenAddress,
      StandartTokenArtifact.abi,
      tropykus.provider,
    );
  }

  mint(account, amount) {
    return new Promise((resolve, reject) => {
      this.erc20Instance.connect(account.signer)
        .approve(this.address, ethers.utils.parseEther(amount.toString()))
        .then(() => this.instance.connect(account.signer)
          .mint(ethers.utils.parseEther(amount.toString()), { gasLimit: this.tropykus.gasLimit }))
        .then(resolve)
        .catch(reject);
    });
  }

  async repayBorrow(account, amount, maxValue = false) {
    if (maxValue) {
      const borrowBalance = await this.instance
        .connect(account.signer).callStatic
        .borrowBalanceCurrent(account.address);
      const delta = BigNumber.from(1e18.toString());
      await this.erc20Instance.connect(account.signer)
        .approve(this.address, borrowBalance.add(delta));
      return this.instance.connect(account.signer)
        .repayBorrow(
          ethers.constants.MaxUint256,
          { gasLimit: this.tropykus.gasLimit },
        );
    }
    await this.erc20Instance.connect(account.signer)
      .approve(this.address, ethers.utils.parseEther(amount.toString()));
    return this.instance.connect(account.signer)
      .repayBorrow(
        ethers.utils.parseEther(amount.toString()),
        { gasLimit: this.tropykus.gasLimit },
      );
  }

  transferUnderlying(accountFrom, addressTo, amount) {
    return new Promise((resolve, reject) => {
      this.erc20Instance.connect(accountFrom.signer)
        .transfer(
          addressTo,
          ethers.utils.parseEther(amount.toString()),
        )
        .then(resolve)
        .catch(reject);
    });
  }

  balanceOfUnderlyingInWallet(account) {
    return new Promise((resolve, reject) => {
      this.erc20Instance.connect(account.signer)
        .balanceOf(account.address)
        .then((balance) => Number(balance) / 1e18)
        .then(resolve)
        .catch(reject);
    });
  }
}
