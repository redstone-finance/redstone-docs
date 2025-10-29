# Primary Layer - General Token Modifiers

The Primary Layer synthesizes the outputs derived from the preceding Calibration and Sub-Methdology Layers. As the final adjustments in the Credora Token Framework, the **General Token Modifiers** refine the assessments to produce the final outputs.

This methodology occupies a central role in the framework, bridging the sub-methodology assessments of decentralized (smart contract-based) and centralized custodial structures to include broader token-specific risk factors. While the preceding layers primarily capture foundational risks such as custody architecture, operational stability, and protocol-related vulnerabilities, the Primary Layer extends the analysis to capture the token's broader characteristics.

![Primary Layer - General Token Modifiers framework diagram](<../assets/0 (5).png>)

## Modifiers <a href="#iatk359n5pkc" id="iatk359n5pkc"></a>

The **General** **Token Modifiers** refine the Anchor PD derived from the previous methodology layers via the application of token-agnostic modifiers that capture risks inherent in derivative tokens and stablecoins. These modifiers include **collateralization**, **asset transparency**, **peg track record**, **total value locked (TVL)**, and **governance**.

### Collateralization <a href="#h75e05ewzp4h" id="h75e05ewzp4h"></a>

Collateralization measures the extent to which a token is backed by underlying assets, analyzing its stability. This modifier assesses the degree of collateralization, considering in-kind assets. The degree of collateralization is particularly significant for liquid staking and wrapped tokens, as their redeemability and investor confidence hinge on complete backing. Tokens having higher collateralization are better positioned to withstand market volatility and redemption pressures, while inadequate collateralization heightens the risk of depegging or insolvency.

In certain cases, the degree of collateralization is considered at the sub-methodology Anchor PD level. For instance, in the evaluation of alternative collateral stablecoins (e.g. USDe), collateralization is a fundamental risk factor integrated directly into the Anchor PD calculation under the relevant sub-methodology. In such cases, the collateralization modifier in the General Token Modifiers is not applied, as the risk has already been accounted for in the sub-methodology. This ensures that risks are neither duplicated nor omitted, maintaining methodological consistency.

In the context of liquid staking and wrapped tokens, collateralization serves as a cornerstone of financial resilience and investor confidence. Adequately collateralized tokens signal to investors that sufficient reserves are in place to meet redemption demands, even during market disruptions. This assurance fosters stability and reduces the likelihood of panic-induced sell-offs or mass redemptions. Conversely, under-collateralized tokens face heightened scrutiny, as investors may question the token's solvency, triggering destabilizing behaviors. This erosion of trust can have compounding effects, undermining the token's value.

The collateralization modifier adjusts the Anchor PD downward for tokens with strong collateralization levels, reflecting their reduced risk profile. Tokens that exhibit under-collateralization are subject to upward PD adjustments to account for their elevated exposure to market volatility, investor uncertainty, and potential operational stress.

![Collateralization risk curve](<../assets/1 (2).png>)

### Asset Transparency <a href="#id-3qbkd5izly4i" id="id-3qbkd5izly4i"></a>

Asset transparency evaluates the degree to which the underlying assets backing a token are disclosed and validated. This includes the mechanisms used to monitor reserves and the quality of assurances provided. For derivative and stablecoin tokens, transparency is fundamental to ensuring the integrity of the token's value and maintaining investor confidence. A lack of transparency can obscure risks, leading to uncertainty, potential mismanagement, and diminished trust in the token.

Asset Transparency is assessed according to the following table:

| **Transparency Status**        | **Notch Adjustment** |
| ------------------------------ | -------------------- |
| On-chain                       | +0.25                |
| Third-party Audit              | +0.00                |
| Third-party Assurance          | -0.10                |
| No traceability or third-party | -1.00                |

- **On-Chain:** Reserves are tracked and validated on-chain, with data available in real-time for stakeholders to verify. This includes implementations of proof of reserves, for wrapped tokens as an example. Real-time on-chain data minimizes uncertainty, strengthens investor confidence, and reduces susceptibility to fraud or mismanagement.
- **Third-Party Audit:** Reserves are validated periodically by independent third-party auditors who issue reports to confirm asset sufficiency. This provides a high level of assurance, though it is dependent on the frequency and rigor of audits.
- **Third-party Assurance**: Reserve validation is performed periodically by an independent third party, which issues an attestation or opinion regarding asset sufficiency. While this offers a meaningful level of transparency, the absence of a formal audit process results in a lower degree of assurance relative to fully audited attestations.
- **No Traceability:** No disclosure or mechanism exists to track or verify the reserves backing the token. This represents the lowest level of transparency, leaving investors entirely reliant on token issuer claims.

