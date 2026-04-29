import bs58check from 'bs58check'
import { fromTronBase58, toTronBase58 } from '../tron-address'

// Well-known Tron addresses for round-trip testing
const KNOWN = [
  {
    base58: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // USDT on Tron
    hex: '0xa614f803b6fd780986a42c78ec9c7f77e6ded13c' as const,
  },
  {
    base58: 'TQd22wygQNcAJt1yRwtPj8wApXtUHYXGhN',
    hex: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' as const,
  },
]

describe('toTronBase58', () => {
  it.each(KNOWN)('converts hex $hex to base58 $base58', ({ hex, base58 }) => {
    expect(toTronBase58(hex)).toBe(base58)
  })

  it('throws on a hex address shorter than 20 bytes', () => {
    expect(() => toTronBase58('0xdeadbeef' as any)).toThrow(
      'Invalid Tron hex address',
    )
  })

  it('throws on a hex address longer than 20 bytes', () => {
    const tooLong = ('0x' + 'aa'.repeat(21)) as any
    expect(() => toTronBase58(tooLong)).toThrow('Invalid Tron hex address')
  })
})

describe('fromTronBase58', () => {
  it.each(KNOWN)('converts base58 $base58 to hex $hex', ({ base58, hex }) => {
    expect(fromTronBase58(base58).toLowerCase()).toBe(hex.toLowerCase())
  })

  it('throws on an invalid base58 string', () => {
    expect(() => fromTronBase58('notavalidaddress')).toThrow()
  })

  it('throws on a base58 address with wrong prefix byte', () => {
    // Encode a 21-byte payload with prefix 0x42 instead of 0x41
    const payload = new Uint8Array(21).fill(0)
    payload[0] = 0x42
    const wrongPrefix = bs58check.encode(payload)
    expect(() => fromTronBase58(wrongPrefix)).toThrow(
      'Invalid Tron base58 address',
    )
  })
})

describe('round-trip', () => {
  it.each(KNOWN)('hex → base58 → hex is identity for $hex', ({ hex }) => {
    expect(fromTronBase58(toTronBase58(hex)).toLowerCase()).toBe(
      hex.toLowerCase(),
    )
  })

  it.each(KNOWN)(
    'base58 → hex → base58 is identity for $base58',
    ({ base58 }) => {
      expect(toTronBase58(fromTronBase58(base58))).toBe(base58)
    },
  )
})
