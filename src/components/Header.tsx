import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { DELIVERY_PARTNERS, NAV_LINKS } from '../config/site'
import { BikeIcon, CloseIcon, MenuIcon } from './Icons'
import { assetUrl } from '../lib/assetUrl'

const SCROLL_THRESHOLD = 24

export function Header() {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > SCROLL_THRESHOLD)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMenuOpen])

  const isSolid = isScrolled || isMenuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isSolid ? 'bg-ember/95 py-2 shadow-lg shadow-black/20 backdrop-blur' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4">
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex shrink-0 items-center gap-3" aria-label="Chicking Uganda home">
          <img
            src={assetUrl('/images/brand/logo-round.png')}
            alt=""
            width={56}
            height={56}
            className={`transition-all duration-300 ${isSolid ? 'h-11 w-11' : 'h-14 w-14'}`}
          />
          <span className="hidden font-display text-lg leading-none text-white sm:block">
            CHICKING
            <span className="block text-xs tracking-[0.3em] text-gold">UGANDA</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white ${
                      isActive ? 'bg-white/15 text-white' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={DELIVERY_PARTNERS[0].url} target="_blank" rel="noreferrer" className="btn-gold hidden !py-2.5 sm:inline-flex">
            <BikeIcon /> Order now
          </a>
          <button
            type="button"
            className="rounded-full p-2.5 text-white hover:bg-white/10 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        inert={!isMenuOpen}
        className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${isMenuOpen ? 'max-h-[80vh]' : 'max-h-0'}`}
      >
        <ul className="container-page flex flex-col gap-1 pt-4 pb-6">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 font-display text-2xl uppercase text-white ${isActive ? 'bg-white/15' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
