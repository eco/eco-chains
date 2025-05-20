import { Chain } from 'viem'
import { optimism as vop, optimismSepolia as vops } from 'viem/chains'

export const optimism: Chain = {
  ...vop,
  rpcUrls: {
    ...vop.rpcUrls,
    alchemy: {
      http: ['https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vop.contracts,
    hyperlaneMailbox: {
      address: '0xd4C1905BB1D26BC93DAC913e13CaCC278CdCC80D',
    },
  },
}

export const optimismSepolia: Chain = {
  ...vops,
  rpcUrls: {
    ...vops.rpcUrls,
    alchemy: {
      http: ['https://opt-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vops.contracts,
    hyperlaneMailbox: {
      address: '0x6966b0E55883d49BFB24539356a2f8A673E02039',
    },
  },
}
