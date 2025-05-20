import { Chain } from 'viem'
import { base as vbase, baseSepolia as vbases } from 'viem/chains'

/**
 * Base Mainnet chain configuration
 * Extends viem's base configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const base: Chain = {
  ...vbase,
  rpcUrls: {
    ...vbase.rpcUrls,
    alchemy: {
      http: ['https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vbase.contracts,
    hyperlaneMailbox: {
      address: '0xeA87ae93Fa0019a82A727bfd3eBd1cFCa8f64f1D',
    },
  },
}
/**
 * Base Sepolia testnet chain configuration
 * Extends viem's Base Sepolia configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration for the testnet
 */
export const baseSepolia: Chain = {
  ...vbases,
  rpcUrls: {
    ...vbases.rpcUrls,
    alchemy: {
      http: ['https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vbases.contracts,
    hyperlaneMailbox: {
      address: '0x6966b0E55883d49BFB24539356a2f8A673E02039',
    },
  },
}
