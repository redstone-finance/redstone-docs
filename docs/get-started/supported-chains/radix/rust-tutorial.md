---
sidebar_position: 2
sidebar_label: "How to use in Rust/Scrypto"
---

# Scrypto component—how it is built

1. Read firstly the docs from [How to start](../) section
2. See how to [set up local scrypto environment](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/radix-connector/scrypto/README.md)
3. Read the [general philosophy of the on-ledger component](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/radix-connector/scrypto/price_adapter/README.md)
4. The full source of the component is available [here](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/radix-connector/scrypto/price_adapter)
5. See the [docs of the _RedStone Rust SDK_](https://docs.redstone.finance/rust/redstone/crypto_radix,network_radix/redstone/index.html) - the component is built on

The **info described there** is mostly **NOT REPEATED below**.

## Dependencies

1. Use the following dependencies to embed _RedStone Rust SDK_ into Scrypto.

```toml
[dependencies]
scrypto = { version = "1.3.0" }
redstone = { git = "https://github.com/redstone-finance/rust-sdk", tag = "2.0.0", default-features = false, features = ["radix"] }
```

## Instantiating & Storage

Some of the values are necessary to be stored inside the component during its instantiating.
Also, for the [Push model](#push-model), the values and timestamp are stored in the component.

```rust
#[blueprint]
mod price_adapter {
    struct PriceAdapter {
        signer_count_threshold: u8,
        signers: Vec<Vec<u8>>,
        prices: HashMap<Vec<u8>, RedStoneValue>,
        timestamp: u64,
    }

    impl PriceAdapter {
        pub fn instantiate(
            signer_count_threshold: u8,
            allowed_signer_addresses: Vec<Vec<u8>>,
        ) -> Global<PriceAdapter> {
            let addresses: Vec<SignerAddress> = allowed_signer_addresses
                .iter()
                .map(|signer| (signer.clone()).into())
                .collect();

            verify_signers_config(addresses.as_slice(), signer_count_threshold).unwrap_or_else(|err| panic!("{}", err));

            Self {
                signer_count_threshold,
                signers: allowed_signer_addresses,
                prices: hashmap!(),
                timestamp: 0,
            }
                .instantiate()
                .prepare_to_globalize(OwnerRole::None).
                globalize()
        }
    }
}
```

## Using the _RedStone Rust SDK_

### Payload processing

1. The payload bytes should be defined as described [here](https://docs.redstone.finance/img/payload.png).
2. The payload can be generated as described [here](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/radix-connector/scrypto/README.md#preparing-sample-data).

To process the payload data, the following command should be used inside the `#[blueprint]`.

```rust
use redstone::{
    core::{config::Config, ProcessorResult, },
    radix::RadixRedStoneConfig,
    Value as RedStoneValue,
    contract::verification::*,
    SignerAddress
};
```

The function processes on-chain the payload passed as an argument and returns an array of aggregated values of each feed passed as an identifier inside feed_ids, and a timestamp related to the payload data packages.

```rust
fn process_payload(
    &mut self,
    feed_ids: Vec<Vec<u8>>,
    payload: Vec<u8>,
) -> (u64, Vec<RedStoneValue>) {
    let result = Self::try_process_payload(
        Self::get_current_time(),
        self.signer_count_threshold,
        self.signers.clone(),
        feed_ids,
        payload,
        None,
        None,
    )
        .unwrap_or_else(|err| panic!("{}", err));

    (result.timestamp.as_millis(), result.values)
}

fn try_process_payload(
    block_timestamp: u64,
    signer_count_threshold: u8,
    signers: Vec<Vec<u8>>,
    feed_ids: Vec<Vec<u8>>,
    payload: Vec<u8>,
    max_timestamp_delay_ms: Option<u64>,
    max_timestamp_ahead_ms: Option<u64>,
) -> ProcessorResult {
    let config: RadixRedStoneConfig = Config::try_new(
        signer_count_threshold,
        signers.into_iter().map(|id| id.into()).collect(),
        feed_ids.into_iter().map(|id| id.into()).collect(),
        block_timestamp.into(),
        max_timestamp_delay_ms.map(|v| v.into()),
        max_timestamp_ahead_ms.map(|v| v.into()),
    )?
        .into();

    redstone::core::process_payload(&config, payload)
}

```

#### Config

The `Config` structure is described [here](https://docs.redstone.finance/rust/redstone/rust_sdk_2/redstone/core/config/struct.Config.html)

For safety reasons, the allowed `signers` and `signer_count_threshold` should be embedded in the component as defined above.

#### Current timestamp

Also, the current timestamp in milliseconds is necessary to be passed as the `block timestamp` parameter:

```rust
use scrypto::prelude::*;

pub fn get_current_time() -> u64 {
    let rtn = ScryptoVmV1Api::object_call(
        CONSENSUS_MANAGER.as_node_id(),
        CONSENSUS_MANAGER_GET_CURRENT_TIME_IDENT,
        scrypto_encode(&ConsensusManagerGetCurrentTimeInputV2 {
            precision: TimePrecisionV2::Second,
        })
        .unwrap(),
    );

    let instant: Instant = scrypto_decode(&rtn).unwrap();

    instant.seconds_since_unix_epoch as u64
}
```

#### Errors

The possible errors thrown during the payload processing can be found [here](https://docs.redstone.finance/rust/redstone/rust_sdk_2/redstone/network/error/enum.Error.html)

## Pull model

To use the pull model, just invoke the `process_payload` function and return the value.

```rust
pub fn get_prices(
    &mut self,
    feed_ids: Vec<Vec<u8>>,
    payload: Vec<u8>,
) -> (u64, Vec<RedStoneValue>) {
    self.process_payload(feed_ids, payload)
}
```

## Push model

For the Push model, invoke the `process_payload` function and save the value inside storage.

```rust
pub fn write_prices(
    &mut self,
    feed_ids: Vec<Vec<u8>>,
    payload: Vec<u8>,
) -> (u64, Vec<RedStoneValue>) {
    let (payload_timestamp, values) = self.process_payload(feed_ids.clone(), payload);

    UpdateTimestampVerifier::Untrusted.verify_timestamp(
        Self::get_current_time().into(),
        None,
        0.into(),
        self.timestamp.into(),
        payload_timestamp.into(),
    ).unwrap_or_else(|err| panic!("{}", err));

    self.timestamp = payload_timestamp;
    self.prices = feed_ids
        .iter()
        .zip(values.clone())
        .map(|(feed_id, value)|  (feed_id.clone(), value))
        .collect();

    (payload_timestamp, values)
}
```

Then the values can be read by using

```rust
pub fn read_prices(&mut self, feed_ids: Vec<Vec<u8>>) -> Vec<RedStoneValue> {
    feed_ids
        .iter()
        .map(|feed_id| self.read_price(feed_id.clone()))
        .collect()
}
```

or

```rust
pub fn read_price(&mut self, feed_id: Vec<u8>) -> RedStoneValue {
    *self.prices.get(&feed_id).unwrap()
}
```
