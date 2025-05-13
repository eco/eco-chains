import { ecoSepolia } from './definitions/eco'
export * from './definitions/eco'
import { helix } from './definitions/helix'
export * from './definitions/helix'
import { optimism, optimismSepolia } from './definitions/optimism'
export * from './definitions/optimism'
import { base, baseSepolia } from './definitions/base'
export * from './definitions/base'
import { arbitrum } from './definitions/arbitrum'
export * from './definitions/arbitrum'
import { mantle } from './definitions/mantle'
export * from './definitions/mantle'
import { polygon } from './definitions/polygon'
export * from './definitions/polygon'
import { ethereum, sepolia } from './definitions/ethereum'
export * from './definitions/ethereum'
import { EcoChains } from './eco.chains'
import { manta, mantaSepoliaTestnet } from 'viem/chains'
export * from './eco.chains'
/**
 * Collection of all chain definitions supported by Eco
 * Used as the source for chain configurations in the EcoChains class
 * Each entry maps a chain name to its configuration
 */
export const EcoRoutesChainDefinitions = {
  ecoSepolia,
  helix,
  optimism,
  optimismSepolia,
  base,
  baseSepolia,
  arbitrum,
  mantle,
  polygon,
  ethereum,
  sepolia,
  manta,
  mantaSepoliaTestnet,
}

export default {
  EcoRoutesChainDefinitions: EcoRoutesChainDefinitions,
  EcoChains: EcoChains,
}
