# Smart Contract Custody Sub-Methodology

The **Credora Smart Contract Custody Sub-Methodology** evaluates the risks associated with tokens that rely on smart contract-based custody solutions. This methodology operates within the Sub-Methodology layer of the Credora Token Rating Framework.

![](<../../assets/0 (2).png>)

The **Smart Contract Custody Sub-Methodology** is a structured approach to evaluating the risks associated with tokens relying on smart contract-based custody solutions. It begins with the determination of the **Network Protocol PD**, which serves as the baseline risk measure.

The **Network Protocol PD** is established through a comprehensive assessment of protocol and smart contract risks, leveraging historical exploit data to quantify the baseline likelihood of failure. The Anchor PD measure reflects the **average risk** of an Ethereum-based protocol or smart contract being exploited, encompassing the broad spectrum of contracts deployed on the network. It accounts for both well-established, mature protocols with robust risk mitigation practices and newer, unaudited, or less secure contracts.

The Network Protocol PD is adjusted considering bridge risks and oracle risks to determine an Adjusted Network Protocol PD. This is further refined by considering slashing risks, resulting in the **Anchor PD**.

A series of **Risk Calibration Multipliers** are then applied to refine the Anchor PD, accounting for additional factors including audit quality, contract maturity, bridge and oracle dependencies, and operational complexity, which are multiplicative factors. The final outcome quantifies the overall risk exposures of the token, capturing vulnerabilities idiosyncratic to smart contract-based custody mechanisms and the broader ecosystem in which the token operates.

This methodology leverages empirical evidence from historical exploit events in decentralized finance (DeFi), including data across a variety of networks, to ensure that key risks are adequately identified and measured. The methodology is informed by an analysis of 2022 and 2023 DeFi exploits compiled by Immunifi, the top 100 Decentralised Finance (DeFi) protocol exploits between 2016 to 2023 compiled by Halborn, as well as a review of historical incidents in the blockchain industry (including the Rekt database, DeFiLlama database, and Hypernative incident logs) to determine risk factors and mitigating actions, and quantify their impact on default probabilities.

The Smart Contract Custody Sub-Methodology produces a PD and a corresponding implied rating, which serve as critical inputs for subsequent calibration utilizing the broader Credora Token Rating Framework. For further details on the framework's structure and interdependencies, see the [Token Rating Framework](../).

#### Anchor PD <a href="#dhoxlixsmusg" id="dhoxlixsmusg"></a>

The Network Protocol Probability of Default (PD) reflects the annualized likelihood that a protocol or smart contract operating on a blockchain network will experience an exploit, with a specific emphasis on network maturity as a key determinant of exploit vulnerability.

The methodology utilizes comprehensive exploit data from a selection of blockchain networks sourced from DefiLlama. This data encompasses daily active protocol counts and historical hack events. The exploit data includes incident dates, exploit classifications, techniques employed to execute the attack, impacted amounts, and targeted chains. The data analyzed covers the period from 2020 to 2024, and after filtering for relevant hack techniques, encompasses 184 unique exploit events across the following 7 blockchain networks: Ethereum, Arbitrum, Polygon, Avalanche, Optimism, Base, and Solana. Of these 184 exploit events Ethereum, Arbitrum and Polygon respectively had the largest volumes of exploit events.

Our analysis identifies a clear inverse correlation between exploit rates and network maturity. Utilizing a negative binomial (NB) regression model, we model daily exploit rates as a function of network maturity. NB regression is commonly applied to count data; however, we adapt it to model daily exploit rates directly by incorporating the logarithm of active protocols as an offset term, which accounts for variations in daily protocol counts across networks. We measure network maturity using the metric Days Since First Active Protocol, which captures the days since the first protocol was registered on the network. Daily exploit rates for a network, calculated from the model based on the network maturity, are annualized using the survival function to obtain the Network Protocol PD.

