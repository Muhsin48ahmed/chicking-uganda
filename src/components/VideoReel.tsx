import { useRef, useState } from 'react'
import { SOCIAL_LINKS } from '../config/site'
import { tiktokPlayerUrl, tiktokVideoUrl, type PromoVideo } from '../data/videos'
import { ChevronIcon, PlayIcon, TikTokIcon } from './Icons'
import { Reveal, SectionHeading } from './ui'

const SCROLL_STEP_RATIO = 0.8
const TIKTOK_PROFILE = SOCIAL_LINKS.find((s) => s.name === 'TikTok')?.url ?? 'https://www.tiktok.com/@chicking.uganda'

function VideoCard({ video, isPlaying, onPlay }: { video: PromoVideo; isPlaying: boolean; onPlay: () => void }) {
  return (
    <article className="w-[15.5rem] shrink-0 snap-start sm:w-[17rem]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-char shadow-2xl ring-1 ring-white/10">
        {isPlaying && video.file ? (
          <video
            src={video.file}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            aria-label={`Chicking Uganda video: ${video.title}`}
            className="absolute inset-0 h-full w-full bg-black object-cover"
          />
        ) : isPlaying ? (
          <iframe
            src={tiktokPlayerUrl(video.id)}
            title={`Chicking Uganda video: ${video.title}`}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button type="button" onClick={onPlay} aria-label={`Play video: ${video.title}`}
            className="group absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-brand via-brand-deep to-ember p-5 text-left text-white">
            <span className="eyebrow text-white/85">{video.kicker}</span>
            {video.poster ? (
              <img src={video.poster} alt="" loading="lazy" decoding="async"
                className="mx-auto w-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.45)] transition duration-500 group-hover:scale-105" />
            ) : (
              <span aria-hidden className="text-center font-display text-[6.5rem] leading-none text-gold drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition duration-500 group-hover:scale-105">
                {video.posterText}
              </span>
            )}
            <span>
              <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold text-char shadow-lg transition group-hover:scale-110">
                <PlayIcon width={24} height={24} />
              </span>
              <span className="block font-display text-2xl uppercase leading-[0.95]">{video.title}</span>
            </span>
          </button>
        )}
      </div>
      <a href={tiktokVideoUrl(video.id)} target="_blank" rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white">
        <TikTokIcon width={14} height={14} /> Watch on TikTok
      </a>
    </article>
  )
}

export function VideoReel({ videos, eyebrow, title, intro }: {
  videos: readonly PromoVideo[]
  eyebrow: string
  title: React.ReactNode
  intro?: string
}) {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current
    if (track) track.scrollBy({ left: direction * track.clientWidth * SCROLL_STEP_RATIO, behavior: 'smooth' })
  }

  return (
    <section className="overflow-hidden bg-char py-20 text-white sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading tone="dark" eyebrow={eyebrow} title={title} intro={intro} />
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous videos" className="hidden rounded-full border-2 border-white/20 p-3 hover:border-white/60 sm:block">
              <ChevronIcon className="rotate-180" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="More videos" className="hidden rounded-full border-2 border-white/20 p-3 hover:border-white/60 sm:block">
              <ChevronIcon />
            </button>
            <a href={TIKTOK_PROFILE} target="_blank" rel="noreferrer" className="btn-gold">
              <TikTokIcon /> Follow us
            </a>
          </div>
        </div>
        <Reveal>
          <div ref={trackRef} role="list" aria-label="Promo videos"
            className="-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {videos.map((video) => (
              <div role="listitem" key={video.id}>
                <VideoCard video={video} isPlaying={playingId === video.id} onPlay={() => setPlayingId(video.id)} />
              </div>
            ))}
          </div>
        </Reveal>
        <p className="mt-4 text-xs text-white/40">Videos play from TikTok and load only when you press play.</p>
      </div>
    </section>
  )
}
