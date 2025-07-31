import { celo as vcelo } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const celo: EcoChain = {
  ...vcelo,
  rpcUrls: {
    ...vcelo.rpcUrls,
    quicknode: {
      http: [
        'https://cold-polished-violet.celo-mainnet.quiknode.pro/${QUICKNODE_API_KEY}',
      ],
      webSocket: [
        'wss://cold-polished-violet.celo-mainnet.quiknode.pro/${QUICKNODE_API_KEY}',
      ],
    },
  },
  contracts: {
    ...vcelo.contracts,
    hyperlaneMailbox: {
      address: '0x50da3B3907A08a24fe4999F4Dcf337E8dC7954bb',
    },
  },
  isCalderaChain: false,
  stables: {
    USDC: {
      address: '0xceba9300f2b948710d2653dd7b07f33a8b32118c',
      decimals: 6,
    },
    USDT: {
      address: '0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e',
      decimals: 6,
    },
  },
}
