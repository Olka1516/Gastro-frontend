export const CURRENCY_CODES = ['UAH', 'EUR', 'USD'] as const

export type CurrencyCode = (typeof CURRENCY_CODES)[number]

export const DEFAULT_CURRENCY: CurrencyCode = 'UAH'

export const CURRENCY_SYMBOL: Record<CurrencyCode, string> = {
  UAH: '₴',
  EUR: '€',
  USD: '$',
}

export function getCurrencySymbol(currency: CurrencyCode): string {
  return CURRENCY_SYMBOL[currency]
}

export function parseCurrency(value: unknown): CurrencyCode {
  if (typeof value === 'string') {
    const normalized = value.trim().toUpperCase()
    if ((CURRENCY_CODES as readonly string[]).includes(normalized)) {
      return normalized as CurrencyCode
    }
  }
  return DEFAULT_CURRENCY
}
