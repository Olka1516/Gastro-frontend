<template>
  <div class="flex w-[calc(100%-104px)] justify-between m-auto">
    <div class="bg-[#1f3a66] w-100 p-8" v-for="value in plans" :key="value.name">
      <h4 class="text-[#fff]">{{ value.name }}</h4>
      <h5 class="text-[#fff]">{{ value.price }}</h5>
      <button class="text-[#fff] bg-[#000] hover:bg-[#014] p-4" @click="nextStep">buy</button>
    </div>
  </div>

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
            class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SignUpModal from './modals/SignUpModal.vue'
import type { ModalKey } from '../types'
import { loadStripe } from '@stripe/stripe-js'
import { getCheckoutId } from '@/services'
import SignInModal from './modals/SignInModal.vue'
import { plans } from '../constants'

const { t } = useI18n()
const open = ref(false)
const activeModal = ref<ModalKey>('signUp')
const modals = {
  signUp: SignUpModal,
  signIn: SignInModal,
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const testStripe = async () => {
  const id = await getCheckoutId()
  const stripe = await stripePromise
  if (!stripe) {
    console.log('not loaded')
    return
  }
  await stripe.redirectToCheckout({
    sessionId: id,
  })
}

const nextStep = async () => {
  if (true) {
    open.value = true
    document.body.style.overflow = 'hidden'
  } else {
    await testStripe()
  }
}

const activeStyle = (name: ModalKey) => {
  return [
    'px-4 py-2 rounded-lg text-sm font-medium transition',
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

<style scoped></style>
