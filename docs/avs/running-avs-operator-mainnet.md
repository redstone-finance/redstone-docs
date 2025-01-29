---
sidebar_position: 5
sidebar_label: "🛠️ Running AVS Operator (Mainnet)"
---

# Running AVS Operator

Becoming an operator in the RedStone AVS ecosystem is a unique opportunity to play a crucial role in a cutting-edge, decentralized oracle network.
As an operator, you will contribute directly to the security and accuracy of data that powers smart contracts and decentralized applications across the blockchain.
Not only will you be helping to maintain the integrity of this innovative system, but you’ll also have the chance to earn rewards for your participation.

:::info
The following instructions apply to setting up an operator in the mainnet environment running on Ethereum [Mainnet](https://etherscan.io/) (L1), where the EigenLayer contracts
and Othenic contracts responsible for operator rewards are deployed. Additionally, the L2 Base [Base](https://basescan.org/) network hosts contracts that validate attester signatures
and store the current price and its timestamp.
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
docker run --platform linux/amd64 -it public.ecr.aws/y7v2w8b2/avs-othentic-client:fc63f951 \
  operator register \
  --l1-chain mainnet
```

After executing the command, the following information will be required:

- **Operator's Private Key** (The [Controller Key](https://docs.othentic.xyz/main/avs-framework/othentic-cli/operator-registration#controller-key-and-consensus-key)): This is the key used to sign up with the Othentic shared security protocol and is the account to which restakers delegate their staked assets.
- **Use a different private key for Consensus?** (The [Consensus Key](https://docs.othentic.xyz/main/avs-framework/othentic-cli/operator-registration#controller-key-and-consensus-key)): Choose "Yes" if you want to use a separate key for signing consensus messages, otherwise select "No" to use the same key.
- **AVS Governance Contract Address**: the following contract address should be entered: `0x6f943318b05AD7c6EE596A220510A6D64B518dd8`
- **Rewards Receiver Address** – Optional. If left blank, it defaults to the operator's address.
- If you are not yet registered with EigenLayer, you will be prompted to provide additional details, such as your operator name, description, website, logo URL, and Twitter profile.

## Step 3: Depositing Stake on a Supported Strategy

After registering as an operator in EigenLayer, you must deposit stake on one of the supported staking strategies.
This stake ensures that the operator has a financial commitment to the network.

:::important
Having a non-zero stake is essential to obtain voting power in the RedStone AVS ecosystem. Without it, your operator is inactive and will not be able to participate effectively in consensus and governance.
:::

Below, you'll find the list of currently supported staking strategies.
You can either use the deposit command provided for each strategy or perform a restake manually via the EigenLayer application ("Restake" link).

### EIGEN Strategy

**Strategy Address:** [0x7079A4277eAF578cbe9682ac7BC3EfFF8635ebBf](https://etherscan.io/address/0x7079A4277eAF578cbe9682ac7BC3EfFF8635ebBf)

**Restake:** https://app.eigenlayer.xyz/restake/EIGEN

**Deposit Command:**

```bash
docker run --platform linux/amd64 -it public.ecr.aws/y7v2w8b2/avs-othentic-client:fc63f951 \
  operator deposit \
  --l1-chain mainnet \
  --staking-contract EIGENETH
```

### ether.fi Strategy

**Strategy Address:** [0x83E9115d334D248Ce39a6f36144aEaB5b3456e75](https://etherscan.io/address/0x83E9115d334D248Ce39a6f36144aEaB5b3456e75)

**Deposit Command:**

```bash
docker run --platform linux/amd64 -it public.ecr.aws/y7v2w8b2/avs-othentic-client:fc63f951 \
  operator deposit \
  --l1-chain mainnet \
  --staking-contract-address 0x7079A4277eAF578cbe9682ac7BC3EfFF8635ebBf
```

### RATT (RedStoneAVSTestToken) Strategy

This is a temporary staking strategy. It will be replaced with the final AVS token in the future.

**Strategy Address:** [0x8a0386043D03EFAd02c992B77F60c0dDc3dBaaaE](https://etherscan.io/address/0x8a0386043D03EFAd02c992B77F60c0dDc3dBaaaE)

**Deposit Command:**

```bash
docker run --platform linux/amd64 -it public.ecr.aws/y7v2w8b2/avs-othentic-client:fc63f951 \
  operator deposit \
  --l1-chain mainnet \
  --staking-contract-address 0x8a0386043D03EFAd02c992B77F60c0dDc3dBaaaE
```

## Step 4: Preparing the Configuration File

The next step involves creating a configuration file that will define the essential parameters needed for the operator to function correctly within the RedStone AVS network.
This configuration file, named `.env`, should contain the following content:

```bash
PRIVATE_KEY = # the Consensus Key of the operator
OPERATOR_ADDRESS = # the public address of the Controller Key.

L1_RPC= # ethereum mainnet RPC endpoint
L2_RPC= # base RPC endpoint

AVS_GOVERNANCE_ADDRESS=0x6f943318b05AD7c6EE596A220510A6D64B518dd8
ATTESTATION_CENTER_ADDRESS=0x2B766957ce3dbab9eC4b227f5086855CeE7a1ad6
```

Below is an explanation of each field and information on which fields need to be filled out:

| Parameter           | Description                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `PRIVATE_KEY`       | The [Consensus Key](https://docs.othentic.xyz/main/avs-framework/othentic-cli/private-key-management#consensus-key)                         |
| `OPERATOR_ADDRESS`  | The public address of the [Controller Key](https://docs.othentic.xyz/main/avs-framework/othentic-cli/private-key-management#controller-key) |
| `L1_RPC` / `L2_RPC` | The RPC endpoint addresses for the L1 (Ethereum) and L2 (Base) networks, respectively                                                       |

:::tip
The fields marked with comments (#) need to be filled in with the appropriate values specific to the operator’s setup.
:::

## Step 5: Running the Operator

To operate within the RedStone AVS network, two Docker images are required: [Attester](/docs/avs/service-components#attester) and [Validation API](/docs/avs/service-components#validation-api).
These images can be launched using the following Docker Compose configuration:

```yaml
services:
  operator-attester:
    image: public.ecr.aws/y7v2w8b2/avs-othentic-client:fc63f951
    platform: linux/amd64
    command:
      [
        "node",
        "attester",
        "/dns/prod-aggregator1-p2p.a.redstone.finance/tcp/3000/p2p/12D3KooWSBMPURmCU5B8nuXkUw1Tq26FuvDg5LsEcs4WX8dqAxWJ",
        "--avs-webapi",
        "http://operator-validation-api",
        "--avs-webapi-port",
        "4002",
        "--p2p.port",
        "3000",
        "--l1-chain",
        "mainnet",
        "--l2-chain",
        "base",
      ]
    env_file:
      - .env
  operator-validation-api:
    image: public.ecr.aws/y7v2w8b2/avs-validation-api:fc63f951
    platform: linux/amd64
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
