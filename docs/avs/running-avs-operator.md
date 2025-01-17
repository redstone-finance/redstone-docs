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

To become an operator in the RedStone AVS network, you’ll need to follow the four steps outlined below.

## Step 1: Getting Whitelisted as an Operator

In order to register as an Operator, you must be first added to the operator whitelist.

Currently, we are in Phase 1, during which only selected operators are being whitelisted. This process may change in Phase 2, allowing for broader participation.

## Step 2: Registering as an Operator

After being whitelisted, the next step in becoming an operator involves registering with both the AVS and EigenLayer systems.
This registration process is essential for establishing an identity and enabling participation in the RedStone AVS network.

To register, the following command should be executed in the terminal:

```bash
docker run --platform linux/amd64 -it public.ecr.aws/y7v2w8b2/avs-othentic-client:b0ea48ab operator register
```

After executing the command, the following information will be required:

- **Operator's Private Key** (The [Controller](https://docs.othentic.xyz/main/avs-framework/othentic-cli/operator-registration#controller-key-and-consensus-key) key): This is the key used to sign up with the Othentic shared security protocol and is the account to which restakers delegate their staked assets.
- **Signing Key** (The [Consensus](https://docs.othentic.xyz/main/avs-framework/othentic-cli/operator-registration#controller-key-and-consensus-key) key): In Testnet environment it is the same as the Operator's Private Key. This is the key used by the node itself to sign consensus messages.
- **AVS Governance Contract Address**: the following contract address should be entered: [0xBA7A7CaEE3b1ed84a98dBc20Ea20fe21FE7D557e](https://holesky.etherscan.io/address/0xBA7A7CaEE3b1ed84a98dBc20Ea20fe21FE7D557e).

## Step 3: Preparing the Configuration File

The next step involves creating a configuration file that will define the essential parameters needed for the operator to function correctly within the RedStone AVS network.
This configuration file, named `.env`, should contain the following content:

```bash
DATA_SERVICE_ID=redstone-primary-prod
DATA_FEED_ID=ETH

L1_RPC= # holesky RPC endpoint
L1_CHAIN=17000

L2_RPC= # amoy RPC endpoint
L2_CHAIN=80002

AVS_GOVERNANCE_ADDRESS=0xBA7A7CaEE3b1ed84a98dBc20Ea20fe21FE7D557e
ATTESTATION_CENTER_ADDRESS=0xA8779c817C748b15122EF572c195019601715BBe
PRIVATE_KEY= # operator's private key
```

Below is an explanation of each field and information on which fields need to be filled out:

| Parameter               | Description                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `DATA_SERVICE_ID`       | Service ID, for production environment it is `redstone-primary-prod`                                                   |
| `DATA_FEED_ID`          | The identifier of the token for which the price will be calculated (e.g., ETH for Ethereum)                            |
| `L1_RPC` / `L2_RP`C     | The RPC endpoint addresses for the L1 (Holesky) and L2 (Amoy) networks, respectively                                   |
| `L1_CHAIN` / `L2_CHAIN` | The chain IDs for the L1 and L2 networks                                                                               |
| `PRIVATE_KEY`           | The operator's private key provided during registration, which is required for authentication and signing transactions |

:::tip
The fields marked with comments (#) need to be filled in with the appropriate values specific to the operator’s setup.
:::

## Step 4: Running the Operator

To operate within the RedStone AVS network, two Docker images are required: [Attester](/docs/avs/service-components#attester) and [Validation API](/docs/avs/service-components#validation-api).
These images can be launched using the following Docker Compose configuration:

```yaml
services:
  operator-attester:
    image: public.ecr.aws/y7v2w8b2/avs-othentic-client:b0ea48ab
    platform: linux/amd64
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
    image: public.ecr.aws/y7v2w8b2/avs-validation-api:b0ea48ab
    platform: linux/amd64
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
