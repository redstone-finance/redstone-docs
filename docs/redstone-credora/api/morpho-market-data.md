# Morpho Market Data

### Market Data Definitions

- **Unique Key:** Unique identifier for the market.
- **Volatility 30D:** Average daily volatility over the prior 30-day period.
- **Market Share:** Calculates the relative size of the specific market, relative to other markets in the Morpho ecosystem sharing the same collateral asset, loan asset, and network. Market Share is based on the total supply into a market.
- **Oracle Type:** Oracle classification, as either Dynamic, Exchange Rate, or Fixed Price.
- **Loan Asset:** Basic information on the Loan Asset.
  - **Name:** Name of the asset.
  - **Symbol:** Symbol of the asset (e.g. USDT).
  - **Address:** The token tracker contract address on the relevant network.
- **Collateral Asset:** Basic information on the Collateral Asset.
  - **Name:** Name of the asset.
  - **Symbol:** Symbol of the asset (e.g. USDT).
  - **Address:** The token tracker contract address on the relevant network.
- **DeFi Depth:** Depth metrics are calculated from multiple DeFi aggregators, including the 0x and 1inch APIs. These provide the liquidity available at multiple slippage intervals, in USD terms. The intervals are 0.5%, 1.0%, 1.5%, and 2.0%.
- **Liquidations 30D:** Multiple metrics on liquidations over the prior 30 days.
  - **Count:** The count of liquidations which have occurred over the prior 30 days.
  - **Ratio:** The total loan liquidation amount over 30 days divided by the average market supply over the prior 30 days, delivered as a percentage.
- **LTV:** Multiple metrics on the market setup and active loan distribution.
  - **LLTV:** The liquidation loan-to-value of the market.
  - **WALTV 30D:** The weighted average LTV of all borrows over the prior 30 days, expressed as a percentage.
  - **WALTV Current:** The current weighted average LTV of the market, expressed as a percentage.
- **Borrow:** Multiple metrics on borrowing activity.
  - **Average 30D:** Average daily borrow amount over the prior 30 days.
  - **Current:** Current active borrow amount.
- **At Risk:** Multiple metrics covering scenario analysis across collateral (CAR) and loans (LAR).
  - **Shock Percentage:** Provides 90th, 95th, and 99th percentile price moves, according to the daily price return distribution produced as part of the Morpho Market Methodology. The return distribution considers 30-day volatility, historical market tail events (prior 3-years), and the credit profile of the collateral asset (PD & LGD).
  - **CAR:** Delivers the collateral at risk of liquidation for each of the shock events.
  - **LAR:** Delivers the loans at risk of liquidation for each of the shock events.

---

**_Query: Get All Market Data_**

```graphql
query GetMarketData {
  getMarketData {
    totalCount
    items {
      uniqueKey
      volatility30d
      marketShare
      oracleType
      loanAsset {
        name
        symbol
        address
      }
      collateralAsset {
        name
        symbol
        address
      }
      defiDepth {
        depth50Bp
        depth100Bp
        depth150Bp
        depth200Bp
      }
      liquidations30d {
        count
        ratioPercentage
      }
      ltv {
        lltv
        waltv30dPercentage
        waltvCurrentPercentage
      }
      borrow {
        avg30d
        current
      }
      atRisk {
        priceShock {
          percentage90
          percentage95
          percentage99
        }
        car {
          percentage90
          percentage95
          percentage99
        }
        lar {
          percentage90
          percentage95
          percentage99
        }
      }
      oracleType
    }
  }
}
```

**_Query: Get Morpho Market Data by Unique Key_**

```graphql
query getMarketData {
  getMarketDataByUniqueKey(uniqueKey: "uniqueKey") {
    uniqueKey
    volatility30d
    marketShare
    oracleType
    loanAsset {
      name
      symbol
      address
    }
    collateralAsset {
      name
      symbol
      address
    }
    defiDepth {
      depth50Bp
      depth100Bp
      depth150Bp
      depth200Bp
    }
    liquidations30d {
      count
      ratioPercentage
    }
    ltv {
      lltv
      waltv30dPercentage
      waltvCurrentPercentage
    }
    borrow {
      avg30d
      current
    }
    atRisk {
      priceShock {
        percentage90
        percentage95
        percentage99
      }
      car {
        percentage90
        percentage95
        percentage99
      }
      lar {
        percentage90
        percentage95
        percentage99
      }
    }
    oracleType
  }
}
```
