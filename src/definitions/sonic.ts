import { EcoChain } from '../chain.interface'
import { sonic as vsonic } from 'viem/chains'

/**
 * Sonic Mainnet chain configuration
 * Custom chain configuration for Sonic with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */

// settlement chain
const sourceId = 1 // Ethereum mainnet

export const sonic: EcoChain = {
  ...vsonic,
  rpcUrls: {
    ...vsonic.rpcUrls,
    alchemy: {
      http: ['https://sonic-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://sonic-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vsonic.contracts,
    hyperlaneMailbox: {
      address: '0x3a464f746D23Ab22155710f44dB16dcA53e0775E',
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1,
    },
  },
  sourceId,
  isCalderaChain: false,
  stables: {
    USDC: {
      address: '0x29219dd400f2Bf60E5a23d13Be72B486D4038894',
      decimals: 6,
    },
  },
}
