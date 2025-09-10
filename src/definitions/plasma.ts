import { defineChain } from 'viem'
import { plasmaTestnet as viemPlasmaTestnet } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const plasmaTestnet = /*#__PURE__*/ defineChain({
  ...viemPlasmaTestnet,
  blockExplorers: {
    ...viemPlasmaTestnet.blockExplorers,
    default: {
      name: 'PlasmaTestnet Explorer',
      url: 'https://testnet.plasmascan.to',
    },
  },
  contracts: {
    ...viemPlasmaTestnet.contracts,
    hyperlaneMailbox: {
      address: '0x443E56B776F5c8aDBeb7dcF772daCE87775d94fe',
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 4540622,
    },
  },
  isCalderaChain: false,
  stables: {
    eUSDC: {
      address: '0x26788Aff6241236B39d9A6Fd0f2280da68046409',
      decimals: 6,
    },
  },
}) as EcoChain

export const plasmaMainnet = /*#__PURE__*/ defineChain({
  id: 9745,
  name: 'Plasma Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'XPL',
    symbol: 'XPL',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.plasma.to'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Plasma Explorer',
      url: 'https://plasmascan.to',
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
  isCalderaChain: false,
  testnet: false,
  stables: {
    fUSDC: {
      address: '0x8b27342BE5bB0DE1E9Bd361e216ee3D484d87D56',
      decimals: 6,
    },
  },
}) as EcoChain
