import { EcoChain } from '../chain.interface'
import { tron as vtron, tronShasta as vtronShasta } from 'viem/chains'

/**
 * Tron Mainnet chain configuration
 * Extends viem's Tron configuration with Eco-specific properties
 */
export const tron: EcoChain = {
  ...vtron,
  contracts: {
    ...vtron.contracts,
    layerZeroEndpointV2: {
      address: '0x0Af59750D5dB5460E5d89E268C474d5F7407c061',
      // TAy9xwjYjBBN6kutzrZJaAZJHCAejjK1V9
    },
  },
  isCalderaChain: false,
  stables: {
    USDT: {
      address: '0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C',
      // TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
      decimals: 6,
    },
  },
}

/**
 * Tron Shasta Testnet chain configuration
 * Extends viem's Tron Shasta configuration with Eco-specific properties
 */
export const tronShasta: EcoChain = {
  ...vtronShasta,
  contracts: {
    ...vtronShasta.contracts,
    layerZeroEndpointV2: {
      address: '0x1b356f3030CE0c1eF9D3e1E250Bf0BB11D81b2d1',
      // TCT5FvMTuUCspdY689LbKbUThCwBVUw4tM
    },
  },
  isCalderaChain: false,
}
