import {
  addDishForUser,
  deleteDishById,
  editDishForUser,
  getShowcaseOrdersForOwner,
  getTableReservationsForOwner,
  getUserDishes,
  patchShowcaseOrderStatus,
  patchTableReservation,
} from '@/services/dashboard'
import type { TRequestError } from '@/types'
import type { IDish } from '@/types/menu'
import type {
  IShowcasePlacedOrder,
  ShowcaseOrderStatus,
  ShowcaseOrderStatusFilter,
} from '@/types/showcaseOrder'
import type {
  IPatchTableReservationBody,
  ITableReservation,
  TableReservationStatus,
  TableReservationStatusFilter,
} from '@/types/tableReservation'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePremiumDashboardStore = defineStore('premiumDashboard', () => {
  const dishes = ref<IDish[]>([])
  const error = ref('')
  const showcaseOrders = ref<IShowcasePlacedOrder[]>([])
  const ordersError = ref('')
  const ordersStatusFilter = ref<ShowcaseOrderStatusFilter>('pending')
  const tableReservations = ref<ITableReservation[]>([])
  const reservationsError = ref('')
  const reservationsStatusFilter = ref<TableReservationStatusFilter>('pending')

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

  const sortReservationsDesc = (list: ITableReservation[]) =>
    [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const fetchTableReservations = async () => {
    try {
      const list = await getTableReservationsForOwner({
        status: reservationsStatusFilter.value,
      })
      tableReservations.value = sortReservationsDesc(list)
      reservationsError.value = ''
      return { success: true as const }
    } catch (err) {
      const message = err as TRequestError
      reservationsError.value = message.response?.data?.message ?? ''
      tableReservations.value = []
      return { success: false as const, error: message.response?.data?.message }
    }
  }

  const updateTableReservation = async (reservationId: string, body: IPatchTableReservationBody) => {
    try {
      await patchTableReservation(reservationId, body)
      reservationsError.value = ''
      await fetchTableReservations()
      return { success: true as const }
    } catch (err) {
      const message = err as TRequestError
      await fetchTableReservations()
      return {
        success: false as const,
        error: message.response?.data?.message,
      }
    }
  }

  const updateTableReservationStatus = async (
    reservationId: string,
    status: TableReservationStatus,
    reschedule?: { visitDate?: string; visitTime?: string },
  ) => {
    const body: IPatchTableReservationBody = { status, ...reschedule }
    return updateTableReservation(reservationId, body)
  }

  const setReservationsStatusFilter = async (value: TableReservationStatusFilter) => {
    reservationsStatusFilter.value = value
    return fetchTableReservations()
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
    tableReservations,
    reservationsError,
    reservationsStatusFilter,
    fetchTableReservations,
    setReservationsStatusFilter,
    updateTableReservation,
    updateTableReservationStatus,
  }
})
