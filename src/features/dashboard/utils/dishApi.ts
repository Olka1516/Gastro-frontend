import { DEFAULT_MENU_LANGUAGE, MENU_LANGUAGE_CODES } from '@/constants/menuLanguages'
import { parseTranslationsRecord } from '@/features/dashboard/utils/translationParse'
import type { IDish, IDishTranslation } from '@/types/menu'

export const getDishDisplayName = (
  dish: IDish,
  langCode: string = DEFAULT_MENU_LANGUAGE,
): string => {
  const direct = dish.translations?.[langCode]?.name?.trim()
  if (direct) return direct

  const fallbackOrder = [
    langCode,
    DEFAULT_MENU_LANGUAGE,
    'en',
    ...MENU_LANGUAGE_CODES.filter((c) => c !== langCode && c !== DEFAULT_MENU_LANGUAGE && c !== 'en'),
  ]

  for (const code of fallbackOrder) {
    const name = dish.translations?.[code]?.name?.trim()
    if (name) return name
  }

  return dish.name?.trim() ?? ''
}

export const getDishDisplayDescription = (
  dish: IDish,
  langCode: string = DEFAULT_MENU_LANGUAGE,
): string => {
  const direct = dish.translations?.[langCode]?.description?.trim()
  if (direct) return direct

  const fallbackOrder = [
    langCode,
    DEFAULT_MENU_LANGUAGE,
    'en',
    ...MENU_LANGUAGE_CODES.filter((c) => c !== langCode && c !== DEFAULT_MENU_LANGUAGE && c !== 'en'),
  ]

  for (const code of fallbackOrder) {
    const description = dish.translations?.[code]?.description?.trim()
    if (description) return description
  }

  return dish.description?.trim() ?? ''
}

export const normalizeDishFromApi = (dish: IDish): IDish => {
  const normalized: IDish = { ...dish }

  const parsedTranslations = parseTranslationsRecord<IDishTranslation>(normalized.translations)
  if (parsedTranslations) {
    normalized.translations = parsedTranslations
  }

  if (normalized.translations) {
    const cleaned: Partial<Record<string, IDishTranslation>> = {}
    for (const [code, value] of Object.entries(normalized.translations)) {
      if (value?.name?.trim()) {
        cleaned[code] = {
          name: value.name.trim(),
          ...(value.description?.trim() ? { description: value.description.trim() } : {}),
        }
      }
    }
    normalized.translations = Object.keys(cleaned).length > 0 ? cleaned : undefined
  }

  if (!normalized.name?.trim()) {
    normalized.name = getDishDisplayName(normalized, DEFAULT_MENU_LANGUAGE)
  }
  if (!normalized.description?.trim()) {
    normalized.description = getDishDisplayDescription(normalized, DEFAULT_MENU_LANGUAGE)
  }

  return normalized
}

export const normalizeDishesFromApi = (dishes: IDish[]): IDish[] => dishes.map(normalizeDishFromApi)
