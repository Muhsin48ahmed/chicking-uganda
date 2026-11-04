import { useEffect, useRef, useState } from 'react'
import { HERO_VIDEO } from '../data/videos'
import { prefersReducedData, useIsOnScreen, usePrefersReducedMotion } from '../lib/hooks'
import { PlayIcon } from './Icons'

const PHONE_QUERY = '(max-width: 767px)'

const PauseIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
)

/**
 * Full-bleed, silent, looping background video for the home hero.
 * The still poster is always underneath, so the hero is never blank while the
 * video loads, if it fails, or when autoplay is off (reduced motion, Data Saver,
 * iOS Low Power Mode). Visitors can pause it at any time (WCAG 2.2.2).
 */
export function HeroVideo() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [shouldAutoplay] = useState(() => !prefersReducedData())
  const [userChoice, setUserChoice] = useState<'play' | 'pause' | null>(null)
  // Once the video has been requested it stays mounted, so pausing and resuming never reloads it.
  const [isVideoMounted, setIsVideoMounted] = useState(() => shouldAutoplay && !prefersReducedMotion)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isOnScreen = useIsOnScreen(containerRef)

  const wantsPlayback = userChoice === 'play' || (userChoice === null && shouldAutoplay && !prefersReducedMotion)
  const shouldRenderVideo = !hasFailed && isVideoMounted

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (wantsPlayback && isOnScreen) {
      video.play()?.catch((error: unknown) => {
        // An AbortError just means a pause or seek interrupted play(); the next effect run retries.
        if (!(error instanceof Error) || error.name !== 'NotAllowedError') return
        // The browser blocked autoplay (e.g. iOS Low Power Mode): keep the poster, offer a play button.
        setIsPlaying(false)
        setUserChoice((choice) => choice ?? 'pause')
      })
    } else {
      video.pause()
    }
  }, [wantsPlayback, isOnScreen, shouldRenderVideo])

  const failWith = (reason: string) => {
    console.warn(`Hero video unavailable (${reason}); showing the poster instead.`)
    setHasFailed(true)
  }

  const toggle = () => {
    if (wantsPlayback) {
      setUserChoice('pause')
      return
    }
    setUserChoice('play')
    setIsVideoMounted(true)
  }

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden bg-ember">
      <picture>
        <source media={PHONE_QUERY} srcSet={HERO_VIDEO.posterMobile} />
        <img src={HERO_VIDEO.poster} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      </picture>

      {shouldRenderVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_VIDEO.poster}
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={(event) => {
            // <source> errors also reach here through React; a skipped phone source on desktop
            // fires one by design, so only the <video> itself or the last <source> means failure.
            if (event.target !== event.currentTarget) return
            failWith(`media error ${event.currentTarget.error?.code ?? 'unknown'}`)
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        >
          <source media={PHONE_QUERY} src={HERO_VIDEO.mobile} type="video/mp4" />
          <source src={HERO_VIDEO.desktop} type="video/mp4" onError={() => failWith('no playable source')} />
        </video>
      )}

      {/* Shade only behind the copy so the footage stays bright and clear everywhere else:
          bottom on phones (where the text sits), left on larger screens, plus a thin band under the menu. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 via-45% to-transparent to-75% sm:hidden" />
      <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-black/70 via-black/30 via-40% to-transparent to-65% sm:block" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 to-transparent" />

      {!hasFailed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={wantsPlayback ? 'Pause background video' : 'Play background video'}
          className="absolute right-4 bottom-24 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-black/65 sm:right-8 sm:bottom-8"
        >
          {wantsPlayback ? <PauseIcon /> : <PlayIcon width={18} height={18} />}
        </button>
      )}
    </div>
  )
}
