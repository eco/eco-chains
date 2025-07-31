import { base as vbase, baseSepolia as vbases } from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * Base Mainnet chain configuration
 * Extends viem's base configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const base: EcoChain = {
  ...vbase,
  rpcUrls: {
    ...vbase.rpcUrls,
    alchemy: {
      http: ['https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vbase.contracts,
    hyperlaneMailbox: {
      address: '0xeA87ae93Fa0019a82A727bfd3eBd1cFCa8f64f1D',
    },
  },
  isCalderaChain: false,
  stables: {
    USDC: { address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6 },
    USDbC: { address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', decimals: 6 },
    oUSDT: { address: '0x1217bfe6c773eec6cc4a38b5dc45b92292b6e189', decimals: 6 },
  },
}
/**
 * Base Sepolia testnet chain configuration
 * Extends viem's Base Sepolia configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration for the testnet
 */
export const baseSepolia: EcoChain = {
  ...vbases,
  rpcUrls: {
    ...vbases.rpcUrls,
    alchemy: {
      http: ['https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://base-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vbases.contracts,
    hyperlaneMailbox: {
      address: '0x6966b0E55883d49BFB24539356a2f8A673E02039',
    },
  },
  isCalderaChain: false,
}
