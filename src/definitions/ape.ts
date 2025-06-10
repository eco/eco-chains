import { apeChain as vape } from 'viem/chains'
import { EcoChain } from '../chain.interface'

/**
 * Apechain Mainnet chain configuration
 * Extends viem's apechain configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const ape: EcoChain = {
  ...vape,
  rpcUrls: {
    ...vape.rpcUrls,
    caldera: {
      http: ['https://rpc.apechain.com/http'],
      webSocket: ['wss://rpc.apechain.com/ws'],
    },
  },
  contracts: {
    ...vape.contracts,
    hyperlaneMailbox: {
      address: '0x7f50C5776722630a0024fAE05fDe8b47571D7B39',
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 20889,
    },
  },
  isCalderaChain: true,
  stables: {
    ApeUSD: '0xA2235d059F80e176D931Ef76b6C51953Eb3fBEf4',
    USDCe: '0xF1815bd50389c46847f0Bda824eC8da914045D14',
  },
}
