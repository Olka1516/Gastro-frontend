import {
  addCategoryForUser,
  deleteCategoryById,
  editCategoryForUser,
  getUserCategories,
} from '@/services/dashboard'
import type { TRequestError } from '@/types'
import type { ICategory } from '@/types/menu'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoriesDashboardStore = defineStore('categoriesDashboard', () => {
  const categories = ref<ICategory[]>([])
  const error = ref('')

  // Додавання нової категорії
  const addCategory = async (categoryData: ICategory) => {
    try {
      await addCategoryForUser(categoryData)

      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  // Редагування існуючої категорії
  const editCategory = async (categoryData: ICategory) => {
    try {
      await editCategoryForUser(categoryData)

      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  // Видалення категорії
  const deleteCategory = async (categoryId: string) => {
    try {
      await deleteCategoryById(categoryId)
      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  // Отримання всіх категорій
  const fetchCategories = async () => {
    try {
      const response = await getUserCategories()
      categories.value = response.categories
      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  return {
    categories,
    error,
    addCategory,
    editCategory,
    deleteCategory,
    fetchCategories,
  }
})
