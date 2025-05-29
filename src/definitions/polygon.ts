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
  stables: {
    USDC: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    USDCe: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  }
}
