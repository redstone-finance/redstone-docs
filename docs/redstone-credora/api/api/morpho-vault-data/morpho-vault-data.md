# Morpho Vault Data

### Vault Data Definitions

- **ID:** A unique identifier, mirroring those provided via Morpho API.
- **Name:** The name of the Vault.
- **Address:** Address of the Morpho Vault.&#x20;
- **Loan Asset Symbol**: The symbol of the loan asset.
- **Withdrawal Liquidity:** Provides metrics on Vault withdrawal liquidity.&#x20;
  - **Withdrawal Liquidity USD:** The sum of unallocated Vault supply and the share of withdrawable liquidity from allocated Markets. The latter is calculated by taking the share of a vault's total supply per market, multiplying it by the available liquidity in the market, and summing across all vault eligible markets.
  - **Withdrawal Liquidity Percentage:** Withdrawal Liquidity USD divided by the Vault supply.

---

_**Query: Get All Vault Data**_

```graphql
query GetVaultData {
  getVaultData {
    totalCount
    items {
      id
      name
      loanAssetSymbol
      address
      withdrawalLiquidity {
        withdrawalLiquidityUsd
        withdrawalLiquidityPct
      }
    }
  }
}
```

_**Query: Get Vault Data by ID**_

```graphql
query GetVaultDataById {
  getVaultDataById(id: "vault-id") {
    id
    name
    loanAssetSymbol
    address
    withdrawalLiquidity {
      withdrawalLiquidityUsd
      withdrawalLiquidityPct
    }
  }
}
```
