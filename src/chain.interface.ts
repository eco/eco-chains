import { tags } from 'typia'
import { Chain, ChainConfig, ChainFormatters, Hex } from 'viem'
import { WebsocketTag } from './tags'

/**
 * Core interface for blockchain chains
 * Extends viem's Chain interface with additional properties required by Eco
 */
export interface IChain<
  formatters extends ChainFormatters | undefined = ChainFormatters | undefined,
  custom extends Record<string, unknown> | undefined =
    | Record<string, unknown>
    | undefined,
> extends Chain<formatters, custom>,
    ChainConfig<formatters, custom> {
  /** Collection of block explorers */
  blockExplorers?:
    | {
        [key: string]: IChainBlockExplorer
        default: IChainBlockExplorer
      }
    | undefined
  /** ID in number form */
  id: number
  /** Human-readable name */
  name: string
  /** Currency used by chain */
  nativeCurrency: IChainNativeCurrency
  /** Collection of RPC endpoints */
  rpcUrls: {
    [key: string]: IChainRpcUrls
    default: IChainRpcUrls
  }
  /** Source Chain ID (ie. the L1 chain) */
  sourceId?: number | undefined
  /** Flag for test networks */
  testnet?: boolean | undefined
}

/**
 * Extended Chain interface with Eco-specific attributes
 * Extends viem's Chain type with additional properties for Eco chains
 */
export type EcoChain<
  formatters extends ChainFormatters | undefined = ChainFormatters | undefined,
  custom extends Record<string, unknown> | undefined =
    | Record<string, unknown>
    | undefined,
> = Chain<formatters, custom> & {
  /** Flag indicating if this is a Caldera chain */
  isCalderaChain: boolean
  stables?: Record<string, Hex>
}

export interface IChainNativeCurrency {
  /** Human-readable name */
  name: string & tags.MinLength<2> & tags.MaxLength<6>

  /** Symbol of the currency */
  symbol: string

  /** Decimals of the currency */
  decimals: number
}

export interface IChainRpcUrls {
  http: Array<string & tags.Format<'url'>> & tags.MinItems<1>
  webSocket?: Array<string | (undefined & WebsocketTag)>
}

export interface IChainBlockExplorer {
  name: string
  url: string & tags.Format<'url'>
  apiUrl?: string | (undefined & tags.Format<'url'>)
}
