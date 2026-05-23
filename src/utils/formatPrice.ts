import {
  DEFAULT_CURRENCY,
  getCurrencySymbol,
  type CurrencyCode,
} from '@/constants/currency'

export function formatMenuPrice(
  amount: number,
  currency: CurrencyCode = DEFAULT_CURRENCY,
  locale = 'uk-UA',
): string {
  const value = Number.isFinite(amount) ? amount : 0

  const number = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

  return `${number}\u00a0${getCurrencySymbol(currency)}`
}
