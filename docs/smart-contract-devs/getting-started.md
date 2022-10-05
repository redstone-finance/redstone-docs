---
sidebar_position: 1
sidebar_label: "🚀 Getting started"
---

# 🚀 Getting started

## Installation

Install [redstone-evm-connector](https://www.npmjs.com/package/redstone-evm-connector) from NPM registry

```bash
# Using yarn
yarn add redstone-evm-connector

# Using NPM
npm install redstone-evm-connector
```

## Usage

:::tip
TLDR; You need to do 2 things:
1. [Adjust your smart contracts](#1-adjust-your-smart-contracts)
2. [Adjust Javascript code of your dApp](#2-adjust-javascript-code-of-your-dapp) (**it is required**, otherwise you will get "ECDSA: invalid signature..." errors)
:::

:::caution
Please don't use Remix to test RedStone oracles, as Remix does not support modifying transactions in the way that redstone-evm-connector does
:::

### 1. Adjust your smart contracts

You need to apply a minium change to the source code to enable smart contract to access data. Your contract needs to extend the [PriceAware](https://github.com/redstone-finance/redstone-evm-connector/blob/master/contracts/message-based/PriceAware.sol) contract and override the implementation of `isSignerAuthorized` function.

```js
import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract YourContractName is PriceAware {

  function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {
    // Put your logic of signers authorisation here
    // You can check check evm addresses for providers at: https://api.redstone.finance/providers
    return _receviedSigner == 0x0C39486f770B26F5527BBBf942726537986Cd7eb; // redstone main demo provider

    // Uncomment for redstone-stocks demo provider
    // return _receviedSigner == 0x926E370fD53c23f8B71ad2B3217b227E41A92b12;

    // Uncomment for redstone-rapid demo provider
    // return _receviedSigner == 0xf786a909D559F5Dee2dc6706d8e5A81728a39aE9;

    // Uncomment for redstone-avalanche price feed (it has 2 authorised signers)
    // return _receviedSigner == 0x3a7d971De367FE15D164CDD952F64205F2D9f10c
    //   || _receviedSigner == 0x41ed5321B76C045f5439eCf9e73F96c6c25B1D75;

    // Uncomment for redstone-avalanche-prod price feed (it has 12 authorised signers)
    // return _receviedSigner == 0x981bdA8276ae93F567922497153de7A5683708d3
    //   || _receviedSigner == 0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48
    //   || _receviedSigner == 0xc1D5b940659e57b7bDF8870CDfC43f41Ca699460
    //   || _receviedSigner == 0x1Cd8F9627a2838a7DAE6b98CF71c08B9CbF5174a
    //   || _receviedSigner == 0xbC5a06815ee80dE7d20071703C1F1B8fC511c7d4
    //   || _receviedSigner == 0xe9Fa2869C5f6fC3A0933981825564FD90573A86D
    //   || _receviedSigner == 0xDf6b1cA313beE470D0142279791Fa760ABF5C537
    //   || _receviedSigner == 0xa50abc5D76dAb99d5fe59FD32f239Bd37d55025f
    //   || _receviedSigner == 0x496f4E8aC11076350A59b88D2ad62bc20d410EA3
    //   || _receviedSigner == 0x41FB6b8d0f586E73d575bC57CFD29142B3214A47
    //   || _receviedSigner == 0xC1068312a6333e6601f937c4773065B70D38A5bF
    //   || _receviedSigner == 0xAE9D49Ea64DF38B9fcbC238bc7004a1421f7eeE8
  }
```

After applying the mentioned change you will be able to access the data calling the local [getPriceFromMsg](https://github.com/redstone-finance/redstone-evm-connector/blob/price-aware/contracts/message-based/PriceAware.sol#L29) function. You should pass the symbol of the asset converted to `bytes32`:

```js
uint256 ethPrice = getPriceFromMsg(bytes32("ETH"));
```

You can see all available assets and symbols [in our web app.](https://app.redstone.finance/#/app/providers)

### 2. Adjust Javascript code of your dApp

You should also update the code responsible for submitting transactions. If you're using [ethers.js](https://github.com/ethers-io/ethers.js/), we've prepared a dedicated library to make the transition seamless.

#### Contract object wrapping

First, you need to import the wrapper code to your project

```ts
// Typescript
import { WrapperBuilder } from "redstone-evm-connector";

// Javascript
const { WrapperBuilder } = require("redstone-evm-connector");
```

Then you can wrap your ethers contract pointing to the selected [Redstone data provider.](https://api.redstone.finance/providers) You can also specify the single asset that you would like to pass to your contract. It helps to decrease transactions GAS cost, because in this case only the data for the provided asset will be passed to the contract.

```js
const yourEthersContract = new ethers.Contract(address, abi, provider);

// Connecting all provider's prices (consumes more GAS)
const wrappedContract = WrapperBuilder
                          .wrapLite(yourEthersContract)
                          .usingPriceFeed("redstone");

// Connecting a single price from selected provider
const wrappedContract = WrapperBuilder
                          .wrapLite(yourEthersContract)
                          .usingPriceFeed("redstone-stocks", { asset: "AAPL" });

// Connecting a custom provider (with a custom price feed configuration)
// You can check example price feed configurations here: https://github.com/redstone-finance/redstone-evm-connector/tree/master/utils/v2/connector/impl/default-data-sources
const wrappedContract = WrapperBuilder
                          .wrapLite(yourEthersContract)
                          .usingPriceFeed("custom", {
                            asset: "AAPL",
                            dataSources: {
                              sources: [...],
                              valueSelectionAlgorithm: "first-valid",
                              timeoutMilliseconds: 10000,
                              maxTimestampDiffMilliseconds: 150000,
                              preVerifySignatureOffchain: true,
                            }
                          });

```

Now you can access any of the contract's methods in exactly the same way as interacting with the ethers-js code:

```js
wrappedContract.executeYourMethod();
```

<!-- Hidden since we moved the logic of provider authorisation to the smart contract function -->
<!-- #### Provider authorization
If you're the owner of the contract, you should authorize a data provider after the contract deployment. You should do it before users will interact with your contract. Because the provider authenticity will be checked via signature verification whenever a user submits a transaction accessing the data. There are 2 ways of provider authorization:
##### 1. Simple authorization
We recommend to use this option. It will automatically authorize the correct public address based on your configured price feed.
```js
await wrappedContract.authorizeProvider();
```
##### 2. Authorization by ethereum address
This option requires the provider's ethereum address. You can check the redstone providers' details using [RedStone API.](https://api.redstone.finance/providers)
```js
await yourEthersContract.authorizeSigner("REPLACE_WITH_DATA_PROVIDER_ETHEREUM_ADDRESS")
``` -->

#### Mock provider

If you'd like to use the wrapper in a test context, we recommend using a mock provider when you can easily override the price to test different scenarios:

To test contracts with mock provider please be sure to authorize the following signer address: `0xFE71e9691B9524BC932C23d0EeD5c9CE41161884`. But **don't use this address in production**, because its private key s publicly known.

##### Example authorization in contract

```js
import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract YourContractName is PriceAware {

  function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {
    return _receviedSigner == 0xFE71e9691B9524BC932C23d0EeD5c9CE41161884; // mock provider address
  }
```

##### Option 1. Object with prices

```js
const wrappedContract = WrapperBuilder.mockLite(yourEthersContract).using({
  ETH: 2005,
  BTC: 45000,
  REDSTONE: 100000,
});
```

##### Option 2. Function (timestamp => PricePackage)

```js
function mockPriceFun(curTimestamp) {
  return {
    timestamp: curTimestamp - 5000,
    prices: [
      { symbol: "ETH", value: 2005 },
      { symbol: "BTC", value: 45000 },
    ],
  };
}

const wrappedContract =
  WrapperBuilder.mockLite(yourEthersContract).using(mockPriceFun);
```

We're also working on a wrapper for the truffle/web3 contracts. Please [let us know](https://redstone.finance/discord) if you need a solution for other frameworks as well.

## Working demo

You can see examples of `redstone-evm-connector` usage in our [dedicated repo with examples](https://github.com/redstone-finance/redstone-evm-connector-examples).
