---
sidebar_position: 4
sidebar_label: "💹 Redstone Classic"
---

# 💹 Classic Model - pushing feeds on chain


Although the on-demand fetching model is more efficient and scalable we acknoledge that 
some protocols may prefer to stick to a traditional design when data is pushed on-chain. 
This setup could be resonable if: 
- There is existing well-audited codebase and the team prefers not to make even tiny ammendments 
- The protocol is deployed on private network or a chain where the gas costs are minimal
- The prices don't need to be updated too frequently

:::info
Even though RedStone oracles can be adapted to a push model, our modular design still gives
you much advantage by having the decisive voice on when and how the price is updated. 
:::

## How it works

The model consists of two main parts. The first one is the off-chain [relayer](#relayer) responsible for pushing data on-chain in a customized way using [environment variables](#environment-variables). The second part are the on-chain [contracts](#contracts) which enable storing prices and getting them through a familiar interface (e.g. the [Chainlink Aggregotor] (https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol) ).

![Redstone Classic diagram](/img/redstone-classic.png)

### Relayer

The relayer is a service which works in a customizable way based on [environment variables](#environment-variables). It periodically checks a defined set of conditions, pushing the prices when they are satisfied. It is possible to pass multiple conditions to the `UPDATE_CONDITIONS`, then relayer will work in the manner that if any conditions are met prices would be updated. Currently, two conditions are implemented:

- `time` condition described by `UPDATE_PRICE_INTERVAL` variable in milliseconds, which states how often prices should be updated (aka heartbeat), [code](./src/core/update-conditions/time-condition.ts)

- `value-deviation` condition described by `MIN_DEVIATION_PERCENTAGE` variable which indicates how much value should change in order to trigger the price update, [code](./src/core/update-conditions/value-deviation-condition.ts)

### Contracts

The on-chain relayer is based on is the [PriceFeedsAdapter contract](./contracts/price-feeds/PriceFeedsAdapter.sol) which is responsible for:

- storing all price feeds symbols (mappings to RedStone dataFeedId),
- storing price feeds values,
- updating price feeds values in batch,
- storing information regarding the round number and timestamp of the last update,
- getting prices for multiple feeds values in a single call.

Additionally, if the protocol wants to be 100% compatible with the Chainlink PriceFeed architecture, it's possible to deploy additional [PriceFeed](./contracts/price-feeds/PriceFeed.sol) contracts to mimic this solution.

### Environment variables

| Variable                   | Description                                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RELAYER_ITERATION_INTERVAL | Time interval in which the relayer tries to update prices                                                                                                                                                                                   |
| UPDATE_CONDITIONS          | Array of parameters which describes what decides if prices can be updated, currently acceptable parameters are 'time' and 'value-deviation'                                                                                                 |
| UPDATE_PRICE_INTERVAL      | Time interval which describes how often prices should be updated if UPDATE_CONDITIONS contains "time" parameter                                                                                                                             |
| MIN_DEVIATION_PERCENTAGE   | Minimum deviation of the prices which triggers prices update if UPDATE_CONDITIONS contains "value-deviation"                                                                                                                                |
| RPC_URL                    | URL of RPC for interaction with blockchain                                                                                                                                                                                                  |
| CHAIN_NAME                 | Chain name of the blockchain relayer should work on                                                                                                                                                                                         |
| CHAIN_ID                   | Chain id of the blockchain relayer should work on                                                                                                                                                                                           |
| PRIVATE_KEY                | Private key of the wallet with funds on a proper network to push prices to the price feed contract                                                                                                                                          |
| ADAPTER_CONTRACT_ADDRESS   | Address of the adapter contract deployed on a proper network                                                                                                                                                                                |
| DATA_SERVICE_ID            | RedStone Wrapper parameter which describes what data services should be used to fetch the price, more can be found [here](https://docs.redstone.finance/docs/smart-contract-devs/getting-started#2-adjust-javascript-code-of-your-dapp)     |
| UNIQUE_SIGNERS_COUNT       | RedStone Wrapper parameter which describes how many unique signer should sign price data, more can be found [here](https://docs.redstone.finance/docs/smart-contract-devs/getting-started#2-adjust-javascript-code-of-your-dapp)            |
| DATA_FEEDS                 | RedStone Wrapper parameter which describes what tokens will be used, more can be found [here](https://docs.redstone.finance/docs/smart-contract-devs/getting-started#2-adjust-javascript-code-of-your-dapp)                                 |
| CACHE_SERVICE_URLS         | RedStone Wrapper parameter which describes what cache services URLs will be used to fetch the price, more can be found [here](https://docs.redstone.finance/docs/smart-contract-devs/getting-started#2-adjust-javascript-code-of-your-dapp) |
| GAS_LIMIT                  | Gas limit used to push data to the price feed contract                                                                                                                                                                                      |

Examples of environment variables already working can be found [here](./deployed-config/).
