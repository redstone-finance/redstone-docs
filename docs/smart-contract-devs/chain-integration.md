---
sidebar_position: 8
sidebar_label: "⛓ Chains integration"
---

# ⛓ Chains integration

## EVM-compatible chains

RedStone Oracles can be integrated with EVM-compatible chains out of the box thanks to the [evm-connector](https://docs.redstone.finance/docs/smart-contract-devs/getting-started#usage). Examples of the chains tested by our team can be found [here](https://showroom.redstone.finance/).

If you want to test your chain there is example contract and script which can be found [here](https://github.com/redstone-finance/redstone-showroom/tree/main/example). You need to follow two steps:

1. Deploy integration example contract to your chain
2. Fill missing parameters and run a example Typescript script that does the following things:
	- fetch data from the decentralized cache layer,
  - add signed price data to transaction data,
  - interact with contract and receive price data.

You should be able to see price data logged to the console.

## Non EVM-compatible chains

Currently, we support mainly EVM-compatible chains. Our team developed an [evm-connector](https://docs.redstone.finance/docs/smart-contract-devs/getting-started#usage) that makes RedStone Oracles integrated with them out of the box.

There are examples of other connectors implemented by the community or developers from a specific chain. One of the can be seen [here](https://stacks.org/redstone). 

We encourage you to build your own connectors.