# Derivative Tokens Methodology

The **Derivative Tokens Methodology** is a comprehensive framework for assessing risk associated with derivative token investments. Tokens assessed include **Wrapped Tokens**, **Liquid Staking Tokens**, and **Liquid Restaking Tokens**.

This methodology relies on the outputs of two specialized sub-methodologies— **the Smart Contract Custody Sub-Methodology** and **the Centralized Custody Sub-Methodology**— which are applied based on the custodial architecture of a given token. For instance, a wrapped token with a centralized custody structure is assessed through the Centralized Custody Sub-Methodology, which assesses the risk of exposure to the centralized custodian, whereas a liquid staking token would be analyzed through the Smart Contract Sub-Methodology.

This methodology is a calibration layer methodology, which, where relevant, aims to capture risks pertaining to specific token structures that are not analyzed through the sub-methodology layer. This framework combines quantitative and qualitative factors to produce a PD and a corresponding credit rating, which are used as inputs for further calibration in the Primary Methodology Layer (General Token Modifiers). See the [Token Rating Framework](../) for further details on the architecture and interlinkages of various token methodologies.

#### Token Coverage <a href="#pbf6otrlenwq" id="pbf6otrlenwq"></a>

The following types of assets are covered by the Derivatives Token Calibration Laye&#x72;**:**

1. **Wrapped Tokens (WT):** A Wrapped Token is a digital asset that represents and is pegged to the value of a cryptocurrency from the same or another blockchain, enabling seamless interoperability and use across different ecosystems and protocols. WTs rely on collateral held in custody—either by smart contracts or centralized custodians. The primary risks associated with wrapped tokens stem from the security and integrity of the custodial structure. For smart contract-based custody, vulnerabilities such as exploits or inadequate audits can jeopardize the collateral and lead to systemic failures. For centralized custody, the operational resilience, transparency, and creditworthiness of the custodian are critical risk factors. Any failure to secure the underlying collateral directly impacts the token’s redeemability and value.
2. **Liquid Staking Tokens (LST):** Liquid Staking Tokens represent ownership claims on staked digital assets. In addition to risks stemming from smart contract custody, these tokens expose investors to risks tied to validator performance and slashing events. Slashing, a penalty mechanism for validator misconduct or downtime, can erode the collateral underpinning the token. Additionally, as liquid staking tokens rely on staking protocols with interconnected systems, operational and governance policies may amplify risks.
3. **Liquid Restaking Tokens (LRST):** Liquid Restaking Tokens represent ownership claims on LSTs that have been re-staked on separate protocols, enabling additional yield opportunities. LRSTs rely on staked assets held in custody, primarily locked in smart contracts. Similar to LSTs, LRST risks include validator performance and smart contract custody. LRSTs extend staking activities across multiple protocols, compounding the potential rewards and associated slashing risks. These tokens face heightened exposure to validator performance due to their reliance on interconnected staking systems. Additionally, operational complexity increases the likelihood of coordination failures, while the use of multiple protocols may amplify vulnerabilities in governance and smart contracts. The intricate dependencies inherent in liquid restaking structures make them particularly sensitive to cascading risks.

#### Anchor PD <a href="#h14akvs8nkhh" id="h14akvs8nkhh"></a>

The **Derivative Tokens Methodology** establishes its **Anchor Probability of Default (PD)** based on the outputs of two foundational sub-methodologies: (1) the **Centralized Custody Sub-Methodology** and (2) the **Smart Contract Custody Sub-Methodology**. The selection of the applicable sub-methodology depends on the custodial exposure of the token.

For tokens backed by centralized custodians, the framework applies the **Centralized Custody Sub-Methodology**, which evaluates the creditworthiness, operational resilience, and fiduciary responsibilities of the custodian. This sub-methodology captures risks inherent to centralized custody, such as counterparty risk, transparency, regulatory oversight, and operational vulnerabilities. See further details in [Centralized Custody Sub-Methodology](../sub-methodologies/centralized-custody-sub-methodology.md).

Tokens that rely on smart contract-based custody are assessed using the **Smart Contract Custody Sub-Methodology**, which focuses on risks tied to network vulnerabilities, smart contract exploits, audit quality, bridge dependencies, oracle risks, and operational track records. This sub-methodology ensures that risks unique to decentralized architectures are rigorously analyzed. See further details in [Smart Contract Sub-Methodology](../sub-methodologies/smart-contract-custody-sub-methodology.md).

#### Calibration Layer Modifiers <a href="#fs835398gpft" id="fs835398gpft"></a>

The Anchor PD derived from the Smart Contract Custody Sub-Methodology and Centralized Custody Sub-Methodology serves as the foundational risk measure for the Derivative Tokens Methodology. Where the Smart Contract Custody Sub-Methodology is utilized, the output passes directly through the Calibration Layer to the Primary Layer. Where the Centralized Custody Sub-Methodology is utilized, the output serves as the Anchor PD in the Calibration Layer, and is further refined through a set of modifiers. These modifiers are specifically designed to address residual risks not fully captured in the sub-methodology.

![](<../../assets/0 (4).png>)

These Calibration Layer modifiers focus on slashing and smart contract risks. While the Centralized Custody Sub-Methodology effectively captures operational, regulatory, and counterparty risks tied to the custodian, it does not fully encompass vulnerabilities linked to smart contract exposures that underpin the minting and burning processes. These mechanisms are critical to the token’s supply management and redemption processes, and the associated risks—such as potential contract exploits or operational errors—are addressed through the application of these modifiers.

