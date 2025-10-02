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

    <AuthTeleportModals v-model:open="open" @handleProcess="nextStep(plan)" />
    <BaseDelete
      text="landing.changePlan"
      v-model:openDelete="openDelete"
      @handleProcess="(value) => setFreePlan(value)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Plan } from '../types'
import { loadStripe } from '@stripe/stripe-js'
import { getCheckoutId } from '@/services'
import { plans } from '../constants'
import { useUserStore } from '@/stores'
import { EPlan } from '@/types'
import { useRouter } from 'vue-router'
import { getImage } from '@/common/functions'
import AuthTeleportModals from './modals/AuthTeleportModals.vue'
import { LINK_TEMPLATES } from '@/constants'
import BaseDelete from '@/components/modal/BaseDelete.vue'

const store = useUserStore()
const router = useRouter()
const { t, tm, rt } = useI18n()
const open = ref(false)
const openDelete = ref(false)
const visible = ref(false)
const visibilityId = ref()
const plan: Ref<Plan> = ref({ name: '', price: 0 })

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

const setFreePlan = async (value: boolean) => {
  if (value) {
    await store.putFreePlan()
    await router.push(LINK_TEMPLATES.DASHBOARD)
  }
}

const nextStep = async (value: Plan) => {
  if (!store.isUserAuthorized) {
    plan.value = value
    open.value = true
    document.body.style.overflow = 'hidden'
  } else if (value.name === EPlan.free && store.planName !== EPlan.free) {
    openDelete.value = true
    document.body.style.overflow = 'hidden'
  } else if (value.name === EPlan.free) {
    await setFreePlan(true)
  } else {
    await loadCheckout(value)
  }
}
</script>

<style scoped></style>
