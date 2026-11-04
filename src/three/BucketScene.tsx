import { ContactShadows, Environment, Float, Lightformer, PresentationControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import type { Flavour } from '../data/menu'
import { computeFit } from './fit'
import { createBucketTexture, getChickenGeometry } from './geometry'
import { assetUrl } from '../lib/assetUrl'

const BUCKET = { top: 1.05, bottom: 0.78, height: 1.55 }
const POP_DURATION = 0.6

const CHICKEN_PIECES: ReadonlyArray<{ position: [number, number, number]; scale: [number, number, number]; rotation: [number, number, number] }> = [
  { position: [0.0, 0.98, 0.0], scale: [0.5, 0.42, 0.62], rotation: [0.4, 0.2, 0.3] },
  { position: [-0.36, 0.86, 0.22], scale: [0.42, 0.36, 0.55], rotation: [-0.3, 1.1, 0.6] },
  { position: [0.37, 0.88, 0.16], scale: [0.44, 0.36, 0.52], rotation: [0.5, -0.8, -0.4] },
  { position: [0.11, 0.84, -0.4], scale: [0.46, 0.38, 0.5], rotation: [0.2, 2.1, 0.1] },
  { position: [-0.29, 0.8, -0.3], scale: [0.4, 0.34, 0.5], rotation: [-0.6, 0.4, 1.2] },
  { position: [0.22, 0.78, 0.43], scale: [0.38, 0.32, 0.46], rotation: [0.9, 0.3, -0.7] },
  { position: [-0.07, 1.28, 0.14], scale: [0.36, 0.3, 0.5], rotation: [1.2, 0.6, 0.2] },
]

const FRIES: ReadonlyArray<{ position: [number, number, number]; rotation: [number, number, number] }> = [
  { position: [-1.7, 0.6, 0.4], rotation: [0.3, 0, 0.6] },
  { position: [1.75, 0.2, 0.2], rotation: [-0.2, 0.4, -0.5] },
  { position: [-1.4, -0.5, 0.8], rotation: [0.6, 0.2, 1.4] },
  { position: [1.5, 1.1, -0.3], rotation: [0.1, 0.8, 0.3] },
  { position: [1.25, -0.75, 0.9], rotation: [1.1, 0.1, 0.9] },
]

function useLogoImage(src: string): HTMLImageElement | null {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  useEffect(() => {
    const img = new Image()
    img.onload = () => setImage(img)
    img.onerror = () => setImage(null)
    img.src = src
  }, [src])
  return image
}

function Bucket() {
  const logo = useLogoImage(assetUrl('/images/brand/logo-round.png'))
  const texture = useMemo(() => createBucketTexture(logo), [logo])
  useEffect(() => () => texture.dispose(), [texture])

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[BUCKET.top, BUCKET.bottom, BUCKET.height, 96, 1, true]} />
        <meshStandardMaterial map={texture} roughness={0.38} metalness={0.05} side={THREE.FrontSide} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[BUCKET.top * 0.985, BUCKET.bottom * 0.985, BUCKET.height, 64, 1, true]} />
        <meshStandardMaterial color="#8f0b10" roughness={0.6} side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, BUCKET.height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[BUCKET.top, 0.035, 16, 96]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0, -BUCKET.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[BUCKET.bottom, 64]} />
        <meshStandardMaterial color="#8f0b10" />
      </mesh>
    </group>
  )
}

function ChickenPieces({ flavour }: { flavour: Flavour }) {
  const groupRef = useRef<THREE.Group>(null)
  const popStart = useRef<number | null>(null)
  // Geometries are cached in geometry.ts for the life of the page, so they are not disposed here.
  const geometries = useMemo(
    () => CHICKEN_PIECES.map((_, i) => getChickenGeometry(i * 1.37 + 0.5, flavour)),
    [flavour],
  )

  useEffect(() => {
    popStart.current = null
  }, [flavour])

  useFrame(({ clock }) => {
    const group = groupRef.current
    if (!group) return
    if (popStart.current === null) popStart.current = clock.elapsedTime
    const t = Math.min((clock.elapsedTime - popStart.current) / POP_DURATION, 1)
    const bounce = 1 + Math.sin(t * Math.PI) * 0.12
    group.scale.setScalar(bounce)
  })

  return (
    <group ref={groupRef} position={[0, BUCKET.height / 2 - 0.85, 0]}>
      {CHICKEN_PIECES.map((piece, i) => (
        <mesh key={i} geometry={geometries[i]} position={piece.position} scale={piece.scale} rotation={piece.rotation}>
          <meshStandardMaterial vertexColors roughness={0.82} metalness={0} />
        </mesh>
      ))}
    </group>
  )
}