This refinement process ensures that all material risks tied to custodial exposures and operational mechanics are adequately captured in the progression to the **Primary Layer**. By integrating these targeted adjustments, the Derivative Tokens Methodology achieves a nuanced and holistic evaluation of each token's risk profile, and provides a level risk measure for tokens that rely on centralized custody and smart contract custody.

**Smart Contract Risk Modifiers**

The **Smart Contract Risk Modifier** evaluates potential risks associated with utilized smart contracts, focusing on two critical aspects: **Audit Quantity** and **Contract Maturity**. This modifier provides a refined assessment for tokens reliant on centralized custody structures with dependencies on minting and burning mechanisms.

**Audit Quantity**

The presence and robustness of smart contract audits significantly reduce the likelihood of exploits. The Audit Quality component of the Smart Contract Risk Modifier incorporates analysis of the quantity and quality of the protocol audits alongside the robustness of its bug bounty program. This process ensures that the level of scrutiny a smart contract has undergone and the incentives provided for vulnerability disclosure are systematically reflected in its final risk profile. The methodology involves several steps:

1. **Determining Input Factors**
   1. **Audit Quantity:** The number of independent audits conducted on the smart contract. More audits indicate stronger scrutiny and a higher likelihood that critical vulnerabilities have been identified and resolved.
   2. **Bug Bounty Programs:** The presence, size, and quality of a bug bounty program serve as a proxy for how effectively a project incentivizes external security researchers to identify and report vulnerabilities. A larger or more reputable bug bounty typically correlates with increased resilience against exploits.
2. **Determining the Audit Quality Score**
   1. The Audit Quality Score is derived by combining the audit-related inputs into a single metric. Multiple audits lifts the Audit Quality Score, while fewer audits lower it.
3. **Mapping the Audit Quality Score to a Modifier**
   1. Once the Audit Quality Score is established, it is mapped to a numerical modifier. This modifier directly adjusts the token’s baseline risk assessment.

| **Audit Quantity** | **Bug Bounty** | **Audit Quality Score (100)** | **Notch Adjustment** |
| ------------------ | -------------- | ----------------------------- | -------------------- |
| 0                  | Weak BB        | 0                             | -3.0                 |
| 1                  | Weak BB        | 20                            | -1.0                 |
| 1                  | Moderate BB    | 25                            | -1.0                 |
| 1                  | Strong BB      | 30                            | -0.9                 |
| 2                  | Weak BB        | 40                            | -0.8                 |
| 2                  | Moderate BB    | 45                            | -0.7                 |
| 2                  | Strong BB      | 50                            | -0.6                 |
| 3                  | Weak BB        | 65                            | -0.5                 |
| 3                  | Moderate BB    | 70                            | -0.4                 |
| 3                  | Strong BB      | 80                            | -0.3                 |
| 4+                 | Weak BB        | 90                            | -0.2                 |
| 4+                 | Moderate BB    | 95                            | 0.05                 |
| 4+                 | Strong BB      | 100                           | 0.0                  |

**Contract Maturity**

The Contract Maturity modifier adjusts a token’s risk profile based on the length of time its underlying smart contract has been operational. Longer-established contracts with more proven track records receive positive notch adjustments, reflecting greater confidence in their stability. Newer contracts with limited operational history receive negative notch adjustments, reflecting increased uncertainty and higher perceived risk.

| **Maturity (min)** | **Maturity (max)** | **Notch Adjustment** |
| ------------------ | ------------------ | -------------------- |
| 0                  | 6                  | -1.00                |
| 6                  | 12                 | -0.75                |
| 12                 | 18                 | -0.50                |
| 18                 | 24                 | -0.25                |
| 24                 | 30                 | 0.00                 |
| 30                 | 36                 | 0.10                 |
| 36                 | 42                 | 0.25                 |
| 42                 | 500                | 0.50                 |

By integrating these factors, the Smart Contract Risk Modifier ensures that risks stemming from smart contract dependencies are systematically evaluated and appropriately reflected in the token’s final risk profile.

**Slashing Risk Factor**

The **Slashing Risk factor** is a critical adjustment applied in the Derivative Tokens Methodology, specifically targeting centralized custody tokens exposed to slashing events. Slashing risk arises when validators within the staking ecosystem are penalized for misconduct, downtime, or failure to adhere to network requirements, resulting in the reduction of staked collateral. This penalty directly impacts the intrinsic value of tokens tied to staked assets.

LSTs face heightened exposure due to their dependence on validator performance, while LRSTs, which extend staking across multiple protocols, are particularly vulnerable to cascading slashing risks. The slashing risk PD, if applicable, is added to other Calibration Layer modifiers. By incorporating slashing risk, the methodology adjusts the Anchor Probability of Default (PD) upward to account for the potential erosion of value caused by slashing events. This ensures that the token’s overall risk assessment reflects the operational and structural dependencies inherent in staking-based systems.

#### Primary Layer Integration <a href="#eesevh4jdptl" id="eesevh4jdptl"></a>

The outputs which pass through the Derivatives Tokens Methodology Calibration Layer are passed as the Anchor PD in the Primary Layer, which subsequently refines the assessment through the application of [General Token Modifiers](../primary-layer-general-token-modifiers.md), such as collateralization, asset transparency, peg track record, total value locked, and governance.
