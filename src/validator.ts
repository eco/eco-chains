import typia from 'typia'
import { IChain } from './chain.interface'

export function validateChain(chainJson: IChain): boolean {
  return typia.is<IChain>(chainJson)
}
