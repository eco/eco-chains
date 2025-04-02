import { Chain, extractChain } from 'viem'
import { EcoChainDefinitions } from './index'

/**
 * Chains that we recognize api key support for
 */
export const ConfigRegex = {
  ALCHEMY_API_KEY: /alchemy\.com\/v2$/,
  INFURA_API_KEY: /infura\.io\/v3$/,
  FACE_API_KEY: /face\.io\/v1$/,
}

/**
 * Get the rpc urls for a chain, api keys for now
 */
export type EcoChainConfigs = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof typeof ConfigRegex]?: string
}

/**
 * The EcoChains class is used to manage and retrieve chain configurations
 * for various blockchain networks. It allows for the replacement of API keys
 * in RPC URLs based on predefined regex patterns.
 */
export class EcoChains {
  private configs: EcoChainConfigs

  constructor(configs: EcoChainConfigs) {
    this.configs = configs
  }

  /**
   * Retrieves the chain configuration for a given chain ID, replacing API keys
   * in the RPC URLs based on the provided regex patterns.
   *
   * @param {number} chainID - The ID of the chain to retrieve.
   * @returns {Chain} - The chain configuration with potentially modified RPC URLs.
   */
  getChain(chainID: number): Chain {
    const chain = extractChain({
      chains: Object.values(EcoChainDefinitions),
      id: chainID,
    })

    // Iterate over each RPC URL group in the chain
    // eslint-disable-next-line no-unused-vars
    Object.entries(chain.rpcUrls).forEach(([key, rpcUrlGroup]) => {
      // Iterate over the defined regexes in ConfigRegex
      Object.entries(ConfigRegex).forEach(([regexKey, regexValue]) => {
        //@ts-expect-error ignore default
        const apiKeyReplacement = this.configs[regexKey]
        if (apiKeyReplacement) {
          // Replace in http array if it exists
          if (rpcUrlGroup.http) {
            rpcUrlGroup.http = rpcUrlGroup.http.map((url) =>
              regexValue.test(url) ? url + `/${apiKeyReplacement}` : url,
            )
          }
          // Replace in webSocket array if it exists
          if (rpcUrlGroup.webSocket) {
            rpcUrlGroup.webSocket = rpcUrlGroup.webSocket.map((url) =>
              regexValue.test(url) ? url + `/${apiKeyReplacement}` : url,
            )
          }
        }
      })
    })

    return chain
  }
}
