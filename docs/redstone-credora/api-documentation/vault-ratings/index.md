# Vault Ratings

## Overview

The Vault Ratings API provides comprehensive rating information for DeFi vaults, derived from Credora's proprietary risk assessment methodology. Each vault rating includes quantitative risk metrics, qualitative assessments, and curator information.

## Vault Ratings Definitions

- **ID**: Unique identifier for the vault
- **Address**: On-chain address of the vault
- **Chain ID**: Standard chain identifier (e.g., `1` for Ethereum, `8453` for Base)
- **Curator**: Name of the Vault curator.
- **Name**: Human-readable name of the vault
- **Protocol**: Protocol name (e.g., _Morpho_)
- **Metrics**: Rating metrics and risk assessment data
  - **Rating**: Rating output on the DeFi scale, designed to be more intuitive for all users
  - **Publish Date**: The date on which the Vault Rating was last updated (format: `YYYY-MM-DD`)
  - **PSL**: Probability of Significant Loss — annualized probability of a 1% loss on market supply

---

## Available Queries

---

### Get Single Vault Rating

Retrieve detailed rating information for a specific vault by its ID or address.

#### Query

```graphql
query GetVaultRating {
  getVaultRating(id: "id") {
    id
    address
    chainId
    protocol
    Metrics {
      rating
      psl
      publishDate
    }
    curator {
      name
    }
  }
}
```

##### Example response

```json
{
  "data": {
    "getVaultRating": {
      "id": "cd8b167e-dc4c-475b-9265-429b2c197bb9",
      "address": "0x0D05e6ec0A10f9fFE9229EAA785c11606a1d13Fb",
      "chainId": 8453,
      "name": "Gauntlet LBTC Core",
      "protocol": "Morpho",
      "curator": {
        "name": "Curator Name"
      },
      "Metrics": {
        "rating": "A-",
        "psl": 0.00428,
        "publishDate": "2025-19-09"
      }
    }
  }
}
```

### Query: Get All Vault Ratings

Retrieve a paginated list of all available vault ratings.

#### Pagination

The getVaultRatings endpoint supports pagination via optional parameters:

- page: Zero-indexed page number. The default is 0.

- limit: Number of results per page. The default is 10. Must be between 1 and 1000.

##### Query

```graphql
query {
  getVaultRatings(page: 0, limit: 2) {
    totalCount
    items {
      id
      address
      chainId
      name
      protocol
      Metrics {
        rating
        psl
        publishDate
      }
      curator {
        name
      }
    }
  }
}
```

##### Example response\*\*

```json
{
  "data": {
    "getVaultRatings": {
      "totalCount": 70,
      "items": [
        {
          "id": "cd8b167e-dc4c-475b-9265-429b2c197bb9",
          "address": "0x059Fc6723b9bF77DbF4283C8d7C90eA8Af44EF10",
          "chainId": 1,
          "name": "SwissBorg tBTC",
          "protocol": "Morpho",
          "Metrics": {
            "rating": "A+",
            "psl": 0.0011200000000000001,
            "publishDate": "2025-19-09"
          },
          "curator": {
            "name": "Gauntlet"
          }
        },
        {
          "id": "f238d012-1c90-42e4-b6d1-612dbc735947",
          "address": "0x0D05e6ec0A10f9fFE9229EAA785c11606a1d13Fb",
          "chainId": 8453,
          "name": "Gauntlet LBTC Core",
          "protocol": "Morpho",
          "Metrics": {
            "rating": "A-",
            "psl": 0.00428,
            "publishDate": "2025-19-09"
          },
          "curator": {
            "name": "Gauntlet"
          }
        }
      ]
    }
  }
}
```
