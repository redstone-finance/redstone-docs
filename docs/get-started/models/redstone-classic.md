---
sidebar_position: 2
sidebar_label: "🏛 Classic (push model)"
---

# 🏛 Classic Model
## Pushing feeds on chain


Although the pure on-demand fetching model ([RedStone Core](./redstone-core.mdx)) is more efficient and scalable we acknowledge that some protocols may prefer to stick to a traditional design when data is pushed on-chain. This setup could be reasonable if:
- There is an existing well-audited codebase and the team prefers not to make even tiny amendments 
- The protocol is deployed on a private network or a chain where the gas costs are minimal
- The prices don't need to be updated too frequently

:::info
RedStone Classic has a significant advantage over traditional push Oracles. Our modular design gives you a decisive voice on when and how the price is updated (with other Oracles you have to accept dictated parameters).
:::

## How RedStone Classic works

This approach is built on top of the [RedStone Core](./redstone-core.mdx) model maintaining the security of on-chain validation of data providers and timestamps. 

The model consists of two main parts. The first one is the off-chain [relayer](#relayer) responsible for pushing data on-chain in a customized way using [environment variables](#environment-variables). The second part is the on-chain [contracts](#contracts) which enable storing prices and getting them through a familiar interface (e.g. the [Chainlink Aggregator](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.7/interfaces/AggregatorV3Interface.sol) ). RedStone Classic can be used on all EVM-compatible L1s & L2s + Starknet + Fuel Network.

![RedStone Classic diagram](/img/redstone-classic.png)

### Relayer

The relayer is a service that works in a customizable way based on [environment variables](#environment-variables). It periodically checks a defined set of conditions, pushing the prices when they are satisfied. It is possible to pass multiple conditions to the `UPDATE_CONDITIONS`, then the relayer will work in the manner that if any conditions are met prices would be updated. Currently, two conditions are implemented:

- a `time` condition described by `UPDATE_PRICE_INTERVAL` variable in milliseconds, which states how often prices should be updated (aka heartbeat), [code](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/on-chain-relayer/src/core/update-conditions/time-condition.ts)

- a `value-deviation` condition described by `MIN_DEVIATION_PERCENTAGE` variable which indicates how much value should change in order to trigger the price update, [code](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/on-chain-relayer/src/core/update-conditions/value-deviation-condition.ts).

:::info
Relayers are permissionless and anyone could run the service as the data is eventually validated on-chain using conditions defined by the protocol stakeholders. Moreover, the relayers are designed to work in parallel and we recommend having multiple (ideally independent) instances to mitigate the risks of a single point of failure and censorship.  
:::

### Contracts

The on-chain relayer is based on the [PriceFeedsAdapter contract](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/on-chain-relayer/contracts/core/RedstoneAdapterBase.sol) which is responsible for:

- storing all price feeds' symbols (mappings to RedStone dataFeedId),
- storing price feeds values,
- updating price feeds values in batch,
- storing information regarding the round number and timestamp of the last update,
- getting prices for multiple feeds' values in a single call.

Additionally, if the protocol wants to be 100% compatible with the Chainlink PriceFeed architecture, it's possible to deploy additional [PriceFeed](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/on-chain-relayer/contracts/price-feeds/PriceFeedBase.sol) contracts to mimic this solution.

### Example of usage

Price from RedStone can be obtained in multiple way. Here are examples how to read data feeds:

#### Solidity

Read price from Price Feed contract

```
// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SimplePriceFeedConsumer {
  AggregatorV3Interface private priceFeed;
  int256 public latestSavedPrice;

  constructor(AggregatorV3Interface priceFeed_) {
    priceFeed = priceFeed_;
  }

  function doSomethingWithPrice() public {
    (, int256 price, , , ) = priceFeed.latestRoundData();

    // We can do whatever logic with the price
    // In this example, we just save it in a storage variable
    latestSavedPrice = price;
  }
}
```

Read price directly from Price Feeds Adapter

```
// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.4;

import "@redstone-finance/on-chain-relayer/contracts/core/IRedstoneAdapter.sol";

contract SimplePriceFeedsAdapterConsumer {
  IRedstoneAdapter private priceFeedsAdapter;
  uint256 public latestSavedPrice;

  constructor(IRedstoneAdapter priceFeedsAdapter_) {
    priceFeedsAdapter = priceFeedsAdapter_;
  }

  function doSomethingWithPrice() public {
    uint256 price = priceFeedsAdapter.getValueForDataFeed();

    // We can do whatever logic with the price
    // In this example, we just save it in a storage variable
    latestSavedPrice = price;
  }
}
```

#### Javascript

Read price from Price Feed contract

```
import { ethers, getDefaultProvider } from "ethers";

const aggregatorV3InterfaceAbi = [
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const provider = getDefaultProvider();
const address = "0x0000000000000000000000000000000000000000";
const priceFeed = new Contract(address, aggregatorV3InterfaceAbi, provider);
const lastRoundData = await priceFeed.latestRoundData();
```

Read price directly from Price Feeds Adapter

```
import { ethers, getDefaultProvider, utils } from "ethers";

const priceFeedsAdapterAbi = [
  {
    inputs: [{ internalType: "bytes32", name: "dataFeedId", type: "bytes32" }],
    name: "getValueForDataFeed",
    outputs: [
      { internalType: "uint256", name: "dataFeedValue", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  };
]

const provider = getDefaultProvider();
const address = "0x0000000000000000000000000000000000000000";
const priceFeedsAdapter = new Contract(address, priceFeedsAdapterAbi, provider);
const dataFeedId = "ETH";
const dataFeedIdAsBytes32 = utils.convertStringToBytes32(dataFeedId);
const lastRoundData = await priceFeed.getValueForDataFeed(dataFeedIdAsBytes32);
```
