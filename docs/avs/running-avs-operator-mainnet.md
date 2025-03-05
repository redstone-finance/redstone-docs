---
sidebar_position: 5
sidebar_label: "Running AVS Operator (Mainnet)"
---

# Running AVS Operator

Becoming an operator in the RedStone AVS ecosystem is a unique opportunity to play a crucial role in a cutting-edge,
decentralized oracle network.
As an operator, you will contribute directly to the security and accuracy of data that powers smart contracts and
decentralized applications across the blockchain.
Not only will you be helping to maintain the integrity of this innovative system, but you’ll also have the chance to
earn rewards for your participation.

:::info
The following instructions apply to setting up an operator in the mainnet environment running on
Ethereum [Mainnet](https://etherscan.io/) (L1), where the EigenLayer contracts and Othentic contracts responsible for
operator rewards are deployed. Additionally, the L2 Base [Base](https://basescan.org/) network hosts contracts that
validate attester signatures and store the current price and its timestamp.
:::

To become an operator in the RedStone AVS network, you’ll need to follow the four steps outlined below.

## Step 1: Getting Whitelisted as an Operator

In order to register as an Operator, you must be first added to the operator whitelist.

Currently, we are in Phase 1, during which only selected operators are being whitelisted. This process may change in
Phase 2, allowing for broader participation.

## Step 2: Registering as an Operator

After being whitelisted, the next step in becoming an operator involves registering with both the AVS and EigenLayer
systems.
This registration process is essential for establishing an identity and enabling participation in the RedStone AVS
network.

To register, the following command should be executed in the terminal:

```bash
docker run --platform linux/amd64 -it public.ecr.aws/y7v2w8b2/avs-othentic-client:4fe497a6 \
  operator register \
  --l1-chain mainnet
```

After executing the command, the following information will be required:

- **Operator's Private Key** (
  The [Controller Key](https://docs.othentic.xyz/main/avs-framework/othentic-cli/operator-registration#controller-key-and-consensus-key)):
  This is the key used to sign up with the Othentic shared security protocol and is the account to which restakers
  delegate their staked assets.
- **Use a different private key for Consensus?** (
  The [Consensus Key](https://docs.othentic.xyz/main/avs-framework/othentic-cli/operator-registration#controller-key-and-consensus-key)):
  Choose "Yes" if you want to use a separate key for signing consensus messages, otherwise select "No" to use the same
  key.
- **AVS Governance Contract Address**: the following contract address should be
  entered: `0x6f943318b05AD7c6EE596A220510A6D64B518dd8`
- **Rewards Receiver Address** – Optional. If left blank, it defaults to the operator's address.
- If you are not yet registered with EigenLayer, you will be prompted to provide additional details, such as your
  operator name, description, website, logo URL, and Twitter profile.

:::important
After registering, please inform us, so we can add you to
the [restricted attesters list](https://docs.othentic.xyz/main/avs-framework/othentic-consensus/task-and-task-definitions#set-restricted-operator-set-for-a-task)
for the task definition.
:::

## Step 3: Depositing Stake on a Supported Strategy

After registering as an operator in EigenLayer, you must deposit stake on one or more of the supported staking
strategies.
This stake ensures that the operator has a financial commitment to the network.

:::info
Having a non-zero stake is essential to obtain voting power in the RedStone AVS ecosystem. Without it, your operator is
inactive and will not be able to participate effectively in consensus and governance.
:::

Below, you'll find the list of currently supported staking strategies.
You can either use the deposit command provided for each strategy or perform a restake manually via the EigenLayer
application ([Restake](https://app.eigenlayer.xyz/token)).

### EIGEN Strategy

**Strategy Address:** [0xaCB55C530Acdb2849e6d4f36992Cd8c9D50ED8F7](https://etherscan.io/address/0xaCB55C530Acdb2849e6d4f36992Cd8c9D50ED8F7)

**Restake:** https://app.eigenlayer.xyz/restake/EIGEN

**Deposit Command:**

```bash
docker run --platform linux/amd64 -it public.ecr.aws/y7v2w8b2/avs-othentic-client:4fe497a6 \
  operator deposit \
  --l1-chain mainnet \
  --staking-contract EIGENETH
```

### ether.fi Strategy

**Strategy Address:** [0x7079A4277eAF578cbe9682ac7BC3EfFF8635ebBf](https://etherscan.io/address/0x7079A4277eAF578cbe9682ac7BC3EfFF8635ebBf)

**Restake:** https://app.eigenlayer.xyz/token/0xfe0c30065b384f05761f15d0cc899d4f9f9cc0eb

**Deposit Command:**

```bash
docker run --platform linux/amd64 -it public.ecr.aws/y7v2w8b2/avs-othentic-client:4fe497a6 \
  operator deposit \
  --l1-chain mainnet \
  --staking-contract-address 0x7079A4277eAF578cbe9682ac7BC3EfFF8635ebBf
```

### RATT (RedStoneAVSTestToken) Strategy

This is a temporary staking strategy. It will be replaced with the RedStone token in the future.

**Strategy Address:** [0x8a0386043D03EFAd02c992B77F60c0dDc3dBaaaE](https://etherscan.io/address/0x8a0386043D03EFAd02c992B77F60c0dDc3dBaaaE)

**Restake:** https://app.eigenlayer.xyz/token/0x43b1dbb4ceeba4a6d310235964791cecf0e27453

**Deposit Command:**

```bash
docker run --platform linux/amd64 -it public.ecr.aws/y7v2w8b2/avs-othentic-client:4fe497a6 \
  operator deposit \
  --l1-chain mainnet \
  --staking-contract-address 0x8a0386043D03EFAd02c992B77F60c0dDc3dBaaaE
```

## Step 4: Preparing the Configuration File

The next step involves creating a configuration file that will define the essential parameters needed for the operator
to function correctly within the RedStone AVS network.
This configuration file, named `.env`, should contain the fields that are defined in the [.env.example](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/main/packages/restaking/mainnet/operator/.env.example) file.

Below is an explanation of each field and information on which fields need to be filled out:

| Parameter                    | Description                                                                                                                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PRIVATE_KEY`                | The [Consensus Key](https://docs.othentic.xyz/main/avs-framework/othentic-cli/private-key-management#consensus-key)                                                                      |
| `OPERATOR_ADDRESS`           | The public address of the [Controller Key](https://docs.othentic.xyz/main/avs-framework/othentic-cli/private-key-management#controller-key) (optional if both private keys are the same) |
| `L1_RPC` / `L2_RPC`          | The RPC endpoint addresses for the L1 (Ethereum) and L2 (Base) networks, respectively                                                                                                    |
| `AVS_GOVERNANCE_ADDRESS`     | Address of the AVS Governance contract (`0x6f943318b05AD7c6EE596A220510A6D64B518dd8`)                                                                                                    |
| `ATTESTATION_CENTER_ADDRESS` | Address of the Attestatcion Center contract (`0x2B766957ce3dbab9eC4b227f5086855CeE7a1ad6`)                                                                                               |
| `ANNOUNCED_ADDRESSES`        | see frame below for details                                                                                                                                                              |

:::tip

- The fields marked with comments (#) need to be filled in with the appropriate values specific to the operator’s setup.
- Instead of using a `.env` file, you can set these values as system-wide environment variables.
  :::

:::tip
If your docker container has IP address that is publicly available leave `--announced_addresses`
and `$ANNOUNCED_ADDRESSES` parameters in `docker-compose.yml` commented out.
Otherwise, to make sure your node can be connected to from our aggregator node you need to provide your public address
in a form of multi-address [details](https://docs.libp2p.io/concepts/fundamentals/addressing/).
You will need to fill-in `ANNOUNCED_ADDRESSES` variable in `docker-compose.yml`.

- If your node is available via IP address use the form starting with `/ip4/`.
- If, on the other hand, your node is available via domain name use the form starting with `/dns/`.

Both forms require you to learn your `<peer_id>`. To figure out the value that should replace `<peer_id>` placeholder
run node for the first time with `--announced-addresses` commented out
in `docker-compose.yml` and in the logs search for the `Listening on the following addresses` phrase. Peer id starts
with `12D3K`.
Once you know your peer id, uncomment the correct variable in `.env`, fill-in the `<peer_id>`, `<ip_address>` (
or `<domain_name>`) and uncomment `--announced_addresses` and `${ANNOUNCED_ADDRESSES}` params in `docker-compose.yml`.

If your docker container cannot be reached from the internet you still can be an operator but there is a risk that your
node will lose connection to the rest of the network from time to time and you will need to restart it.

See also Othentic [docs](https://docs.othentic.xyz/main/avs-framework/othentic-cli/node-operators) on this topic.
:::

## Step 5: Running the Operator

To operate within the RedStone AVS network, two Docker images are
required: [Attester](/docs/avs/service-components#attester)
and [Validation API](/docs/avs/service-components#validation-api).
These images can be launched using the Docker Compose configuration
available [here](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/restaking/mainnet/operator).
To start the operator, simply run the following command in the directory containing the `docker-compose.yml` file:

```sh
docker compose up
```

This will initiate both the Attester and the Validation API services as defined in the Docker Compose file.

:::tip
The above two Docker images do not necessarily need to be run using Docker Compose.
Depending on the chosen hosting environment, they can be deployed in a variety of other ways that best suit the
operational setup.
:::

### Updating the Operator

In order to update the Operator code:

1. Go to directory with the `docker-compose.yml` file (cloned from
   the [Operator](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/restaking/mainnet/operator)
   repository)
2. `git pull`
3. `docker compose restart`

### Metrics and monitoring

In order to enable monitoring and metrics, start the Operator node with `--metrics --metrics.port <port>` params.
For more details refer to the
Othentic [docs](https://docs.othentic.xyz/main/avs-framework/othentic-cli/add-ons/metrics-and-monitoring#overview).

### Validation API

The RedStone AVS network is using Othentic standard Validation API, which is exposed on the `POST /task/validate`
endpoint.
Refer to the
Othentic [docs](https://docs.othentic.xyz/main/avs-framework/othentic-consensus/validation-service#expose-an-api-endpoint)
for full specification.

### Unregistering the Operator

If you no longer wish to operate within the RedStone AVS network, you need to unregister your Operator with the
following
command:

```sh
docker run --platform linux/amd64 -it public.ecr.aws/y7v2w8b2/avs-othentic-client:4fe497a6 \
operator unregister \
--l1-chain mainnet
```

You will need to provide the Private Key and the address of the AVS Governance
contract - `0x6f943318b05AD7c6EE596A220510A6D64B518dd8`;

### Hardware Requirements

- CPU: 1 vCPU
- RAM: 2 GB
- Storage: 1 GB
- Internet: Stable and fast connection is recommended
