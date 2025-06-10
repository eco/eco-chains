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
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 332890,
    },
  },
  sourceId,
  isCalderaChain: true,
  stables: {
    USDC: '0xb73603C5d87fA094B7314C74ACE2e64D165016fb',
    USDT: '0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f',
  },
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
  stables: {
    USDC: '0x0652aEc2DeE0Fee9D05E614c95Ce8A01a7336cD8',
    USDT: '0xC040bB09ffF7EBb7FDf38831B7c582afddB2CcFE',
  },
}
