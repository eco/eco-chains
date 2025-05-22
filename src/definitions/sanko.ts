import { Chain } from 'viem'
import { sanko as vsanko } from 'viem/chains'

/**
 * Sanko Mainnet chain configuration
 * Extends viem's sanko configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */

// settlement chain
const sourceId = 42_161 // Arbitrum One mainnet

export const sanko: Chain = {
  ...vsanko,
  rpcUrls: {
    ...vsanko.rpcUrls,
    caldera: {
      http: [`TBD`],
      webSocket: [`TBD`],
    },
  },
  contracts: {
    ...vsanko.contracts,
    hyperlaneMailbox: {
      address: '0x2f2aFaE1139Ce54feFC03593FeE8AB2aDF4a85A7',
    },
  },
  sourceId,
}
