import {
  alienx,
  ape,
  appchain,
  arbitrum,
  b3,
  base,
  baseSepolia,
  celo,
  curtis,
  ecoSepolia,
  ethereum,
  form,
  formTestnet,
  helix,
  hyperevm,
  inEVM,
  ink,
  manta,
  mantaSepolia,
  mantle,
  molten,
  optimism,
  optimismSepolia,
  plasmaMainnet,
  plasmaTestnet,
  polygon,
  rari,
  sonic,
  sanko,
  sankoSepolia,
  sepolia,
  superseed,
  townsSepolia,
  unichain,
  worldchain,
} from './definitions/index'
import { EcoChains } from './eco.chains'
import { EcoChain } from './chain.interface'

/**
 * Collection of all chain definitions supported by Eco
 * Used as the source for chain configurations in the EcoChains class
 * Each entry maps a chain name to its configuration
 */
export const EcoRoutesChains = [
  alienx,
  ape,
  appchain,
  arbitrum,
  b3,
  base,
  baseSepolia,
  celo,
  curtis,
  ecoSepolia,
  ethereum,
  form,
  formTestnet,
  helix,
  hyperevm,
  inEVM,
  ink,
  manta,
  mantaSepolia,
  mantle,
  molten,
  optimism,
  optimismSepolia,
  plasmaMainnet,
  plasmaTestnet,
  polygon,
  rari,
  sanko,
  sankoSepolia,
  sepolia,
  sonic,
  superseed,
  townsSepolia,
  unichain,
  worldchain,
] as EcoChain[]

export const EcoRouteChainMap = EcoRoutesChains.reduce(
  (acc, chain) => {
    acc[chain.id] = chain
    return acc
  },
  {} as Record<number, EcoChain>,
)

export * from './eco.chains'

export type { EcoChain }
export default {
  EcoRoutesChains,
  EcoRouteChainMap,
  EcoChains,
}
