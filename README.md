# Tropykus

[Tropykus finance](https://github.com/Tropykus/protocol) is an algorithmic distributed protocol deployed on the RSK network. As such, it's main motivation is to allow users to lend crypto currencies as collateral and to borrow crypto assets based on interest rates set by real-time supply and demand smart contracts.

The Tropykus Protocol is developed using RSK smart contracts for supplying or borrowing assets. Through the cToken contracts, accounts on the blockchain supply capital (RBTC or ERC-20 tokens) to receive kTokens. Accounts may also do the reverse, and borrow assets from the protocol, using other assets as collateral.

The Tropykus cToken contracts (CRBTC, CERC20Immutable and CRDOC) track these balances, and algorithmically set interest rates for borrowers. This process is described in greater detail, in the [Tropykus Whitepaper](https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/Tropykus_Protocol%20V4.pdf?alt=media&token=d2b0cb1e-4163-432f-8b17-38df7393baff).

# Tropykusjs

[@tropykus/tropykus](https://www.npmjs.com/package/@tropykus/tropykus) npm package enables developers to interact with a deployed instance of Tropykus smart contracts by simply importing it as a dependency.

## Install tropykus
``` bash
$ npm init
$ npm install @babel/runtime
$ npm install @tropykus/tropykus
```

## Use tropykus in your app
```javascript
const Tropykus = require('@tropykus/tropykus');

const tropykus = new Tropykus('https://public-node.testnet.rsk.co', 400000);

tropykus.setComptroller('0xd8f5366b7bbe1275336fc3b929646104379e1d7d');

tropykus.comptroller.allMarkets()
  .then(console.log)
  .catch(console.error);

```

## Add account to tropykus

To add an account to the Tropykus protocol in order to use it as a signer account for the transactions simply use the ***setAccount*** function:

```javascript 
const mnemonic = ${your_account_mnemonic};
const derivationPath = `m/44'/60'/0'/0/0`;

tropykus.setAccount(mnemonic, derivationPath);
```

>**Note:** For more information about derivation paths check [Derivation Paths, How HD wallets derive keys.](https://learnmeabitcoin.com/technical/derivation-paths)
>
> In this case we are using m/44'/60'/0'/0/0 derivation path for BIP 44 schema and Ethereum Network
>
> For [Account Based RSK Addresses](https://developers.rsk.co/rsk/architecture/account-based/) use:
>
> RSK Mainnet: m/44'/137'/0'/0/N
> RSK Testnet: m/44'/37310'/0'/0/N

The correct account assignation can be validated with the ***tropykus.account.address*** property

```javascript 
console.log(tropykus.account.address);
```

## Minting

In order to deposit cryptos into tropykus markets is necesary to have the instance of the specific market, for that use the ***tropykus.addMarket()***.

```javascript
tropykus.addMarket(artifact, deployed, marketAddress, erc20TokenAddress args);
```

- *artifact:* string specifying the artifact to use for the contract instance
- *deployed:* boolean flag to indicate if the contract is already deployed
- *marketAddress:* on chain deployed market address.
- *erc20TokenAddress:* on chain deployed erc20 token address.
- *args:* additional args to initialize market

By default
```
deployed = true,
marketAddress = null,
erc20TokenAddress = null,
args = {
  comptrollerAddress: '',
  interestRateModelAddress: '',
  initialExchangeRate: 0.02,
  name: '',
  symbol: '',
  decimals: 0,
}
```
**For cRBTC:**
```javascript
const crbtc = await tropykus.addMarket('CRBTC', true, crbtcMarketAddress);
```

**For cTokens (cDOC, cRIF, cUSDT):**
```javascript
const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);
```

**For cRDOC:**
```javascript
const crdoc = await tropykus.addMarket('CRDOC', true, rcdocAddress, rdocAddress);
```

Then mint function can be called using the assigned tropykus account to sign the transaction

```javascript
const tx = await crbtc.mint(account, value);
```

- account: Object signer to sign the transaction, it could be the value get from `tropykus.account`
- value: numeric value to be minted into the market

**Wait for mint result:**

Once the mint function is excecuted a promise with the transaction is ruturned. Then it is posible wait for the transaction result using the wait() method, e.g.
```javascript
tx.wait();
```


### Get balance

To request for the account balance the function **market.balanceofUnderlying()** can be used.

```javascript
const balance = await crbtc.balanceOfUnderlying(tropykus.account);
```

## Borrowing

In order to ask for a borrow in a market first there has to be a deposit so there is collateral. Once there is a deposit the **borrow()** function can be used:

```javascript
await crbtc.borrow(account, value);
```

- account: Object signer to sign the transaction, it could be the value get from `tropykus.account`
- value: numeric value to be borrowed from the market

>**Note:** The borrow function does not change between markets like the mint does. Borrow can be used from any market just like the example from crbtc.

### Get borrow balance

To request for the account borrowed balance the function **market.borrowBalanceCurrent()** can be used.

```javascript
const borrowedBalance = await crbtc.borrowBalanceCurrent(tropykus.account);
```

## Redeem

In order to redeem from a market after having deposited in the first place the **redeem()** function is used:


```javascript
await crbtc.redeem(account, value);
```

- account: Object signer to sign the transaction, it could be the value get from `tropykus.account`
- value: numeric value to be redeemed from the market

>**Note:** Similarly to the borrow function, **redeem()** can be used equally from any market

### Example

```javascript=
const cdoc = await tropykus.addMarket('CDOC', true, rcdocAddress, rdocAddress);

// It's necesary have founds in the market to be able to redeem
await cdoc.mint(tropykus.account, depositValue);

// Then it is possible to redeem a different value
await cdoc.redeem(tropykus.account, redeemValue);
```

### Redeem all founds

To redeem all founds deposited in the market the function can be called as follows:

```javascript
await cdoc.redeem(tropykus.account, 0, true);
```

The third paramether is a flag that indicated to the method if all founds must be redeemed

## Repay Borrow

In order to repay in a market after having borrowed in the first place the repayBorrow() function is used:

```javascript=
const crif = await tropykus.addMarket('CErc20Immutable', true, cRifAddress, rifAddress);

await crif.repayBorrow(account, repayValue);
```

- account: Object signer to sign the transaction, it could be the value get from `tropykus.account`
- repayValue: numeric value to be paid in the market

### Repay all debt

To repay all debt in the market the function can be called as follows:

```javascript
await crif.repayBorrow(tropykus.account, 0, true);

const borrowBalance = await crif.borrowBalanceCurrent(tropykus.account);
console.log('borrowBalance', borrowBalance) // 0;
```

The third parameter is a flag that indicates the method that must pay all the debt.

# Using the contracts with Ethersjs

# Networks

## RSK Testnet

|  | Artifact | Address |
| -------- | -------- | -------- |
| Price Oracle | PriceOracleProxy | 0x17cab8546d55a7b4f36811eb61cd93414b9759ab |
| tRIF Token | StandardToken | 0xc370cd19517b5a8a9f6df0958679e8cd4874c048 |
| tDOC Token | StandardToken | 0x494154243ac77c6ab90dfa0d4d42dd411e1df5f3 |
| trDOC Token | StandardToken | 0xc486ac998afbf1b477533dda94d950bd2190ceb5 |
| tUSDT Token | StandardToken | 0xcf5137f039578cb10070b91bb30fd3d260bcddde |
| RIF Interest Rate Model | WhitePaperInterestRateModel | 0x27ea412918b7129962b6c02cc165c95b58c45752 |
| DOC Interest Rate Model | JumpRateModelV2 | 0xcebf33586a73bc758c99cc10b74dfb347115e071 |
| rDOC Interest Rate Model | JumpRateModelV2 | 0x8e56ad60eff862be83a427d4dfa86ee11146a4c0 |
| USDT Interest Rate Model | JumpRateModelV2 | 0x31b42d414bc46ee58279a969e3df71c4e4aa2314 |
| RBTC Interest Rate Model | WhitePaperInterestRateModel | 0x40140771d09d8065d8e036e593aa0d6145725fd8 |
| RBTC micro(kSAT) Interest Rate Model | HurricaneInterestRateModel | 0x0d5af5e33437b49fe61bb61d86769b159b03a3ee |
| kRIF | CErc20Immutable | 0x6201cc9c58ea3802e92f68e732ccc889dd8b0449 |
| kDOC | CErc20Immutable | 0x26905f629d17c6ecce71bc017a9518993bbbc579 |
| kRDOC | CRDOC | 0x720e4c925255d7700f407804646aee7945771286 |
| kUSDT | CErc20Immutable | 0x71775f5cc28a4dbb7965de0f772631199b5460d2 |
| kRBTC | CRBTC | 0x2c067febb0efff52640e31bcb069f3c6b8693630 |
| kSAT | CRBTC | 0x298dad23921024c3f090320ffdd30c9bf245d9fd |
| Comptroller | ComptrollerG6 | 0xd8f5366b7bbe1275336fc3b929646104379e1d7d |



