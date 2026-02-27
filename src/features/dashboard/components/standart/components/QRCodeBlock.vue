<template>
  <div class="p-12 flex flex-col gap-8 min-h-screen bg-[#0f0f11]">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <BaseLoader />
    </div>

    <div v-else class="flex flex-col gap-8">
      <!-- Header -->
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

      <!-- Main Content Card -->
      <div
        class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-3xl border border-[#2a2930] p-8 md:p-12 shadow-xl"
      >
        <div class="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <!-- QR Code Display -->
          <div class="flex-shrink-0">
            <div
              class="bg-white p-6 rounded-2xl shadow-2xl relative group hover:scale-105 transition-transform duration-300"
            >
              <img v-if="qrCode" :src="qrCode" alt="QR Code" class="w-64 h-64 block" />
              <div
                v-if="!qrCode"
                class="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <BaseLoader />
              </div>
              <!-- Decorative Corner Elements -->
              <div
                class="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-[#dc5b41] rounded-tl-xl opacity-50"
              ></div>
              <div
                class="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-[#e66a4f] rounded-br-xl opacity-50"
              ></div>
            </div>
          </div>

          <!-- Information Panel -->
          <div class="flex-1 flex flex-col gap-6 w-full">
            <!-- Menu Link Card -->
            <div
              class="bg-gradient-to-br from-[#2a2930] to-[#1a191f] rounded-2xl border border-[#2a2930] p-6"
            >
              <div class="flex flex-col gap-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <img
                      src="@/assets/images/icons/link.svg"
                      alt="link"
                      class="w-5 h-5"
                      style="filter: brightness(0) invert(1)"
                    />
                  </div>
                  <h3 class="text-white text-lg font-semibold">
                    {{ t('dashboard.standart.qrCode.menuLink') }}
                  </h3>
                </div>
                <div
                  class="bg-[#0f0f11] rounded-lg p-4 border border-[#2a2930] flex items-center gap-3 group"
                >
                  <p
                    class="text-gray-300 text-sm flex-1 break-all font-mono"
                    :class="{ 'select-all': copied }"
                  >
                    {{ menuUrl }}
                  </p>
                  <button
                    @click="copyToClipboard"
                    :class="[
                      'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 flex-shrink-0',
                      copied
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-[#dc5b41]/20 text-[#dc5b41] hover:bg-[#dc5b41]/30 border border-[#dc5b41]/30',
                    ]"
                  >
                    <span v-if="copied">✓</span>
                    <span v-else>{{ t('button.copy') }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Instructions Card -->
            <div
              class="bg-gradient-to-br from-[#2a2930] to-[#1a191f] rounded-2xl border border-[#2a2930] p-6"
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-lg flex items-center justify-center flex-shrink-0"
                >
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

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="downloadQRCode"
                class="flex-1 text-white bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-6 py-4 cursor-pointer rounded-2xl hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-3 group shadow-[0_8px_30px_rgb(220,91,65,0.4)] hover:shadow-[0_8px_40px_rgb(220,91,65,0.6)]"
              >
                <img src="@/assets/images/icons/download.svg" alt="download" class="w-5 h-5" />
                {{ t('button.download') }}
              </button>
              <a
                :href="menuUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-white border-2 border-[#dc5b41] px-6 py-4 cursor-pointer rounded-2xl hover:bg-[#dc5b41]/10 transition-all duration-300 font-semibold flex items-center justify-center gap-3 group"
              >
                <img src="@/assets/images/icons/link.svg" alt="arrow-right" class="w-5 h-5" />
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

<style scoped></style>
