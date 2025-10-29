# Stablecoin Methodology

The Credora Stablecoin Methodology is a comprehensive framework for assessing the risk associated with stablecoins. Stablecoins are designed to maintain a stable value, typically pegged to fiat currencies or a basket of assets, with varying stability mechanisms that influence their risk profiles.

The types of assets subject to the scope of this methodology include:

- **Fiat or RWA Backed**: Backed by reserves of fiat currency or equivalent assets held by a custodian (e.g., USDT, USDC). Their value is dependent on the underlying reserves. These stablecoins also include those backed by tokens that represent interest in cash and cash equivalents (e.g., USD0).
- **Alternative Asset Collateral**: Maintain stability without direct cash or cash equivalents backing, by using alternative collateral assets. They rely on mechanisms including overcollateralization, to support price stability (e.g. DAI).
- **Active Strategy:** Deploy reserve assets in active investment strategies. They may include hedged derivatives positions or other market-neutral strategies (e.g. USDe).

## Methodology Overview <a href="#tby5p3xj3frn" id="tby5p3xj3frn"></a>

The Anchor PD is determined by evaluating **Custody Risk** and **Asset Quality**, through two independent sub-methodologies. Counterparty Risk assesses the risks associated with the custody of reserves backing stablecoins, while Asset Quality evaluates the risk of the reserve asset composition.

Custody Risk is determined using the [Smart Contract Custody Sub-Methodology](../sub-methodologies/smart-contract-custody-sub-methodology.md) or [Centralized Custody Sub-Methodology](../sub-methodologies/centralized-custody-sub-methodology.md), depending on the structure of the token. As examples, for USDT and USDC the Centralized Custody methodology evaluates custodians including Cantor Fitzgerald or BNY Melon.

In addition to Custody Risk, the credit profile of underlying reserves are evaluated using the [Asset Quality Sub-Methodology](../sub-methodologies/asset-quality-sub-methodology.md). For example, in the case of fiat-backed stablecoin reserves the sub-methodology assesses US Treasury bills or similar financial assets.

The Anchor PD is calculated by combining the Counterparty and Asset Quality Risk factors. It serves as an input for the Calibration Layer methodology, which evaluates relevant risks not analyzed in the respective Anchor PD methodology.

The PD and implied rating outputs from the Calibration Layer are used as inputs in the Primary Layer. The application of the General Token Modifiers results in a final PD and implied rating. For more details on the structure and interconnections of the various token methodologies, refer to the [Token Rating Framework](../).

![Stablecoin Methodology framework diagram](<../../assets/0 (7).png>)

## Custody Risk <a href="#lp3ze5tmvm86" id="lp3ze5tmvm86"></a>

The Custody Risk section evaluates the custody of reserve assets. Stablecoins typically secure their reserves through one of two methods: centralized custodians or smart contract custody.

The following sections outline Credora's methodology for evaluating counterparty risk across the respective methods.

### Centralized Custody Sub-Methodology <a href="#x8d0rdrb6oxl" id="x8d0rdrb6oxl"></a>

The **Centralized Custodian Sub-Methodology** evaluates the creditworthiness of custodians responsible for holding digital assets that back derivative tokens and stablecoins. This methodology sits at the **Sub-Methodology Layer** of the **Token Rating Framework.**

The analysis begins with the determination of the Anchor PD, which serves as the baseline measure of risk, and applies a series of modifiers that adjust the PD and implied rating based on specific factors. The final outcome reflects risk exposures of the custodian pertaining to operational, regulatory, governance risks, as well as risks inherent to the business of digital asset custody. The methodology is informed by historical default events with respect to digital asset custodians and calibrated via an empirical analysis of these default events to ensure adequate capturing of key risks related to digital asset custody business.

Please see [Centralized Custody Sub-Methodology](../sub-methodologies/centralized-custody-sub-methodology.md) for additional information.

### Smart Contract Custody Sub-Methodology <a href="#j8fsdf4ap11h" id="j8fsdf4ap11h"></a>

The **Smart Contract Custody Sub-Methodology** is a structured approach to evaluating the risks associated with tokens relying on smart contract-based custody solutions. This methodology sits at the **Sub-Methodology Layer** of the **Token Rating Framework**.

It begins with the determination of the **Anchor PD**, which serves as the baseline risk measure. This Anchor PD is derived from a comprehensive assessment of protocol and smart-contract specific risks, utilizing historical exploit data. A series of modifiers are then applied to refine the Anchor PD, accounting for additional factors including audit quality, contract maturity, bridge and oracle dependencies, and operational complexity. The final outcome quantifies the overall risk exposures of the token, capturing vulnerabilities specific to smart contract-based custody mechanisms and the broader ecosystem in which the token operates.

Please see [Smart Contract Custody Sub-Methodology](../sub-methodologies/smart-contract-custody-sub-methodology.md) for additional information.

## Asset Quality Sub-Methodology <a href="#id-8gvsauu9y2yh" id="id-8gvsauu9y2yh"></a>

