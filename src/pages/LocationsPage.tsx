import { BikeIcon, ClockIcon, PhoneIcon, PinIcon } from '../components/Icons'
import { OpenStatusPill, PageHero, Reveal, usePageMeta } from '../components/ui'
import { DELIVERY_PARTNERS, LOCATIONS, SITE, directionsUrl } from '../config/site'
import { telHref } from '../lib/format'

export function LocationsPage() {
  usePageMeta('Find Us', 'Chicking Uganda is at Jumbo Plaza, 2 Parliament Avenue, Kampala. Open every day 11am to 11pm for dine-in, takeaway and delivery.')
  return (
    <>
      <PageHero eyebrow="Find us" title={<>Right in the <span className="text-gold">heart of Kampala</span></>}
        intro="Dine in, take away, or have it delivered hot to your door.">
        <OpenStatusPill className="mt-6" />
      </PageHero>

      {LOCATIONS.map((store) => (
        <section key={store.id} className="container-page grid gap-8 py-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="rounded-3xl bg-white p-8 ring-1 ring-black/5">
            <p className="eyebrow text-brand">Flagship store</p>
            <h2 className="mt-2 text-4xl">{store.name}</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3"><PinIcon className="mt-0.5 shrink-0 text-brand" />{store.address}</li>
              <li className="flex gap-3"><ClockIcon className="mt-0.5 shrink-0 text-brand" />{SITE.hoursLabel}</li>
              <li className="flex gap-3"><PhoneIcon className="mt-0.5 shrink-0 text-brand" /><a href={telHref(store.phone)} className="hover:text-brand">{store.phone}</a></li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {SITE.services.map((s) => (
                <span key={s} className="rounded-full bg-cream px-3 py-1 text-sm font-medium">{s}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a href={directionsUrl(store)} target="_blank" rel="noreferrer" className="btn-primary">Get directions</a>
              <a href={telHref(store.phone)} className="btn-ghost text-char"><PhoneIcon /> Call the store</a>
            </div>
          </Reveal>
          <Reveal delay={120} className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/10">
            <iframe title={`Map of ${store.name}`} src={store.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[26rem] w-full border-0 lg:h-full lg:min-h-[30rem]" />
          </Reveal>
        </section>
      ))}

      <section className="bg-ember py-16 text-white">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-gold">Delivery</p>
            <h2 className="mt-2 text-4xl sm:text-5xl">Too comfy to come out?</h2>
            <p className="mt-2 text-white/70">We deliver across Kampala through our delivery partners.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {DELIVERY_PARTNERS.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="btn-gold"><BikeIcon /> Order on {p.name}</a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
