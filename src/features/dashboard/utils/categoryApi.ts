import { DEFAULT_MENU_LANGUAGE, MENU_LANGUAGE_CODES } from '@/constants/menuLanguages'
import type { ICategory, ICategoryTranslation } from '@/types/menu'

const UI_LOCALE_TO_MENU_LANGUAGE: Record<string, string> = {
  ua: 'uk',
  uk: 'uk',
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
  zh: 'zh',
}

export const mapUiLocaleToMenuLanguage = (locale: string): string => {
  const normalized = locale.toLowerCase().split('-')[0]
  return UI_LOCALE_TO_MENU_LANGUAGE[normalized] ?? normalized
}

export const getCategoryDisplayName = (
  category: ICategory,
  langCode: string = DEFAULT_MENU_LANGUAGE,
): string => {
  const direct = category.translations?.[langCode]?.name?.trim()
  if (direct) return direct

  const fallbackOrder = [
    langCode,
    DEFAULT_MENU_LANGUAGE,
    'en',
    ...MENU_LANGUAGE_CODES.filter(
      (c) => c !== langCode && c !== DEFAULT_MENU_LANGUAGE && c !== 'en',
    ),
  ]

  for (const code of fallbackOrder) {
    const name = category.translations?.[code]?.name?.trim()
    if (name) return name
  }

  return category.name?.trim() ?? ''
}

export const normalizeCategoryFromApi = (category: ICategory): ICategory => {
  const normalized: ICategory = { ...category }

  if (normalized.translations) {
    const cleaned: Partial<Record<string, ICategoryTranslation>> = {}
    for (const [code, value] of Object.entries(normalized.translations)) {
      if (value?.name?.trim()) {
        cleaned[code] = { name: value.name.trim() }
      }
    }
    normalized.translations = Object.keys(cleaned).length > 0 ? cleaned : undefined
  }

  if (!normalized.name?.trim()) {
    normalized.name = getCategoryDisplayName(normalized, DEFAULT_MENU_LANGUAGE)
  }

  return normalized
}

export const normalizeCategoriesFromApi = (categories: ICategory[]): ICategory[] =>
  categories.map(normalizeCategoryFromApi)

export interface ICategoryWriteBody {
  name: string
  translations?: Partial<Record<string, ICategoryTranslation>>
}

export const serializeCategoryForApi = (
  category: ICategory,
  options: { includeTranslations: boolean },
): ICategoryWriteBody => {
  const body: ICategoryWriteBody = {
    name: category.name?.trim() ?? '',
  }

  if (!options.includeTranslations || !category.translations) {
    return body
  }

  const translations: Partial<Record<string, ICategoryTranslation>> = {}
  for (const [code, value] of Object.entries(category.translations)) {
    if (value?.name?.trim()) {
      translations[code] = { name: value.name.trim() }
    }
  }

  if (Object.keys(translations).length > 0) {
    body.translations = translations
  }

  return body
}
