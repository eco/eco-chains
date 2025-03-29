import { validateChain } from '../validator'

describe('Validator tests', () => {
  let validChain: any = {}

  beforeEach(() => {
    validChain = {
      id: 7777777,
      name: 'Zora',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.zora.energy'],
          webSocket: ['wss://rpc.zora.energy'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.zora.energy' },
      },
      contracts: {
        multicall3: {
          address: '0xcA11bde05977b3631167028862bE2a173976CA11',
          blockCreated: 5882,
        },
      },
    } as any
  })
  it('should fail validation when required variable is missing', async () => {
    validChain.id = undefined
    expect(validateChain(validChain)).toBe(false)
  })

  it('should fail validation when variable is wrong type', async () => {
    validChain.id = 'some string'
    expect(validateChain(validChain)).toBe(false)
  })

  it('should pass validation', async () => {
    expect(validateChain(validChain)).toBe(true)
  })
})
