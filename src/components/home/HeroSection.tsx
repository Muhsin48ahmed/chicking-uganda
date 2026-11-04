import { Link } from 'react-router-dom'
import { DELIVERY_PARTNERS, SITE } from '../../config/site'
import { telHref } from '../../lib/format'
import { HeroVideo } from '../HeroVideo'
import { ArrowIcon, BikeIcon, ChevronIcon, PhoneIcon } from '../Icons'
import { OpenStatusPill } from '../ui'

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-32 pb-28 text-white sm:items-center sm:pb-24">
      <HeroVideo />

      <div className="container-page relative">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <OpenStatusPill />
            <span className="inline-flex items-center gap-2 rounded-full bg-halal px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
              100% Halal
            </span>
          </div>

          <h1 className="mt-6 text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.86] drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
            Crunch
            <br />
            <span className="text-gold">your</span> way.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-xl">
            Fresh, never-frozen chicken, made to order in the heart of Kampala. Original, Spicy or Grilled: it&apos;s your choice.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={DELIVERY_PARTNERS[0].url} target="_blank" rel="noreferrer" className="btn-gold">
              <BikeIcon /> Order delivery
            </a>
            <Link to="/menu" className="btn-ghost text-white">
              See the menu <ArrowIcon />
            </Link>
            <a href={telHref(SITE.phone)} className="btn hidden text-white/85 hover:text-white sm:inline-flex">
              <PhoneIcon /> {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      <a href="#flavours" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 hover:text-white sm:flex">
        Pick your flavour
        <ChevronIcon className="animate-bounce rotate-90" />
      </a>
    </section>
  )
}
