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

Releases are automated by semantic-release on every merge to `main`, but the final step is a
human approval. CI can queue a release; it can never ship one. npm removes direct publish from
granular access tokens in January 2027, and no CI credential (token or OIDC) can satisfy an
approval, by design. The promotion model mirrors
[eco/eco-api-schemas](https://github.com/eco/eco-api-schemas); the versioning stays automated.

The `Release` workflow (`.github/workflows/release.yaml`) runs `npx semantic-release`, which:

1. Determines the next version from the commit messages since the last tag
2. Updates `package.json` and generates the `CHANGELOG.md` entry, and commits both
   (`chore(release): x.y.z [skip ci]`)
3. Tags the commit `vx.y.z` and creates the GitHub Release
4. Runs `npm stage publish`, which uploads the tarball to npm in a **pending** state.
   The run summary and the GitHub Release body both say the version is staged, not published.

Then a maintainer with 2FA promotes it (needs npm >= 11.15.0 locally):

```bash
npm stage list @eco-foundation/chains
npm stage approve <stage-id>   # or: npm stage reject <stage-id>
```

Two staging rules: a staged version cannot be staged again until it is approved or rejected, and
the dist-tag is fixed once staged. A rejected version still has its tag and GitHub Release, and
semantic-release moves on from that tag, so reject rarely and fix forward with a new commit.

Versioning rules:

- Bug fixes (`fix:`, `perf:`) and `addChain:` commits trigger patch releases (0.0.x)
- New features (`feat:`) trigger minor releases (0.x.0)
- Breaking changes (`BREAKING CHANGE:` footer) trigger major releases (x.0.0)

**Secrets.** `GH_TOKEN` is the GitHub App token that pushes the release commit and tag and
creates the Release. `NPM_TOKEN` must be a granular access token scoped to
`@eco-foundation/chains` with **"Read and write (stage only)"** permission and no 2FA bypass:
`gh secret set NPM_TOKEN -R eco/eco-chains` (repo admin).

## Code Standards

- Follow TypeScript best practices with strict mode
- Use typia for runtime type validation
- Interface names are prefixed with "I" (e.g., `IChain`)
- Use custom tags for specialized validation (see `src/tags.ts`)
- Write comprehensive tests for new functionality

## Need Help?

If you have questions or need help, please open an issue or contact the maintainers.

Thank you for contributing to @eco-foundation/chains!
