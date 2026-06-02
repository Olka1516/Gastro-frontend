import { createI18n } from 'vue-i18n'
import cs from './cs'
import de from './de'
import en from './en'
import es from './es'
import fr from './fr'
import it from './it'
import pl from './pl'
import pt from './pt'
import ro from './ro'
import sk from './sk'
import tr from './tr'
import ua from './ua'

const customRule = (choice: number, choicesLength: number) => {
  if (choice === 0) {
    return 0
  }

  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1
  if (!teen && endsWithOne) {
    return 1
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2
  }

  return choicesLength < 4 ? 2 : 3
}

const messages = {
  ua,
  en,
  pl,
  de,
  fr,
  es,
  it,
  cs,
  ro,
  tr,
  pt,
  sk,
}

export const i18n = createI18n({
  locale: 'ua',
  allowComposition: true,
  fallbackLocale: 'en',
  messages,
  pluralizationRules: {
    ua: customRule,
  },
})

export {
  UI_LOCALE_STORAGE_KEY,
  intlLocaleForUi,
  isUiLocale,
  menuLanguageCodeToUiLocale,
  readStoredUiLocale,
  uiLocaleToMenuLanguageCode,
  UI_LOCALES,
  type UiLocale,
} from './localeSync'

import { UI_LOCALE_STORAGE_KEY } from './localeStorage'
import type { UiLocale } from './uiLocales'

export const applyUiLocale = (locale: UiLocale) => {
  if (typeof i18n.global.locale === 'string') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as { value: UiLocale }).value = locale
  }
  sessionStorage.setItem(UI_LOCALE_STORAGE_KEY, locale)
}
