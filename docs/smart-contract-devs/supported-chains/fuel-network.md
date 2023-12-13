---
sidebar_position: 1
sidebar_label: "⚡ Fuel Network"
---

# ⚡ Fuel Network

## Connecting to the contract

To connect to the base Prices oracle contract you need to import the connector code to your project

```ts
// Typescript
import {FuelPricesContractConnector} from "@redstone-finance/fuel-connector";
import {ContractParamsProvider} from "redstone-sdk";

// Javascript
const {FuelPricesContractConnector} = require("@redstone-finance/fuel-connector");
const {ContractParamsProvider} = require("redstone-sdk");
```

Then you can invoke contract methods described above pointing to the
selected [RedStone data service](https://app.redstone.finance) and requested data feeds.

```ts
const prices = new FuelPricesContractConnector(yourWalletOrProvider, yourContractAddress);

const paramsProvider = new ContractParamsProvider({
  dataServiceId: "redstone-main-demo",
  uniqueSignersCount: 1,
  dataFeeds: ["ETH", "BTC"]
});

```

The `yourWalletOrProvider` param is needed to be passed for testnet usage. For the local network it can remain
undefined.

Now you can access any of the contract's methods by invoking the code:

```ts
(await prices.getAdapter()).getPricesFromPayload(paramsProvider);
(await prices.getAdapter()).writePricesFromPayloadToContract(paramsProvider);
(await prices.getAdapter()).readPricesFromContract(paramsProvider);
(await prices.getAdapter()).readTimestampFromContract();

```

### Installing the dependencies

```bash
yarn install
```

## Writing your own contract 

The more detailed tutorial of connecting the layers you can find here: https://github.com/redstone-finance/redstone-fuel-dex-tutorial

### Using of the RedStone sway SDK

#### Setting up the environment

The library versioned as `0.2.1-pre` is written in sway `0.35.5` and works the fuel-core in version `0.17.11`.
To use the library, set up your `Forc.toml` file with the following code:

```toml title='Forc.toml'
[project]
# ...
forc-version = "0.35.0"
# ...

[dependencies]
redstone = { git = "https://github.com/redstone-finance/redstone-fuel-sdk", tag = "0.2.1-pre" }
```

The `redstone` sway library is responsible for checking the integrity and for returning the aggregated values of feeds.
The whole RedStone payload format is described [here](../how-it-works#data-packing-off-chain-data-encoding), but don't worry, the [RedStone Fuel Connector](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/fuel-connector)
provides all required structures to fetch and pass the data the decentralised cache layer, which is powered by RedStone light cache gateways and streamr data broadcasting protocol.

See here, [💡 How it works](../how-it-works)

#### Processing RedStone payload

To process the passed RedStone payload, some definitions are needed to be placed at the top of your `.sw` file:

```rust title='example.sw'
use std::{
    b256::*,
    block::timestamp,
    bytes::Bytes,
    logging::log,
    storage::{
        get,
        StorageVec,
    },
    u256::{
        U256,
    },
    vec::Vec,
};
```

To configure the library let's create a small wrapper for `redstone::Config` struct. Add the following lines to the file:

```rust
use redstone::{config::Config, processor::process_input};

impl Config {
    pub fn base(feed_id: U256, allowed_signer: b256) -> Config {
        let mut feed_ids: Vec<U256> = Vec::new();
        feed_ids.push(feed_id);

        let mut signers: Vec<b256> = Vec::new();
        signers.push(allowed_signer);

        let config = Config {
            feed_ids,
            signers,
            signer_count_threshold: 1,
            block_timestamp: get_block_timestamp(),
        };

        return config;
    }
}
```

The Fuel timestamp is in `TAI64` format, but the `redstone` library requires it in `Unix` format - so there's needed a small transform for that:

```rust
fn get_block_timestamp() -> u64 {
    timestamp() - (10 + (1 << 62))
}
```

Next, we'll define a function checking the integrity and aggregating the `ETH` feed price.

```rust
const ETH_FEED_ID = U256::from((0, 0, 0, 0x455448));
const SIGNER_ADDRESS = 0x00000...abcdef;

fn get_eth_price(payload: Vec<u64>) -> U256 {
    let config = Config::base(ETH_FEED_ID, SIGNER_ADDRESS);

    let mut payload_bytes = Bytes::new();
    let mut i = 0;
    while (i < payload.len) {
        payload_bytes.push(payload.get(i).unwrap());

        i += 1;
    }
    let (aggregated_values, _) = process_input(payload_bytes, config);

    aggregated_values.get(0).unwrap()
}
```

To connect the interface, follow the steps described in the Dex tutorial: https://github.com/redstone-finance/redstone-fuel-dex-tutorial.