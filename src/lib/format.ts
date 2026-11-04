const UGX_FORMATTER = new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 })

export function formatUGX(amount: number): string {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new Error(`Invalid UGX amount: ${amount}`)
  }
  return `UGX ${UGX_FORMATTER.format(amount)}`
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function whatsappHref(phone: string, message?: string): string {
  const base = `https://wa.me/${phone.replace(/\D/g, '')}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