The **Asset Quality Sub-Methodology** evaluates underlying asset and strategy risk. As stablecoin providers utilize various mechanisms to design and support the stability of stablecoins, the assessment of Asset Quality considers the specific type of stablecoin. The following sections describe the respective evaluation techniques.

Please see [Asset Quality Sub-Methodology](../sub-methodologies/asset-quality-sub-methodology.md) for additional information.

## Anchor PD Conclusion <a href="#soxc3s8og9cl" id="soxc3s8og9cl"></a>

Once the Asset Quality and Counterparty Risk outputs have been determined, the scoring factors are combined to arrive at the Anchor PD for each stablecoin. As Custody and Asset Quality are independent risks, Credora combines the risk according to the following formula:

PD Counterparty Risk + PD Asset Quality - (PD Counterparty Risk \* PD Asset Quality)

## Calibration <a href="#id-7badp0jxbf25" id="id-7badp0jxbf25"></a>

In the Calibration Layer, Stablecoin Modifiers are applied after the Asset Quality and Counterparty Risk factors determine the Anchor PD. The set of modifiers includes common factors and those specific to the relevant token category.

For instance, Stablecoins utilizing centralized custody structures also carry risks associated with smart contract exposures, which fall outside the scope of the [Centralized Custody Sub-Methodology](../sub-methodologies/centralized-custody-sub-methodology.md). To account for these additional layers of risk, the Calibration Layer applies relevant modifiers to incorporate risks such as Audit and Contract Maturity. If these risks are partially captured within the Custody Risk assessment, the impact of the corresponding modifiers may be reduced by up to 50%.

This section's output is the Calibrated Anchor PD, which serves as the input into the Primary Methodology Layer.

## Stablecoin Modifiers <a href="#id-3iygqlgt0h6a" id="id-3iygqlgt0h6a"></a>

For all stablecoins, the modifiers set includes an analysis of Reserve Management Operations, Regulatory Cover, bankruptcy Remoteness, and User Rights.

### **Reserve Management Operations**

The Reserves Management Options Modifier assesses the track record of the asset managers responsible for overseeing a stablecoin's reserves. This evaluation focuses on the number of years the current asset management team has demonstrated experience in managing strategies relevant to stablecoin reserves, with a longer track record indicating greater strength and reliability of the management team. These strategies may include money markets, hedged derivative positions, and other related markets. The notch adjustment factor is based on the number of years of an asset management team's track record.

| Track Record | Notch Adjustment |
| ------------ | ---------------- |
| < 2 Years    | -0.25            |
| 2 - 20 Years | -0.10            |
| > 20 Years   | 0.0              |

### Regulatory Cover, Bankruptcy Remoteness, and User Rights

This set of modifiers assesses the regulatory and legal safeguards underpinning a stablecoin's reserve structure, focusing on the strength of investor protections in normal operations and insolvency scenarios. It considers the issuer's licensure achievements, bankruptcy remoteness of the reserve assets, and user rights as per the terms. By evaluating these dimensions, the set of modifiers distinguishes stablecoins having strong regulatory and legal foundations from those having limited or unclear recourse mechanisms for token holders.

#### Regulatory Cover and Bankruptcy Remoteness

The Regulatory Cover and Bankruptcy Remoteness modifier notch adjustments are averaged, and therefore presented in a single section.&#x20;

#### **Regulatory Cover**

This modifier evaluates the breadth and credibility of regulatory licenses and jurisdictions under which the stablecoin issuer operates, considering the quantity and quality of licenses. The modifier consists of the following assessment factors.

- **Number of Relevant Licenses:** The total number of issuer licenses. This factor considers a variety of types of licensure including those which are not a direct requirement for issuance of a stablecoin. It includes consideration of money services or transmission licenses, which may support stablecoin operations. The factor aims to quantify the issuers' general achievements in operating in a regulated environment.

| License Count | Notch Adjustment |
| ------------- | ---------------- |
| 3 or more     | 0.0              |
| 2             | -0.15            |
| 1             | -0.3             |
| 0             | -0.5             |

- **Number of Stablecoin Licenses:** The total number of issuer licenses which specifically regulate stablecoin issuance. These include licenses in select jurisdictions, such as Singapore or Bermuda. &#x20;

| License Count | Notch Adjustment |
| ------------- | ---------------- |
| 0             | -0.15            |
| 1+            | 0.0              |

- Jurisdiction Strength: The tiering of legal jurisdictions from Tier 1 (strongest) to Tier 4 (weakest), where the input utilized is the strongest regulatory jurisdiction as per Credora's Regulatory Jurisdiction Index Ranking.

| Jurisdiction Tier               | Notch Adjustment |
| ------------------------------- | ---------------- |
| Tier 1                          | 0.0              |
| Tier 2                          | -0.15            |
| Tier 3                          | -0.3             |
| Tier 4 or Excluded Jurisdiction | -0.5             |

#### **Bankruptcy Remoteness**

