import { curtis as vcurtis } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const curtis: EcoChain = {
  ...vcurtis,
  rpcUrls: {
    ...vcurtis.rpcUrls,
    caldera: {
      http: ['https://curtis.rpc.caldera.xyz/${CURTIS_API_KEY}'],
    },
  },
  contracts: {
    ...vcurtis.contracts,
    metalayerRouter: {
      address: '0x6f23b0211056035a22430a10fd27ded8547dc377',
    },
  },
  isCalderaChain: true,
}
