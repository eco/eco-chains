import { defineChain } from 'viem'
import { chainConfig } from 'viem/op-stack'

// settlement chain
const sourceId = 1 //Ethereum mainnet

export const appchain = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 466,
  name: 'Appchain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://appchain.calderachain.xyz/http'],
      webSocket: ['wss://appchain.calderachain.xyz/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Appchain explorer',
      url: 'https://explorer.appchain.xyz',
      apiUrl: 'https://explorer.appchain.xyz/api/v2',
    },
  },
  contracts: {
    ...chainConfig.contracts,
    hyperlaneMailbox: {
      address: '0x3a464f746D23Ab22155710f44dB16dcA53e0775E',
    },
  },
  sourceId,
})
