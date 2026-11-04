import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { SITE } from '../config/site'
import type { Flavour } from '../data/menu'
import { getOpenStatus } from '../lib/hours'

const REFRESH_STATUS_MS = 60_000

const DEFAULT_DESCRIPTION =
  typeof document === 'undefined'
    ? ''
    : (document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '')

export function usePageMeta(title: string, description: string = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = `${title} · Chicking Uganda`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

/** Fades children up when they scroll into view. */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, intro, tone = 'light', align = 'left' }: {
  eyebrow: string
  title: ReactNode
  intro?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
}) {
  const isDark = tone === 'dark'
  return (
    <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${isDark ? 'text-gold' : 'text-brand'}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-4xl leading-[0.95] sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-char'}`}>{title}</h2>
      {intro && <p className={`mt-4 text-base sm:text-lg ${isDark ? 'text-white/75' : 'text-char/70'}`}>{intro}</p>}
    </Reveal>
  )
}

/** Red banner used at the top of every inner page. */
export function PageHero({ eyebrow, title, intro, children }: {
  eyebrow: string
  title: ReactNode
  intro?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#b80f15] via-brand-deep to-ember pt-36 pb-20 text-white">
      <div aria-hidden className="pointer-events-none absolute -right-32 -bottom-40 h-[28rem] w-[28rem] rounded-full border-[40px] border-gold/15" />
      <div aria-hidden className="pointer-events-none absolute top-24 -left-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-page relative">
        <p className="eyebrow text-white/85">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-5xl leading-[0.9] sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-white/80">{intro}</p>}
        {children}
      </div>
    </section>
  )
}

export function OpenStatusPill({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState(() => getOpenStatus(new Date(), SITE.hours))
  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus(new Date(), SITE.hours)), REFRESH_STATUS_MS)
    return () => window.clearInterval(id)
  }, [])
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur ${className}`}>
      <span className={`h-2 w-2 rounded-full ${status.isOpen ? 'animate-pulse bg-green-400' : 'bg-white/50'}`} />
      {status.label}
    </span>
  )
}

const FLAVOUR_STYLES: Record<Flavour, { label: string; className: string }> = {
  original: { label: 'Original', className: 'bg-crust/15 text-[#8a4b0c]' },
  spicy: { label: 'Spicy', className: 'bg-brand/10 text-brand-deep' },
  grilled: { label: 'Grilled', className: 'bg-char/10 text-char' },
}

export function FlavourTag({ flavour }: { flavour: Flavour }) {
  const style = FLAVOUR_STYLES[flavour]
  return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${style.className}`}>{style.label}</span>
}
