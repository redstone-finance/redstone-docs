searchState.loadedDescShard("redstone", 0, "RedStone\nType wrapping bytes represantion.\nCrypto operations needed for address recovery.\nEnvironment in which we execute. Provides logging etc\nType describing feed ids. We expect FeedId to be byte …\nConfiguration for the redstone protocol. Pluggable with …\nType describing address of signer. Typically pubkey of …\nType describing timpestamp, we use to directly show we …\nType describing values we are getting from and to network. …\nCasper extension\nReturns config for payload decoding and validation.\nContract specific logic.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nRadix extension\nSolana extension\nModule containing primitives used for verification of the …\nTimestamp verifier, with variants for trusted/nontrusted …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nChecks if the <code>updater</code> is in the trusted set. If yes, …\nVerifies if:\nVerifies if:\nFor trusted variant see verify_trusted_update. For …\nVerifies if:\nVerifies if:\nVerifies if:\nConfiguration for a RedStone payload processor.\nThe current block time in timestamp format, used for …\nIdentifiers for the data feeds from which values are …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nThe maximum time package was created ahead of the current …\nThe maximum delay of the package in regards to the current …\nThe minimum number of signers required validating the data.\nList of identifiers for signers authorized to sign the …\nVerifies all members of the config.\nThe main processor of the RedStone payload.\nContains the error value\nContains the success value\nRepresents the result of processing the RedStone payload.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nThe minimum timestamp encountered during processing.\nA collection of values processed during the operation.\nDefault crypto operations. Uses k256 and sha3 crates.\nStandard nonspecialized implementation of the …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nEnvironment in which the code executes.\nDefault and standard implementation of the <code>Environmet</code> …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nEnvironment specific print function.\nUsed when an expected non-empty array or vector is found …\nIndicates that list doesn’t contain FeedIds.\nConfigExceededSignerCount occurs when number of signer …\nConfigInsufficientSignerCount occurs when number of signer …\nIndicates that a FeedId is reocuring on config feed_ids …\nIndicates that a SignerAddress is reocuring on config …\nRepresents errors that arise from the contract itself.\nRepresents errors related to cryptographic operations.\nIndicates that the current timestamp is not greater than …\nErrors that can be encountered in the …\nIndicates that the number of signers does not meet the …\nUsed when there is leftover data in a payload that should …\nIndicates an overflow error with <code>U256</code> numbers.\nIndicates that a FeedId is reocuring in data points.\nSignifies that an unsupported size was encountered.\nIndicates that the provided timestamp is not greater than …\nIndicates that a timestamp is further in the future than …\nUsed when a timestamp is older than allowed by the …\nIndicates that the marker bytes for RedStone are incorrect.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nImplementation of <code>RedstoneConfig</code> specialized for …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nImplementation of <code>RedstoneConfig</code> specialized for …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nPerforms lookup for repeated value in the slice.")