import { Link } from 'react-router-dom'
import { LOCATIONS, NAV_LINKS, SITE, SOCIAL_LINKS } from '../config/site'
import { telHref } from '../lib/format'
import { ClockIcon, PhoneIcon, PinIcon } from './Icons'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const store = LOCATIONS[0]
  return (
    <footer className="relative overflow-hidden bg-char pt-16 pb-28 text-white/80 sm:pb-12">
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="container-page relative grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/images/brand/logo-round.png" alt="Chicking" width={88} height={88} className="h-20 w-20" />
          <p className="mt-4 max-w-xs text-sm">
            Part of the global Chicking family: fully halal, made fresh to order, since 2000.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <img src="/images/brand/halal.jpg" alt="Halal certified" width={44} height={44} className="h-11 w-11 rounded-full" />
            <span className="text-xs uppercase tracking-widest text-white/60">100% Halal</span>
          </div>
        </div>

        <div>
          <h2 className="text-lg text-white">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-gold">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg text-white">Visit us</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><PinIcon className="mt-0.5 shrink-0 text-gold" />{store.address}</li>
            <li className="flex gap-3"><ClockIcon className="mt-0.5 shrink-0 text-gold" />{SITE.hoursLabel}</li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 shrink-0 text-gold" />
              <a href={telHref(SITE.phone)} className="hover:text-gold">{SITE.phone}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg text-white">Follow the crunch</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-gold">
                  {s.name} · <span className="text-white/60">{s.handle}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={SITE.globalSite} target="_blank" rel="noreferrer" className="hover:text-gold">Chicking Global</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page relative mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:justify-between">
        <p>© {CURRENT_YEAR} Chicking Uganda. All rights reserved.</p>
        <p>Prices in Uganda shillings and may change without notice.</p>
      </div>
    </footer>
  )
}
