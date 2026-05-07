import { i18n } from '@/lang'
import { postTableReservation } from '@/services/showcase'
import type { TRequestError } from '@/types/errorEnum'
import type { ICreateTableReservationPayload } from '@/types/tableReservation'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { notificationStore } from './notificationStore'

function toastKeyForTableReservationApiError(apiMessage: unknown): string {
  if (typeof apiMessage !== 'string' || !apiMessage) {
    return 'toasts.reserveRequestError'
  }
  const key = `apiTableReservation.${apiMessage}`
  return i18n.global.te(key) ? key : 'toasts.reserveRequestError'
}

export const useShowcaseReservationStore = defineStore('showcaseReservation', () => {
  const loading = ref(false)
  const lastError = ref<string | null>(null)
  const lastReservationId = ref<string | null>(null)

  const submitReservation = async (params: { placeSlug: string; payload: ICreateTableReservationPayload }) => {
    const store = notificationStore()

    loading.value = true
    lastError.value = null
    lastReservationId.value = null

    try {
      const { id } = await postTableReservation(params.placeSlug, params.payload)
      if (typeof id === 'string') {
        lastReservationId.value = id
      }

      store.sendSuccess('toasts.reserveRequestSent')
      return { success: true as const, id: typeof id === 'string' ? id : undefined }
    } catch (err) {
      const axiosErr = err as TRequestError
      const message = axiosErr.response?.data?.message
      lastError.value = typeof message === 'string' ? message : null

      store.sendError(toastKeyForTableReservationApiError(message))
      return { success: false as const }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    lastError,
    lastReservationId,
    submitReservation,
  }
})
