import { defineChain } from 'viem'
import { EcoChain } from '../chain.interface'

export const townsSepolia = /*#__PURE__*/ defineChain({
  id: 6524490,
  name: 'Towns Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet.rpc.towns.com/http'],
      webSocket: ['wss://testnet.rpc.towns.com/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Towns Sepolia Explorer',
      url: 'https://testnet.explorer.towns.com/',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 23044881,
    },
  },
  testnet: true,
  isCalderaChain: true,
  stables: {
    USDC: {
      address: '0x9030B1b203D7F7aE07aa32a2eFbF5DEE7112FE30',
      decimals: 6,
    },
    USDT: {
      address: '0x8b4E19Adb6F4E92d92Dd19e8990d7d076404F3A8',
      decimals: 6,
    },
  },
}) as EcoChain
