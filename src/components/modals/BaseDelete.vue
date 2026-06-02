<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="open"
        class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-[6px]"
        role="presentation" @click.self="handleNextStep(false)">
        <div
          :class="[MODAL_SURFACE_CLASS, 'delete-modal relative w-full max-w-md overflow-hidden rounded-lg shadow-2xl shadow-black/50']"
          role="alertdialog" aria-modal="true" :aria-labelledby="titleId" @click.stop>
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
              <BaseButton
                variant="outline"
                :scale-on-hover="false"
                pressable
                class="delete-modal__btn flex-1 hover:bg-white/5"
                :text="t('button.no')"
                @click="handleNextStep(false)"
              />
              <BaseButton
                variant="gradient"
                :scale-on-hover="false"
                pressable
                class="delete-modal__btn flex-1 hover:opacity-95"
                :text="t('button.yes')"
                @click="handleNextStep(true)"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { MODAL_SURFACE_CLASS } from '@/constants/modalSurface'
import { useBodyScrollLock } from '@/utils/bodyScrollLock'
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{ text: string }>()

const { t } = useI18n()
const titleId = useId()
const open = defineModel('openDelete')
const emit = defineEmits<{
  (e: 'handleProcess', value: boolean): void
}>()

useBodyScrollLock(open)

const closeModal = () => {
  open.value = false
}

const handleNextStep = (answer: boolean) => {
  closeModal()
  emit('handleProcess', answer)
}
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
