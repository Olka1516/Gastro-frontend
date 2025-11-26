import { ENDPOINTS } from '@/constants'
import http from '@/http'
import type { IDish } from '@/types/menu'

export const getUserDetailsByUserId = async () => {
  const data = await http.get(ENDPOINTS.GET_USER_DETAILS)
  return data.data
}

export const putUserFreePlan = async () => {
  const data = await http.put(ENDPOINTS.PUT_FREE_PLAN)
  return data.data
}

export const addDishForUser = async (dishData: IDish) => {
  const data = await http.post(ENDPOINTS.ADD_DISH, dishData)
  return data.data
}

export const editDishForUser = async (dishData: IDish) => {
  const data = await http.put(ENDPOINTS.EDIT_DISH(dishData.id), dishData)
  return data.data
}
