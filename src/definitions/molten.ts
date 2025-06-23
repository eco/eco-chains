import { defineChain } from 'viem'
import { chainConfig } from 'viem/op-stack'
import { EcoChain } from '../chain.interface'

// settlement chain
const sourceId = 42_161 // Arbitrum One

export const molten = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 360,
  name: 'Molten',
  nativeCurrency: { name: 'MOLTEN', symbol: 'MOLTEN', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://molten.calderachain.xyz/http'],
      webSocket: ['wss://molten.calderachain.xyz/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Molten explorer',
      url: 'https://molten.calderaexplorer.xyz',
      apiUrl: 'https://molten.calderaexplorer.xyz/api/v2',
    },
  },
  contracts: {
    ...chainConfig.contracts,
    hyperlaneMailbox: {
      address: '0x4E55aDA3ef1942049EA43E904EB01F4A0a9c39bd',
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 23655689,
    },
  },
  sourceId,
  isCalderaChain: true,
  stables: {
    USDC: '0xDf0195C990a94006869959a9c77add160164207e',
  },
}) as EcoChain
