---
sidebar_position: 1
sidebar_label: "🚀 Core (on-demand feeds)"
---

# 🚀 Core Model - fetching prices on-demand

This is our basic operating model when the data ia automatically appended to users transaction.  

## Installation

Install [@redstone-finance/evm-connector](https://www.npmjs.com/package/@redstone-finance/evm-connector) from NPM registry

```bash
# Using yarn
yarn add @redstone-finance/evm-connector

# Using NPM
npm install @redstone-finance/evm-connector
```

## Usage

:::important Requirements
TLDR; You need to do 2 things:

1. [Adjust your smart contracts](#1-adjust-your-smart-contracts)
2. [Adjust Javascript code of your dApp](#2-adjust-javascript-code-of-your-dapp) (**it is required**, otherwise you will get smart contract errors)

:::

:::caution Don't use remix
Please don't use Remix to test RedStone oracles, as Remix does not support modifying transactions in the way that the evm-connector does
:::

### 1. Adjust your smart contracts

You need to apply a minimum change to the source code to enable smart contract to access data. Your contract needs to extend one of our custom base contracts, which can be found [here.](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/evm-connector/contracts/data-services)

We strongly recommend having some upgradability mechanism for your contracts (it can be based on multisig, DAO, or anything else). This way, you can quickly switch to the latest trusted data providers in case of changes or problems with the current providers.

```js
import "@redstone-finance/evm-connector/contracts/data-services/AvalancheDataServiceConsumerBase.sol";

contract YourContractName is AvalancheDataServiceConsumerBase {
  ...
}
```

💡 Note: You can also override the following functions (do it at your own risk):

- `isTimestampValid(uint256 receivedTimestamp) returns (bool)` - to enable custom logic of timestamp validation
- `aggregateValues(uint256[] memory values) returns (uint256)` - to enable custom logic of aggregating values from different providers (by default this function takes the median value)
- `getAuthorisedSignerIndex(address _signerAddress) returns (uint256)` and `getUniqueSignersThreshold() returns (unt256)` functions - to enable custom logic of signers authorisation

After applying the mentioned change you will be able to access the data calling the local `getOracleNumericValueFromTxMsg` function. You should pass the data feed id converted to `bytes32`.

```js
// Getting a single value
uint256 ethPrice = getOracleNumericValueFromTxMsg(bytes32("ETH"));

// Getting several values
bytes32[] memory dataFeedIds = new bytes32[](2);
dataFeedIds[0] = bytes32("ETH");
dataFeedIds[1] = bytes32("BTC");
uint256[] memory values = getOracleNumericValuesFromTxMsg(dataFeedIds);
uint256 ethPrice = values[0];
uint256 btcPrice = values[1];
```

You can see all available data feeds [in our web app.](https://app.redstone.finance)

### 2. Adjust Javascript code of your dApp

You should also update the code responsible for submitting transactions. If you're using [ethers.js](https://github.com/ethers-io/ethers.js/), we've prepared a dedicated library to make the transition seamless.

#### Contract object wrapping

First, you need to import the wrapper code to your project

```ts
// Typescript
import { WrapperBuilder } from "@redstone-finance/evm-connector";

// Javascript
const { WrapperBuilder } = require("@redstone-finance/evm-connector");
```

Then you can wrap your ethers contract pointing to the selected [Redstone data service id.](https://api.redstone.finance/providers) You should also specify a number of unique signers, data feed identifiers, and (optionally) URLs for the redstone cache nodes.

```js
const yourEthersContract = new ethers.Contract(address, abi, provider);

// Connecting all provider's prices (consumes more GAS)
const wrappedContract = WrapperBuilder.wrap(contract).usingDataService(
  {
    dataServiceId: "redstone-avalanche-prod",
    uniqueSignersCount: 10,
    dataFeeds: ["AVAX", "ETH", "PNG"],
  },
  ["https://d33trozg86ya9x.cloudfront.net"]
);
```

Now you can access any of the contract's methods in exactly the same way as interacting with the ethers-js code:

```js
wrappedContract.executeYourMethod();
```

#### Mock provider

If you'd like to use the wrapper in a test context, we recommend using a mock wrapper so that you can easily override the oracle values to test different scenarios. To use the mock wrapper just use the `usingMockData(signedDataPackages)` function instead of the `usingDataService` function. You can see examples of the mock wrapper usage [here.](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/evm-connector/test/mock-wrapper)

## Working demo

You can see examples of the `@redstone-finance/evm-connector` usage in our [dedicated repo with examples](https://github.com/redstone-finance/redstone-evm-examples).
