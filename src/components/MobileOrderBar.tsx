import { DELIVERY_PARTNERS, SITE } from '../config/site'
import { telHref } from '../lib/format'
import { BikeIcon, PhoneIcon } from './Icons'

/** Thumb-reach order actions, shown on phones only. */
export function MobileOrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-paper/95 p-3 backdrop-blur sm:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={telHref(SITE.phone)} className="btn-ghost !py-3 text-brand">
          <PhoneIcon /> Call
        </a>
        <a href={DELIVERY_PARTNERS[0].url} target="_blank" rel="noreferrer" className="btn-primary !py-3">
          <BikeIcon /> Order now
        </a>
      </div>
    </div>
  )
}
