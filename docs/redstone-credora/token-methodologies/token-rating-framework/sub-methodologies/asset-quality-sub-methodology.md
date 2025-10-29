# Asset Quality Sub-Methodology

The Credora Asset Quality Sub-Methodology assesses risks that may lead to a decline in the fair value of reserve assets, arising from credit defaults or losses from underlying investment strategies. According to the Credora Default Definition, a token is considered to be in default (or insolvent) when the outstanding supply of the token multiplied by the Redemption Price, or the Redemption Value, exceeds the fair value of the underlying reserves by 1%. These losses can be triggered by a number of factors, which are captured by the Credora Asset Quality Sub-Methodology:

- **Market Risk:** The risk of changes in the fair value of reserves, which may arise from normal or extreme market conditions.
- **Credit Risk:** The risk of changes in the fair value of reserves, which may arise from credit deterioration.
- **Liquidity Risk:** The risk of an inability to effectively convert reserve assets absent incurring significant losses.

The output of this sub-methodology is the Asset Quality PD. This methodology is part of the Sub-Methodology layer of the Credora Token Rating Framework.

The following evaluation techniques are applied for different types of tokens:

- **Direct Rating:** Utilizes Credora methodologies for the assignment of a rating. This approach is utilized for reserve assets which are themselves tokens (e.g. stablecoins).
- **Market Proxy:** Utilizes credit ratings from recognized rating agencies or market indicators to quantify the risk of reserve assets. This approach is utilized for real-world assets, which are typically low volatility traditional market assets (e.g. U.S. Treasury Bills)
- **Monte Carlo Simulations:** Utilizes market simulations to evaluate potential scenarios in the performance of reserve assets and the probability of reserve asset value falling below the parameters defined in Credora Default Definitions, in the context of issuer protocol mechanics. This approach assesses key factors including credit risk, volatility, and liquidity. It is utilized for tokens where reserves are composed of alternative assets, typically having distinct volatility profiles.
- **Structural Credit Modeling:** Utilizes variations of the Merton Model framework, to quantify the probability of reserve asset value falling below the parameters defined in Credora Default Definitions. This method primarily considers volatility and reserve adequacy. It is utilized for tokens where reserves are deployed in active investment strategies (e.g. hedged derivatives positions).&#x20;

Each of these evaluation techniques is further detailed in their application to specific token structures in the sections below.

#### Real World Assets

Real-World Asset (RWA) tokens derive their value from reserves composed of offchain assets, such as fiat currency, commodities, or fixed-income instruments. For example, USDC is backed by reserves primarily held in U.S. Treasury Bills and cash deposits. Custody risk is assessed separately in the relevant sub-methodology.

The Asset Quality Sub-Methodology focuses on evaluating credit risks. For example, the risk that U.S. Treasury Bills or corporate bonds may deteriorate in credit quality or default, affecting token reserve value and therefore token stability. Credit events may result in fair value losses.

To assess these risks, Credora employs a market proxy approach, using aggregations of public credit ratings for the underlying assets. For instance, traditional ratings on Treasury Bills may be used as a proxy for the quality of reserves.

Where applicable, the Asset Quality PD of stablecoins backed by money market funds is calculated directly or established considering direct ratings assigned to similar vehicles. In cases where there is a duration gap between the similar vehicles and the respective fund, a duration adjustment is applied. &#x20;

The Duration Risk Adjustment measures the relative risk of longer-dated instruments that are more exposed to changes in credit conditions over time, increasing the likelihood of default as maturity extends. It is determined using cumulative default rates by credit rating and tenors for sovereign and corporate credits, sourced from credit rating agencies. A premium is interpolated based on the difference between the tenor of the underlying investment portfolio and that of the base portfolio with minimal tenor risk. Specifically, a premium is added for each additional month of maturity relative to the base portfolio. A selection of these are presented below for AAA to A rated sovereign credits:

