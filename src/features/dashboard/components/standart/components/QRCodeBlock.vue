<template>
  <div
    class="flex min-h-screen min-w-0 flex-col gap-6 bg-[#0f0f11] p-4 sm:gap-8 sm:p-6 md:p-8 lg:p-12 md:pt-16 sm:pt-16">
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f11]/80 backdrop-blur-sm">
      <BaseLoader />
    </div>

    <div v-else class="flex min-w-0 flex-col gap-6 sm:gap-8">
      <div class="flex min-w-0 flex-col gap-2 sm:gap-4">
        <h1 class="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          {{ t('dashboard.standart.qrCode.description') }}
        </h1>
        <p class="max-w-2xl text-sm text-gray-400">
          {{ t('dashboard.standart.qrCode.instruction') }}
        </p>
      </div>

      <div
        class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-4 shadow-xl sm:rounded-3xl sm:p-6 md:p-8 lg:p-12">
        <div class="flex flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-start">
          <div class="w-full shrink-0 sm:w-auto">
            <div
              class="relative mx-auto w-fit rounded-xl bg-white p-4 shadow-2xl transition-transform duration-300 group-hover:scale-105 sm:rounded-2xl sm:p-5 md:p-6">
              <img v-if="qrCode" :src="qrCode" alt="QR Code" class="block h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64" />
              <div v-if="!qrCode"
                class="flex h-48 w-48 items-center justify-center rounded-xl bg-gray-100 sm:h-56 sm:w-56 md:h-64 md:w-64">
                <BaseLoader />
              </div>
              <div
                class="absolute -left-2 -top-2 h-6 w-6 rounded-tl-xl border-l-4 border-t-4 border-[#dc5b41] opacity-50 sm:h-8 sm:w-8" />
              <div
                class="absolute -bottom-2 -right-2 h-6 w-6 rounded-br-xl border-b-4 border-r-4 border-[#e66a4f] opacity-50 sm:h-8 sm:w-8" />
            </div>
          </div>

          <div class="flex w-full min-w-0 flex-1 flex-col gap-4 sm:gap-6">
            <div
              class="rounded-xl border border-[#2a2930] bg-gradient-to-br from-[#2a2930] to-[#1a191f] p-4 sm:rounded-2xl sm:p-5 md:p-6">
              <div class="flex flex-col gap-3 sm:gap-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] sm:h-10 sm:w-10">
                    <img src="@/assets/images/icons/link.svg" alt="link" class="h-4 w-4 sm:h-5 sm:w-5"
                      style="filter: brightness(0) invert(1)" />
                  </div>
                  <h3 class="text-base font-semibold text-white sm:text-lg">
                    {{ t('dashboard.standart.qrCode.menuLink') }}
                  </h3>
                </div>
                <div
                  class="flex flex-col gap-3 rounded-lg border border-[#2a2930] bg-[#0f0f11] p-3 sm:flex-row sm:items-center sm:gap-3 sm:p-4">
                  <p class="min-w-0 flex-1 break-all font-mono text-xs text-gray-300 sm:text-sm"
                    :class="{ 'select-all': copied }">
                    {{ menuUrl }}
                  </p>
                  <button type="button"
                    class="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 sm:w-auto"
                    :class="[
                      copied
                        ? 'border border-green-500/30 bg-green-500/20 text-green-400'
                        : 'border border-[#dc5b41]/30 bg-[#dc5b41]/20 text-[#dc5b41] hover:bg-[#dc5b41]/30',
                    ]" @click="copyToClipboard">
                    <span v-if="copied">✓</span>
                    <span v-else>{{ t('button.copy') }}</span>
                  </button>
                </div>
              </div>
            </div>

            <div
              class="rounded-xl border border-[#2a2930] bg-gradient-to-br from-[#2a2930] to-[#1a191f] p-4 sm:rounded-2xl sm:p-5 md:p-6">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] sm:h-10 sm:w-10">
                  <span class="text-lg sm:text-xl">📱</span>
                </div>
                <div class="flex min-w-0 flex-col gap-2">
                  <h3 class="text-base font-semibold text-white sm:text-lg">
                    {{ t('dashboard.standart.qrCode.howToUse') }}
                  </h3>
                  <ul class="list-inside list-disc space-y-1.5 text-sm text-gray-400 sm:space-y-2">
                    <li>{{ t('dashboard.standart.qrCode.step1') }}</li>
                    <li>{{ t('dashboard.standart.qrCode.step2') }}</li>
                    <li>{{ t('dashboard.standart.qrCode.step3') }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button type="button"
                class="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4"
                @click="downloadQRCode">
                <img src="@/assets/images/icons/download.svg" alt="" class="h-5 w-5 shrink-0" aria-hidden="true" />
                {{ t('button.download') }}
              </button>
              <a :href="menuUrl" target="_blank" rel="noopener noreferrer"
                class="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-[#dc5b41] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#dc5b41]/10 sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-4">
                <img src="@/assets/images/icons/link.svg" alt="" class="h-5 w-5 shrink-0" aria-hidden="true" />
                {{ t('dashboard.standart.qrCode.openMenu') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import { LINK_TEMPLATES } from '@/constants'
import { notificationStore, useUserStore } from '@/stores'
import QRCode from 'qrcode'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const qrCode = ref('')
const loading = ref(true)
const copied = ref(false)

const userStore = useUserStore()
const toastStore = notificationStore()

const menuUrl = computed(() => {
  if (!userStore.placeName) return ''
  return `${import.meta.env.VITE_BASE_URL_FRONT}${LINK_TEMPLATES.MENU(userStore.placeName)}`
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(menuUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    toastStore.sendError(t('dashboard.standart.qrCode.copyError'))
  }
}

const downloadQRCode = () => {
  if (!qrCode.value) {
    toastStore.sendError(t('dashboard.standart.qrCode.downloadError'))
    return
  }

  try {
    const link = document.createElement('a')
    link.href = qrCode.value
    link.download = `qrcode-${userStore.placeName || 'menu'}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch {
    toastStore.sendError(t('dashboard.standart.qrCode.downloadError'))
  }
}

const generateQRCode = async () => {
  loading.value = true

  try {
    if (!userStore.placeName) {
      toastStore.sendError(t('dashboard.standart.qrCode.noPlaceName'))
      throw new Error(t('dashboard.standart.qrCode.noPlaceName'))
    }

    const url = menuUrl.value
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })

    qrCode.value = qrCodeDataUrl
  } catch {
    toastStore.sendError(t('dashboard.standart.qrCode.generationError'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  generateQRCode()
})
</script>
