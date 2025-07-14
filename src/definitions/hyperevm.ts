import { EcoChain } from '../chain.interface'

/**
 * HyperEVM Mainnet chain configuration
 * Custom chain configuration for Hyperliquid's HyperEVM with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */

// settlement chain
const sourceId = 1 // Ethereum mainnet

export const hyperevm: EcoChain = {
  id: 999,
  name: 'HyperEVM',
  nativeCurrency: {
    decimals: 18,
    name: 'HYPE',
    symbol: 'HYPE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.hyperliquid.xyz/evm'],
    },
    public: {
      http: [
        'https://rpc.hyperliquid.xyz/evm',
        'http://rpc.hypurrscan.io',
        'https://hyperliquid-json-rpc.stakely.io',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'HyperEVM Scan',
      url: 'https://hyperevmscan.io',
    },
    parsec: {
      name: 'Parsec',
      url: 'https://purrsec.com',
    },
    blockscout: {
      name: 'HyperScan',
      url: 'https://www.hyperscan.com',
    },
  },
  contracts: {
    hyperlaneMailbox: {
      address: '0x3a464f746D23Ab22155710f44dB16dcA53e0775E',
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1,
    },
  },
  sourceId,
  isCalderaChain: false,
  stables: {
    USDT0: '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb'
  },
}
