import bs58check from 'bs58check'
import { Hex } from 'viem'

/**
 * Tron's mainnet address prefix byte (0x41), prepended to the 20-byte
 * address payload before base58check encoding.
 */
const TRON_ADDRESS_PREFIX = 0x41

/**
 * Convert a 0x-prefixed 20-byte EVM-style hex address to a Tron base58
 * (T-prefixed) address.
 *
 * eco-chains exposes all addresses — including Tron — as 0x-prefixed hex
 * for consistency across chains. Use this when you need to display or
 * send an address in Tron's native base58 form (e.g. explorers, wallets,
 * user-facing UI).
 *
 * @param hex - 0x-prefixed 20-byte hex address (42 chars total)
 * @returns Tron base58check address (e.g. "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t")
 */
export function toTronBase58(hex: Hex): string {
  const hexStr = hex.slice(2)
  if (hexStr.length !== 40) {
    throw new Error(
      `Invalid Tron hex address: expected 20 bytes, got ${hexStr.length / 2}`,
    )
  }
  const payload = new Uint8Array(21)
  payload[0] = TRON_ADDRESS_PREFIX
  for (let i = 0; i < 20; i++) {
    payload[i + 1] = parseInt(hexStr.slice(i * 2, i * 2 + 2), 16)
  }
  return bs58check.encode(payload)
}

/**
 * Convert a Tron base58 (T-prefixed) address to a 0x-prefixed 20-byte
 * EVM-style hex address.
 *
 * The 0x41 Tron prefix byte is stripped so the returned hex matches the
 * format used throughout eco-chains and is directly comparable with
 * addresses on other chains.
 *
 * @param base58 - Tron base58check address
 * @returns 0x-prefixed 20-byte hex address
 */
export function fromTronBase58(base58: string): Hex {
  const decoded = bs58check.decode(base58)
  if (decoded.length !== 21 || decoded[0] !== TRON_ADDRESS_PREFIX) {
    throw new Error(`Invalid Tron base58 address: ${base58}`)
  }
  const hex = Array.from(decoded.slice(1))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `0x${hex}` as Hex
}
