---
sidebar_position: 2
sidebar_label: "💡 How it works?"
---

# 💡 How it works

Putting data directly into storage is the easiest to make information accessible to smart contracts. However, the convenience comes at a high price, as the storage access is the most costly operation in [EVM](https://ethereum.github.io/yellowpaper/paper.pdf) (20k gas for 256bit word ~ $160k for 1Mb checked 30/08/2021) making it prohibitively expensive to use.

RedStone EVM connector implements an alternative design of providing data to smart contracts. Instead of constantly persisting data on EVM storage, the information is brought on-chain only when needed (**on-demand fetching**). Until that moment, the data remains available in the [Arweave](https://www.arweave.org/) blockchain where data providers are incentivised to keep information accurate and up to date. Data is transferred to EVM via a mechanism based on a [meta-transaction pattern](https://medium.com/@austin_48503/ethereum-meta-transactions-90ccf0859e84) and the information integrity is verified on-chain through signature checking.

## 💡 How it works

At a top level, transferring data to an EVM environment requires packing an extra payload to a user's transaction and processing the message on-chain.

[![image.png](https://i.postimg.cc/5NZSqtFT/image.png)](https://postimg.cc/xc3m9n53)

### Data packing (off-chain data encoding)

1. Relevant data needs to be fetched from the [streamr network](https://streamr.network/) and the RedStone cache layer (as a backup source)
2. Data is packed into a message according to the following structure

[![image.png](https://i.postimg.cc/SRgRHHF1/image.png)](https://postimg.cc/jnJR7gjy)

3. The package is appended to the original transaction message, signed and submitted to the network

_All of the steps are executed automatically by the ContractWrapper and transparent to the end-user_

### Data unpacking (on-chain data verification)

1. The appended data package is extracted from the `msg.data`
2. The data signature is verified by checking if the signer is one of the approved providers
3. The timestamp is also verified checking if the information is not obsolete
4. The value that matches a given symbol is extracted from the data package

_This logic is executed in the on-chain environment and we optimised the execution using a low-level assembly code to reduce gas consumption to the absolute minimum_

### Benchmarks

We work hard to optimise the code using solidity assembly and reduce the gas costs of our contracts. Below there is a comparison of the read operation gas costs using the most popular Chainlink Reference Data, the standard version of Redstone PriceAware contract and the optimised version where provider address is inlined at the compilation time. The [scripts](https://github.com/redstone-finance/redstone-evm-connector/tree/price-aware/scripts) which generated the data together with [results](https://github.com/redstone-finance/redstone-evm-connector/blob/price-aware/benchmarks.txt) and transactions details could be found in our repository.

[![Screenshot-2021-09-05-at-17-18-25.png](https://i.postimg.cc/CK14BQTC/Screenshot-2021-09-05-at-17-18-25.png)](https://postimg.cc/NK3XZb0L)
