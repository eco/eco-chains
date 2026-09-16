import { EcoChain } from '../chain.interface'

/**
 * Robinhood Chain mainnet configuration.
 *
 * Robinhood Chain is an Arbitrum Nitro L2 that uses ETH for gas. The pinned
 * viem version predates this chain, so its definition is maintained here.
 * Network and token details are documented at https://docs.robinhood.com/chain/.
 */
export const robinhood: EcoChain = {
  id: 4663,
  name: 'Robinhood Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    alchemy: {
      http: ['https://robinhood-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: [
        'wss://robinhood-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
      ],
    },
    default: {
      http: ['https://rpc.mainnet.chain.robinhood.com'],
    },
    public: {
      http: ['https://rpc.mainnet.chain.robinhood.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Robinhood Chain Explorer',
      url: 'https://robinhoodchain.blockscout.com',
    },
  },
  contracts: {
    hyperlaneMailbox: {
      address: '0x3a867fCfFeC2B790970eeBDC9023E75B0a172aa7',
    },
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 0,
    },
  },
  sourceId: 1,
  testnet: false,
  isCalderaChain: false,
  stables: {
    USDG: {
      address: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',
      decimals: 6,
    },
  },
}
