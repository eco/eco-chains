import { ink as vink } from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * Base Mainnet chain configuration
 * Extends viem's base configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const ink: EcoChain = {
  ...vink,
  rpcUrls: {
    ...vink.rpcUrls,
    alchemy: {
      http: ['https://ink-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://ink-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vink.contracts,
    hyperlaneMailbox: {
      address: '0x7f50C5776722630a0024fAE05fDe8b47571D7B39',
    },
  },
  isCalderaChain: false,
  stables: {
    USDCe: {
      address: '0xF1815bd50389c46847f0Bda824eC8da914045D14',
      decimals: 6,
    },
    USDT0: {
      address: '0x0200C29006150606B650577BBE7B6248F58470c1',
      decimals: 6,
    },
  },
}
