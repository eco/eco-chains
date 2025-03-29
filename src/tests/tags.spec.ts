import typia from 'typia'
import { WebsocketTag } from '../tags'

describe('Typia Custom Tag tests', () => {
  beforeEach(() => {})

  describe('Websocket Tag', () => {
    it('should fail on undefined', async () => {
      type a = {
        wss: string & WebsocketTag
      }
      const obj = {}

      expect(typia.is<a>(obj)).toBe(false)
    })

    it('should fail on http', async () => {
      type a = {
        wss: string & WebsocketTag
      }
      const obj = {
        wss: 'http://example.com',
      }

      expect(typia.is<a>(obj)).toBe(false)
    })

    it('should succeed on websocket', async () => {
      type a = {
        wss: string & WebsocketTag
      }

      expect(
        typia.is<a>({
          wss: 'ws://eco-testnet.rpc.caldera.xyz',
        }),
      ).toBe(true)
      expect(
        typia.is<a>({
          wss: 'wss://eco-testnet.rpc.caldera.xyz/ws',
        }),
      ).toBe(true)
      expect(
        typia.is<a>({
          wss: 'ws://example.com',
        }),
      ).toBe(true)
      expect(
        typia.is<a>({
          wss: 'wss://example.com',
        }),
      ).toBe(true)
      expect(
        typia.is<a>({
          wss: 'ws://example.com:80',
        }),
      ).toBe(true)
      expect(
        typia.is<a>({
          wss: 'wss://example.com:8080/path',
        }),
      ).toBe(true)
      expect(
        typia.is<a>({
          wss: 'ws://localhost:3000',
        }),
      ).toBe(true)
    })
  })
})
