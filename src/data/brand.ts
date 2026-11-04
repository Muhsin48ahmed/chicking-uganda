/**
 * Brand copy, drawn from chicking.ug and chickingglobal.com.
 * Group stats follow chickingglobal.com, the most recent source.
 */

export const BRAND_STATS = [
  { value: '2000', label: 'Founded in Dubai' },
  { value: '36+', label: 'Countries' },
  { value: '475+', label: 'Outlets worldwide' },
  { value: '100%', label: 'Halal, always' },
] as const

export type FactIcon = 'halal' | 'flame' | 'leaf' | 'choice' | 'globe' | 'party'

export const FUN_FACTS: ReadonlyArray<{ icon: FactIcon; title: string; body: string }> = [
  { icon: 'halal', title: 'Halal compliant', body: 'One of the first fully halal international quick-service restaurant brands.' },
  { icon: 'flame', title: 'King of spice', body: 'A special blend of herbs and spices for anyone who wants their meal hot.' },
  { icon: 'leaf', title: 'Made fresh to order', body: 'Everything is cooked when you order it, using fresh chicken that is never frozen.' },
  { icon: 'choice', title: "It's your choice", body: 'Every piece comes your way: Original, Spicy or Grilled.' },
  { icon: 'globe', title: 'International brand', body: 'Recipes refined across six continents, served right here in Kampala.' },
  { icon: 'party', title: 'Perfect for catering', body: 'Buckets and boxes that feed the office, the wedding or the whole family.' },
]

export const WORLD_FLAVOURS = [
  { name: 'Authentic American', example: 'Crunchy Supreme, Double Crunchy' },
  { name: 'Mouthwatering Mexican', example: 'Mexi Crunchy, Mexican Wings, Tacos' },
  { name: 'Inspiring Indian', example: 'Tandoori Burger, Tandoori Bites' },
  { name: 'Irresistible Italian', example: 'Weekend pizza specials' },
] as const

export const FRANCHISE_MODELS = [
  { title: 'Master franchise', body: 'Exclusive rights to develop Chicking across a country or region, including sub-franchising.' },
  { title: 'Area developer', body: 'Open and operate several outlets within an agreed territory and timeline.' },
  { title: 'Unit franchise', body: 'Own and run a single Chicking restaurant, food-court kiosk or drive-thru.' },
] as const

export const FRANCHISE_FORMATS = ['Food courts', 'Dine-in restaurants', 'Kiosks', 'Standalone stores', 'Drive-thru'] as const
