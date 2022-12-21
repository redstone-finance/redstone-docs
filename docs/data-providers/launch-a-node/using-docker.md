---
sidebar_position: 1
sidebar_label: "Using Docker"
---

# 📦 Launch with Docker

Link to the Docker image: https://gallery.ecr.aws/y7v2w8b2/redstone-oracle-node

Configure your environment variables in the `.env` file using [this instruction.](../oracle-node-configuration)

Then, you can launch the RedStone oracle node using the following command:

```sh
docker run --env-file .env public.ecr.aws/y7v2w8b2/redstone-oracle-node:7d49220
```

<!-- ```sh
docker run --mount 'type=volume,src=oracle-node-lvl-db-volume,dst=/oracle-node-level-db' --env-file .env public.ecr.aws/y7v2w8b2/redstone-oracle-node:7d49220
``` -->
