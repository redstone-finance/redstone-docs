# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RedStone Documentation site built with Docusaurus 3. RedStone is a blockchain oracle protocol providing data feeds for decentralized applications.

## Commands

```bash
yarn install        # Install dependencies (uses Yarn 4 via corepack)
yarn start          # Start development server with hot reload
yarn build          # Build static site to /build directory
yarn lint           # Run prettier and markdownlint checks
yarn lint:fix       # Auto-fix lint issues
yarn clear          # Clear Docusaurus cache
```

## Architecture

- **docs/** - Markdown documentation files, auto-organized into sidebar via `_category_.json` files
- **src/theme/Footer/** - Custom swizzled footer component
- **src/css/custom.css** - Global style overrides (RedStone branding colors)
- **src/pages/index.js** - Home page redirect to /docs/introduction
- **docusaurus.config.js** - Main config (navbar, footer links, Algolia search, plugins)
- **sidebars.js** - Auto-generates sidebar from docs folder structure

## Documentation Structure

Each docs section uses `_category_.json` for sidebar ordering and labels. Key sections:
- `dapps/` - Integration guides for dApp developers
- `data-providers/` - Running data provider nodes
- `avs/` - AVS operator documentation
- `redstone-credora/` - Credora rating system docs
- `security/` - Audits and security info
- `token/` - RED token information

## Linting

CI runs `yarn lint` on every push. Markdown files must pass:
- Prettier formatting
- markdownlint rules (see `.markdownlint.json` for disabled rules)

## Code Highlighting

Prism supports: `bash`, `solidity`, `rust`, `toml` (configured in docusaurus.config.js)
