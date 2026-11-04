import { assetUrl } from '../lib/assetUrl'

/**
 * Recurring offers. The pizza and Mega Friday deals come from Chicking
 * Uganda's TikTok posts (November 2026); keep prices in step with them.
 */
export interface Deal {
  id: string
  title: string
  kicker: string
  body: string
  image?: string
  menuItemId?: string
  isWeekly?: boolean
  /** TikTok video for this deal, see src/data/videos.ts. */
  videoId?: string
}

export const DEALS: readonly Deal[] = [
  {
    id: 'pizza-bogo',
    kicker: 'Every Wednesday & Saturday',
    title: 'Buy 1 pizza, get 1 free',
    body: 'Medium UGX 31,000 or Large UGX 41,000, and the second pizza is on us. Bring a friend, or keep both.',
    isWeekly: true,
    videoId: '7699034856277216520',
  },
  {
    id: 'mega-friday',
    kicker: 'Every Friday',
    title: 'Mega Friday',
    body: '10 pcs of chicken for UGX 51,000. Add fries, coleslaw or a drink from UGX 3,000.',
    image: assetUrl('/images/menu/super-saver.webp'),
    isWeekly: true,
    videoId: '7702364846255279367',
  },
  {
    id: 'super-saver',
    kicker: 'From UGX 47,000',
    title: 'Super Saver buckets',
    body: '6, 9, 12 or 15 pieces with fries, coleslaw, garlic dips and buns. Mix Original, Spicy and Grilled.',
    image: assetUrl('/images/menu/super-saver.webp'),
    menuItemId: 'super-saver-12',
  },
  {
    id: 'crunchy-box',
    kicker: 'UGX 24,000',
    title: 'Crunchy Box',
    body: 'Three ways to a full meal: chicken and rice, wrap and chicken, or burger and chicken, each with a Coke.',
    image: assetUrl('/images/menu/crunchy-box-c3.webp'),
    menuItemId: 'crunchy-box-c3',
  },
  {
    id: 'kids-toy',
    kicker: 'UGX 13,500',
    title: 'A free toy with every kids meal',
    body: 'Nuggets, Chick-Pop, a kid-size burger or chicken, plus fries, juice and a surprise.',
    image: assetUrl('/images/menu/kids-meal.webp'),
    menuItemId: 'kids-nuggets',
  },
  {
    id: 'combo',
    kicker: '+ UGX 7,000',
    title: 'Make any burger a combo',
    body: 'Add regular fries and a drink to any burger, wrap or tacos.',
    image: assetUrl('/images/menu/combo-add-on.webp'),
    menuItemId: 'combo-add-on',
  },
]

export const MENU_BOARDS = [
  { src: assetUrl('/images/menu/board-1.webp'), alt: 'Menu board: Crunchy Box and individual meals' },
  { src: assetUrl('/images/menu/board-2.webp'), alt: 'Menu board: burgers, wraps, tacos and combos' },
  { src: assetUrl('/images/menu/board-3.webp'), alt: 'Menu board: wings, rice, kids corner and sides' },
  { src: assetUrl('/images/menu/board-4.webp'), alt: 'Menu board: Chicken Lover, Share and Variety buckets' },
  { src: assetUrl('/images/menu/board-5.webp'), alt: 'Menu board: Super Saver buckets' },
] as const
