import { EcoChain } from '../chain.interface'

/**
 * Monad Mainnet chain configuration
 * Self-contained definition (viem 2.37.8 predates the `monad` chain export)
 * with Eco-specific Alchemy RPC URLs and the Hyperlane Mailbox contract
 */
export const monad: EcoChain = {
  id: 143,
  name: 'Monad',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    alchemy: {
      http: ['https://monad-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://monad-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
    default: {
      http: ['https://rpc.monad.xyz'],
      webSocket: ['wss://rpc.monad.xyz'],
    },
    public: {
      http: ['https://rpc.monad.xyz', 'https://rpc1.monad.xyz'],
      webSocket: ['wss://rpc.monad.xyz', 'wss://rpc1.monad.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monadscan',
      url: 'https://monadscan.com',
      apiUrl: 'https://api.etherscan.io/v2/api?chainid=143',
    },
    monadvision: {
      name: 'MonadVision',
      url: 'https://monadvision.com',
    },
  },
  contracts: {
    hyperlaneMailbox: {
      address: '0x3a464f746D23Ab22155710f44dB16dcA53e0775E',
    },
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 9248132,
    },
  },
  testnet: false,
  isCalderaChain: false,
  stables: {
    USDC: {
      address: '0x754704Bc059F8C67012fEd69BC8A327a5aafb603',
      decimals: 6,
    },
  },
}
