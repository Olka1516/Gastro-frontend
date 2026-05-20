import { DEFAULT_MENU_LANGUAGE, MENU_LANGUAGE_CODES } from '@/constants/menuLanguages'
import type { IDish, IDishTranslation } from '@/types/menu'

export type DishTranslationEntry = { name: string; description: string }
export type DishTranslationsForm = Record<string, DishTranslationEntry>

export const emptyDishTranslations = (): DishTranslationsForm =>
  Object.fromEntries(
    MENU_LANGUAGE_CODES.map((code) => [code, { name: '', description: '' }]),
  ) as DishTranslationsForm

export const dishTranslationsFromDish = (dish: IDish): DishTranslationsForm => {
  const base = emptyDishTranslations()

  if (dish.translations) {
    for (const [code, value] of Object.entries(dish.translations)) {
      if (base[code] && value) {
        base[code] = {
          name: value.name ?? '',
          description: value.description ?? '',
        }
      }
    }
  }

  const legacyName = dish.name?.trim()
  const legacyDescription = dish.description?.trim()
  if (legacyName && !base[DEFAULT_MENU_LANGUAGE].name.trim()) {
    base[DEFAULT_MENU_LANGUAGE] = {
      name: legacyName,
      description: legacyDescription ?? base[DEFAULT_MENU_LANGUAGE].description,
    }
  }

  return base
}

export const filledDishTranslationCodes = (translations: DishTranslationsForm): string[] =>
  MENU_LANGUAGE_CODES.filter((code) => translations[code]?.name?.trim())

export const hasUkrainianDishTranslation = (translations: DishTranslationsForm): boolean =>
  Boolean(translations[DEFAULT_MENU_LANGUAGE]?.name?.trim())

export const buildDishPayload = (
  dish: IDish,
  shared: {
    image: string | File
    price?: number
    category: string
    isAvailable: 'available' | 'unavailable'
  },
  translations: DishTranslationsForm,
): IDish => {
  const ukName = translations[DEFAULT_MENU_LANGUAGE].name.trim()
  const ukDescription = translations[DEFAULT_MENU_LANGUAGE].description?.trim() ?? ''
  const filled = filledDishTranslationCodes(translations)
  const translationsPayload: Partial<Record<string, IDishTranslation>> = {}

  for (const code of filled) {
    const entry = translations[code]
    translationsPayload[code] = {
      name: entry.name.trim(),
      ...(entry.description?.trim() ? { description: entry.description.trim() } : {}),
    }
  }

  return {
    ...dish,
    ...shared,
    name: ukName,
    description: ukDescription,
    translations: translationsPayload,
  }
}
