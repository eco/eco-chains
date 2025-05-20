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
  rpcUrls: {
    ...vmantaSepolia.rpcUrls,
    caldera: {
      http: [
        'http://pacific-rpc.sepolia-testnet.manta.network/${MANTA_API_KEY}',
      ],
    },
  },
  contracts: {
    ...vmantaSepolia.contracts,
    metalayerRouter: {
      address: '0x6f23b0211056035a22430a10fd27ded8547dc377',
    },
  },
}
