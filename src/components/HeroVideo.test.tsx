import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HeroVideo } from './HeroVideo'

const mockMatchMedia = (reducedMotion: boolean) => {
  window.matchMedia = vi.fn((query: string) => ({
    matches: query.includes('reduced-motion') ? reducedMotion : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

describe('HeroVideo', () => {
  beforeEach(() => {
    mockMatchMedia(false)
    vi.mocked(HTMLMediaElement.prototype.play).mockClear().mockImplementation(() => Promise.resolve())
    vi.mocked(HTMLMediaElement.prototype.pause).mockClear()
  })

  test('autoplays a muted, looping, inline video with phone and desktop sources', () => {
    const { container } = render(<HeroVideo />)
    const video = container.querySelector('video')!
    expect(video.muted).toBe(true)
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveAttribute('playsinline')
    const sources = [...video.querySelectorAll('source')].map((s) => s.getAttribute('src'))
    expect(sources).toEqual(['/videos/hero-mobile.mp4', '/videos/hero-desktop.mp4'])
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled()
  })

  test('a skipped phone source on desktop does not count as a failure', () => {
    const { container } = render(<HeroVideo />)
    const [phoneSource] = container.querySelectorAll('source')
    fireEvent.error(phoneSource)
    expect(container.querySelector('video')).not.toBeNull()
  })

  test('falls back to the poster when no source can play', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { container } = render(<HeroVideo />)
    const sources = container.querySelectorAll('source')
    fireEvent.error(sources[sources.length - 1])
    expect(container.querySelector('video')).toBeNull()
    expect(container.querySelector('picture img')).toBeInTheDocument()
    expect(warn).toHaveBeenCalled()
  })

  test('pause button stops the video and can resume it', async () => {
    render(<HeroVideo />)
    await userEvent.click(screen.getByRole('button', { name: 'Pause background video' }))
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button', { name: 'Play background video' }))
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2)
  })

  test('with reduced motion it shows the still poster and does not play', () => {
    mockMatchMedia(true)
    const { container } = render(<HeroVideo />)
    expect(container.querySelector('video')).toBeNull()
    expect(container.querySelector('picture img')).toHaveAttribute('src', '/videos/hero-poster.webp')
    expect(screen.getByRole('button', { name: 'Play background video' })).toBeInTheDocument()
  })

  test('if the browser blocks autoplay, it offers a play button instead of failing', async () => {
    const blocked = Object.assign(new Error('Autoplay blocked'), { name: 'NotAllowedError' })
    vi.mocked(HTMLMediaElement.prototype.play).mockImplementation(() => Promise.reject(blocked))
    render(<HeroVideo />)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Play background video' })).toBeInTheDocument())
  })

  test('an interrupted play() (AbortError from a seek or pause) does not stop autoplay', async () => {
    const interrupted = Object.assign(new Error('The play() request was interrupted'), { name: 'AbortError' })
    vi.mocked(HTMLMediaElement.prototype.play).mockImplementation(() => Promise.reject(interrupted))
    render(<HeroVideo />)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(screen.getByRole('button', { name: 'Pause background video' })).toBeInTheDocument()
  })
})
