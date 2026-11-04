import { useEffect, useMemo, useState } from 'react'
import { SearchIcon } from '../components/Icons'
import { MenuCard } from '../components/MenuCard'
import { SegmentedControl } from '../components/SegmentedControl'
import { PageHero, usePageMeta } from '../components/ui'
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu'
import { filterMenu, type FlavourFilter } from '../lib/menuFilter'

const FLAVOUR_FILTERS: ReadonlyArray<{ id: FlavourFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'original', label: 'Original' },
  { id: 'spicy', label: 'Spicy' },
  { id: 'grilled', label: 'Grilled' },
]

function useActiveSection(ids: readonly string[]): string {
  const [activeId, setActiveId] = useState(ids[0])
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [ids])
  return ids.includes(activeId) ? activeId : ids[0]
}

export function MenuPage() {
  usePageMeta('Menu & Prices', 'The full Chicking Uganda menu with prices in UGX: buckets, meals, burgers, wings, rice, kids meals, sides and drinks.')
  const [flavour, setFlavour] = useState<FlavourFilter>('all')
  const [query, setQuery] = useState('')

  const visibleItems = useMemo(() => filterMenu(MENU_ITEMS, { flavour, query }), [flavour, query])
  const sections = useMemo(
    () => MENU_CATEGORIES.map((c) => ({ ...c, items: visibleItems.filter((i) => i.category === c.id) })).filter((s) => s.items.length > 0),
    [visibleItems],
  )
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])
  const activeId = useActiveSection(sectionIds)

  return (
    <>
      <PageHero eyebrow="Our menu" title={<>From a quick bite to a <span className="text-gold">full-on feast</span></>}
        intro="Home of Original, Spicy and Grilled chicken. All prices in Uganda shillings." />

      <div className="sticky top-[60px] z-30 border-b border-black/5 bg-paper/95 backdrop-blur">
        <div className="container-page flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Menu categories" className="-mx-4 min-w-0 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:flex-1 lg:px-0">
            <ul className="flex gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={activeId === s.id ? 'true' : undefined}
                    className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${activeId === s.id ? 'bg-brand text-white' : 'bg-white text-char/70 ring-1 ring-black/10 hover:text-char'}`}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <SegmentedControl
              label="Filter by flavour"
              options={FLAVOUR_FILTERS}
              value={flavour}
              onChange={setFlavour}
              className="flex rounded-full bg-white p-1 ring-1 ring-black/10"
              optionClassName={(isSelected) =>
                `rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${isSelected ? 'bg-char text-white' : 'text-char/60 hover:text-char'}`
              }
            />
            <label className="relative flex-1 lg:w-56 lg:flex-none">
              <span className="sr-only">Search the menu</span>
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-char/40" width={16} height={16} />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search wings, rice…"
                className="w-full rounded-full bg-white py-2 pr-4 pl-9 text-sm ring-1 ring-black/10 focus:ring-2 focus:ring-brand focus:outline-none" />
            </label>
          </div>
        </div>
      </div>

      <div className="container-page py-12 sm:py-16">
        {sections.length === 0 && (
          <p className="py-20 text-center text-lg text-char/60">Nothing matches that yet. Try another flavour or search.</p>
        )}
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-16 scroll-mt-44" aria-labelledby={`${section.id}-title`}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b-2 border-brand/15 pb-4">
              <h2 id={`${section.id}-title`} className="text-4xl text-char sm:text-5xl">{section.name}</h2>
              <p className="text-char/60">{section.blurb}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {section.items.map((item) => <MenuCard key={item.id} item={item} />)}
            </div>
          </section>
        ))}
        <p className="text-center text-sm text-char/50">(R) = regular size. Prices include VAT and may change without notice.</p>
      </div>
    </>
  )
}
