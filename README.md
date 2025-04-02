# @eco-foundation/eco-chains

A TypeScript library that provides chain definitions for various blockchain networks, with a focus on Eco ecosystem support. The library extends viem's chain interfaces and provides utilities for managing RPC connections with API key replacements.

## Installation

```bash
# Using npm
npm install @eco-foundation/eco-chains

# Using yarn
yarn add @eco-foundation/eco-chains

# Using pnpm
pnpm add @eco-foundation/eco-chains
```

## Usage

```typescript
import { EcoChains, ethereum, eco } from '@eco-foundation/eco-chains'

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

This project uses [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/) to automate version management and package releases.

Releases are automatically created when changes are merged to the `main` branch. The version number is determined by the commit messages:

- `fix:` or `perf:` commits trigger patch releases (0.0.x)
- `feat:` commits trigger minor releases (0.x.0)
- Commits with `BREAKING CHANGE:` in the message trigger major releases (x.0.0)

For more details on contributing, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
