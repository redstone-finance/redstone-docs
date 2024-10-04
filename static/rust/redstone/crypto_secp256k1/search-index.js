var searchIndex = new Map(JSON.parse('[\
["redstone",{"t":"CCCQQCCCCCCCIHHHFNONNONNNNONONNNNNNHHFNNNNNNNONNNONKMMMMCCHCHHICCCCCCCCKKMMKRKHMHMPPPKPGPPPPPPPNNNNNMNNNNNNMNNNNNNKMKKMMFNNNCNNNNNNNIRIKISTRRNNNHMHMCCCCCSSSSSSSSSSSFNNNNNONNNNOONHHNNNNFNNNNNNONNNNHHNNNONHFNNNNNONNNNNHHNNNNCCCCKMKKRKMHMKMKM","n":["core","crypto","network","print_and_panic","print_debug","protocol","utils","aggregator","config","processor","processor_result","validator","Matrix","aggregate_matrix","aggregate_values","make_value_signer_matrix","Config","assert_or_revert","block_timestamp","borrow","borrow_mut","feed_ids","feed_index","fmt","from","into","signer_count_threshold","signer_index","signers","try_from","try_into","type_id","validate_signer_count_threshold","validate_timestamp","vzip","make_processor_result","process_payload","ProcessorResult","assert_or_revert","borrow","borrow_mut","eq","fmt","from","into","min_timestamp","try_from","try_into","type_id","values","vzip","Validator","feed_index","signer_index","validate_signer_count_threshold","validate_timestamp","keccak256","recover","keccak256","crypto256","recover_address","recover_public_key","_Network","as_str","assert","error","flattened","from_bytes_repr","print_debug","pure","specific","AsAsciiStr","AsHexStr","as_ascii_str","as_hex_str","Assert","ErrorArg","Unwrap","assert_or_revert","assert_or_revert","assert_or_revert_bool_with","unwrap_or_revert","ArrayIsEmpty","ClonedContractError","ContractError","ContractErrorContent","CryptographicError","Error","InsufficientSignerCount","NonEmptyPayloadRemainder","NumberOverflow","SizeNotSupported","TimestampTooFuture","TimestampTooOld","WrongRedStoneMarker","assert_or_revert","borrow","borrow_mut","clone","clone_into","code","code","contract_error","fmt","fmt","from","into","message","to_owned","to_string","try_from","try_into","type_id","vzip","Flattened","flattened","FromBytesRepr","Sanitized","from_bytes_repr","sanitized","Std","borrow","borrow_mut","from","from_bytes_repr","into","print","revert","try_from","try_into","type_id","vzip","Bytes","BytesRepr","Network","NetworkSpecific","U256","VALUE_SIZE","VALUE_SIZE","ValueRepr","_Self","as_ascii_str","as_hex_str","from_bytes_repr","print","print","revert","revert","constants","data_package","data_point","marker","payload","DATA_FEED_ID_BS","DATA_PACKAGES_COUNT_BS","DATA_POINTS_COUNT_BS","DATA_POINT_VALUE_BYTE_SIZE_BS","MAX_TIMESTAMP_AHEAD_MS","MAX_TIMESTAMP_DELAY_MS","REDSTONE_MARKER","REDSTONE_MARKER_BS","SIGNATURE_BS","TIMESTAMP_BS","UNSIGNED_METADATA_BYTE_SIZE_BS","DataPackage","assert_or_revert","borrow","borrow_mut","clone","clone_into","data_points","eq","fmt","from","into","signer_address","timestamp","to_owned","trim_data_package","trim_data_packages","try_from","try_into","type_id","vzip","DataPoint","assert_or_revert","borrow","borrow_mut","clone","clone_into","eq","feed_id","fmt","from","into","to_owned","trim_data_point","trim_data_points","try_from","try_into","type_id","value","vzip","trim_redstone_marker","Payload","assert_or_revert","borrow","borrow_mut","clone","clone_into","data_packages","fmt","from","into","make","to_owned","trim_metadata","trim_payload","try_from","try_into","type_id","vzip","filter","median","trim","trim_zeros","FilterSome","filter_some","Averageable","Avg","Item","Median","avg","maybe_pick_median","median","Trim","trim_end","TrimZeros","trim_zeros"],"q":[[0,"redstone"],[7,"redstone::core"],[12,"redstone::core::aggregator"],[16,"redstone::core::config"],[35,"redstone::core::processor"],[37,"redstone::core::processor_result"],[51,"redstone::core::validator"],[56,"redstone::crypto"],[58,"redstone::crypto::keccak256"],[59,"redstone::crypto::recover"],[61,"redstone::crypto::recover::crypto256"],[62,"redstone::network"],[71,"redstone::network::as_str"],[75,"redstone::network::assert"],[82,"redstone::network::error"],[114,"redstone::network::flattened"],[116,"redstone::network::from_bytes_repr"],[120,"redstone::network::pure"],[132,"redstone::network::specific"],[148,"redstone::protocol"],[153,"redstone::protocol::constants"],[164,"redstone::protocol::data_package"],[184,"redstone::protocol::data_point"],[203,"redstone::protocol::marker"],[204,"redstone::protocol::payload"],[222,"redstone::utils"],[226,"redstone::utils::filter"],[228,"redstone::utils::median"],[235,"redstone::utils::trim"],[237,"redstone::utils::trim_zeros"],[239,"core::option"],[240,"alloc::vec"],[241,"core::ops::function"],[242,"core::fmt"],[243,"core::result"],[244,"core::any"],[245,"alloc::boxed"],[246,"alloc::string"],[247,"core::cmp"]],"i":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,20,20,20,20,20,20,20,20,20,20,20,20,20,0,23,23,23,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,27,0,33,0,0,30,0,33,8,8,8,0,8,0,8,8,8,8,8,8,8,8,8,8,8,8,34,8,8,8,8,8,8,34,8,8,8,8,8,8,0,36,0,0,37,38,0,48,48,48,0,48,48,48,48,48,48,48,0,49,0,0,0,0,49,49,49,1,1,1,0,49,0,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0,5,5,5,5,0,40,40,40,40,40,40,40,40,40,40,40,0,0,40,40,40,40,40,0,0,19,19,19,19,19,19,19,19,19,19,19,0,0,19,19,19,19,0,0,0,0,0,41,0,0,45,0,42,0,45,0,46,0,47],"f":"`````````````{{{f{{f{{d{b}}}}}}h}{{f{b}}}}{{h{f{j}}}{{f{b}}}}{{{l{h}}{f{j}}}{{f{{f{{d{b}}}}}}}}`{{cei}g{}{}{}{{Ab{{l{g}}}{{n{A`}}}}}}`{{{l{c}}}{{l{e}}}{}{}}{{{l{Adc}}}{{l{Ade}}}{}{}}`{{{l{h}}b}{{d{Af}}}}{{{l{h}}{l{AdAh}}}Aj}{cc{}}{ce{}{}}`{{{l{h}}{l{{An{Al}}}}}{{d{Af}}}}`{c{{B`{e}}}{}{}}0{{{l{c}}}Bb{}}{{{l{h}}Af{l{{An{{d{b}}}}}}}{{f{b}}}}{{{l{h}}AfBd}Bd}5{{hBf}Bh}{{hBj}Bh}`=<;{{{l{Bh}}{l{Bh}}}Bl}{{{l{Bh}}{l{AdAh}}}Aj}:9`776`9`{{{l{Bn}}b}{{d{Af}}}}{{{l{Bn}}{l{{An{Al}}}}}{{d{Af}}}}{{{l{Bn}}Af{l{{An{{d{b}}}}}}}{{f{b}}}}{{{l{Bn}}AfBd}Bd}``{{{l{{An{Al}}}}}{{C`{{An{Al}}}}}}`{{{f{Al}}{f{Al}}}{{f{Al}}}}{{{C`{{An{Al}}}}{l{{An{Al}}}}Al}{{C`{{An{Al}}}}}}```````````{{{l{Cb}}}Cd}{{{l{Cf}}}Cd}```{{ceg}cCh{{Cj{{l{c}}}{{n{Bl}}}}}{{Ab{{l{c}}}{{n{A`}}}}}}{{Clce}Cl{}{{Cj{{l{Cl}}}{{n{A`}}}}}}{{Blc}Cn{{Ab{}{{n{A`}}}}}}{{{Db{}{{D`{c}}}}e}g{}{{Cj{{l{c}}}{{n{A`}}}}}{}}`````````````{{cei}g{}{}{}{{Ab{{l{g}}}{{n{A`}}}}}}{{{l{c}}}{{l{e}}}{}{}}{{{l{Adc}}}{{l{Ade}}}{}{}}{{{l{A`}}}A`}{{{l{c}}{l{Ade}}}Cn{}{}}{{{l{Dd}}}Al}{{{l{A`}}}Df}{cA`Dd}{{{l{A`}}{l{AdAh}}}Aj}0{cc{}}{ce{}{}}{{{l{Dd}}}Cd}{{{l{c}}}e{}{}}{{{l{c}}}Cd{}}{c{{B`{e}}}{}{}}0{{{l{c}}}Bb{}}5`{{{l{Dh}}}c{}}``{cDj{}}{DlDl}`{{{l{c}}}{{l{e}}}{}{}}{{{l{Adc}}}{{l{Ade}}}{}{}};`:{CdCn}{A`Dn}887<`````````{{{l{b}}}Cd}0{{{f{Al}}}b}3322`````````````````{{cei}g{}{}{}{{Ab{{l{g}}}{{n{A`}}}}}}65{{{l{j}}}j}{{{l{c}}{l{Ade}}}Cn{}{}}`{{{l{j}}{l{j}}}Bl}{{{l{j}}{l{AdAh}}}Aj}{cc{}}{ce{}{}}``{{{l{c}}}e{}{}}{{{l{Ad{f{Al}}}}}j}{{{l{Ad{f{Al}}}}Af}{{f{j}}}}{c{{B`{e}}}{}{}}0{{{l{c}}}Bb{}}5`;{{{l{c}}}{{l{e}}}{}{}}{{{l{Adc}}}{{l{Ade}}}{}{}}{{{l{E`}}}E`}<{{{l{E`}}{l{E`}}}Bl}`{{{l{E`}}{l{AdAh}}}Aj};:9{{{l{Ad{f{Al}}}}Af}E`}{{{l{Ad{f{Al}}}}AfAf}{{f{E`}}}}887`<{{{l{Ad{f{Al}}}}}Cn}`{{cei}g{}{}{}{{Ab{{l{g}}}{{n{A`}}}}}}87{{{l{Bf}}}Bf}{{{l{c}}{l{Ade}}}Cn{}{}}`{{{l{Bf}}{l{AdAh}}}Aj}{cc{}}{ce{}{}}{{{l{Ad{f{Al}}}}}Bf}{{{l{c}}}e{}{}}{{{l{Ad{f{Al}}}}}Af}2{c{{B`{e}}}{}{}}0{{{l{c}}}Bb{}}5`````{{{l{Eb}}}c{}}````{{EdEd}Ed}{{ccc}{{d{c}}}Ef}{{{Ej{}{{Eh{c}}}}}c{}}`{{{l{AdEl}}Af}c{}}`{EnEn}","D":"Ed","p":[[8,"U256",132],[6,"Option",239],[5,"Vec",240],[5,"Config",16],[5,"DataPackage",164],[1,"reference"],[17,"Output"],[6,"Error",82],[10,"FnOnce",241],[0,"mut"],[1,"usize"],[5,"Formatter",242],[8,"Result",242],[1,"u8"],[1,"slice"],[6,"Result",243],[5,"TypeId",244],[1,"u64"],[5,"Payload",204],[5,"ProcessorResult",37],[8,"Bytes",132],[1,"bool"],[10,"Validator",51],[5,"Box",245],[10,"AsAsciiStr",71],[5,"String",246],[10,"AsHexStr",71],[10,"Debug",242],[10,"Fn",241],[10,"Assert",75],[1,"unit"],[17,"ErrorArg"],[10,"Unwrap",75],[10,"ContractErrorContent",82],[1,"u16"],[10,"Flattened",114],[10,"FromBytesRepr",116],[10,"Sanitized",116],[1,"never"],[5,"DataPoint",184],[10,"FilterSome",226],[10,"Avg",228],[10,"PartialOrd",247],[17,"Item"],[10,"Median",228],[10,"Trim",235],[10,"TrimZeros",237],[5,"Std",120],[10,"NetworkSpecific",132]],"r":[],"b":[[103,"impl-Display-for-Error"],[104,"impl-Debug-for-Error"]],"c":"OjAAAAAAAAA=","e":"OzAAAAEAAMUAEwABAA0AEAAAABIAAAAUAAEAFwABABwAAAAeAAYAJwAEAC8AAgAzAAAAOQAZAFYAAABgAAkAbAAPAH0AAAB/AC4AsAARAMQAEADXABgA"}]\
]'));
if (typeof exports !== 'undefined') exports.searchIndex = searchIndex;
else if (window.initSearch) window.initSearch(searchIndex);