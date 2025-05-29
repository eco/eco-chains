import { sanko as vsanko } from 'viem/chains'
import { EcoChain } from '../chain.interface'
import { defineChain } from 'viem'

/**
 * Sanko Mainnet chain configuration
 * Extends viem's sanko configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */

// settlement chain
const sourceId = 42_161 // Arbitrum One mainnet

export const sanko: EcoChain = {
  ...vsanko,
  rpcUrls: {
    ...vsanko.rpcUrls,
    caldera: {
      http: ['https://sanko-mainnet.calderachain.xyz/http'],
      webSocket: ['wss://sanko-mainnet.calderachain.xyz/ws'],
    },
  },
  contracts: {
    ...vsanko.contracts,
    hyperlaneMailbox: {
      address: '0x2f2aFaE1139Ce54feFC03593FeE8AB2aDF4a85A7',
    },
  },
  sourceId,
  isCalderaChain: true,
  stables: {
    USDC: '0x13D675BC5e659b11CFA331594cF35A20815dCF02',
  },
}

export const sankoSepolia = /*#__PURE__*/ defineChain({
  id: 1992,
  name: 'Sanko Sepolia',
  nativeCurrency: { name: 'tDMT', symbol: 'tDMT', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://sanko-arb-sepolia.rpc.caldera.xyz/http'],
      webSocket: ['wss://sanko-arb-sepolia.rpc.caldera.xyz/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Sanko Sepolia Explorer',
      url: 'https://sanko-arb-sepolia.explorer.caldera.xyz/',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 3767,
    },
  },
  testnet: true,
  isCalderaChain: true,
  stables: {
    USDC: '0xC38944D590A3B6E796dE242680259CB1dEcba077',
    USDT: '0xa7ace557347F8b7fc72250e6bc0Abc47dc7902E5',
  },
}) as EcoChain
