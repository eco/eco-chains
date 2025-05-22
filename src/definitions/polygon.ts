import { polygon as vpolygon } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const polygon: EcoChain = {
  ...vpolygon,
  rpcUrls: {
    ...vpolygon.rpcUrls,
    alchemy: {
      http: ['https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vpolygon.contracts,
    hyperlaneMailbox: {
      address: '0x5d934f4e2f797775e53561bB72aca21ba36B96BB',
    },
  },
  isCalderaChain: false,
}
