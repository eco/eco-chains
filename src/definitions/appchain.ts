import { defineChain } from 'viem'
import { chainConfig } from 'viem/op-stack'
import { EcoChain } from '../chain.interface'

// settlement chain
const sourceId = 1 //Ethereum mainnet

export const appchain = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 466,
  name: 'Appchain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.appchain.xyz/http'],
      webSocket: ['wss://rpc.appchain.xyz/ws'],
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
    multicall3: {
      address: '0x2055A30B00555e7cAd48b1756eac4f917781489b',
      blockCreated: 423306,
    },
    hyperlaneMailbox: {
      address: '0x3a464f746D23Ab22155710f44dB16dcA53e0775E',
    },
  },
  sourceId,
  isCalderaChain: true,
  stables: {
    USDC: '0x675C3ce7F43b00045a4Dab954AF36160fb57cB45',
  },
}) as EcoChain
