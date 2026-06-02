import { DEFAULT_MENU_LANGUAGE, MENU_LANGUAGE_CODES } from '@/constants/menuLanguages'
import { applyUiLocale, menuLanguageCodeToUiLocale } from '@/lang'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const storageKey = (placeSlug: string) => `gastro-menu-lang:${placeSlug}`

export const useShowcaseMenuLanguageStore = defineStore('showcaseMenuLanguage', () => {
  const enabled = ref(false)
  const languageCode = ref(DEFAULT_MENU_LANGUAGE)
  const placeSlug = ref('')

  const enableForPlace = (slug: string) => {
    if (!slug.trim()) return
    placeSlug.value = slug.trim()
    enabled.value = true

    const stored = sessionStorage.getItem(storageKey(placeSlug.value))
    if (stored && MENU_LANGUAGE_CODES.includes(stored)) {
      languageCode.value = stored
      applyUiLocale(menuLanguageCodeToUiLocale(stored))
      return
    }

    languageCode.value = DEFAULT_MENU_LANGUAGE
    applyUiLocale(menuLanguageCodeToUiLocale(DEFAULT_MENU_LANGUAGE))
  }

  const disable = () => {
    enabled.value = false
    placeSlug.value = ''
  }

  const setLanguage = (code: string) => {
    if (!MENU_LANGUAGE_CODES.includes(code)) return
    enabled.value = true
    languageCode.value = code
    applyUiLocale(menuLanguageCodeToUiLocale(code))
    if (placeSlug.value) {
      sessionStorage.setItem(storageKey(placeSlug.value), code)
    }
  }

  return {
    enabled,
    languageCode,
    placeSlug,
    enableForPlace,
    disable,
    setLanguage,
  }
})
