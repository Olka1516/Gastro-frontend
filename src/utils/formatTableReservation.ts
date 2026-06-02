import { intlLocaleForUi } from '@/lang'

export function formatReservationReceivedAt(iso: string, i18nLocale: string): string {
  const intlLocale = intlLocaleForUi(i18nLocale)
  try {
    return new Intl.DateTimeFormat(intlLocale, { dateStyle: 'short', timeStyle: 'short' }).format(
      new Date(iso),
    )
  } catch {
    return iso
  }
}
