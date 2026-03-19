import {
  addDishForUser,
  deleteDishById,
  editDishForUser,
  getUserDishes,
} from '@/services/dashboard'
import type { TRequestError } from '@/types'
import type { IDish } from '@/types/menu'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStandartDashboardStore = defineStore('standartDashboard', () => {
  const dishes = ref<IDish[]>([])
  const error = ref('')

  const addDish = async (dishData: IDish) => {
    try {
      await addDishForUser(dishData)

      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  const editDish = async (dishData: IDish) => {
    try {
      await editDishForUser(dishData)

      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  const deleteDish = async (dishId: string) => {
    try {
      await deleteDishById(dishId)
      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  const fetchDishes = async () => {
    try {
      const response = await getUserDishes()
      dishes.value = response.dishes
      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  return {
    dishes,
    error,
    addDish,
    editDish,
    deleteDish,
    fetchDishes,
  }
})
