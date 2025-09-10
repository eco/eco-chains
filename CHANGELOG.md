## [2.0.1](https://github.com/eco/eco-chains/compare/v2.0.0...v2.0.1) (2025-09-10)


### Bug Fixes

* trigger semantic release… ([#94](https://github.com/eco/eco-chains/issues/94)) ([28374c8](https://github.com/eco/eco-chains/commit/28374c87f97fe39747feca18506fcb524d73f5f5))

# [2.0.0](https://github.com/eco/eco-chains/compare/v1.0.52...v2.0.0) (2025-08-27)


* Select default ([#91](https://github.com/eco/eco-chains/issues/91)) ([8cc608a](https://github.com/eco/eco-chains/commit/8cc608a709311de4ceff43c4686ed5d7876a95a5))


### BREAKING CHANGES

* Enhanced getRpcUrlsForChain to support custom provider selection

Features:
- preferredProviders: Array to specify provider priority (e.g., ['alchemy', 'infura'])
- useCustomOnly: Flag to disable fallback to default providers
- Maintains backward compatibility when no options specified

Usage:
// Prioritize Alchemy, then Infura, then fallback to defaults
getRpcUrlsForChain(8453, { preferredProviders: ['alchemy', 'infura'] })

// Use only custom providers, no default fallback
getRpcUrlsForChain(8453, { preferredProviders: ['alchemy'], useCustomOnly: true })

This allows fine-grained control over RPC endpoint selection and fallback behavior,
preventing rate-limited public endpoints from being used when private ones are available.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

* Bump version to 1.1.0 for breaking change

* fix: improve provider selection and RPC handling

- Add preferred provider selection functionality
- Filter out providers with empty RPCs
- Enhance custom RPC configuration

* fix: update changelog for manual 1.1.0 release

- Add 1.1.0 changelog entry with provider selection features
- Ensure semantic-release correctly calculates next version as 1.1.1

* fix: linter

# [1.1.0](https://github.com/eco/eco-chains/compare/v1.0.52...v1.1.0) (2025-08-27)


### Features

* add preferred provider selection for RPC URLs ([08a2c24](https://github.com/eco/eco-chains/commit/08a2c249f1b4c9e5f9c8e6f8e8b8e8b8e8b8e8b8))


### Bug Fixes

* improve provider selection and RPC handling ([61e8a6e](https://github.com/eco/eco-chains/commit/61e8a6e8f8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8))

## [1.0.52](https://github.com/eco/eco-chains/compare/v1.0.51...v1.0.52) (2025-08-25)


### Bug Fixes

* filter out providers with empty RPCs when setting custom field ([#90](https://github.com/eco/eco-chains/issues/90)) ([901e469](https://github.com/eco/eco-chains/commit/901e4698936d82baca938606c94073e3eff510b5))

## [1.0.51](https://github.com/eco/eco-chains/compare/v1.0.50...v1.0.51) (2025-08-21)


### Bug Fixes

* add multicall3 address ([a7dd7fb](https://github.com/eco/eco-chains/commit/a7dd7fbfa0cdcddfbe2c41860436c2aceb1c7a70))

## [1.0.50](https://github.com/eco/eco-chains/compare/v1.0.49...v1.0.50) (2025-08-21)


### Bug Fixes

* deploy 1.0.50 ([f99a36d](https://github.com/eco/eco-chains/commit/f99a36dd6c6df84ab561956c16fb9ea8e85fb389))

## [1.0.49](https://github.com/eco/eco-chains/compare/v1.0.48...v1.0.49) (2025-08-21)


### Bug Fixes

* adding plasma testnet to the build ([#87](https://github.com/eco/eco-chains/issues/87)) ([6f677f1](https://github.com/eco/eco-chains/commit/6f677f141de7f63a2368c3c6fcb880be0b599c6e))

## [1.0.48](https://github.com/eco/eco-chains/compare/v1.0.47...v1.0.48) (2025-08-11)


### Bug Fixes

* Adding infura rpc urls, removing quicknode ([#86](https://github.com/eco/eco-chains/issues/86)) ([51886c4](https://github.com/eco/eco-chains/commit/51886c46130c4986ad9365ded3ad3fb74541907c))

## [1.0.47](https://github.com/eco/eco-chains/compare/v1.0.46...v1.0.47) (2025-08-06)


### Bug Fixes

* release ([a596361](https://github.com/eco/eco-chains/commit/a596361caecc8f865710832fde0c2f9b8b3a1208))

## [1.0.46](https://github.com/eco/eco-chains/compare/v1.0.45...v1.0.46) (2025-07-31)


### Bug Fixes

* adding decimal info for the stables on each chain ([#83](https://github.com/eco/eco-chains/issues/83)) ([23b4d59](https://github.com/eco/eco-chains/commit/23b4d591552b626de439e15c0f70e98fa4008841))

## [1.0.45](https://github.com/eco/eco-chains/compare/v1.0.44...v1.0.45) (2025-07-18)


### Bug Fixes

* remove hyperevm ([1a3c742](https://github.com/eco/eco-chains/commit/1a3c742158a393530115ceb6619d62b32de4b5ae))

## [1.0.44](https://github.com/eco/eco-chains/compare/v1.0.43...v1.0.44) (2025-07-18)


### Bug Fixes

* add hyperevm and gas multiplier ([#81](https://github.com/eco/eco-chains/issues/81)) ([c964a8e](https://github.com/eco/eco-chains/commit/c964a8e566ec1d8db9c0aca932e09521bae394eb))

## [1.0.43](https://github.com/eco/eco-chains/compare/v1.0.42...v1.0.43) (2025-07-18)


### Bug Fixes

* trigger patch release for appchain meta updates ([7121f50](https://github.com/eco/eco-chains/commit/7121f50f46a0dbf9e3561e75a61ff6a5f4d43b33))

## [1.0.42](https://github.com/eco/eco-chains/compare/v1.0.41...v1.0.42) (2025-07-18)


### Bug Fixes

* changing appchain to a meta prover from hyperprover ([#79](https://github.com/eco/eco-chains/issues/79)) ([696f3d6](https://github.com/eco/eco-chains/commit/696f3d6190d18f7de6f666d9dc4c71f8be3d86ed))

## [1.0.41](https://github.com/eco/eco-chains/compare/v1.0.40...v1.0.41) (2025-07-10)


### Bug Fixes

* adding or updating alienx, worldchain, bsc, and sonic. removing the alienx sepolia as no hper or meta prover exists there ([#75](https://github.com/eco/eco-chains/issues/75)) ([2c992ac](https://github.com/eco/eco-chains/commit/2c992ac173b58756967bac9ad13aebd1815183a3))
* updating the chain.json file for new chains ([#76](https://github.com/eco/eco-chains/issues/76)) ([8866bc9](https://github.com/eco/eco-chains/commit/8866bc9be86e5836253ce277a2f4fc0c706aac25))

## [1.0.40](https://github.com/eco/eco-chains/compare/v1.0.39...v1.0.40) (2025-06-26)


### Bug Fixes

* Fix stables ([beb82af](https://github.com/eco/eco-chains/commit/beb82afffc928ce679d5e0215ae64ad8a9b45d1a))

## [1.0.39](https://github.com/eco/eco-chains/compare/v1.0.38...v1.0.39) (2025-06-23)


### Bug Fixes

* Monten native currency ([882fbbb](https://github.com/eco/eco-chains/commit/882fbbb1a336539f41f7df5a3f47dc243bc13c62))

## [1.0.38](https://github.com/eco/eco-chains/compare/v1.0.37...v1.0.38) (2025-06-13)


### Bug Fixes

* add Metalayer router Arb and Base ([8267e74](https://github.com/eco/eco-chains/commit/8267e747189afc2792e932d36f1b81284f174c7f))

## [1.0.37](https://github.com/eco/eco-chains/compare/v1.0.36...v1.0.37) (2025-06-13)


### Bug Fixes

* add Metalayer router to more chains ([cdcde7b](https://github.com/eco/eco-chains/commit/cdcde7ba743baa72991c8abd72f8c76ae26e605e))

## [1.0.36](https://github.com/eco/eco-chains/compare/v1.0.35...v1.0.36) (2025-06-10)


### Bug Fixes

* Add multicall3 contract to caldera chains ([1932c58](https://github.com/eco/eco-chains/commit/1932c587e70ac7ab849faf39d8a06e847415960c))

## [1.0.35](https://github.com/eco/eco-chains/compare/v1.0.34...v1.0.35) (2025-06-10)


### Bug Fixes

* AppChain multicall3 contract ([3d8a635](https://github.com/eco/eco-chains/commit/3d8a635705dc012afe507f8cbe4d4e195429315a))

## [1.0.34](https://github.com/eco/eco-chains/compare/v1.0.33...v1.0.34) (2025-06-10)


### Bug Fixes

* Renamed USDC to USDCe on ink ([f20bf74](https://github.com/eco/eco-chains/commit/f20bf74942b5ac122d7b94f93e5e77ec439f92bb))
* Renaming USDT to USDT0 on arbitrum ([3067b4c](https://github.com/eco/eco-chains/commit/3067b4c3eab02bb4ecced9d0120ab7f536ece269))

## [1.0.33](https://github.com/eco/eco-chains/compare/v1.0.32...v1.0.33) (2025-05-30)


### Bug Fixes

* prettier ([476b956](https://github.com/eco/eco-chains/commit/476b9566bb1e9f238fec2b1890e027e888d1f947))

## [1.0.32](https://github.com/eco/eco-chains/compare/v1.0.31...v1.0.32) (2025-05-23)


### Bug Fixes

* router address ([aba6814](https://github.com/eco/eco-chains/commit/aba6814b668e27ac656867ef07a889fc54072838))

## [1.0.31](https://github.com/eco/eco-chains/compare/v1.0.30...v1.0.31) (2025-05-23)

## [1.0.30](https://github.com/eco/eco-chains/compare/v1.0.29...v1.0.30) (2025-05-22)

## [1.0.29](https://github.com/eco/eco-chains/compare/v1.0.28...v1.0.29) (2025-05-22)


### Bug Fixes

* update deploy ([#58](https://github.com/eco/eco-chains/issues/58)) ([7c488d1](https://github.com/eco/eco-chains/commit/7c488d1011bbba81a20fc400e96afd55b3c3df75))

## [1.0.28](https://github.com/eco/eco-chains/compare/v1.0.27...v1.0.28) (2025-05-22)

## [1.0.27](https://github.com/eco/eco-chains/compare/v1.0.26...v1.0.27) (2025-05-22)


### Bug Fixes

* curtis wss url ([#54](https://github.com/eco/eco-chains/issues/54)) ([7e6da05](https://github.com/eco/eco-chains/commit/7e6da058503b49cb1a2045a39f5e335c86ef8ea2))

## [1.0.26](https://github.com/eco/eco-chains/compare/v1.0.25...v1.0.26) (2025-05-22)


### Bug Fixes

* the websocket connection for manta sepolia ([#53](https://github.com/eco/eco-chains/issues/53)) ([98831f3](https://github.com/eco/eco-chains/commit/98831f393da78e4d518c1a99e1263574be28a257))

## [1.0.25](https://github.com/eco/eco-chains/compare/v1.0.24...v1.0.25) (2025-05-22)


### Bug Fixes

* remove api key on websockets for matis and curtis ([#52](https://github.com/eco/eco-chains/issues/52)) ([83f7ae0](https://github.com/eco/eco-chains/commit/83f7ae0113158563fec19b18fe8c9c7e6df0e08e))

## [1.0.24](https://github.com/eco/eco-chains/compare/v1.0.23...v1.0.24) (2025-05-22)


### Bug Fixes

* fixing the worldchain alchemy url ([#51](https://github.com/eco/eco-chains/issues/51)) ([797da6a](https://github.com/eco/eco-chains/commit/797da6ab0c47e2dbea22e8f72f97c7d45a8d0578))

## [1.0.23](https://github.com/eco/eco-chains/compare/v1.0.22...v1.0.23) (2025-05-22)


### Bug Fixes

* add websocket definitions to chains ([#50](https://github.com/eco/eco-chains/issues/50)) ([d4353dc](https://github.com/eco/eco-chains/commit/d4353dc47e1be59e28696aa60e63f2f2b9030a1c))

## [1.0.22](https://github.com/eco/eco-chains/compare/v1.0.21...v1.0.22) (2025-05-22)


### Bug Fixes

* adding router contracts to ape, b3, and rari ([#49](https://github.com/eco/eco-chains/issues/49)) ([be675d2](https://github.com/eco/eco-chains/commit/be675d2a3b26380b899f659299d010eaffe4d15a))

## [1.0.21](https://github.com/eco/eco-chains/compare/v1.0.20...v1.0.21) (2025-05-22)

## [1.0.20](https://github.com/eco/eco-chains/compare/v1.0.19...v1.0.20) (2025-05-21)


### Bug Fixes

* update the muticall3 for curtis ([1c98051](https://github.com/eco/eco-chains/commit/1c98051c8e38dd7cc271cf4fec359caa486a02e1))

## [1.0.19](https://github.com/eco/eco-chains/compare/v1.0.18...v1.0.19) (2025-05-21)


### Bug Fixes

* extending Chain with new EcoChain type ([ae958d2](https://github.com/eco/eco-chains/commit/ae958d2968c2ced57e4a18bec1c716d626a3279b))

## [1.0.18](https://github.com/eco/eco-chains/compare/v1.0.17...v1.0.18) (2025-05-21)


### Bug Fixes

* adding the quicknode api key to the eco chains class ([ba306ee](https://github.com/eco/eco-chains/commit/ba306eee5d927518fcffa4ebf3c4b4c68c7e6bef))
* fixing url for celo ([931074a](https://github.com/eco/eco-chains/commit/931074a3bbb667c637a3317d8ad33b626edf16dc))

## [1.0.17](https://github.com/eco/eco-chains/compare/v1.0.16...v1.0.17) (2025-05-21)


### Bug Fixes

* Formatting, removing getChains ([f74de9b](https://github.com/eco/eco-chains/commit/f74de9bb3a8ac09d055e544716b91ea5dfc062ae))

## [1.0.16](https://github.com/eco/eco-chains/compare/v1.0.15...v1.0.16) (2025-05-20)


### Bug Fixes

* adding custom rpc if it is injected ([a96ecc5](https://github.com/eco/eco-chains/commit/a96ecc5fa144baec6d0ac1f54af5ecc22bddf2d8))

## [1.0.15](https://github.com/eco/eco-chains/compare/v1.0.14...v1.0.15) (2025-05-20)


### Bug Fixes

* export eco chains better ([d31aade](https://github.com/eco/eco-chains/commit/d31aade5648206c3dc73d10733014929f3d97dbf))

## [1.0.14](https://github.com/eco/eco-chains/compare/v1.0.13...v1.0.14) (2025-05-20)


### Bug Fixes

* force deploy ([4721d3f](https://github.com/eco/eco-chains/commit/4721d3f3ac7cb5ee68ddb0256f7f33b5bd88e348))

## [1.0.13](https://github.com/eco/eco-chains/compare/v1.0.12...v1.0.13) (2025-05-20)

## [1.0.12](https://github.com/eco/eco-chains/compare/v1.0.11...v1.0.12) (2025-05-15)


### Bug Fixes

* make chains an array with a second mapping by id ([fda1397](https://github.com/eco/eco-chains/commit/fda1397dc127be5f85b88e1ff60918de234a0890))

## [1.0.11](https://github.com/eco/eco-chains/compare/v1.0.10...v1.0.11) (2025-05-15)


### Bug Fixes

* adding unichain, celo, ink ([afb0d8d](https://github.com/eco/eco-chains/commit/afb0d8db82fc86a1a5d13636ddc525690bd034d4))

## [1.0.10](https://github.com/eco/eco-chains/compare/v1.0.9...v1.0.10) (2025-05-13)


### Bug Fixes

* make repo public ([9ed3c0f](https://github.com/eco/eco-chains/commit/9ed3c0f06d4f1a99708aad52789e88109fd30fb4))
