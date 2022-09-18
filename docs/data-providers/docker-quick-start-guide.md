---
sidebar_position: 2
sidebar_label: "🚀 Docker Quick Start Guide"
---

# 🚀 Docker Quick Start Guide

## Prerequisites
- New ethereum private key (should not be used anywhere before)
- New arweave private key (should not be used anywhere before)
- The ethereum address should have few MATIC tokens (to register streamr streams)
- You should know the data service that you want to join
- Your personal private URLs of direct redstone cache services
- RedStone tokens (on Kovan testnet)

## 1. Register streamr streams
TODO: add detailed instruction how to do this

## 2. Join data service in warp contracts
TODO: add details instruction how to do this

## 3. Launch redstone node using docker container

### Prepare env variables configuration
- `ECDSA_PRIVATE_KEY=0x123...`
- `OVERRIDE_DIRECT_CACHE_SERVICE_URLS=["https://private-direct-cache-url-1.redstone.finance","https://private-direct-cache-url-2.redstone.finance"]`

### Launch docker container
- Docker image: https://gallery.ecr.aws/y7v2w8b2/redstone-oracle-node

## 4. Enable monitoring for your nodes
TODO: describe how to run monitoring service for a specific node

## 5. Stake RedStone tokens
TODO: describe how to stake RedStone tokens. We'll have a simple UI for it
