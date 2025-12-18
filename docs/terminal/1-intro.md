# Intro

RedStone Terminal offers cryptocurrency exchange trade data across multiple exchanges from RedStone

Data is stored in parquet format and can be accessed through GUI or CLI

## GUI

In order to simple fetch single files go to:
https://terminal.redstone.finance/

## CLI

For faster and broader access of multiple files please use the CLI:
Coming soon...

## File description

### File Format

| Property              | Value          |
| --------------------- | -------------- |
| **File Format**       | Apache Parquet |
| **Format Version**    | 1.0            |
| **Number of Columns** | 8              |

### File Metadata

| #   | Column Name       | Data Type     | Description                                                      |
| --- | ----------------- | ------------- | ---------------------------------------------------------------- |
| 1   | `exchange`        | string        | Exchange identifier (e.g., "binance")                            |
| 2   | `symbol`          | string        | Trading pair symbol (e.g., "BNBUSDT")                            |
| 3   | `timestamp`       | timestamp[ms] | Exchange-reported trade timestamp in UTC (millisecond precision) |
| 4   | `local_timestamp` | timestamp[ms] | Local capture timestamp in UTC (millisecond precision)           |
| 5   | `id`              | string        | Unique trade identifier from the exchange                        |
| 6   | `side`            | string        | Trade side: "buy" or "sell"                                      |
| 7   | `price`           | double        | Trade execution price                                            |
| 8   | `amount`          | double        | Trade quantity/volume                                            |

### File Naming Convention

**Pattern:**

`{exchange}_trades_{date}_{symbol}.parquet`

**Components:**

- `{exchange}`: Exchange identifier (lowercase, e.g., "kucoin")
- `{date}` : ISO 8601 date format (YYYY-MM-DD)
- `{symbol}`: Trading pair (lowercase, e.g., "bnb_usdt")

**Examples:**

- `kucoin_trades_2025-06-04_bnb_usdt.parquet`
- `kucoin_trades_2025-06-05_btc_usdt.parquet`
