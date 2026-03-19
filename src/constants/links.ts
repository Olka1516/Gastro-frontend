import { spaceToUnderscore, underscoreToSpace } from '@/utils/textHelpers'

const encodePlaceNameForApi = (placeName: string) =>
  encodeURIComponent(underscoreToSpace(placeName).trim())

export const ENDPOINTS = {
  STRIPE_CHECKOUT: '/stripe/getCheckoutId',
  LOGIN: '/users/login',
  REGISTRATION: '/users/register',
  CHECK_AUTH: '/users/check',
  PUT_FREE_PLAN: `users/put-free-plan`,
  UPDATE_USER: `users/update`,
  GET_USER_DETAILS: `dashboard/get-details`,
  GET_USER_DISHES: `dashboard/dishes`,
  ADD_DISH: `dashboard/dishes`,
  DELETE_DISH: (id: string) => `dashboard/dishes/${id}`,
  EDIT_DISH: (id: string) => `dashboard/dishes/${id}`,
  GET_USER_CATEGORIES: `dashboard/categories`,
  ADD_CATEGORY: `dashboard/categories`,
  DELETE_CATEGORY: (id: string) => `dashboard/categories/${id}`,
  EDIT_CATEGORY: (id: string) => `dashboard/categories/${id}`,
  GET_USER_STATUS: (placeName: string) => `showcase/get-plan-status/${encodePlaceNameForApi(placeName)}`,
  GET_MENU_DISHES: (placeName: string) => `showcase/get-dishes/${encodePlaceNameForApi(placeName)}`,
  GET_MENU_CATEGORIES: (placeName: string) => `showcase/get-categories/${encodePlaceNameForApi(placeName)}`,
}

export const LINK_TEMPLATES = {
  DASHBOARD: '/dashboard',
  MENU: (placeName: string) => `/menu/${spaceToUnderscore(placeName)}`,
}
