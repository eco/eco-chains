import { Chain } from 'viem'
import { arbitrum as varbitrum } from 'viem/chains'

export const arbitrum: Chain = {
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
}
