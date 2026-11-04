import { buildContactMessage, validateContact } from './contact'

const valid = { name: 'Amina', email: 'amina@example.com', topic: 'Feedback', message: 'Loved the Double Crunchy!' }

describe('validateContact', () => {
  test('accepts a complete form', () => {
    expect(validateContact(valid)).toEqual({ isValid: true, errors: {} })
  })

  test('requires a name', () => {
    expect(validateContact({ ...valid, name: '  ' }).errors.name).toBe('Please tell us your name.')
  })

  test('rejects a malformed email', () => {
    expect(validateContact({ ...valid, email: 'amina@' }).errors.email).toBe('Please enter a valid email address.')
  })

  test('requires a message of at least 10 characters', () => {
    expect(validateContact({ ...valid, message: 'hi' }).errors.message).toBe(
      'Your message should be at least 10 characters.',
    )
  })

  test('caps message length', () => {
    expect(validateContact({ ...valid, message: 'x'.repeat(1001) }).isValid).toBe(false)
  })

  test('does not mutate the input', () => {
    const input = { ...valid, name: '  Amina  ' }
    validateContact(input)
    expect(input.name).toBe('  Amina  ')
  })
})

describe('buildContactMessage', () => {
  test('includes topic, name, email and trimmed message', () => {
    const text = buildContactMessage({ ...valid, message: '  Loved it  ' })
    expect(text).toBe('Website enquiry: Feedback\nName: Amina\nEmail: amina@example.com\n\nLoved it')
  })
})
