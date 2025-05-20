import { Chain } from 'viem'
import { curtis as vcurtis } from 'viem/chains'

export const curtis: Chain = {
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
}
