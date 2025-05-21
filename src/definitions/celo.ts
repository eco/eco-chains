import { celo as vcelo } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const celo: EcoChain = {
  ...vcelo,
  rpcUrls: {
    default: {
      http: [
        `https://responsive-lingering-yard.celo-mainnet.quiknode.pro/{QUICKNODE_API_KEY}`,
      ],
      webSocket: [
        `wss://responsive-lingering-yard.celo-mainnet.quiknode.pro/{QUICKNODE_API_KEY}`,
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
}
