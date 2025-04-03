import { Chain } from 'viem'
import { base as vbase, baseSepolia as vbases } from 'viem/chains'

export const base: Chain = {
  ...vbase,
  rpcUrls: {
    ...vbase.rpcUrls,
    alchemy: {
      http: ['https://base-mainnet.g.alchemy.com/v2'],
    },
  },
  contracts: {
    ...vbase.contracts,
    hyperlaneMailbox: {
      address: '0xeA87ae93Fa0019a82A727bfd3eBd1cFCa8f64f1D',
    },
  },
}
export const baseSepolia: Chain = {
  ...vbases,
  rpcUrls: {
    ...vbases.rpcUrls,
    alchemy: {
      http: ['https://base-sepolia.g.alchemy.com/v2'],
    },
  },
  contracts: {
    ...vbases.contracts,
    hyperlaneMailbox: {
      address: '0x6966b0E55883d49BFB24539356a2f8A673E02039',
    },
  },
}
