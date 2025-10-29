# Asset Data History

Queries return all available daily Asset Data History. Each field response contains timestamps.

### Asset Data History Definitions

- **Symbol :** Symbol of the asset (e.g. USDT).
- **Stress Indicator:** Stress Indicators are provided as 30 and 90-day averages. To produce the Stress Indicators, Credora calculates daily downside percentage deviations in market price versus redemption value (e.g. USDC vs. USD). Only downside deviations are considered, where price moves above redemption value are assigned a zero for the purposes of the calculation.&#x20;
- **Depeg Data:** Returns a daily deviation percentage in the market price versus the redemption value of an asset.

---

_**Query: Get All Asset Data History**_

```
query GetAssetDataHistory {
    getAssetDataHistory(symbol: "LBTC") {
        symbol
        stressIndicatorData {
            stressIndicator30dPct
            stressIndicator90dPct
            timestamp
        }
        depegData {
            deviationPct
            timestamp
        }
    }
}

```
