import { ArrowIcon, CheckIcon } from '../components/Icons'
import { PageHero, Reveal, SectionHeading, usePageMeta } from '../components/ui'
import { SITE } from '../config/site'
import { BRAND_STATS, FRANCHISE_FORMATS, FRANCHISE_MODELS } from '../data/brand'

const REASONS = [
  'A proven brand trading since 2000',
  'Fully halal: a strong fit for East African markets',
  'Ongoing training, supply-chain and marketing support',
  'Flexible formats for almost any retail space',
] as const

export function FranchisePage() {
  usePageMeta('Franchise', 'Open a Chicking restaurant in Uganda. Master, area developer and unit franchise options with full brand support.')
  return (
    <>
      <PageHero eyebrow="Franchise with Chicking" title={<>Bring the crunch to <span className="text-gold">your city</span></>}
        intro="We are growing across Uganda and East Africa, and looking for partners who care about great food as much as we do.">
        <a href={SITE.franchiseForm} target="_blank" rel="noreferrer" className="btn-gold mt-8">Apply on Chicking Global <ArrowIcon /></a>
      </PageHero>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Why partner with us" title={<>Built for <span className="text-brand">growth</span></>} />
          <ul className="mt-8 space-y-4">
            {REASONS.map((r) => (
              <li key={r} className="flex gap-3 text-lg">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-white"><CheckIcon width={14} height={14} /></span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {BRAND_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="rounded-3xl bg-cream p-6">
              <p className="font-display text-5xl text-brand">{s.value}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-char/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-char py-20 text-white">
        <div className="container-page">
          <SectionHeading tone="dark" eyebrow="Franchise models" title="Three ways to join" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {FRANCHISE_MODELS.map((m, i) => (
              <Reveal key={m.title} delay={i * 90} className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10">
                <p className="font-display text-6xl text-gold/40">0{i + 1}</p>
                <h3 className="mt-2 text-3xl">{m.title}</h3>
                <p className="mt-3 text-white/70">{m.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <p className="eyebrow text-gold">Formats</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {FRANCHISE_FORMATS.map((f) => <span key={f} className="rounded-full bg-white/10 px-4 py-2 text-sm">{f}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <h2 className="text-4xl sm:text-5xl">Ready to talk?</h2>
        <p className="mx-auto mt-3 max-w-lg text-lg text-char/70">Franchise applications go through the Chicking Global team, who will connect you with the right regional partner.</p>
        <a href={SITE.franchiseForm} target="_blank" rel="noreferrer" className="btn-primary mt-8">Start your application <ArrowIcon /></a>
      </section>
    </>
  )
}
