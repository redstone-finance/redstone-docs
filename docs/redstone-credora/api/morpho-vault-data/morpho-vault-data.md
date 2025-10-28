# Morpho Vault Data

### Vault Data Definitions

- **ID:** A unique identifier, mirroring those provided via Morpho API.
- **Name:** The name of the Vault.
- **Address:** Address of the Morpho Vault.
- **Loan Asset Symbol**: The symbol of the loan asset.
- **Withdrawal Liquidity:** Provides metrics on Vault withdrawal liquidity.
  - **Withdrawal Liquidity USD:** The sum of unallocated Vault supply and the share of withdrawable liquidity from allocated Markets. The latter is calculated by taking the share of a vault's total supply per market, multiplying it by the available liquidity in the market, and summing across all vault eligible markets.
  - **Withdrawal Liquidity Percentage:** Withdrawal Liquidity USD divided by the Vault supply.

---

**_Query: Get All Vault Data_**

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

**_Query: Get Vault Data by ID_**

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
