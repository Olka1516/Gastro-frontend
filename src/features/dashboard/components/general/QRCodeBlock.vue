<template>
  <div class="p-12 flex flex-col gap-8 min-h-screen bg-[#0f0f11]">
    <div v-if="loading"
      class="fixed w-screen h-screen inset-0 bg-[#0f0f11]/94 flex items-center justify-center z-[2000]">
      <BaseLoader />
    </div>

    <div v-else class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <h1 class="text-white text-4xl font-bold">
              {{ t('dashboard.standart.qrCode.description') }}
            </h1>
            <p class="text-gray-400 text-sm max-w-2xl">
              {{ t('dashboard.standart.qrCode.instruction') }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-3xl border border-[#2a2930] p-8 md:p-12 shadow-xl">
        <div class="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <div class="shrink-0">
            <div class="bg-white p-6 rounded-lg shadow-2xl relative group transition-transform duration-300">
              <img v-if="qrCode" :src="qrCode" alt="QR Code" class="w-64 h-64 block" />
              <div v-if="!qrCode" class="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                <BaseLoader />
              </div>
              <div
                class="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-[#dc5b41] rounded-tl-xl opacity-50">
              </div>
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-[#e66a4f] rounded-br-xl opacity-50">
              </div>
            </div>
          </div>

          <div class="flex w-full min-w-0 flex-1 flex-col gap-6">
            <QrMenuLinkBlock :url="menuUrl" />

            <div class="bg-gradient-to-br from-[#2a2930] to-[#1a191f] rounded-2xl border border-[#2a2930] p-6">
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">📱</span>
                </div>
                <div class="flex flex-col gap-2">
                  <h3 class="text-white text-lg font-semibold">
                    {{ t('dashboard.standart.qrCode.howToUse') }}
                  </h3>
                  <ul class="text-gray-400 text-sm space-y-2 list-disc list-inside">
                    <li>{{ t('dashboard.standart.qrCode.step1') }}</li>
                    <li>{{ t('dashboard.standart.qrCode.step2') }}</li>
                    <li>{{ t('dashboard.standart.qrCode.step3') }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <BaseButton variant="gradient" class="flex-1" :icon="downloadIcon" :text="t('button.download')"
                @click="downloadQRCode" />
              <BaseButton variant="outline" class="flex-1" :href="menuUrl" target="_blank" rel="noopener noreferrer"
                :icon="linkIcon" :text="t('dashboard.standart.qrCode.openMenu')" />
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
