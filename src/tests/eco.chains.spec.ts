const mockViemExtract = jest.fn()
import { EcoChains } from '../eco.chains'
import { cloneDeep } from 'lodash'

jest.mock('viem', () => {
  return {
    ...jest.requireActual('viem'),
    extractChain: mockViemExtract,
  }
})
describe('Eco Chains', () => {
  const config = { ALCHEMY_API_KEY: 'api_key_123' }

  let defaults: any = {},
    alchemy: any = {},
    infura: any = {}
  beforeEach(() => {
    defaults = {
      http: ['https://etherscan.io/api'],
      webSocket: ['wss://etherscan.io/api'],
    }
    alchemy = {
      http: ['https://base-mainnet.g.alchemy.com/v2'],
      webSocket: ['wss://opt-mainnet.g.alchemy.com/v2'],
    }
    infura = {
      http: ['https://base-mainnet.g.infura.io/v3'],
      webSocket: ['wss://base-mainnet.g.infura.io/v3'],
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
      http: ['https://base-mainnet.g.alchemy.com/v2/' + config.ALCHEMY_API_KEY],
      webSocket: [
        'wss://opt-mainnet.g.alchemy.com/v2/' + config.ALCHEMY_API_KEY,
      ],
    }
    expect(chain1.rpcUrls.alchemy).toEqual(alchemyEq)
  })

  it('should replace all supported chains with an api key', async () => {
    const config2 = { ...config, INFURA_API_KEY: 'api_key_456' }

    const rpcs = getRpcUrls({ default: defaults, alchemy, infura })
    mockViemExtract.mockReturnValue(cloneDeep(rpcs))
    const obj = new EcoChains(config2)
    expect(obj).toBeDefined()
    const chain1 = obj.getChain(1)
    expect(chain1.rpcUrls.default).toEqual(rpcs.rpcUrls.default)
    const infuraEq = {
      http: ['https://base-mainnet.g.infura.io/v3/' + config2.INFURA_API_KEY],
      webSocket: [
        'wss://base-mainnet.g.infura.io/v3/' + config2.INFURA_API_KEY,
      ],
    }
    expect(chain1.rpcUrls.infura).toEqual(infuraEq)
    const eq = {
      http: ['https://base-mainnet.g.alchemy.com/v2/' + config.ALCHEMY_API_KEY],
      webSocket: [
        'wss://opt-mainnet.g.alchemy.com/v2/' + config.ALCHEMY_API_KEY,
      ],
    }
    expect(chain1.rpcUrls.alchemy).toEqual(eq)
  })

  function getRpcUrls(args: any) {
    return {
      rpcUrls: {
        ...args,
      },
    }
  }
})
