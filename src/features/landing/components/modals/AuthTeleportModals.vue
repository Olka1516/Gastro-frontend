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
          class="relative border border-[#dc5b41] w-full max-w-md rounded-2xl shadow-2xl p-8 bg-black/80"
        >
          <button
            @click="closeModal"
            class="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>

          <div class="mb-6">
            <component :is="modals[activeModal]" @closeModal="handleNextStep" />
          </div>

          <div class="flex justify-center gap-4">
            <div v-if="activeModal === 'signIn'">
              <p class="text-white">
                {{ t('landing.notHaveAccount') }}
                <button @click="activeModal = 'signUp'" class="cursor-pointer text-[#dc5b41]">
                  {{ t('button.signUp') }}
                </button>
              </p>
            </div>
            <div v-else>
              <p class="text-white">
                {{ t('landing.haveAccount') }}
                <button @click="activeModal = 'signIn'" class="cursor-pointer text-[#dc5b41]">
                  {{ t('button.signIn') }}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ModalKey } from '../../types'
import SignUpModal from './SignUpModal.vue'
import SignInModal from './SignInModal.vue'

const { t } = useI18n()
const open = defineModel('open')
const activeModal = defineModel<ModalKey>('activeModal', { default: 'signUp' })
const modals = {
  signUp: SignUpModal,
  signIn: SignInModal,
}
const emit = defineEmits<{
  (e: 'handleProcess'): void
}>()

const closeModal = () => {
  open.value = false
  document.body.style.overflow = ''
}

const handleNextStep = () => {
  closeModal()
  emit('handleProcess')
}
</script>
