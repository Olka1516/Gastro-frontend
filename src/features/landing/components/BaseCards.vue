<template>
  <div>
    <section
      id="plans"
      class="relative w-full overflow-x-clip bg-[#0f0f11] px-4 py-14 md:py-20 lg:flex lg:min-h-[calc(100vh-50px)] lg:flex-col lg:justify-center lg:gap-14 lg:py-16"
    >
      <h2 class="text-center text-2xl font-bold text-white sm:text-3xl">
        {{ t('landing.priceAndPlans') }}
      </h2>

      <div
        class="mx-auto mt-10 flex w-full max-w-md flex-col gap-5 sm:max-w-none sm:gap-6 md:mt-12 md:max-w-5xl md:grid md:grid-cols-3 md:items-stretch md:gap-5 lg:mt-0 lg:flex lg:max-w-none lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-12"
      >
        <article
          v-for="(value, i) in plans"
          :key="value.name"
          class="plan-card flex w-full flex-col items-center gap-4 rounded-xl border bg-[#1a191f] p-6 transition-all duration-400 ease-in sm:p-7 lg:w-80 lg:shrink-0 lg:p-8"
          :class="cardClasses(i)"
          @mouseenter="changeVisibility(true, i)"
          @mouseleave="changeVisibility(false, -1)"
        >
          <span
            v-if="isRecommended(i)"
            class="rounded-full bg-[#dc5b41]/15 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#dc5b41]"
          >
            {{ t('landing.recommendedPlan') }}
          </span>

          <img
            class="h-14 w-auto object-contain sm:h-16 lg:h-auto"
            :src="getImage(`../features/landing/assets/images/landing/plan_${i + 1}.png`)"
            alt=""
          />

          <h4 class="text-lg font-bold text-[#dc5b41] sm:text-xl">
            {{ t(`plans.${value.name}.name`) }}
          </h4>

          <h5 v-if="value.price" class="text-xl text-white sm:text-2xl">
            {{ value.currency }}{{ value.price }} / {{ t(`subscribe.${value.subscribe}`) }}
          </h5>
          <h5 v-else class="text-xl text-white sm:text-2xl">Free</h5>

          <ul class="flex w-full flex-col gap-2 text-center sm:max-w-[16rem] lg:items-center">
            <li
              v-for="item in tm(`plans.${value.name}.details`)"
              :key="item"
              class="text-sm leading-snug text-[#ccc]"
            >
              {{ rt(item) }}
            </li>
          </ul>

          <BaseButton
            :text="t('button.choose')"
            layout="plan-card"
            :active="visible && visibilityId === i"
            @click="nextStep(value)"
          />
        </article>
      </div>
    </section>

    <AuthTeleportModals v-model:open="open" @handleProcess="nextStep(plan)" />
    <BaseDelete
      text="landing.changePlan"
      v-model:openDelete="openDelete"
      @handleProcess="(value) => setFreePlan(value)"
    />
  </div>
</template>

<script setup lang="ts">
import { getImage } from '@/common/functions'
import BaseButton from '@/components/BaseButton.vue'
import BaseDelete from '@/components/modals/BaseDelete.vue'
import AuthTeleportModals from '@/components/modals/auth/AuthTeleportModals.vue'
import { LINK_TEMPLATES } from '@/constants'
import { getCheckoutId } from '@/services'
import { useUserStore } from '@/stores'
import { EPlan } from '@/types'
import { loadStripe } from '@stripe/stripe-js'
import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { plans } from '../constants'
import type { Plan } from '../types'

const RECOMMENDED_INDEX = 1

const store = useUserStore()
const router = useRouter()
const { t, tm, rt } = useI18n()
const open = ref(false)
const openDelete = ref(false)
const visible = ref(false)
const visibilityId = ref(-1)
const plan: Ref<Plan> = ref({ name: '', price: 0 })

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const isRecommended = (index: number) => index === RECOMMENDED_INDEX

const cardClasses = (index: number) => {
  const isActive = visible.value && visibilityId.value === index

  return [
    'border-white/8',
    isActive ? 'lg:scale-115 lg:z-10 lg:border-[#dc5b41]/50' : 'lg:scale-100',
  ]
}

const changeVisibility = (key: boolean, id: number) => {
  visible.value = key
  visibilityId.value = id
}

const loadCheckout = async (value: Plan) => {
  const id = await getCheckoutId({ ...value, returnTo: 'landing' })
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
