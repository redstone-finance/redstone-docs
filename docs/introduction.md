---
sidebar_position: 1
sidebar_label: "Introduction"
---

# Introduction

![Banner](/img/redstone-banner.png)


RedStone is an Oracle that delivers frequently updated, reliable, and diverse data feeds for your dApp and smart contracts on multiple L1s & L2s.

### Why we build another Oracle system

- Pushing data on-chain regardless of whether it is used or not is a huge waste of resources
- Obsolete and monolithic architecture limits scalability (it's hard to list new assets or reduce latency)
- Protocols cannot fully decide on trusted sources and data update conditions
- End-users are fully dependent on relayers and could be cut off from the service

### Solution

RedStone offers a radically different design of Oracles catering to the needs of modern DeFi protocols.

- Data providers can avoid the requirement of continuous on-chain data delivery
- Allow end users to self-deliver signed Oracle data on-chain
- Use the decentralized Streamr network to deliver signed oracle data to the end users
- Use token incentives to motivate data providers to maintain data integrity and uninterrupted service
- Leverage the Arweave blockchain as cheap and permanent storage for archiving Oracle data and maintaining data providers' accountability

## Key facts

- The [modular architecture](./smart-contract-devs/how-it-works.md#data-flow) maintains [data integrity](./smart-contract-devs/how-it-works.md#data-format) from source to smart contracts
- There are [3 different ways](./smart-contract-devs/how-it-works.md#3-ways-to-integrate) to integrate our service tailored to your needs
- We provide feeds for more than [1000 assets](https://app.redstone.finance/#/app/tokens) integrating [~50 data sources](https://app.redstone.finance/#/app/sources)
- We are present on [20+ chains](https://showroom.redstone.finance/) 
- RedStone has been supporting DeltaPrime Alpha since March 2022 and has been live on mainnets since January 2023. Our code was audited by multiple security experts including ABDK, Peckshield and L2Beat Co-Founder.
- RedStone was a launch partner for [DeltaPrime](https://deltaprime.io/) on Avalanche and delivered data feeds not available anywhere else. Thanks to that DeltaPrime became the top 3 fastest growing dApps according to DefiLama.

<a href="https://raw.githubusercontent.com/redstone-finance/redstone-docs/main/static/img/redstone-architecture-simple.png">
  <img alt="RedStone Architecure" src="/img/redstone-architecture-simple.png" target="_blank"/>
</a>

<!-- ## Building blocks

The RedStone ecosystem could be divided into 3 main areas:

- **Data provision** is responsible for fetching the data from external sources, transforming it into a common format, signing it, and broadcasting the collected information.
  - Implemented as → [RedStone Oracle Node](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/oracle-node)

- **Data access** is responsible for serving data to end users by various means, such as a web portal, an HTTP API, on-chain feeds, or third-party applications.

  - Web portal → [RedStone App](https://github.com/redstone-finance/redstone-app)
  - HTTP API → [RedStone Api](https://github.com/redstone-finance/redstone-api)
  - EVM connector → [RedStone EVM connector](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/evm-connector)

- **Data integrity** is responsible for enforcing high quality of data by incentivizing providers with tokens for keeping their service and punishing them for outages and misrepresented data.
  - Concept → [Argue protocol](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/docs/DISPUTE_RESOLUTION.md)
  - Implementation → [RedStone eth contracts](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/eth-contracts) -->

