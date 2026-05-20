import { ENDPOINTS } from '@/constants'
import http from '@/http'
import type {
  IShowcasePlacedOrder,
  ShowcaseOrderStatus,
  ShowcaseOrderStatusFilter,
} from '@/types/showcaseOrder'
import type {
  IPatchTableReservationBody,
  ITableReservation,
  TableReservationStatusFilter,
} from '@/types/tableReservation'
import {
  normalizeCategoriesFromApi,
  normalizeCategoryFromApi,
  serializeCategoryForApi,
} from '@/features/dashboard/utils/categoryApi'
import { normalizeDishFromApi, normalizeDishesFromApi } from '@/features/dashboard/utils/dishApi'
import type { IDish, ICategory } from '@/types/menu'

export const getUserDetailsByUserId = async () => {
  const data = await http.get(ENDPOINTS.GET_USER_DETAILS)
  return data.data
}

export const putUserFreePlan = async () => {
  const data = await http.put(ENDPOINTS.PUT_FREE_PLAN)
  return data.data
}

export const getUserDishes = async () => {
  const { data } = await http.get<{ dishes?: IDish[] }>(ENDPOINTS.GET_USER_DISHES)
  return {
    dishes: normalizeDishesFromApi(data.dishes ?? []),
  }
}

export const getUserStatus = async (placeName: string) => {
  const data = await http.get(ENDPOINTS.GET_USER_STATUS(placeName))
  return data.data
}

const generateFormDish = (dishData: IDish, options?: { includeTranslations?: boolean }) => {
  const formData = new FormData()
  if (dishData.image) formData.append('image', dishData.image)
  formData.append('name', dishData.name)
  formData.append('description', dishData.description ?? '')
  formData.append('price', dishData.price!.toString())
  formData.append('category', dishData.category)
  formData.append('isAvailable', dishData.isAvailable)

  if (options?.includeTranslations && dishData.translations) {
    formData.append('translations', JSON.stringify(dishData.translations))
  }

  return formData
}

export const addDishForUser = async (
  dishData: IDish,
  options?: { includeTranslations?: boolean },
) => {
  const formData = generateFormDish(dishData, options)
  const { data } = await http.post<{ dish?: IDish } | IDish>(ENDPOINTS.ADD_DISH, formData)
  const raw = (data as { dish?: IDish }).dish ?? (data as IDish)
  return normalizeDishFromApi(raw)
}

export const editDishForUser = async (
  dishData: IDish,
  options?: { includeTranslations?: boolean },
) => {
  const formData = generateFormDish(dishData, options)
  const { data } = await http.put<{ dish?: IDish } | IDish>(
    ENDPOINTS.EDIT_DISH(dishData.id),
    formData,
  )
  const raw = (data as { dish?: IDish }).dish ?? (data as IDish)
  return normalizeDishFromApi(raw)
}

export const deleteDishById = async (dishId: string) => {
  await http.delete(ENDPOINTS.DELETE_DISH(dishId))
}

export const getUserCategories = async () => {
  const { data } = await http.get<{ categories?: ICategory[] }>(ENDPOINTS.GET_USER_CATEGORIES)
  return {
    categories: normalizeCategoriesFromApi(data.categories ?? []),
  }
}

export const addCategoryForUser = async (
  categoryData: ICategory,
  options?: { includeTranslations?: boolean },
) => {
  const body = serializeCategoryForApi(categoryData, {
    includeTranslations: options?.includeTranslations ?? false,
  })
  const { data } = await http.post<{ category?: ICategory } | ICategory>(ENDPOINTS.ADD_CATEGORY, body)
  const raw = (data as { category?: ICategory }).category ?? (data as ICategory)
  return normalizeCategoryFromApi(raw)
}

export const editCategoryForUser = async (
  categoryData: ICategory,
  options?: { includeTranslations?: boolean },
) => {
  const body = serializeCategoryForApi(categoryData, {
    includeTranslations: options?.includeTranslations ?? false,
  })
  const { data } = await http.put<{ category?: ICategory } | ICategory>(
    ENDPOINTS.EDIT_CATEGORY(categoryData.id),
    body,
  )
  const raw = (data as { category?: ICategory }).category ?? (data as ICategory)
  return normalizeCategoryFromApi(raw)
}

export const deleteCategoryById = async (categoryId: string) => {
  await http.delete(ENDPOINTS.DELETE_CATEGORY(categoryId))
}

export const getShowcaseOrdersForOwner = async (params?: {
  status?: ShowcaseOrderStatusFilter
}): Promise<IShowcasePlacedOrder[]> => {
  const query = params?.status && params.status !== 'all' ? { status: params.status } : undefined
  const { data } = await http.get<{ orders?: IShowcasePlacedOrder[] } | IShowcasePlacedOrder[]>(
    ENDPOINTS.GET_SHOWCASE_ORDERS,
    { params: query },
  )
  if (Array.isArray(data)) return data
  return data.orders ?? []
}

export const patchShowcaseOrderStatus = async (
  orderId: string,
  status: ShowcaseOrderStatus,
): Promise<void> => {
  await http.patch(ENDPOINTS.PATCH_SHOWCASE_ORDER(orderId), { status })
}

export const getTableReservationsForOwner = async (params?: {
  status?: TableReservationStatusFilter
}): Promise<ITableReservation[]> => {
  const query =
    params?.status && params.status !== 'all' ? { status: params.status } : undefined
  const { data } = await http.get<{ reservations?: ITableReservation[] } | ITableReservation[]>(
    ENDPOINTS.GET_TABLE_RESERVATIONS,
    { params: query },
  )
  if (Array.isArray(data)) return data
  return data.reservations ?? []
}

export const patchTableReservation = async (
  reservationId: string,
  body: IPatchTableReservationBody,
): Promise<void> => {
  await http.patch(ENDPOINTS.PATCH_TABLE_RESERVATION(reservationId), body)
}
