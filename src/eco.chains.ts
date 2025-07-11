import { extractChain, Hex } from 'viem'
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

    // Create a new rpcUrls object to avoid modifying the original
    const newRpcUrls: EcoChain['rpcUrls'] = { ...chain.rpcUrls }

    // Iterate over each RPC URL group in the chain
    Object.entries(newRpcUrls).forEach(([, rpcUrlGroup]) => {
      // Create new arrays for http and webSocket URLs
      const newHttp: string[] = []
      const newWebSocket: string[] = []

      // Replace placeholders in http URLs
      if (rpcUrlGroup.http) {
        rpcUrlGroup.http.forEach((url) => {
          let newUrl = url
          Object.entries(ConfigRegex).forEach(([key, regex]) => {
            // @ts-expect-error ignore default
            const apiKey = this.configs[key]
            if (apiKey) {
              newUrl = newUrl.replace(regex, apiKey)
            }
          })
          newHttp.push(newUrl)
        })
        rpcUrlGroup.http = newHttp
      }

      // Replace placeholders in webSocket URLs
      if (rpcUrlGroup.webSocket) {
        rpcUrlGroup.webSocket.forEach((url) => {
          let newUrl = url
          Object.entries(ConfigRegex).forEach(([key, regex]) => {
            // @ts-expect-error ignore default
            const apiKey = this.configs[key]
            if (apiKey) {
              newUrl = newUrl.replace(regex, apiKey)
            }
          })
          newWebSocket.push(newUrl)
        })
        rpcUrlGroup.webSocket = newWebSocket
      }
    })

    // Assign the updated rpcUrls back to the chain object
    chain.rpcUrls = newRpcUrls

    // If a `custom` group is not explicitly defined, create one from the last
    // available non-default provider to ensure backward compatibility.
    if (!chain.rpcUrls.custom) {
      const nonDefaultKeys = Object.keys(chain.rpcUrls).filter(
        (key) => key !== 'default',
      )

      if (nonDefaultKeys.length > 0) {
        const lastProviderKey = nonDefaultKeys[nonDefaultKeys.length - 1]
        chain.rpcUrls.custom = chain.rpcUrls[lastProviderKey]
      }
    }

    return chain
  }

  /**
   * Retrieves stables for a specific chain
   *
   * @param chainID - The ID of the chain to retrieve stables for
   * @returns {Record<string, Hex>} - A record of stablecoin symbols and their addresses for the specified chain
   */
  getStablesForChain(chainID: number): Record<string, Hex> {
    const chain = this.getChain(chainID)
    return chain.stables || {}
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
