export interface OpeningHours {
  /** Hour of day (0–23) the store opens, inclusive. */
  opensAt: number
  /** Hour of day (1–24) the store closes, exclusive. */
  closesAt: number
  timeZone: string
}

export interface OpenStatus {
  isOpen: boolean
  label: string
}

export function formatHour(hour: number): string {
  const normalized = hour % 24
  const suffix = normalized < 12 ? 'am' : 'pm'
  const twelveHour = normalized % 12 === 0 ? 12 : normalized % 12
  return `${twelveHour}${suffix}`
}

function hourInZone(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  return hour + minute / 60
}

export function getOpenStatus(date: Date, hours: OpeningHours): OpenStatus {
  const now = hourInZone(date, hours.timeZone)
  const isOpen = now >= hours.opensAt && now < hours.closesAt
  return isOpen
    ? { isOpen, label: `Open now · until ${formatHour(hours.closesAt)}` }
    : { isOpen, label: `Closed · opens ${formatHour(hours.opensAt)}` }
}
