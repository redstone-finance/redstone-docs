---
sidebar_position: 3
sidebar_label: "X Model"
---

# X Model

The RedStone X model is designed to meet the needs of advanced protocols, such as perpetuals, options, and derivatives. By providing price feeds at the very next block after users initiate transactions, this model eliminates front-running risks.

## Key Requirements
- **Adjust Contracts for 2-Phase Execution:** Modify your smart contracts to execute price-sensitive transactions in two phases: request and execution.
- **Deploy a Keeper Service:** Set up a keeper service that automatically fetches the price data and triggers the transaction execution.

## How It Works
The model implements a `Deferred Execution Pattern`, where transactions are processed in two distinct steps:

1. **Transaction Initiation:**  
   A user initiates a transaction by recording an on-chain intention to interact with the protocol (e.g., opening a perpetual position) without knowing the exact context (such as price) at the time of execution. This mitigates front-running attempts by preventing price manipulation before the transaction is settled.

2. **Price Delivery and Transaction Execution:**  
   The price is pushed on-chain in the next step, typically in the very next block. Anyone, including the user, can push the price, as its integrity is validated on-chain according to the protocol's constraints. This price is then used to finalize the transaction.

## Step-by-Step Guide to Update Smart Contracts

### Phase 1: Transaction Request

When a user wants to execute a price-sensitive transaction, we need to collect some collateral, record request parameters, and ask keepers to provide price data.

#### Example: Swapping ETH to USDC

For illustrative purposes, consider a simple protocol that allows swapping a native currency (like ETH) for a stablecoin (like USDC). The code for recording the transaction might look like this:

```solidity
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
#### Explanation:

1. **Collateral Collection:**  
   - The contract collects the ETH attached to the transaction as collateral.  
   - This prevents us from spamming the protocol with empty requests.

2. **Notarizing Request Parameters:**  
   The contract notarizes all the necessary parameters of the user's request that will be necessary to validate the execution step. We do not need to store all the data on-chain; it is sufficient to record a hash of the values mentioned above. Keeping the timestamp as a block number or hash is better because on-chain timestamping may not be fully synchronized with the global clock, posing a risk of malicious arbitrage.

   In this example, the following parameters are sealed:
   - Amount of ETH to swap (`msg.value`)
   - Address of the caller (`msg.sender`)
   - Block number when the transaction is submitted (`block.number`)

3. **Keeper Network Notification:**  
   - The contract emits the `NewOracleDataRequest` event to notify the keepers' network of the new request.
   - This signals the need for price data to complete the transaction in the next phase.

### Phase 2: Transaction Execution

In this phase, the request from a user is executed with data received from the keeper network. Let us analyse the necessary steps in the context of our example with swapping ETH to USDC
.
#### Example: Executing ETH to USDC Swap

```solidity
function executeWithOracleData(
    uint256 ethToSwap,
    address requestedBy,
    uint256 requestedAtBlock
) external payable {

    // Verify that the request exists
    bytes32 requestHash = calculateHashForSwapRequest(
        ethToSwap, requestedBy, requestedAtBlock
    );
    require(requestedSwaps[requestHash], 
        "Cannot find swap request with the given parameters");
    delete requestedSwaps[requestHash];

    // Validate the timestamp (block number)
    uint256 dataPackagesBlockNumber = extractTimestampsAndAssertAllAreEqual();
    require(dataPackagesBlockNumber == requestedAtBlock, 
        "Block number mismatch between payload and request");

    // Transfer USDC to the user
    uint256 usdcAmount = getExpectedUsdAmount(ethToSwap);
    usdc.transfer(requestedBy, usdcAmount);
}

```
#### Explanation:

1. **Parameter Validation:**  
   - We need to validate if the parameters provided by the keepers match the ones notarized by the user.

2. **Timestamp Verification:**  
   - Then we check if the timestamp (block number) for which the price is sourced matches the time when the request was recorded.

3. **Final Settlement:**  
   - If all of the above checks are fine, we can send the appropriate value of USDC back to the user who originated the request.
     

:::info Full code for the example
The full code for the example above is available in [our workshop explaining 3 different models](https://github.com/redstone-finance/avalanche-workshop). 
:::

   
