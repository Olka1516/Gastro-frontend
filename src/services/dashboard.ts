import { ENDPOINTS } from '@/constants'
import http from '@/http'

export const getUserDetailsByUserId = async () => {
  const data = await http.get(ENDPOINTS.GET_USER_DETAILS)
  return data.data
}

export const putUserFreePlan = async () => {
  const data = await http.put(ENDPOINTS.PUT_FREE_PLAN)
  return data.data
}
