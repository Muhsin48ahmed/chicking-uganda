import { useState, type FormEvent } from 'react'
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '../components/Icons'
import { PageHero, usePageMeta } from '../components/ui'
import { LOCATIONS, SITE, SOCIAL_LINKS } from '../config/site'
import { CONTACT_TOPICS, buildContactMessage, validateContact, type ContactErrors, type ContactInput } from '../lib/contact'
import { telHref, whatsappHref } from '../lib/format'

const VALIDATED_FIELDS = ['name', 'email', 'message'] as const

const EMPTY_FORM: ContactInput = { name: '', email: '', topic: CONTACT_TOPICS[0], message: '' }

const FAQS = [
  { q: 'Is all of your food halal?', a: 'Yes. Chicking is a fully halal brand, and every item on our menu is halal.' },
  { q: 'Do you deliver?', a: 'Yes, across Kampala through Glovo, every day from 11am to 11pm.' },
  { q: 'Can you cater my event?', a: 'Absolutely. Choose the Catering & events topic in the form and tell us the date, location and headcount.' },
  { q: 'I have a problem with an order.', a: 'Please call the store directly on the number above so we can sort it out right away.' },
] as const

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-brand">{error}</p>}
    </div>
  )
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl bg-white px-4 py-3 ring-1 focus:ring-2 focus:outline-none ${hasError ? 'ring-brand focus:ring-brand' : 'ring-black/15 focus:ring-brand'}`

export function ContactPage() {
  usePageMeta('Contact', 'Contact Chicking Uganda for feedback, catering and general enquiries. Call +256 746 141 414 or send us a message.')
  const [form, setForm] = useState<ContactInput>(EMPTY_FORM)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sentHref, setSentHref] = useState<string | null>(null)
  const store = LOCATIONS[0]

  const update = (field: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const result = validateContact(form)
    setErrors(result.errors)
    if (!result.isValid) {
      const firstInvalid = VALIDATED_FIELDS.find((field) => result.errors[field])
      if (firstInvalid) document.getElementById(firstInvalid)?.focus()
      return
    }
    // Keep the form filled in: a blocked pop-up must not lose the visitor's message.
    const href = whatsappHref(SITE.whatsapp, buildContactMessage(form))
    window.open(href, '_blank', 'noopener,noreferrer')
    setSentHref(href)
  }

  return (
    <>
      <PageHero eyebrow="Contact us" title={<>We&apos;d love to <span className="text-gold">hear from you</span></>}
        intro="Feedback, catering, careers or just a hello. For anything about a current order, please call the store first." />

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1.3fr]">
        <aside className="space-y-6">
          <div className="rounded-3xl bg-char p-8 text-white">
            <h2 className="text-3xl">Talk to the store</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 shrink-0 text-gold" />
                <span>
                  <a href={telHref(SITE.phone)} className="hover:text-gold">{SITE.phone}</a>
                  {' · '}
                  <a href={telHref(SITE.phoneAlt)} className="hover:text-gold">{SITE.phoneAlt}</a>
                  <span className="block text-sm text-white/60">Calls and WhatsApp</span>
                </span>
              </li>
              <li className="flex gap-3"><PinIcon className="mt-0.5 shrink-0 text-gold" />{store.address}</li>
              <li className="flex gap-3"><ClockIcon className="mt-0.5 shrink-0 text-gold" />{SITE.hoursLabel}</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20">{s.name}</a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-cream p-8">
            <h2 className="text-3xl">Quick answers</h2>
            <div className="mt-4 divide-y divide-black/10">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {f.q}<span className="text-brand transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-char/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </aside>

        <form noValidate onSubmit={onSubmit} className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-10" aria-describedby="form-note">
          <h2 className="text-4xl">Send a message</h2>
          <p id="form-note" className="mt-2 text-char/60">Your message opens in WhatsApp, ready to send to our team.</p>
          {sentHref && (
            <p role="status" className="mt-4 rounded-xl bg-halal/10 px-4 py-3 text-sm font-medium text-halal">
              Thanks! WhatsApp should have opened with your message. Tap send there to reach us. Didn&apos;t open?{' '}
              <a href={sentHref} target="_blank" rel="noreferrer" className="underline">Open WhatsApp</a>
            </p>
          )}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Your name" error={errors.name}>
              <input id="name" autoComplete="name" value={form.name} onChange={update('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} className={inputClass(Boolean(errors.name))} />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input id="email" type="email" autoComplete="email" value={form.email} onChange={update('email')} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} className={inputClass(Boolean(errors.email))} />
            </Field>
            <div className="sm:col-span-2">
              <Field id="topic" label="Topic">
                <select id="topic" value={form.topic} onChange={update('topic')} className={inputClass(false)}>
                  {CONTACT_TOPICS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field id="message" label="Message" error={errors.message}>
                <textarea id="message" rows={6} value={form.message} onChange={update('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} className={inputClass(Boolean(errors.message))} />
              </Field>
            </div>
          </div>
          <button type="submit" className="btn-primary mt-8 w-full sm:w-auto"><WhatsAppIcon /> Send via WhatsApp</button>
        </form>
      </section>
    </>
  )
}
