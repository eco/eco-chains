import { Chain } from 'viem'
import { celo as vcelo } from 'viem/chains'

export const celo: Chain = {
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
}
