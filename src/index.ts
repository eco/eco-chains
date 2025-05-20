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
  curtis,
} from './definitions/index'
import { EcoChains } from './eco.chains'

/**
 * Collection of all chain definitions supported by Eco
 * Used as the source for chain configurations in the EcoChains class
 * Each entry maps a chain name to its configuration
 */
export const EcoRoutesChains = [
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
  curtis,
  unichain,
  helix,
  celo,
  ink,
  ecoSepolia,
]

export const EcoRouteChainMap = EcoRoutesChains.reduce(
  (acc, chain) => {
    acc[chain.id] = chain
    return acc
  },
  {} as Record<number, any>,
)

export * from './eco.chains'

export default {
  EcoRoutesChains,
  EcoRouteChainMap,
  EcoChains,
}
