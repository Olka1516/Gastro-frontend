import { i18n } from '@/lang'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const notificationStore = defineStore('notificationSender', () => {
  const toast = useToast()

  const sendSuccess = (message: string) => {
    toast.success(i18n.global.t(message), {
      toastClassName: 'success-toats',
    })
  }

  const sendError = (message: string) => {
    toast.error(i18n.global.t(message), {
      toastClassName: 'error-toats',
    })
  }

  return {
    sendSuccess,
    sendError,
  }
})
