import { extractChain } from 'viem'
import { EcoRoutesChains, EcoChain } from './index'

/**
 * Regular expressions to identify RPC endpoints that require API keys
 * These patterns match the base URL patterns before the API key
 * Key-value pairs map provider names to their respective URL patterns
 */
export const ConfigRegex = {
  alchemyKey: /\$\{ALCHEMY_API_KEY\}/, // Matches Alchemy API key placeholder
  infuraKey: /\$\{INFURA_API_KEY\}/, // Matches Infura API key placeholder
  mantaKey: /\$\{MANTA_API_KEY\}/, // Matches Manta API key placeholder
  quickNodeKey: /\$\{QUICKNODE_API_KEY\}/, // Matches MQUICKNODE_API_KEY key placeholder
  curtisKey: /\$\{CURTIS_API_KEY\}/, // Matches Curtis API key placeholder
}

/**
 * Configuration object for API keys used in RPC URLs
 * Keys correspond to provider names defined in ConfigRegex
 * Values are the API keys to be inserted into the RPC URLs
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
  // The configuration object containing API keys for RPC URLs for each provider
  private configs: EcoChainConfigs

  constructor(configs: EcoChainConfigs) {
    this.configs = configs
  }

  /**
   * Retrieves the chain configuration for a given chain ID, replacing API keys
   * in the RPC URLs based on the provided regex patterns.
   *
   * This method:
   * 1. Extracts the chain configuration from EcoChainDefinitions
   * 2. Identifies RPC URLs that match patterns in ConfigRegex
   * 3. Appends appropriate API keys to those URLs
   * 4. Handles both HTTP and WebSocket URLs
   *
   * @param {number} chainID - The ID of the chain to retrieve
   * @returns {EcoChain} - The chain configuration with API keys inserted into RPC URLs
   * @throws Will throw an error if the chain ID is not found in EcoChainDefinitions
   */
  getChain(chainID: number): EcoChain {
    const chain = extractChain({
      chains: EcoRoutesChains,
      id: chainID,
    })

    // Validate that a valid chain configuration was found
    // If no matching chain ID is found, throw an error
    if (!chain) {
      throw new Error(`Chain with ID ${chainID} not found`)
    }

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
            rpcUrlGroup.http = rpcUrlGroup.http.map((url: any) =>
              regexValue.test(url)
                ? url.replace(regexValue, apiKeyReplacement)
                : url,
            )
          }
          // Replace in webSocket array if it exists
          if (rpcUrlGroup.webSocket) {
            rpcUrlGroup.webSocket = rpcUrlGroup.webSocket.map((url: any) =>
              regexValue.test(url)
                ? url.replace(regexValue, apiKeyReplacement)
                : url,
            )
          }
          // Set a custom RPC URL group with the modified URLs
          chain.rpcUrls.custom = {
            http: rpcUrlGroup.http,
            webSocket: rpcUrlGroup.webSocket,
          }
        }
      })
    })
    return chain
  }

  /**
   * Retrieves all chain configurations, replacing API keys in RPC URLs
   * @returns {[EcoChain, ...EcoChain[]]} - An array of one or more chain configurations with API keys inserted into RPC URLs
   */
  getAllChains(): [EcoChain, ...EcoChain[]] {
    return EcoRoutesChains.map((chain) => this.getChain(chain.id)) as [
      EcoChain,
      ...EcoChain[],
    ]
  }

  /**
   * Retrieves all mainnet chain configurations, replacing API keys in RPC URLs
   * @returns {[EcoChain, ...EcoChain[]]} - An array of one or more mainnet chain configurations with API keys inserted into RPC URLs
   */
  getMainnetChains(): [EcoChain, ...EcoChain[]] {
    return EcoRoutesChains.filter((chain) => !chain.testnet).map((chain) =>
      this.getChain(chain.id),
    ) as [EcoChain, ...EcoChain[]]
  }

  /**
   * Retrieves all testnet chain configurations, replacing API keys in RPC URLs
   * @returns {[EcoChain, ...EcoChain[]]} - An array of one or more testnet chain configurations with API keys inserted into RPC URLs
   */
  getTestnetChains(): [EcoChain, ...EcoChain[]] {
    return EcoRoutesChains.filter((chain) => chain.testnet).map((chain) =>
      this.getChain(chain.id),
    ) as [EcoChain, ...EcoChain[]]
  }
}
