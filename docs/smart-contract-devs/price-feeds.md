---
sidebar_position: 4
sidebar_label: "💹 Price Feeds"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 💹 Price feeds

## Available on chain (Classic Model)

The following feeds are available on-chain and are compatible with the [Chainlink interface](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol).

<Tabs>
  <TabItem value="Ethereum">

| Symbol | Denomination | Deviation threshold | Heartbeat | Contract Address |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| weETH | USD | 1% | 6h | [0xdDb6F90fFb4d3257dd666b69178e5B3c5Bf41136](https://etherscan.io/address/0xdDb6F90fFb4d3257dd666b69178e5B3c5Bf41136#readProxyContract) |
| weETH | ETH | 0.5% | 24h | [0x8751F736E94F6CD167e8C5B97E245680FbD9CC36](https://etherscan.io/address/0x8751F736E94F6CD167e8C5B97E245680FbD9CC36#readProxyContract) | 
| ETHx | USD | 1% | 24h | [0xFaBEb1474C2Ab34838081BFdDcE4132f640E7D2d](https://etherscan.io/address/0xFaBEb1474C2Ab34838081BFdDcE4132f640E7D2d#readProxyContract) | 
| ETHx | ETH | 0.5% | 24h | [0xc799194cAa24E2874Efa89b4Bf5c92a530B047FF](https://etherscan.io/address/0xc799194cAa24E2874Efa89b4Bf5c92a530B047FF#readProxyContract) |
| osETH | ETH | 0.5% | 24h | [0x66ac817f997Efd114EDFcccdce99F3268557B32C](https://etherscan.io/address/0x66ac817f997Efd114EDFcccdce99F3268557B32C#readProxyContract) | 
| swETH | USD | 0.5% | 6h | [0x0704eEc81ea7CF98Aa4A400c65DC4ED5933bddf7](https://etherscan.io/address/0x0704eEc81ea7CF98Aa4A400c65DC4ED5933bddf7#readProxyContract) | 
| swETH | ETH | 0.5% | 6h | [0x061bB36F8b67bB922937C102092498dcF4619F86](https://etherscan.io/address/0x061bB36F8b67bB922937C102092498dcF4619F86#readProxyContract) | 
| XVS | USD | 1% | 24h | [0xa2a8507DEb233ceE4F5594044C259DD0582339CC](https://etherscan.io/address/0xa2a8507DEb233ceE4F5594044C259DD0582339CC#readProxyContract) | 
| C3M | USD | - | 12:00 | [0x6E27A25999B3C665E44D903B2139F5a4Be2B6C26](https://etherscan.io/address/0x6E27A25999B3C665E44D903B2139F5a4Be2B6C26#readProxyContract) | 
| eUSD | USD | 1% | 24h | [0xb347d2e3524D0F9e2321D84A2E9b2e60CbC4A836](https://etherscan.io/address/0xb347d2e3524D0F9e2321D84A2E9b2e60CbC4A836#readProxyContract) | 

  </TabItem>
  <TabItem value="Arbitrum">

| Symbol | Denomination | Deviation threshold | Heartbeat | Contract Address |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| agEUR | USD | 1% | 24h | [0x37963F10245e7c3a10c0E9d43a6E617B4Bc8440A](https://arbiscan.io/address/0x37963F10245e7c3a10c0E9d43a6E617B4Bc8440A#readProxyContract) |
| PREMIA | USD | 0.5% | 24h | [0x50db815D3c4B869F89925690E936ED85b0b76075](https://arbiscan.io/address/0x50db815D3c4B869F89925690E936ED85b0b76075#readProxyContract) | 
| weETH | ETH | 0.5% | 12h | [0x119A190b510c9c0D5Ec301b60B2fE70A50356aE9](https://arbiscan.io/address/0x119A190b510c9c0D5Ec301b60B2fE70A50356aE9#readProxyContract) | 

  </TabItem>
        <TabItem value="Manta">

| Symbol | Denomination | Deviation threshold | Heartbeat | Contract Address |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| ETH | USD | 0.5% | 1h | [0xf4eC1DbD9047153c907e9D4a02CAD85864Ea16dc](https://pacific-explorer.manta.network/address/0xf4eC1DbD9047153c907e9D4a02CAD85864Ea16dc?tab=read_proxy) |

  </TabItem>
    </TabItem>
        <TabItem value="Manta">

| Symbol | Denomination | Deviation threshold | Heartbeat | Contract Address |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| MANTA | USD | 0.5% | 6h | [0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99](https://pacific-explorer.manta.network/address/0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99?tab=read_proxy) |
| STONE | USD | 0.5% | 6h | [0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99](https://pacific-explorer.manta.network/address/0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99?tab=read_proxy) |
| ETH | USD | 0.5% | 6h | [0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99](https://pacific-explorer.manta.network/address/0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99?tab=read_proxy) |
| USDC | USD | 0.5% | 6h | [0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99](https://pacific-explorer.manta.network/address/0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99?tab=read_proxy) |
| wUSDM | USD | 0.5% | 6h | [0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99](https://pacific-explorer.manta.network/address/0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99?tab=read_proxy) |
| wstETH | USD | 0.5% | 6h | [0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99](https://pacific-explorer.manta.network/address/0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99?tab=read_proxy) |
| TIA | USD | 0.5% | 6h | [0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99](https://pacific-explorer.manta.network/address/0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99?tab=read_proxy) |
  *) The feeds on Manta follow the multi-feed interface proposed by LayerBank. 
  Please use the 'priceOf(address)' method passing the address of an asset. 
  </TabItem>
      <!-- <TabItem value="BLAST (Testnet)">

| Symbol | Denomination | Deviation threshold | Heartbeat | Contract Address |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| ETH | USD | 0.5% | 6h | [0x8d6d49Ddd5FE84B6B43d9420D1daC96B88dBa9a1](https://testnet.blastscan.io/address/0x8d6d49Ddd5FE84B6B43d9420D1daC96B88dBa9a1) | 
| BTC | USD | 0.5% | 6h | [0xF2F35eA10FD83E880DD5264009f85936f191ccC3](https://testnet.blastscan.io/address/0xF2F35eA10FD83E880DD5264009f85936f191ccC3) |
| USDB | USD | 0.5% | 6h | [0x4db0b52c85de6196D5449FBdC1B2F96e3F6B51C2](https://testnet.blastscan.io/address/0x4db0b52c85de6196D5449FBdC1B2F96e3F6B51C2) | 

  </TabItem> -->

    <TabItem value="BSC">

| Symbol | Denomination | Deviation threshold | Heartbeat | Contract Address |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| TRX | USD | 0.2% | 10m | [0xa17362dd9ad6d0af646d7c8f8578fddbfc90b916](https://bscscan.com/address/0xa17362dd9ad6d0af646d7c8f8578fddbfc90b916#readProxyContract) | 

  </TabItem>
  <TabItem value="Kava">

| Symbol | Denomination | Deviation threshold | Heartbeat | Contract Address |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| ETH | USD | 0.5% | 1h | [0x5C552051bcD340cC57fa5Fb1ecdF0d896B1379Ec](https://kavascan.com/address/0x5C552051bcD340cC57fa5Fb1ecdF0d896B1379Ec/read-proxy#address-tabs) |
| BTC | USD | 0.5% | 1h | [0x099E81C3A9aA6185c083ac579ef60541418dE8d7](https://kavascan.com/address/0x099E81C3A9aA6185c083ac579ef60541418dE8d7/read-proxy#address-tabs) |
| USDT | USD | 0.2% | 1h | [0xc0c3B20Af1A431b9Ab4bfe1f396b12D97392e50f](https://kavascan.com/address/0xc0c3B20Af1A431b9Ab4bfe1f396b12D97392e50f/read-proxy#address-tabs) |

  </TabItem>
    <TabItem value="Mantle">

| Symbol | Denomination | Deviation threshold | Heartbeat | Contract Address |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| ETH | USD | 0.5% | 1h | [0xFc34806fbD673c21c1AEC26d69AA247F1e69a2C6](https://explorer.mantle.xyz/address/0xFc34806fbD673c21c1AEC26d69AA247F1e69a2C6/contracts?contract-tab=read-proxy#address-tabs) |
| MNT | USD | 0.5% | 1h | [0xed1f0df0b88889e5eA19c768613cDf3DbBF3d2a7](https://explorer.mantle.xyz/address/0xed1f0df0b88889e5eA19c768613cDf3DbBF3d2a7/contracts?contract-tab=read-proxy#address-tabs) |
| wstETH | ETH | 0.5% | 1h | [0xE8d850331faAbb277a24C09d91aabb68fb808748](https://explorer.mantle.xyz/address/0xE8d850331faAbb277a24C09d91aabb68fb808748/contracts?contract-tab=read-proxy#address-tabs) |

  </TabItem>
      <TabItem value="Canto">

| Symbol | Denomination | Deviation threshold | Heartbeat | Contract Address |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| ATOM | USD | - | 1h | 0xCe8937eF7f3874e71C65C55470253B6b86f7C1AB |
| CANTO | USD | - | 1h | 0x93063D743Fc0082121aec5d183e40554468E1568 |
| ETH | USD | - | 1h | 0x6D882e6d7A04691FCBc5c3697E970597C68ADF39 |
| USDC | USD | - | 1h | 0x1b23243882DC7F419Ba01B5a841554f7bb0b9Da1 |
| USDT | USD | - | 1h | 0x5BA83F63c558cedba271a1892188b58360976acc |

  </TabItem>

</Tabs>


## Available to pull (Core Model)

Thanks to its unique design, RedStone can provide 1000+ price feeds for various types of data, including:

- Crypto
- Stocks
- Currencies
- Commodities
- ETFs
- And many more...

You can check all the available data provided by RedStone in [our web app.](https://app.redstone.finance/#/app/tokens)
