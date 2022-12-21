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

You can configure environment vairables using the local `.env` file.

1. Set the `ECDSA_PRIVATE_KEY` and `ARWEAVE_KEYS_JWK` variables to your proviate keys. The private keys will be used to sign the oracle data by your node.

- `ECDSA_PRIVATE_KEY=0x123...`
- `ARWEAVE_KEYS_JWK={"k":...`

2. Specify the manifest file using the `OVERRIDE_MANIFEST_USING_FILE` variable.

- `OVERRIDE_MANIFEST_USING_FILE=./manifests/data-services/avalanche.json`

3. Specify the list of direct cache service URLs that you have recevied from the RedStone team. These are web applications hosted by the RedStone team, and they can be used as data sources with lower latency. The RedStone architecture can also work without them, relying only on the Streamr Network, but direct cache services provide faster access to the oracle data. Please **keep these URLs in secret**, as the data from the direct cache services are served under different ones.

- `OVERRIDE_DIRECT_CACHE_SERVICE_URLS=["https://xxx.yyy.secret-1.com","https://zzz.aaa.secret-2.com"]`

4. Set the path to the level DB. Each RedStone oracle node relies on a single level DB. It is used to store recently fetched pricing values from the last 10-15 minutes. These values can be used for checking value deviations and preventing price manipulations attacks.

- `LEVEL_DB_LOCATION=/oracle-node-level-db`

To see all the supported environment variables (including optional), please take a look at [this file.](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/src/config.ts)
