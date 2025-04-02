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
export * from './eco.chains'
/**
 * Chains that Eco supports
 */
export const EcoChainDefinitions = {
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
}

export default {
  EcoChainDefinitions,
  EcoChains: EcoChains,
}