Alternative ideas—such as using Total Value Locked (TVL) as a feature and measuring maturity from the network’s launch date—were tested but ultimately excluded from the final model. Because TVL and maturity are highly correlated, adding TVL did not provide additional explanatory power and created challenges for the linear modeling process, inflating standard errors and reducing coefficient stability. Therefore, TVL was dropped as a feature in favour of maturity. However, expanding the dataset to include more hack events across a broader range of networks and over a longer time horizon may help address these concerns, potentially revealing stronger signals for TVL and maturity that prove more useful for future versions of the Anchor PD model.

The NB model suggests that a protocol's default probability (PD) decreases by roughly 6% per year, in relative terms, from an initial baseline of 2.5% annualized at the time the protocol is first registered as active on the network. For example, if the PD is 2.5% on the day the first protocol becomes active, the Anchor PD estimate would decline to 2.36% after one year, assuming no material changes in underlying risk factors.

Since exploits are relatively rare events, when they occur, they can cause substantial short-term increases in actual exploit rates measured over a given time period. Our model addresses this by capturing the longer-term trend of decreasing exploit risk as networks mature, thereby smoothing out temporary fluctuations and providing a more stable estimate of the underlying exploit risk. It's also important to note that our current model estimates are derived from historical exploit data covering a four-year period (2020–2024), and we expect the annual decay rate to be refined as additional data becomes available for modeling.

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeRUhq2IB536DS-cg9-_gRxlCxlSJRHxckT5sclrmiQhZyNhwpxLycO7UDHqQoTQyvP9SdVlZqGOxZtvDgMwENZyLoxrAEmv7RNCm3qYoWARdHnubx1uQjE3ocvetZu54yTs9JL?key=zBMgdXo_2G1mWzDRMYK-F07b" alt="" /><figcaption></figcaption></figure>

While this framework provides a baseline for evaluating how exploit risk evolves with network maturity, it is important to note that the baseline risk reflects the aggregated outcomes of both robust protocols and immature, unaudited contracts within the ecosystem. Protocols that demonstrate robust risk management—such as undergoing comprehensive audits, deploying formal verification measures, and implementing strong security frameworks—are expected to have lower PDs relative to this baseline. Conversely, contracts that are newly deployed, unaudited, or lack proactive governance controls will inherently exhibit higher PDs, reflecting their increased vulnerability to exploitation. This calibration is achieved through the multiplier factors and the differentiation underscores the unique risk profile of individual protocols, as outlined in subsequent sections of the methodology.

**Adjusted Network Protocol PD**

A series of risk amplifiers adjust the Network Protocol PD calculated in the preceding section. These amplifiers account for additional vulnerabilities inherent in specific operational dependencies of smart contracts, including cross-chain bridges and oracles.

- **Bridge Risks:** Bridge risks are particularly relevant for smart contracts that facilitate cross-chain functionality. Bridges introduce vulnerabilities, such as faulty proof verification, which accounted for only 4.3% of top 100 DeFi exploit incidents between 2016 - 2023 but caused a disproportionately high (25.7%) proportion of total losses, according to the Halborn report. These risks significantly impact token redeemability and investor confidence, making the assessment of bridge mechanisms essential in the overall risk evaluation. As such, where there are bridge exposures in the derivative token architecture, the Network Protocol PD is amplified by 1.2x.
- **Oracle Risks:** Many DeFi protocols rely on external data feeds for critical operations such as pricing and liquidations. Manipulated or inaccurate oracle data can lead to significant losses, as evidenced by the fact that flawed oracles were responsible for 49.1% of losses in top 100 DeFi manipulation incidents between 2016 - 2023. Oracle risks are incorporated into the PD adjustment to reflect their potential to amplify financial losses and operational vulnerabilities. As such, where there are oracle exposures in the derivative token architecture, the Network Risk PD is amplified by 1.3x.
- **Slashing Risk:** In addition to the above adjustments, slashing risks are independently considered. These are informed by historic Ethereum network data, and estimates for restaking slashing risk. For liquid staking tokens, which represent ownership of staked assets, slashing events erode the underlying collateral. Liquid restaking tokens, which extend staking activities across multiple protocols, are particularly exposed to slashing risk due to their increased reliance on validator performance across interconnected systems. Slashing risks are compounded by the operational complexity and coordination challenges of these systems. The slashing risk is calculated to be 0.04% for Ethereum-based liquid staking tokens. For liquid restaking tokens, the methodology estimates a conservative probability of slashing of 0.4% (10x), given lack of historical data on and increased interconnectedness in staking networks which can result in multiple slashing incidents through exposures to several protocols (i.e. actively validated services).

