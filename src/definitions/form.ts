import { form as vform, formTestnet as vformTestnet } from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * Form Mainnet chain configuration
 * Extends viem's form configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const form: EcoChain = {
  ...vform,
  rpcUrls: {
    ...vform.rpcUrls,
    caldera: {
      http: ['https://rpc.form.network/http'],
      webSocket: ['wss://rpc.form.network/ws'],
    },
  },
  contracts: {
    ...vform.contracts,
    hyperlaneMailbox: {
      address: '0x3a464f746D23Ab22155710f44dB16dcA53e0775E',
    },
  },
  isCalderaChain: true,
}

/**
 * Form Sepolia testnet chain configuration
 * Extends viem's Form Sepolia configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration for the testnet
 */
export const formTestnet: EcoChain = {
  ...vformTestnet,
  rpcUrls: {
    ...vformTestnet.rpcUrls,
    caldera: {
      http: ['https://rpc.form.network/http'],
      webSocket: ['wss://rpc.form.network/ws'],
    },
  },
  contracts: {
    ...vformTestnet.contracts,
    hyperlaneMailbox: {
      address: '0xDDcFEcF17586D08A5740B7D91735fcCE3dfe3eeD',
    },
  },
  isCalderaChain: true,
  stables: {
    USDC: '0xFBf489bb4783D4B1B2e7D07ba39873Fb8068507D',
    USDT: '0xFA3198ecF05303a6d96E57a45E6c815055D255b1'
  }
}
