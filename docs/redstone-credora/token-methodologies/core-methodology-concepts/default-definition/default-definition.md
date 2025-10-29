# Default Definition

According to Credora's definition, a default occurs when a token fundamentally fails to meet core commitments to maintaining the necessary reserves or ensuring redemption. Understanding default definitions is critical for Reviewers, as their inputs include the assignment of a probability of default.&#x20;

Credora default definitions are connected to the redemption mechanics of a token, including the **Redemption Price**. Redemption price refers to the predefined rate at which a token is expected to be exchanged for underlying assets directly via the issuing entity. The redemption price may be determined by platform notices, legal documents, or interpretations of public statements made by the issuer. The redemption price may vary depending on the token structure, including fiat-backed stablecoins, wrapped tokens, and liquid staking tokens (LSTs).

- For fiat-backed stablecoins, the redemption price is typically 1:1 for fiat currency. For example, 1 USDC is redeemable for 1 USD.&#x20;
- For wrapped tokens, such as WBTC or cbBTC, the redemption price is typically 1:1 for the underlying asset. For example, 1 WBTC is redeemable for 1 BTC.&#x20;
- For liquid staking tokens (LSTs) such as stETH, rETH, or wstETH, redemption prices may vary due to accrued ETH staking rewards. For non-rebasing tokens, the redemption price accounts for the underlying token and accrued staking rewards. For rebasing tokens, the total supply of the token is inflated to capture staking rewards, and the token's redemption price is 1:1 for the underlying asset.&#x20;

As it applies for a specific token, a state of default may be temporary. In instances where a state of default is unclear according to the below definitions, the determination will be made utilizing input from Reviewers and the Credora Network community.&#x20;

Credora methodologies anchor to the following default definitions based on the redemption price defined in the previous section. Default scenarios defined below may occur simultaneously or independently. For example, Redemption Failures may accompany periods of Reserve Insolvency.

1. **Redemption Failure**

   Redemption Failure occurs when eligible token holders are unable to redeem tokens for a sustained period. This definition aims to capture operational failures, technical malfunctions, and liquidity constraints or insolvency that prevent redemptions from occurring according to the respective token commitments. Temporary delays, which may result from long withdrawal queues, are not considered a Redemption Failure. Credora considers a 2-week Redemption Failure as a default.

   Redemption Failure is analogous to a missed debt payment leading to a technical default in traditional finance. In the case of a corporation, this may result from insufficient liquid assets, operational failures, or other cases. Similarly, in the case of a sovereign default, a government may delay or restructure bond payments due to liquidity crises or fiscal mismanagement. Even if the debtor can eventually resume payments, the missed obligation signals financial or operational distress.&#x20;

   Similarly, when a token issuer halts or severely restricts redemptions versus communicated policies, it signals an inability to fulfill one of its core commitments. While recovery is possible, these events represent a fundamental breakdown, warranting classification as a default.

1. **Reserve Insolvency**

   Reserve Insolvency occurs when the fair value of reserves declines 1% below the value of outstanding issuance, where outstanding issuance is the circulating token supply multiplied by the redemption price. Credora classifies Reserve Insolvency as a default, where it is sustained for 7 or more consecutive days.

   In traditional finance, a 7-day period is commonly used as a threshold for financial distress. For example, depending on the jurisdiction banks may be expected to restore liquidity within this timeframe before regulatory intervention escalates. Regulatory frameworks often mandate that deposit insurance payouts, liquidity buffers, and emergency funding mechanisms be resolved within 7 days to prevent systemic risk. Applying this standard to token solvency, a 7-day threshold serves as a reasonable benchmark to distinguish temporary shortfalls from more prolonged issues justifying default classification.

   Typically, periods of Reserve Insolvency are accompanied by a deviation in the price of the relevant asset, versus the target or peg price. However, deviations in price do not always constitute Reserve Insolvency, and may result from general market volatility or concerns of stability. Credora defines these periods of excess volatility separately as **Stress Events**. Reserve Insolvency may result from smart contract exploits, custodial breaches, or an unexpected impairment in the value of reserve assets.

   Consider examples in the case of fiat-backed stablecoins, wrapped tokens, and liquid staking tokens.

   - Fiat-backed stablecoins have a stated redemption price of 1:1 for fiat currency. Reserve Insolvency occurs where the value of the reserves in aggregate falls 1% below the outstanding issuance multiplied by the redemption price, for a 7-day period.&#x20;
   - Wrapped products have a redemption price of 1:1 for the underlying. Reserve Insolvency occurs where the value of the reserves in aggregate falls 1% below the outstanding issuance multiplied by the redemption price, for a 7-day period.&#x20;
   - Where liquid staking tokens are rebasing (e.g. stETH), Reserve Insolvency occurs where the value of reserves in aggregate falls 1% below the outstanding issuance multiplied by the redemption price, for a 7-day period. Where liquid staking tokens are non-rebasing, Reserve Insolvency occurs where the redemption price (e.g. wstETH &lt;-&gt; stETH) declines by 1%, for a 7-day period.

   In traditional finance, Reserve Insolvency is analogous to corporate insolvency. Where a corporation has outstanding debt or liabilities, and assets on the balance sheet are insufficient to meet obligations. In many cases, companies may be insolvent for a period, before a technical default is declared. A similar concept exists in Asset-Backed Securities (ABS), where cash flows from underlying assets (e.g., mortgages, auto loans) support structured financial products. If delinquencies or defaults rise in the underlying assets, the cash flows may become insufficient to cover outstanding obligations, causing payment shortfalls, a deterioration in credit quality and a technical default.

   As a result of principal and interest schedules on traditional debt issuance, there may be periods of insolvency which do not result in a technical default. Tokens are unique in that there are typically rolling redemption capabilities, which means there is likely a more immediate impact in cases where the fair value of assets falls below liabilities.

---

_Credora methodologies today do not apply to algorithmic stablecoins. As a result, the above definitions are not tailored to classifying a default. Historically, purely algorithmic stablecoins have experienced multiple failures, and as a result, are less pervasive throughout the ecosystem._

_Credora recognizes that stress events have a significant impact on users throughout DeFi, and as a result, is currently considering ways of categorizing Stress Events, and calculating their probability of occurrence alongside default events. Overall, the categorization of defaults or stress events may evolve and increase in granularity alongside feedback from Credora Network Participants, where the aim is to provide the highest utility outputs for DeFi participants._&#x20;
