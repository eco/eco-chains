/**
 * Custom type tags for runtime validation
 * These tags extend typia's validation system to handle specific formats
 */

import { tags } from 'typia'

/**
 * Custom tag for validating WebSocket URLs
 * Validates that strings match the WebSocket protocol format (ws:// or wss://)
 * Used to ensure WebSocket URLs are correctly formatted in chain configurations
 */
export type WebsocketTag = tags.TagBase<{
  kind: 'wss'
  target: 'string'
  value: undefined
  validate: `(() => {
    const regex = new RegExp("^(wss?):\\/\\/((\\d{1,3}(?:\\.\\d{1,3}){3})|localhost|(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))(:[0-9]{1,5})?(\\/.*)?$")
    return regex.test($input)
})()`
}>
