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

export const getUserDishes = async () => {
  const data = await http.get(ENDPOINTS.GET_USER_DISHES)
  return data.data
}

const generateFormDish = (dishData: IDish) => {
  const formData = new FormData()
  if (dishData.image) formData.append('image', dishData.image)
  formData.append('name', dishData.name)
  formData.append('description', dishData.description)
  formData.append('price', dishData.price.toString())
  formData.append('category', dishData.category)
  formData.append('isAvailable', dishData.isAvailable)

  return formData
}

export const addDishForUser = async (dishData: IDish) => {
  const formData = generateFormDish(dishData)
  const data = await http.post(ENDPOINTS.ADD_DISH, formData)
  return data.data
}

export const editDishForUser = async (dishData: IDish) => {
  const formData = generateFormDish(dishData)
  const data = await http.put(ENDPOINTS.EDIT_DISH(dishData.id), formData)
  return data.data
}

export const deleteDishById = async (dishId: string) => {
  await http.delete(ENDPOINTS.DELETE_DISH(dishId))
}
