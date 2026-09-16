const mockViemExtract = jest.fn()
import { cloneDeep } from 'lodash'
import { EcoChains } from '../eco.chains'
import { robinhood } from '../definitions/robinhood'

jest.mock('viem', () => {
  return {
    ...jest.requireActual('viem'),
    extractChain: mockViemExtract,
  }
})

describe('Robinhood Chain mainnet', () => {
  const ROBINHOOD_CHAIN_ID = 4663

  beforeEach(() => {
    mockViemExtract.mockReset()
    mockViemExtract.mockImplementation((args) =>
      cloneDeep(jest.requireActual('viem').extractChain(args)),
    )
  })

  it('should define Robinhood Chain mainnet correctly', () => {
    expect(robinhood.id).toBe(ROBINHOOD_CHAIN_ID)
    expect(robinhood.name).toBe('Robinhood Chain')
    expect(robinhood.sourceId).toBe(1)
    expect(robinhood.testnet).toBe(false)
    expect(robinhood.isCalderaChain).toBe(false)
    expect(robinhood.nativeCurrency).toEqual({
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    })
    expect(robinhood.contracts?.multicall3).toEqual({
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 0,
    })
    expect(robinhood.contracts?.hyperlaneMailbox).toEqual({
      address: '0x3a867fCfFeC2B790970eeBDC9023E75B0a172aa7',
    })
    expect(robinhood.blockExplorers?.default).toEqual({
      name: 'Robinhood Chain Explorer',
      url: 'https://robinhoodchain.blockscout.com',
    })
  })

  it('should be retrievable through EcoChains by chain id', () => {
    const ecoChains = new EcoChains({})
    const chain = ecoChains.getChain(ROBINHOOD_CHAIN_ID)
    expect(chain).toBeDefined()
    expect(chain.id).toBe(ROBINHOOD_CHAIN_ID)
    expect(chain.name).toBe('Robinhood Chain')
  })

  it('should replace the alchemy api key in rpc urls', () => {
    const ecoChains = new EcoChains({ alchemyKey: 'test_alchemy_key' })
    const chain = ecoChains.getChain(ROBINHOOD_CHAIN_ID)
    expect(chain.rpcUrls.alchemy.http).toEqual([
      'https://robinhood-mainnet.g.alchemy.com/v2/test_alchemy_key',
    ])
    expect(chain.rpcUrls.alchemy.webSocket).toEqual([
      'wss://robinhood-mainnet.g.alchemy.com/v2/test_alchemy_key',
    ])
  })

  it('should filter out alchemy rpc urls when no api key is provided', () => {
    const ecoChains = new EcoChains({})
    const chain = ecoChains.getChain(ROBINHOOD_CHAIN_ID)
    expect(chain.rpcUrls.alchemy.http).toEqual([])
    expect(chain.rpcUrls.alchemy.webSocket).toEqual([])
    expect(chain.rpcUrls.default.http).toEqual([
      'https://rpc.mainnet.chain.robinhood.com',
    ])
  })

  it('should return the USDG stable for Robinhood Chain', () => {
    const ecoChains = new EcoChains({})
    const stables = ecoChains.getStablesForChain(ROBINHOOD_CHAIN_ID)
    expect(stables).toEqual({
      USDG: {
        address: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168',
        decimals: 6,
      },
    })
  })

  it('should be classified as a mainnet EVM chain', () => {
    const ecoChains = new EcoChains({})
    const mainnetIds = ecoChains.getEvmMainnetChains().map((chain) => chain.id)
    const testnetIds = ecoChains.getEvmTestnetChains().map((chain) => chain.id)
    expect(mainnetIds).toContain(ROBINHOOD_CHAIN_ID)
    expect(testnetIds).not.toContain(ROBINHOOD_CHAIN_ID)
  })
})
