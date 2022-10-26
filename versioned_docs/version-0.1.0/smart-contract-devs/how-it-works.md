---
sidebar_position: 2
sidebar_label: "💡 How it works?"
---

# 💡 How it works

## Storage-less approach

Putting data directly into storage is the easiest to make information accessible to smart contracts. However, the convenience comes at a high price, as the storage access is the most costly operation in [EVM](https://ethereum.github.io/yellowpaper/paper.pdf) (20k gas for 256bit word ~ $160k for 1Mb checked 30/08/2021) making it prohibitively expensive to use.

That's why, Redstone proposes a completely new storage-less approach.

At a top level, transferring data to an EVM environment requires packing an extra payload to a user's transaction and processing the message on-chain.

[![image.png](https://i.postimg.cc/5NZSqtFT/image.png)](https://postimg.cc/xc3m9n53)

### Data packing (off-chain data encoding)

1. Relevant data needs to be fetched from the decentralized cache layer, powered by the [streamr network](https://streamr.network/) and the RedStone light cache nodes
2. Data is packed into a message according to the following structure

![redstone-tx-payload-improved-2](https://user-images.githubusercontent.com/48165439/196044365-8cb3e020-56f4-46cd-b058-105772aca3a5.png)

<!---
- `TX_PAYLOAD` = `[DATA_PACKAGES][UNSIGNED_METADATA]`
  - `UNSIGNED_METADATA` = `[ANY_MESSAGE][MESSAGE_BYTE_SIZE:3b][REDSTONE_MARKER:9b]`
    - `REDSTONE_MARKER` = `0x000002ed57011e0000`
  - `DATA_PACKAGES` = `[DATA_PACKAGE[0]]..[DATA_PACKAGE[N]][NUMBER_OF_DATA_PACKAGES:2b]`
    - `DATA_PACKAGE` = `[DATA_POINTS][TIMESTAMP:6b][DATA_POINT_VALUE_BYTE_SIZE:4b][DATA_POINTS_COUNT:3b][SIGNATURE:65b]`
      - `DATA_POINT` = `[DATA_POINT_VALUE][DATA_FEED_ID:32b]`
-->

3. The package is appended to the original transaction message, signed and submitted to the network

_All of the steps are executed automatically by the ContractWrapper and transparent to the end-user_

### Data unpacking (on-chain data verification)

1. The appended data packages are extracted from the `msg.data`
2. For each data package we:
   - Verify if the signature was created by trusted provider
   - Validate the timestamp, checking if the information is not obsolete
3. Then, for each requested data feed we:
   - Calculate the number of received unique signers
   - Extract value for each unique signer
   - Calculate the aggregated value (median by default)

_This logic is executed in the on-chain environment and we optimised the execution using a low-level assembly code to reduce gas consumption to the absolute minimum_

## On-chain aggregation

To increase the security of the Redstone oracle system, we've created the on-chain aggregation mechanism. This mechanism adds an additional requirement of passing at least X signatures from different authorised data providers for a given data feed. The values of different providers are then aggregated before returning to a consumer contract (by default, we use median value calculation for aggregation). This way, even if some small subset of providers corrupt (e.g. 2 of 10), it should not significantly affect the aggregated value.

There are the following on-chain aggregation params in Redstone consumer base contract:

- `uniqueSignersThreshold` value
- `getAuthorisedSignerIndex` function
- `aggregateValues` function (for numeric values)
- `aggregateByteValues` function (for bytes arrays)

## Types of values

We support 2 types of data to be received in contract:

1. Numeric 256-bit values (used by default)
2. Bytes arrays with dynamic size

## Security considerations

- Do not modify the `uniqueSignersThreshold` variable, unless you are 100% sure about it
- Pay attention to the timestamp validation logic. For some use-cases (e.g. synthetic DEX), you would need to cache the latest values in your contract storage to avoid arbitrage attacks
- Enable secure upgradability mechanism for your contract (ideally based on multi-sig or DAO)
- Monitor the Redstone data services registry and quickly modify signer authorisation logic in your contracts in case of changes (we will also notify you if you are a paying client)

## Recommendations

- Try to design your contracts in a way where you don't need to request many data feeds in the same transaction
- Use ~10 required unique signers for a good balance between security and gas cost efficiency

## Benchmarks

You can check the benchmarks script and reports [here.](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/evm-connector/benchmarks)

### Gas report for 1 unique signer:

```js
{
  "1 data feed": {
    "attaching to calldata": 1840,
    "data extraction and validation": 10782
  },
  "2 data feeds": {
    "attaching to calldata": 3380,
    "data extraction and validation": 18657
  },
  "10 data feeds": {
    "attaching to calldata": 15832,
    "data extraction and validation": 95539
  },
}
```

### Gas report for 10 unique signers:

```js
{
  "1 data feed": {
    "attaching to calldata": 15796,
    "data extraction and validation": 72828
  },
  "2 data feeds": {
    "attaching to calldata": 31256,
    "data extraction and validation": 146223
  },
  "10 data feeds": {
    "attaching to calldata": 156148,
    "data extraction and validation": 872336
  },
  "20 data feeds": {
    "attaching to calldata": 313340,
    "data extraction and validation": 2127313
  }
}
```
