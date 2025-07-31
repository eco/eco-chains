import { curtis as vcurtis } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const curtis: EcoChain = {
  ...vcurtis,
  rpcUrls: {
    ...vcurtis.rpcUrls,
    caldera: {
      http: ['https://curtis.rpc.caldera.xyz/${CURTIS_API_KEY}'],
      webSocket: ['wss://curtis.rpc.caldera.xyz/ws'],
    },
  },
  contracts: {
    ...vcurtis.contracts,
    metalayerRouter: {
      address: '0x6f23b0211056035a22430a10fd27ded8547dc377',
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 7290821,
    },
    metalayerProver: {
      address: '0x3d529eFAEDb3B999A404c1B8543441aE616cB914',
    },
  },
  isCalderaChain: true,
  stables: {
    USDC: { address: '0xE0356B8aD7811dC3e4d61cFD6ac7653e0D31b096', decimals: 6 },
  },
}
