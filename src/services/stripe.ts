import { ENDPOINTS } from '@/constants'
import http from '@/http'

export const getCheckoutId = async () => {
  const data = await http.get(ENDPOINTS.STRIPE_CHECKOUT)
  return data.data.id
}
