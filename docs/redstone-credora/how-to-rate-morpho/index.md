---
title: How to Rate Morpho
sidebar_label: How to Rate Morpho
---

# Morpho Explained

Morpho is a permissionless and non-custodial lending protocol. Morpho Vaults are designed to provide a passive lending experience by allowing users access to curated risk profiles and management. Vaults carry exposures across multiple underlying markets, creating a portfolio of risks tied to the performance of those markets.

In the Morpho Protocol, curators play a critical role in managing and mitigating risks associated with vaults and underlying exposures. They are responsible for selecting and configuring risk profiles by allocating assets across multiple markets, aiming for an optimal balance between risk and return. Beyond market selection, curators actively monitor market dynamics and adapt allocations to changing conditions, safeguarding the vault’s overall performance. Their expertise, track record, and operational effectiveness are central to the vault’s robustness, as well-managed vaults demonstrate stronger risk mitigation practices and greater resilience during periods of market volatility. In addition, the vault owners have the ability to introduce certain protective mechanisms such as guardians or timelocks that protect vault investors against adverse changes in a vault’s risk profile. Ultimately, curators and the protective mechanisms in place serve as key risk stewards, shaping the vault’s stability and risk profile.

# Rating Framework Structure

Credora vault rating system employs a bottom-up assessment approach that combines static and dynamic analysis across three hierarchical levels:

1. **Collateral Assets** – evaluated using the **Tokens Methodology**
2. **Markets** – evaluated using **Markets without Rehypothecation Methodology**
3. **Vaults** – aggregated exposure to underlying markets, evaluated with the **Vaults Methodology**

To generate a vault rating, we must first complete the foundational work: rating individual collateral assets (stablecoins, RWAs, staking tokens) from the markets where the vault is exposed to in order to determine their probability of default and loss characteristics. Then, assessing markets Probability of Significant Loss (PSL) which combine these assets into lending pairs with specific parameters and liquidation mechanisms. Finally, we aggregate them into a comprehensive vault rating.

This modular approach means that vault ratings become a computationally efficient aggregation exercise that can be updated up to daily.

# Collateral Asset Ratings

The assessment of collateral asset ratings is done through Credora Token Methodology [LINK]. Asset Ratings are published and maintained to ensure the most up-to-date information. In the event that Credora does not directly rate an asset, a proxy rating can be defined to serve as input to this section. Proxy ratings can come from:

1. Direct proxy of a rated asset (e.g., wrsETH is a proxy of rsETH). In these cases, the rating used is directly the rating from the proxy asset.
2. Adjusted proxy of a rated asset. In these cases, the rating is the rating of the proxy asset, plus a notch adjustment. This is usually done for tokens that are closely related to published tokens.
3. Principal tokens: In this case, a specific notch adjustment should be applied on top of the base asset rating to signal Pendle Protocol risk.

Collateral asset ratings are used as an input in the Morpho market analysis.

# Morpho Markets

In order to deliver a holistic assessment of risk throughout the Morpho protocol, Credora utilizes the collateral asset PD and implied rating as core inputs into **Market Simulations**, which quantify the risk of liquidation in a market. Subsequently, **Liquidation Simulations** are utilized for quantifying the risk of loss in a market. The core measurement for this is a **Probability of Significant Loss (PSL)**, which quantifies the probability of a specific market experiencing **Bad Debt** in excess of 1% of principal. Bad Debt occurs when a liquidation leaves a borrower or account with some remaining debt, and no collateral to cover it. Detailed information about the Loan Pairs Methodology can be found here [LINK].

The fundamental parameters that define each market and are used for market simulations detailed in the Loan Pairs Methodology are:

- Market Characteristics  
- Collateral Asset Rating  
- Allocations Distribution  
- Returns Distribution  
- Rebalance Profile  
- Pair Liquidity Data  

The price and liquidation simulations are executed and establish the Anchor PSL for a specific market, after which a set of modifiers are applied to calculate a Final PSL and implied rating per market. These outputs are utilized in subsequent methodologies that assess the risk of Morpho Vaults. The list of modifiers includes:

**The Oracle Risk Modifier** addresses risks stemming from misconfigured oracles, reflecting the potential for inaccurate or unreliable price feeds. This includes misaligned pricing mechanisms, reliance on static or hardcoded prices, and risks associated with unverified or opaque oracle vendors. These vulnerabilities, if unaddressed, can undermine the integrity of price discovery, introducing systematic risk into the protocol.

**The Morpho Protocol Risk Adjustment** evaluates the smart contract exploit risk inherent in the Morpho protocol. Morpho markets are either listed on Ethereum or Base. A PD on each market exposure is derived from Credora **Smart Contract Sub-Methodology**. See the Smart Contract Sub-Methodology for further details. The calculated Morpho Protocol PDs for Ethereum and Base is 0.13%.

The final Market PSL is calculated after accounting for the two additional risks: oracle risk via the Oracle Modifier, and general Morpho smart contract risk via the Protocol Risk Adjustment. After the Oracle Modifier is applied to the respective market PSL, the Protocol
