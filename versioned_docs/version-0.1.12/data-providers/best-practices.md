---
sidebar_position: 2
sidebar_label: "Best practices"
---

# Best practices

## Failover Capabilities

We recommend having at least two RedStone nodes running at the same time, one of which may have disabled streamr publishing (`ENABLE_STREAMR_BROADCASTING` set to `false`)

## Active monitoring

In order to anticipate and address any issues before their occurrence, a proactive monitoring approach should be implemented. The areas of focus for monitoring may include:

- Node Logs
- CPU and Memory usage
- Running your own monitoring service (like [this one](https://github.com/redstone-finance/redstone-oracles-monorepo/tree/main/packages/oracle-monitoring)) checking if your node's data is available for consumers and frequently updated

## Secure your private keys

Please apply the best security practices for storing your private key. If you suspect that any of your keys is compromised please immediately notify the RedStone team.
