import {
  applySortOrderToCategories,
  reorderCategoryIds,
} from '@/features/dashboard/utils/categoryApi'
import {
  addCategoryForUser,
  deleteCategoryById,
  editCategoryForUser,
  getUserCategories,
  reorderCategoriesForUser,
} from '@/services/dashboard'
import type { TRequestError } from '@/types'
import { EPlan } from '@/types/errorEnum'
import type { ICategory } from '@/types/menu'
import { useUserStore } from '@/stores/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const supportsMenuTranslations = () => {
  const userStore = useUserStore()
  return userStore.planName === EPlan.premium || userStore.planName === EPlan.standart
}

export const useCategoriesDashboardStore = defineStore('categoriesDashboard', () => {
  const categories = ref<ICategory[]>([])
  const error = ref('')

  const addCategory = async (categoryData: ICategory) => {
    const payload: ICategory = {
      ...categoryData,
      sortOrder:
        typeof categoryData.sortOrder === 'number'
          ? categoryData.sortOrder
          : nextCategorySortOrder(),
    }
    try {
      await addCategoryForUser(payload, { includeTranslations: supportsMenuTranslations() })
      return { success: true as const }
    } catch (err) {
      const message = err as TRequestError
      error.value = message.response?.data.message ?? ''
      return { success: false as const, error: message.response?.data.message }
    }
  }

  const editCategory = async (categoryData: ICategory) => {
    try {
      await editCategoryForUser(categoryData, { includeTranslations: supportsMenuTranslations() })
      return { success: true as const }
    } catch (err) {
      const message = err as TRequestError
      error.value = message.response?.data.message ?? ''
      return { success: false as const, error: message.response?.data.message }
    }
  }

  const deleteCategory = async (categoryId: string) => {
    try {
      await deleteCategoryById(categoryId)
      return { success: true as const }
    } catch (err) {
      const message = err as TRequestError
      error.value = message.response?.data.message ?? ''
      return { success: false as const, error: message.response?.data.message }
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await getUserCategories()
      categories.value = response.categories
      return { success: true as const }
    } catch (err) {
      const message = err as TRequestError
      error.value = message.response?.data.message ?? ''
      return { success: false as const, error: message.response?.data.message }
    }
  }

  const nextCategorySortOrder = () => {
    if (!categories.value.length) return 0
    return Math.max(...categories.value.map((c) => c.sortOrder ?? 0)) + 1
  }

  const reorderCategories = async (orderedIds: string[]) => {
    const previous = categories.value.map((c) => ({ ...c }))
    categories.value = applySortOrderToCategories(categories.value, orderedIds)
    try {
      await reorderCategoriesForUser(orderedIds)
      error.value = ''
      return { success: true as const }
    } catch (err) {
      categories.value = previous
      const message = err as TRequestError
      error.value = message.response?.data.message ?? ''
      return { success: false as const, error: message.response?.data.message }
    }
  }

  const moveCategory = async (id: string, direction: 'up' | 'down') => {
    const orderedIds = categories.value.map((c) => c.id)
    const nextIds = reorderCategoryIds(orderedIds, id, direction)
    if (nextIds === orderedIds) {
      return { success: true as const }
    }
    return reorderCategories(nextIds)
  }

  return {
    categories,
    error,
    addCategory,
    editCategory,
    deleteCategory,
    fetchCategories,
    reorderCategories,
    moveCategory,
    nextCategorySortOrder,
    supportsMenuTranslations,
  }
})
