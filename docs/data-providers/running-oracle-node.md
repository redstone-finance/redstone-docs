---
sidebar_position: 1
sidebar_label: "Running Oracle Node"
---

# Running Oracle Node

:::danger Requirements

We are not onboarding new Data Providers at the moment, but we will be doing so in the near future. Thank you for your interest!

:::

This guide will teach you how to run a RedStone node with Docker. It will fetch data from main public APIs, sign them with your private keys and broadcast to the streamr network and redstone Data Distribution Layer (DDL).
:::info Running from source
You can run RedStone oracle node [using source code](./launch-using-source-code), but it's recommended to run it with Docker. We continuously build and deploy the code from our Github repository, so you don’t need a complete development environment to run a node.
:::

:::info Data availability
RedStone consumers will be able to use the data published by your node [on all supported chains.](../smart-contract-devs/supported-chains) You can learn more about the RedStone Oracles architecture [here.](../smart-contract-devs/how-it-works.md)
:::

## 1. Running a node locally

### Requirements

- Make sure to have enough resources to launch a RedStone oracle node, as explained in the [requirements page.](./system-requirements)
- Install [Docker](https://docs.docker.com/get-docker/). You will run the oracle node in a Docker container.

### Node configuration

RedStone oracle node should be configured using environment variables. You can configure them in any preferred way, e.g. using a local `.env` file.

:::success Quick start configuration
We've prepared a simple .env file and a bash script so you can quickly run your first oracle node. You can find them [here.](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/oracle-node/tools/quick-start)
:::
:::info More env variables
The table below contains the main environment variables required for running a node. To see all the supported environment variables (including optional), please take a look at [this file.](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/src/config.ts)
:::
| Param | Description | Example value |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| ECDSA_PRIVATE_KEY | Your ECDSA private key | `ECDSA_PRIVATE_KEY=0x123...` |
| OVERRIDE_DIRECT_CACHE_SERVICE_URLS | Your personal private URLs of gateways to the RedStone Data Distribution Layer (DDL). For running a local node you can simply put `OVERRIDE_DIRECT_CACHE_SERVICE_URLS=["https://httpbin.org/anything"]`. But for production node running you should [request them](https://redstone.finance/discord) from the RedStone team. | `OVERRIDE_DIRECT_CACHE_SERVICE_URLS=["https://xxx.yyy.secret-url-1.com","https://zzz.aaa.secret-url-2.com"]` |
| OVERRIDE_MANIFEST_USING_FILE | Path to your manifest file. Manifest is a public JSON file that defines the provider's obligation regarding the data that they provide. It sets fetching interval, tokens, sources and other public technical details for the provided data. You can check available manifests [here.](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/oracle-node/manifests) | `OVERRIDE_MANIFEST_USING_FILE=./manifests/dev/dev.json` |
| LEVEL_DB_LOCATION | Path to the level DB. Each RedStone oracle node relies on a single-level DB. It is used to store recently fetched values from the last 15 minutes. These values are used for checking value deviations, filtering outliers and preventing price manipulation attacks. <br/><br/> You don't need to create a Level DB instance manually, it will be created automatically at the specified path during the first node launch. | `LEVEL_DB_LOCATION=/oracle-node-level-db` |

### Launch using Docker

- [Link to the oracle-node Docker repository](https://gallery.ecr.aws/y7v2w8b2/redstone-oracle-node)

Be sure to put your environment variables in the `.env` file using the instruction above.

Then, you can launch the RedStone oracle node using the following command:

```sh
docker run --env-file .env -d --restart=always -v redstone-oracle-node:/oracle-node-level-db --name redstone-oracle-node public.ecr.aws/y7v2w8b2/redstone-oracle-node:6c5e4bf
```

:::tip Docker image tags
Each docker image has a tag (e.g. `6c5e4bf`), which is a short commit hash from the [redstone monorepo](https://github.com/redstone-finance/redstone-oracles-monorepo). It allows quickly identifying the version of source code for a given docker image.
:::

:::info Custom local manifest
If you want to run oracle-node from Docker with your custom manifest you should [mount the manifest file](https://docs.docker.com/storage/bind-mounts/) from your local system to the docker container and update the `OVERRIDE_MANIFEST_USING_FILE` env variable.
:::

## 2. Running a production node

### Reach out to the RedStone team

:::info
Currently, we manually check and validate external data providers making sure that they fully understand the requirements and responsibilities. The process might be automated by smart-contracts in the future.
:::

Please send your ethereum address and public key to the RedStone team. Your address and public key will be added to the [data providers registry](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracles-smartweave-contracts/src/contracts/redstone-oracle-registry/initial-state.json). We'll also top up your ethereum wallet on Polygon with the small amount of MATIC tokens required for a one-time streamr streams creation, which will be started after your first node execution with a non-zero MATIC balance.

You can use [this script](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/oracle-node/tools/ethereum/get-details-from-private-key.js) for obtaining your address and public key from your private key, but we strongly recommend using your own trusted infrastructure for interacting with your private keys.

We will also send you personal private gateways to the RedStone Data Distribution Layer (DDL), which should be specified using the `OVERRIDE_DIRECT_CACHE_SERVICE_URLS` environment variable.

### Deploy your node

:::success Follow best practices
Before deploying your oracle node to production environment please take a look at the [best practices](./best-practices) for the nodes operation.
:::

Once you are added to the data providers registry and received your private gateway URLs, you can deploy the oracle node using Docker to any server or cloud provider you prefer. The deployment configuration should be very similar to the local node run.
