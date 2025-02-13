---
sidebar_position: 1
sidebar_label: "♦️ What is RedStone?"
---

# Introduction

## Overview

There is a growing need for decentralized applications (dApps) to access data feeds that are frequently updated, reliable, and secure. RedStone is a leading oracle provider directly fulfilling this need. Trusted by 100+ dApps and securing billions of dollars of value, RedStone provides customizable and cost-efficient data streams for builders empowering the next generation of dApps. RedStone also provides data feeds to blockchains and layer 2 scaling solutions across the entire blockchain ecosystem that are both EVM and non-EVM compatible. The current model of oracle systems suffers from key inefficiencies, all of which RedStone was specifically designed to solve from the bottom up. This makes RedStone a unique oracle service.

## The Problems RedStone Solves ♦️

### Problem # 1: The standard approach of providing data to applications is inefficient and expensive

- The standard method of providing data is to ‘push’ the data onto the blockchain regardless of whether it is used by an application. This results in paying more for data and dedicating resources that could be used elsewhere.

#### Our Solution

RedStone allows data to be provided on-demand rather than on a fixed schedule, reducing the costs of putting data 'on-chain'. This is achieved by storing data off of the blockchain as cryptography signed packages and allowing smart contracts of dApps to fetch data when necessary.

_A note on data integrity_: To maintain data integrity RedStone also provides data feeds to Arweave, a decentralized network that provides data storage. Arweave's decentralized network makes it tamper-proof, therefore any data provided by RedStone to Arweave acts as a unbiased source of truth about the historical data provided by RedStone.

Overall, RedStone's approach improves efficiency for dApps and significantly reduces the costs for dApps to access data feeds.

### Problem #2: The typical monolithic architecture of oracles limits scalability

- A consequence of a monolithic architecture is that makes it challenging for protocols to reduce latency and list new assets.

#### Our Solution

RedStone was designed with a modular architecture making it easy to incorporate new assets and reduce latency, allowing dApps to scale more efficiently. This means constructing the oracle in such a way that its various components—such as data sources, validation mechanisms, and delivery methods—can be easily interchanged, updated, or augmented without disrupting the system’s overall functionality.

## Key facts

- RedStone secures [billions of dollars](https://defillama.com/oracles/RedStone?borrowed=true&doublecounted=true) of value in Web 3.0
- Data Integrity is fundamental to RedStone and is ensured from start to finish (from source to smart contract)
- There are [3 different ways](/docs/get-started/selecting-redstone-model) to integrate our service tailored to your needs
- We provide feeds for more than [1000 assets](https://app.redstone.finance/#/app/tokens) integrating [~180 data sources](https://app.redstone.finance/#/app/sources)
- We are present on [50+ chains](https://showroom.redstone.finance/)
- Our code was audited by multiple security experts including [ABDK](https://abdk.consulting/) [Peckshield](https://peckshield.com/) and a co-founder of [L2Beat](https://pl.linkedin.com/company/l2beat#:~:text=Join%20Piotr%20Szlachciak%20Cofounder%20%26%20CEO,insights%20shaping%20the%20%23DeFi%20landscape!).
- RedStone supports leading projects like [Morpho](https://morpho.org/), [Venus](https://venus.io/), and [Pendle Finance](https://www.pendle.finance/).

<a target="_blank" href="https://raw.githubusercontent.com/redstone-finance/redstone-docs/main/static/img/redstone-architecture-simple.png">
  <img alt="RedStone Architecure" src="/img/redstone-architecture-simple.png"/>
</a>
