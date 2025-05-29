import {
  alienx as valienx,
  alienxHalTestnet as valienxHalTestnet,
} from 'viem/chains'
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
  },
  sourceId,
  isCalderaChain: true,
  stables: {
    USDC: '0x14B90E36Ca85D8B563430C0940E80d3A040285cC',
    USDT: '0x486bee264E0F6EB9A1d5947F5FCB097C5378c8E3',
  },
}

/**
 * AlienX Hal Testnet chain configuration
 * Extends viem's AlienX Hal Testnet configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration for the testnet
 */

// settlement chain
const testnetSourceId = 11155111 // Ethereum Sepolia

export const alienxHalTestnet: EcoChain = {
  ...valienxHalTestnet,
  rpcUrls: {
    ...valienxHalTestnet.rpcUrls,
    caldera: {
      http: ['https://hal.hub.caldera.xyz/'],
      webSocket: ['wss://hal.hub.caldera.xyz/ws'],
    },
  },
  contracts: {
    ...valienxHalTestnet.contracts,
    hyperlaneMailbox: {
      address: '0x0000000000000000000000000000000000000000', // TBD
    },
  },
  sourceId: testnetSourceId,
  isCalderaChain: true,
}

// TODO no hyperlane mailbox
