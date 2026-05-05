import { getMenuCategories, getMenuDishes, getPlaceBranding } from '@/services/showcase'
import type { IPlaceBranding, TRequestError } from '@/types'
import type { ICategory, IDish } from '@/types/menu'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowcaseStore = defineStore('showcaseStore', () => {
  const dishes = ref<IDish[]>([])
  const categories = ref<ICategory[]>([])
  const placeBranding = ref<IPlaceBranding | null>(null)

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

  const fetchPlaceBranding = async (placeName: string) => {
    try {
      const data = await getPlaceBranding(placeName)
      placeBranding.value = data
      return { success: true as const }
    } catch (err) {
      const message = err as TRequestError
      placeBranding.value = null
      return { success: false as const, error: message.response?.data.message }
    }
  }

  return {
    dishes,
    categories,
    placeBranding,
    fetchDishes,
    fetchCategories,
    fetchPlaceBranding,
  }
})
