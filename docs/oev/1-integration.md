---
sidebar_position: 1
sidebar_label: "Integration"
---

# RedStone OEV Auctions

This document describes how an external solver connects to the RedStone OEV WebSocket Server to receive oracle feed updates in real-time and participate in liquidation auctions.

## 1. Connection Requirements

**WebSocket URL**: `wss://<url>.oev.a.redstone.finance` .  
RedStone provides full url for the concrete integration.

### Authentication

Every connection requires an `x-api-key` HTTP header during the initial WebSocket handshake upgrade.

- If the `x-api-key` is missing or unauthorized, the server will reply with `401 Unauthorized`.
- Rate limiting applies: >30 concurrent connections utilizing the same API key will return `429 Too Many Requests`.
- api keys are provided by RedStone

### Keepalive (Ping/Pong)

- The server will send a **ping** control frame automatically after 120 seconds of inactivity.
- Any compliant WebSocket client library will emit a **pong** frame automatically in response.
- **Note:** If the connection hangs and the server doesn't receive a pong frame, the connection will forcibly close with code `1001`. The client _must_ handle this disconnection and reconnect.

### Maximum Connection Lifetime

- All connections will be forcibly closed every **8 hours** (close code `1006`) regardless of activity. Clients should intercept this close event, gracefully reconnect, and resubscribe their topics.

## 2. Executor contract deposit

Each external solver is required to deposit a minimum amount of the native token on the Executor contract.
The Executor contract address and the minimum deposit amount will be provided by RedStone.

The deposit/withdrawal functions ABI:

```javascript
const abi = [
  "function deposit() external payable",
  "function requestWithdraw(uint256 amount, address payable to) external",
  "function executeWithdraw() external",
];
```

In order to withdraw the deposit:

1. request withdrawal (`requestWithdraw`)
2. after at least 24h - execute the withdrawal (`executeWithdraw`).

## 3. Feeds Subscription

To receive auction payloads, the client must explicitly subscribe to the `oev/feeds` topic using a JSON message once the connection enters the `OPEN` state.

```json
{
  "op": "subscribe",
  "topic": "oev/feeds"
}
```

To unsubscribe:

```json
{
  "op": "unsubscribe",
  "topic": "oev/feeds"
}
```

## 4. The Auction Data Pipeline

### Step 4a: Reading the Auction Update

When an auction begins, the server broadcasts an auction envelope containing the feed values out to the `oev/feeds` topic.

**Server Message Format:**

```json
{
  "op": "auction",
  "id": "e9803b9f-4318-4dc0-811d-23f2f0b938f2",
  "timestamp": 1726058300000,
  "durationMs": 400,
  "payload": {
    "ETH": "250000000000",
    "BTC": "6000000000000",
    "USDC": "99878787"
  }
}
```

- The solver uses the stringified token amounts inside `payload` to compute potential, profitable collateral/borrow pair liquidations.
- All feed values are sent using 8 decimal places - e.g. `97878787` = `0.97878787`; `61695002950` = `616.9500295`, etc.

### Step 4b: Auction Timeout Rules

- You must compute liquidations locally and return your bid **within the defined timeout window** (`durationMs` field - e.g. `400ms`).
- Responses received after the server's tracking timeout will be immediately discarded.

### Step 4c: Submitting the Liquidation Payload

When the external solver identifies a liquidation opportunity using the feeds, it constructs and sends a **Solve Message** back to the Auctioneer.

**WARNING**: Submission of failing transaction could lead to deposit slashing and account blacklisting.

**Expected Solver Response Format:**

```json
{
  "op": "solve",
  "id": "e9803b9f-4318-4dc0-811d-23f2f0b938f2",
  "data": {
    "bid": "10000000000",
    "nonce": "1",
    "operationCallback": "0x...",
    "operationData": "0x...",
    "liquidationSig": "0x...",
    "maxTxGasPrice": "1000000"
  }
}
```

### Step 4d: Payload Preparation & Signature Generation

The `operationData` and `liquidationSig` parameters in your response must be cryptographically encoded and signed.

#### Encoding `operationData`

The `operationData` parameter acts as an opaque payload. Its format is entirely up to you (the external solver) and your chosen `operationCallback` smart contract. You may ABI-encode any custom variables, targets, or operational instructions your contract needs to successfully execute the liquidations.

The RedStone system simply passes this encoded payload directly to your callback contract.

