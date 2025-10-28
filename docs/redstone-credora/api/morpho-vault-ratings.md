# Morpho Vault Ratings

### Vault Ratings Definitions

- **ID:** A unique identifier, mirroring those provided via Morpho API.
- **Address:** Address of the Morpho Vault.
- **Chain ID:** Standard chain identifiers for the Vault (e.g. 1 for Ethereum).
- **Eligible Markets:** A set of the Vault's eligible Market unique identifiers.
- **Vault Metrics:** Provides rating metrics derived from the application of of the Morpho Vault Methodology, and tangent fields.
  - **Rating:** Vault Implied Rating output from Morpho Vault Methodology, on the standard Credora Rating scale.
  - **Morpho Rating:** Rating output on the Morpho specific scale, designed to be more intuitive for all users.
  - **PSL:** Vault probability of significant loss output from Morpho Vault rating methodology, defined as the annualized probability of a 1% loss on market supply.
  - **Score:** Score according to Credora's scale.
  - **Notch Adjustment:** The net notch adjustment applied as part of the Morpho Vault Methodology, considering Curator Track Record, Guardian configurations, and other variables.
  - **Status:** Set as either Firm or Indicative, depending on the classification of the collateral asset rating.
  - **Publish Date:** The date on which the Vault Rating was last updated.
- **Curator:** Name of the Vault curator.

---

**_Query: Get All Vault Ratings V2_**

### Pagination

The getVaultRatings endpoint supports pagination through the optional query parameters **page** and **limit**.

- page: The page number to retrieve. Default is 0.
- limit: The number of records per page. Default is 10.

If not specified, the endpoint will return the first 10 records (page=0, limit=10).

```graphql
query {
  getVaultRatings(page: 0, limit: 10) {
    totalCount
    items {
      id
      address
      chainId
      eligibleMarkets
      vaultMetrics {
        rating
        morphoRating
        psl
        score
        notchAdjustment
        status
        publishDate
      }
      curator {
        name
      }
    }
  }
}
```

**_Query: Get Vault Rating by ID V2_**

```graphql
query GetVault {
  getVault(id: "id") {
    id
    address
    chainId
    eligibleMarkets
    vaultMetrics {
      rating
      morphoRating
      psl
      score
      notchAdjustment
      status
      publishDate
    }
    curator {
      name
    }
  }
}
```
