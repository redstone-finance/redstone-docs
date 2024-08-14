## How RedStone Ensures Secure and Accurate Data Feeds

RedStone has secured billions of dollars to date without being hacked or reporting a compromised price feed. This strong track record is a testament to the robust security and accuracy measures in place.

### Cryptographic Signatures and Auditing

To ensure the integrity of incoming data feeds, RedStone nodes cryptographically sign incoming data from over 180 data providers. All data is signed using the elliptical curve signature, secp-256, commonly used in Ethereum Virtual Machine (EVM) environments. This process attributes the data to its source, providing proof of origin and ensuring the data is tamper-proof. The signed data is pushed to the blockchain, where it can be verified by RedStone and any party wishing to evaluate its integrity. The availability of on-chain data serves as a historical record, ensuring a permanent and verifiable audit trail.

RedStone's commitment to security is further demonstrated through regular auditing of their smart contracts by reputable firms, including Audit One, PeckShield, and ABDK. These smart contracts are also open-source, allowing public scrutiny at any time.

### Reliability

RedStone continuously monitors its price feeds for abnormalities, checking liquid staking price feeds for slippage every 10 seconds. Node operators use RedStone’s software to detect any suspicious activity, ensuring data accuracy. RedStone relies on Arweave, a decentralized data storage network, to store some of its processed data, allowing individuals to verify the accuracy of data used by decentralized applications (dApps). To enhance data reliability, RedStone sources its data from a diverse range of centralized exchanges (CEXs), decentralized exchanges (DEXs), and data aggregators. If one source is compromised, it can be immediately removed, allowing dApps to customize their data feeds.

For use cases prone to front-running, RedStone implements a system where users initiate transactions by recording their intent to interact with a protocol on-chain, without including the price at the time of execution. This approach mitigates the risk of arbitrage attempts through front-running. RedStone also implements rigorous internal processes to protect against potential attacks, ensuring ongoing system security.

### Redundancy

RedStone incorporates liquidity weighting to automatically detect low liquidity and high slippage in data sources. Multiple layers of redundant monitoring are employed across the system. For example, RedStone uses multiple relayers for data pushing and broadcasting, ensuring that anyone can push price data on-chain. Geographically distributed gateways on multiple infrastructure providers further enhance data broadcasting. RedStone also leverages Pub/Sub networks like StreamR for decentralized data distribution through a network of nodes, supporting continuous data feeds.

RedStone’s decentralized gossiping nodes allow anyone to spin up a node and participate in the data network, enhancing decentralization and resilience. The data delivery system includes master relayers supported by shadow relayers that automatically activate if primary relayers fail. Gelato automation further enhances system reliability. The relayer code is open-source, allowing anyone to push data on-chain without permission.

### Conclusion

RedStone avoids single points of failure by minimizing dependence on third parties and sourcing data directly from liquidity pools and providers like Kaiko. The modular architecture ensures that if one service fails, others automatically take over. Together, these features make RedStone Oracles secure and reliable.

