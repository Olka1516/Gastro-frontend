import { ENDPOINTS } from '@/constants'
import type { Plan } from '@/features/landing/types'
import http from '@/http'

export const getCheckoutId = async (value: Plan) => {
  const data = await http.post(ENDPOINTS.STRIPE_CHECKOUT, value)
  return data.data.id
}
