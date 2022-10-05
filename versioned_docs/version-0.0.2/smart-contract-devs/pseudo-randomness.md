---
sidebar_position: 7
sidebar_label: "🎲 Pseudo randomness"
---

# 🎲 Pseudo randomness

RedStone deliver entropy proxied from https://drand.love/, which can be used to power pseudo-random number generation in Smart Contracts.

### Example with RedStone's randomness

- [Smart Contract](https://github.com/redstone-finance/redstone-evm-connector-examples/blob/main/contracts/example-pseudo-random.sol)
- [JS code](https://github.com/redstone-finance/redstone-evm-connector-examples/blob/main/test/example-pseudo-random.test.js)

:::caution
Randomness provided by RedStone is not production-ready, you can defintely use it for proof of concepts or hackathon projects, but we do not recommend to use it with production dApps. You can check out [Witnet Randomness powered by Crowd-Witnessing](https://docs.witnet.io/) or [Chainlink VRF.](https://docs.chain.link/docs/vrf/v2/introduction/) instead.
:::
