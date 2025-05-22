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
      http: [`TBD`],
      webSocket: [`TBD`],
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
}
