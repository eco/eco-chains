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
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 19070571,
    },
  },
  isCalderaChain: false,
  stables: {
    USDC: '0x79A02482A880bCE3F13e09Da970dC34db4CD24d1',
  },
}