**Example Custom Encoding:**

```javascript
// This format is purely arbitrary based on your callback contract's needs
const operationData = ethers.AbiCoder.defaultAbiCoder().encode(
  ["tuple(bytes32 marketId, address borrower, uint256 minProfit)[]"],
  [myLiquidationTargets],
);
```

Ensure the final `operationData` output is passed as a standard hex string (e.g., `"0x..."`) in the JSON response.

#### Generating `liquidationSig`

1. First, hash your encoded `operationData` output:
   ```javascript
   const operationDataHash = ethers.keccak256(operationData);
   ```
2. Prepare the primary authentication payload. Use ABI standard encoding across these 7 fields:

   ```javascript
   const types = [
     "string", // "EXECUTOR_V6"
     "uint256", // network chainId
     "address", // your operationCallback (solver contract address)
     "bytes32", // keccak256(operationData)
     "uint256", // bidAmount in Wei
     "uint256", // strictly ascending nonce for replay protection
     "uint256", // maxTxGasPrice limit
   ];

   const values = [
     "EXECUTOR_V6",
     chainId,
     solverContractAddress,
     operationDataHash,
     bidAmount,
     nonce,
     maxGasPrice,
   ];

   const encodedData = ethers.AbiCoder.defaultAbiCoder().encode(types, values);
   ```

3. Take the keccak256 hash of this `encodedData` payload, and sign it using your Solver wallet:

   ```javascript
   const messageHash = ethers.keccak256(encodedData);
   const liquidationSig = await wallet.signMessage(
     ethers.getBytes(messageHash),
   );
   ```

   The wallet signing the transaction must be the one that has the deposit on the Executor contract.

## 5. The `operationCallback` Smart Contract

The `operationCallback` address you provide in your response **must** be a smart contract that implements the Executor's `IOperationCallback` interface.

During settlement, the RedStone Executor contract will invoke your contract's `liquidate` function, passing down the encoded `operationData` you provided. Immediately after your `liquidate` routine finishes, the Executor will invoke `payBid` expecting your contract to transfer the native ETH `bidAmount` back to it.

Here is a Solidity template to base your solver upon:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

interface IOperationCallback {
    function liquidate(uint256 bidAmount, address solver, bytes calldata operationData) external;
    function payBid(uint256 bidAmount) external;
}

contract BaseSolver is IOperationCallback {
    address public immutable executor; //

    constructor(address _executor) {
        executor = _executor;
    }

    modifier onlyExecutor() {
        require(msg.sender == executor, "Only Executor");
        _;
    }

    /// @notice Core hook invoked by the Executor to perform liquidations
    function liquidate(
        uint256 bidAmount,
        address solver,
        bytes calldata operationData
    ) external override onlyExecutor {
        // 1. Decode your arbitrarily formatted `operationData`
        // e.g., (Target[] memory targets) = abi.decode(operationData, (...));

        // 2. Execute your liquidations on the underlying markets
        // 3. Swap seized collateral back to native HYPE to secure your profit
    }

    /// @notice Invoked by the Executor immediately after `liquidate()` to claim the bid
    function payBid(uint256 bidAmount) external override onlyExecutor {
        // Send the exact strictly negotiated OEV bid amount in native HYPE
        // back to the Executor. The Executor tracks this via its receive() hook.
        (bool success, ) = payable(executor).call{value: bidAmount}("");
        require(success, "Failed to pay bid");
    }

    // Required to receive unwrapped native HYPE securely into this contract.
    // When swapping seized collateral back to HYPE via DEX routers (e.g. Hyperswap),
    // the router natively transfers the final HYPE output back to this address.
    // Without `receive()` and/or `fallback()`, those underlying token swaps will revert.
    receive() external payable {}
    fallback() external payable {}
}
```

## 6. The Bidding & Settlement Mechanism

1. **Resolution phase**: After the `timeoutMs` window expires, the Auctioneer terminates the auction loop and groups all valid solvers who responded to that unique `id`.
2. **Comparison**: Responses are sorted strictly by `data.bid` in descending order.
3. **Execution**: The greatest absolute bid (in terms of formatEther representation) is automatically prioritized, the remote payload `operationData` and `liquidationSig` are forwarded to the RedStone OEV Executor contract for liquidation execution.

## 7. Examples

The subscription example is available [here](https://github.com/redstone-finance/redstone-evm-examples/tree/main/oev) .
