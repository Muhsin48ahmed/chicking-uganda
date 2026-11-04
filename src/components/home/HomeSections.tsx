import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DELIVERY_PARTNERS, LOCATIONS, SITE, directionsUrl } from '../../config/site'
import { FUN_FACTS, type FactIcon } from '../../data/brand'
import { FEATURED_ITEM_IDS, getItemById, getItemsByCategory, type MenuItem } from '../../data/menu'
import { formatUGX, telHref } from '../../lib/format'
import { ArrowIcon, CheckIcon, ClockIcon, FlameIcon, GlobeIcon, LeafIcon, PartyIcon, PhoneIcon, PinIcon } from '../Icons'
import { MenuCard } from '../MenuCard'
import { SegmentedControl } from '../SegmentedControl'
import { OpenStatusPill, Reveal, SectionHeading } from '../ui'
import { assetUrl } from '../../lib/assetUrl'

const MARQUEE_WORDS = ['Fresh, never frozen', '100% Halal', 'Made to order', 'Original · Spicy · Grilled', 'Open 11am – 11pm']

export function Marquee() {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS]
  return (
    <div className="relative overflow-hidden bg-gold py-4 text-char">
      <p className="sr-only">{MARQUEE_WORDS.join('. ')}</p>
      <div aria-hidden className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl uppercase">
        {words.map((word, i) => (
          <span key={i} className="flex items-center gap-10">
            {word}
            <span className="text-brand">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function FavouritesSection() {
  const items = FEATURED_ITEM_IDS.map(getItemById).filter((item): item is MenuItem => Boolean(item))
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Fan favourites" title={<>Kampala&apos;s <span className="text-brand">most ordered</span></>} />
          <Link to="/menu" className="btn-primary">Full menu <ArrowIcon /></Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 90}><MenuCard item={item} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const BUCKET_SIZES = getItemsByCategory('buckets').filter((item) => item.id.startsWith('super-saver'))
const BUCKET_OPTIONS = BUCKET_SIZES.map((bucket) => ({
  id: bucket.id,
  label: (
    <>
      {bucket.name.match(/\d+/)?.[0]}
      <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest">pcs</span>
    </>
  ),
}))

export function BucketsSection() {
  const [selectedId, setSelectedId] = useState(BUCKET_SIZES[2]?.id ?? BUCKET_SIZES[0].id)
  const selected = BUCKET_SIZES.find((b) => b.id === selectedId) ?? BUCKET_SIZES[0]
  const pieces = selected.name.match(/\d+/)?.[0] ?? ''

  return (
    <section className="relative overflow-hidden bg-ember py-20 text-white sm:py-28">
      <div aria-hidden className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,#d7141a,transparent_55%)]" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <img src={assetUrl('/images/menu/super-saver.webp')} alt="Super Saver buckets of Original, Spicy and Grilled chicken" loading="lazy" className="w-full rounded-3xl" />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading tone="dark" eyebrow="Super Saver buckets" title={<>Feeding the <span className="text-gold">whole crew?</span></>}
            intro="Pick a size. Mix Original, Spicy and Grilled. Every bucket comes with fries, coleslaw, garlic dips and buns." />
          <SegmentedControl
            label="Bucket size"
            options={BUCKET_OPTIONS}
            value={selectedId}
            onChange={setSelectedId}
            className="mt-8 grid grid-cols-4 gap-2"
            optionClassName={(isSelected) =>
              `rounded-2xl border-2 py-3 font-display text-3xl transition ${isSelected ? 'border-gold bg-gold text-char' : 'border-white/20 hover:border-white/60'}`
            }
          />
          <div aria-live="polite" className="mt-6 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-2xl uppercase">{pieces} pieces · serves {selected.serves}</p>
              <p className="font-display text-4xl text-gold">{formatUGX(selected.prices[0].amount)}</p>
            </div>
            <p className="mt-2 text-white/75">{selected.description}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={DELIVERY_PARTNERS[0].url} target="_blank" rel="noreferrer" className="btn-gold">Order this bucket</a>
            <Link to="/deals" className="btn-ghost text-white">All deals</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const HALAL_ICON = () => <img src={assetUrl('/images/brand/halal.jpg')} alt="" className="h-7 w-7 rounded-full" />
const FACT_ICONS: Record<FactIcon, () => React.JSX.Element> = {
  halal: HALAL_ICON,
  flame: () => <FlameIcon width={28} height={28} />,
  leaf: () => <LeafIcon width={28} height={28} />,
  choice: () => <CheckIcon width={28} height={28} />,
  globe: () => <GlobeIcon width={28} height={28} />,
  party: () => <PartyIcon width={28} height={28} />,
}

export function WhySection() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading align="center" eyebrow="Why Chicking" title={<>Reinventing flavours <span className="text-brand">forever</span></>} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FUN_FACTS.map((fact, i) => {
            const Icon = FACT_ICONS[fact.icon]
            return (
              <Reveal key={fact.title} delay={(i % 3) * 90} className="rounded-3xl bg-white p-7 ring-1 ring-black/5">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand"><Icon /></span>
                <h3 className="mt-5 text-2xl">{fact.title}</h3>
                <p className="mt-2 text-char/70">{fact.body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function VisitSection() {
  const store = LOCATIONS[0]
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <SectionHeading eyebrow="Come hungry" title={<>Find us on <span className="text-brand">Parliament Ave</span></>} />
          <ul className="mt-8 space-y-4 text-lg">
            <li className="flex gap-4"><PinIcon className="mt-1 shrink-0 text-brand" />{store.address}</li>
            <li className="flex flex-wrap items-center gap-4">
              <ClockIcon className="shrink-0 text-brand" />{SITE.hoursLabel}
              <OpenStatusPill className="!bg-char" />
            </li>
            <li className="flex gap-4"><PhoneIcon className="mt-1 shrink-0 text-brand" /><a href={telHref(SITE.phone)} className="hover:text-brand">{SITE.phone}</a></li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={directionsUrl(store)} target="_blank" rel="noreferrer" className="btn-primary">Get directions</a>
            <Link to="/locations" className="btn-ghost text-char">Store details</Link>
          </div>
        </div>
        <Reveal className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10">
          <iframe title="Map of Chicking Uganda at Jumbo Plaza" src={store.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[22rem] w-full border-0 sm:h-[26rem]" />
        </Reveal>
      </div>
    </section>
  )
}

export function CateringBand() {
  return (
    <section className="bg-brand py-16 text-white">
      <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="eyebrow text-white/85">Events · Offices · Celebrations</p>
          <h2 className="mt-2 text-4xl sm:text-5xl">Catering for 10 or 200</h2>
        </div>
        <Link to="/contact" className="btn bg-white text-brand hover:bg-cream">Plan your order <ArrowIcon /></Link>
      </div>
    </section>
  )
}
