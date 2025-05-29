import { superseed as vsuperseed } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const superseed: EcoChain = {
  ...vsuperseed,
  rpcUrls: {
    ...vsuperseed.rpcUrls,
    alchemy: {
      http: ['https://superseed-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: [
        'wss://superseed-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
      ],
    },
  },
  contracts: {
    ...vsuperseed.contracts,
    hyperlaneMailbox: {
      address: '0x3a464f746D23Ab22155710f44dB16dcA53e0775E',
    },
  },
  isCalderaChain: false,
  stables: {
    USDC: '0xC316C8252B5F2176d0135Ebb0999E99296998F2e',
    oUSDT: '0x1217BfE6c773EEC6cc4A38b5Dc45B92292B6E189',
  }
}
