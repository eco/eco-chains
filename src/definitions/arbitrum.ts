import { arbitrum as varbitrum } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const arbitrum: EcoChain = {
  ...varbitrum,
  rpcUrls: {
    ...varbitrum.rpcUrls,
    alchemy: {
      http: ['https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
    infura: {
      http: ['https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}'],
      webSocket: ['wss://arbitrum-mainnet.infura.io/ws/v3/${INFURA_API_KEY}'],
    },
  },
  contracts: {
    ...varbitrum.contracts,
    hyperlaneMailbox: {
      address: '0x979Ca5202784112f4738403dBec5D0F3B9daabB9',
    },
  },
  isCalderaChain: false,
  stables: {
    USDC: {
      address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
      decimals: 6,
    },
    USDCe: {
      address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      decimals: 6,
    },
    USDT0: {
      address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      decimals: 6,
    },
  },
}
