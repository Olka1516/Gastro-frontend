import { DEFAULT_MENU_LANGUAGE, MENU_LANGUAGE_CODES } from '@/constants/menuLanguages'
import { parseTranslationsRecord } from '@/features/dashboard/utils/translationParse'
import { uiLocaleToMenuLanguageCode } from '@/lang/localeSync'
import type { ICategory, ICategoryTranslation, IDish } from '@/types/menu'

export const mapUiLocaleToMenuLanguage = (locale: string): string => uiLocaleToMenuLanguageCode(locale)

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

const readSortOrderFromApi = (category: ICategory): number | undefined => {
  if (typeof category.sortOrder === 'number' && Number.isFinite(category.sortOrder)) {
    return category.sortOrder
  }
  const legacy = category as ICategory & { sort_order?: number }
  if (typeof legacy.sort_order === 'number' && Number.isFinite(legacy.sort_order)) {
    return legacy.sort_order
  }
  return undefined
}

export const sortCategoriesByOrder = (categories: ICategory[]): ICategory[] =>
  [...categories].sort((a, b) => {
    const ao = a.sortOrder ?? Number.MAX_SAFE_INTEGER
    const bo = b.sortOrder ?? Number.MAX_SAFE_INTEGER
    if (ao !== bo) return ao - bo
    return (a.name ?? '').localeCompare(b.name ?? '', undefined, { sensitivity: 'base' })
  })

export const reorderCategoryIds = (
  orderedIds: string[],
  id: string,
  direction: 'up' | 'down',
): string[] => {
  const index = orderedIds.indexOf(id)
  if (index < 0) return orderedIds
  const target = direction === 'up' ? index - 1 : index + 1
  if (target < 0 || target >= orderedIds.length) return orderedIds
  const next = [...orderedIds]
  ;[next[index], next[target]] = [next[target], next[index]]
  return next
}

export const applySortOrderToCategories = (
  categories: ICategory[],
  orderedIds: string[],
): ICategory[] => {
  const byId = new Map(categories.map((c) => [c.id, c]))
  const result: ICategory[] = []
  orderedIds.forEach((id, index) => {
    const category = byId.get(id)
    if (category) {
      result.push({ ...category, sortOrder: index })
    }
  })
  return result
}

export type ICategoryWithDishCount = ICategory & { dishCount: number }

export const filterCategoriesWithAvailableDishes = (
  categories: ICategory[],
  dishes: IDish[],
): ICategoryWithDishCount[] => {
  const availableDishes = dishes.filter((d) => d.isAvailable === 'available')
  const withDishes = categories
    .map((category) => ({
      ...category,
      dishCount: availableDishes.filter((d) => d.category === category.id).length,
    }))
    .filter((category) => category.dishCount > 0)
  return sortCategoriesByOrder(withDishes) as ICategoryWithDishCount[]
}

export const normalizeCategoryFromApi = (category: ICategory): ICategory => {
  const normalized: ICategory = { ...category, sortOrder: readSortOrderFromApi(category) }

  const parsedTranslations = parseTranslationsRecord<ICategoryTranslation>(normalized.translations)
  if (parsedTranslations) {
    normalized.translations = parsedTranslations
  }

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

export const normalizeCategoriesFromApi = (categories: ICategory[]): ICategory[] => {
  const normalized = categories.map(normalizeCategoryFromApi)
  const hasSortOrder = normalized.some((c) => typeof c.sortOrder === 'number')
  const withOrder = hasSortOrder
    ? normalized
    : normalized.map((c, index) => ({ ...c, sortOrder: index }))
  return sortCategoriesByOrder(withOrder)
}

export interface ICategoryWriteBody {
  name: string
  sortOrder?: number
  translations?: Partial<Record<string, ICategoryTranslation>>
}

export const serializeCategoryForApi = (
  category: ICategory,
  options: { includeTranslations: boolean },
): ICategoryWriteBody => {
  const body: ICategoryWriteBody = {
    name: category.name?.trim() ?? '',
  }

  if (typeof category.sortOrder === 'number' && Number.isFinite(category.sortOrder)) {
    body.sortOrder = category.sortOrder
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
