---
sidebar_position: 4
sidebar_label: "ERC-7412 Model"
---

# ERC-7412 Model

The ERC-7412 model combines RedStone's Classic and Core Models relying on an newly proposed Ethereum standard. This model was introduced in light of the [ERC-7412](https://eips.ethereum.org/EIPS/eip-7412) standard. It is encouraged to familiarize yourself with it before implementating this model. 

:::Important Requirements
1. Deploy price feed
2. Modify you client code to use [ERC7412](https://www.npmjs.com/package/@redstone-finance/erc7412)
:::

## Step-By-Step Guide

### 1. Deploy Price Feed Contract

1. Install dependency `npm install @redstone-finance/erc7412`.
2. You have to extend contract `RedstonePrimaryProdWithoutRoundsERC7412` imported from `@redstone-finance/erc7412/contracts/RedstoneERC7412.sol`.
3. Implement `getTTL` method. It should return duration in second after which price in contract becomes stale. Stale means that price feed contract will revert on reads until price will be updated. Price updates will happen this is described in "Modify DAPP" section.
4. Choose `dataFeedId` for which you want to deploy feed. Here is full list of [supported assets](https://app.redstone.finance/#/app/data-services/redstone-primary-prod).
3. Deploy contract.

**Example contract for BTC dataFeedId**
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
### 2. Modify Your dApp

- Your dApp has to be aware of ERC7412 to allow users to update prices when the price in feed is stale. 
- Modification in your dApp requires extra function call `generate7412CompatibleCall` which should be executed just before user executing transaction.
- For now erc7412 lib depends on viem client.
- You have to prepare call to your contract, and in next step pass it to `generate7412CompatibleCall`.
- For a working example [click here](https://github.com/redstone-finance/erc7412-example).

 *Note: if a user would like to update the price they will need to pay extra money for gas transaction.*

  
```ts
    import { generate7412CompatibleCall } from "@redstone-finance/erc7412/generate7412CompatibleCall";

    // encode user contract function call
    const callData = viem.encodeFunctionData({
      functionName: "your contract function",
      args: [],
      abi: your_contract_abi,
    });

    // this function will simulate transaction if transaction fails because of erc7412.OracleDataRequired,
    // it will fetch oracle payload from redstone oracles gateway
    // and prepare multicall transaction consisting of two transaction {user_tx,update_redstone_price_feed_tx}
    const call = await generate7412CompatibleCall(
      await hardhat.viem.getPublicClient(),
      btcPriceFeed.address,
      wallet.account.address,
      callData,
      multicall.address
    );

    // sends transaction
    // it will first update price feed
    // and then it will execute unchanged user transaction
    await wallet.sendTransaction(call);

    // data is already set in contract and it won't be necessary to update it until TTL passes
    console.log("BTC price:", await btcPriceFeed.read.latestAnswer());
```
