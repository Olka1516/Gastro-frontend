<template>
  <div>
    <div
      class="bg-[#0f0f11] h-[calc(100vh-50px)] flex flex-col gap-14 justify-center items-center relative overflow-hidden"
    >
      <h2 class="text-[#fff] text-3xl font-bold">{{ t('landing.priceAndPlans') }}</h2>
      <div class="flex w-[calc(100%-104px)] gap-12 justify-center">
        <div
          class="bg-[#1a191f] w-80 p-8 flex flex-col gap-4 items-center transition duration-400 ease-in"
          v-for="(value, i) in plans"
          :class="visible && i === visibilityId ? 'scale-115' : 'scale-100'"
          :key="value.name"
          @mouseenter="changeVisibility(true, i)"
          @mouseleave="changeVisibility(false, -1)"
        >
          <img
            :src="getImage(`../features/landing/assets/images/landing/plan_${i + 1}.png`)"
            alt=""
          />
          <h4 class="text-xl font-bold text-[#dc5b41]">{{ t(`plans.${value.name}.name`) }}</h4>
          <h5 v-if="value.price" class="text-2xl text-[#fff]">
            {{ value.currency }}{{ value.price }} / {{ t(`subscribe.${value.subscribe}`) }}
          </h5>
          <h5 v-else class="text-2xl text-[#fff]">Free</h5>
          <div class="flex flex-col gap-2 items-center">
            <p
              v-for="item in tm(`plans.${value.name}.details`)"
              class="text-[#ccc] text-sm"
              :key="item"
            >
              {{ rt(item) }}
            </p>
          </div>
          <button
            :class="
              visible && i === visibilityId
                ? 'opacity-100 translate-y-2'
                : 'opacity-0 translate-y-5'
            "
            class="cursor-pointer text-[#fff] bg-[#dc5b41] px-8 py-2 transition duration-300 ease-in"
            @click="nextStep(value)"
          >
            {{ t('button.choose') }}
          </button>
        </div>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SignUpModal from './modals/SignUpModal.vue'
import type { ModalKey, Plan } from '../types'
import { loadStripe } from '@stripe/stripe-js'
import { getCheckoutId } from '@/services'
import SignInModal from './modals/SignInModal.vue'
import { plans } from '../constants'
import { useUserStore } from '@/stores'
import { EPlan } from '@/types'
import { useRouter } from 'vue-router'
import { getImage } from '@/common/functions'

const store = useUserStore()
const router = useRouter()
const { t, tm, rt } = useI18n()
const open = ref(false)
const visible = ref(false)
const visibilityId = ref()
const activeModal = ref<ModalKey>('signUp')
const modals = {
  signUp: SignUpModal,
  signIn: SignInModal,
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
const changeVisibility = (key: boolean, id: number) => {
  visible.value = key
  visibilityId.value = id
}

const loadCheckout = async (value: Plan) => {
  const id = await getCheckoutId(value)
  const stripe = await stripePromise
  if (!stripe) {
    console.log('not loaded')
    return
  }
  await stripe.redirectToCheckout({
    sessionId: id,
  })
}

const nextStep = async (value: Plan) => {
  if (!store.isUserAuthorized) {
    open.value = true
    document.body.style.overflow = 'hidden'
  } else if (value.name === EPlan.free) {
    await store.putFreePlan()
    await router.push('/dashboard')
  } else {
    await loadCheckout(value)
  }
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

<style scoped></style>