### Peg Track Record <a href="#zcwp1bd5xu4z" id="zcwp1bd5xu4z"></a>

The Peg Track Record Modifier assesses the stability and reliability of an asset's price relative to its underlying collateral. This factor comprises two key components: **Volatility of Pair Price** and the **Frequency of Significant Price Deviations**. These factors provide insights into the asset's price behavior over time and its ability to maintain its peg. The outcomes of the two factors are averaged to produce the **Peg Track Record Score**, which is then mapped to a notch adjustment scale.

#### **Volatility of Pair Price**

The volatility of pair price measures the variability in the relationship between the loan asset's price and its underlying collateral over a defined historical period. This analysis involves calculating the daily volatility of the price pair in the trailing 365-days period, annualizing the results to standardize outputs, and scoring them on a 1 to 5 scale, where 1 is best and 5 is worst:

- Lower annualized volatility signifies stronger correlation and earns a better score.
- Higher volatility indicates weaker correlation and results in a less favorable score.

If the loan asset's trailing 30-day average daily trading volume is below $1 million, the volatility score is penalized by adding 1 point to the initial score.

This standardized approach ensures that assets with more predictable and stable price relationships are distinguished from those with erratic price behaviors.

#### **Frequency of Significant Price Deviations**

The second component assesses the frequency of significant price deviations relative to defined thresholds, scoring them on a 1 to 5 scale:

- For non-stable assets (e.g. wstETH), the acceptable threshold is set at **99%**.
- For stablecoins (e.g. USDC), a stricter threshold of **99.8%** is applied.

The analysis evaluates data from the trailing 365-day period and assigns a score on a 1 to 5 scale based on the frequency of significant price deviation events. To address data limitations for assets with less than 365 days of historical price data, an upward adjustment of 1 point is applied to reflect the uncertainty and limited observation window.

#### **Adjustments for Non-Rebasing Tokens**

For non-rebasing tokens—where staking yield accrues and increases the token's value relative to the underlying—the evaluation process requires isolating the principal value from the rewards component. This adjustment ensures that the correlation and default analyses reflect the token's core price performance, rather than being skewed by compounded staking rewards.

#### **Peg Track Record Score**

The outcomes of the volatility of pair price and frequency of significant deviations are averaged to produce the Peg Track Record Score. This combined score is mapped to a modifier notch adjustment, which reflects the asset's peg stability performance relative to established thresholds. Stronger peg performance results in downward notch adjustments, indicating reduced risk, while weaker performance leads to upward notch adjustments, reflecting increased vulnerability. This structured approach ensures that the Peg Track Record Factor meaningfully integrates into the token's risk assessment framework, providing a consistent and objective basis for evaluating peg stability.

| **Peg Track Record Score** | **Notch Adjustment** |
| -------------------------- | -------------------- |
| 1 - 2                      | +0.25                |
| 2 - 3                      | 0.00                 |
| 3 - 4                      | -0.25                |
| >4                         | -0.5                 |

### Total Value Locked (TVL) <a href="#ifp2pjaq5rho" id="ifp2pjaq5rho"></a>

The Total Value Locked (TVL) modifier measures the scale of a protocol, serving as an indicator of adoption, operational capacity, and market trust. Higher TVL indicates larger scale operations and higher investor confidence. Additionally, higher TVL is associated with greater scrutiny from market participants. Tokens with substantial TVL receive upward notch adjustments. Conversely, tokens with low TVL receive downward adjustments.

For the respective token categorization, a list of all protocols of the same type is aggregated. The respective token categories break down token types in a granular manner to ensure each token is being compared to tokens of similar kind i.e. wrapped tokens, liquid staking tokens, liquid restaking tokens, stablecoins backed by financial instruments and stablecoins backed by an active strategy. The complete set of protocols are ranked according to TVL or market capitalization, where a minimum threshold is established (e.g. only considering stablecoins having a market capitalization of $25m or more). The TVL or market capitalization of the relevant token is compared to the median TVL or market capitalization of the set of protocols. This calculation serves as the input into the TVL modifier, and is evaluated on a scoring curve.

### Governance <a href="#nn8s6ogcad0p" id="nn8s6ogcad0p"></a>

