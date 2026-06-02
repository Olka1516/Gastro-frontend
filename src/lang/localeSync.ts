export { UI_LOCALE_STORAGE_KEY } from './localeStorage'

export {
  UI_LOCALES,
  intlLocaleForUi,
  isUiLocale,
  menuLanguageCodeToUiLocale,
  uiLocaleToMenuLanguageCode,
  type UiLocale,
} from './uiLocales'

import { UI_LOCALE_STORAGE_KEY } from './localeStorage'
import { isUiLocale, type UiLocale } from './uiLocales'

export const readStoredUiLocale = (): UiLocale | null => {
  const stored = sessionStorage.getItem(UI_LOCALE_STORAGE_KEY)
  return isUiLocale(stored) ? stored : null
}
