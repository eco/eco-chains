import { optimism as vop, optimismSepolia as vops } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const optimism: EcoChain = {
  ...vop,
  rpcUrls: {
    ...vop.rpcUrls,
    alchemy: {
      http: ['https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vop.contracts,
    hyperlaneMailbox: {
      address: '0xd4C1905BB1D26BC93DAC913e13CaCC278CdCC80D',
    },
  },
  isCalderaChain: false,
  stables: {
    USDC: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
    USDCe: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    oUSDT: '0x1217bfe6c773eec6cc4a38b5dc45b92292b6e189',
  },
}

export const optimismSepolia: EcoChain = {
  ...vops,
  rpcUrls: {
    ...vops.rpcUrls,
    alchemy: {
      http: ['https://opt-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://opt-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...vops.contracts,
    hyperlaneMailbox: {
      address: '0x6966b0E55883d49BFB24539356a2f8A673E02039',
    },
  },
  isCalderaChain: false,
  stables: {},
}
