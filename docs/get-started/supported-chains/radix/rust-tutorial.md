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
redstone = { git = "https://github.com/redstone-finance/rust-sdk", tag = "1.2.0", features = ["crypto_radix", "network_radix"] }
```

## Instantiating & Storage

Some of the values are necessary to be stored inside the component during its instantiating.
Also, for the [Push model](#push-model), the values and timestamp are stored in the component.

```rust
#[blueprint]
mod price_adapter {
    struct PriceAdapter {
        signer_count_threshold: u8,
        signers: Vec<Bytes>,
        prices: HashMap<U256Digits, U256Digits>,
        timestamp: u64,
    }

    impl PriceAdapter {
        pub fn instantiate(
            signer_count_threshold: u8,
            allowed_signer_addresses: Signers,
        ) -> Global<PriceAdapter> {
            allowed_signer_addresses.len().assert_or_revert(
                |&v| v > 0usize,
                |_| Error::contract_error(PriceAdapterError::SignersMustNotBeEmpty),
            );

            signer_count_threshold.assert_or_revert(
                |&v| (v as usize) <= allowed_signer_addresses.len(),
                |&v| Error::contract_error(PriceAdapterError::WrongSignerCountThresholdValue(v)),
            );

            Self {
                signer_count_threshold,
                signers: allowed_signer_addresses,
                prices: hashmap!(),
                timestamp: 0
            }
                .instantiate()
                .prepare_to_globalize(OwnerRole::None)
                .globalize()
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
    core::{config::Config, processor::process_payload},
    network::{
        as_str::AsAsciiStr,
        assert::{Assert, Unwrap},
        error::Error,
        specific::Bytes,
    },
};
```

The function processes on-chain the payload passed as an argument and returns an array of aggregated values of each feed passed as an identifier inside feed_ids, and a timestamp related to the payload data packages.

```rust
fn process_payload(
    &mut self,
    feed_ids: Vec<U256>,
    payload: Bytes,
) -> (u64, Vec<U256Digits>) {
    let current_time = get_current_time();

    let config = Config {
        signer_count_threshold: self.signer_count_threshold,
        signers: self.signers.clone(),
        feed_ids,
        block_timestamp: current_time * 1000,
    };

    let result = process_payload(config, payload);
    let prices = result.values.iter().map(|v| v.to_digits()).collect();

    (result.min_timestamp, prices)
}
```

#### Config

The `Config` structure is described [here](https://docs.redstone.finance/rust/redstone/crypto_radix,network_radix/redstone/core/config/struct.Config.html)

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

The possible errors thrown during the payload processing can be found [here](https://docs.redstone.finance/rust/redstone/crypto_radix,network_radix/redstone/network/error/enum.Error.html#variant.ContractError)

### Converting the input and output

The following input types are defined regarding the available SBOR representation,
and it's necessary to have it converted to the types supported by RedStone Rust SDK.

```rust
use redstone::network::specific::U256;

pub type U256Digits = [u64; 4];

pub mod types {
    use redstone::network::from_bytes_repr::FromBytesRepr;

    pub type Payload = Vec<u8>;
    pub type FeedIds = Vec<Vec<u8>>;
    pub type Signers = Vec<Vec<u8>>;

    #[inline]
    pub fn convert_feed_ids(input: FeedIds) -> Vec<super::U256> {
        input
            .iter()
            .map(|bytes| super::U256::from_bytes_repr(bytes.clone()))
            .collect()
    }
}
```

## Pull model

To use the pull model, just invoke the `process_payload` function and return the value.

```rust
pub fn get_prices(
    &mut self,
    feed_ids: FeedIds,
    payload: Payload,
) -> (u64, Vec<U256Digits>) {
    self.process_payload(convert_feed_ids(feed_ids), payload)
}
```

## Push model

For the Push model, invoke the `process_payload` function and save the value inside storage.

```rust
pub fn write_prices(
    &mut self,
    feed_ids: FeedIds,
    payload: Payload,
) -> (u64, Vec<U256Digits>) {
    let converted_feed_ids = convert_feed_ids(feed_ids);
    let (payload_timestamp, values) = self.process_payload(converted_feed_ids.clone(), payload);

    payload_timestamp.assert_or_revert(
        |&ts| ts > self.timestamp,
        |_| Error::contract_error(PriceAdapterError::TimestampMustBeGreaterThanBefore),
    );

    self.timestamp = payload_timestamp;
    self.prices = converted_feed_ids
        .iter()
        .zip(values.clone())
        .map(|(key, value)| (key.to_digits(), value))
        .collect();

    (payload_timestamp, values)
}
```

Then the values can be read by using

```rust
pub fn read_prices(&mut self, feed_ids: FeedIds) -> Vec<U256Digits> {
    convert_feed_ids(feed_ids)
        .iter()
        .enumerate()
        .map(|(index, feed_id)| self.read_price(feed_id.to_digits(), index))
        .collect()
}

fn read_price(&mut self, feed_id: U256Digits, index: usize) -> U256Digits {
    *self.prices.get(&feed_id).unwrap_or_revert(|_| {
        Error::contract_error(PriceAdapterError::MissingDataFeedValue(
            index,
            U256::from_digits(feed_id).as_ascii_str(),
        ))
    })
}
```