The **Adjusted Network Protocol PD** is derived by applying multiplicative risk factors to the base Network Protocol PD while incorporating slashing risk as an independent variable. Since slashing risks are assessed separately, their impact is added to the adjusted PD rather than compounded within the multiplicative adjustments. The final calculation reflects the combined influence of network-specific risks and potential slashing penalties on the overall probability of default.

Adjusted Network Protocol PD = ((Network Protocol PD \* Bridge Risks \* Oracle Risks) + Slashing Risk) - ((Network Protocol PD \* Bridge Risks \* Oracle Risks) \* Slashing Risk)

**Additional Dependencies Adjustment:** Tokens that rely on external dependencies for yield generation or unclear revenue mechanisms receive a -0.25 notch adjustment to reflect the increased uncertainty and risk exposure. These tokens may depend on additional blockchain networks for yield, where yield accrual is substantially tied to airdrop incentives or undefined strategies. These dependencies introduce heightened risk factors, such as reliance on external ecosystems, unpredictable revenue sustainability, and potential governance uncertainties, all of which weaken the token’s overall risk profile.

The Anchor PD is then calculated as the Adjusted Network Protocol PD with the Additional Dependencies Adjustment applied.

#### Risk Calibration Multipliers <a href="#id-9lqn0y993nnx" id="id-9lqn0y993nnx"></a>

The Anchor PD quantifies the base probability of default (PD) for a protocol or set of smart contracts deployed on a specific blockchain network, additionally considering the core characteristics. However, this calculation does not incorporate specific risk-mitigating actions or characteristics of a protocol, such as audits or contract maturity, which significantly affect the risk profile of a given protocol.

Historical evidence, notably from the Halborn Top 100 DeFi Hacks Report and the Rekt database, highlights the significant role these factors play in reducing exploit likelihood. For example, amongst the 100 top DeFi hack cases, audited smart contracts accounted for only 20% of total exploits, demonstrating the efficacy of audits as a risk mitigation tool. Similarly, contract maturity correlates with a reduced probability of default, as longer-established contracts have typically undergone more rigorous testing and operational scrutiny.

To reflect these mitigating factors, modifiers are introduced as multiplicative adjustments to the Anchor PD. These modifiers are empirically derived, based on historical patterns observed in exploit data. For instance, highly audited contracts are subject to a significant downward adjustment in their PD, reflecting their enhanced resilience. Additionally, protocols with mature contracts benefit from similar adjustments due to the reduced likelihood of exploits associated with operational longevity.

In practice, most protocols under evaluation are well-audited, resulting in a material decline in the probability of exploit when modifiers are applied. By integrating these evidence-based adjustments, the methodology ensures a more precise and tailored risk assessment that accounts for protocol-specific mitigation strategies. These modifiers, calculated as functions based on empirical evidence, enhance the framework’s ability to differentiate risk levels across various smart contracts on a given blockchain network, providing a nuanced measure of credit risk for smart contract custody-dependent protocols.

**Audit Quality**

The **Audit Quality Score** of the smart contract are critical modifiers of the Anchor PD, which is a factor of the quantity of audits the smart contract went through and bug bounty programs funded by the relevant protocol to identify bugs in the contract. The Audit Quality Score is calculated as follows:

