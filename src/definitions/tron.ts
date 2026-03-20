import { EcoChain } from '../chain.interface'
import { tron as vtron } from 'viem/chains'

/**
 * Tron Mainnet chain configuration
 * Extends viem's Tron configuration with Eco-specific properties
 */
export const tron: EcoChain = {
  ...vtron,
  contracts: {
    ...vtron.contracts,
  },
  isCalderaChain: false,
}
