import { ENDPOINTS } from '@/constants'
import type { IPlaceBranding } from '@/types'
import type { IShowcaseOrderPayload } from '@/types/showcaseOrder'
import type { ICreateTableReservationPayload } from '@/types/tableReservation'
import http from '@/http'

export const getPlaceBranding = async (placeName: string): Promise<IPlaceBranding> => {
  const { data } = await http.get<IPlaceBranding>(ENDPOINTS.GET_PLACE_BRANDING(placeName))
  return data
}

export const getMenuDishes = async (placeName: string) => {
  const data = await http.get(ENDPOINTS.GET_MENU_DISHES(placeName))
  return data.data
}

export const getMenuCategories = async (placeName: string) => {
  const data = await http.get(ENDPOINTS.GET_MENU_CATEGORIES(placeName))
  return data.data
}

export const postShowcaseOrder = async (
  placeSlug: string,
  payload: IShowcaseOrderPayload,
): Promise<{ id: string }> => {
  const { data } = await http.post<{ id: string }>(ENDPOINTS.POST_SHOWCASE_ORDER(placeSlug), payload)
  return data
}

export const postTableReservation = async (
  placeSlug: string,
  payload: ICreateTableReservationPayload,
): Promise<{ id: string }> => {
  const { data } = await http.post<{ id: string }>(
    ENDPOINTS.POST_SHOWCASE_TABLE_RESERVATION(placeSlug),
    payload,
  )
  return data
}
