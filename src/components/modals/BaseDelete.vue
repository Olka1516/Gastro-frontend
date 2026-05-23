<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="open"
        class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-[6px]"
        role="presentation" @click.self="handleNextStep(false)">
        <div
          class="delete-modal relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#dc5b41]/80 bg-gradient-to-b from-[#1a191f] to-[#0f0f11] shadow-2xl shadow-black/50"
          role="alertdialog" aria-modal="true" :aria-labelledby="titleId" @click.stop>
          <div class="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#dc5b41]/10 blur-2xl"
            aria-hidden="true" />
          <div class="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-[#dc5b41]/5 blur-2xl"
            aria-hidden="true" />

          <button type="button"
            class="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
            :aria-label="t('header.menuClose')" @click="handleNextStep(false)">
            <img src="@/assets/images/icons/exit_white.svg" alt="" class="h-4 w-4" />
          </button>

          <div class="relative px-6 pb-6 pt-10">
            <div class="mb-6 flex items-center gap-4">
              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#dc5b41]/40 bg-[#dc5b41]/10"
                aria-hidden="true">
                <img src="@/assets/images/icons/delete-warning.svg" alt="delete" class="w-7 h-7" />
              </div>
              <p :id="titleId" class="flex-1 text-left text-base font-medium leading-relaxed text-white">
                {{ t(text) }}
              </p>
            </div>

            <div class="flex flex-col-reverse gap-3 sm:flex-row">
              <button type="button"
                class="delete-modal__btn flex-1 cursor-pointer rounded-lg border border-[#dc5b41] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
                @click="handleNextStep(false)">
                {{ t('button.no') }}
              </button>
              <button type="button"
                class="delete-modal__btn flex-1 cursor-pointer rounded-lg bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
                @click="handleNextStep(true)">
                {{ t('button.yes') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onUnmounted, useId, watch } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{ text: string }>()

const { t } = useI18n()
const titleId = useId()
const open = defineModel('openDelete')
const emit = defineEmits<{
  (e: 'handleProcess', value: boolean): void
}>()

const setBodyScrollLock = (locked: boolean) => {
  const overflow = locked ? 'hidden' : ''
  document.documentElement.style.overflow = overflow
  document.body.style.overflow = overflow
}

const closeModal = () => {
  open.value = false
  setBodyScrollLock(false)
}

const handleNextStep = (answer: boolean) => {
  closeModal()
  emit('handleProcess', answer)
}

watch(open, (isOpen) => setBodyScrollLock(!!isOpen), { immediate: true })

onUnmounted(() => setBodyScrollLock(false))
</script>

<style scoped>
.delete-modal__btn:active {
  transform: scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .delete-modal__btn:active {
    transform: none;
  }
}
</style>
