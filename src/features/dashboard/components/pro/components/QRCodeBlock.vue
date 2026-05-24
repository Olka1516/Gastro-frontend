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
        class="rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-4 shadow-xl sm:p-6 md:p-8 lg:p-12">
        <div class="flex flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-start">
          <div class="w-full shrink-0 sm:w-auto">
            <div
              class="relative mx-auto w-fit rounded-lg bg-white p-4 shadow-2xl transition-transform duration-300 group-hover:scale-105 sm:p-5 md:p-6">
              <img v-if="qrCode" :src="qrCode" alt="QR Code" class="block h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64" />
              <div
                v-if="!qrCode"
                class="flex h-48 w-48 items-center justify-center rounded-lg bg-gray-100 sm:h-56 sm:w-56 md:h-64 md:w-64">
                <BaseLoader />
              </div>
              <div
                class="absolute -left-2 -top-2 h-6 w-6 rounded-tl-lg border-l-4 border-t-4 border-[#dc5b41] opacity-50 sm:h-8 sm:w-8" />
              <div
                class="absolute -bottom-2 -right-2 h-6 w-6 rounded-br-lg border-b-4 border-r-4 border-[#e66a4f] opacity-50 sm:h-8 sm:w-8" />
            </div>
          </div>

          <div class="flex w-full min-w-0 flex-1 flex-col gap-4 sm:gap-6">
            <QrMenuLinkBlock :url="menuUrl" />

            <div
              class="rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#2a2930] to-[#1a191f] p-4 sm:p-5 md:p-6">
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
              <BaseButton
                variant="gradient"
                size="large"
                class="flex-1"
                :icon="downloadIcon"
                :text="t('button.download')"
                @click="downloadQRCode"
              />
              <BaseButton
                variant="outline"
                size="large"
                class="flex-1"
                :href="menuUrl"
                target="_blank"
                rel="noopener noreferrer"
                :icon="linkIcon"
                :text="t('dashboard.standart.qrCode.openMenu')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import downloadIcon from '@/assets/images/icons/download.svg'
import linkIcon from '@/assets/images/icons/link.svg'
import BaseButton from '@/components/BaseButton.vue'
import BaseLoader from '@/components/BaseLoader.vue'
import QrMenuLinkBlock from '@/features/dashboard/components/shared/QrMenuLinkBlock.vue'
import { LINK_TEMPLATES } from '@/constants'
import { notificationStore, useUserStore } from '@/stores'
import QRCode from 'qrcode'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const qrCode = ref('')
const loading = ref(true)
const userStore = useUserStore()
const toastStore = notificationStore()

const menuUrl = computed(() => {
  if (!userStore.placeName) return ''
  return `${import.meta.env.VITE_BASE_URL_FRONT}${LINK_TEMPLATES.MENU(userStore.placeName)}`
})

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