<table><thead><tr><th width="146.91015625">Duration (months)</th><th>AAA</th><th>AA+</th><th>AA</th><th>AA-</th><th>A+</th><th>A</th></tr></thead><tbody><tr><td>3</td><td>0.0000%</td><td>0.0002%</td><td>0.0004%</td><td>0.0006%</td><td>0.0012%</td><td>0.0022%</td></tr><tr><td>6</td><td>0.0000%</td><td>0.0007%</td><td>0.0011%</td><td>0.0018%</td><td>0.0035%</td><td>0.0064%</td></tr><tr><td>9</td><td>0.0000%</td><td>0.0013%</td><td>0.0020%</td><td>0.0033%</td><td>0.0066%</td><td>0.0118%</td></tr><tr><td>12</td><td>0.0000%</td><td>0.0020%</td><td>0.0030%</td><td>0.0051%</td><td>0.0101%</td><td>0.0182%</td></tr><tr><td>18</td><td>0.0000%</td><td>0.0036%</td><td>0.0054%</td><td>0.0090%</td><td>0.0180%</td><td>0.0323%</td></tr><tr><td>24</td><td>0.0000%</td><td>0.0051%</td><td>0.0076%</td><td>0.0127%</td><td>0.0254%</td><td>0.0458%</td></tr><tr><td>36</td><td>0.0000%</td><td>0.0066%</td><td>0.0099%</td><td>0.0165%</td><td>0.0329%</td><td>0.0593%</td></tr></tbody></table>

In cases where the weighted average portfolio type is not provided, a conservative selection is applied based on the type of investment. For instance, for tokenized money market funds, a weighted average maturity of 6 months is utilized if no information is available.

#### Alternative Assets

Alternative Asset tokens maintain their value by holding reserves in multiple collateral assets, which may include cryptocurrencies, treasury bills, or other assets. In certain cases, alternative asset tokens are minted against varying forms of collateral. In these scenarios, alternative asset tokens typically control collateral assets which more meaningfully exceed redemption value. Token redemption mechanics are dependent on the stability and performance of the underlying assets. However, these tokens face several risks, including: (i) credit deterioration of reserve assets (ii) a decline in the market value of the reserve assets and (iii) illiquidity of the reserve assets, as liquidations are a core component of certain protocol mechanics.

The first two risks drive volatility in the value of the collateral. If the market value of the crypto collateral backing the token declines sharply, Redemption Value may be impaired. On the other hand, illiquidity risk is particularly relevant as protocol mechanics typically allow for the liquidation of reserve assets, as values decline relative to token issuance. It may be difficult to liquidate assets backing the token in times of market stress.

Credora uses Monte Carlo simulations to assess the risk of these tokens, considering the token structure and protocol mechanics. This approach involves modeling a variety of potential future scenarios for collateral assets, including regular market fluctuations and extreme events. The simulations calculate the probability that the value of reserve assets fall below the Redemption Value, according to Credora default definitions.

Credora relies on several key inputs, considering the characteristics of the token. These inputs include:

- **Asset Volatility:** All else equal, volatile assets carry additional risk because their value may change meaningfully in a short period, affecting active LTV ratios. The simulations rely on asset return distributions, which themselves are modeled considering historic price behavior, extreme events, and the probability of credit events (as applicable).
- **Loan Distribution:** In cases where tokens are minted by collateralized debt positions, Credora considers active loan distributions. This provides information on the risk of outstanding positions, in relation to the Liquidation Triggers described below.&#x20;
- **Liquidation Triggers:** The liquidation trigger is the loan-to-value (LTV) ratio at which a protocol may initiate a liquidation. This is a key factor in determining the probability of losses during periods of decline in collateral asset value. Liquidation mechanics are also considered, where different protocols rely on different mechanisms for incentivizing efficient liquidation processes.
- **Market Liquidity:** The notional amount of liquidity available to execute a sale of the collateral assets in the event of a decline in value. Credora captures recurring liquidity metrics across multiple liquidity sources, and builds curves which quantify the available liquidity as slippage increases.&#x20;

The simulation is split into two separate pieces. First, Credora simulates market prices for the relevant asset pair, resulting in LTV paths across the loan distribution. This results in a series of liquidation triggers, where the liquidation process is separately simulated, considering liquidation amounts versus the available liquidity. Liquidation simulations rely on a step function, where a price move is segmented linearly into a number of steps, and a liquidation occurs in each step. By simulating a broad range of market conditions, this method provides a comprehensive assessment of the potential for a default.

