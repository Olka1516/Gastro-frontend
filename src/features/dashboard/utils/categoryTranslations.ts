import { DEFAULT_MENU_LANGUAGE, MENU_LANGUAGE_CODES } from '@/constants/menuLanguages'
import type { ICategory, ICategoryTranslation } from '@/types/menu'

export type CategoryTranslationEntry = { name: string }
export type CategoryTranslationsForm = Record<string, CategoryTranslationEntry>

export const emptyCategoryTranslations = (): CategoryTranslationsForm =>
  Object.fromEntries(MENU_LANGUAGE_CODES.map((code) => [code, { name: '' }])) as CategoryTranslationsForm

export const categoryTranslationsFromCategory = (category: ICategory): CategoryTranslationsForm => {
  const base = emptyCategoryTranslations()

  if (category.translations) {
    for (const [code, value] of Object.entries(category.translations)) {
      if (base[code] && value) {
        base[code] = { name: value.name ?? '' }
      }
    }
  }

  const legacyName = category.name?.trim()
  if (legacyName && !base[DEFAULT_MENU_LANGUAGE].name.trim()) {
    base[DEFAULT_MENU_LANGUAGE] = { name: legacyName }
  }

  return base
}

export const filledTranslationCodes = (translations: CategoryTranslationsForm): string[] =>
  MENU_LANGUAGE_CODES.filter((code) => translations[code]?.name?.trim())

export const hasUkrainianTranslation = (translations: CategoryTranslationsForm): boolean =>
  Boolean(translations[DEFAULT_MENU_LANGUAGE]?.name?.trim())

export const categoryFilledLanguagesFromCategory = (category: ICategory): string[] => {
  if (category.translations) {
    return MENU_LANGUAGE_CODES.filter((code) => category.translations?.[code]?.name?.trim())
  }
  return category.name?.trim() ? [DEFAULT_MENU_LANGUAGE] : []
}

export const buildCategoryPayload = (
  category: ICategory,
  translations: CategoryTranslationsForm,
): ICategory => {
  const ukName = translations[DEFAULT_MENU_LANGUAGE].name.trim()
  const filled = filledTranslationCodes(translations)
  const translationsPayload: Partial<Record<string, ICategoryTranslation>> = {}

  for (const code of filled) {
    translationsPayload[code] = { name: translations[code].name.trim() }
  }

  return {
    ...category,
    name: ukName,
    translations: translationsPayload,
  }
}
