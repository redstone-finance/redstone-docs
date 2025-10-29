# Asset Data

### Asset Data Definitions

- **Symbol:** Symbol of the asset (e.g. USDT).
- **Depeg Events:** A count of depeg events for 0.25% and 1.0% thresholds, where a depeg event is registered if the daily price close for a specific asset relative to the redemption value exceeds the specified percentage. Depeg Event counts are provided for 30 and 90-days.
- **Stress Indicator:** Stress Indicators are provided as 30 and 90-day averages. To produce the Stress Indicators, Credora calculates daily downside percentage deviations in market price versus redemption value (e.g. USDC vs. USD). Only downside deviations are considered, where price moves above redemption value are assigned a zero for the purposes of the calculation.

---

_**Query: Get All Asset Data**_

```graphql
query {
  getAssetData {
    totalCount
    items {
      symbol
      stressIndicator {
        indicator30dPct
        indicator90dPct
      }
      depegEvents30d {
        depeg25Bp
        depeg100Bp
      }
      depegEvents90d {
        depeg25Bp
        depeg100Bp
      }
    }
  }
}
```

_**Query: Get Asset Data by Symbol**_

```graphql
query GetAssetDataBySymbol {
  getAssetDataBySymbol(symbol: "USDC") {
    symbol
    stressIndicator {
      indicator30dPct
      indicator90dPct
    }
    depegEvents30d {
      depeg25Bp
      depeg100Bp
    }
    depegEvents90d {
      depeg25Bp
      depeg100Bp
    }
  }
}
```
