import type { MenuItem } from '../data/menu'
import { formatUGX } from '../lib/format'
import { FlavourTag } from './ui'

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_-12px_rgba(92,7,9,0.25)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(92,7,9,0.35)]">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-b from-cream to-white p-4">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span aria-hidden className="font-display text-6xl text-brand/15">CHICKING</span>
        )}
        {item.badge && (
          <span className="absolute top-3 left-3 -rotate-3 rounded-md bg-brand px-2.5 py-1 font-display text-xs uppercase tracking-wider text-white shadow">
            {item.badge}
          </span>
        )}
        {item.serves && (
          <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-char shadow-sm">
            Serves {item.serves}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl leading-tight text-char">{item.name}</h3>
        <p className="mt-1.5 flex-1 text-sm text-char/65">{item.description}</p>
        {item.flavours && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.flavours.map((f) => <FlavourTag key={f} flavour={f} />)}
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          {item.prices.map((price) => (
            <p key={price.label ?? 'price'} className="font-display text-2xl text-brand">
              {price.label === 'add' && <span className="mr-1 text-sm text-char/50">+</span>}
              {formatUGX(price.amount)}
              {price.label && price.label !== 'add' && (
                <span className="ml-1.5 font-sans text-xs font-medium normal-case text-char/50">{price.label}</span>
              )}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}
