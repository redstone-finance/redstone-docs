---
sidebar_position: 1
sidebar_label: "Running Oracle Node"
---

# Running Oracle Node

This guide will teach you how to run a RedStone node locally with Docker. It will fetch data from main public APIs, sign them with your pirvate keys and broadcast to the streamr network and redstone data delivery network.
:::info Running from source
You can run RedStone oracle node [using source code](./launch-using-source-code), but it's recommended to run it with Docker. We continuously build and deploy the code from our Github repository, so you don’t need a complete development environment to run a node.
:::

:::info Data availability
RedStone consumers will be able to use the data published by your node [on all supported chains.](../smart-contract-devs//supported-chains) You can learn more about the RedStone model [here.](../smart-contract-devs/how-it-works.md)
:::

### Requirements

- Make sure to have enough resources to launch a RedStone oracle node, as explained in the [requirements page.](./system-requirements)
- Install [Docker](https://docs.docker.com/get-docker/). You will run the oracle node in Docker container.
- Prepare private keys and get registered in the [data providers registry.](./data-providers-registry)
- Request your private gateways to the Redstone data delivery network

### Node configuration

Redstone oracle node should be configured usning environment variables. You can configure them in any preferred way, e.g. using a local `.env` file.

:::info
The table below contains the main environment variables required for running a node. To see all the supported environment variables (including optional), please take a look at [this file.](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/src/config.ts)
:::
| Param | Description | Example value |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| ARWEAVE_KEYS_JWK | Your JWK private key (Arweave) | `ARWEAVE_KEYS_JWK={"k":...` |
| ECDSA_PRIVATE_KEY | Your ECDSA private key (Ethereum) | `ECDSA_PRIVATE_KEY=0x123...` |
| OVERRIDE_DIRECT_CACHE_SERVICE_URLS | Your personal private URLs of gateways to the RedStone data delivery network (RedStone team should provide them) | `OVERRIDE_DIRECT_CACHE_SERVICE_URLS=["https://xxx.yyy.secret-url-1.com","https://zzz.aaa.secret-url-2.com"]` |
| OVERRIDE_MANIFEST_USING_FILE | Path to your manifest file. Manifest is a public JSON file that defines the provider's obligation regarding the data that they provide. It sets fetching interval, tokens, sources and other public technical details for the provided data. | `OVERRIDE_MANIFEST_USING_FILE=./manifests/data-services/avalanche.json` |
| LEVEL_DB_LOCATION | Path to the level DB. Each RedStone oracle node relies on a single level DB. It is used to store recently fetched pricing values from the last 15 minutes. These values are used for checking value deviations, filtering outliers and preventing price manipulations attacks. | `LEVEL_DB_LOCATION=/oracle-node-level-db` |

## Launch using Docker

- [Link to the oracle-node Docker repository](https://gallery.ecr.aws/y7v2w8b2/redstone-oracle-node)

Be sure to put your environment variables in the `.env` file using the instruction above.

Then, you can launch the RedStone oracle node using the following command:

```sh
docker run --env-file .env -d --restart=always -v redstone-oracle-node:/oracle-node-level-db --name redstone-oracle-node public.ecr.aws/y7v2w8b2/redstone-oracle-node:7d49220
```
