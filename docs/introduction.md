---
sidebar_position: 1
sidebar_label: "Introduction"
---

# Introduction

## Overview

RedStone is a data ecosystem that delivers frequently updated, reliable and
diverse data for your dApp and smart contracts.

### Problem Statement (Defi Pain points)

- It is not sustainable to put all the pricing data into blockchains, as they wasn’t designed for this purpose. Sourcing data becomes enormously expensive with Gas price spikes. On a historically busy day on Ethereum, with a day average 500gwei Gas price, a single transaction may cost above $100, so if we persist every 10m across 30 sources, the daily bill will be more than $400k per one token
- To reduce costs current providers cover only a small subset of tokens and have low update frequency
- DeFi protocols cannot expand beyond a small set of assets and cannot offer advanced solutions like [margin lending](https://www.nasdaq.com/articles/hodling-coins-is-one-plan-of-action-but-serious-investors-will-look-at-marginal-lending) (which require higher update frequency)

### Solution

RedStone offers a radically different design of Oracles catering for the needs of modern Defi protocols.

- Сircumvent the requirement of continuous delivering data on-chain for data providers
- Allow end users to deliver signed oracle data on-chain by themselves
- Use decentralized Streamr network to deliver signed oracle data to the end users
- Use token incentives to motivate data providers to maintain data integrity and the uninterrupted service
- Leverage Arweave blockchain as a cheap and permanent storage for archiving oracle data and maintaining data providers accountability

### Oracles landscape

Initially, the most commonly utilised form for Oracle operations were the “two phase approach”:

1. A contract submits a request for data to an Oracle Service;
2. An Oracle Service sends back a response with data.

This simple and flexible solution was pioneered by Oraclize (now Provable) and Chainlink as Basic Request Pattern, but the main disadvantage to this approach is that the contract cannot access data immediately as it requires two separate transactions. Such design kills usability as the client needs to wait until the data comes to contract to see a result of an action. An even bigger problem is that fetching data is not atomic (meaning not in a single transaction) which means that synchronizing multiple contracts is complex, slow and ultimately kills interoperability.

Currently, the most popular approach taken by blockchains in an attempt to address the aforementioned issues is to persist all data directly on-chain, so that the information is available in the context of a single transaction. But we already mentioned above, this approach is not scalable.

RedStone combines the best of the 2 apporaches and creates a scalable yet convinient way of providing reliable oracle data to smart contracts.

## System architecture

RedStone ecosystem could be divided into 3 main areas:

- **Data provision** responsible for fetching the data from external sources, transforming to a common format, signing, and broadcasting the collected information.
  - Implemented as → [RedStone Oracle Node](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/oracle-node)
- **Data access** responsible for serving data to end user by various means including web portal, http api, on-chain feeds or 3rd party applications
  - Web portal → [RedStone App](https://github.com/redstone-finance/redstone-app)
  - HTTP Api → [RedStone Api](https://github.com/redstone-finance/redstone-api)
  - EVM connector → [RedStone EVM connector](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/evm-connector)
- **Data integrity** responsible for enforcing high quality of data by incentivising providers with tokens for keeping their service and punishing them for outage and misrepresented data
  - Concept → [Argue protocol](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/docs/DISPUTE_RESOLUTION.md)
  - Implementation → [RedStone eth contracts](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/eth-contracts)

## Token design

The token facilitates providing reliable and accurate information to blockchain networks from the external world.

### Usage of the token

Tokens are proven to be a very useful tool for achieving coordination in the distributed systems and aligning incentives of various actors. RedStone token facilitates data sharing ecosystem incentivising participants to produce, publish and validate data in a continuous and diligent way.

#### Data access fees

The end users who benefit from access to valuable information use tokens to reward providers that published these data. The exact fee and the subscription terms are at the discretion of the provider and depend on their effort, demand for data and potential competition.

#### Locking

Every provider needs to publish a Service Level Agreement describing the scope of data being served, the source of information, and the frequency of updates. In case a provider breaches the terms of service, there will be a penalty applied which is also denominated in tokens. In order to assure users that any further claims could be fully covered, providers need to put aside a certain amount of token and lock it for a period of time. These funds are locked in the ecosystem and are an important factor for users to select the most reliable provider.

##### Dispute resolution

Because of the diverse nature of provided information, it will not always be possible to decide if a data was corrupted. Therefore, it will be necessary to have a fallback procedure to resolve any disputes about data quality. The process could be facilitated by tokens when juries will be rewarded for voting alongside the majority and punished for supporting a losing side.

##### Bootstrapping market

At the early stage of development, the token could be distributed to providers to reward their availability and bootstrap the market before there is enough demand coming for data users.

<img alt="redstone-token-design" src="https://github.com/redstone-finance/redstone-node/blob/main/docs/img/redstone-token-design.png?raw=true" width="600" />
