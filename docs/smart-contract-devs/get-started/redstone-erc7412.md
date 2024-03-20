---
sidebar_position: 4
sidebar_label: "🌀 ERC7412 (classic + core)"
---

# Redstone ERC7412

## Classic and Core models combined

This model was introduced in form of [ERC7412](https://eips.ethereum.org/EIPS/eip-7412) - we encourage you to read it before implementation! The model was popularized by perpetual protocol [Synthetix](https://synthetix.io/).

:::important Requirements
TLDR; You need to do 2 things:
1. Deploy price feed, or use existing one
2. Modify you client code to use [erc7412](TODO: link to our published package)
:::

## Usage

### Deploy price feed contract

1. You have to extend contract `@redstone-finance/erc7412/contracts/erc7412/RedstonePrimaryProdWithoutRoundsERC7412.sol` the package is available on npm
  1. Implement `getTTL` method. It should return duration in second after which price in contract becomes stale. Stale means that price feed contract will revert on reads until price will be updated. Price updates will auto happen ths is described in DAPP section.
  2. Choose `dataFeedId` for which you want to deploy feed. Here is full list of [supported assets](https://app.redstone.finance/#/app/data-services/redstone-primary-prod) (symbol=dataFeedId)
2. Deploy contract (example contract for BTC)

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {RedstonePrimaryProdWithoutRoundsERC7412} from '@redstone-finance/erc7412/contracts/erc7412/RedstonePrimaryProdWithoutRoundsERC7412.sol'; 

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

Note: if it happens that user will have to update price they will need to pay extra money for gas transaction.

Modification in your dapp requires extra function call `generate7412CompatibleCall` which should be executed just before user executing transaction.

1. For now erc7412 lib depends on viem client.
2. You have to prepare call to your contract, and in next step pass it to `generate7412CompatibleCall`
  
```ts
    import { generate7412CompatibleCall } from "@redstone-finance/erc7412/generate7412CompatibleCall";

    // encode call data call (this could be call to another contract, which call BTCFeed)
    const callData = viem.encodeFunctionData({
      functionName: "your contract function",
      args: [],
      abi: btcPriceFeed.abi,
    });

    // this function will simulate transaction if transaction fails because of erc7412.OracleDataRequired,
    // it will fetch it from redstone oracles gateway
    // and prepare multicall transaction consisting of two transaction {user_tx,update_redstone_price_feed_tx}
    const call = await generate7412CompatibleCall(
      await hardhat.viem.getPublicClient(),
      btcPriceFeed.address,
      wallet.account.address,
      callData,
      multicall.address
    );

    // send transaction to multicall contract
    // it will first update price feed
    // and then it will execute user transaction
    await wallet.sendTransaction(call);

    // data is already set in contract and it won't be necessary to update it until TTL passes
    console.log("BTC price:", await btcPriceFeed.read.latestAnswer());
```
Working toy example could be find [here](TODO: link to public repo)
