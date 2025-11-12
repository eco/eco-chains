import { EcoChain } from '../chain.interface'
import { ronin as vronin } from 'viem/chains'

export const ronin: EcoChain = {
  ...vronin,
  id: 2020,
  rpcUrls: {
    ...vronin.rpcUrls,
    alchemy: {
      http: ['https://ronin-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://ronin-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    }
  },
  contracts: {
    ...vronin.contracts,
  },
  isCalderaChain: false,
  stables: {
    USDC: {
      address: '0x0b7007c13325c48911f73a2dad5fa5dcbf808adc',
      decimals: 6,
    },
  },
}
