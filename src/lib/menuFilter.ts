import type { Flavour, MenuItem } from '../data/menu'

export type FlavourFilter = Flavour | 'all'

export interface MenuFilter {
  flavour: FlavourFilter
  query: string
}

export function filterMenu(items: readonly MenuItem[], filter: MenuFilter): MenuItem[] {
  const query = filter.query.trim().toLowerCase()
  return items.filter((item) => {
    const matchesFlavour = filter.flavour === 'all' || (item.flavours?.includes(filter.flavour) ?? false)
    const matchesQuery =
      query.length === 0 || item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
    return matchesFlavour && matchesQuery
  })
}
