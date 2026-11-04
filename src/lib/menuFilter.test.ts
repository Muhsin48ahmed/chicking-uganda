import type { MenuItem } from '../data/menu'
import { filterMenu } from './menuFilter'

const items: MenuItem[] = [
  { id: 'a', name: 'Royal Crunchy', description: 'Crispy fillet', category: 'burgers', prices: [{ amount: 1 }], flavours: ['original', 'spicy'] },
  { id: 'b', name: 'Mexican Wings', description: 'Smoky grilled wings', category: 'wings', prices: [{ amount: 1 }], flavours: ['grilled'] },
  { id: 'c', name: 'Coleslaw', description: 'Creamy slaw', category: 'sides', prices: [{ amount: 1 }] },
]

describe('filterMenu', () => {
  test('returns everything with no filters', () => {
    expect(filterMenu(items, { flavour: 'all', query: '' })).toHaveLength(3)
  })

  test('filters by flavour and drops items with no flavour', () => {
    expect(filterMenu(items, { flavour: 'grilled', query: '' }).map((i) => i.id)).toEqual(['b'])
  })

  test('matches the query against name and description, case-insensitively', () => {
    expect(filterMenu(items, { flavour: 'all', query: '  CRISPY ' }).map((i) => i.id)).toEqual(['a'])
    expect(filterMenu(items, { flavour: 'all', query: 'slaw' }).map((i) => i.id)).toEqual(['c'])
  })

  test('combines flavour and query', () => {
    expect(filterMenu(items, { flavour: 'spicy', query: 'wings' })).toHaveLength(0)
  })
})
