

## How Data Flows from Its Origins to the Blockchain

<a href="https://raw.githubusercontent.com/redstone-finance/redstone-docs/main/static/img/architecture.png">
 <img src="/img/architecture.png" target="_blank"/>
</a>

The price feeds provided to RedStone’s clients come from a diverse range of sources. This includes exchanges like Binance and Coinbase, decentralized exchanges (DEXs) like Uniswap and Sushiswap, and price aggregators like CoinMarketCap and CoinGecko. RedStone has over 150 sources integrated to date. 

The data is aggregated by independent nodes operated by data providers using various methodologies. Some methods include median, TWAP, and LWAP, which are all designed to capture the most accurate price by considering factors like the amount of liquidity available, and the average price during specific timeframes. 

Additionally, data-quality measures are implemented like detecting unexpected values (outlier detection), to ensure the data is correct. Afterward, the cleaned and processed data is then signed by node operators underwriting its quality.
The feeds are broadcasted both on the Streamr, a decentralized data network, and directly to open-source gateways which could be easily spun-off when necessary. 

The data could be pushed onto the blockchain either by a dedicated relayer operating under predefined conditions, like a specific change in price, by a bot (ie. performing liquidations), or even by end users interacting with the protocol. Inside the protocol, the data is unpacked and verified cryptographically confirming both the origin and timestamps.

## Data Formatting
Transferring data to a blockchain (EVM environment) requires packing an extra payload to a user's transaction and processing the message on the blockchain. 

<br> 

#### How Data is Encoded Before Being Put on the Blockchain


_Note: All of the steps are executed automatically by the ContractWrapper and transparent to the end-user._

1. Relevant data needs to be fetched from the decentralized cache layer, powered by the Streamr network and the RedStone light cache nodes. 
2. Data is packed into a message based on the structure of the ‘Transaction Payload’ diagram below… 

<a href="https://raw.githubusercontent.com/redstone-finance/redstone-docs/main/static/img/redstone-tx-wrapping.png">
 <img src="/img/redstone-tx-wrapping.png" target="_blank"/>
</a>

3. The package is appended to the original transaction message, signed, and submitted to the network.

<br> 

#### How Data is Unpacked & Verified on the Blockchain

Firstly, the appended data packages are extracted from the msg.data property. 
Then, security steps are taken including verifying if the signature was created by a trusted provider and validating the timestamp, confirming the information is not obsolete. Afterward, for each requested data feed RedStone calculates the number of received unique signers, extracts the value for each unique signer, and calculates the aggregated value. The middle value of all the values (median), is the default value that is provided. 

Note: This logic is executed in the on-chain environment and its execution has been optimized using a low-level assembly code to reduce gas consumption to the absolute minimum

## On-chain aggregation

To increase the security of the RedStone oracle system, we've created the on-chain aggregation mechanism. This mechanism adds an additional requirement of passing at least X signatures from different authorised data providers for a given data feed. The values of different providers are then aggregated before returning to a consumer contract (by default, we use median value calculation for aggregation). This way, even if some small subset of providers corrupt (e.g. 2 of 10), it should not significantly affect the aggregated value.

There are the following on-chain aggregation params in RedStone consumer base contract:

- `getUniqueSignersThreshold` function
- `getAuthorisedSignerIndex` function
- `aggregateValues` function (for numeric values)
- `aggregateByteValues` function (for bytes arrays)

## Types of values

We support 2 types of data to be received in a contract:

1. Numeric 256-bit values (used by default)
2. Bytes arrays with dynamic size

## Security considerations

- Do not override the `getUniqueSignersThreshold` function, unless you are 100% sure about it
- Pay attention to the timestamp validation logic. For some use-cases (e.g. synthetic DEX), you would need to cache the latest values in your contract storage to avoid arbitrage attacks
- Enable a secure upgradability mechanism for your contract (ideally based on multi-sig or DAO)
- Monitor the RedStone data services registry and quickly modify signer authorisation logic in your contracts in case of changes (we will also notify you if you are a paying client)

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
