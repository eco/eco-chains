import { Chain } from 'viem'
import { mantaSepoliaTestnet as vmantaSepolia } from 'viem/chains'

// export const manta: Chain = {
//   ...vmanta,
//   contracts: {
//     ...vmanta.contracts,
//     metalayerRouter: {
//       address: '0xeA87ae93Fa0019a82A727bfd3eBd1cFCa8f64f1D',
//     },
//   },
// }

export const mantaSepolia: Chain = {
  ...vmantaSepolia,
  contracts: {
    ...vmantaSepolia.contracts,
    metalayerRouter: {
      address: '0xC41de2A4243e4304813c36Cd8952366DCb36106a',
    },
  },
}
