import { MENU_LANGUAGE_CODES } from '@/constants/menuLanguages'

export const MENU_CODE_TO_UI_LOCALE = {
  uk: 'ua',
  en: 'en',
  pl: 'pl',
  de: 'de',
  fr: 'fr',
  es: 'es',
  it: 'it',
  cs: 'cs',
  ro: 'ro',
  tr: 'tr',
  pt: 'pt',
  sk: 'sk',
} as const satisfies Record<string, string>

export const UI_LOCALES = [
  'ua',
  'en',
  'pl',
  'de',
  'fr',
  'es',
  'it',
  'cs',
  'ro',
  'tr',
  'pt',
  'sk',
] as const

export type UiLocale = (typeof UI_LOCALES)[number]

export const isUiLocale = (value: string | null | undefined): value is UiLocale =>
  value != null && (UI_LOCALES as readonly string[]).includes(value)

export const menuLanguageCodeToUiLocale = (menuCode: string): UiLocale => {
  const mapped = MENU_CODE_TO_UI_LOCALE[menuCode as keyof typeof MENU_CODE_TO_UI_LOCALE]
  return (mapped as UiLocale | undefined) ?? 'en'
}

export const uiLocaleToMenuLanguageCode = (uiLocale: string): string => {
  const normalized = uiLocale.toLowerCase().split('-')[0]
  if (normalized === 'ua' || normalized === 'uk') return 'uk'
  if ((MENU_LANGUAGE_CODES as readonly string[]).includes(normalized)) return normalized
  return 'uk'
}

export const UI_INTL_LOCALE: Record<UiLocale, string> = {
  ua: 'uk-UA',
  en: 'en-GB',
  pl: 'pl-PL',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  it: 'it-IT',
  cs: 'cs-CZ',
  ro: 'ro-RO',
  tr: 'tr-TR',
  pt: 'pt-PT',
  sk: 'sk-SK',
}

export const intlLocaleForUi = (uiLocale: string): string =>
  UI_INTL_LOCALE[uiLocale as UiLocale] ?? 'en-GB'
