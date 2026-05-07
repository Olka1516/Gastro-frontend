export function formatReservationReceivedAt(iso: string, i18nLocale: string): string {
  const intlLocale = i18nLocale === 'ua' ? 'uk-UA' : 'en-US'
  try {
    return new Intl.DateTimeFormat(intlLocale, { dateStyle: 'short', timeStyle: 'short' }).format(
      new Date(iso),
    )
  } catch {
    return iso
  }
}
