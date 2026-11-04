import { getOpenStatus } from './hours'

const HOURS = { opensAt: 11, closesAt: 23, timeZone: 'Africa/Kampala' }

// Kampala is UTC+3 all year (no daylight saving).
const kampala = (hour: number, minute = 0) =>
  new Date(Date.UTC(2026, 10, 4, hour - 3, minute))

describe('getOpenStatus', () => {
  test('is open at noon Kampala time', () => {
    expect(getOpenStatus(kampala(12), HOURS)).toEqual({ isOpen: true, label: 'Open now · until 11pm' })
  })

  test('is open at exactly the opening hour', () => {
    expect(getOpenStatus(kampala(11), HOURS).isOpen).toBe(true)
  })

  test('is closed at exactly the closing hour', () => {
    expect(getOpenStatus(kampala(23), HOURS)).toEqual({ isOpen: false, label: 'Closed · opens 11am' })
  })

  test('is closed in the early morning', () => {
    expect(getOpenStatus(kampala(7, 30), HOURS).isOpen).toBe(false)
  })

  test('uses Kampala time, not the visitor clock', () => {
    // 21:30 UTC is 00:30 in Kampala, so closed even though it is evening in UTC.
    const lateUtc = new Date(Date.UTC(2026, 10, 4, 21, 30))
    expect(getOpenStatus(lateUtc, HOURS).isOpen).toBe(false)
  })
})
