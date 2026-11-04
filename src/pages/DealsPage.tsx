import { useEffect, useRef, useState } from 'react'
import { CloseIcon } from '../components/Icons'
import { MenuCard } from '../components/MenuCard'
import { PageHero, Reveal, SectionHeading, usePageMeta } from '../components/ui'
import { DELIVERY_PARTNERS } from '../config/site'
import { DEALS, MENU_BOARDS } from '../data/deals'
import { getItemsByCategory } from '../data/menu'
import { getVideosByTag } from '../data/videos'
import { VideoReel } from '../components/VideoReel'

/**
 * Native <dialog> gives a focus trap, Escape-to-close and a top layer for free.
 * Focus returns to the board that opened it, and the page behind cannot scroll.
 */
function BoardLightbox({ index, onClose }: { index: number; onClose: () => void }) {
  const board = MENU_BOARDS[index]
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (dialog && !dialog.open) dialog.showModal?.()
    return () => {
      document.body.style.overflow = previousOverflow
      opener?.focus()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-label={board.alt}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-4 backdrop:bg-black/85 open:grid open:place-items-center"
    >
      <button type="button" autoFocus onClick={onClose} aria-label="Close" className="absolute top-4 right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
        <CloseIcon />
      </button>
      <img src={board.src} alt={board.alt} className="max-h-[88vh] w-auto max-w-full rounded-xl" />
    </dialog>
  )
}

export function DealsPage() {
  usePageMeta('Deals & Buckets', 'Chicking Uganda deals: Saturday pizza offer, Super Saver buckets, Crunchy Box meals and kids meals with a free toy.')
  const [openBoard, setOpenBoard] = useState<number | null>(null)
  const [weekly, ...deals] = DEALS

  return (
    <>
      <PageHero eyebrow="Deals" title={<>More crunch <span className="text-gold">for your shilling</span></>}
        intro="Weekly offers, family buckets and full meals at honest prices." />

      <section className="container-page -mt-10 pb-6">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gold p-8 text-char shadow-2xl sm:p-12">
          <div aria-hidden className="absolute -right-10 -bottom-16 font-display text-[12rem] leading-none text-white/30">1+1</div>
          <p className="board-frame eyebrow text-brand-deep">{weekly.kicker}</p>
          <h2 className="mt-4 max-w-xl text-5xl leading-[0.9] sm:text-6xl">{weekly.title}</h2>
          <p className="mt-4 max-w-lg text-lg text-char/75">{weekly.body}</p>
          <a href={DELIVERY_PARTNERS[0].url} target="_blank" rel="noreferrer" className="btn-primary mt-6">Order on Glovo</a>
        </Reveal>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {deals.map((deal, i) => (
            <Reveal key={deal.id} delay={(i % 2) * 100} className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 sm:flex-row">
              {deal.image && (
                <div className="flex items-center justify-center bg-cream p-4 sm:w-2/5">
                  <img src={deal.image} alt="" loading="lazy" className="max-h-48 w-full object-contain" />
                </div>
              )}
              <div className="flex-1 p-6 sm:p-8">
                <p className="eyebrow text-brand">{deal.kicker}</p>
                <h3 className="mt-2 text-3xl leading-none">{deal.title}</h3>
                <p className="mt-3 text-char/70">{deal.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <VideoReel videos={getVideosByTag('deal')} eyebrow="Watch the deals" title={<>See it. <span className="text-gold">Crave it.</span></>} />

      <section className="bg-cream py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Buckets" title={<>Share the <span className="text-brand">bucket</span></>} intro="Every bucket can be Original, Spicy, Grilled or a mix." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getItemsByCategory('buckets').map((item) => <MenuCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading eyebrow="In store" title="Our menu boards" intro="The same boards you see at the counter. Tap one to enlarge." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MENU_BOARDS.map((board, i) => (
            <button key={board.src} type="button" onClick={() => setOpenBoard(i)} className="overflow-hidden rounded-2xl ring-1 ring-black/10 transition hover:scale-[1.02] hover:shadow-xl">
              <img src={board.src} alt={board.alt} loading="lazy" className="aspect-video w-full object-cover" />
            </button>
          ))}
        </div>
      </section>
      {openBoard !== null && <BoardLightbox index={openBoard} onClose={() => setOpenBoard(null)} />}
    </>
  )
}
