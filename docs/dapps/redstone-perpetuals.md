---
sidebar_position: 3
sidebar_label: "Perpetuals"
---

# Perpetuals

RedStone works with perpetual-futures protocols on a **partnership basis**, not as a simple data vendor. Our philosophy is that a safe, production-ready perps market requires an **end-to-end integration**, where oracle logic is co-designed, iterated on, and maintained alongside the protocol.

Perpetual futures are fundamentally different from other DeFi integrations. A perps market runs **24/7**, must respond to **real-world price action**, and relies on **tight feedback loops** between oracle, funding-rate mechanics, liquidation logic, the protocol’s risk framework, and the activity on the internal perp market. Because of this, a simple “plug in a price feed” approach is not enough.

## Why We Offer End-to-End Integrations

Perps oracles require continuous updates, adjustments to smoothing parameters, changes to aggregation logic, and operational responses during real-time events. This is why we treat each integration as an ongoing engineering project rather than a one-time product delivery.

### Continuous 24/7 Pricing

Perpetuals trade around the clock. Assets like equities do not. If the oracle stops updating during overnight sessions, weekends, or holidays, the mark price freezes and the entire system becomes unreliable. A perps oracle must generate synthetic prices during closed or thin-liquidity periods so that the market remains functional at all times.

### Corruption-Resistant Aggregation

Single-source or simplistic aggregation exposes the protocol to bad ticks, stale data, outages, and external manipulation. Perps need multi-source aggregation with filtering methods that can reject corrupted or abnormal data. Without this, a single upstream failure can propagate directly into the mark price and affect funding, liquidations, and user positions.

### Smooth and Stable Price Evolution

Spot prices can move abruptly, but a perps engine cannot tolerate abrupt jumps. When mark prices update too aggressively, the result is unnecessary liquidation cascades and instability across the entire system. A perps oracle must provide a controlled price evolution using smoothing techniques, clamps, and transition logic so that sudden regime changes are handled gracefully rather than amplified.

### Off-Hours Valuation

When an underlying market is fully closed, there is no authoritative spot price. A naive oracle either freezes or produces updates that do not reflect real trading conditions. A perps oracle must include an off-hours valuation methodology that produces conservative, orderly prices when the underlying market cannot offer guidance. Without this, overnight and weekend trading becomes unpredictable.

### Operational Resilience

A perps market cannot rely on a single relayer or minimal infrastructure. The oracle layer must be able to withstand network issues, node failures, and other disruptions without interrupting price updates. This requires redundant transmission paths, multiple relayers, and robust key-management practices to ensure continuous operation under stress.

### Event-Aware Logic

Corporate actions such as stock splits, reverse splits, mergers, or tender offers change the economic meaning of an asset’s price. Without event-aware handling, the perp market becomes distorted or stuck. A perps oracle must detect and adjust for these events so that the mark price remains coherent and the market continues operating normally.

## Comparison: Off-the-Shelf Price Feeds vs. RedStone End-to-End Perps Integration

| Area                   | Off-the-Shelf Spot Feed                                   | RedStone End-to-End Perps Integration                                   |
| ---------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| Market Coverage        | Stops when underlying markets close                       | Continuous 24/7 pricing, including synthetic off-hours values           |
| Price Behavior         | Raw spot price                                            | Smoothed mark price with controlled transitions                         |
| Data Integrity         | Often single-source or minimally aggregated               | Corruption-resistant multi-source aggregation                           |
| Corporate Actions      | Unsupported                                               | Event-aware adjustments                                                 |
| Reliability            | Dependent on vendor uptime                                | Redundant relayers and infrastructure designed for continuous operation |
| Integration Model      | One-time setup                                            | Ongoing engineering collaboration                                       |
| Real-World Performance | Prone to mispricing during volatility and market closures | Designed to maintain usable mark prices in those conditions             |

If you have a specific integration in mind, please contact RedStone on the designated channel [on Discord](https://discord.gg/redstonedefi).
