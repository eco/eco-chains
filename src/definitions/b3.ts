import { b3 as vb3 } from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * B3 Mainnet chain configuration
 * Extends viem's b3 configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const b3: EcoChain = {
  ...vb3,
  rpcUrls: {
    ...vb3.rpcUrls,
    caldera: {
      http: ['https://mainnet-rpc.b3.fun/http'],
      webSocket: ['wss://mainnet-rpc.b3.fun/ws'],
    },
  },
  contracts: {
    ...vb3.contracts,
    hyperlaneMailbox: {
      address: '0x3a867fCfFeC2B790970eeBDC9023E75B0a172aa7',
    },
  },
  isCalderaChain: true,
}
