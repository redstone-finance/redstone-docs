---
sidebar_position: 3
sidebar_label: "How to use in TypeScript"
---

# How to use in TypeScript

1. Read firstly the docs from [How to start](../) section
2. See how to [connect to the contract/component](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/stellar-connector#-connecting-to-the-contract) in the TypeScript layer
3. The full source of the package is available [here](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/stellar-connector/src)

The **info described there** is mostly **NOT REPEATED below**.

## Dependencies

1. Use the following dependencies to embed _RedStone Stellar Connector_ into TypeScript.

```json
{
  dependencies: {
     ...
    "@redstone-finance/stellar-connector": "0.8.0",
     ...
  }
}
```

## Using the PriceAdapter package with `@redstone-finance/stellar-connector`

### Deploying package

```shell
yarn sample-deploy
```

1. The package can be deployed by using the above command, defined [here](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/stellar-connector/scripts/sample_deploy.ts).
2. The deployed `package.stokenet.addr` address can be found in the `scrypto/price_adapter` directory.
3. The script uses [`StellarPackageDeployer`](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/stellar-connector/scripts/StellarPackageDeployer.ts)
   with the [`@atlantis-l/stellar-tool`](https://github.com/atlantis-l/Stellar-Desktop-Tool) package under the hood,
   as the Stellar Desktop Tool uses.

### Instantiating component

```shell
yarn sample-instantiate
```

1. The component can be instantiated by using the above command, defined [here](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/stellar-connector/scripts/sample_instantiate_price_adapter.ts).
2. The deployed `component.stokenet.addr` address can be found in the `scrypto/price_adapter` directory.
3. The script uses [`PriceAdapterStellarContractDeployer`](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/stellar-connector/src/contracts/price_adapter/PriceAdapterStellarContractDeployer.ts).

### Sample run

```shell
yarn sample-run
```

1. The sample scenario can be run by using the above command, defined [here](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/stellar-connector/scripts/sample_run.ts).
2. The script uses [`PriceAdapterStellarContractConnector`](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/stellar-connector//src/contracts/price_adapter/PriceAdapterStellarContractConnector.ts).
