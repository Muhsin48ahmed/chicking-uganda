import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Flavour } from '../../data/menu'
import { Bucket3D } from '../Bucket3D'
import { ArrowIcon } from '../Icons'
import { SegmentedControl } from '../SegmentedControl'

const FLAVOUR_OPTIONS: ReadonlyArray<{ id: Flavour; label: string; line: string }> = [
  { id: 'original', label: 'Original', line: 'Golden, crispy, not spicy. The classic.' },
  { id: 'spicy', label: 'Spicy', line: 'Our King of Spice blend brings the heat.' },
  { id: 'grilled', label: 'Grilled', line: 'Oven-grilled, smoky and juicy.' },
]

/** The interactive 3D bucket with the Original / Spicy / Grilled switch. */
export function FlavourSection() {
  const [flavour, setFlavour] = useState<Flavour>('original')
  const active = FLAVOUR_OPTIONS.find((f) => f.id === flavour) ?? FLAVOUR_OPTIONS[0]

  return (
    <section id="flavours" className="relative isolate scroll-mt-16 overflow-hidden bg-[radial-gradient(ellipse_at_70%_45%,#e3191f_0%,#a30d12_45%,#3d0406_100%)] py-16 text-white sm:py-24">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.07] [background-image:repeating-linear-gradient(-45deg,#fff_0_2px,transparent_2px_22px)]" />
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 h-[32rem] w-[32rem] rounded-full border-[50px] border-gold/10" />

      <div className="container-page grid items-center gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow text-white/85">It&apos;s my choice</p>
          <h2 className="mt-3 text-5xl leading-[0.9] sm:text-6xl lg:text-7xl">
            Original. <span className="text-gold">Spicy.</span> Grilled.
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/80">
            Every piece, every bucket, your way. Pick a flavour and give the bucket a spin.
          </p>

          <SegmentedControl
            label="Choose a flavour"
            options={FLAVOUR_OPTIONS}
            value={flavour}
            onChange={setFlavour}
            className="mt-7 inline-flex rounded-full bg-black/25 p-1.5 backdrop-blur"
            optionClassName={(isSelected) =>
              `rounded-full px-4 py-2 font-display text-sm uppercase tracking-wider transition sm:px-6 sm:text-base ${
                isSelected ? 'bg-gold text-char shadow-lg' : 'text-white/80 hover:text-white'
              }`
            }
          />
          <p aria-live="polite" className="mt-3 h-6 text-sm text-white/85">{active.line}</p>

          <Link to="/menu" className="btn-ghost mt-6 text-white">
            Explore the menu <ArrowIcon />
          </Link>
        </div>

        <div className="relative -mx-4 h-[20rem] sm:h-[28rem] lg:mx-0 lg:h-[36rem]">
          <div aria-hidden className="absolute inset-x-10 bottom-8 h-24 rounded-full bg-black/40 blur-3xl" />
          <Bucket3D flavour={flavour} />
          <p className="pointer-events-none absolute bottom-2 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/50 lg:block">
            Drag to spin
          </p>
        </div>
      </div>
    </section>
  )
}
