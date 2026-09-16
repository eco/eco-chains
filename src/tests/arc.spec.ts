const mockViemExtract = jest.fn()
import { cloneDeep } from 'lodash'
import { EcoChains } from '../eco.chains'
import { arc } from '../definitions/arc'

// getChain shallow-copies rpcUrls, so RPC url groups on the shared chain
// definitions are mutated across calls. Mirror eco.chains.spec.ts and return
// a deep clone from extractChain so each test gets a pristine definition.
jest.mock('viem', () => {
  return {
    ...jest.requireActual('viem'),
    extractChain: mockViemExtract,
  }
})

describe('Arc mainnet chain', () => {
  const ARC_CHAIN_ID = 5042

  beforeEach(() => {
    mockViemExtract.mockReset()
    mockViemExtract.mockImplementation((args) =>
      cloneDeep(jest.requireActual('viem').extractChain(args)),
    )
  })

  it('should define the arc mainnet chain correctly', () => {
    expect(arc.id).toBe(ARC_CHAIN_ID)
    expect(arc.name).toBe('Arc')
    expect(arc.testnet).toBe(false)
    expect(arc.isCalderaChain).toBe(false)
    // Arc's gas token is USDC with 18-decimal native accounting; the ERC-20
    // USDC tracked as a stable is the 6-decimal token at 0x3600...0000.
    expect(arc.nativeCurrency).toEqual({
      name: 'USDC',
      symbol: 'USDC',
      decimals: 18,
    })
    // Genesis predeploy: code is present at block 0.
    expect(arc.contracts?.multicall3).toEqual({
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 0,
    })
    expect(arc.contracts?.hyperlaneMailbox).toEqual({
      address: '0x7f50C5776722630a0024fAE05fDe8b47571D7B39',
    })
    expect(arc.blockExplorers?.default).toEqual({
      name: 'Arc Explorer',
      url: 'https://explorer.arc.io',
    })
  })

  it('should be retrievable through EcoChains by chain id', () => {
    const ecoChains = new EcoChains({})
    const chain = ecoChains.getChain(ARC_CHAIN_ID)
    expect(chain).toBeDefined()
    expect(chain.id).toBe(ARC_CHAIN_ID)
    expect(chain.name).toBe('Arc')
  })

  it('should replace the alchemy api key in rpc urls', () => {
    const ecoChains = new EcoChains({ alchemyKey: 'test_alchemy_key' })
    const chain = ecoChains.getChain(ARC_CHAIN_ID)
    expect(chain.rpcUrls.alchemy.http).toEqual([
      'https://arc-mainnet.g.alchemy.com/v2/test_alchemy_key',
    ])
    expect(chain.rpcUrls.alchemy.webSocket).toEqual([
      'wss://arc-mainnet.g.alchemy.com/v2/test_alchemy_key',
    ])
  })

  it('should filter out alchemy rpc urls when no api key is provided', () => {
    const ecoChains = new EcoChains({})
    const chain = ecoChains.getChain(ARC_CHAIN_ID)
    expect(chain.rpcUrls.alchemy.http).toEqual([])
    expect(chain.rpcUrls.alchemy.webSocket).toEqual([])
    // Circle's public RPC remains untouched
    expect(chain.rpcUrls.default.http).toEqual(['https://rpc.mainnet.arc.io'])
  })

  it('should return the USDC stable for arc', () => {
    const ecoChains = new EcoChains({})
    const stables = ecoChains.getStablesForChain(ARC_CHAIN_ID)
    expect(stables).toEqual({
      USDC: {
        address: '0x3600000000000000000000000000000000000000',
        decimals: 6,
      },
    })
  })

  it('should be classified as a mainnet chain', () => {
    const ecoChains = new EcoChains({})
    const mainnetIds = ecoChains.getMainnetChains().map((chain) => chain.id)
    const testnetIds = ecoChains.getTestnetChains().map((chain) => chain.id)
    expect(mainnetIds).toContain(ARC_CHAIN_ID)
    expect(testnetIds).not.toContain(ARC_CHAIN_ID)
  })
})
