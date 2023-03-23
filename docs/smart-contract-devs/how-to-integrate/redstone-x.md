---
sidebar_position: 3
sidebar_label: "⏱ X (no front-running)"
---

# ⏱ Redstone X
## An eXtreme protection against front-running

The model implements a `Deferred execution pattern` where transactions are processed in two steps:

1. A user initiates the transaction by recording on-chain an intention to interact with the protocol (ie. open a perpetual position) without knowing the context (ie. price) in which the transaction will be executed. This mitigates any attempts to arbitrage the protocols by front-running price delivery from Oracles. 

2. The price is delivered only in the second step, which usually happens at the very next block. Anyone (including the user himself) could provide on-chain a price that is valid in the very next block and such a price will be used to settle the transaction. 

This model was popularised by perpetual protocols such as [GMX](https://gmx.io/#/) and it enables a new wave of super-efficient DeFi projects that are rapidly growing despite the bear market. 

:::important Requirements
TLDR; You need to do 2 things:

1. Adjust your contracts to execute price-sensitive transactions in 2-phases (we provide libraries to facilitate it).
2. Deploy a relayer that automatically fetches the price and triggers the execution.  
:::

![Redstone X diagram](/img/redstone-x.png)


:::caution Details are coming
We actively develop this model and detailed documentation will be put in here soon when we finalize the implementation. 
:::
