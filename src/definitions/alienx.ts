import { alienx as valienx } from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * AlienX Mainnet chain configuration
 * Extends viem's AlienX configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */

// settlement chain
const sourceId = 1 // Ethereum mainnet

export const alienx: EcoChain = {
  ...valienx,
  rpcUrls: {
    ...valienx.rpcUrls,
    caldera: {
      http: ['https://rpc.alienxchain.io/http'],
      webSocket: ['wss://rpc.alienxchain.io/ws'],
    },
  },
  contracts: {
    ...valienx.contracts,
    hyperlaneMailbox: {
      address: '0x0000000000000000000000000000000000000000', // TBD
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 2060950,
    },
    metalayerRouter: {
      address: '0x09ce71c24ee2098e351c0cf2dc6431b414d247f3',
    },
    metalayerProver: {
      address: '0x3d529eFAEDb3B999A404c1B8543441aE616cB914',
    },
  },
  sourceId,
  isCalderaChain: true,
  stables: {
    USDC: {
      address: '0x14B90E36Ca85D8B563430C0940E80d3A040285cC',
      decimals: 6,
    },
    USDT: {
      address: '0x486bee264E0F6EB9A1d5947F5FCB097C5378c8E3',
      decimals: 6,
    },
  },
}
