# Asset Ratings

### Asset Ratings Definitions

- **ID:** UID for the asset, assigned by Credora.&#x20;
- **Address:** Asset token tracker contract address on the relevant network.
- **Symbol:** Asset symbol (e.g. USDT).
- **Chain ID:** Chain identifier (e.g. 1 for Ethereum).
- **Consensus Metrics:** Provides consensus rating metrics.
  - **Consensus Rating:** Implied consensus rating according to Credora’s rating scale.
  - **Consensus PD:** Consensus 1-year probability of default.
  - **Consensus Score:** Consensus score according to Credora’s scale.&#x20;
- **Credora Metrics:** Provides rating metrics derived from the application of standardized methodologies, and tangent fields.
  - **Rating:** Implied rating according to Credora’s rating scale.
  - **PD:** 1-year probability of default.
  - **Score:** Score according to Credora’s scale.
  - **Status:** Set as either Firm or Indicative. Firm ratings are issued on assets where Credora has a direct engagement, and therefore may have access to additional information.&#x20;
  - **Publish Date:** Date of the latest rating update.
  - **Valid Until:** Date before which the rating will be updated.&#x20;
  - **Under Review:** A flag assigned where market events necessitate an update in the application of the standardized methodology.&#x20;
  - **Methodology:** The set of public methodologies utilized in the assignment of a rating.
  - **Report:** The URL of any associated reports produced by Credora.

---

_**Query: Get All Asset Ratings V2**_\
\
**Pagination**

The getAssetRatings endpoint supports pagination through the optional query parameters **page** and **limit**.

- page: The page number to retrieve. Default is 0.
- limit: The number of records per page. Default is 10.

If not specified, the endpoint will return the first 10 records (page=0, limit=10).

```
query {
   getAssetRatings(page:0, limit: 10) {
       totalCount
       items {
           id
           address
           symbol
           chainId
           consensusMetrics {
               consensusRating
               consensusPd
               consensusScore
           }
           credoraMetrics {
               rating
               pd
               score
               status
               publishDate
               validUntil
               underReview
               methodology
               report
               lgd {
                min
                max
              }
           }
       }
   }
}
```

_**Query: Get Asset Rating by ID V2**_

```
query {
   getAssetRatings(id: "008f7587-6b62-4691-8378-c38b199cdcab") {
       id
       address
       symbol
       chainId
       consensusMetrics {
           consensusRating
           consensusPd
           consensusScore
       }
       credoraMetrics {
           rating
           pd
           score
           status
           publishDate
           validUntil
           underReview
           methodology
           report
           lgd {
                min
                max
          }
       }
   }
}
```
