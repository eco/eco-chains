const mockViemExtract = jest.fn()
import { cloneDeep } from 'lodash'
import { EcoChains } from '../eco.chains'
import { arcTestnet } from '../definitions/arc'

// getChain shallow-copies rpcUrls, so RPC url groups on the shared chain
// definitions are mutated across calls. Mirror eco.chains.spec.ts and return
// a deep clone from extractChain so each test gets a pristine definition.
jest.mock('viem', () => {
  return {
    ...jest.requireActual('viem'),
    extractChain: mockViemExtract,
  }
})

describe('Arc Testnet chain', () => {
  const ARC_TESTNET_CHAIN_ID = 5042002

  beforeEach(() => {
    mockViemExtract.mockReset()
    mockViemExtract.mockImplementation((args) =>
      cloneDeep(jest.requireActual('viem').extractChain(args)),
    )
  })

  it('should define the arc testnet chain correctly', () => {
    expect(arcTestnet.id).toBe(ARC_TESTNET_CHAIN_ID)
    expect(arcTestnet.name).toBe('Arc Testnet')
    expect(arcTestnet.testnet).toBe(true)
    expect(arcTestnet.isCalderaChain).toBe(false)
    // Arc native gas token is USDC with 18-decimal native accounting
    expect(arcTestnet.nativeCurrency).toEqual({
      name: 'USDC',
      symbol: 'USDC',
      decimals: 18,
    })
    expect(arcTestnet.contracts?.multicall3).toEqual({
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 0,
    })
    expect(arcTestnet.blockExplorers?.default).toEqual({
      name: 'ArcScan',
      url: 'https://testnet.arcscan.app',
      apiUrl: 'https://testnet.arcscan.app/api',
    })
  })

  it('should be retrievable through EcoChains by chain id', () => {
    const ecoChains = new EcoChains({})
    const chain = ecoChains.getChain(ARC_TESTNET_CHAIN_ID)
    expect(chain).toBeDefined()
    expect(chain.id).toBe(ARC_TESTNET_CHAIN_ID)
    expect(chain.name).toBe('Arc Testnet')
  })

  it('should replace the alchemy api key in rpc urls', () => {
    const ecoChains = new EcoChains({ alchemyKey: 'test_alchemy_key' })
    const chain = ecoChains.getChain(ARC_TESTNET_CHAIN_ID)
    expect(chain.rpcUrls.alchemy.http).toEqual([
      'https://arc-testnet.g.alchemy.com/v2/test_alchemy_key',
    ])
    expect(chain.rpcUrls.alchemy.webSocket).toEqual([
      'wss://arc-testnet.g.alchemy.com/v2/test_alchemy_key',
    ])
  })

  it('should filter out alchemy rpc urls when no api key is provided', () => {
    const ecoChains = new EcoChains({})
    const chain = ecoChains.getChain(ARC_TESTNET_CHAIN_ID)
    expect(chain.rpcUrls.alchemy.http).toEqual([])
    expect(chain.rpcUrls.alchemy.webSocket).toEqual([])
    // Default public RPCs remain untouched
    expect(chain.rpcUrls.default.http).toEqual([
      'https://rpc.testnet.arc.network',
    ])
  })

  it('should return the USDC stable for the arc testnet', () => {
    const ecoChains = new EcoChains({})
    const stables = ecoChains.getStablesForChain(ARC_TESTNET_CHAIN_ID)
    expect(stables.USDC).toEqual({
      address: '0x3600000000000000000000000000000000000000',
      decimals: 6,
    })
  })

  it('should be classified as a testnet chain', () => {
    const ecoChains = new EcoChains({})
    const testnetIds = ecoChains.getTestnetChains().map((chain) => chain.id)
    const mainnetIds = ecoChains.getMainnetChains().map((chain) => chain.id)
    expect(testnetIds).toContain(ARC_TESTNET_CHAIN_ID)
    expect(mainnetIds).not.toContain(ARC_TESTNET_CHAIN_ID)
  })

  it('should not define an arc mainnet chain yet (pending Circle mainnet details)', () => {
    const ecoChains = new EcoChains({})
    const ARC_MAINNET_CHAIN_ID = 5042
    const allIds = ecoChains.getAllChains().map((chain) => chain.id)
    expect(allIds).not.toContain(ARC_MAINNET_CHAIN_ID)
  })
})
