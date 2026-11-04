import { assetUrl } from '../lib/assetUrl'

/**
 * Promo videos from Chicking Uganda's TikTok (@chicking.uganda), November 2026.
 * To add one: copy the number at the end of the TikTok video link and add an
 * entry here. Posters are our own product photos, so nothing loads from TikTok
 * until a visitor presses play.
 *
 * If Chicking supplies the original ad file, put it in public/videos/ and set
 * `file`: it then plays on the site directly (faster, works in every browser,
 * no TikTok needed), and the TikTok link stays as a backup.
 */

export type VideoTag = 'deal' | 'food' | 'brand'

export interface PromoVideo {
  id: string
  title: string
  kicker: string
  /** Product photo shown before play. Omit to show a bold text poster. */
  poster?: string
  /** Big text for the poster when there is no photo, e.g. "1+1". */
  posterText?: string
  /** Self-hosted MP4 in public/videos/, used instead of TikTok when present. */
  file?: string
  tags: readonly VideoTag[]
}

/**
 * Home page background loop, cut from Chicking's brand ad (the same footage the
 * old chicking.ug hero streamed from chickingoman.com). Silent, ~26 s.
 * Desktop: 1920x1080, ~9 MB. Phone: 608x1080 portrait crop, ~4 MB.
 * To replace it, drop new files at these paths (see README for the ffmpeg settings).
 */
export const HERO_VIDEO = {
  desktop: assetUrl('/videos/hero-desktop.mp4'),
  mobile: assetUrl('/videos/hero-mobile.mp4'),
  poster: assetUrl('/videos/hero-poster.webp'),
  posterMobile: assetUrl('/videos/hero-poster-mobile.webp'),
} as const

const TIKTOK_ACCOUNT = 'chicking.uganda'
const TIKTOK_ID_PATTERN = /^\d{18,20}$/

export const PROMO_VIDEOS: readonly PromoVideo[] = [
  { id: '7702364846255279367', kicker: 'Every Friday', title: 'Mega Friday: 10 pcs for UGX 51,000', poster: assetUrl('/images/menu/super-saver.webp'), tags: ['deal'] },
  { id: '7699034856277216520', kicker: 'Wednesday & Saturday', title: 'Buy 1 pizza, get 1 free', posterText: '1+1', tags: ['deal'] },
  { id: '7701250000096988424', kicker: 'UGX 28,000', title: 'Grilled Chicken Budget Meal', poster: assetUrl('/images/menu/budget-meal.webp'), tags: ['food', 'deal'] },
  { id: '7692336652320001288', kicker: 'Meal for one', title: 'Kampala, ready for the crunch?', poster: assetUrl('/images/menu/crunchy-box-c3.webp'), tags: ['food'] },
  { id: '7686034501620862226', kicker: 'For the whole table', title: 'The Chicken Lover Bucket', poster: assetUrl('/images/menu/chicken-lover-bucket.webp'), tags: ['food'] },
  { id: '7683071416987684114', kicker: 'UGX 27,000', title: '5 pcs Strips Meal', poster: assetUrl('/images/menu/strips-meal.webp'), tags: ['food'] },
  { id: '7676392344559570183', kicker: 'Spicy kick', title: 'Tandoori Burger combo', poster: assetUrl('/images/menu/tandoori-burger.webp'), tags: ['food'] },
  { id: '7671569005475417352', kicker: 'Thank you, Kampala', title: '1 year of Chicking Uganda', poster: assetUrl('/images/menu/share-bucket.webp'), tags: ['brand'] },
]

function assertTikTokId(id: string): void {
  if (!TIKTOK_ID_PATTERN.test(id)) throw new Error(`Invalid TikTok video id: ${id}`)
}

/** TikTok's official embed player. */
export function tiktokPlayerUrl(id: string): string {
  assertTikTokId(id)
  return `https://www.tiktok.com/player/v1/${id}?autoplay=1&rel=0&music_info=0&description=0`
}

export function tiktokVideoUrl(id: string): string {
  assertTikTokId(id)
  return `https://www.tiktok.com/@${TIKTOK_ACCOUNT}/video/${id}`
}

export function getVideosByTag(tag: VideoTag): readonly PromoVideo[] {
  return PROMO_VIDEOS.filter((video) => video.tags.includes(tag))
}
