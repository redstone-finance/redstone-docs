# Vault Data History

Queries return all available daily Vault Data History. Each field response contains timestamps.

### Vault Data History Definitions

- **APY Data**: Returns various metrics on Vault APY.
  - **APY:** Excludes rewards and performance fee deductions.
  - **Net APY:** Includes rewards and performance fee deductions.
- **Withdrawal Liquidity Data:** Provides metrics on Vault withdrawal liquidity.&#x20;
  - **Withdrawal Liquidity Usd:** The sum of unallocated Vault supply and the share of withdrawable liquidity from allocated Markets. The latter is calculated by taking the share of a vault’s total supply per market, multiplying it by the available liquidity in the market, and summing across all vault eligible markets.&#x20;
  - **Withdrawal Liquidity Pct:** Withdrawal Liquidity USD divided by the Vault supply.

---

_**Query: Get All Asset Data History**_

```graphql
query GetVaultDataHistory {
  getVaultDataHistory(address: "address-of-the-vault") {
    apyData {
      apy
      netApy
      timestamp
    }
    withdrawalLiquidityData {
      withdrawalLiquidityPct
      withdrawalLiquidityUsd
      timestamp
    }
  }
}
```

```

```
