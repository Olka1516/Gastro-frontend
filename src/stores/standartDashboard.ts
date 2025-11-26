import { addDishForUser, editDishForUser } from '@/services/dashboard'
import type { TRequestError } from '@/types'
import type { IDish } from '@/types/menu'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStandartDashboardStore = defineStore('standartDashboard', () => {
  const dishes = ref<IDish[]>([])
  const error = ref('')

  // Додавання нової страви
  const addDish = async (dishData: IDish) => {
    try {
      await addDishForUser(dishData)

      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  // Редагування існуючої страви
  const editDish = async (dishData: IDish) => {
    try {
      await editDishForUser(dishData)

      return { success: true }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  // Видалення страви
  const deleteDish = async (dishId: string) => {
    try {
      error.value = ''

      // Тут буде API запит на бекенд
      // const response = await api.delete(`/dishes/${dishId}`)

      // Поки що симулюємо успішний запит
      const index = dishes.value.findIndex((dish) => dish.id === dishId)
      if (index !== -1) {
        dishes.value.splice(index, 1)
        console.log('Dish deleted successfully:', dishId)
        return true
      } else {
        error.value = 'Страву не знайдено'
        return false
      }
    } catch (err) {
      const message = err as TRequestError
      return { success: false, error: message.response?.data.message }
    }
  }

  // Отримання всіх страв
  const fetchDishes = async () => {
    try {
      // Тут буде API запит на бекенд
      // const response = await api.get('/dishes')
      // dishes.value = response.data
      return { success: true }
      console.log('Dishes fetched successfully')
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
