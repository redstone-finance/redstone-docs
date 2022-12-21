---
sidebar_position: 2
sidebar_label: "⚙️ Oracle node configuration"
---

# ⚙️ Oracle node configuration

## Prerequisites

- New ethereum private key, which was not used anywhere before. You can use [this script](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/tools/ethereum/generate-random-private-key.js) to generate a new one
- New arweave private key, which was not used anywhere before. You can use [this script](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/tools/arweave/generate-new-jwk.js) to generate a new one
- The ethereum address should have at least 0.15 MATIC tokens, which will be used for Streamr streams generation
- You should know the data service that you want to join and the corresponding manifest file name (e.g. `manifests/data-services/avalanche.json`)
- Your personal private URLs of direct redstone cache services (RedStone team should provide them)

### Environment variables configuration

To see all the supported environment variables take a look at [this file.](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/src/config.ts)

- `USE_NEW_SIGNING_AND_BROADCASTING=true`
- `ECDSA_PRIVATE_KEY=0x123...`
- `ARWEAVE_KEYS_JWK={"k":...`
- `OVERRIDE_DIRECT_CACHE_SERVICE_URLS=["xxx.yyy.secret-1.com","xxx.yyy.secret-2.com"]`
- `OVERRIDE_MANIFEST_USING_FILE=./manifests/data-services/avalanche.json`
- `ENABLE_STREAMR_BROADCASTING=true`
- `LEVEL_DB_LOCATION=/oracle-node-level-db`

You can configure environment vairables using the local `.env` file.
