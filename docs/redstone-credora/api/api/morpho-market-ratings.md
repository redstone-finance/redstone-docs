# Morpho Market Ratings

### Market Ratings Definitions

- **ID:** UID for the market, assigned by Credora.&#x20;
- **Unique Key:** Unique key for the market.
- **Chain ID:** Chain identifier (e.g. 1 for Ethereum).
- **Market Metrics:** Provides rating metrics derived from the application of of the Morpho Market Methodology, and tangent fields.
  - **Rating:** Implied rating according to Credora’s rating scale.
  - **PSL:** 1-year probability of significant loss, where significant loss is defined as a 1% loss on market supply.
  - **Score:** Score according to Credora’s scale.
  - **Protocol Adjustment:** Net adjustment for protocol risk (e.g. 0.25%). Adjustment is derived from the Credora Smart Contract Custody methodology.
  - **Oracle Adjustment:** Net notch adjustment applied for the Oracle configuration (e.g. -0.5).
  - **Status:** Set as either Firm or Indicative, depending on the classification of the collateral asset rating.
  - **Publish Date:** The date on which the rating was last updated.&#x20;
  - **Under Review:** A flag assigned where market events necessitate an update in the application of the standardized methodology. Market assignment depends on collateral asset assignment.&#x20;
- **Collateral Metrics:** Provides rating metrics utilized to produce the Market Ratings. These are the Consensus Ratings at the time of the market rating update.
  - **Rating:** Implied consensus rating according to Credora’s rating scale.
  - **PD:** Consensus 1-year probability of default.
  - **Score:** Consensus score according to Credora’s scale.
- **LLTV:** The liquidation loan-to-value of the market.
- **LIF:** The liquidation incentive factor for the market.
- **Loan Asset:** Identifiers for the loan asset.
  - **Morpho ID:** UID for the asset, assigned by Morpho.&#x20;
  - **Symbol:** Asset symbol (e.g. USDT).
- **Collateral Asset:** Identifiers for the collateral asset
  - **ID:** UID for the asset, assigned by Morpho.&#x20;
  - **Symbol:** Asset symbol (e.g. USDT).
- **Oracle:** Identifiers and classifications for the Oracle.
  - **Oracle Address:** Oracle contract address.
  - **Oracle Type:** Oracle classification, as either Dynamic, Exchange Rate, or Fixed Price.

---

_**Query: Get All Market Ratings V2**_\
\
**Pagination**

The getMarketRatings endpoint supports pagination through the optional query parameters **page** and **limit**.

- page: The page number to retrieve. Default is 0.
- limit: The number of records per page. Default is 10.

If not specified, the endpoint will return the first 10 records (page=0, limit=10).

```
query {
  getMarketRatings(page:0, limit : 10) {
    totalCount
    items {
      id
      uniqueKey
      chainId
      marketMetrics {
               rating
               score
               psl
               protocolAdjustment
               oracleAdjustment
               status
               publishDate
               underReview
      }
      collateralMetrics {
               status
               rating
               pd
               score
      }
      lltv
      lif
      collateralAsset {
        id
        symbol
      }
      loanAsset {
        id
        symbol
      }
      oracle {
        oracleAddress
        oracleType
      }
    }
  }
}
```

_**Query: Get Market Rating by Unique Key V2**_

```
 query GetMarket {
    getMarketRating(uniqueKey: "uniqueKey") {
        id
        uniqueKey
        chainId
        marketMetrics {
                 rating
                 score
                 psl
                 protocolAdjustment
                 oracleAdjustment
                 status
                 publishDate
                 underReview
        }
        collateralMetrics {
                 status
                 rating
                 pd
                 score
        }
        lltv
        lif
        collateralAsset {
          id
          symbol
        }
        loanAsset {
          id
          symbol
        }
        oracle {
          oracleAddress
          oracleType
        }
      }
    }
```
