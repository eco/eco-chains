import { defineChain } from 'viem'
import { plasma as pl, plasmaTestnet as plt } from 'viem/chains'
import { EcoChain } from '../chain.interface'

export const plasmaTestnet = /*#__PURE__*/ defineChain({
  ...plt,
  rpcUrls: {
    ...plt.rpcUrls,
    alchemy: {
      http: ['https://plasma-testnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://plasma-testnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...plt.contracts,
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
  ...pl,
  rpcUrls: {
    ...pl.rpcUrls,
    alchemy: {
      http: ['https://plasma-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://plasma-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    },
  },
  contracts: {
    ...pl.contracts,
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
    USDT0: {
      address: '0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb',
      decimals: 6,
    },
  },
}) as EcoChain
