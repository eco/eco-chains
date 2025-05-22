import {
  manta as vmanta,
  mantaSepoliaTestnet as vmantaSepolia,
} from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * Manta Mainnet chain configuration
 * Extends viem's manta configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */

// settlement chain
const sourceId = 1 // Ethereum mainnet

export const manta: EcoChain = {
  ...vmanta,
  rpcUrls: {
    ...vmanta.rpcUrls,
    caldera: {
      http: ['https://manta-pacific.calderachain.xyz/http'],
      webSocket: ['wss://manta-pacific.calderachain.xyz/ws'],
    },
  },
  contracts: {
    ...vmanta.contracts,
    hyperlaneMailbox: {
      address: '0x3a464f746D23Ab22155710f44dB16dcA53e0775E',
    },
  },
  sourceId,
  isCalderaChain: true,
}

/**
 * Manta Sepolia testnet chain configuration
 * Extends viem's manta Sepolia configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration for the testnet
 */
// settlement chain
const testnetSourceId = 11155111 // Ethereum Sepolia

export const mantaSepolia: EcoChain = {
  ...vmantaSepolia,
  rpcUrls: {
    ...vmantaSepolia.rpcUrls,
    caldera: {
      http: [
        'http://pacific-rpc.sepolia-testnet.manta.network/${MANTA_API_KEY}',
      ],
      webSocket: ['wss://manta-sepolia.rpc.caldera.xyz/ws'],
    },
  },
  contracts: {
    ...vmantaSepolia.contracts,
    metalayerRouter: {
      address: '0x6f23b0211056035a22430a10fd27ded8547dc377',
    },
  },
  sourceId: testnetSourceId,
  isCalderaChain: true,
}
