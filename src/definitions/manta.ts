import { Chain } from 'viem'
import {
  manta as vmanta,
  mantaSepoliaTestnet as vmantaSepolia,
} from 'viem/chains'

/**
 * Manta Mainnet chain configuration
 * Extends viem's manta configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const manta: Chain = {
  ...vmanta,
  rpcUrls: {
    default: {
      http: [`TBD`],
      webSocket: [`TBD`],
    },
  },
  contracts: {
    ...vmanta.contracts,
    hyperlaneMailbox: {
      address: '0x3a464f746D23Ab22155710f44dB16dcA53e0775E',
    },
  },
}

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
