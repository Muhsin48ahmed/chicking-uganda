/**
 * Menu and prices transcribed from the in-store menu boards on chicking.ug
 * (images/2025/08/11/led-1..5.jpg). Update prices here only.
 */

export type Flavour = 'original' | 'spicy' | 'grilled'

export type CategoryId =
  | 'buckets'
  | 'meals'
  | 'burgers'
  | 'wings'
  | 'rice'
  | 'kids'
  | 'sides'
  | 'drinks'

export interface MenuCategory {
  id: CategoryId
  name: string
  blurb: string
}

export interface Price {
  amount: number
  label?: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  category: CategoryId
  prices: readonly Price[]
  image?: string
  flavours?: readonly Flavour[]
  badge?: string
  serves?: string
}

const img = (name: string) => `/images/menu/${name}.webp`
const ORIGINAL_SPICY: readonly Flavour[] = ['original', 'spicy']
const ALL_FLAVOURS: readonly Flavour[] = ['original', 'spicy', 'grilled']

export const MENU_CATEGORIES: readonly MenuCategory[] = [
  { id: 'buckets', name: 'Buckets', blurb: 'Feed the whole family. Choose Original, Spicy or Grilled.' },
  { id: 'meals', name: 'Meals & Boxes', blurb: 'Complete meals for one, with fries, sides and a drink.' },
  { id: 'burgers', name: 'Burgers & Wraps', blurb: 'Crunchy fillets, stacked high. Add a combo for UGX 7,000.' },
  { id: 'wings', name: 'Wings', blurb: 'Hot, crispy, saucy. Six pieces a box.' },
  { id: 'rice', name: 'Rice Delites', blurb: 'Fragrant flavoured rice, plain or loaded with strips.' },
  { id: 'kids', name: 'Kids Corner', blurb: 'A free toy with every kids meal.' },
  { id: 'sides', name: 'Sides & Snacks', blurb: 'Fries, bites, slaw and everything in between.' },
  { id: 'drinks', name: 'Drinks', blurb: 'Ice-cold refreshment.' },
]

