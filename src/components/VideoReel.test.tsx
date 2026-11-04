import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { PromoVideo } from '../data/videos'
import { VideoReel } from './VideoReel'

const selfHosted: PromoVideo = {
  id: '7702364846255279367', kicker: 'Every Friday', title: 'Mega Friday', posterText: '10', file: '/videos/mega-friday.mp4', tags: ['deal'],
}
const tiktokOnly: PromoVideo = {
  id: '7699034856277216520', kicker: 'Wed & Sat', title: 'Pizza deal', posterText: '1+1', tags: ['deal'],
}

describe('VideoReel', () => {
  test('plays a self-hosted file in a native video player instead of TikTok', async () => {
    const { container } = render(<VideoReel videos={[selfHosted]} eyebrow="Watch" title="Videos" />)
    await userEvent.click(screen.getByRole('button', { name: /play video: mega friday/i }))
    expect(container.querySelector('video')).toHaveAttribute('src', '/videos/mega-friday.mp4')
    expect(container.querySelector('iframe')).toBeNull()
  })

  test('shows the text poster when there is no photo', () => {
    render(<VideoReel videos={[tiktokOnly]} eyebrow="Watch" title="Videos" />)
    expect(screen.getByRole('button', { name: /play video: pizza deal/i })).toHaveTextContent('1+1')
  })

  test('always offers a Watch on TikTok fallback link', () => {
    render(<VideoReel videos={[tiktokOnly]} eyebrow="Watch" title="Videos" />)
    expect(screen.getByRole('link', { name: /watch on tiktok/i })).toHaveAttribute(
      'href', 'https://www.tiktok.com/@chicking.uganda/video/7699034856277216520',
    )
  })
})
