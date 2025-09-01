import { ENDPOINTS } from '@/constants'
import http from '@/http'

export const getUserDetailsByUserId = async () => {
  const data = await http.get(ENDPOINTS.GET_USER_DETAILS)
  return data.data
}