const CAMERA_FOV = 34
const CAMERA_HEIGHT_RATIO = 1.1 / 6

function useCameraFit() {
  const size = useThree((state) => state.size)
  return useMemo(() => computeFit(size.width / Math.max(size.height, 1), CAMERA_FOV), [size.width, size.height])
}

/** Moves the camera so the bucket fills the canvas at any shape: wide on phones, tall on desktop. */
function FitCamera() {
  const camera = useThree((state) => state.camera)
  const invalidate = useThree((state) => state.invalidate)
  const { distance } = useCameraFit()
  useLayoutEffect(() => {
    camera.position.set(0, distance * CAMERA_HEIGHT_RATIO, distance)
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, distance, invalidate])
  return null
}

function FloatingFries() {
  const { frySpread } = useCameraFit()
  return (
    <>
      {FRIES.map((fry, i) => (
        <Float key={i} speed={1.4 + i * 0.2} rotationIntensity={1.2} floatIntensity={1.4}>
          <mesh position={[fry.position[0] * frySpread, fry.position[1], fry.position[2]]} rotation={fry.rotation}>
            <boxGeometry args={[0.11, 0.78, 0.11]} />
            <meshStandardMaterial color="#f6c453" roughness={0.55} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function SpinningBucket({ flavour, isAnimated }: { flavour: Flavour; isAnimated: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (isAnimated && ref.current) ref.current.rotation.y += delta * 0.35
  })
  return (
    <group ref={ref} rotation={[0, -0.6, 0]}>
      <Bucket />
      <ChickenPieces flavour={flavour} />
    </group>
  )
}

const FRAMES_BEFORE_READY = 2

/** Tells the page once real frames are on screen (shaders compiled), so the photo can fade out. */
function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0)
  const hasFired = useRef(false)
  useFrame(({ invalidate }) => {
    if (hasFired.current) return
    frames.current += 1
    if (frames.current >= FRAMES_BEFORE_READY) {
      hasFired.current = true
      onReady()
    } else {
      invalidate()
    }
  })
  return null
}

interface BucketSceneProps {
  flavour: Flavour
  /** Animate (spin, float, fries). False for reduced-motion visitors. */
  isAnimated: boolean
  /** False while the hero is scrolled out of view, so no frames are drawn. */
  isOnScreen: boolean
  onReady: () => void
}

const IS_TOUCH_DEVICE = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches

export default function BucketScene({ flavour, isAnimated, isOnScreen, onReady }: BucketSceneProps) {
  return (
    <Canvas
      dpr={IS_TOUCH_DEVICE ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 1.1, 6], fov: CAMERA_FOV }}
      frameloop={isAnimated && isOnScreen ? 'always' : 'demand'}
      gl={{ antialias: !IS_TOUCH_DEVICE, powerPreference: 'high-performance' }}
      // Vertical swipes scroll the page on phones; sideways drags still spin the bucket.
      style={{ touchAction: 'pan-y' }}
      aria-hidden
    >
      <FitCamera />
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#fff1d6" />
      <pointLight position={[-3, 1, -3]} intensity={18} color="#ff7a3c" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.5} position={[0, 4, 3]} scale={[6, 2, 1]} color="#fff3e0" />
        <Lightformer form="rect" intensity={1.5} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} color="#ffb81c" />
        <Lightformer form="ring" intensity={2} position={[4, 2, -2]} scale={2} color="#ff4b3a" />
      </Environment>

      <PresentationControls global={false} cursor snap polar={[-0.2, 0.25]} azimuth={[-Math.PI, Math.PI]} speed={1.4}>
        <Float speed={isAnimated ? 1.6 : 0} rotationIntensity={0.15} floatIntensity={0.5}>
          <group position={[0, -0.25, 0]}>
            <SpinningBucket flavour={flavour} isAnimated={isAnimated} />
          </group>
        </Float>
      </PresentationControls>
      {isAnimated && <FloatingFries />}
      <ContactShadows position={[0, -1.35, 0]} opacity={0.5} scale={7} blur={2.6} far={3} color="#3a0507" frames={1} resolution={256} />
      <ReadySignal onReady={onReady} />
    </Canvas>
  )
}
