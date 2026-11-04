import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { SegmentedControl } from './SegmentedControl'

const OPTIONS = [
  { id: 'original', label: 'Original' },
  { id: 'spicy', label: 'Spicy' },
  { id: 'grilled', label: 'Grilled' },
] as const

function Harness() {
  const [value, setValue] = useState<(typeof OPTIONS)[number]['id']>('original')
  return <SegmentedControl label="Flavour" options={OPTIONS} value={value} onChange={setValue} />
}

describe('SegmentedControl', () => {
  test('only the checked option is in the tab order', () => {
    render(<Harness />)
    expect(screen.getByRole('radio', { name: 'Original' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('radio', { name: 'Spicy' })).toHaveAttribute('tabindex', '-1')
  })

  test('arrow keys move selection and focus, wrapping around', async () => {
    render(<Harness />)
    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')
    const spicy = screen.getByRole('radio', { name: 'Spicy' })
    expect(spicy).toHaveAttribute('aria-checked', 'true')
    expect(spicy).toHaveFocus()
    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(screen.getByRole('radio', { name: 'Grilled' })).toHaveFocus()
  })

  test('Home and End jump to the first and last options', async () => {
    render(<Harness />)
    await userEvent.tab()
    await userEvent.keyboard('{End}')
    expect(screen.getByRole('radio', { name: 'Grilled' })).toHaveAttribute('aria-checked', 'true')
    await userEvent.keyboard('{Home}')
    expect(screen.getByRole('radio', { name: 'Original' })).toHaveAttribute('aria-checked', 'true')
  })

  test('clicking selects an option', async () => {
    render(<Harness />)
    await userEvent.click(screen.getByRole('radio', { name: 'Grilled' }))
    expect(screen.getByRole('radio', { name: 'Grilled' })).toHaveAttribute('aria-checked', 'true')
  })
})
