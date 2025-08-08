import { unichain as vunichain } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const unichain: EcoChain = {
  ...vunichain,
  rpcUrls: {
    ...vunichain.rpcUrls,
    alchemy: {
      http: ['https://unichain-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://unichain-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
    infura: {
      http: ['https://unichain-mainnet.infura.io/v3/${INFURA_API_KEY}'],
    },
  },
  isCalderaChain: false,
  stables: {
    USDC: {
      address: '0x078D782b760474a361dDA0AF3839290b0EF57AD6',
      decimals: 6,
    },
    USDT0: {
      address: '0x9151434b16b9763660705744891fa906f660ecc5',
      decimals: 6,
    },
  },
}
