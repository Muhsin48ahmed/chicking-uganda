import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import { PageHero, Reveal, SectionHeading, usePageMeta } from '../components/ui'
import { BRAND_STATS, WORLD_FLAVOURS } from '../data/brand'
import { getVideosByTag } from '../data/videos'
import { VideoReel } from '../components/VideoReel'

export function AboutPage() {
  usePageMeta('Our Story', 'Born in Dubai in 2000, Chicking is a fully halal international chicken brand now serving Kampala from Jumbo Plaza.')
  return (
    <>
      <PageHero eyebrow="Our story" title={<>Where the customer is king and <span className="text-gold">families are royalty</span></>}
        intro="From one Dubai outlet in 2000 to a family of restaurants across the world, and now on Parliament Avenue." />

      <section className="container-page -mt-10">
        <div className="grid grid-cols-2 gap-4 rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:p-10 lg:grid-cols-4">
          {BRAND_STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center">
              <p className="font-display text-5xl text-brand sm:text-6xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-char/60">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="Since 2000" title={<>Born in Dubai, <span className="text-brand">loved worldwide</span></>} />
          <div className="mt-6 space-y-4 text-lg text-char/75">
            <p>The first Chicking opened in Dubai in 2000. The idea was simple: understand what families want, then serve it fresh, fast and fully halal.</p>
            <p>We care about the whole experience, from where our herbs and spices are sourced to how clean our kitchens are. Every order is cooked fresh, with chicken that is never frozen.</p>
            <p>Chicking Uganda brings that same promise to Kampala, with the menu, the buckets and the crunch our fans know from Dubai to Dhaka.</p>
          </div>
        </div>
        <Reveal className="relative">
          <div aria-hidden className="absolute inset-6 -rotate-3 rounded-[2rem] bg-brand" />
          <img src="/images/menu/chicken-lover-bucket.webp" alt="Chicken Lover Bucket with wings, rice and tandoori fries" loading="lazy" className="relative rounded-[2rem] bg-cream shadow-2xl" />
        </Reveal>
      </section>

      <section className="bg-char py-20 text-white">
        <div className="container-page">
          <SectionHeading tone="dark" eyebrow="Innovation, served hot" title="A world of flavour on one menu"
            intro="Our recipes draw on cooking traditions from around the world, refined into signature recipes we keep secret." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORLD_FLAVOURS.map((f, i) => (
              <Reveal key={f.name} delay={i * 80} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="text-2xl text-gold">{f.name}</h3>
                <p className="mt-2 text-white/70">{f.example}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VideoReel videos={getVideosByTag('brand')} eyebrow="Our first year" title={<>365 days of <span className="text-gold">serving smiles</span></>}
        intro="Chicking Uganda turned one this year. Thank you, Kampala, for every bucket, box and bite." />

      <section className="container-page flex flex-col items-center py-20 text-center">
        <img src="/images/brand/halal.jpg" alt="Halal certified" className="h-24 w-24 rounded-full" />
        <h2 className="mt-6 max-w-2xl text-4xl sm:text-5xl">One of the first fully halal international chicken brands</h2>
        <p className="mt-4 max-w-xl text-lg text-char/70">Halal is not an add-on for us. It has been part of every Chicking kitchen since day one.</p>
        <Link to="/menu" className="btn-primary mt-8">Explore the menu <ArrowIcon /></Link>
      </section>
    </>
  )
}
