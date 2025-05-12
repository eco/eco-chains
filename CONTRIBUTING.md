# Contributing to @eco-foundation/chains

Thank you for your interest in contributing to @eco-foundation/chains! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork and clone the repository
2. Install dependencies with `pnpm install`
3. Build the project with `pnpm build`
4. Run tests with `pnpm test`

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes following the coding standards
3. Add tests for your changes
4. Ensure all tests pass with `pnpm test`
5. Verify code quality with `pnpm lint`
6. Commit your changes using the conventional commit format
7. Push your branch and open a Pull Request

## Commit Message Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to automate version management and package releases. Your commit messages should follow this format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

The type must be one of the following:

- **feat**: A new feature (triggers a minor version increment)
- **fix**: A bug fix (triggers a patch version increment)
- **docs**: Documentation changes
- **style**: Changes that don't affect the code's meaning (formatting, etc.)
- **refactor**: Code changes that neither fix a bug nor add a feature
- **perf**: Performance improvements (triggers a patch version increment)
- **test**: Adding or correcting tests
- **chore**: Changes to the build process or auxiliary tools
- **breaking**: Breaking changes (triggers a major version increment; include "BREAKING CHANGE:" in the commit message body)

### Examples

```
feat(definitions): add Ethereum Sepolia chain definition
```

```
fix(validator): resolve issue with WSS URL validation
```

```
docs: update README with new API examples
```

```
feat(api): add new chain selection method

BREAKING CHANGE: The previous method `getChain()` has been removed. Use `selectChain()` instead.
```

## Adding New Chains

When adding a new blockchain to the eco-chains library:

1. Create a new file in `src/definitions/` following the naming convention
2. Implement the chain definition using viem's `defineChain` utility
3. Make sure to include proper RPC URLs, block explorers, and contract addresses
4. Add the chain to the exports in `src/index.ts`
5. Add tests for the new chain in `src/tests/`
6. Update documentation to include the new chain

## Release Process

Releases are automated through GitHub Actions when changes are merged to the `main` branch. The release workflow:

1. Determines the next version based on commit messages
2. Updates the package.json version
3. Generates a changelog
4. Creates a GitHub release
5. Publishes the package to npm

To ensure correct versioning:

- Bug fixes trigger patch releases (0.0.x)
- New features trigger minor releases (0.x.0)
- Breaking changes trigger major releases (x.0.0)

## Code Standards

- Follow TypeScript best practices with strict mode
- Use typia for runtime type validation
- Interface names are prefixed with "I" (e.g., `IChain`)
- Use custom tags for specialized validation (see `src/tags.ts`)
- Write comprehensive tests for new functionality

## Need Help?

If you have questions or need help, please open an issue or contact the maintainers.

Thank you for contributing to @eco-foundation/chains!
