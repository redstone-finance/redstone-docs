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
You can run RedStone oracle node [using source code](/docs/data-providers/launch-using-source-code), but it's recommended to run it with Docker. We continuously build and deploy the code from our Github repository, so you don’t need a complete development environment to run a node.
:::

:::info Data availability
RedStone consumers will be able to use the data published by your node [on all supported chains.](/docs/get-started/supported-chains) You can learn more about the RedStone Oracles architecture [here.](../get-started/selecting-redstone-model.md)
:::

## 1. Running a node locally

### Requirements

- Make sure to have enough resources to launch a RedStone oracle node, as explained in the [requirements page.](/docs/data-providers/system-requirements)
- Install [Docker](https://docs.docker.com/get-docker/). You will run the oracle node in a Docker container.
- Install [Docker Compose](https://docs.docker.com/compose/install/). It will help you manage multiple containers.

### Example Docker Compose configuration

Here's a simple example of a `docker-compose.yml` file that you can use to run the RedStone oracle node locally. You can copy this configuration and adjust it to your needs.

```yaml
services:
  redstone-oracle-node:
    image: public.ecr.aws/y7v2w8b2/redstone-oracle-node:957ca2a1
    restart: always
    depends_on:
      - redstone-kms
    networks:
      - public_network
      - private_network
    volumes:
    - redstone-oracle-node:/oracle-node-level-db
    environment:
      OVERRIDE_DIRECT_CACHE_SERVICE_URLS: '["https://httpbin.org/anything"]'
      OVERRIDE_MANIFEST_USING_FILE: ./manifests/dev/dev.json
      LEVEL_DB_LOCATION: /oracle-node-level-db
      REMOTE_SIGNER_URL: http://redstone-kms:4499
      ENABLE_REMOTE_SIGNER: true

  redstone-kms:
    restart: always
    image: public.ecr.aws/y7v2w8b2/kms@sha256:6d0adc668d5a9a6d85b2232c6d6f4a5d6966d0faf58bd403ed37efed1e8219f5
    networks:
      - private_network
    expose:
      - "4499"
    environment:
      KMS_PRIVATE_KEY: 0x1111111111111111111111111111111111111111111111111111111111111111

volumes:
  redstone-oracle-node:

networks:
  public_network:
    driver: bridge
  private_network:
    internal: true  # This ensures the network is private
```

### Services

#### RedsStone KMS (Key Management Service)

RedStone KMS' sole purpose is to handle all operations on your private key. It signs the data fetched by the oracle node and returns the evm address. This should be the only service that has access to your private key. Use the [RedStone KMS](https://gallery.ecr.aws/y7v2w8b2/kms) Docker image. 

#### RedStone Node configuration

RedStone oracle node should be configured using environment variables. You can configure them in any preferred way, e.g. using a local `.env` file.


| Param                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                  | Example value                                                                                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| ENABLE_REMOTE_SIGNER               | Delegate signing to a remote signer. Only this image has access to your ECDSA private key                                                                                                                                                                                                                                                                                                                                                                                                         | `ENABLE_REMOTE_SIGNER=true`
| REMOTE_SIGNER_URL               | This is where Redstone's signer is listening. We recommend using a colocation e.g. in Kubernetes oracle-node and signer should be run in the same POD. By default `http://localhost:4499`.key                                                                                                                                                                                                                                                                                                                                                                                                       | `REMOTE_SIGNER_URL=http://localhost:4499`                                                                                 |
| OVERRIDE_DIRECT_CACHE_SERVICE_URLS | Your personal private URLs of gateways to the RedStone Data Distribution Layer (DDL). For running a local node you can simply put `OVERRIDE_DIRECT_CACHE_SERVICE_URLS=["https://httpbin.org/anything"]`. But for production node running you should [request them](https://redstone.finance/discord) from the RedStone team.                                                                                                 | `OVERRIDE_DIRECT_CACHE_SERVICE_URLS=["https://xxx.yyy.secret-url-1.com","https://zzz.aaa.secret-url-2.com"]` |
| OVERRIDE_MANIFEST_USING_FILE       | Path to your manifest file. Manifest is a public JSON file that defines the provider's obligation regarding the data that they provide. It sets fetching interval, tokens, sources and other public technical details for the provided data. You can check available manifests [here.](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/oracle-node/manifests)                               | `OVERRIDE_MANIFEST_USING_FILE=./manifests/dev/dev.json`                                                      |
| LEVEL_DB_LOCATION                  | Path to the level DB. Each RedStone oracle node relies on a single-level DB. It is used to store recently fetched values from the last 15 minutes. These values are used for checking value deviations, filtering outliers and preventing price manipulation attacks. <br/><br/> You don't need to create a Level DB instance manually, it will be created automatically at the specified path during the first node launch. | `LEVEL_DB_LOCATION=/oracle-node-level-db`                                                                    |
| ENABLE_REMOTE_SIGNER               | Switch on signing with RedStone KMS  | `ENABLE_REMOTE_SIGNER=true`            

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
Before deploying your oracle node to production environment please take a look at the [best practices](/docs/data-providers/best-practices) for the nodes operation.
:::

Once you are added to the data providers registry and received your private gateway URLs, you can deploy the oracle node using Docker to any server or cloud provider you prefer. The deployment configuration should be very similar to the local node run.
