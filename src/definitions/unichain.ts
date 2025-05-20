import { Chain } from 'viem'
import { unichain as vunichain } from 'viem/chains'

export const unichain: Chain = {
  ...vunichain,
  rpcUrls: {
    ...vunichain.rpcUrls,
    alchemy: {
      http: ['https://unichain-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
}
