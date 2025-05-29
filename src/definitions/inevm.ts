import { inEVM as vinEVM } from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * inEVM Mainnet chain configuration
 * Extends viem's inEVM configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */

// settlement chain
const sourceId = 42_161 // Arbitrum One mainnet

export const inEVM: EcoChain = {
  ...vinEVM,
  rpcUrls: {
    ...vinEVM.rpcUrls,
    caldera: {
      http: ['https://inevm.calderachain.xyz/http'],
      webSocket: ['wss://inevm.calderachain.xyz/ws'],
    },
  },
  contracts: {
    ...vinEVM.contracts,
    hyperlaneMailbox: {
      address: '0x2f2aFaE1139Ce54feFC03593FeE8AB2aDF4a85A7',
    },
  },
  sourceId,
  isCalderaChain: true,
  stables: {
    USDC: '0x8358D8291e3bEDb04804975eEa0fe9fe0fAfB147',
    USDT: '0x97423A68BAe94b5De52d767a17aBCc54c157c0E5'
  }
}
