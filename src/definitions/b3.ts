import { Chain } from 'viem'
import { b3 as vb3 } from 'viem/chains'

/**
 * B3 Mainnet chain configuration
 * Extends viem's b3 configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const b3: Chain = {
  ...vb3,
  rpcUrls: {
    default: {
      http: [`TBD`],
      webSocket: [`TBD`],
    },
  },
  contracts: {
    ...vb3.contracts,
    hyperlaneMailbox: {
      address: '0x3a867fCfFeC2B790970eeBDC9023E75B0a172aa7',
    },
  },
}
