---
sidebar_position: 1
sidebar_label: "What is RedStone?"
sidebar_class_name: sidebar-redstone-section
---

# Introduction

There is a growing need for decentralized applications (dApps) to access data feeds that are frequently updated, reliable, and secure. RedStone is a leading blockchain data provider directly fulfilling this need. Trusted by 100+ dApps and securing billions of dollars of value, RedStone provides customizable and cost-efficient data streams for builders empowering the next generation of dApps. RedStone also provides data feeds to blockchains and layer 2 scaling solutions across the entire blockchain ecosystem that are both EVM and non-EVM compatible. The current model of blockchain oracle systems suffers from key inefficiencies, all of which RedStone was specifically designed to solve from the bottom up. This makes RedStone a unique oracle service.

## Multi-chain data delivery

RedStone's modular architecture separates data collection from data delivery, creating a flexible system that scales efficiently across blockchain networks. This design allows the same price feeds to be deployed to any supported chain without modifying the core data provider infrastructure. By eliminating the need to deploy new nodes for each integration, RedStone achieves faster and more cost-effective expansion while maintaining consistent security standards across all networks. This architectural approach has proven highly successful, enabling RedStone to expand its service to more than 70 different blockchain networks while ensuring reliable price data delivery and maintaining the same rigorous security measures across all integrations.

<a target="_blank" href="https://raw.githubusercontent.com/redstone-finance/redstone-docs/main/static/img/redstone-architecture-simple.png">
  <img alt="RedStone Architecture" src="/img/redstone-architecture-simple.png"/>
</a>

## Unique data feeds

RedStone's versatile data framework extends beyond standard cryptocurrency price feeds to serve emerging financial products and specialized digital assets. The system's modular architecture enables it to provide reliable data for complex instruments like Liquid Restaking Tokens (LRT), Bitcoin DeFi derivatives (BTCFi), and various Real World Assets (RWA), each with tailored validation parameters and aggregation methods. By combining institutional data provider connections with traditional crypto market data, RedStone processes these specialized feeds through multiple validation layers - from asset-specific anomaly detection to market depth analysis and cross-source variance checks. Each feed undergoes customized price aggregation before being validated through a consensus mechanism requiring agreement from multiple independent, collateralized operators.

## High security and data quality standards

RedStone implements a comprehensive security architecture for cryptocurrency price feeds, employing a multi-layered approach to data validation and system reliability. The infrastructure is built on principles borrowed from critical systems engineering, featuring distributed nodes that independently verify data integrity and multiple redundant backup systems that ensure continuous operation even during partial outages. Through rigorous monitoring, anomaly detection, and consensus-based price formation, combined with economic incentives for data providers, the system has maintained an unblemished track record with zero mispricing incidents since its inception. This achievement is supported by a robust development lifecycle that includes regular third-party security audits, continuous automated testing, and a sophisticated alert system that enables rapid response to potential anomalies before they can impact price data quality. The code was [audited](./security/4-audits.md) multiple times and trusted by [top DeFi](https://www.redstone.finance/clients) protocols.
