import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { MENU_CATEGORIES, MENU_ITEMS, getItemsByCategory } from './menu'

describe('menu data', () => {
  test('every item id is unique', () => {
    const ids = MENU_ITEMS.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('every item belongs to a known category', () => {
    const categoryIds = new Set(MENU_CATEGORIES.map((c) => c.id))
    MENU_ITEMS.forEach((item) => expect(categoryIds.has(item.category)).toBe(true))
  })

  test('every price is a positive whole number of shillings', () => {
    MENU_ITEMS.flatMap((item) => item.prices).forEach((price) => {
      expect(Number.isInteger(price.amount)).toBe(true)
      expect(price.amount).toBeGreaterThan(0)
    })
  })

  test('every image referenced exists in public/', () => {
    MENU_ITEMS.filter((item) => item.image).forEach((item) => {
      expect(existsSync(resolve(process.cwd(), 'public', item.image!.replace(/^\//, '')))).toBe(true)
    })
  })

  test('every category has at least one item', () => {
    MENU_CATEGORIES.forEach((c) => expect(getItemsByCategory(c.id).length).toBeGreaterThan(0))
  })
})
