import { mantle as vmantle } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const mantle: EcoChain = {
  ...vmantle,
  rpcUrls: {
    ...vmantle.rpcUrls,
    alchemy: {
      http: ['https://mantle-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://mantle-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vmantle.contracts,
    hyperlaneMailbox: {
      address: '0x398633D19f4371e1DB5a8EFE90468eB70B1176AA',
    },
  },
  isCalderaChain: false,
  stables: {
    USDC: { address: '0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9', decimals: 6 },
    USDT: { address: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE', decimals: 6 },
  },
}
