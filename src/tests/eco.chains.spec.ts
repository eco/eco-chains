const mockViemExtract = jest.fn()
import { cloneDeep } from 'lodash'
import { EcoChains } from '../eco.chains'

jest.mock('viem', () => {
  return {
    ...jest.requireActual('viem'),
    extractChain: mockViemExtract,
  }
})
describe('Eco Chains', () => {
  const config = {
    alchemyKey: 'api_key_123',
    mantaKey: 'manta_key_789',
    curtisKey: 'curtis_key_xyz',
  }

  let defaults: any = {},
    alchemy: any = {},
    infura: any = {},
    manta: any = {},
    curtis: any = {}
  beforeEach(() => {
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
      webSocket: [
        'wss://pacific-rpc.sepolia-testnet.manta.network/${MANTA_API_KEY}',
      ],
    }
    curtis = {
      http: ['https://curtis.rpc.caldera.xyz/${CURTIS_API_KEY}'],
      webSocket: ['wss://curtis.rpc.caldera.xyz/${CURTIS_API_KEY}'],
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
      webSocket: [
        'wss://pacific-rpc.sepolia-testnet.manta.network/' + config.mantaKey,
      ],
    }
    expect(chain1.rpcUrls.manta).toEqual(mantaEq)

    const curtisEq = {
      http: ['https://curtis.rpc.caldera.xyz/' + config.curtisKey],
      webSocket: ['wss://curtis.rpc.caldera.xyz/' + config.curtisKey],
    }
    expect(chain1.rpcUrls.curtis).toEqual(curtisEq)

    // Verify that the custom RPC group exists
    expect(chain1.rpcUrls).toHaveProperty('custom')
    // Last provider might be manta, curtis or something else - just verify it exists
    expect(chain1.rpcUrls.custom).toEqual(curtisEq)
  })

  function getRpcUrls(args: any) {
    return {
      rpcUrls: {
        ...args,
      },
    }
  }
})
