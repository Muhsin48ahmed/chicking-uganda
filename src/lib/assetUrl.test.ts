import { assetUrl } from './assetUrl'

describe('assetUrl', () => {
  test('prefixes the base path and avoids a double slash', () => {
    expect(assetUrl('/images/brand/logo.png')).toBe(`${import.meta.env.BASE_URL}images/brand/logo.png`)
    expect(assetUrl('images/brand/logo.png')).toBe(`${import.meta.env.BASE_URL}images/brand/logo.png`)
  })
})
