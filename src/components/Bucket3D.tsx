import { Component, lazy, Suspense, useRef, useState, type ReactNode } from 'react'
import type { Flavour } from '../data/menu'
import { useHasBeenNear, useIsOnScreen, usePrefersReducedMotion } from '../lib/hooks'
import { assetUrl } from '../lib/assetUrl'

const BucketScene = lazy(() => import('../three/BucketScene'))

/** Checked once per page load; the probe context is released straight away. */
function detectWebGL(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

let webGLSupport: boolean | undefined
const supportsWebGL = () => (webGLSupport ??= detectWebGL())

class SceneErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: unknown) {
    console.error('3D bucket failed, showing photo instead:', error)
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

function BucketPoster() {
  return (
    <img
      src={assetUrl('/images/menu/variety-bucket.webp')}
      alt="A Chicking bucket of fried chicken with fries, coleslaw and buns"
      className="h-full w-full animate-float-slow object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
    />
  )
}

/**
 * The interactive 3D bucket. The three.js bundle is only downloaded once the
 * bucket is about to scroll into view, and rendering pauses when it leaves.
 */
export function Bucket3D({ flavour }: { flavour: Flavour }) {
  const [canRender3D] = useState(supportsWebGL)
  const [isSceneReady, setIsSceneReady] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const isOnScreen = useIsOnScreen(containerRef)
  const shouldMountScene = useHasBeenNear(containerRef)

  if (!canRender3D) return <BucketPoster />

  return (
    <SceneErrorBoundary fallback={<BucketPoster />}>
      <div ref={containerRef} className="relative h-full w-full">
        {/* Photo stays underneath until the first 3D frame is drawn, so there is never a blank hero. */}
        <div aria-hidden className={`absolute inset-0 transition-opacity duration-700 ${isSceneReady ? 'opacity-0' : 'opacity-100'}`}>
          <BucketPoster />
        </div>
        {shouldMountScene && (
        <Suspense fallback={null}>
          <div className={`absolute inset-0 cursor-grab transition-opacity duration-700 active:cursor-grabbing ${isSceneReady ? 'opacity-100' : 'opacity-0'}`}>
            <BucketScene flavour={flavour} isAnimated={!prefersReducedMotion} isOnScreen={isOnScreen} onReady={() => setIsSceneReady(true)} />
          </div>
        </Suspense>
        )}
      </div>
    </SceneErrorBoundary>
  )
}
