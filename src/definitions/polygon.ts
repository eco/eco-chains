import { Chain } from 'viem'
import { polygon as vpolygon } from 'viem/chains'

export const polygon: Chain = {
  ...vpolygon,
  rpcUrls: {
    ...vpolygon.rpcUrls,
    alchemy: {
      http: ['https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vpolygon.contracts,
    hyperlaneMailbox: {
      address: '0x5d934f4e2f797775e53561bB72aca21ba36B96BB',
    },
  },
}
