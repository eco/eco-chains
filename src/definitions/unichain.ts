import { unichain as vunichain } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const unichain: EcoChain = {
  ...vunichain,
  rpcUrls: {
    ...vunichain.rpcUrls,
    alchemy: {
      http: ['https://unichain-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  isCalderaChain: false,
}
