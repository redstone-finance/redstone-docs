---
sidebar_position: 4
sidebar_label: "Hybrid (push + pull) ERC7412"
---

# RedStone Hybrid ERC7412

## Push and Pull models combined

This model was introduced in form of [ERC7412](https://eips.ethereum.org/EIPS/eip-7412) - we encourage you to read it before implementation! The model was popularized by the perpetual protocol [Synthetix](https://synthetix.io/).

:::important Requirements
TLDR; You need to do 2 things:

1. Deploy price feed
2. Modify you client code to use [erc7412](https://www.npmjs.com/package/@redstone-finance/erc7412)

:::

## Guide

### Deploy price feed contract

1. Install dependency `npm install @redstone-finance/erc7412`
2. You have to extend contract `RedstonePrimaryProdWithoutRoundsERC7412` imported from `@redstone-finance/erc7412/contracts/RedstoneERC7412.sol`
   1. Implement `getTTL` method. It should return duration in second after which price in contract becomes stale. Stale means that price feed contract will revert on reads until price will be updated. Price updates will happen this is described in "Modify DAPP" section.
   2. Choose `dataFeedId` for which you want to deploy feed. Here is full list of [supported assets](https://app.redstone.finance/#/app/data-services/redstone-primary-prod)
3. Deploy contract

#### Example contract for BTC dataFeedId

```sol
import {RedstonePrimaryProdWithoutRoundsERC7412} from '@redstone-finance/erc7412/contracts/RedstoneERC7412.sol';

contract BTCFeed is RedstonePrimaryProdWithoutRoundsERC7412 {
  function getTTL() override view internal virtual returns (uint256) {
    return 3600;
  }

  function getDataFeedId() override view public virtual returns (bytes32) {
    return bytes32("BTC");
  }
}
```

### Modify DAPP

Your dapp has to be aware of erc7412. To allow users update prices when price in feed is stale.

_Note: if it happens that user will have to update price they will need to pay extra money for gas transaction._

Modification in your dapp requires extra function call `generate7412CompatibleCall` which should be executed just before user executing transaction.

1. For now erc7412 lib depends on viem client.
2. You have to prepare call to your contract, and in next step pass it to `generate7412CompatibleCall`

```ts
import { generate7412CompatibleCall } from "@redstone-finance/erc7412/generate7412CompatibleCall";

// encode user contract function call
const callData = viem.encodeFunctionData({
  functionName: "your contract function",
  args: [],
  abi: your_contract_abi,
});

// this function will simulate transaction if transaction fails because of erc7412.OracleDataRequired,
// it will fetch oracle payload from RedStone gateway
// and prepare multicall transaction consisting of two transaction {user_tx,update_redstone_price_feed_tx}
const call = await generate7412CompatibleCall(
  await hardhat.viem.getPublicClient(),
  btcPriceFeed.address,
  wallet.account.address,
  callData,
  multicall.address,
);

// sends transaction
// it will first update price feed
// and then it will execute unchanged user transaction
await wallet.sendTransaction(call);

// data is already set in contract and it won't be necessary to update it until TTL passes
console.log("BTC price:", await btcPriceFeed.read.latestAnswer());
```

Working example can be find [here](https://github.com/redstone-finance/erc7412-example)
