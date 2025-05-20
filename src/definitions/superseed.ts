import { Chain } from 'viem'
import { superseed as vsuperseed } from 'viem/chains'

export const superseed: Chain = {
  ...vsuperseed,
  rpcUrls: {
    ...vsuperseed.rpcUrls,
    alchemy: {
      http: ['https://superseed-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vsuperseed.contracts,
    hyperlaneMailbox: {
      address: '0x3a464f746D23Ab22155710f44dB16dcA53e0775E',
    },
  },
}
