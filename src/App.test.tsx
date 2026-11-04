import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

vi.mock('./components/Bucket3D', () => ({ Bucket3D: () => <div data-testid="bucket-3d" /> }))

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

beforeAll(() => {
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
})

describe('routes', () => {
  test.each([
    ['/', /crunch/i],
    ['/menu', /full-on feast/i],
    ['/deals', /for your shilling/i],
    ['/locations', /heart of kampala/i],
    ['/about', /families are royalty/i],
    ['/franchise', /your city/i],
    ['/contact', /hear from you/i],
    ['/nope', /flew the coop/i],
  ])('%s renders its headline', (path, headline) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1, name: headline })).toBeInTheDocument()
  })
})

describe('menu page', () => {
  test('flavour filter hides items without that flavour', async () => {
    renderAt('/menu')
    expect(screen.getByRole('heading', { name: 'Coleslaw' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('radio', { name: 'Grilled' }))
    expect(screen.queryByRole('heading', { name: 'Coleslaw' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Big Beef Burger' })).toBeInTheDocument()
  })
})

describe('promo videos', () => {
  test('nothing loads from TikTok until play is pressed, and only one plays at a time', async () => {
    const { container } = renderAt('/')
    expect(container.querySelector('iframe[src*="tiktok.com"]')).toBeNull()
    await userEvent.click(screen.getByRole('button', { name: /play video: mega friday/i }))
    expect(screen.getByTitle(/mega friday/i)).toHaveAttribute('src', expect.stringContaining('tiktok.com/player/v1/7702364846255279367'))
    await userEvent.click(screen.getByRole('button', { name: /play video: grilled chicken budget meal/i }))
    expect(container.querySelectorAll('iframe[src*="tiktok.com"]')).toHaveLength(1)
  })
})

describe('deals page', () => {
  test('menu board lightbox opens and closes, returning focus', async () => {
    renderAt('/deals')
    const opener = screen.getByRole('button', { name: /super saver buckets/i })
    await userEvent.click(opener)
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })
})

describe('contact page', () => {
  test('shows validation errors and does not open WhatsApp for an empty form', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    renderAt('/contact')
    await userEvent.click(screen.getByRole('button', { name: /send via whatsapp/i }))
    expect(screen.getByText('Please tell us your name.')).toBeInTheDocument()
    expect(screen.getByLabelText('Your name')).toHaveFocus()
    expect(open).not.toHaveBeenCalled()
  })

  test('opens WhatsApp with the composed message when valid', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    renderAt('/contact')
    await userEvent.type(screen.getByLabelText('Your name'), 'Amina')
    await userEvent.type(screen.getByLabelText('Email'), 'amina@example.com')
    await userEvent.type(screen.getByLabelText('Message'), 'Can you cater 50 people?')
    await userEvent.click(screen.getByRole('button', { name: /send via whatsapp/i }))
    expect(open).toHaveBeenCalledWith(expect.stringContaining('https://wa.me/256746141414?text='), '_blank', 'noopener,noreferrer')
    expect(screen.getByRole('status')).toHaveTextContent(/whatsapp should have opened/i)
    expect(screen.getByRole('link', { name: 'Open WhatsApp' })).toHaveAttribute('href', expect.stringContaining('https://wa.me/'))
    expect(screen.getByLabelText('Your name')).toHaveValue('Amina')
  })
})
