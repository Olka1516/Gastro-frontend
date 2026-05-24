<template>
  <div
    class="rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#2a2930] to-[#1a191f] p-4 sm:p-5 md:p-6"
  >
    <div class="flex flex-col gap-3 sm:gap-4">
      <div class="flex items-center gap-3">
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] sm:h-10 sm:w-10"
        >
          <img
            src="@/assets/images/icons/link.svg"
            alt=""
            class="h-4 w-4 sm:h-5 sm:w-5"
            style="filter: brightness(0) invert(1)"
          />
        </div>
        <h3 class="text-base font-semibold text-white sm:text-lg">
          {{ t('dashboard.standart.qrCode.menuLink') }}
        </h3>
      </div>

      <div
        class="grid grid-cols-1 gap-3 rounded-lg border border-[#2a2930] bg-[#0f0f11] p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-3 sm:p-4"
      >
        <p
          class="min-w-0 break-all font-mono text-xs leading-relaxed text-gray-300 sm:text-sm"
          :class="{ 'select-all': copied }"
        >
          {{ url }}
        </p>
        <button
          type="button"
          class="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 sm:w-auto sm:justify-self-end"
          :class="
            copied
              ? 'border border-green-500/30 bg-green-500/20 text-green-400'
              : 'border border-[#dc5b41]/30 bg-[#dc5b41]/20 text-[#dc5b41] hover:bg-[#dc5b41]/30'
          "
          @click="copyToClipboard"
        >
          <span v-if="copied">✓</span>
          <span v-else>{{ t('button.copy') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { notificationStore } from '@/stores'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  url: string
}>()

const { t } = useI18n()
const toastStore = notificationStore()
const copied = ref(false)

const copyToClipboard = async () => {
  if (!props.url) return
  try {
    await navigator.clipboard.writeText(props.url)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    toastStore.sendError(t('dashboard.standart.qrCode.copyError'))
  }
}
</script>
