
# The Problems RedStone Solves ♦️

### Problem #1: The standard approach of providing data to applications is inefficient and expensive.
The standard method of providing data is to ‘push’ the data onto the blockchain regardless of whether it is used by an application. This results in paying more for data and dedicating resources that could be used elsewhere.

**Our Solution**  
RedStone allows data to be provided on-demand rather than on a fixed schedule, reducing the costs of putting data 'on-chain'. This is achieved by storing data off of the blockchain as cryptographically signed packages and allowing smart contracts of dApps to fetch data when necessary.

*Note on Data Integrity:*  
To maintain data integrity, RedStone also provides data feeds to Arweave, a decentralized network that provides data storage. Arweave's decentralized network makes it tamper-proof; therefore, any data provided by RedStone to Arweave acts as an unbiased source of truth about the historical data provided by RedStone.

Overall, RedStone's approach improves efficiency for dApps and significantly reduces the costs for dApps to access data feeds.

### Problem #2: The typical monolithic architecture of oracles limits scalability.
A consequence of a monolithic architecture is that it makes it challenging for protocols to reduce latency and list new assets.

**Our Solution**  
RedStone was designed with a modular architecture, making it easy to incorporate new assets and reduce latency, allowing dApps to scale more efficiently. This means constructing the oracle in such a way that its various components—such as data sources, validation mechanisms, and delivery methods—can be easily interchanged, updated, or augmented without disrupting the system’s overall functionality.
