import {
  arbitrum,
  base,
  baseSepolia,
  celo,
  ecoSepolia,
  ethereum,
  sepolia,
  helix,
  ink,
  mantaSepolia,
  mantle,
  optimism,
  optimismSepolia,
  polygon,
  unichain,
} from './definitions/index'
import { EcoChains } from './eco.chains'

/**
 * Collection of all chain definitions supported by Eco
 * Used as the source for chain configurations in the EcoChains class
 * Each entry maps a chain name to its configuration
 */
export const EcoRoutesChainDefinitions = {
  ecoSepolia,
  optimism,
  optimismSepolia,
  base,
  baseSepolia,
  arbitrum,
  mantle,
  polygon,
  ethereum,
  sepolia,
  mantaSepolia,
  unichain,
  helix,
  celo,
  ink,
}

export default {
  EcoRoutesChainDefinitions: EcoRoutesChainDefinitions,
  EcoChains: EcoChains,
}
