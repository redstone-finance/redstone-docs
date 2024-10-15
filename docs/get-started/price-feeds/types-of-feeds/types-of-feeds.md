# 🎓 Types of Oracle Feeds at RedStone

Oracles deliver data feeds directly to dApps or blockchains for the correct execution of transactions in smart contracts. Throughout the past years, the DeFi market has shown various expectations and needs towards the setup of oracle feeds. RedStone is at the forefront of innovation answering the needs of developers in that sector. Therefore, we identify the following types of data feeds:

1. **Market Feed**

   The regular market price derived from centralized and decentralized exchanges, i.e., ETH / USD.

2. **Contract Rate Feed**

   Also known as Exchange Rate or Fundamental Feed. A ratio between the underlying asset and its derivative derived from the smart contract of a protocol, i.e., wstETH / stETH rate derived from Lido contract or weETH / eETH derived from Ether.fi contract.

3. **Real World Feed**

   A feed derived from institutional API or another source providing numerical information, i.e., CESR or SOFR.

4. **Proof of Reserve Feed**

   Also known as Net Asset Value (NAV) feed. A data feed based on API or another source that informs about the value of assets backing tokens issued against it, i.e., Blackrock BUIDL. Technically a subsection of Real World Feed.

5. **Protocol Native Oracle**

   The custom implementation of logic supporting a particular oracle, i.e., Bitcoin Staking Oracle. For example: LBTC / BTC price feed, derived based on the number of LBTC minted and the total amount of BTC deposited into Lombard's system on the Bitcoin chain. Detailed description [here](./lombard.md).

| Feed Type                  | Denomination                                             | Deviation Comes From                             | Complexity of Delivery                                   |
| :------------------------- | :------------------------------------------------------- | :----------------------------------------------- | :------------------------------------------------------- |
| **Market Feed**            | Mainly USD, can also be another currency i.e., ETH / BTC | Market trading                                   | Relatively simple                                        |
| **Contract Rate Feed**     | Underlying asset i.e., ETH for Ethereum LSTs             | Specified ratio changes in the smart contract    | Requires understanding of edge cases and on-chain source |
| **Real World Feed**        | Custom, i.e., for CESR it's a % yield from ETH staking   | Custom, i.e., CESR API is updated every 24 hours | Depends on the feed, usually medium difficulty           |
| **Proof of Reserve Feed**  | Custom, usually USD value                                | Custom, usually every 24 hours from an API       | Depends on the source, usually medium difficulty         |
| **Protocol Native Oracle** | Custom, i.e., BTC in the case of Lombard internal Oracle | Custom, i.e., each X minutes for Lombard         | Usually work-intensive                                   |