The governance modifier evaluates the structure and effectiveness of a protocol's decision-making framework. Adequately decentralized governance structures and robust control setups reduce the likelihood of operational failures or malicious actions.&#x20;

The governance modifier begins with a base adjustment of -0.75 for upgradable contracts, while immutable contracts receive no adjustment. This reflects the inherent risk associated with the ability to alter core contract logic. For immutable contracts, the following adjustments (1-4) do not apply. &#x20;

For upgradable contracts, the magnitude of the base negative adjustment is further adjusted through analysis of safeguards which enhance decentralization, transparency, and procedural controls. The final governance notch adjustment is determined by applying the base adjustment (-0.75 for upgradable contracts) and then adding positive adjustments from four key factors which offset risks.

1. **Documentation:** Assesses the clarity and transparency of a protocol's contract upgrade framework. Clearly defined roles and publicly disclosed contract addresses help mitigate risks by ensuring structured decision-making. Protocols that have adequate documentation receive a positive adjustment, while those with lacking documentation or limited transparency retain the base negative adjustment.

   <table data-header-hidden><thead><tr><th width="198"></th><th width="280"></th><th></th></tr></thead><tbody><tr><td><strong>Question</strong></td><td><strong>Purpose</strong></td><td><strong>Possible Responses</strong></td></tr><tr><td>Are roles defined?</td><td>Ensures clarity on governance responsibilities and upgrade permissions.</td><td>Clear / Unclear</td></tr><tr><td>Is a multi-signature structure present and outlined?</td><td>Indicates whether upgrades require multiple signers, reducing centralization risk. If the contract relies on an EOA account, the answer to this question is unclear.</td><td>Clear / Unclear</td></tr><tr><td>Are the addresses clearly defined in the documentation?</td><td>Confirms whether governance and upgrade-related contract addresses are publicly disclosed.</td><td>Clear / Unclear</td></tr></tbody></table>

   The adjustment is determined according to the following logic:

   | **# of Clear Entries** | **Adjustment** |
   | ---------------------- | -------------- |
   | 3 are clear            | +0.2           |
   | 2 are clear            | +0.15          |
   | < 2 are clear          | 0              |

2. **Contract Upgrade Controls:** The Upgrade Controls section measures the risk associated with the execution of contract upgrades.

   A framework that utilizes multi-signature approval with a higher signer threshold reduces the chance of undesirable unilateral changes, leading to a less negative score. Conversely, the absence of a multi-sig structure or low signer thresholds increase the risk of undesirable or risky modifications, resulting in a more negative governance adjustment.

   The Contract Upgrade Controls assessment first determines whether the protocol utilizes a multi-sig structure for contract upgrades. Externally Owned Account (EOA) upgradable contracts receive no adjustment as they are highly susceptible to unilateral changes, posing significant risks.

   Where a multi-sig is utilized, further evaluation is conducted based on the minimum number of signers required to execute an upgrade, and the percentage of signers needed to approve an upgrade. These are used to assign modifier notch adjustments as outlined in the scoring table.

   | **Question**                                                          | **Purpose**                                                                   |
   | --------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
   | What is the minimum number of signers required to execute an upgrade? | Measures control dispersion over contract upgrades.                           |
   | What is the percentage of signers needed to initiate an upgrade?      | Ensures a sufficiently high approval threshold to prevent unilateral changes. |

   **# of Signers**

   | **Min Signers** | **Max Signers** | **Modifier** |
   | --------------- | --------------- | ------------ |
   | 0               | 2               | 0.05         |
   | 3               | 4               | 0.15         |
   | 5               | 100             | 0.2          |

   **Approval Threshold**

   | **Min Threshold** | **Max Threshold** | **Modifier** |
   | ----------------- | ----------------- | ------------ |
   | 0%                | 50%               | 0.05         |
   | 50%               | 66%               | 0.15         |
   | 66%               | 100%              | 0.2          |

