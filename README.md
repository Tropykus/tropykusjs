# Tropykus

[Tropykus finance](https://github.com/Tropykus/protocol) is an algorithmic distributed protocol deployed on the RSK network. As such, it's main motivation is to allow users to lend crypto currencies as collateral and to borrow crypto assets based on interest rates set by real-time supply and demand smart contracts.

The Tropykus Protocol is developed using RSK smart contracts for supplying or borrowing assets. Through the cToken contracts, accounts on the blockchain supply capital (RBTC or ERC-20 tokens) to receive kTokens. Accounts may also do the reverse, and borrow assets from the protocol, using other assets as collateral.

The Tropykus cToken contracts (CRBTC and CERC20Immutable) track these balances, and algorithmically set interest rates for borrowers. This process is described in greater detail, in the [Tropykus Whitepaper](https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/Tropykus_Protocol%20V4.pdf?alt=media&token=d2b0cb1e-4163-432f-8b17-38df7393baff).

# Tropykusjs

[@tropykus/tropykuslibs](https://www.npmjs.com/package/@tropykus/tropykuslibs) npm package enables developers to interact with a deployed instance of Tropykus smart contracts by simply importing it as a dependency.

## Install tropykus
``` bash
$ npm init
$ npm install @babel/runtime
$ npm install @tropykus/tropykuslibs
```

## Running Tests

Before running the test suite, you need to start a local Anvil node that forks the RSK Mainnet network:

```bash
anvil --fork-url https://public-node.rsk.co --chain-id 30 --port 8545
```

This command:
- Forks the RSK Mainnet network (`https://public-node.rsk.co`)
- Sets the chain ID to 30 (RSK Mainnet)
- Runs the local node on port 8545 (default)

Once Anvil is running, you can run the tests in a separate terminal:

```bash
yarn test
```

> **Note**: Make sure Anvil is running before executing tests, as the test suite requires a local blockchain node to be available at `http://127.0.0.1:8545`.

> **⚠️ Important**: Before running the full test suite (`yarn test`), you **MUST** restart the Anvil node to ensure a clean state. This prevents nonce conflicts, state pollution, and transaction errors from previous test runs. To restart Anvil, stop the current process and start a fresh instance with the same command above.

## Use tropykus in your app
```javascript
const Tropykus = require('@tropykus/tropykuslibs');

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
tropykus.addMarket(artifact, deployed, marketAddress, erc20TokenAddress, args);
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

**For cTokens (cDOC, CBPRO, cUSDRIF):**
```javascript
const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);
```

> **⚠️ Deprecation Notice**: cRIF and cUSDT markets are deprecated (delisted from protocol). Please use supported markets (cDOC, cRBPRO, cRBTC, cUSDRF) instead.

> **Note**: USDT0 refers to the standard 6-decimal USDT token on Rootstock. The deprecated kUSDT market used rUSDT, an 18-decimal wrapped version. New integrations should use USDT0 with 6 decimals for proper decimal handling and compatibility with current standards.

**For USDT0 (6-Decimal Token):**

USDT0 is a 6-decimal token that uses a 30-decimal price oracle adapter. The library automatically detects both the token decimals (6) and oracle decimals (30) for accurate USD value calculations.

```javascript
// Add USDT0 market using CErc20Immutable artifact
const cusdt0 = await tropykus.addMarket('CErc20Immutable', true, usdt0MarketAddress, usdt0TokenAddress);

// Mint 1.5 USDT0 - automatically converts to 1500000 (1.5 × 10^6) internally
await cusdt0.mint(tropykus.account, 1.5);

// Check balance - returns human-readable values
const balance = await cusdt0.balanceOfUnderlying(tropykus.account);
// Returns: { value: 1.5, usd: 1.5 } (assuming $1 USDT price)
console.log('Balance:', balance.value, 'USDT0');
console.log('USD Value:', balance.usd, 'USD');

// Borrow 0.5 USDT0 - automatically converts to 500000 (0.5 × 10^6) internally
await cusdt0.borrow(tropykus.account, 0.5);

// Check borrow balance
const borrowBalance = await cusdt0.borrowBalanceCurrent(tropykus.account);
console.log('Borrowed:', borrowBalance.value, 'USDT0');

// Repay borrowed amount
await cusdt0.repayBorrow(tropykus.account, 0.5);

// Redeem deposited tokens
await cusdt0.redeem(tropykus.account, 1.0);
```

> **Note**: The library automatically detects:
> - **Token decimals**: 6 for USDT0 (via `getTokenDecimals()`)
> - **Oracle decimals**: 30 for USDT price oracle adapter (via `detectOracleDecimals()`)
> 
> All decimal conversions are handled automatically. You can work with human-readable values (e.g., `1.5 USDT0`) and the library converts them to the correct contract format internally.

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
const cdoc = await tropykus.addMarket('CErc20Immutable', true, cdocAddress, docAddress);

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

> **⚠️ Deprecation Notice**: The following example uses cRIF (kRIF), which is deprecated (delisted from protocol). Please use supported markets (cDOC, cRBPRO, cRBTC, cUSDRF) instead.

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

## Deployed Smart Contracts

> **Note**: Comptroller is a proxy contract, so its address is the Unitroller address.

| Contract | Rootstock Testnet | Rootstock Mainnet |
| -------- | ----------------- | ----------------- |
| **Price Oracle** | 0x1bdf453f72a8466ba3709b091b7658edfc550c23 | 0x7fa5500c978e89660bf3bd0526f8f7164de0b38f |
| **Unitroller (Comptroller Proxy)** | 0x7de1ade0c4482ceab96faff408cc9dcc9015b448 | 0x962308fEf8edFaDD705384840e7701F8f39eD0c0 |
| **kDOC** | 0xe7b4770af8152fc1a0e13d08e70a8c9a70f4d9d9 | 0x544eb90e766b405134b3b3f62b6b4c23fcd5fda2 |
| **kBPRO** | 0x844a99Ba756539Aee698ce2915d678bA0FeE4d9d | 0x405062731d8656af5950ef952be9fa110878036b |
| **kRBTC** | 0x636b2c156d09cee9516f9afec7a4605e1f43dec1 | 0x0aeadb9d4c6a80462a47e87e76e487fa8b9a37d7 |
| **kUSDRF** | 0xfbee4444493194468df1de7450a37d840eb8b555 | 0xDdf3CE45fcf080DF61ee61dac5Ddefef7ED4F46C |
| **kUST0** | 0xF66513302Ad4F64a7C00888c1174d18ee22Ed5f2 | N/A |

## Deprecated Markets and Functions

> **⚠️ Deprecated Markets Notice**: The following markets are deprecated and should not be used in new projects: kSAT/cSAT (delisted from protocol), kRDOC/cRDOC (never listed), kRIF (delisted from protocol), and kUSDT (delisted from protocol - used 18-decimal rUSDT, not the standard 6-decimal USDT0). These markets remain functional for backward compatibility but are no longer actively supported. Please use supported markets (kDOC, kRBPRO, kRBTC, kUSDRF) instead.

| Contract | Rootstock Testnet | Rootstock Mainnet |
| -------- | ----------------- | ----------------- |
| **kSAT ⚠️ DEPRECATED** | 0x13f3a4013e77a65b0cd941b8b0e1687e8f3a0e1d | 0xd2ec53e8dd00d204d3d9313af5474eb9f5188ef6 |
| **kUSDT ⚠️ DEPRECATED** | 0x5539d6d48a2147cb824c5c45baaa01e7e1a2694f | 0xedaefc6b596ed38d712100976969975a37c84464 |
| **kRIF ⚠️ DEPRECATED** | 0x23b60e2193057b4b2823973b7478489a076de84f | 0x3134b7fbfca5db217eca523eab1941452cf35163 |
| **kRDOC ⚠️ DEPRECATED** | 0x0981eb51a91e6f89063c963438cadf16c2e44962 | - |