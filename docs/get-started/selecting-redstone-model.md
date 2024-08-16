---
sidebar_position: 1
sidebar_label: " Models"
---

# RedStone Offers Three Models

## 1. [RedStone Core Model](./models/redstone-core)

In RedStone’s innovative **Core Model**, data is dynamically injected into user transactions, achieving maximum gas efficiency. This approach is user-friendly as the whole process fits into a single transaction. The Core Model significantly reduces the costs for dApps to access data feeds.

**Best suited for:**  
dApps that need access to several price feeds with frequent and cost-effective updates.

## 2. [RedStone Classic Model](./models/redstone-classic)

RedStone’s **Classic Model** is designed for applications looking for the traditional oracle model of data being put onto the blockchain at longer intervals, providing full control of the data source and the conditions for updates.

**Best suited for:**  
dApps that require a lower frequency of data updates, fewer price feeds, or want to be interchangeable with other oracle providers.

## 3. [RedStone X Model](./models/redstone-x)

The **X Model** is designed to fulfill the needs of advanced protocols such as perpetuals, options, and derivatives. By providing price feeds at the very next block after users' interactions, the X Model eliminates any [front-running](https://hacken.io/discover/front-running/) risks.

**Best suited for:**  
Perpetuals, options, and derivative protocols.

# Why We Recommend Our Core Model

The easiest way to make data accessible for applications that use smart contracts is by storing data directly on a blockchain. This approach is effective for large update intervals and a small number of assets. However, an increasing number of decentralized financial (DeFi) applications and modern derivative protocols require lower latency.

To solve this problem, RedStone proposes an innovative modular design where data is first put into a data delivery layer and then put on a blockchain only when necessary. This allows for broadcasting a large number of assets more frequently while also reducing the costs for decentralized applications (dApps).