3. **Governance Mechanism:** The Governance Mechanism adjustment evaluates whether a formal governance structure or Decentralized Autonomous Organization (DAO) exists to oversee and reach consensus on key protocol upgrade decisions. The presence of a DAO or similar decentralized governance framework is a positive factor as it enhances transparency and enables broader stakeholder participation in decision-making.

   The efficacy of governance structures is further assessed through an analysis of governance token holder concentration. This is accomplished through quantifying the minimum number of wallets that control over 50% of the governance token supply. High governance token concentration in a small number of wallets increases the risk of collusion and governance capture.

   | **Min # Wallets** | **Max # Wallets** | **Modifier** |
   | ----------------- | ----------------- | ------------ |
   | 1                 | 2                 | 0.05         |
   | 3                 | 5                 | 0.1          |
   | 6                 | 10                | 0.15         |
   | 11                |                   | 0.2          |

   The governance mechanism adjustment is based on the number of wallets holding governance tokens, as this provides a straightforward measure of ownership distribution. However, some of these wallets may belong to centralized exchanges or vault contracts, which could represent a more diverse group of underlying holders. Our methodology does not account for this. Instead, we rely on the direct count of wallets controlling >50% of the governance token supply to ensure consistency and comparability across protocols.

   The final governance mechanism adjustment considers the existence of a DAO and the distribution of governance token ownership. Protocols having highly concentrated governance token ownership receive a lower positive adjustment, while a widely distributed governance token achieves the maximum positive adjustment.

4. **Timelock Protection:** The Timelock Protection adjustment assesses whether a governance timelock mechanism is in place to prevent immediate execution of upgrades, providing stakeholders sufficient time to react to changes. A longer timelock period mitigates the risk of rushed or malicious protocol modifications.

   Protocols with a timelock duration of 72 hours or more receive the highest positive adjustment. Shorter timelocks provide some protection, and protocols where there are no timelocks receive no benefit.

### Redemption <a href="#id-3fiwaw3p9evp" id="id-3fiwaw3p9evp"></a>

The Redemption Risk Modifier measures the time frame where a token can be redeemed for its underlying asset, absent incurring material penalties. Material penalties can include the forfeiture of accumulated rewards or other financial trade-offs required to complete the redemption and induce elevated duration risk for the token holders.

For example, in the case of USD0++, the penalty for redemption is tied to forfeiting accumulated rewards. If a tokenholder redeems USD0++, they may forgo rewards equivalent to a maximum of 6 months. This is captured as a -0.10 adjustment for penalties up to 6 months of rewards, -0.15 for penalties equivalent to 6–12 months of rewards, and -0.25 for penalties exceeding 12 months of rewards. Redemptions with no penalties score 0.0, reflecting the absence of material costs. This approach ensures that financial trade-offs are incorporated into the overall risk assessment.

### Dependencies <a href="#id-7ia0e3lqjt0y" id="id-7ia0e3lqjt0y"></a>

Tokens backed by underlying assets which are not-in-kind face additional layers of risk arising from these dependencies. These underlying assets introduce an additional layer of default risk which needs to be factored into the token's overall risk profile. The **Dependency Adjustment** captures this risk by calculating the average PD of the **not-in-kind** underlying assets via the Credora Token Framework and adds this as an adjustment to the token's Final PD calculated after the application of the General Token Modifiers.

The evaluation begins by identifying and separating the underlying collateral assets into in-kind (e.g., ETH or identical assets) and non-in-kind categories. In the case of LSTs, non-in-kind assets serving as collateral may be other LSTs, which carry independent smart contract risks. The weighted average PD of these dependencies is calculated, and the combined PD is modeled using the union of their occurrence probabilities. This ensures that each risk component is appropriately integrated into the final PD without overestimating or double-counting their effects.

This approach ensures that the **c**umulative risk impact of the dependencies is fully captured. For example, if a token is backed by ETH and two liquid staking tokens, the average PD of the LSTs is calculated and applied as a Dependency Adjustment. This results in a more comprehensive PD assessment, reflecting the marginal risks introduced by the structure and composition of the token's backing assets.

## Token Rating Framework <a href="#nyqbybq3niim" id="nyqbybq3niim"></a>

The General Token Modifiers Methodology represents the culmination of the [Credora Token Rating Framework](primary-layer-general-token-modifiers.md#nyqbybq3niim), integrating insights and assessments from all preceding layers to deliver the final Probability of Default (PD) and corresponding implied rating for each token. These outputs serve as a definitive measure of the token's risk profile, reflecting its likelihood of default based on a comprehensive evaluation of custodial structures, operational exposures, and token-specific risk factors. By further synthesizing the [Sub-Methodology Layer](../sub-methodologies/)'s foundational assessments and the [Calibration Layer](../calibration-layer/)'s modifications, this methodology ensures that the final ratings are granular and holistic, capturing all material risks. These ratings provide investors, issuers, and other stakeholders with a robust, transparent, and consistent benchmark for evaluating the comparative creditworthiness of tokens in the evolving digital asset landscape.