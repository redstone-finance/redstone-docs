---
sidebar_label: "Live Feeds"
---

# Redstone Live Feeds

Best suited for dApps that require low-latency data.

## Connecting WebSocket API

Open a WebSocket connection and include your API key in the HTTP upgrade request header:

```bash
x-api-key: <your-api-key>
```

| Response          | Meaning                                                          |
| ----------------- | ---------------------------------------------------------------- |
| `HTTP 101`        | Connection accepted                                              |
| `HTTP 401 or 403` | Missing or invalid API key                                       |
| `HTTP 429`        | Per-key connection limit reached (max 30 concurrent connections) |

---

## Subscribing to feeds

After the connection is open, send a JSON text frame to subscribe or unsubscribe.
Multiple items can be batched in a single message.

```json
{ "op": "subscribe",   "items": [{ "feedId": "ETH", "type": "price",             "dataServiceId": "redstone-primary-prod" }] }
{ "op": "unsubscribe", "items": [{ "feedId": "ETH", "type": "price",             "dataServiceId": "redstone-primary-prod" }] }
{ "op": "subscribe",   "items": [{ "feedId": "ETH", "type": "redstonePackages",  "dataServiceId": "redstone-primary-prod" }] }
{ "op": "subscribe",   "items": [{ "feedId": "ETH", "type": "passthrough",       "dataServiceId": "redstone-primary-prod" }] }
```

| Field           | Type                                                 | Description                                                           |
| --------------- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| `feedId`        | `string`                                             | Feed identifier, e.g. `"ETH"`, `"BTC"`                                |
| `type`          | `"price"` \| `"redstonePackages"` \| `"passthrough"` | Subscription channel (see below)                                      |
| `dataServiceId` | `string`                                             | Data service identifier optional default is `"redstone-primary-prod"` |

> **Note:** subscribe and unsubscribe must use the exact same `type`, `dataServiceId`, and `feedId` to address the correct channel. Unsubscribing from `price` does not affect an active `redstonePackages` subscription for the same feed.

---

## Message types

### `price`

Delivers one lightweight aggregated tick which is median from quorum of signers.

```jsonc
{
  "type": "price",
  "dataServiceId": "redstone-primary-prod",
  "dataPackageId": "ETH",
  "timestamp": 1712345678000,
  "value": 2543.12,
}
```

| Field           | Type      | Description                                    |
| --------------- | --------- | ---------------------------------------------- |
| `type`          | `"price"` | Discriminant field                             |
| `dataServiceId` | `string`  | Data service identifier                        |
| `dataPackageId` | `string`  | Feed identifier                                |
| `timestamp`     | `number`  | Millisecond timestamp of the data round        |
| `value`         | `number`  | Median price across all merged signer payloads |

> Only published when at least one numeric data point is present in the merged payloads.

---

### `redstonePackages`

Delivers the raw signed oracle packages from quorum of signers.

- Payloads in a single batch are guaranteed to contain packages from **3 unique Redstone nodes** with the same timestamp.
- Whitelisted signer addresses: [initial-state.json](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/fcc49e9e7f3e5ef2fc0aa0c4b647e42e4f7e90f0/packages/sdk/src/registry/initial-state.json#L1)
- You can use this function [SignedDataPackage.fromObj()](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/fcc49e9e7f3e5ef2fc0aa0c4b647e42e4f7e90f0/packages/protocol/src/data-package/DataPackage.ts#L203C17-L203C24) from [package](https://www.npmjs.com/package/@redstone-finance/protocol) to recover signer address.
- Most feeds have exactly **1 element** in `dataPoints`. Only feeds prefixed with `__` can contain multiple data points.

**Recommended algorithm for safe consumption:**

1. Filter out packages with non-whitelisted signers or invalid signatures.
2. Check that the minimum signer count threshold is met.
3. Calculate the median across the verified packages.

```jsonc
{
  "type": "redstonePackages",
  "dataServiceId": "redstone-primary-prod",
  "payloads": [
    {
      "dataPackageId": "ETH",
      "timestampMilliseconds": 1712345678000,
      "dataPoints": [{ "dataFeedId": "ETH", "value": 2543.12 }],
      "signature": "<base64>",
    },
    // ... one entry per signer
  ],
}
```

| Field           | Type                                                                                                                                                                                              | Description                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `type`          | `"redstonePackages"`                                                                                                                                                                              | Discriminant field                   |
| `dataServiceId` | `string`                                                                                                                                                                                          | Data service identifier              |
| `payloads`      | [SignedDataPackagePlainObj[]](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/fcc49e9e7f3e5ef2fc0aa0c4b647e42e4f7e90f0/packages/protocol/src/data-package/DataPackage.ts#L141) | One signed package per merged signer |

---

### `passthrough`

Delivers each individual signer payload immediately, without waiting for a quorum threshold. Use this when you need the lowest possible latency and handle signer verification yourself.

```jsonc
{
  "dataPackageId": "ETH",
  "timestampMilliseconds": 1712345678000,
  "dataPoints": [{ "dataFeedId": "ETH", "value": 2543.12 }],
  "signature": "<base64>",
}
```

One [SignedDataPackagePlainObj](https://github.com/redstone-finance/redstone-oracles-monorepo/blob/fcc49e9e7f3e5ef2fc0aa0c4b647e42e4f7e90f0/packages/protocol/src/data-package/DataPackage.ts#L141) per signer, delivered as it arrives.

---

## Parsing messages

Use the `type` field to distinguish message kinds on the client side:

```ts
ws.on("message", (raw) => {
  const msg = JSON.parse(raw);
  if (msg.type === "price") {
    console.log(msg.dataPackageId, msg.value);
  } else if (msg.type === "redstonePackages") {
    console.log(msg.dataPackageId, msg.payloads.length, "signers");
  } else if (msg.dataPackageId) {
    console.log(msg.dataPackageId, msg.timestampMilliseconds, msg.signature);
  }
});
```

---

## Keepalive

The server sends a WebSocket **ping** frame after 120 seconds of inactivity.
Spec-compliant clients respond with a **pong** automatically — no application-level handling is required.
If no pong is received the server closes the connection with code `1001`. Reconnect and re-subscribe after that.

---

## Connection lifetime

Connections are forcibly closed after **8 hours** (code `1006`) regardless of activity.
Clients must handle this close event and reconnect.
