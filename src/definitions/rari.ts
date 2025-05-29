import { defineChain } from 'viem'
import { chainConfig } from 'viem/op-stack'
import { EcoChain } from '../chain.interface'

// settlement chain
const sourceId = 42_161 // Arbitrum One mainnet

export const rari = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 1380012617,
  name: 'Rari',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rari.calderachain.xyz/http'],
      webSocket: ['wss://rari.calderachain.xyz/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Rari explorer',
      url: 'https://rari.calderaexplorer.xyz',
      apiUrl: 'https://rari.calderaexplorer.xyz/api/v2',
    },
  },
  contracts: {
    ...chainConfig.contracts,
    hyperlaneMailbox: {
      address: '0x65dCf8F6b3f6a0ECEdf3d0bdCB036AEa47A1d615',
    },
  },
  sourceId,
  isCalderaChain: true,
  stables: {
    USDC: '0x46B991aCbD9290967a3A9e02f14895c2F9FE809A',
    USDT: '0x362FAE9A75B27BBc550aAc28a7c1F96C8D483120',
    USDCe: '0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6',
  },
}) as EcoChain
