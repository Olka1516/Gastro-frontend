import {
  addCategoryForUser,
  deleteCategoryById,
  editCategoryForUser,
  getUserCategories,
} from '@/services/dashboard'
import type { TRequestError } from '@/types'
import { EPlan } from '@/types/errorEnum'
import type { ICategory } from '@/types/menu'
import { useUserStore } from '@/stores/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const isPremiumPlan = () => {
  const userStore = useUserStore()
  return userStore.planName === EPlan.premium
}

export const useCategoriesDashboardStore = defineStore('categoriesDashboard', () => {
  const categories = ref<ICategory[]>([])
  const error = ref('')

  const addCategory = async (categoryData: ICategory) => {
    try {
      await addCategoryForUser(categoryData, { includeTranslations: isPremiumPlan() })
      return { success: true as const }
    } catch (err) {
      const message = err as TRequestError
      error.value = message.response?.data.message ?? ''
      return { success: false as const, error: message.response?.data.message }
    }
  }

  const editCategory = async (categoryData: ICategory) => {
    try {
      await editCategoryForUser(categoryData, { includeTranslations: isPremiumPlan() })
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

  return {
    categories,
    error,
    addCategory,
    editCategory,
    deleteCategory,
    fetchCategories,
    isPremiumPlan,
  }
})
