---
sidebar_position: 1
sidebar_label: "What is RedStone Oracles?"
---

![Banner](/img/redstone-banner.png)


## What is RedStone and Why was it Created?

There is a growing necessity to provide data to decentralized applications (dApps) that is frequently updated, reliable, and secure. RedStone Oracles is a leading Oracle provider, directly solving this problem. Trusted by 100+ dApps and securing billions of dollars of value, RedStone provides customizable and cost-efficient data streams for builders empowering the next generation of dApps. RedStone provides data feeds to dApps, blockchains, and layer 2 scaling solutions across the entire blockchain ecosystem that are both EVM and non-EVM compatible. The current model of oracle systems suffers from key inefficiencies, all of which RedStone Oracles was specifically designed to solve from the bottom up. This makes RedStone a unique oracle service.

<br />

## The Problems That RedStone Oracles Solves 

### Problem # 1: Inefficient methods of providing data to applications. 

The standard method of providing data is to ‘push’ the data onto the blockchain regardless of whether it is used by an application. This results in paying more for data and dedicating resources that could be used elsewhere. 

#### Our Solution

RedStone allows data to be provided on-demand rather than on a fixed schedule. This is achieved by storing data off of the blockchain as cryptography signed packages. Data can be fetched by smart contracts of dApps whenever necessary. To ensure data integrity, Arweave, a decentralized network that offers data storage is leveraged. Redstone provides data to Arweave as a method of accountability because RedStone cannot influence Arweave’s decentralized network. Therefore, Arweave provides an unchangeable ‘source of truth’ about the data provided by RedStone.

This approach improves efficiency and reduces costs for dApps to access data feeds. 

<br />

### Problem #2: The typical monolithic architecture of Oracles limits scalability.

A consequence of a monolithic architecture makes it challenging for protocols to reduce latency or list new assets.

#### Our Solution

RedStone was designed with a modular architecture making it easy to incorporate new assets and reduces latency, allowing dApps to scale more efficiently.

<br />

### Problem #3: dApps are overly dependent on relayers.

Relayers are intermediaries that process data to be used for ‘on-chain’ activity. Completely relying on relayers creates a point of centralization which may result in a stoppage of data delivery posing a risk to the application.

#### Our Solution

RedStone relies on a decentralized network supported by token incentives to motivate data providers to maintain data integrity and uninterrupted services. 

<br />

## Key facts

- RedStone secures [billions of dollars](https://defillama.com/oracles/RedStone?borrowed=true&doublecounted=true) of value in Web 3.0
- Data Integrity is fundamental to Redstone and is ensured from start to finish (from source to smart contract)
- There are [3 different ways](https://docs.redstone.finance/docs/smart-contract-devs/how-it-works#3-ways-to-integrate) to integrate our service tailored to your needs
- We provide feeds for more than [1000 assets](https://app.redstone.finance/#/app/tokens) integrating [~180 data sources](https://app.redstone.finance/#/app/sources)
- We are present on [20+ chains](https://showroom.redstone.finance/)
- Our code was audited by multiple security experts including [ABDK,](https://abdk.consulting/) [Peckshield](https://peckshield.com/), and a Co-Founder of [L2Beat](https://pl.linkedin.com/company/l2beat#:~:text=Join%20Piotr%20Szlachciak%20Cofounder%20%26%20CEO,insights%20shaping%20the%20%23DeFi%20landscape!).
- RedStone supports leading projects like [Morpho](https://morpho.org/), [Venus](https://venus.io/), and [Pendle Finance](https://www.pendle.finance/).



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

