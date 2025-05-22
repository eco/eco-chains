import { mainnet as vmainnet, sepolia as vsepolia } from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * Ethereum Mainnet chain configuration
 * Extends viem's mainnet configuration with Eco-specific RPC URLs and contract addresses
 */
export const ethereum: EcoChain = {
  ...vmainnet,
  rpcUrls: {
    ...vmainnet.rpcUrls,
    alchemy: {
      http: ['https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vmainnet.contracts,
    hyperlaneMailbox: {
      address: '0xc005dc82818d67AF737725bD4bf75435d065D239',
    },
  },
  isCalderaChain: false,
}

/**
 * Ethereum Sepolia testnet chain configuration
 * Extends viem's Sepolia configuration with Eco-specific RPC URLs and contract addresses
 */
export const sepolia: EcoChain = {
  ...vsepolia,
  rpcUrls: {
    ...vsepolia.rpcUrls,
    alchemy: {
      http: ['https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vsepolia.contracts,
    hyperlaneMailbox: {
      address: '0xfFAEF09B3cd11D9b20d1a19bECca54EEC2884766',
    },
  },
  isCalderaChain: false,
}
