# API

Credora GraphQL APIs expose ratings information alongside unique data points, powering risk management across protocols, asset managers, and active onchain participants.

APIs are structured to provide responses across three primary categories:

- Assets
- Morpho Markets
- Morpho Vaults

Each category has two primary sections of data: Ratings and Data. The former exposes active Credora and Credora Network Consensus Ratings, while the latter contains various metrics which are relevant for Credora methodologies and risk management.

Endpoint: `https://platform.credora.io/api/v2/graphql`

[GraphQL IDE](https://platform.credora.io/api/v2/graphiql/index.html?path=/api/v2/graphql)

Developers can use standard POST requests to query the endpoint with a GraphQL query. You can use tools like Postman, Insomnia, or GraphQL playgrounds to explore and test queries.

Accessing Credora APIs requires an account on the Credora Platform. Access is free for partners and participants in the Credora Network. You can Request Access via the Credora Network website.

Clients must authenticate using a Client ID and Client Secret provided by Credora. All GraphQL requests must include the following HTTP headers:

"clientId": "Your unique client identifier",

"clientSecret": "Your assigned client secret key"
