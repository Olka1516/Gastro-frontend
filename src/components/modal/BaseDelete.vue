<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-90"
    >
      <div
        v-if="open"
        class="fixed inset-0 flex items-center justify-center bg-black/70 z-1000 backdrop-blur-[6px]"
      >
        <div
          class="relative border border-[#dc5b41] w-full max-w-md rounded-2xl shadow-2xl p-12 bg-black/80"
        >
          <button
            @click="closeModal"
            class="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>

          <div class="mb-6">
            <p class="text-white text-center">{{ t(text) }}</p>
          </div>

          <div class="flex justify-center gap-4">
            <button
              class="cursor-pointer text-[#fff] bg-[#dc5b41] px-8 py-2"
              @click="handleNextStep(true)"
            >
              {{ t('button.yes') }}
            </button>
            <button
              class="cursor-pointer text-[#fff] bg-[#dc5b41] px-8 py-2"
              @click="handleNextStep(false)"
            >
              {{ t('button.no') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{ text: string }>()

const { t } = useI18n()
const open = defineModel('openDelete')
const emit = defineEmits<{
  (e: 'handleProcess', value: boolean): void
}>()

const closeModal = () => {
  open.value = false
  document.body.style.overflow = ''
}

const handleNextStep = (answer: boolean) => {
  closeModal()
  emit('handleProcess', answer)
}
</script>
