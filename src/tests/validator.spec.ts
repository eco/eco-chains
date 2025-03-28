import { validateChain } from "../validator"

describe('Validator tests', () => {

  it('validate', async () => {
    const obj = {
      id: 1,
      name: 'name',
      nativeCurrency: {
        decimals: 6,
        name: "ether",
        symbol: "ETH",
      }
    }
    expect(validateChain(obj)).toBe(true)
  })
})