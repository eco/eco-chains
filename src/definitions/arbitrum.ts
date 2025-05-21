import { arbitrum as varbitrum } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const arbitrum: EcoChain = {
  ...varbitrum,
  rpcUrls: {
    ...varbitrum.rpcUrls,
    alchemy: {
      http: ['https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...varbitrum.contracts,
    hyperlaneMailbox: {
      address: '0x979Ca5202784112f4738403dBec5D0F3B9daabB9',
    },
  },
  isCalderaChain: false,
}
