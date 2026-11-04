import { useEffect, useState, type RefObject } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(
    () => (typeof window !== 'undefined' && window.matchMedia?.(REDUCED_MOTION_QUERY).matches) || false,
  )
  useEffect(() => {
    const query = window.matchMedia?.(REDUCED_MOTION_QUERY)
    if (!query) return
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return prefersReduced
}

interface NetworkInformationLike {
  saveData?: boolean
}

/** True when the visitor has turned on Data Saver (Chrome/Android), common on mobile data. */
export function prefersReducedData(): boolean {
  if (typeof navigator === 'undefined') return false
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  return connection?.saveData === true
}

/** Whether the element is currently in the viewport. Defaults to true before measuring. */
export function useIsOnScreen(ref: RefObject<HTMLElement | null>): boolean {
  const [isOnScreen, setIsOnScreen] = useState(true)
  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting))
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])
  return isOnScreen
}

/** Flips to true once the element comes within `rootMargin` of the viewport, then stays true. */
export function useHasBeenNear(ref: RefObject<HTMLElement | null>, rootMargin = '400px'): boolean {
  const [hasBeenNear, setHasBeenNear] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const node = ref.current
    if (!node || hasBeenNear) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setHasBeenNear(true)
        observer.disconnect()
      },
      { rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, rootMargin, hasBeenNear])
  return hasBeenNear
}
