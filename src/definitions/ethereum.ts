import { Chain } from 'viem'
import { mainnet as vmainnet, sepolia as vsepolia } from 'viem/chains'

export const ethereum: Chain = {
  ...vmainnet,
  rpcUrls: {
    ...vmainnet.rpcUrls,
    alchemy: {
      http: ['https://eth-mainnet.g.alchemy.com/v2'],
    },
  },
  contracts: {
    ...vmainnet.contracts,
    hyperlaneMailbox: {
      address: '0xc005dc82818d67AF737725bD4bf75435d065D239',
    },
  },
}

export const sepolia: Chain = {
  ...vsepolia,
  rpcUrls: {
    ...vsepolia.rpcUrls,
    alchemy: {
      http: ['https://eth-sepolia.g.alchemy.com/v2'],
    },
  },
  contracts: {
    ...vsepolia.contracts,
    hyperlaneMailbox: {
      address: '0xfFAEF09B3cd11D9b20d1a19bECca54EEC2884766',
    },
  },
}
