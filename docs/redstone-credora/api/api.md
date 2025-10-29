---
cover: ./assets/Mask group.png
coverY: 0
---

# Overview

### Ratings and Risk Metrics Drive Informed Decisions

The Credora Network distributes ratings and risk metrics for direct consumption and for redistribution. Direct consumption is where the consumer is utilizing metrics internally, while redistribution is where the consumer is providing access to a wider audience. Ratings are utilized by for various audiences for different purposes, outlined as follows:&#x20;

| Business Type  | Consumption        | Redistribution     |
| -------------- | ------------------ | ------------------ |
| Asset Managers | :heavy_check_mark: |                    |
| Wallets        |                    | :heavy_check_mark: |
| Exchanges      | :heavy_check_mark: | :heavy_check_mark: |
| Protocols      | :heavy_check_mark: | :heavy_check_mark: |

Below are example use cases:

- **Asset Managers** consume Risk Ratings for internal risk management, optimization of risk-reward decisions, and demonstrating in-depth analysis for relevant stakeholders.&#x20;
- **Wallets** help users navigate various DeFi protocols, and improve user experiences by providing third-party risk information.
- **Exchanges** manage internal exposures, including approving and managing specific thresholds for collateral assets.&#x20;
- **Protocols and Applications** utilize Risk Ratings for optimizing capital allocation managing risk parameters.

## API Access

Credora GraphQL APIs expose ratings information alongside unique data points, powering risk management across protocols, asset managers, and active onchain participants.&#x20;

APIs are structured to provide responses across three primary categories:

- Assets
- Morpho Markets
- Morpho Vaults

Each category has two primary sections of data: Ratings and Data. The former exposes active Credora and Credora Network Consensus Ratings, while the latter contains various metrics which are relevant for Credora methodologies and risk management.

**Endpoint:** https://platform.credora.io/api/v2/graphql

[GraphQL IDE](https://platform.credora.io/api/v2/graphiql/index.html?path=/api/v2/graphql)

Developers can use standard POST requests to query the endpoint with a GraphQL query. You can use tools like Postman, Insomnia, or GraphQL playgrounds to explore and test queries.

### Authentication

Accessing Credora APIs requires an account on the Credora Platform. Access is free for partners and participants in the Credora Network. You can Request Access via the Credora Network website.

Clients must authenticate using a Client ID and Client Secret provided by Credora. All GraphQL requests must include the following HTTP headers:

- "clientId": "Your unique client identifier"
- "clientSecret": "Your assigned client secret key"
