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
      <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div class="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
          <button
            @click="closeModal"
            class="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>

          <div class="mb-6">
            <component :is="modals[activeModal]" />
          </div>

          <div class="flex justify-center gap-4">
            <button @click="activeModal = 'signUp'" :class="activeStyle('signUp')">
              {{ t('button.signUp') }}
            </button>

            <button @click="activeModal = 'signIn'" :class="activeStyle('signIn')">
              {{ t('button.signIn') }}
            </button>
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

const activeStyle = (name: ModalKey) => {
  return [
    'px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer',
    activeModal.value === name
      ? 'bg-blue-600 text-white shadow-md'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  ]
}

const closeModal = () => {
  open.value = false
  document.body.style.overflow = ''
}
</script>
