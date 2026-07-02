import { defineChain } from 'viem'
import { EcoChain } from '../chain.interface'

/**
 * Circle Arc Testnet chain configuration
 * Custom chain configuration for Circle's Arc testnet with Eco-specific RPC URLs
 *
 * Arc uses USDC as its native gas token. Native gas accounting is 18 decimals,
 * while the USDC ERC-20 interface is 6 decimals.
 *
 * NOTE: Arc Mainnet (chain ID 5042) is intentionally NOT defined here yet.
 * The public mainnet RPC/USDC/CCTP addresses have not been published by Circle
 * (private mainnet only, pending details from Circle private docs — see PAR-26).
 * Shipping a mainnet definition without working RPCs would break downstream
 * consumers that enumerate getMainnetChains() (e.g. balances-service
 * auto-tracks every mainnet chain).
 * TODO: add `arc` mainnet (id 5042) once Circle publishes mainnet details.
 */

export const arcTestnet = /*#__PURE__*/ defineChain({
  id: 5042002,
  name: 'Arc Testnet',
  nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['https://arc-testnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://arc-testnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
    default: {
      http: ['https://rpc.testnet.arc.network'],
      webSocket: ['wss://rpc.testnet.arc.network'],
    },
    public: {
      http: [
        'https://rpc.testnet.arc.network',
        'https://rpc.quicknode.testnet.arc.network',
        'https://rpc.blockdaemon.testnet.arc.network',
        'https://rpc.drpc.testnet.arc.network',
      ],
      webSocket: [
        'wss://rpc.testnet.arc.network',
        'wss://rpc.quicknode.testnet.arc.network',
        'wss://rpc.drpc.testnet.arc.network',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'ArcScan',
      url: 'https://testnet.arcscan.app',
      apiUrl: 'https://testnet.arcscan.app/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 0,
    },
  },
  testnet: true,
  isCalderaChain: false,
  stables: {
    USDC: {
      address: '0x3600000000000000000000000000000000000000',
      decimals: 6,
    },
  },
}) as EcoChain
