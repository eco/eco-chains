import { Chain } from 'viem'
import { inEVM as vinEVM } from 'viem/chains'

/**
 * inEVM Mainnet chain configuration
 * Extends viem's inEVM configuration with Eco-specific RPC URLs and contract addresses
 * Includes Hyperlane Mailbox contract configuration
 */
export const inEVM: Chain = {
  ...vinEVM,
  rpcUrls: {
    ...vinEVM.rpcUrls,
    caldera: {
      http: [`TBD`],
      webSocket: [`TBD`],
    },
  },
  contracts: {
    ...vinEVM.contracts,
    hyperlaneMailbox: {
      address: '0x2f2aFaE1139Ce54feFC03593FeE8AB2aDF4a85A7',
    },
  },
}