| **Audit Quantity** | **Bug Bounty** | **Audit Quality Score (100)** | **Function** |
| ------------------ | -------------- | ----------------------------- | ------------ |
| 0                  | Weak BB        | 0                             | 200%         |
| 1                  | Weak BB        | 20                            | 120%         |
| 1                  | Moderate BB    | 25                            | 110%         |
| 1                  | Strong BB      | 30                            | 100%         |
| 2                  | Weak BB        | 40                            | 44%          |
| 2                  | Moderate BB    | 45                            | 41%          |
| 2                  | Strong BB      | 50                            | 39%          |
| 3                  | Weak BB        | 65                            | 31%          |
| 3                  | Moderate BB    | 70                            | 28%          |
| 3                  | Strong BB      | 80                            | 22%          |
| 4                  | Weak BB        | 90                            | 17%          |
| 4                  | Moderate BB    | 95                            | 14%          |
| 4                  | Strong BB      | 100                           | 12%          |

\
Protocols with no completed smart contract audits are subject to an amplification of 2x applied to the Anchor PD, while the presence of high-quality audits reduces the PD substantially, with adjustments as low as 0.12x. The presence and robustness of bug bounty programs are also factored into this adjustment.

Simple contracts, such as the Wrapped Ether wrapper contract, receive a more favorable audit multiplier score compared to even the best-audited complex contracts due to their low attack surface and minimal functionality. Their simplicity inherently reduces the number of potential vulnerabilities, making them less susceptible to exploits than more sophisticated contracts with extensive logic and dependencies. As a result, simple contracts receive an audit multiplier of 0.02x, reflecting their lower inherent risk in contrast to complex contracts that, despite extensive audits, maintain a broader range of attack vectors.

**Smart Contract Maturity**

Smart Contract Maturity plays a significant role in refining the Anchor PD. Evidence from the Hypernative Incidents Database demonstrates a clear inverse relationship between the length of a protocol’s operational history and the likelihood of exploit. Smart contracts with less than 8.3 months of operational history are the most frequently exploited, while protocols with longer track records benefit from enhanced scrutiny and improved resilience over time. This is reflected in a scaling adjustment, where newer contracts face a multiplier of up to 1.5x, tapering down to 0.4x as protocols mature to 27 or more months of operational history.

For upgradable contracts that undergo modifications post-protocol launch, the calculation of smart contract maturity incorporates both the protocol’s original launch date and the date of the most recent upgrade. When the upgraded contract has been subjected to a formal audit, the maturity adjustment reflects a simple average of the two track records. Conversely, in the absence of an audit, the calculation applies a weighted average methodology, assigning a 75% weight to the track record measured from the date of the most recent upgrade. This differentiation underscores the heightened risk associated with unaudited changes, recognizing their greater potential to introduce vulnerabilities.

In cases where wrapped tokens have launch dates distinct from the underlying protocol’s (or token’s) inception, the smart contract maturity adjustment reflects the average of the protocol’s launch date and the wrapped token’s own introduction date. This approach captures the combined operational history of the protocol and its wrapped asset, ensuring a comprehensive assessment of the maturity risk across the token’s lifecycle.

![Chart](<../../assets/1 (1).png>)

**Recent Incidents**

The Recent Incidents Modifier adjusts the PD upward by one notch for protocols that have experienced a security incident within the past six months. This adjustment reflects the heightened risk associated with increased developer activity on the codebase following an incident, which may lead to rapid, unaudited fixes.

#### Final Output <a href="#nfqzkpbjcn9f" id="nfqzkpbjcn9f"></a>

The Smart Contract Custody Sub-Methodology integrates these factors to provide a nuanced and data-driven assessment of smart contract risks. Newly deployed, unaudited smart contracts on high-risk networks with dependencies on bridges or oracles will exhibit elevated PDs due to their heightened vulnerability profile. Conversely, mature, fully audited smart contracts with minimal external dependencies will benefit from downward adjustments, reflecting their lower risk.

The outputs of this sub-methodology form the Anchor PD of the Derivative Tokens Methodology or contribute to the Anchor PD of the Stablecoins methodology, which are Calibration Level methodologies.
