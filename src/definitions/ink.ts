import { Chain, ink as vink } from 'viem/chains'

/**
 * Base Mainnet chain configuration
 * Extends viem's base configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const ink: Chain = {
  ...vink,
  rpcUrls: {
    ...vink.rpcUrls,
    alchemy: {
      http: ['https://ink-mainnet.g.alchemy.com/v2'],
    },
  },
  contracts: {
    ...vink.contracts,
    hyperlaneMailbox: {
      address: '0x7f50C5776722630a0024fAE05fDe8b47571D7B39',
    },
  },
}
