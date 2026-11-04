/** World-space box that must always be visible: bucket, chicken and floor shadow, plus margin. */
export const CONTENT = { width: 2.9, height: 3.4 } as const

/** How far the outermost fry sits from the centre, in world units, at full spread. */
export const FRY_REACH = 1.75

const FRY_HALF_LENGTH = 0.4
const EDGE_MARGIN = 0.1
const MIN_FRY_SPREAD = 0.5

export interface CameraFit {
  /** Camera distance from the bucket. */
  distance: number
  /** Multiplier for the fries' horizontal positions (1 = as designed). */
  frySpread: number
}

/**
 * Pulls the camera back just far enough that the bucket fits the canvas, whatever
 * its shape (wide on phones, tall on desktop), and tucks the floating fries in on
 * narrow canvases so they are never cut off at the edges.
 */
export function computeFit(aspect: number, fovDegrees: number): CameraFit {
  if (!Number.isFinite(aspect) || aspect <= 0) throw new Error(`Invalid canvas aspect: ${aspect}`)
  const tanHalfFov = Math.tan((fovDegrees / 2) * (Math.PI / 180))
  const distanceForHeight = CONTENT.height / 2 / tanHalfFov
  const distanceForWidth = CONTENT.width / 2 / (tanHalfFov * aspect)
  const distance = Math.max(distanceForHeight, distanceForWidth)

  const visibleHalfWidth = tanHalfFov * distance * aspect
  const room = visibleHalfWidth - FRY_HALF_LENGTH - EDGE_MARGIN
  const frySpread = Math.min(1, Math.max(MIN_FRY_SPREAD, room / FRY_REACH))
  return { distance, frySpread }
}
