import * as THREE from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { Flavour } from '../data/menu'

const FBM_OCTAVES = 5

function hash3(x: number, y: number, z: number): number {
  const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453
  return h - Math.floor(h)
}

const smooth = (t: number) => t * t * (3 - 2 * t)

/** Trilinear value noise in [0, 1]. */
function valueNoise(x: number, y: number, z: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const u = smooth(x - xi), v = smooth(y - yi), w = smooth(z - zi)
  const lerp = THREE.MathUtils.lerp
  const corner = (dx: number, dy: number, dz: number) => hash3(xi + dx, yi + dy, zi + dz)
  const x00 = lerp(corner(0, 0, 0), corner(1, 0, 0), u)
  const x10 = lerp(corner(0, 1, 0), corner(1, 1, 0), u)
  const x01 = lerp(corner(0, 0, 1), corner(1, 0, 1), u)
  const x11 = lerp(corner(0, 1, 1), corner(1, 1, 1), u)
  return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w)
}

/** Fractal noise centred on 0: big lumps plus fine crumbs, like a fried crust. */
function crunchNoise(x: number, y: number, z: number): number {
  let total = 0
  let amplitude = 0.5
  let frequency = 2.2
  for (let octave = 0; octave < FBM_OCTAVES; octave += 1) {
    total += (valueNoise(x * frequency, y * frequency, z * frequency) - 0.5) * amplitude
    amplitude *= 0.55
    frequency *= 2.3
  }
  return total * 2
}

const FLAVOUR_PALETTE: Record<Flavour, { base: THREE.Color; deep: THREE.Color; char?: THREE.Color }> = {
  original: { base: new THREE.Color('#e7a043'), deep: new THREE.Color('#a35a17') },
  spicy: { base: new THREE.Color('#c9562a'), deep: new THREE.Color('#7d1f0c') },
  grilled: { base: new THREE.Color('#b8743a'), deep: new THREE.Color('#6b3714'), char: new THREE.Color('#2a140a') },
}

const CHICKEN_DETAIL = 22
const DISPLACEMENT = 0.22

interface ChickenShape {
  geometry: THREE.BufferGeometry
  /** Crust noise per vertex, reused when recolouring for another flavour. */
  noise: Float32Array
}

const shapeCache = new Map<number, ChickenShape>()
const flavouredCache = new Map<string, THREE.BufferGeometry>()

/** Displaces a sphere into a lumpy fried-chicken piece. Built once per seed. */
function getChickenShape(seed: number): ChickenShape {
  const cached = shapeCache.get(seed)
  if (cached) return cached

  const sphere = new THREE.IcosahedronGeometry(1, CHICKEN_DETAIL)
  sphere.deleteAttribute('normal')
  sphere.deleteAttribute('uv')
  const geometry = mergeVertices(sphere)
  sphere.dispose()

  const position = geometry.attributes.position
  const noise = new Float32Array(position.count)
  const vertex = new THREE.Vector3()
  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i)
    const n = crunchNoise(vertex.x + seed, vertex.y - seed * 0.7, vertex.z + seed * 1.3)
    noise[i] = n
    vertex.multiplyScalar(1 + n * DISPLACEMENT)
    position.setXYZ(i, vertex.x, vertex.y, vertex.z)
  }
  geometry.computeVertexNormals()

  const shape = { geometry, noise }
  shapeCache.set(seed, shape)
  return shape
}

function crustColours(shape: ChickenShape, flavour: Flavour): Float32Array {
  const palette = FLAVOUR_PALETTE[flavour]
  const position = shape.geometry.attributes.position
  const colors = new Float32Array(position.count * 3)
  const color = new THREE.Color()
  for (let i = 0; i < position.count; i += 1) {
    const crevice = THREE.MathUtils.clamp(0.45 - shape.noise[i] * 1.6, 0, 1)
    color.copy(palette.base).lerp(palette.deep, crevice * 0.9)
    const stripe = Math.abs(Math.sin((position.getX(i) * 0.8 + position.getZ(i) * 0.4) * 7))
    if (palette.char && stripe > 0.93) color.lerp(palette.char, 0.75)
    colors.set([color.r, color.g, color.b], i * 3)
  }
  return colors
}

/**
 * A fried-chicken piece coloured for one flavour (darker in the crevices,
 * grill stripes when grilled). Cached for the life of the page, so switching
 * flavours after the first time costs nothing.
 */
export function getChickenGeometry(seed: number, flavour: Flavour): THREE.BufferGeometry {
  const key = `${seed}:${flavour}`
  const cached = flavouredCache.get(key)
  if (cached) return cached

  const shape = getChickenShape(seed)
  const geometry = shape.geometry.clone()
  geometry.setAttribute('color', new THREE.BufferAttribute(crustColours(shape, flavour), 3))
  flavouredCache.set(key, geometry)
  return geometry
}

const BUCKET_TEXTURE_WIDTH = 2048
const BUCKET_TEXTURE_HEIGHT = 640
const PATTERN_WORDS = ['WOW! I LOVE', 'CRUNCHY', 'TRULY AMAZING', 'GREATEST', 'BUCKET EVER', 'YUMMY']

/** Draws the red bucket wrap (pattern + two logos) onto a canvas texture. */
export function createBucketTexture(logo: HTMLImageElement | null): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = BUCKET_TEXTURE_WIDTH
  canvas.height = BUCKET_TEXTURE_HEIGHT
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context unavailable')

  const gradient = ctx.createLinearGradient(0, 0, 0, BUCKET_TEXTURE_HEIGHT)
  gradient.addColorStop(0, '#e3191f')
  gradient.addColorStop(1, '#b30f14')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, BUCKET_TEXTURE_WIDTH, BUCKET_TEXTURE_HEIGHT)

  ctx.fillStyle = 'rgba(120, 6, 10, 0.16)'
  ctx.font = 'bold 84px Oswald, Arial Narrow, sans-serif'
  PATTERN_WORDS.forEach((word, row) => {
    for (let x = -200; x < BUCKET_TEXTURE_WIDTH; x += 620) {
      ctx.fillText(word, x + (row % 2) * 300, 110 + row * 96)
    }
  })

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, BUCKET_TEXTURE_WIDTH, 26)

  if (logo) {
    const size = 470
    const y = (BUCKET_TEXTURE_HEIGHT - size) / 2 + 20
    ;[0.25, 0.75].forEach((u) => ctx.drawImage(logo, BUCKET_TEXTURE_WIDTH * u - size / 2, y, size, size))
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}
