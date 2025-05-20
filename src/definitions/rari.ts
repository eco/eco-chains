import { defineChain } from 'viem'
import { chainConfig } from 'viem/op-stack'

// settlement chain
const sourceId = 1 // Ethereum mainnet

export const rari = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 1380012617,
  name: 'Rari',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.rpc.rarichain.org/http'],
      webSocket: ['wss://mainnet.rpc.rarichain.org/ws'],
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
