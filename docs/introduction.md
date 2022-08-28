---
sidebar_position: 1
sidebar_label: "Introduction"
---

# Introduction

### Overview

RedStone is a data ecosystem that delivers fast and accurate financial information in a decentralised fashion.

#### Problem Statement (Defi Pain points)

- It is not sustainable to put all the pricing data into the Ethereum blockchain, as it wasn’t designed for this purpose. Sourcing data becomes enormously expensive with Gas price spikes. On a historically busy day on Ethereum, with a day average 500gwei Gas price, a single transaction may cost above $100, so if we persist every 10m across 30 sources, the daily bill will be more than $400k per one token
- To reduce costs current providers cover only a small subset of tokens and have low update frequency
- DeFi protocols cannot expand beyond a small set of assets and cannot offer advanced solutions like [margin lending](https://www.nasdaq.com/articles/hodling-coins-is-one-plan-of-action-but-serious-investors-will-look-at-marginal-lending) (which require higher update frequency)

#### Solution

RedStone offers a radically different design of Oracles catering for the needs of modern Defi protocols.

- Leverage Arweave blockchain as a cheap and permanent storage
- Use token incentives to motivate data providers to maintain data integrity and the uninterrupted service
- Use signed meta-transactions to deliver prices on-chain
- Although the data at RedStone is persisted on the Arweave chain, it could be used with any other blockchain

#### Oracles landscape

Initially, the most commonly utilised form for Oracle operations were the “two phase approach”:

1. A contract submits a request for data to an Oracle Service;
2. An Oracle Service sends back a response with data.

This simple and flexible solution was pioneered by Oraclize (now Provable) and Chainlink as Basic Request Pattern, but the main disadvantage to this approach is that the contract cannot access data immediately as it requires two separate transactions. Such design kills usability as the client needs to wait until the data comes to contract to see a result of an action. An even bigger problem is that fetching data is not atomic (meaning not in a single transaction) which means that synchronizing multiple contracts is complex, slow and ultimately kills interoperability.

Currently, the most popular approach taken by blockchains in an attempt to address the aforementioned issues is to persist all data directly on-chain, so that the information is available in the context of a single transaction. Protocols have also formed syndicates around the most popular oracles using common standardized configuration. Here, we listed some of popular Oracle solutions:

| Name of Project                       | Redstone | Chainlink | Band Protocol                                       | DIA                                            | API3                   | Flux    | Pyth    |
| ------------------------------------- | -------- | --------- | --------------------------------------------------- | ---------------------------------------------- | ---------------------- | ------- | ------- |
| Blockchain of data storage            | Arweave  | Ethereum  | Cosmos                                              | Database host with oracles on different chains | DAO on Ethereum        | NEAR    | Solana  |
| Number of assets supported            | 1084     | 79        | 175                                                 | 50                                             | No Info                | No Info | No Info |
| Decentralised Governance              | Yes      | No        | Yes                                                 | No                                             | Yes                    | Yes     | No      |
| Multi-chain support                   | Yes      | Yes       | Dependent on Cosmos' Inter-Blockchain-Communication | No                                             | Dependent in Parachain | Yes     | No      |
| Oracle Aggregator                     | Yes      | No        | No                                                  | Yes                                            | Yes                    | Yes     | No      |
| New datafeeds requests from community | Yes      | No        | No                                                  | No                                             | No                     | Yes     | No      |
| Supporting custom data feeds          | Yes      | No        | No                                                  | No                                             | No                     | No      | No      |

### Top level view

RedStone ecosystem could be divided into 3 main areas:

- **Data provision** responsible for fetching the data from external api, transforming to a common format, and persisting collected information.
  - Implemented as → [RedStone Node](https://github.com/redstone-finance/redstone-node)
- **Data access** responsible for serving data to end user by various means including web portal, http api, discord bots, on-chain feeds or 3rd party applications (like spreadsheet extensions)
  - Web portal → [RedStone App](https://github.com/redstone-finance/redstone-app)
  - HTTP Api → [RedStone Api](https://github.com/redstone-finance/redstone-api)
  - Bots → [Examples](https://github.com/redstone-finance/redstone-api/tree/main/examples/discord-bots)
- **Data integrity** responsible for enforcing high quality of data by incentivising providers with tokens for keeping their service and punishing them for outage and misrepresented data
  - Concept → [Argue protocol](https://github.com/redstone-finance/redstone-node/blob/main/docs/DISPUTE_RESOLUTION.md)

## System architecture

### Modules

<img alt="redstone-system-architecture" src="https://github.com/redstone-finance/redstone-node/blob/main/docs/img/redstone-system-architecture.png?raw=true" width="800" />

#### External integrations (blue)

- **Data sources** - provide data (like price information) via API
- **DeFi protocols** - consume aggregated and attested data
- **Web integrations** - utilise provided data to power apps like blockchain wallets, portfolio browsers, defi analytics sites

#### Stakeholders (red)

- **Data providers** - need to register with token stake and operate RedStone node which process and attest data
- **End users** - may browse pricing data and select providers using the web portal
- **Juries** - protect data integrity deciding if a price was manipulated

#### RedStone modules (purple)

- **RedStone node** - fetches data from external sources via api, aggregates and attest information with a cryptographic key, broadcast the results and persist them on the Arweave blockchain
- **Data cache** - a module that holds data and makes it available to interested parties. Multiple services might implement it on various infrastructure to increase availability. It should achieve minimum latency and scale to handle large volume of requests
- **Smart contracts api** - it provides the data to on-chain protocols. Initially, we cover Arweave and EVM (ethereum) infrastructure. It minimizes the running (gas) costs and verifies signed data on-chain
- **HTTP api** - web based that serves information via REST api. It can power websites, node-js scripts and social media bots. There will be a dedicated java script wrapper that will abstract request formatting and error handling to make service easier to integrate
- **Providers registry** - an Arweave smart contract that manages provider's token stake, holds the manifest (SLA of pricing data) and allows checking historical performance (showing any data inconsistency and downtime)
- **Dispute resolution protocol** - a set of Arweave contracts allowing to challenge any existing pricing feed, and managing the dispute process enabling juries to vote for the verdicts
- **Web portal** - a web application that is an interface to browse data, check providers' statistics, see historical feeds with an option to raise a dispute and participate in the voting process

### Token design

The token facilitates providing reliable and accurate information to blockchain networks from the external world.

#### Usage of the token

Tokens are proven to be a very useful tool for achieving coordination in the distributed systems and aligning incentives of various actors. RedStone token facilitates data sharing ecosystem incentivising participants to produce, publish and validate data in a continuous and diligent way.

##### Data access fees

The end users who benefit from access to valuable information use tokens to reward providers that published these data. The exact fee and the subscription terms are at the discretion of the provider and depend on their effort, demand for data and potential competition.

##### Staking

Every provider needs to publish a Service Level Agreement describing the scope of data being served, the source of information, and the frequency of updates. In case a provider breaches the terms of service, there will be a penalty applied which is also denominated in tokens. In order to assure users that any further claims could be fully covered, providers need to put aside a certain amount of token and lock it for a period of time. These funds are labelled as a stake in the ecosystem and are an important factor for users to select the most reliable provider.

##### Dispute resolution

Because of the diverse nature of provided information, it will not always be possible to decide if a data was corrupted. Therefore, it will be necessary to have a fallback procedure to resolve any disputes about data quality. The process could be facilitated by tokens when juries will be rewarded for voting alongside the majority and punished for supporting a losing side.

##### Bootstrapping market

At the early stage of development, the token could be distributed to providers to reward their availability and bootstrap the market before there is enough demand coming for data users.

<img alt="redstone-token-design" src="https://github.com/redstone-finance/redstone-node/blob/main/docs/img/redstone-token-design.png?raw=true" width="600" />
