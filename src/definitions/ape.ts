import { Chain } from 'viem'
import { apeChain as vape } from 'viem/chains'

/**
 * Apechain Mainnet chain configuration
 * Extends viem's apechain configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const ape: Chain = {
  ...vape,
  rpcUrls: {
    ...vape.rpcUrls,
    caldera: {
      http: [`TBD`],
      webSocket: [`TBD`],
    },
  },
  contracts: {
    ...vape.contracts,
    hyperlaneMailbox: {
      address: '0x7f50C5776722630a0024fAE05fDe8b47571D7B39',
    },
  },
}
