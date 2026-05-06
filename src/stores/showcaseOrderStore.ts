import { i18n } from '@/lang'
import { postShowcaseOrder } from '@/services/showcase'
import type { TRequestError } from '@/types/errorEnum'
import type { IShowcaseOrderCustomer, IShowcaseOrderLinePayload } from '@/types/showcaseOrder'
import {
  appendShowcaseOrderHistory,
  customerSummaryForHistory,
  linesSnapshotForHistory,
} from '@/utils/showcaseOrderHistoryStorage'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { notificationStore } from './notificationStore'
import { useShowcaseCartStore } from './showcaseCartStore'

function toastKeyForShowcaseOrderApiError(apiMessage: unknown): string {
  if (typeof apiMessage !== 'string' || !apiMessage) {
    return 'toasts.checkoutOrderError'
  }
  const key = `apiShowcaseOrder.${apiMessage}`
  return i18n.global.te(key) ? key : 'toasts.checkoutOrderError'
}

export const useShowcaseOrderStore = defineStore('showcaseOrder', () => {
  const loading = ref(false)
  const lastError = ref<string | null>(null)
  const lastPlacedOrderId = ref<string | null>(null)

  const submitOrder = async (params: {
    placeSlug: string
    customer: IShowcaseOrderCustomer
    lines: IShowcaseOrderLinePayload[]
    total: number
  }) => {
    const store = notificationStore()

    loading.value = true
    lastError.value = null
    lastPlacedOrderId.value = null

    try {
      const { id } = await postShowcaseOrder(params.placeSlug, {
        customer: params.customer,
        lines: params.lines,
        total: params.total,
      })
      if (typeof id === 'string') {
        lastPlacedOrderId.value = id
        appendShowcaseOrderHistory(params.placeSlug, {
          id,
          placedAt: new Date().toISOString(),
          total: params.total,
          lines: linesSnapshotForHistory(params.lines),
          customerSummary: customerSummaryForHistory(params.customer),
          source: 'server',
        })
      }

      const cartStore = useShowcaseCartStore()
      cartStore.markInCartLinesAsOrdered()

      store.sendSuccess('toasts.checkoutOrderSuccess')
      return { success: true as const, orderId: typeof id === 'string' ? id : undefined }
    } catch (err) {
      const axiosErr = err as TRequestError
      const message = axiosErr.response?.data?.message
      lastError.value = typeof message === 'string' ? message : null

      store.sendError(toastKeyForShowcaseOrderApiError(message))
      return { success: false as const }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    lastError,
    lastPlacedOrderId,
    submitOrder,
  }
})
