import { Chain } from 'viem'
import { mantle as vmantle } from 'viem/chains'

export const mantle: Chain = {
  ...vmantle,
  rpcUrls: {
    ...vmantle.rpcUrls,
    alchemy: {
      http: ['https://mantle-mainnet.g.alchemy.com/v2'],
    },
  },
  contracts: {
    ...vmantle.contracts,
    hyperlaneMailbox: {
      address: '0x398633D19f4371e1DB5a8EFE90468eB70B1176AA',
    },
  },
}
