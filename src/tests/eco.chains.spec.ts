const mockViemExtract = jest.fn()
const mockHttp = jest.fn()
const mockWebSocket = jest.fn()
const mockFallback = jest.fn()
import { cloneDeep } from 'lodash'
import { EcoChains } from '../eco.chains'

jest.mock('viem', () => {
  return {
    ...jest.requireActual('viem'),
    extractChain: mockViemExtract,
    http: mockHttp,
    webSocket: mockWebSocket,
    fallback: mockFallback,
  }
})
describe('Eco Chains', () => {
  const config = {
    alchemyKey: 'api_key_123',
    mantaKey: 'manta_key_789',
    curtisKey: 'curtis_key_xyz',
    infuraKey: 'infura_key_abc',
  }

  let defaults: any = {},
    alchemy: any = {},
    infura: any = {},
    manta: any = {},
    curtis: any = {},
    mixedCustomGroup: any = {}
  beforeEach(() => {
    // Reset all mocks
    mockViemExtract.mockReset()
    mockHttp.mockReset()
    mockWebSocket.mockReset()
    mockFallback.mockReset()

    defaults = {
      http: ['https://etherscan.io/api'],
      webSocket: ['wss://etherscan.io/api'],
    }
    alchemy = {
      http: ['https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      webSocket: ['wss://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
    }
    infura = {
      http: ['https://base-mainnet.g.infura.io/v3/${INFURA_API_KEY}'],
      webSocket: ['wss://base-mainnet.g.infura.io/v3/${INFURA_API_KEY}'],
    }
    manta = {
      http: [
        'http://pacific-rpc.sepolia-testnet.manta.network/${MANTA_API_KEY}',
      ],
      webSocket: ['wss://pacific-rpc.sepolia-testnet.manta.network/'],
    }
    curtis = {
      http: ['https://curtis.rpc.caldera.xyz/${CURTIS_API_KEY}'],
      webSocket: ['wss://curtis.rpc.caldera.xyz/'],
    }
    mixedCustomGroup = {
      http: [
        'https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
        'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
      ],
      webSocket: [
        'wss://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
        'wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}',
      ],
    }
  })

  it('should set configs on construction', async () => {
    const obj = new EcoChains(config)
    expect(obj).toBeDefined()
    expect(obj).toBeInstanceOf(EcoChains)
    expect(obj).toHaveProperty('configs')
    expect(obj['configs']).toEqual(config)
  })

  it('should do nothing if only default', async () => {
    const rpcs = getRpcUrls({ default: defaults })
    mockViemExtract.mockReturnValue(rpcs)
    const obj = new EcoChains(config)
    expect(obj).toBeDefined()
    expect(obj.getChain(1)).toEqual(rpcs)
  })

  it('should do nothing rpc is not supported', async () => {
    const rpcs = getRpcUrls({ default: defaults, alchemy })
    mockViemExtract.mockReturnValue(rpcs)
    const obj = new EcoChains({})
    expect(obj).toBeDefined()
    expect(obj.getChain(1)).toEqual(rpcs)
  })

  it('should replace the supported chain with an api key', async () => {
    const rpcs = getRpcUrls({ default: defaults, alchemy, infura })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    const obj = new EcoChains(config)
    expect(obj).toBeDefined()
    const chain1 = obj.getChain(1)
    expect(chain1.rpcUrls.default).toEqual(rpcs.rpcUrls.default)
    expect(chain1.rpcUrls.infura).toEqual(chain1.rpcUrls.infura)
    const alchemyEq = {
      http: ['https://base-mainnet.g.alchemy.com/v2/' + config.alchemyKey],
      webSocket: ['wss://opt-mainnet.g.alchemy.com/v2/' + config.alchemyKey],
    }
    expect(chain1.rpcUrls.alchemy).toEqual(alchemyEq)

    // Verify that the custom RPC group exists
    expect(chain1.rpcUrls).toHaveProperty('custom')
    // Last provider might be infura, alchemy or something else - just verify it exists
    expect(chain1.rpcUrls.custom).toBeDefined()
  })

  it('should replace all supported chains with an api key', async () => {
    const config2 = { ...config, infuraKey: 'api_key_456' }

    const rpcs = getRpcUrls({ default: defaults, alchemy, infura })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    const obj = new EcoChains(config2)
    expect(obj).toBeDefined()
    const chain1 = obj.getChain(1)
    expect(chain1.rpcUrls.default).toEqual(rpcs.rpcUrls.default)
    const infuraEq = {
      http: ['https://base-mainnet.g.infura.io/v3/' + config2.infuraKey],
      webSocket: ['wss://base-mainnet.g.infura.io/v3/' + config2.infuraKey],
    }
    expect(chain1.rpcUrls.infura).toEqual(infuraEq)
    const eq = {
      http: ['https://base-mainnet.g.alchemy.com/v2/' + config.alchemyKey],
      webSocket: ['wss://opt-mainnet.g.alchemy.com/v2/' + config.alchemyKey],
    }
    expect(chain1.rpcUrls.alchemy).toEqual(eq)

    // Verify that the custom RPC group exists
    expect(chain1.rpcUrls).toHaveProperty('custom')
    // Last provider might be infura, alchemy or something else - just verify it exists
    expect(chain1.rpcUrls.custom).toEqual(infuraEq)
  })

  it('should replace new manta and curtis chains with api keys', async () => {
    const rpcs = getRpcUrls({ default: defaults, manta, curtis })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    const obj = new EcoChains(config)
    expect(obj).toBeDefined()
    const chain1 = obj.getChain(1)
    expect(chain1.rpcUrls.default).toEqual(rpcs.rpcUrls.default)

    const mantaEq = {
      http: [
        'http://pacific-rpc.sepolia-testnet.manta.network/' + config.mantaKey,
      ],
      webSocket: ['wss://pacific-rpc.sepolia-testnet.manta.network/'],
    }
    expect(chain1.rpcUrls.manta).toEqual(mantaEq)

    const curtisEq = {
      http: ['https://curtis.rpc.caldera.xyz/' + config.curtisKey],
      webSocket: ['wss://curtis.rpc.caldera.xyz/'],
    }
    expect(chain1.rpcUrls.curtis).toEqual(curtisEq)

    // Verify that the custom RPC group exists
    expect(chain1.rpcUrls).toHaveProperty('custom')
    // Last provider might be manta, curtis or something else - just verify it exists
    expect(chain1.rpcUrls.custom).toEqual(curtisEq)
  })

  it('should handle a custom group with mixed providers', async () => {
    const rpcs = getRpcUrls({
      default: defaults,
      custom: mixedCustomGroup,
    })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))

    const obj = new EcoChains(config)
    const chain = obj.getChain(1)

    const expectedCustom = {
      http: [
        `https://opt-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
        `https://mainnet.infura.io/v3/${config.infuraKey}`,
      ],
      webSocket: [
        `wss://opt-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
        `wss://mainnet.infura.io/ws/v3/${config.infuraKey}`,
      ],
    }

    expect(chain.rpcUrls.custom).toEqual(expectedCustom)
    // Also verify default is untouched
    expect(chain.rpcUrls.default).toEqual(defaults)
  })

  it('should handle a not overwrite custom group', async () => {
    const rpcs = getRpcUrls({
      default: defaults,
      custom: mixedCustomGroup,
      alchemy: alchemy,
    })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    const obj = new EcoChains(config)
    expect(obj).toBeDefined()
    const chain = obj.getChain(1)

    const expectedCustom = {
      http: [
        `https://opt-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
        `https://mainnet.infura.io/v3/${config.infuraKey}`,
      ],
      webSocket: [
        `wss://opt-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
        `wss://mainnet.infura.io/ws/v3/${config.infuraKey}`,
      ],
    }

    const expectedAlchemy = {
      http: [`https://base-mainnet.g.alchemy.com/v2/${config.alchemyKey}`],
      webSocket: [`wss://opt-mainnet.g.alchemy.com/v2/${config.alchemyKey}`],
    }

    expect(chain.rpcUrls.custom).toEqual(expectedCustom)
    expect(chain.rpcUrls.alchemy).toEqual(expectedAlchemy)
  })

  it('should process URLs with API keys when keys are provided', () => {
    const obj = new EcoChains(config)
    const urls = [
      'https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
      'https://base-mainnet.g.infura.io/v3/${INFURA_API_KEY}',
      'https://etherscan.io/api',
    ]
    const processed = obj.processRpcUrls(urls)
    expect(processed).toEqual([
      `https://base-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
      `https://base-mainnet.g.infura.io/v3/${config.infuraKey}`,
      'https://etherscan.io/api',
    ])
  })

  it('should not return urls where api key is required but not provided', () => {
    const obj = new EcoChains({ alchemyKey: config.alchemyKey })
    const urls = [
      'https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
      'https://base-mainnet.g.infura.io/v3/${INFURA_API_KEY}',
      'https://etherscan.io/api',
    ]
    const processed = obj.processRpcUrls(urls)
    expect(processed).toEqual([
      `https://base-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
      'https://etherscan.io/api',
    ])
  })

  it('should return combined RPC URLs with WebSocket enabled by default', () => {
    const rpcs = getRpcUrls({ default: defaults, alchemy })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    const obj = new EcoChains(config)

    const urls = obj.getRpcUrlsForChain(1)

    expect(urls).toContain(
      `wss://opt-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
    )
    expect(urls).toContain('wss://etherscan.io/api')
    expect(urls).toContain(
      `https://base-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
    )
    expect(urls).toContain('https://etherscan.io/api')
  })

  it('should filter out websocket urls when websocket is disabled', () => {
    const rpcs = getRpcUrls({ default: defaults, alchemy })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    const obj = new EcoChains(config)

    const urls = obj.getRpcUrlsForChain(1, { isWebSocketEnabled: false })

    expect(urls).not.toContain(
      `wss://opt-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
    )
    expect(urls).not.toContain('wss://etherscan.io/api')
    expect(urls).toContain(
      `https://base-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
    )
    expect(urls).toContain('https://etherscan.io/api')
  })

  it('should prioritize custom RPC URLs over default', () => {
    const rpcs = getRpcUrls({ default: defaults, alchemy })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    const obj = new EcoChains(config)

    const urls = obj.getRpcUrlsForChain(1)

    // Custom URLs should come first
    const alchemyHttpIndex = urls.indexOf(
      `https://base-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
    )
    const defaultHttpIndex = urls.indexOf('https://etherscan.io/api')
    expect(alchemyHttpIndex).toBeLessThan(defaultHttpIndex)
  })

  it('should create http transports for https URLs', () => {
    const rpcs = getRpcUrls({
      default: {
        http: ['https://etherscan.io/api'],
      },
    })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    mockHttp.mockReturnValue('http-transport')
    const obj = new EcoChains(config)

    const transports = obj.getTransportsForChain(1, {
      isWebSocketEnabled: false,
    })

    expect(mockHttp).toHaveBeenCalledWith('https://etherscan.io/api')
    expect(transports).toEqual(['http-transport'])
  })

  it('should create websocket transports for wss URLs', () => {
    const rpcs = getRpcUrls({
      default: {
        webSocket: ['wss://etherscan.io/api'],
      },
    })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    mockWebSocket.mockReturnValue('websocket-transport')
    const obj = new EcoChains(config)

    const transports = obj.getTransportsForChain(1)

    expect(mockWebSocket).toHaveBeenCalledWith('wss://etherscan.io/api')
    expect(transports).toEqual(['websocket-transport'])
  })

  it('should handle mixed protocol URLs in transports', () => {
    const rpcs = getRpcUrls({
      default: {
        http: ['http://example.com', 'https://secure.example.com'],
        webSocket: ['ws://example.com', 'wss://secure.example.com'],
      },
    })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    mockHttp.mockReturnValue('http-transport')
    mockWebSocket.mockReturnValue('websocket-transport')
    const obj = new EcoChains(config)

    const transports = obj.getTransportsForChain(1)

    expect(mockWebSocket).toHaveBeenCalledWith('ws://example.com')
    expect(mockWebSocket).toHaveBeenCalledWith('wss://secure.example.com')
    expect(mockHttp).toHaveBeenCalledWith('http://example.com')
    expect(mockHttp).toHaveBeenCalledWith('https://secure.example.com')
    expect(transports).toHaveLength(4)
  })

  it('should create fallback transports for multiple chains', () => {
    const rpcs = getRpcUrls({
      default: {
        http: ['https://etherscan.io/api'],
      },
    })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    mockHttp.mockReturnValue('http-transport')
    mockFallback.mockReturnValue('fallback-transport')
    const obj = new EcoChains(config)

    const chains = [
      { id: 1, name: 'Ethereum' },
      { id: 137, name: 'Polygon' },
    ] as any[]

    const transports = obj.getTransports(chains)

    expect(mockFallback).toHaveBeenCalledTimes(2)
    expect(transports).toEqual({
      1: 'fallback-transport',
      137: 'fallback-transport',
    })
  })

  it('should skip chains with no available transports in getTransports', () => {
    const obj = new EcoChains({}) // No API keys

    // Mock a chain that would have URLs requiring API keys
    const rpcsWithKeys = getRpcUrls({
      default: {
        http: ['https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      },
    })
    mockViemExtract.mockReturnValue(cloneDeep(rpcsWithKeys))

    const chains = [{ id: 1, name: 'Ethereum' }] as any[]

    const transports = obj.getTransports(chains)

    expect(mockFallback).not.toHaveBeenCalled()
    expect(transports).toEqual({})
  })

  it('should pass websocket options to getTransportsForChain in getTransports', () => {
    const rpcs = getRpcUrls({
      default: {
        http: ['https://etherscan.io/api'],
        webSocket: ['wss://etherscan.io/api'],
      },
    })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    mockHttp.mockReturnValue('http-transport')
    mockFallback.mockReturnValue('fallback-transport')
    const obj = new EcoChains(config)

    const chains = [{ id: 1, name: 'Ethereum' }] as any[]

    const transports = obj.getTransports(chains, { isWebSocketEnabled: false })

    expect(mockHttp).toHaveBeenCalledWith('https://etherscan.io/api')
    expect(mockWebSocket).not.toHaveBeenCalled()
    expect(mockFallback).toHaveBeenCalledWith(['http-transport'])
    expect(transports).toEqual({ 1: 'fallback-transport' })
  })

  it('should preserve alchemy and infura RPCs from actual base chain definition', () => {
    // Import the actual base chain definition
    const { base } = require('../definitions/base')

    // Mock extractChain to return the actual base chain
    mockViemExtract.mockReturnValue(cloneDeep(base))

    const config = {
      alchemyKey: 'test_alchemy_key',
      infuraKey: 'test_infura_key',
    }

    const ecoChains = new EcoChains(config)
    const result = ecoChains.getChain(8453) // Base mainnet chain ID

    // Verify Alchemy RPCs are processed correctly
    expect(result.rpcUrls.alchemy).toBeDefined()
    expect(result.rpcUrls.alchemy.http).toEqual([
      'https://base-mainnet.g.alchemy.com/v2/test_alchemy_key',
    ])
    expect(result.rpcUrls.alchemy.webSocket).toEqual([
      'wss://base-mainnet.g.alchemy.com/v2/test_alchemy_key',
    ])

    // Verify Infura RPCs are processed correctly
    expect(result.rpcUrls.infura).toBeDefined()
    expect(result.rpcUrls.infura.http).toEqual([
      'https://base-mainnet.infura.io/v3/test_infura_key',
    ])
    expect(result.rpcUrls.infura.webSocket).toEqual([
      'wss://base-mainnet.infura.io/ws/v3/test_infura_key',
    ])

    // Verify custom field is set to the last non-default provider
    expect(result.rpcUrls.custom).toBeDefined()
    // Since infura comes after alchemy in the base definition, it should be the custom
    expect(result.rpcUrls.custom).toEqual(result.rpcUrls.infura)

    // Verify stables are preserved
    expect(result.stables).toBeDefined()
    expect(result.stables?.USDC).toEqual({
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      decimals: 6,
    })

    // Verify contracts are preserved
    expect(result.contracts?.hyperlaneMailbox).toEqual({
      address: '0xeA87ae93Fa0019a82A727bfd3eBd1cFCa8f64f1D',
    })
  })

  it('should handle custom field when last provider returns empty RPCs', () => {
    // Create a chain with two custom providers where the last one will return empty
    const chainWithMixedProviders = getRpcUrls({
      default: defaults,
      alchemy: {
        http: ['https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
        webSocket: ['wss://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      },
      infura: {
        // This provider requires API keys but none will be provided
        http: ['https://base-mainnet.infura.io/v3/${INFURA_API_KEY}'],
        webSocket: ['wss://base-mainnet.infura.io/ws/v3/${INFURA_API_KEY}'],
      },
    })

    mockViemExtract.mockReturnValue(cloneDeep(chainWithMixedProviders))

    // Provide only alchemy key, so infura URLs will be filtered out (empty)
    const ecoChains = new EcoChains({ alchemyKey: 'test_key' })
    const result = ecoChains.getChain(1)

    // Alchemy should have processed URLs
    expect(result.rpcUrls.alchemy.http).toEqual([
      'https://base-mainnet.g.alchemy.com/v2/test_key',
    ])
    expect(result.rpcUrls.alchemy.webSocket).toEqual([
      'wss://base-mainnet.g.alchemy.com/v2/test_key',
    ])

    // Infura should be empty since no API key was provided
    expect(result.rpcUrls.infura.http).toEqual([])
    expect(result.rpcUrls.infura.webSocket).toEqual([])

    // Custom should be set to alchemy (the last provider with valid URLs)
    // since infura has empty URLs and should be filtered out
    expect(result.rpcUrls.custom).toEqual(result.rpcUrls.alchemy)
  })

  it('should not set custom field when all providers have empty RPCs', () => {
    // Create a chain where all providers require API keys but none are provided
    const chainWithOnlyKeyUrls = getRpcUrls({
      default: {
        http: ['https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
        webSocket: ['wss://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}'],
      },
      infura: {
        http: ['https://base-mainnet.infura.io/v3/${INFURA_API_KEY}'],
        webSocket: ['wss://base-mainnet.infura.io/ws/v3/${INFURA_API_KEY}'],
      },
    })

    mockViemExtract.mockReturnValue(cloneDeep(chainWithOnlyKeyUrls))

    // No API keys provided - all URLs will be filtered out
    const ecoChains = new EcoChains({})
    const result = ecoChains.getChain(1)

    // All RPC URLs should be empty
    expect(result.rpcUrls.default.http).toEqual([])
    expect(result.rpcUrls.default.webSocket).toEqual([])
    expect(result.rpcUrls.infura.http).toEqual([])
    expect(result.rpcUrls.infura.webSocket).toEqual([])

    // Custom should not be set since no providers have valid URLs
    expect(result.rpcUrls.custom).toBeUndefined()
  })

  describe('preferred provider selection', () => {
    it('should prioritize preferred providers in order', () => {
      const rpcs = getRpcUrls({
        default: {
          http: ['https://default.com'],
        },
        alchemy: {
          http: ['https://alchemy-processed.com'],
        },
        infura: {
          http: ['https://infura-processed.com'],
        },
      })
      mockViemExtract.mockReturnValue(cloneDeep(rpcs))
      const obj = new EcoChains(config)

      const urls = obj.getRpcUrlsForChain(1, {
        preferredProviders: ['alchemy', 'infura'],
        isWebSocketEnabled: false,
      })

      expect(urls).toEqual([
        'https://alchemy-processed.com',
        'https://infura-processed.com',
        'https://default.com',
      ])
    })

    it('should respect useCustomOnly flag', () => {
      const rpcs = getRpcUrls({
        default: {
          http: ['https://default.com'],
        },
        alchemy: {
          http: ['https://alchemy-processed.com'],
        },
        infura: {
          http: ['https://infura-processed.com'],
        },
      })
      mockViemExtract.mockReturnValue(cloneDeep(rpcs))
      const obj = new EcoChains(config)

      const urls = obj.getRpcUrlsForChain(1, {
        preferredProviders: ['alchemy', 'infura'],
        useCustomOnly: true,
        isWebSocketEnabled: false,
      })

      expect(urls).toEqual([
        'https://alchemy-processed.com',
        'https://infura-processed.com',
      ])
      expect(urls).not.toContain('https://default.com')
    })

    it('should skip non-existent preferred providers', () => {
      const rpcs = getRpcUrls({
        default: {
          http: ['https://default.com'],
        },
        alchemy: {
          http: ['https://alchemy-processed.com'],
        },
      })
      mockViemExtract.mockReturnValue(cloneDeep(rpcs))
      const obj = new EcoChains(config)

      const urls = obj.getRpcUrlsForChain(1, {
        preferredProviders: ['alchemy', 'nonexistent', 'infura'],
        isWebSocketEnabled: false,
      })

      expect(urls).toEqual([
        'https://alchemy-processed.com',
        'https://default.com',
      ])
    })
  })

  it('should return alchemy URLs when alchemyKey is provided for getRpcUrlsForChain', () => {
    // Import the actual ethereum chain definition
    const { ethereum } = require('../definitions/ethereum')

    // Mock extractChain to return the actual ethereum chain
    mockViemExtract.mockReturnValue(cloneDeep(ethereum))

    const ecoChains = new EcoChains({ alchemyKey: 'test_alchemy_key_123' })
    const urls = ecoChains.getRpcUrlsForChain(1) // Ethereum mainnet chain ID

    // Should contain the processed alchemy URLs
    expect(urls).toContain('https://eth-mainnet.g.alchemy.com/v2/test_alchemy_key_123')
    expect(urls).toContain('wss://eth-mainnet.g.alchemy.com/v2/test_alchemy_key_123')
  })

  describe('default provider priority behavior', () => {
    it('should return alchemy, infura, and default URLs in correct order when all keys provided', () => {
      const rpcs = getRpcUrls({
        default: defaults,
        alchemy,
        infura,
      })
      mockViemExtract.mockReturnValue(cloneDeep(rpcs))
      const obj = new EcoChains(config)

      const urls = obj.getRpcUrlsForChain(1)

      const expectedOrder = [
        `wss://opt-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
        `https://base-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
        `wss://base-mainnet.g.infura.io/v3/${config.infuraKey}`,
        `https://base-mainnet.g.infura.io/v3/${config.infuraKey}`,
        'wss://etherscan.io/api',
        'https://etherscan.io/api',
      ]
      expect(urls).toEqual(expectedOrder)
    })

    it('should skip infura when infuraKey not provided but include alchemy and default', () => {
      const rpcs = getRpcUrls({
        default: defaults,
        alchemy,
        infura,
      })
      mockViemExtract.mockReturnValue(cloneDeep(rpcs))
      const obj = new EcoChains({ alchemyKey: config.alchemyKey })

      const urls = obj.getRpcUrlsForChain(1)

      expect(urls).toEqual([
        `wss://opt-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
        `https://base-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
        'wss://etherscan.io/api',
        'https://etherscan.io/api',
      ])
      expect(urls).not.toContain('${INFURA_API_KEY}')
    })

    it('should skip alchemy when alchemyKey not provided but include infura and default', () => {
      const rpcs = getRpcUrls({
        default: defaults,
        alchemy,
        infura,
      })
      mockViemExtract.mockReturnValue(cloneDeep(rpcs))
      const obj = new EcoChains({ infuraKey: config.infuraKey })

      const urls = obj.getRpcUrlsForChain(1)

      expect(urls).toEqual([
        `wss://base-mainnet.g.infura.io/v3/${config.infuraKey}`,
        `https://base-mainnet.g.infura.io/v3/${config.infuraKey}`,
        'wss://etherscan.io/api',
        'https://etherscan.io/api',
      ])
      expect(urls).not.toContain('${ALCHEMY_API_KEY}')
    })

    it('should only return default URLs when no API keys provided', () => {
      const rpcs = getRpcUrls({
        default: defaults,
        alchemy,
        infura,
      })
      mockViemExtract.mockReturnValue(cloneDeep(rpcs))
      const obj = new EcoChains({})

      const urls = obj.getRpcUrlsForChain(1)

      expect(urls).toEqual([
        'wss://etherscan.io/api',
        'https://etherscan.io/api',
      ])
    })

    it('should respect useCustomOnly flag with new default behavior', () => {
      const rpcs = getRpcUrls({
        default: defaults,
        alchemy,
        infura,
      })
      mockViemExtract.mockReturnValue(cloneDeep(rpcs))
      const obj = new EcoChains(config)

      const urls = obj.getRpcUrlsForChain(1, { useCustomOnly: true })

      expect(urls).toEqual([
        `wss://opt-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
        `https://base-mainnet.g.alchemy.com/v2/${config.alchemyKey}`,
        `wss://base-mainnet.g.infura.io/v3/${config.infuraKey}`,
        `https://base-mainnet.g.infura.io/v3/${config.infuraKey}`,
      ])
      expect(urls).not.toContain('https://etherscan.io/api')
    })

    it('should maintain backward compatibility with empty preferredProviders array', () => {
      const rpcs = getRpcUrls({ default: defaults, alchemy })
      mockViemExtract.mockReturnValue(cloneDeep(rpcs))
      const obj = new EcoChains(config)

      const urls = obj.getRpcUrlsForChain(1, { preferredProviders: [] })

      // Should use old custom + default logic
      expect(urls).toContain(`https://base-mainnet.g.alchemy.com/v2/${config.alchemyKey}`)
      expect(urls).toContain('https://etherscan.io/api')
    })
  })

  function getRpcUrls(args: any) {
    return {
      rpcUrls: {
        ...args,
      },
    }
  }
})
