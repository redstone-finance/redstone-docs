---
sidebar_position: 1
sidebar_label: "⚙️ Core (on-demand feeds)"
---

# Setting Up The RedStone Core Model 
****This is our recommended model**** which provides data feeds to dApps only upon request, reducing the costs of putting data onto the blockchain. To learn more about how RedStone brings data on-chain, check out the [Data Formatting and Processing](https://docs.redstone.finance/docs/get-started/data-formatting-processing) section.
### Prerequisites Before You Begin:

- **Knowledge of Smart Contracts:** Understanding how to implement and interact with smart contracts.
- **Familiarity with Hardhat or Foundry:** Knowing how to use these development environments for building and testing dApps.
- **OpenZeppelin Contracts:** Understanding and using OpenZeppelin's library.

### Important Notes:
- **Solidity Version:** Ensure your smart contract uses Solidity version 0.8.4 or higher. If using an older version, refer to the manual payload method.
- **Testing Environment:** Remix is not supported for testing RedStone Oracles. 
- **Upgradability:** Implement an upgradability mechanism (e.g., multisig or DAO) for your contracts to quickly replace data providers if needed.
- **Examples:** You can see examples of the `@redstone-finance/evm-connector` usage in our [dedicated repo with examples](https://github.com/redstone-finance/redstone-evm-examples).


# ****Step-by-Step Guide****

## 1. Install Prerequisites

#### For Hardhat
1. To add the RedStone EVM connector package, type one of these commands:
   - If you're using Yarn:
     ```bash
     yarn add @redstone-finance/evm-connector
     ```
   - If you're using npm:
     ```bash
     npm install @redstone-finance/evm-connector
     ```

#### For Foundry

1. Open your terminal
2. Navigate to your Foundry project directory
   ```bash
   cd path/to/your/foundry/project
   ```

3. Install the RedStone EVM connector
   
   ```
     forge install redstone-finance/redstone-oracles-monorepo
   ```

4. Install the OpenZeppelin contracts, which the RedStone connector relies on.

   ```
     forge install OpenZeppelin/openzeppelin-contracts@v4.9.5
   ```
5. Link these new libraries by adding their paths to a file called remappings.txt.
  ```bash
echo "@redstone-finance/evm-connector/dist/contracts/=lib/redstone-oracles-monorepo/packages/evm-connector/contracts/
@openzeppelin/contracts=lib/openzeppelin-contracts/contracts/" >> remappings.txt
```

## 2. Adjust Your Smart Contracts 

#### 1. Import RedStone Base Contract
Add this line at the top of your smart contract code. 

```js
import "@redstone-finance/evm-connector/contracts/data-services/MainDemoConsumerBase.sol";
```
#### 2. Extend Your Contract
Make your contract use the new features by extending from MainDemoConsumerBase.

```js
contract YourContractName is MainDemoConsumerBase {
  // Your contract code goes here
}
```
#### 3. Use Data Feeds
Inside your contract, you can now access data provided by RedStone. This code fetches the latest price of ETH and BTC.

For a single price: 
```js
uint256 ethPrice = getOracleNumericValueFromTxMsg(bytes32("ETH"));
```
For multiple prices:
```js
bytes32[] memory dataFeedIds = new bytes32[](2);
dataFeedIds[0] = bytes32("ETH");
dataFeedIds[1] = bytes32("BTC");

uint256[] memory values = getOracleNumericValuesFromTxMsg(dataFeedIds);
uint256 ethPrice = values[0];
uint256 btcPrice = values[1];
```
For all the supported feeds we provide UI with charts and historical data. 

#### 4. About overriding the following functions (only if necessary - at your own risk)

```isTimestampValid(uint256 receivedTimestamp)``` returns (bool) - to enable custom logic of timestamp validation. You may specify a shorter delay to accept only the most recent price fees. However, on networks with longer block times you may extend this period to avoid rejecting too many transactions.

```aggregateValues(uint256[] memory values)``` returns (uint256) - to enable custom logic of aggregating values from different providers (by default this function takes the median value). For example, you may request values from providers to be strictly equal while dealing with discrete numbers.

```getAuthorisedSignerIndex(address _signerAddress)``` returns (uint256) - to whitelist additional signers or remove corrupted ones.

```getUniqueSignersThreshold()``` returns (uint256) - to modify number of required signers. The higher number means greater reliability but also higher gas costs.

#### 5. About a manual payload (if needed)

This approach is helpful if you need to pass the pricing data from one contract to another in your protocol. It's also a solution for cases where your contracts are written in Solidity in a version lower than 0.8.4, making it problematic to extend from the RedstoneConsumerBase contract. In such cases, we recommend deploying a separate Extractor contract that will contain the verification logic.
```js
pragma solidity 0.8.4;

import "@redstone-finance/evm-connector/contracts/mocks/RedstoneConsumerNumericMock.sol";

contract RedstoneExtractor is RedstoneConsumerNumericMock {

  function extractPrice(bytes32 feedId, bytes calldata redstonePayload) public view returns(uint256) {
      return getOracleNumericValueFromTxMsg(feedId);
  }
}
```
```js
function getPriceFromRedstoneOracle(bytes32 feedId, bytes calldata redstonePayload) public view returns(uint256) {
  return redstoneExtractor.extractPrice(feedId, redstonePayload);
}
```
```js
const redstonePayload = await (new DataServiceWrapper({
  dataServiceId: "redstone-main-demo",
  dataFeeds: ["ETH"]
}).getRedstonePayloadForManualUsage(yourContract));

// Interact with the contract (getting oracle value securely)
const price = await yourContract.getPriceFromRedstoneOracle(redstonePayload);
```
Working demo examples of the @redstone-finance/evm-connector usage can be found in our [dedicated repository with examples](https://github.com/redstone-finance/redstone-evm-examples).



## 3. Adjust JavaScript Code of Your dApp

#### 1. Import the Wrapper Code

```js
const { WrapperBuilder } = require("@redstone-finance/evm-connector");
// or using ES6 syntax
import { WrapperBuilder } from "@redstone-finance/evm-connector";
```

#### 2. Wrap Ethers contract

```js
const yourEthersContract = new ethers.Contract(address, abi, provider);

const wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
  dataFeeds ["ETH", "BTC"],
});
```

#### 3. Use the Wrapped Contract

```js
wrappedContract.executeYourMethod();
```
## 4. Testing
For Hardhat
Mock Wrapper for Testing.
Use a mock wrapper to simulate different scenarios without using real data:
```js
const { SimpleNumericMockWrapper } = require("@redstone-finance/evm-connector/dist/src/wrappers/SimpleMockNumericWrapper");

const wrappedContract = WrapperBuilder.wrap(yourContract).usingSimpleNumericMock({
  mockSignersCount: 10,
  dataPoints: [{ dataFeedId: "ETH", value: 1000 }],
});

await wrappedContract.yourMethod();

```
For Foundry
Generate Mock Data:
Use Foundry's functions to create mock data packages for testing. Refer to the [foundry integration repository](https://github.com/redstone-finance/minimal-foundry-repo) for detailed examples.

