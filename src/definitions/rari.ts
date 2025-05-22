import { defineChain } from 'viem'
import { chainConfig } from 'viem/op-stack'

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
})
