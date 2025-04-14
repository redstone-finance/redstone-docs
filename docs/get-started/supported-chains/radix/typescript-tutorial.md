---
sidebar_position: 3
sidebar_label: "How to use in TypeScript"
---

# How to use in TypeScript

1. Read firstly the docs from [How to start](../) section
2. See how to [connect to the contract/component](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/radix-connector#-connecting-to-the-contract) in the TypeScript layer
3. The full source of the package is available [here](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/radix-connector/src)

The **info described there** is mostly **NOT REPEATED below**.

## Dependencies

1. Use the following dependencies to embed _RedStone Radix Connector_ into TypeScript.

```json
{
  dependencies: {
     ...
    "@redstone-finance/radix-connector": "0.8.0",
     ...
  }
}
```

## Using the PriceAdapter package with `@redstone-finance/radix-connector`

### Deploying package

```shell
yarn sample-deploy
```

1. The package can be deployed by using the above command, defined [here](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/radix-connector/scripts/sample_deploy.ts).
2. The deployed `package.stokenet.addr` address can be found in the `scrypto/price_adapter` directory.
3. The script uses [`RadixPackageDeployer`](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/radix-connector/scripts/RadixPackageDeployer.ts)
   with the [`@atlantis-l/radix-tool`](https://github.com/atlantis-l/Radix-Desktop-Tool) package under the hood,
   as the Radix Desktop Tool uses.

### Instantiating component

```shell
yarn sample-instantiate
```

1. The component can be instantiated by using the above command, defined [here](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/radix-connector/scripts/sample_instantiate_price_adapter.ts).
2. The deployed `component.stokenet.addr` address can be found in the `scrypto/price_adapter` directory.
3. The script uses [`PriceAdapterRadixContractDeployer`](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/radix-connector/src/contracts/price_adapter/PriceAdapterRadixContractDeployer.ts)

### Sample run

```shell
yarn sample-run
```

1. The sample scenario can be run by using the above command, defined [here](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/radix-connector/scripts/sample_run.ts).
2. The script uses [`PriceAdapterRadixContractConnector`](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/radix-connector//src/contracts/price_adapter/PriceAdapterRadixContractConnector.ts)
