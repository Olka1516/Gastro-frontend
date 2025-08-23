<template>
  <main
    class="w-full bg-gradient-to-br from-[#c09d80] via-[#EBDFD7] to-[#c09d80] flex justify-center items-center min-h-screen gap-4 px-24"
  >
    <div class="flex flex-col gap-8 items-start">
      <h1 class="text-5xl">{{ t('landing.readyTemplates') }}</h1>
      <h3>{{ t('landing.readyTemplatesDescription') }}</h3>
      <button
        @click="testStripe"
        class="bg-[#A38579] text-white px-6 py-3 rounded-lg hover:bg-[#B38579] transition duration-200"
      >
        {{ t('button.clickMe') }}
      </button>
    </div>
    <AnimatedButton />
    <!-- dish -->
    <!-- <div>
      <img class="max-w-lg" src="../assets/images/meal.png" alt="" />
    </div> -->

    <!-- Mac and iphone -->
    <!-- <div class="flex flex-row gap-24 w-350">
      <div class="relative flex items-end">
        <div class="-left-8 bottom-6 absolute z-10">
          <div class="relative max-h-90">
            <img class="max-h-90" src="../assets/images/iphone.png" alt="" />
            <component :is="mobileLayouts[currentTab]"></component>
          </div>
        </div>

        <div class="relative max-h-110 z-0">
          <img class="max-h-110" src="../assets/images/macbook.png" alt="" />
          <component :is="laptopLayouts[currentTab]"></component>
        </div>
      </div>
    </div> -->
  </main>
</template>

<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FirstLayoutIphone from './FirstLayoutIphone.vue'
import FirstLayoutMacbook from './FirstLayoutMacbook.vue'
import AnimatedButton from './AnimatedButton.vue'
import { getCheckoutId } from '@/services'

const { t, rt, tm } = useI18n()
console.log(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const mobileLayouts = [FirstLayoutIphone]
const laptopLayouts = [FirstLayoutMacbook]

const currentTab = ref(0)

const testStripe = async () => {
  const id = await getCheckoutId()
  console.log(id)
  const stripe = await stripePromise
  if (!stripe) {
    console.log('not loaded')
    return
  }
  const { error } = await stripe.redirectToCheckout({
    sessionId: id,
  })

  console.log(error)
}
</script>

<style scoped></style>
