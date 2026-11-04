export interface ContactInput {
  name: string
  email: string
  topic: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>

export interface ContactValidation {
  isValid: boolean
  errors: ContactErrors
}

const MIN_MESSAGE_LENGTH = 10
const MAX_MESSAGE_LENGTH = 1000
const MAX_NAME_LENGTH = 80
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const CONTACT_TOPICS = ['General enquiry', 'Feedback', 'Catering & events', 'Careers'] as const

export function validateContact(input: ContactInput): ContactValidation {
  const name = input.name.trim()
  const email = input.email.trim()
  const message = input.message.trim()

  const errors: ContactErrors = {
    ...(name.length === 0 && { name: 'Please tell us your name.' }),
    ...(name.length > MAX_NAME_LENGTH && { name: 'That name is a little long.' }),
    ...(!EMAIL_PATTERN.test(email) && { email: 'Please enter a valid email address.' }),
    ...(message.length < MIN_MESSAGE_LENGTH && {
      message: `Your message should be at least ${MIN_MESSAGE_LENGTH} characters.`,
    }),
    ...(message.length > MAX_MESSAGE_LENGTH && {
      message: `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`,
    }),
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}

export function buildContactMessage(input: ContactInput): string {
  return [
    `Website enquiry: ${input.topic.trim()}`,
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    '',
    input.message.trim(),
  ].join('\n')
}
