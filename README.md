# @eco-foundation/chains

A TypeScript library that provides chain definitions for various blockchain networks, with a focus on Eco ecosystem support. The library extends viem's chain interfaces and provides utilities for managing RPC connections with API key replacements.

## Installation

```bash
# Using pnpm
pnpm add @eco-foundation/chains

# Using yarn
yarn add @eco-foundation/chains

# Using npm
npm install @eco-foundation/chains
```

## Usage

```typescript
import { EcoChains, ethereum, eco } from '@eco-foundation/chains'

// Initialize EcoChains with API keys
const chains = new EcoChains({
  infuraKey: 'your-infura-key',
  alchemyKey: 'your-alchemy-key',
})

// Get a specific chain with updated RPC URLs
const ethereumChain = chains.getChain(ethereum)

// Access chain properties
console.log(ethereumChain.id) // Chain ID
console.log(ethereumChain.name) // Chain name
console.log(ethereumChain.rpcUrls) // RPC endpoints with API keys inserted
```

## Available Chains

- `arbitrum` - Arbitrum One
- `base` - Base
- `eco` - Eco Chain
- `ethereum` - Ethereum Mainnet
- `goerli` - Ethereum Goerli Testnet
- `helix` - Helix
- `mantle` - Mantle
- `optimism` - Optimism
- `polygon` - Polygon

## Features

- Extends viem's Chain interface
- Supports API key replacements in RPC URLs
- Includes WebSocket endpoints with validation
- Provides comprehensive chain metadata
- Type-safe with TypeScript and runtime validation

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test
```

### Quality Assurance

```bash
# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix

# Check formatting
pnpm format:check

# Format code
pnpm format
```

## Versioning and Releases

This project uses [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/): `fix:`/`perf:`/`addChain:` commits cut a patch, `feat:` a minor, `BREAKING CHANGE:` a major.

On every merge to `main`, semantic-release computes the version, updates `CHANGELOG.md` and `package.json`, tags `vX.Y.Z`, creates the GitHub Release, and **stages** the package on npm with `npm stage publish`. Staged is not published: nobody can install it until a maintainer approves it with a 2FA challenge (npm >= 11.15.0 locally):

```bash
npm stage list @eco-foundation/chains
npm stage approve <stage-id>   # or: npm stage reject <stage-id>
```

See [CONTRIBUTING.md](./CONTRIBUTING.md#release-process) for the full flow and the token setup.

## License

MIT
