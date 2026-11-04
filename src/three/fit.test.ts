import { CONTENT, FRY_REACH, computeFit } from './fit'

const FOV = 34
const visibleHalfHeight = (distance: number) => Math.tan((FOV / 2) * (Math.PI / 180)) * distance

describe('computeFit', () => {
  test.each([
    ['phone, wide box', 375 / 320],
    ['desktop, tall box', 456 / 652],
    ['square', 1],
    ['very narrow', 0.5],
  ])('keeps the whole bucket in view (%s)', (_, aspect) => {
    const { distance } = computeFit(aspect, FOV)
    const halfHeight = visibleHalfHeight(distance)
    expect(halfHeight).toBeGreaterThanOrEqual(CONTENT.height / 2 - 1e-9)
    expect(halfHeight * aspect).toBeGreaterThanOrEqual(CONTENT.width / 2 - 1e-9)
  })

  test('narrow boxes pull the fries in so none are cut off at the edges', () => {
    const narrow = computeFit(0.5, FOV)
    const wide = computeFit(1.3, FOV)
    expect(narrow.frySpread).toBeLessThan(wide.frySpread)
    const outermostFry = FRY_REACH * narrow.frySpread
    expect(outermostFry).toBeLessThan(visibleHalfHeight(narrow.distance) * 0.5)
  })

  test('fries never spread past their designed positions', () => {
    expect(computeFit(3, FOV).frySpread).toBe(1)
  })

  test('rejects nonsense sizes', () => {
    expect(() => computeFit(0, FOV)).toThrow()
    expect(() => computeFit(Number.NaN, FOV)).toThrow()
  })
})
