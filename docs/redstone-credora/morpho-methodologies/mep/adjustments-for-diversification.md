# Adjustments for Diversification

**Proposed:** 4/10/25\
**Implemented:**

---

As part of ongoing efforts to enhance the precision and robustness of its risk assessment methodologies, we propose the introduction of a Diversification Analysis Adjustment in the Morpho Vaults methodology. This enhancement is intended to capture concentration risk across vault exposures, further differentiating ratings outputs.

The proposed adjustment introduces a structured mechanism to assess how exposure is distributed across distinct protocols, collateral types, and market positions. By incorporating this additional layer of analysis, the framework is better equipped to recognize vaults that exhibit prudent diversification practices, while appropriately reflecting the elevated risk of vaults that exhibit material concentration to specific risks.

### Current Methodology Recap&#x20;

Credora’s Morpho risk assessment framework applies a simulation approach to calculate the Probability of Significant Loss (PSL) for a given Morpho Market. A loss is deemed significant when it exceeds 1% of the total outstanding supply. The simulations incorporate collateral asset risk, market activity, volatility, oracle configurations, and liquidity.

These Morpho Market PSLs are aggregated at the vault level according to the Vault Methodology. The Anchor PSL for the vault methodology is a weighted average of the individual market-level PSLs, where weights reflect the vault’s proportional exposure to each market. The Vault Methodology subsequently incorporates adjustments for curator track record and vault governance mechanisms.

Credora is proposing enhancing the Vault Methodology by introducing a diversification adjustment at the adjustments layer of the methodology, ensuring concentration risks are adequately captured.

### Methodology Enhancement Proposal

The diversification adjustment proposed aims to measure the diversification across three distinct layers within a curated Morpho vault. Credora calculates a notch adjustment pertaining to each of these distinct layers, which are then added to arrive at the final notch adjustment. \

1. **Protocol Exposure:** The Protocol Exposure Adjustment evaluates the degree to which a vault is concentrated in markets that originate from the same protocol or ecosystem. This dimension is designed to capture the systemic and operational risks that arise when a vault is overly reliant on assets or positions issued by a single protocol. For example, when multiple markets are based on Reserve’s USR, RLP, or wstUSR tokens these exposures are counted as an exposure to a single protocol.

   \
   To quantify this risk, each market in the vault receives protocol tags. The vault’s total market weights are then aggregated by protocol group. The maximum protocol-adjusted weight is compared against defined thresholds to determine the adjustment.

   \
   Vaults with significant protocol concentration receive a negative notch adjustment, while those with diversified protocol exposure receive no adjustment. This ensures that the methodology captures not just the quantity of exposure but also its systemic interconnectedness. The exposure thresholds and adjustment notch magnitudes are _proposed_ to be set as per the below table.&#x20;

| Max Protocol-Adjusted Exposure | Adjustment (Notches) |
| ------------------------------ | -------------------- |
| 100% – 75%                     | –0.25                |
| 75% – 50%                      | –0.125               |
| < 50%                          | 0                    |

2. **Collateral Type Exposure:** The Collateral Type Exposure Adjustment captures concentration risk based on underlying asset similarity. While some vaults may appear diversified across multiple markets, they may in fact be concentrated in a single type of collateral. For instance, ETH derivatives such as cbETH, wstETH, and rETH.\
   \
   To assess this, each market is assigned a collateral tag, grouping assets into shared risk categories. Notably, stablecoins are treated as distinct collateral types, recognizing that differences in reserve structure, custody model, and regulatory oversight can result in materially different risk profiles.\
   \
   The adjustment is determined by calculating the maximum collateral-adjusted weight—the share of the vault’s exposure linked to the most dominant collateral group. Vaults with exposure spread across heterogeneous collateral types receive no adjustment, while those with overexposure to a single type are penalized. The exposure thresholds and adjustment notch magnitudes are _proposed_ to be set as per the below table.

| Max Collateral-Adjusted Exposure | Adjustment (Notches) |
| -------------------------------- | -------------------- |
| 100% – 75%                       | –0.25                |
| 75% – 50%                        | –0.125               |
| < 50%                            | 0                    |

3. **Market Concentration:** The Market Concentration Adjustment evaluates the distribution of exposure across individual markets, independent of protocol or collateral groupings. It is designed to penalize vaults that are overly concentrated in one or two markets, and to reward those that allocate capital more evenly.\

   This dimension uses the Herfindahl-Hirschman Index (HHI), a standard measure of concentration, computed as the sum of squared market weights. An HHI closer to 1 indicates dominance by one or two markets, while an HHI closer to 0 reflects a well-distributed allocation.\

   Market weights are taken directly from the vault's position allocations, without any protocol or asset-level adjustments. Based on the resulting HHI score, the vault receives a neutral or negative notch adjustment, as defined by pre-established thresholds.\

   This approach ensures that the rating framework accounts for the structural integrity of the vault’s allocation and does not overlook diversification simply because the underlying assets differ. The exposure thresholds and adjustment notch magnitudes are proposed to be set as per the below table.

| HHI         | Adjustment (Notches) |
| ----------- | -------------------- |
| 0.00 - 0.30 | 0.0                  |
| 0.30 - 0.40 | -0.1                 |
| 0.40 - 0.50 | -0.2                 |
| > 0.50      | -0.3                 |

Following the calculation of a vault’s Probability of Significant Loss (PSL), this enhancement introduces the application of a Diversification Adjustment to account for concentration-related risks. Specifically, it is designed to differentiate vaults based on the extent to which they diversify across protocols, collateral types, and markets. Vaults exhibiting high concentration would receive a negative adjustment, while those demonstrating meaningful diversification would receive no or a positive adjustment, _depending on final notch calibration_.
