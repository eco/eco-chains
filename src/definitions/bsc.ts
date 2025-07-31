import { bsc as vbsc } from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * BSC (BNB Smart Chain) Mainnet chain configuration
 * Extends viem's BSC configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */

// settlement chain
const sourceId = 1 // Ethereum mainnet

export const bsc: EcoChain = {
  ...vbsc,
  rpcUrls: {
    ...vbsc.rpcUrls,
    alchemy: {
      http: ['https://bnb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://bnb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vbsc.contracts,
    hyperlaneMailbox: {
      address: '0x2971b9Aec44bE4eb673DF1B88cDB57b96eefe8a4',
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 15921452,
    },
  },
  sourceId,
  isCalderaChain: false,
  stables: {
    USDC: {
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      decimals: 6,
    },
    USDT: {
      address: '0x55d398326f99059fF775485246999027B3197955',
      decimals: 6,
    },
  },
}
