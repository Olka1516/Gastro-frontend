import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

export const notificationStore = defineStore('notificationSender', () => {
  const toast = useToast()
  const { t } = useI18n()

  const sendSuccess = (message: string) => {
    toast.success(t(message), {
      toastClassName: 'success-toats',
    })
  }

  const sendError = (message: string) => {
    toast.error(t(message), {
      toastClassName: 'error-toats',
    })
  }

  return {
    sendSuccess,
    sendError,
  }
})
