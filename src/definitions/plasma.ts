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
  isCalderaChain: false,
  stables: {
    eUSDC: {
      address: '0x26788Aff6241236B39d9A6Fd0f2280da68046409',
      decimals: 6,
    },
  },
}) as EcoChain
