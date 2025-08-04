import { extractChain, fallback, Hex, http, Transport, webSocket } from 'viem'
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
 * Options for RPC URL or Transport retrieval
 * isWebSocketEnabled: Flag to enable or disable WebSocket URLs
 */
export type RpcOptions = {
  isWebSocketEnabled?: boolean // Flag to enable or disable WebSocket URLs
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
   * Processes an array of RPC URLs, replacing API key placeholders and filtering out
   * URLs that require API keys but don't have them configured.
   *
   * @param urls - Array of RPC URLs to process
   * @returns Array of processed URLs with API keys replaced and unauthenticated URLs filtered out
   */
  processRpcUrls(urls: readonly string[]): string[] {
    const processedUrls: string[] = []

    urls.forEach((url) => {
      let newUrl = url
      let shouldIncludeUrl = true

      Object.entries(ConfigRegex).forEach(([key, regex]) => {
        const apiKey = this.configs[key as keyof EcoChainConfigs]
        if (regex.test(url)) {
          if (apiKey) {
            newUrl = newUrl.replace(regex, apiKey)
          } else {
            // URL requires API key but no key was provided, exclude it
            shouldIncludeUrl = false
          }
        }
      })

      if (shouldIncludeUrl) {
        processedUrls.push(newUrl)
      }
    })

    return processedUrls
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
    Object.values(newRpcUrls).forEach((rpcUrlGroup) => {
      // Process http URLs
      if (rpcUrlGroup.http) {
        rpcUrlGroup.http = this.processRpcUrls(rpcUrlGroup.http)
      }

      // Process webSocket URLs
      if (rpcUrlGroup.webSocket) {
        rpcUrlGroup.webSocket = this.processRpcUrls(rpcUrlGroup.webSocket)
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
  getStablesForChain(
    chainID: number,
  ): Record<string, { address: Hex; decimals: number }> {
    const chain = this.getChain(chainID)
    return chain.stables || {}
  }

  /**
   * Retrieves RPC URLs for a specific chain, optionally filtering by WebSocket support
   *
   * @param chainID - The ID of the chain to retrieve RPC URLs for
   * @param opts - Options for filtering RPC URLs
   * @returns {string[]} - An array of RPC URLs for the specified chain
   */
  getRpcUrlsForChain(chainID: number, opts: RpcOptions = {}): string[] {
    const { isWebSocketEnabled = true } = opts
    const rpcChain = this.getChain(chainID)
    const custom = rpcChain.rpcUrls.custom
    const def = rpcChain.rpcUrls.default

    let rpcUrls: string[] = []
    if (isWebSocketEnabled) {
      rpcUrls.push(...(custom?.webSocket || []), ...(def?.webSocket || []))
    }
    rpcUrls.push(...(custom?.http || []), ...(def?.http || []))

    return rpcUrls
  }

  /**
   * Retrieves transports for a specific chain, creating WebSocket or HTTP transports
   * based on the RPC URLs available for that chain.
   *
   * @param chainID - The ID of the chain to retrieve transports for
   * @param opts - Options for filtering RPC URLs
   * @returns {Transport[]} - An array of Transport objects for the specified chain
   */
  getTransportsForChain(chainID: number, opts: RpcOptions = {}): Transport[] {
    const rpcUrls = this.getRpcUrlsForChain(chainID, opts)
    return rpcUrls.reduce<Transport[]>((acc, url) => {
      if (url.startsWith('ws://') || url.startsWith('wss://')) {
        acc.push(webSocket(url))
      } else if (url.startsWith('http://') || url.startsWith('https://')) {
        acc.push(http(url))
      }
      return acc
    }, [])
  }

  /**
   * Retrieves transports for all chains, creating a fallback transport for each chain
   * based on the available RPC URLs.
   *
   * @param chains - An array of EcoChain objects to retrieve transports for
   * @param opts - Options for filtering RPC URLs
   * @returns {Record<number, Transport>} - A record mapping chain IDs to Transport objects
   */
  getTransports(
    chains: EcoChain[],
    opts: RpcOptions = {},
  ): Record<number, Transport> {
    return chains.reduce<Record<number, Transport>>((acc, chain) => {
      const transports = this.getTransportsForChain(chain.id, opts)
      if (transports.length > 0) {
        acc[chain.id] = fallback(transports)
      }
      return acc
    }, {})
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
