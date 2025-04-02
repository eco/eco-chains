//----
// DEFINE CUSTOM TYPE TAGS

import { tags } from 'typia'

/**
 * Custom tag for validating WebSocket URLs
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
