---
sidebar_position: 3
sidebar_label: "⏱ X (no front-running)"
---

# ⏱ RedStone X
## An eXtreme protection against front-running

The model implements a `Deferred execution pattern` where transactions are processed in two steps:

1. A user initiates the transaction by recording on-chain an intention to interact with the protocol (ie. open a perpetual position) without knowing the exact context (ie. price) in which the transaction will be executed. This mitigates any attempts to arbitrage the protocols by front-running price delivery from Oracles. 

2. The price is pushed on-chain only in the second step, which usually happens at the very next block. Anyone (including the user himself) could push the price, as its integrity is validated on-chain based on the protocol constraints. Such a price will be used to finally settle the transaction. 

This model was popularised by perpetual protocols such as [GMX](https://gmx.io/#/) and it enables a new wave of super-efficient DeFi projects that are rapidly growing despite the bear market. 

:::important Requirements
TLDR; You need to do 2 things:

1. Adjust your contracts to execute price-sensitive transactions in 2-phases (request -> execution).

2. Deploy a keeper service that automatically fetches the price and triggers the execution.  
:::

![RedStone X diagram](/img/redstone-x.png)

## Updating smart contract code

### Phase 1 - request

When a user wants to execute a price-sensitive transaction we need to collect some collateral, record request parameters, and ask keepers to provide price data. 

To clarify the steps, let's look at them in the context of a more concrete example. There is a simple protocol that allows swapping a native currency (like ETH) for a stable coin (like USDC). The sample code to record the transaction may look as follows:
```
function changeEthToUsdc() external payable {
        bytes32 requestHash = calculateHashForSwapRequest(
            msg.value,
            msg.sender,
            block.number
        );
        requestedSwaps[requestHash] = true;
        
        emit NewOracleDataRequest(msg.value, msg.sender, block.number);
    }
```

In the function above we: 

1) Collect the collateral from the user keeping the eth that is attached to the transaction. This protects us from spamming the protocol with empty requests. 

2) Notarize all the necessary parameters of the user's request that will be necessary to validate the execution step. In the context of our example, let's seal the values of: 
- amount of funds to swap `msg.value`
- address of the caller `msg.sender`
- time when the transaction is submitted (it will be necessary to deliver a matching price) `block.number` (Keeping the timestamp as block number or hash is better because the on-chain timestamping may not be fully synchronized with the global clock posing a risk of malicious arbitrage).

We do not need to store all the data on-chain. It's sufficient to record a hash of the  values mentioned above. 

3) Notify the keepers' network about the new request to receive price data by emitting the `NewOracleDataRequest` event.

### Phase 2 - execution

In this phase, the request from a user is executed with data received from the keeper network. 
Let us analyze the necessary steps in the context of our example with swapping eth -> usdc. 

```
function executeWithOracleData(
    uint256 ethToSwap,
    address requestedBy,
    uint256 requestedAtBlock
    ) external payable {

    // Check if the request actually exists
    bytes32 requestHash =
      calculateHashForSwapRequest(avaxToSwap, requestedBy, requestedAtBlock);
    require(requestedSwaps[requestHash],
      "Can not find swap request with the given params");
    delete requestedSwaps[requestHash];

    // We need to validate the timestamp (block.number)
    uint256 dataPackagesBlockNumber = extractTimestampsAndAssertAllAreEqual();
    require(dataPackagesBlockNumber == requestedAtBlock, "Block number mismatch in payload and request");

    // Transfer USDC to the user
    uint256 usdcAmount = getExpectedUsdAmount(ethToSwap);
    usdc.transfer(requestedBy, usdcAmount);
}
```

1) We need to validate if the parameters provided by keepers match the ones notarized by the user.

2) Then we check if the timestamp (block number) for which the price is sourced matches the time when the request was recorded.

3) If all of the above checks are fine, we can send the appropriate value of usdc back to the user who originated the request

:::info Full code for the example
The full code for the example above is available in [our workshop explaining 3 different models](https://github.com/redstone-finance/avalanche-workshop). 
:::
