import { hello } from '../index'

describe('hello tests', () => {
  it('hello returns a greeting', async () => {
    expect(hello('World')).toBe('Hello, World!')
  })
})
