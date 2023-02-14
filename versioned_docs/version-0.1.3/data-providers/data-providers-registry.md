---
sidebar_position: 2
sidebar_label: "Data Providers Registry"
---

# Data Providers Registry

This guide will teach you how to generate your private keys and get registered in the [Redstone data providers registry.](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracles-smartweave-contracts/src/contracts/redstone-oracle-registry/initial-state.json)

## 1. Generate private keys

Before you start, you should generate private ECDSA and JWK prvate keys and calculate corresponding ethereum and arweave addresses.

:::warning Keep your keys secure
Please apply the best security practices for storing your private keys. If you suspect that any of your keys is compromised please immediately notify the RedStone team.
:::

You can use the following scripts for generating private keys, but we strongly recommend to use your own trusted infrastructure for the keys generation:

- [ECDSA key generation](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/tools/ethereum/generate-random-private-key.js)
- [JWK key generation](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/tools/arweave/generate-new-jwk.js)

## 2. Send your addresses and public keys to the RedStone team

Please send the corresponding addresses and public keys to the RedStone team after the keys generation. Your addresses will be added to the data providers registry. We'll also top up your ethereum wallet on Polygon with the small amount of MATIC tokens required for a one-time streamr streams creation, which will be started after your first node execution.

You can use the following scripts for obtaining addresses and public keys from your private keys, but we strongly recommend to use your own trusted infrastructure for interacting with your private keys:

- [Ethereum address and public key from ECDSA key](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/tools/ethereum/get-details-from-private-key.js)
- [Arweave address from JWK](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/tools/arweave/get-address-for-jwk.js)
