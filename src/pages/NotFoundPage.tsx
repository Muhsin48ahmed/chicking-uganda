import { Link } from 'react-router-dom'
import { PageHero, usePageMeta } from '../components/ui'

export function NotFoundPage() {
  usePageMeta('Page not found')
  return (
    <PageHero eyebrow="404" title={<>This piece <span className="text-gold">flew the coop</span></>} intro="We couldn't find that page, but the chicken is still hot.">
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn-gold">Back home</Link>
        <Link to="/menu" className="btn-ghost text-white">See the menu</Link>
      </div>
    </PageHero>
  )
}