As an example, simulations are utilized for the assessment of DAI (USDS), a decentralized stablecoin issued against overcollateralized crypto assets. The simulation models asset and LTV price paths across relevant markets, assessing the probability of a default event. In the case of DAI, multiple approaches are utilized across the various collateral models. For example, while simulations quantify the risk of the CDP and D3M modules, other modules utilize direct rating and market proxy approaches. The results of these respective approaches are combined according to their corresponding DAI issuance.

#### Active Strategy

Tokens that maintain their value using collateral or specific trading strategies (e.g. USDe) are designed to retain redemption integrity by effectively managing reserve assets. These tokens face risks including (i) a decline in the value of the reserve assets, (ii) mismanagement of reserves, and (iii) illiquidity of underlying assets.

Credora assesses these risks using variations of the Merton Model, which analyzes the current value of the assets backing token issuance (including any insurance assets), the strategy return volatility, and the token Redemption Price. The Merton Model fundamentally assigns a probability of default by treating the excess of reserve assets versus Redemption Value (i.e. liabilities) as a call option on reserve assets. It utilizes the Black-Scholes option pricing framework. As applied by Credora, the Merton Model calculates the probability that per unit reserve value falls below the Redemption Price (i.e. per unit reserve value falling below $1 for USD stablecoins). According to the model, a larger equity cushion or insurance buffer, and lower return volatility are factors which reduce the probability of per unit reserve value falling below the Redemption Price.

Credora utilizes a specific version of the Merton Model, known as the Black-Cox model. The Black-Cox model introduces a default barrier that allows for early default prior to a maturity defined in the Merton Model (e.g. 1 year). This application incorporates the concept of barrier options, where excess reserves behave like a barrier option on reserve asset value. The approach relies on several assumptions:

- **Geometric Brownian Motion:** The value of the reserve assets evolves stochastically, where the methodology includes inputs for a drift rate (expected growth) and volatility.
- **Debt Structure:** The model projects debt, or Redemption Value, as constant over the tenor of the analysis. The Redemption Value at which Credora assigns a default event acts as a predefined barrier.
- **Liquidity of Assets:** The reserve assets are sufficiently liquid, allowing for accurate valuation and reasonable liquidation. Where the history of the strategy includes periods of market volatility, return history encapsulates periods of illiquidity.

While this approach simplifies certain complexities, it remains well-suited to the structural and behavioral characteristics of tokens managing reserves via active strategies. The model effectively captures the relationships across reserve asset value, volatility, and strategy performance, providing a robust framework for assessing default risk.&#x20;

In the application, the model utilizes the following inputs:

- **Reserve Assets Value:** Reserve Assets include the collateral posted to mint tokens, which are typically deployed by the protocol in specific trading and hedging strategies. Reserve Assets Value also includes the value of insurance pools designed to cover potential losses.&#x20;
- **Redemption Value:** The Redemption Value is defined according to Credora default definitions, and is calculated as the total value of tokens issued by the protocol multiplied by the Redemption Price.
- **Volatility:** Return variability is specific to the underlying Reserve Assets (ignoring any insurance fund).
- **Tenor:** A 1-year tenor is applied in the Merton Model, aligning to the Credora PD Curve.
- **Risk-Free Rate:** The risk-free rate is replaced by a growth rate in cases where a share of protocol revenue is allocated to the insurance fund.

Additionally, utilizing historical data from the respective token, Credora creates multiple scenarios in the application of the Black-Cox model. The results of independent applications are aggregated using a weighted average, where each scenario is assigned a specific weight. This approach more effectively captures a range of potential scenarios, as it pertains to reserve assets value, redemption value, volatility, and the risk-free rate.&#x20;

### Output

In determining the Anchor PD for various types of tokens, Credora methodologies combine the Asset Quality PD and either the Smart Contract Custody Sub-Methodology or the Centralized Custody Sub-Methodology. These outputs are utilized as inputs in the Anchor PD of the Derivative Tokens Methodology or Stablecoins Methodology, which are Calibration Layer methodologies.&#x20;

\