export const MENU_ITEMS: readonly MenuItem[] = [
  // Buckets
  {
    id: 'super-saver-6', name: 'Super Saver · 6 pcs', category: 'buckets', image: img('super-saver'),
    description: '6 pcs chicken, regular fries, regular coleslaw, 2 garlic dips, 3 buns.',
    prices: [{ amount: 47000 }], flavours: ALL_FLAVOURS, serves: '2–3',
  },
  {
    id: 'super-saver-9', name: 'Super Saver · 9 pcs', category: 'buckets', image: img('super-saver'),
    description: '9 pcs chicken, regular fries, 2 regular coleslaw, 2 garlic dips, 3 buns.',
    prices: [{ amount: 69000 }], flavours: ALL_FLAVOURS, serves: '3–4',
  },
  {
    id: 'super-saver-12', name: 'Super Saver · 12 pcs', category: 'buckets', image: img('super-saver'),
    description: '12 pcs chicken, 2 regular fries, 2 regular coleslaw, 3 garlic dips, 4 buns, 1L Coke.',
    prices: [{ amount: 84000 }], flavours: ALL_FLAVOURS, serves: '4–5', badge: 'Best value',
  },
  {
    id: 'super-saver-15', name: 'Super Saver · 15 pcs', category: 'buckets', image: img('super-saver'),
    description: '15 pcs chicken, 2 regular fries, 3 regular coleslaw, 4 garlic dips, 5 buns, 1L Coke.',
    prices: [{ amount: 97000 }], flavours: ALL_FLAVOURS, serves: '5–6',
  },
  {
    id: 'chicken-lover-bucket', name: 'Chicken Lover Bucket', category: 'buckets', image: img('chicken-lover-bucket'),
    description: '8 pcs chicken, 8 pcs wings, regular fries, regular coleslaw and flavoured rice.',
    prices: [{ amount: 82000 }], serves: '3–4',
  },
  {
    id: 'share-bucket', name: 'Share Bucket', category: 'buckets', image: img('share-bucket'),
    description: '9 pcs chicken, 9 pcs wings, 3 Punch burgers, 2 regular fries, 2 regular coleslaw.',
    prices: [{ amount: 104500 }], serves: '5–6',
  },
  {
    id: 'variety-bucket', name: 'Chicken Variety Bucket', category: 'buckets', image: img('variety-bucket'),
    description: '11 pcs chicken, 10 strips, 3 coleslaw, 3 fries, 3 buns, 2 garlic dips, 2L Coke.',
    prices: [{ amount: 110000 }], serves: '6+', badge: 'Party size',
  },

  // Meals & boxes
  {
    id: 'royal-match', name: 'Royal Match', category: 'meals', image: img('royal-match'),
    description: '1 pc chicken with regular fries.', prices: [{ amount: 10000 }], flavours: ALL_FLAVOURS,
  },
  {
    id: 'royal-snack', name: 'Royal Snack', category: 'meals', image: img('royal-snack'),
    description: '2 pcs chicken, regular fries, a bun and a Coke.', prices: [{ amount: 17000 }], flavours: ALL_FLAVOURS,
  },
  {
    id: 'crunchy-box-c1', name: 'Crunchy Box C1', category: 'meals', image: img('crunchy-box-c1'),
    description: '2 pcs chicken, flavoured rice and a Coke.', prices: [{ amount: 24000 }],
  },
  {
    id: 'crunchy-box-c2', name: 'Crunchy Box C2', category: 'meals', image: img('crunchy-box-c2'),
    description: 'Royal Wrap, 1 pc chicken, regular fries and a Coke.', prices: [{ amount: 24000 }],
  },
  {
    id: 'crunchy-box-c3', name: 'Crunchy Box C3', category: 'meals', image: img('crunchy-box-c3'),
    description: 'Royal Crunchy burger, 1 pc chicken, regular fries and a Coke.', prices: [{ amount: 24000 }],
  },
  {
    id: 'strips-meal', name: 'Strips Meal', category: 'meals', image: img('strips-meal'),
    description: '5 boneless strips, regular fries, regular coleslaw, a bun and a Coke.', prices: [{ amount: 27000 }],
  },
  {
    id: 'budget-meal', name: 'Budget Meal', category: 'meals', image: img('budget-meal'),
    description: '3 pcs chicken, regular fries, regular coleslaw, a bun and a Coke.', prices: [{ amount: 28000 }],
    flavours: ALL_FLAVOURS, badge: 'Fan favourite',
  },

  // Burgers & wraps
  {
    id: 'royal-crunchy', name: 'Royal Crunchy', category: 'burgers', image: img('royal-crunchy'),
    description: 'Crispy chicken fillet, lettuce and creamy mayo in a sesame bun.', prices: [{ amount: 12500 }],
    flavours: ORIGINAL_SPICY,
  },
  {
    id: 'tandoori-burger', name: 'Tandoori Burger', category: 'burgers', image: img('tandoori-burger'),
    description: 'Tandoori-spiced crunchy fillet with lettuce and house sauce.', prices: [{ amount: 12500 }],
    flavours: ['spicy'],
  },
  {
    id: 'crunchy-supreme', name: 'Crunchy Supreme', category: 'burgers', image: img('crunchy-supreme'),
    description: 'A long sub of crunchy chicken, cheese, lettuce and mayo.', prices: [{ amount: 14000 }],
    flavours: ORIGINAL_SPICY,
  },
  {
    id: 'mexi-crunchy', name: 'Mexi Crunchy', category: 'burgers', image: img('mexi-crunchy'),
    description: 'Crunchy chicken sub with jalapeños, cheese and a Mexican kick.', prices: [{ amount: 14000 }],
    flavours: ORIGINAL_SPICY,
  },
  {
    id: 'big-beef-burger', name: 'Big Beef Burger', category: 'burgers', image: img('big-beef-burger'),
    description: 'Flame-grilled beef patty, cheese, tomato, onion and pickles.', prices: [{ amount: 14000 }],
    flavours: ['grilled'],
  },
  {
    id: 'royal-wrap', name: 'Royal Wrap', category: 'burgers', image: img('royal-wrap'),
    description: 'Crispy chicken pieces, fresh salad and garlic mayo in a soft tortilla.', prices: [{ amount: 14000 }],
    flavours: ORIGINAL_SPICY,
  },
  {
    id: 'tacos', name: 'Tacos', category: 'burgers', image: img('tacos'),
    description: 'Two toasted chicken tacos with cheese and pickled jalapeños.', prices: [{ amount: 15500 }],
    flavours: ORIGINAL_SPICY,
  },
  {
    id: 'double-crunchy', name: 'Double Crunchy', category: 'burgers', image: img('double-crunchy'),
    description: 'Two crunchy fillets and melted cheese. Seriously big.', prices: [{ amount: 18000 }],
    flavours: ORIGINAL_SPICY, badge: 'Big appetite',
  },
  {
    id: 'combo-add-on', name: 'Make it a combo', category: 'burgers', image: img('combo-add-on'),
    description: 'Add regular fries and a drink to any burger or wrap.', prices: [{ amount: 7000, label: 'add' }],
  },

  // Wings
  {
    id: 'fried-wings', name: 'Hot Fried Wings · 6 pcs', category: 'wings', image: img('fried-wings'),
    description: 'Six crispy fried wings with a fiery coating.', prices: [{ amount: 12000 }], flavours: ['spicy'],
  },
  {
    id: 'mexican-wings', name: 'Mexican Wings · 6 pcs', category: 'wings', image: img('mexican-wings'),
    description: 'Six grilled wings glazed in smoky Mexican sauce.', prices: [{ amount: 16000 }], flavours: ['grilled'],
  },

  // Rice
  {
    id: 'flavoured-rice', name: 'Flavoured Rice', category: 'rice', image: img('flavoured-rice'),
    description: 'Fragrant yellow rice with peas and peppers.', prices: [{ amount: 7500 }],
  },
  {
    id: 'strips-rice', name: 'Chicking Strips Rice', category: 'rice', image: img('strips-rice'),
    description: 'Flavoured rice topped with crispy chicken strips.', prices: [{ amount: 12000 }],
  },
  {
    id: 'rice-add-on', name: 'Chilli mayo or garlic dip', category: 'rice',
    description: 'Add a dip to any rice bowl.', prices: [{ amount: 1500, label: 'add' }],
  },

  // Kids
  {
    id: 'kids-nuggets', name: 'Kids Meal A · Nuggets', category: 'kids', image: img('kids-meal'),
    description: '5 pcs chicken nuggets, fries, juice and a free toy.', prices: [{ amount: 13500 }],
  },
  {
    id: 'kids-chick-pop', name: 'Kids Meal B · Chick-Pop', category: 'kids', image: img('chick-pop'),
    description: 'Popcorn chicken (original or spicy), fries, juice and a free toy.', prices: [{ amount: 13500 }],
  },
  {
    id: 'kids-burger', name: "Kids Meal C · Kid's Burger", category: 'kids', image: img('royal-crunchy'),
    description: 'A kid-size chicken burger, fries, juice and a free toy.', prices: [{ amount: 13500 }],
  },
  {
    id: 'kids-chicken', name: 'Kids Meal D · Chicken', category: 'kids', image: img('royal-match'),
    description: '1 pc chicken, fries, juice and a free toy.', prices: [{ amount: 13500 }],
  },

  // Sides
  {
    id: 'crispy-fries', name: 'Crispy Fries', category: 'sides', image: img('crispy-fries'),
    description: 'Golden, salted, crunchy.', prices: [{ amount: 6000, label: 'Regular' }, { amount: 9000, label: 'Large' }],
  },
  {
    id: 'tandoori-fries', name: 'Tandoori Fries', category: 'sides', image: img('tandoori-fries'),
    description: 'Fries dusted in our tandoori spice blend.',
    prices: [{ amount: 7000, label: 'Regular' }, { amount: 10000, label: 'Large' }], flavours: ['spicy'],
  },
  {
    id: 'coleslaw', name: 'Coleslaw', category: 'sides', image: img('coleslaw'),
    description: 'Creamy, crunchy house slaw.', prices: [{ amount: 5000, label: 'Regular' }, { amount: 7500, label: 'Large' }],
  },
  {
    id: 'chick-pop', name: 'Chick Pop', category: 'sides', image: img('chick-pop'),
    description: 'Bite-size popcorn chicken.', prices: [{ amount: 8000, label: 'Regular' }, { amount: 12000, label: 'Large' }],
    flavours: ORIGINAL_SPICY,
  },
  {
    id: 'tandoori-bites', name: 'Tandoori Bites · 9 pcs', category: 'sides', image: img('tandoori-bites'),
    description: 'Boneless tandoori chicken bites.', prices: [{ amount: 8000 }], flavours: ['spicy'],
  },
  {
    id: 'nuggets', name: 'Chicken Nuggets · 5 pcs', category: 'sides', image: img('nuggets'),
    description: 'Tender nuggets with dip.', prices: [{ amount: 9000 }],
  },

  // Drinks
  {
    id: 'soda', name: 'Soft drink · 500ml', category: 'drinks', image: img('drinks'),
    description: 'Coca-Cola and friends, ice cold.', prices: [{ amount: 3000 }],
  },
  {
    id: 'water', name: 'Water · 500ml', category: 'drinks',
    description: 'Still mineral water.', prices: [{ amount: 2500 }],
  },
]

export function getItemsByCategory(categoryId: CategoryId): readonly MenuItem[] {
  return MENU_ITEMS.filter((item) => item.category === categoryId)
}

export function getItemById(id: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.id === id)
}

export const FEATURED_ITEM_IDS = [
  'double-crunchy', 'budget-meal', 'mexican-wings', 'tacos', 'strips-meal', 'crunchy-supreme',
] as const
