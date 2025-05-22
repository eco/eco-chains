import { worldchain as vworldchain } from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * Worldchain Mainnet chain configuration
 * Extends viem's worldchain configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const worldchain: EcoChain = {
  ...vworldchain,
  rpcUrls: {
    ...vworldchain.rpcUrls,
    alchemy: {
      http: ['https://worldchain-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: [
        'wss://worldchain-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
      ],
    },
  },
  contracts: {
    ...vworldchain.contracts,
    hyperlaneMailbox: {
      address: '0x2f2aFaE1139Ce54feFC03593FeE8AB2aDF4a85A7',
    },
  },
  isCalderaChain: false,
}
