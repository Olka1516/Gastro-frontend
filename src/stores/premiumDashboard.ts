import {
  addDishForUser,
  deleteDishById,
  editDishForUser,
  getShowcaseOrdersForOwner,
  getUserDishes,
  patchShowcaseOrderStatus,
} from '@/services/dashboard'
import type { TRequestError } from '@/types'
import type { IDish } from '@/types/menu'
import type {
  IShowcasePlacedOrder,
  ShowcaseOrderStatus,
  ShowcaseOrderStatusFilter,
} from '@/types/showcaseOrder'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePremiumDashboardStore = defineStore('premiumDashboard', () => {
  const dishes = ref<IDish[]>([])
  const error = ref('')
  const showcaseOrders = ref<IShowcasePlacedOrder[]>([])
  const ordersError = ref('')
  const ordersStatusFilter = ref<ShowcaseOrderStatusFilter>('pending')

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

  const fetchShowcaseOrders = async () => {
    try {
      showcaseOrders.value = await getShowcaseOrdersForOwner({
        status: ordersStatusFilter.value,
      })
      ordersError.value = ''
      return { success: true as const }
    } catch (err) {
      const message = err as TRequestError
      ordersError.value = message.response?.data?.message ?? ''
      showcaseOrders.value = []
      return { success: false as const, error: message.response?.data?.message }
    }
  }

  const setOrdersStatusFilter = async (value: ShowcaseOrderStatusFilter) => {
    ordersStatusFilter.value = value
    return fetchShowcaseOrders()
  }

  const updateShowcaseOrderStatus = async (orderId: string, status: ShowcaseOrderStatus) => {
    try {
      await patchShowcaseOrderStatus(orderId, status)
      ordersError.value = ''
      await fetchShowcaseOrders()
      return { success: true as const }
    } catch (err) {
      const message = err as TRequestError
      return {
        success: false as const,
        error: message.response?.data?.message,
      }
    }
  }

  return {
    dishes,
    error,
    showcaseOrders,
    ordersError,
    ordersStatusFilter,
    addDish,
    editDish,
    deleteDish,
    fetchDishes,
    fetchShowcaseOrders,
    setOrdersStatusFilter,
    updateShowcaseOrderStatus,
  }
})
