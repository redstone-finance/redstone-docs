---
sidebar_position: 4
sidebar_label: "🛠️ Running AVS Operator"
---

# Running AVS Operator

Becoming an operator in the RedStone AVS ecosystem is a unique opportunity to play a crucial role in a cutting-edge, decentralized oracle network.
As an operator, you will contribute directly to the security and accuracy of data that powers smart contracts and decentralized applications across the blockchain.
Not only will you be helping to maintain the integrity of this innovative system, but you’ll also have the chance to earn rewards for your participation.

:::info
The following instructions apply to setting up an operator in the testnet environment running on Ethereum [Holesky](https://holesky.etherscan.io/) (L1), where the EigenLayer contracts and Othenic contracts responsible for operator rewards are deployed. Additionally, the L2 Polygon [Amoy](https://amoy.polygonscan.com/) network hosts contracts that validate attester signatures and store the current price and its timestamp.
:::

To become an operator in the RedStone AVS network, you’ll need to follow the three steps outlined below.

## Step 1: Registering as an Operator

The first step in becoming an operator involves registering with both the AVS and EigenLayer systems.
This registration process is essential for establishing an identity and enabling participation in the RedStone AVS network.

To register, the following command should be executed in the terminal:

```bash
docker run -it public.ecr.aws/y7v2w8b2/avs-othentic-client:90fc014d operator register
```

After executing the command, the following information will be required:

- **Operator's Private Key**: the private key must be provided to authenticate and secure the operator account.
- **AVS Governance Contract Address**: the following contract address should be entered: [0xfADc5aCf45D7E9ebAB82Dea71E26fe3A9A833337](https://holesky.etherscan.io/address/0xfadc5acf45d7e9ebab82dea71e26fe3a9a833337).

## Step 2: Preparing the Configuration File

The next step involves creating a configuration file that will define the essential parameters needed for the operator to function correctly within the RedStone AVS network.
This configuration file, named `.env`, should contain the following content:

```bash
ORACLE_NODE_WHITELIST=["0x8BB8F32Df04c8b654987DAaeD53D6B6091e3B774","0xdEB22f54738d54976C4c0fe5ce6d408E40d88499","0x51Ce04Be4b3E32572C4Ec9135221d0691Ba7d202","0xDD682daEC5A90d0D295d14DA4b0bec9281017b5bE","0x9c5AE89C4Af6aA32cE58588DBaF90d18a855B6de"]

DATA_FEED_ID=ETH

L1_RPC= # holesky RPC endpoint
L1_CHAIN=17000

L2_RPC=# amoy RPC endpoint
L2_CHAIN=80002

TASK_PERFORMER=0x8074Ab463bcDaEE1D87Ec98959084D659d48d4d5
PRIVATE_KEY= # operator's private key
```

Below is an explanation of each field and information on which fields need to be filled out:

| Parameter               | Description                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `ORACLE_NODE_WHITELIST` | The public keys of trusted oracle nodes from which data will be collected                                              |
| `DATA_FEED_ID`          | The identifier of the token for which the price will be calculated (e.g., ETH for Ethereum)                            |
| `L1_RPC` / `L2_RP`C     | The RPC endpoint addresses for the L1 (Holesky) and L2 (Amoy) networks, respectively                                   |
| `L1_CHAIN` / `L2_CHAIN` | The chain IDs for the L1 and L2 networks                                                                               |
| `TASK_PERFORMER`        | The public key of the task performer responsible for executing specific operations                                     |
| `PRIVATE_KEY`           | The operator's private key provided during registration, which is required for authentication and signing transactions |

:::tip
The fields marked with comments (#) need to be filled in with the appropriate values specific to the operator’s setup.
:::

## Step 3: Running the Operator

To operate within the RedStone AVS network, two Docker images are required: [Attester](/docs/avs/service-components#attester) and [Validation API](/docs/avs/service-components#validation-api).
These images can be launched using the following Docker Compose configuration:

```yaml
services:
  operator-attester:
    image: public.ecr.aws/y7v2w8b2/avs-othentic-client:90fc014d
    command:
      [
        "node",
        "attester",
        "/ip4/52.48.160.32/tcp/9876/p2p/12D3KooWBNFG1QjuF3UKAKvqhdXcxh9iBmj88cM5eU2EK5Pa91KB",
        "--avs-webapi",
        "http://operator-validation-api",
      ]
    env_file:
      - .env
  operator-validation-api:
    image: public.ecr.aws/y7v2w8b2/avs-validation-api:90fc014d
    env_file:
      - .env
```

To start the operator, simply run the following command in the directory containing the `docker-compose.yml` file:

```sh
docker compose up
```

This will initiate both the Attester and the Validation API services as defined in the Docker Compose file.

:::tip
The above two Docker images do not necessarily need to be run using Docker Compose.
Depending on the chosen hosting environment, they can be deployed in a variety of other ways that best suit the operational setup.
:::
