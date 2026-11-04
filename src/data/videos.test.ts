import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { PROMO_VIDEOS, getVideosByTag, tiktokPlayerUrl, tiktokVideoUrl } from './videos'

describe('promo videos', () => {
  test('every video id is a unique numeric TikTok id', () => {
    const ids = PROMO_VIDEOS.map((v) => v.id)
    expect(new Set(ids).size).toBe(ids.length)
    ids.forEach((id) => expect(id).toMatch(/^\d{18,20}$/))
  })

  test('every poster and video file exists in public/', () => {
    const assets = PROMO_VIDEOS.flatMap((v) => [v.poster, v.file]).filter((p): p is string => Boolean(p))
    assets.forEach((asset) => expect(existsSync(resolve(process.cwd(), 'public', asset.replace(/^\//, '')))).toBe(true))
  })

  test('every video has a photo or text poster', () => {
    PROMO_VIDEOS.forEach((v) => expect(Boolean(v.poster || v.posterText)).toBe(true))
  })

  test('filters by tag', () => {
    expect(getVideosByTag('deal').every((v) => v.tags.includes('deal'))).toBe(true)
    expect(getVideosByTag('deal').length).toBeGreaterThan(0)
  })
})

describe('TikTok URLs', () => {
  test('player URL autoplays and hides related videos', () => {
    expect(tiktokPlayerUrl('7702364846255279367')).toBe(
      'https://www.tiktok.com/player/v1/7702364846255279367?autoplay=1&rel=0&music_info=0&description=0',
    )
  })

  test('rejects anything that is not a numeric id', () => {
    expect(() => tiktokPlayerUrl('123abc')).toThrow()
    expect(() => tiktokPlayerUrl('../evil')).toThrow()
  })

  test('video page URL points at the Chicking Uganda account', () => {
    expect(tiktokVideoUrl('7702364846255279367')).toBe('https://www.tiktok.com/@chicking.uganda/video/7702364846255279367')
  })
})
