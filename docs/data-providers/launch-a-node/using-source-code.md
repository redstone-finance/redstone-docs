---
sidebar_position: 2
sidebar_label: "Using Source Code"
---

# 👨‍💻 Launch from source code

- Clone https://github.com/redstone-finance/redstone-oracles-monorepo
- Install dependencies using `yarn install` command
- Go to the oracle-node folder using `cd packages/oracle-node` command
- Run `yarn build` (it will build Typescript to Javascript and put the output code to the `dist` folder)
- Configure environment variables using the .env file. Use [this instruction](../oracle-node-configuration)
- Run `yarn start:prod`
