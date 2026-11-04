import { useRef, type KeyboardEvent, type ReactNode } from 'react'

export interface SegmentOption<T extends string> {
  id: T
  label: ReactNode
}

interface SegmentedControlProps<T extends string> {
  label: string
  options: readonly SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
  optionClassName?: (isSelected: boolean) => string
}

const KEY_STEPS: Record<string, number | 'first' | 'last'> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
  Home: 'first',
  End: 'last',
}

/** An ARIA radiogroup with roving tabindex and arrow/Home/End keys. */
export function SegmentedControl<T extends string>({
  label, options, value, onChange, className = '', optionClassName = () => '',
}: SegmentedControlProps<T>) {
  const buttons = useRef<Array<HTMLButtonElement | null>>([])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = KEY_STEPS[event.key]
    if (step === undefined) return
    event.preventDefault()
    const current = Math.max(0, options.findIndex((o) => o.id === value))
    const next =
      step === 'first' ? 0 : step === 'last' ? options.length - 1 : (current + step + options.length) % options.length
    onChange(options[next].id)
    buttons.current[next]?.focus()
  }

  return (
    <div role="radiogroup" aria-label={label} className={className} onKeyDown={onKeyDown}>
      {options.map((option, index) => {
        const isSelected = option.id === value
        return (
          <button
            key={option.id}
            ref={(node) => { buttons.current[index] = node }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(option.id)}
            className={optionClassName(isSelected)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
