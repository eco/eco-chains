# CLAUDE.project.md - Eco-Chains Repository Guide

## Project Overview

This repository contains `@eco-foundation/eco-chains`, a TypeScript library that provides chain definitions for various blockchain networks, with a focus on Eco ecosystem support. The library extends viem's chain interfaces and provides utilities for managing RPC connections with API key replacements.

## Repository Structure

- `/src`: Source code
  - `/definitions`: Chain definition files for supported chains
  - `/tests`: Test files with Jest specs
  - `chain.interface.ts`: Core interface definitions
  - `eco.chains.ts`: Main EcoChains class implementation
  - `validator.ts`: Chain validation utilities
  - `tags.ts`: Custom type validators
  - `index.ts`: Main export point

## Technology Stack

- **TypeScript**: Strong typing with strict mode
- **typia**: Runtime type checking and validation
- **viem**: Ethereum/EVM chain interfaces and utilities
- **Jest**: Testing framework
- **pnpm**: Package manager
- **ESLint/Prettier**: Code linting and formatting

## Development Commands

### Package Management

- Install dependencies: `pnpm install`
- Add dependency: `pnpm add [package]`
- Add dev dependency: `pnpm add -D [package]`

### Build & Test

- Clean build artifacts: `pnpm clean`
- Build project: `pnpm build`
- Run all tests: `pnpm test`
- Run specific test: `pnpm test src/tests/filename.spec.ts`

### Code Quality

- Run linter: `pnpm lint`
- Fix linting issues: `pnpm lint:fix`
- Check formatting: `pnpm format:check`
- Format code: `pnpm format`
- Format and fix all: `pnpm run format`

## Code Guidelines & Patterns

### TypeScript & Type Usage

- Use strict mode with explicit typing
- Use `typia` for runtime type validation
- Interface names are prefixed with "I" (e.g., `IChain`)
- Use custom tags for specialized validation (see `tags.ts`)

### Naming Conventions

- `camelCase` for variables and functions
- `PascalCase` for classes, interfaces, and types
- `PascalCase` with "I" prefix for interfaces

### Import/Export Pattern

- Group related imports
- Use absolute imports where possible
- Export from definition files (index.ts re-exports them)
- Import specific functions/types rather than entire modules

### Chain Implementation Pattern

- Follow viem's Chain interface pattern
- Extend with custom properties when needed
- Use defineChain from viem for consistency
- Validate chain definitions with the validator utility

### Testing Pattern

- Write Jest tests for each component
- Use mock functions where appropriate
- Use descriptive test names following "it should..." pattern
- Group related tests in describe blocks

## Key Components

### Chain Interface (chain.interface.ts)

- Extends viem's Chain interface
- Defines required properties for chain definitions
- Uses typia tags for validation

### EcoChains Class (eco.chains.ts)

- Provides chain management functionality
- Handles API key replacements in RPC URLs
- Supports configurable provider endpoints

### Chain Definitions (definitions/\*.ts)

- Implements specific chain configurations
- Uses viem's defineChain utility
- Includes RPC URLs, block explorers, and contracts

### Custom Validators (tags.ts)

- Defines custom type validators
- Implements WebsocketTag for validating WebSocket URLs

## ESLint Rules & Restrictions

- No console statements (ESLint rule: no-console)
- Max 1 empty line between blocks
- Focused tests are flagged as errors
- camelCase naming is enforced (with some exceptions)

## Best Practices

1. Always validate chain definitions using the validator
2. Follow the existing pattern for implementing new chains
3. Write comprehensive tests for new functionality
4. Use typia for runtime type checking
5. Keep chain definitions up-to-date with the latest chain configurations
6. Maintain backward compatibility when making changes
7. Document public APIs and interfaces

## Publishing Process

The package is published to npm as `@eco-foundation/eco-chains`. Publishing is handled through the build process in the CI/CD pipeline.

## Contribution Guidelines

1. Create a feature branch from main
2. Make changes following the code guidelines
3. Ensure all tests pass
4. Ensure linting and formatting are correct
5. Submit a pull request with a descriptive title and description
