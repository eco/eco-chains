import typia from 'typia'
import { IChain } from './chain.interface'

/**
 * Validates a chain configuration against the IChain interface schema
 * Uses typia for runtime type validation
 *
 * @param chainJson - The chain configuration object to validate
 * @returns boolean indicating whether the chain configuration is valid
 */
export function validateChain(chainJson: IChain): boolean {
  return typia.is<IChain>(chainJson)
}
