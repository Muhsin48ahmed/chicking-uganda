import type { OpeningHours } from '../lib/hours'

/**
 * Store facts, taken from chicking.ug (November 2026).
 * Edit here; every page reads from this file.
 */
export const SITE = {
  name: 'Chicking Uganda',
  tagline: "It's my choice",
  phone: '+256 746 141 414',
  /** Calls and WhatsApp, per the @chicking.uganda TikTok profile. The contact form sends here. */
  whatsapp: '+256 746 141 414',
  phoneAlt: '+256 747 121 212',
  hours: { opensAt: 11, closesAt: 23, timeZone: 'Africa/Kampala' } satisfies OpeningHours,
  hoursLabel: 'Every day, 11am – 11pm',
  services: ['Dine-in', 'Takeaway', 'Delivery'],
  globalSite: 'https://www.chickingglobal.com',
  franchiseForm: 'https://www.chickingglobal.com',
} as const

export interface StoreLocation {
  id: string
  name: string
  address: string
  phone: string
  latitude: number
  longitude: number
  mapEmbedUrl: string
}

export const LOCATIONS: readonly StoreLocation[] = [
  {
    id: 'jumbo-plaza',
    name: 'Jumbo Plaza, Kampala',
    address: 'Jumbo Plaza, 2 Parliament Avenue, Kampala',
    phone: SITE.phone,
    latitude: 0.3130469,
    longitude: 32.5847284,
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7587684469786!2d32.5847284!3d0.3130468999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbd8aac094ee7%3A0x658fbb5b60399e4!2sChicking%20Uganda!5e0!3m2!1sen!2sug!4v1754895167837!5m2!1sen!2sug',
  },
]

export function directionsUrl(location: StoreLocation): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`
}

export const DELIVERY_PARTNERS = [
  { name: 'Glovo', url: 'https://glovoapp.com/en/ug/kampala/stores/chicking-uganda-kpa' },
] as const

export const SOCIAL_LINKS = [
  { name: 'Facebook', handle: 'chickingugandaofficial', url: 'https://www.facebook.com/chickingugandaofficial/' },
  { name: 'TikTok', handle: '@chicking.uganda', url: 'https://www.tiktok.com/@chicking.uganda' },
] as const

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/deals', label: 'Deals' },
  { to: '/locations', label: 'Find us' },
  { to: '/about', label: 'Our story' },
  { to: '/franchise', label: 'Franchise' },
  { to: '/contact', label: 'Contact' },
] as const
