import { mantle as vmantle } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const mantle: EcoChain = {
  ...vmantle,
  rpcUrls: {
    ...vmantle.rpcUrls,
    alchemy: {
      http: ['https://mantle-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vmantle.contracts,
    hyperlaneMailbox: {
      address: '0x398633D19f4371e1DB5a8EFE90468eB70B1176AA',
    },
  },
  isCalderaChain: false,
}
