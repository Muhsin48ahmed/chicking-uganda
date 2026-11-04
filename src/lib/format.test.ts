import { formatUGX, telHref, whatsappHref } from './format'

describe('formatUGX', () => {
  test('formats whole shillings with thousands separators', () => {
    expect(formatUGX(24000)).toBe('UGX 24,000')
  })

  test('formats six-figure bucket prices', () => {
    expect(formatUGX(104500)).toBe('UGX 104,500')
  })

  test('throws on negative or non-integer amounts', () => {
    expect(() => formatUGX(-1)).toThrow()
    expect(() => formatUGX(10.5)).toThrow()
  })
})

describe('phone links', () => {
  test('telHref strips spaces and keeps the leading plus', () => {
    expect(telHref('+256 746 141 414')).toBe('tel:+256746141414')
  })

  test('whatsappHref uses digits only and encodes the message', () => {
    expect(whatsappHref('+256 746 141 414', 'Hi & hello')).toBe(
      'https://wa.me/256746141414?text=Hi%20%26%20hello',
    )
  })

  test('whatsappHref without a message has no query string', () => {
    expect(whatsappHref('+256746141414')).toBe('https://wa.me/256746141414')
  })
})
