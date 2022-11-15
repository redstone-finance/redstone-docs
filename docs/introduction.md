---
sidebar_position: 1
sidebar_label: "Introduction"
---

# Introduction

## Overview

RedStone is a data ecosystem that delivers frequently updated, reliable and
diverse data for your dApp and smart contracts.

### Problem Statement (Defi Pain points)

- It is not sustainable to put all the pricing data into blockchains, as they aren't designed for this purpose. Sourcing data becomes enormously expensive with Gas price spikes. On a historically busy day on Ethereum mainnet, with a day average Gas price of 500gwei, a single transaction may cost above $100, so if we persist every 10m across 30 sources, the daily bill will be more than $400k per token
- To reduce costs, current providers cover only a small subset of tokens and have a low update frequency
- DeFi protocols cannot expand beyond a small set of assets and cannot offer advanced solutions like [margin lending](https://www.nasdaq.com/articles/hodling-coins-is-one-plan-of-action-but-serious-investors-will-look-at-marginal-lending) (which require a higher update frequency)

### Solution

RedStone offers a radically different design of Oracles catering for the needs of modern Defi protocols.

- Data providers can avoid the requirement of continuous on-chain data delivery
- Allow end users to self-deliver signed Oracle data on-chain
- Use the decentralized Streamr network to deliver signed oracle data to the end users
- Use token incentives to motivate data providers to maintain data integrity and uninterrupted service
- Leverage the Arweave blockchain as a cheap and permanent storage for archiving Oracle data and maintaining data providers' accountability

### Oracles landscape

Initially, the most commonly used form for Oracle operations was the "two-phase approach":

1. A contract submits a request for data to an Oracle Service;
2. An Oracle Service sends back a response with data.

This simple and flexible solution was pioneered by Oraclize (now Provable) and Chainlink as the Basic Request Pattern, but the main disadvantage to this approach is that the contract cannot access data immediately as it requires two separate transactions. Such design kills usability, as the client needs to wait until the data goes into the contract to see the result of an action. An even bigger problem is that fetching data is not atomic (meaning not in a single transaction), which means that synchronizing multiple contracts is complex, slow, and ultimately kills interoperability.

Currently, the most popular approach taken by blockchains in an attempt to address the aforementioned issues is to persist all data directly on-chain, so that the information is available in the context of a single transaction. But as we already mentioned above, this approach is not scalable.

RedStone combines the best of the two approaches and creates a scalable yet convenient way of providing reliable Oracle data to smart contracts.

## System architecture

The RedStone ecosystem could be divided into 3 main areas:

- **Data provision** is responsible for fetching the data from external sources, transforming it into a common format, signing it, and broadcasting the collected information.
  - Implemented as → [RedStone Oracle Node](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/oracle-node)
- **Data access** is responsible for serving data to end users by various means, such as a web portal, an HTTP API, on-chain feeds, or third-party applications.

  - Web portal → [RedStone App](https://github.com/redstone-finance/redstone-app)
  - HTTP API → [RedStone Api](https://github.com/redstone-finance/redstone-api)
  - EVM connector → [RedStone EVM connector](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/evm-connector)

- **Data integrity** is responsible for enforcing high quality of data by incentivizing providers with tokens for keeping their service and punishing them for outages and misrepresented data.
  - Concept → [Argue protocol](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/docs/DISPUTE_RESOLUTION.md)
  - Implementation → [RedStone eth contracts](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/eth-contracts)

## Token design

The token facilitates the provision of reliable and accurate information from the outside world to blockchain networks.

### Usage of the token

Tokens have proven to be a very useful tool for achieving coordination in distributed systems and aligning the incentives of various actors. RedStone facilitates a data sharing ecosystem by incentivizing participants to produce, publish, and validate data in a continuous and diligent way.

#### Data access fees

The end users who benefit from access to valuable information use tokens to reward providers that published these data. The exact fee and the subscription terms are at the discretion of the provider and depend on their effort, demand for data and potential competition.

#### Locking

Every provider needs to publish a Service Level Agreement describing the scope of data being served, the source of information, and the frequency of updates. In the event that a provider breaches the terms of service, there will be a penalty applied that is also denominated in tokens. To reassure users that any future claims will be fully covered, providers must set aside a certain number of tokens and lock them for a set period of time. These funds are locked in the ecosystem and are an important factor for users when selecting the most reliable provider.

##### Dispute resolution

Because of the diverse nature of the provided information, it will not always be possible to decide if a data was corrupted. Therefore, it will be necessary to have a fallback procedure to resolve any disputes about the data quality. The process could be facilitated by tokens, where juries will be rewarded for voting with the majority and punished for supporting the losing side.

##### Bootstrapping the market

At the early stage of development, the token could be distributed to providers to reward their availability and bootstrap the market before there is enough demand from data users.

<img alt="redstone-token-design" src="https://github.com/redstone-finance/redstone-node/blob/main/docs/img/redstone-token-design.png?raw=true" width="600" />
