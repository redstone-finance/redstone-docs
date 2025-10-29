# Morpho Methodologies

Morpho is a permissionless, non-custodial lending protocol on Ethereum and Base. For more information, visit the Morpho [website](https://morpho.org) or view Morpho [documentation](https://docs.morpho.org).

The documentation covers Morpho Market and Morpho Vault methodologies. The Morpho Market methodology utilizes collateral asset ratings as inputs into a market and liquidation simulations.&#x20;

The Morpho Vault methodology outlines the process of aggregating multiple market outputs and applying a set of modifiers to arrive at vault outputs.

#### Morpho Vault Rating Scale

For ratings on Morpho Vaults, Credora publishes a user-friendly rating scale, from A to D. The calculated Probability of Significant Loss (PSL) drives the rating output. See the [Market Methodology](market-methodology.md) for additional details.&#x20;

| Vault Rating | Min PSL | Max PSL |
| ------------ | ------- | ------- |
| A+           | 0.00%   | 0.125%  |
| A            | 0.125%  | 0.400%  |
| A-           | 0.400%  | 1.125%  |
| B+           | 1.125%  | 2.00%   |
| B            | 2.00%   | 3.33%   |
| B-           | 3.33%   | 6.67%   |
| C+           | 6.67%   | 12.50%  |
| C            | 12.50%  | 25.00%  |
| C-           | 25.00%  | 99.99%  |
| D            | 100%    | 100%    |

The D rating is utilized for instances where a market is in a default state. Morpho realizes bad debt as it accrues, and therefore any D rating assignment is expected to be temporary.&#x20;

While the user-friendly rating scale is utilized for Morpho display, Credora additionally maps PSL outputs to traditional ratings utilizing the Credora PD Curve.
