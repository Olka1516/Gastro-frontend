import { getMenuCategories, getMenuDishes } from '@/services/showcase'
import type { TRequestError } from '@/types'
import type { ICategory, IDish } from '@/types/menu'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowcaseStore = defineStore('showcaseStore', () => {
  const dishes = ref<IDish[]>([])
  const categories = ref<ICategory[]>([])

  const fetchDishes = async (placeName: string) => {
    try {
      const response = await getMenuDishes(placeName)
      dishes.value = response.dishes
      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  const fetchCategories = async (placeName: string) => {
    try {
      const response = await getMenuCategories(placeName)
      categories.value = response.categories
      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  return {
    dishes,
    categories,
    fetchDishes,
    fetchCategories,
  }
})
