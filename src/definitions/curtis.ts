import { curtis as vcurtis } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const curtis: EcoChain = {
  ...vcurtis,
  rpcUrls: {
    ...vcurtis.rpcUrls,
    caldera: {
      http: ['https://curtis.rpc.caldera.xyz/${CURTIS_API_KEY}'],
      webSocket: ['wss://curtis.rpc.caldera.xyz/ws'],
    },
  },
  contracts: {
    ...vcurtis.contracts,
    metalayerRouter: {
      address: '0x6f23b0211056035a22430a10fd27ded8547dc377',
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 7290821,
    },
  },
  isCalderaChain: true,
}
