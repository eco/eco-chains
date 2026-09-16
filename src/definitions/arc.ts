import { EcoChain } from '../chain.interface'

/**
 * Arc mainnet chain configuration (Circle's USDC-native L1)
 * Self-contained definition (the pinned viem predates the `arc` chain export)
 * with Eco-specific Alchemy RPC URLs and the Hyperlane Mailbox contract.
 *
 * Gas is paid in USDC with 18-decimal native accounting; the ERC-20 USDC
 * tracked as a stable is the 6-decimal token at 0x3600...0000.
 *
 * Verified on-chain against https://rpc.mainnet.arc.io (2026-09-16):
 * - chain id 5042
 * - USDC 0x3600000000000000000000000000000000000000 (symbol USDC, decimals 6)
 * - Hyperlane Mailbox 0x7f50C5776722630a0024fAE05fDe8b47571D7B39 (localDomain 5042, VERSION 3)
 * - Multicall3 0xcA11bde05977b3631167028862bE2a173976CA11 (genesis predeploy, code at block 0)
 *
 * RPC endpoints from https://docs.arc.network/arc/references/connect-to-arc.
 */
export const arc: EcoChain = {
  id: 5042,
  name: 'Arc',
  nativeCurrency: {
    decimals: 18,
    name: 'USDC',
    symbol: 'USDC',
  },
  rpcUrls: {
    alchemy: {
      http: ['https://arc-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://arc-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
    default: {
      http: ['https://rpc.mainnet.arc.io'],
    },
    public: {
      http: [
        'https://rpc.mainnet.arc.io',
        'https://rpc.drpc.mainnet.arc.io',
        'https://rpc.blockdaemon.mainnet.arc.io',
        'https://rpc.quicknode.mainnet.arc.io',
      ],
      webSocket: [
        'wss://rpc.quicknode.mainnet.arc.io',
        'wss://rpc.blockdaemon.mainnet.arc.io/websocket',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arc Explorer',
      url: 'https://explorer.arc.io',
    },
  },
  contracts: {
    hyperlaneMailbox: {
      address: '0x7f50C5776722630a0024fAE05fDe8b47571D7B39',
    },
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 0,
    },
  },
  testnet: false,
  isCalderaChain: false,
  stables: {
    USDC: {
      address: '0x3600000000000000000000000000000000000000',
      decimals: 6,
    },
  },
}