This modifier evaluates bankruptcy remoteness, from the stablecoin issuer and the relevant custody solution. In cases where the state of bankruptcy remoteness is unclear, an 'Unknown' selection is made. This has the same negative impact as a 'Not Bankruptcy Remote' selection. Additionally, for smart contract custody stablecoins, where reserve assets are held solely in the native protocol smart contracts, a 'Not Applicable' selection is made. From a notch adjustment perspective, this effectively treats comprehensive smart contract infrastructure as bankruptcy remote. The User Rights section does differentiate between this form of effective bankruptcy remoteness and the explicit legal bankruptcy remoteness offered by select issuers. &#x20;

- **Bankruptcy Remoteness (Issuer):** This assesses whether the issuer's legal and operational structure ensures that reserve assets are segregated from the issuer's own assets and protected in the event of insolvency. Specifically, it evaluates whether the reserves are held in legally distinct accounts, separated from the issuer's balance sheet, and whether such segregation is enforceable under applicable bankruptcy laws.

| Bankruptcy Remoteness | Notch Adjustment |
| --------------------- | ---------------- |
| Bankruptcy Remote     | 0.0              |
| Not Applicable        | 0.0              |
| Unknown               | -0.5             |
| Not Bankruptcy Remote | -0.5             |

- **Bankruptcy Remoteness (Custodian):** This factor evaluates the custody arrangement of the reserve assets, specifically whether the assets are held in legally segregated accounts that are separate from the custodian's assets. It assesses the extent to which the custody structure ensures that tokenholder reserves would be protected and recoverable in the event of the custodian's bankruptcy. A strong custody framework involves holding assets in client-designated, off-balance-sheet accounts under a trust or fiduciary structure, thereby minimizing the risk of commingling and enhancing legal clarity around ownership and claims in a liquidation scenario.

| Bankruptcy Remoteness (Custodian) | Notch Adjustment |
| --------------------------------- | ---------------- |
| Bankruptcy Remote                 | 0.0              |
| Not Applicable                    | 0.0              |
| Unknown                           | -0.5             |
| Not Bankruptcy Remote             | -0.5             |

The average of the above five factors, across Regulatory Cover and Bankruptcy Remoteness, is calculated and applied as a notch adjustment.

#### User Rights

This adjustment evaluates the legal clarity and enforceability of tokenholder rights as explicitly outlined in the stablecoin issuer's Terms of Service. It focuses on whether the documentation provides unambiguous protections that support tokenholder claims to the underlying reserve assets in both normal and distressed conditions. The assessment includes three key dimensions: (i) whether the Terms grant tokenholders a contractual right to redeem their tokens; (ii) whether the reserves are stated to be held in segregated accounts, distinct from the issuer's proprietary assets; and (iii) whether the reserves are explicitly held for the benefit of tokenholders. These provisions are critical to determining whether legal recourse exists in the event of issuer default, custodial failure, or operational disruption.

- **Redemption Clarity:** Does the Terms of Service grant tokenholders the right to redeem their tokens for the underlying reserve assets (or an equivalent)?

| Redemption Clarity | Notch Adjustment |
| ------------------ | ---------------- |
| Yes                | 0.00             |
| No Clarity         | -0.50            |

- **Asset Segregation:** Does the Terms of Service state that the reserve assets are held in segregated accounts, separate from the issuer's proprietary assets?

| Asset Segregation | Notch Adjustment |
| ----------------- | ---------------- |
| Yes               | 0.00             |
| No Clarity        | -0.50            |

- **Beneficial Ownership:** Does the Terms of Service state that the reserve assets are held specifically for the benefit of the tokenholders?

| Beneficial Ownership | Notch Adjustment |
| -------------------- | ---------------- |
| Yes                  | 0.00             |
| No Clarity           | -0.50            |

The final User Rights modifier is calculated as the average of the three individual notch adjustments within this section: Redemption Clarity, Asset Segregation, and Beneficial Ownership. Each factor represents a critical legal protection for tokenholders as stated in the issuer's Terms of Service. By averaging these components, the methodology ensures a balanced and proportional reflection of the overall strength or weakness in contractual enforceability. This approach prevents any single deficiency from disproportionately impacting the overall modifier while still capturing material gaps in legal clarity.

#### Total Regulatory Cover, Bankruptcy Remoteness, and User Rights

The final adjustment is calculated as the sum of the total notch adjustments derived from the average of Regulatory Cover and Bankruptcy Remoteness, and from the User Rights evaluations. Each component independently captures a distinct dimension of legal and regulatory protection. Together, these adjustments reflect the extent to which a stablecoin's legal and regulatory architecture mitigates risk. The combined output is applied as a downward notch adjustment to the anchor probability of default (PD), where robust structures result in smaller or no deductions.

### Primary Layer Integration <a href="#id-4m4ex6glp8z1" id="id-4m4ex6glp8z1"></a>

The [Primary Methodology Layer](../primary-layer-general-token-modifiers.md) enhances the assessment by incorporating a set of General Token Modifiers, which are token-agnostic risk measures that are relevant across all token types, including stablecoins. These modifiers—**Collateralization**, **Asset Transparency**, **Peg Track Record**, **Total Value Locked (TVL)**, and **Governance**—capture core characteristics that underpin the stability, integrity, trustworthiness, and market reputation of tokens. For further details on how these modifiers are applied, refer to next section.
