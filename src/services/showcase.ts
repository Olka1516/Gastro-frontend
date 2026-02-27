import { ENDPOINTS } from '@/constants'
import http from '@/http'

export const getMenuDishes = async (placeName: string) => {
  const data = await http.get(ENDPOINTS.GET_MENU_DISHES(placeName))
  return data.data
}

export const getMenuCategories = async (placeName: string) => {
  const data = await http.get(ENDPOINTS.GET_MENU_CATEGORIES(placeName))
  return data.data
}
