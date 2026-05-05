<template>
  <div class="min-h-screen bg-[#0f0f11] px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <RouterLink
        :to="LINK_TEMPLATES.MENU(placeSlugDisplay)"
        class="mb-8 inline-flex text-sm text-[#dc5b41] transition-colors hover:text-[#e66a4f]"
      >
        ← {{ t('showcase.premium.backToMenu') }}
      </RouterLink>

      <h1 class="text-2xl font-bold tracking-tight md:text-3xl">
        {{ t('showcase.premium.checkoutTitle') }}
      </h1>

      <div
        v-if="lines.length === 0"
        class="mt-10 rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-10 text-center"
      >
        <p class="text-gray-400">{{ t('showcase.premium.checkoutEmptyCart') }}</p>
        <RouterLink
          :to="LINK_TEMPLATES.MENU(placeSlugDisplay)"
          class="mt-6 inline-flex rounded-xl bg-[#dc5b41] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          {{ t('showcase.premium.backToMenu') }}
        </RouterLink>
      </div>

      <div v-else class="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
        <section
          class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-5 shadow-xl sm:p-6"
          aria-labelledby="checkout-summary-heading"
        >
          <h2 id="checkout-summary-heading" class="text-lg font-bold text-white">
            {{ t('showcase.premium.checkoutOrderSummary') }}
          </h2>
          <ul class="mt-5 flex flex-col gap-4">
            <li
              v-for="line in lines"
              :key="line.lineId"
              class="flex gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0"
            >
              <div class="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#111]">
                <img
                  v-if="line.dish.image"
                  :src="line.dish.image"
                  :alt="line.dish.name"
                  class="h-full w-full object-cover"
                />
                <div v-else class="flex h-full w-full items-center justify-center text-lg text-white/25">🍽</div>
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-medium text-white">{{ line.dish.name }}</p>
                <p class="mt-0.5 text-xs text-gray-500">{{ line.dish.categoryName }}</p>
                <p class="mt-1 text-sm text-gray-400">
                  {{ line.quantity }} {{ t('showcase.premium.cartUnit') }} × ${{ line.dish.price.toFixed(2) }}
                </p>
              </div>
              <p class="shrink-0 text-sm font-semibold text-white">
                ${{ lineTotal(line).toFixed(2) }}
              </p>
            </li>
          </ul>
          <div class="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
            <span class="text-gray-400">{{ t('showcase.premium.cartTotal') }}</span>
            <span class="text-xl font-bold text-white">${{ grandTotal.toFixed(2) }}</span>
          </div>
        </section>

        <section
          class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-5 shadow-xl sm:p-6"
          aria-labelledby="checkout-form-heading"
        >
          <h2 id="checkout-form-heading" class="text-lg font-bold text-white">
            {{ t('showcase.premium.checkoutFormSection') }}
          </h2>
          <form class="mt-6 flex flex-col gap-5" @submit.prevent="handleSubmit">
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="flex flex-col gap-1.5">
                <span class="text-sm text-gray-300">{{ t('showcase.premium.checkoutFirstName') }}</span>
                <div class="relative">
                  <BaseText
                    v-model="form.firstName"
                    :v="v$.firstName"
                    type="firstName"
                    autocomplete="given-name"
                  />
                  <ErrorMessage :v="v$.firstName" />
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm text-gray-300">{{ t('showcase.premium.checkoutLastName') }}</span>
                <div class="relative">
                  <BaseText
                    v-model="form.lastName"
                    :v="v$.lastName"
                    type="lastName"
                    autocomplete="family-name"
                  />
                  <ErrorMessage :v="v$.lastName" />
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <span class="text-sm text-gray-300">{{ t('showcase.premium.checkoutPhone') }}</span>
              <div class="relative">
                <BaseText
                  v-model="form.phone"
                  :v="v$.phone"
                  type="phone"
                  input-type="tel"
                  autocomplete="tel"
                />
                <ErrorMessage :v="v$.phone" />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <span class="text-sm text-gray-300">
                {{ t('showcase.premium.checkoutEmail') }}
                <span class="font-normal text-gray-500">({{ t('showcase.premium.checkoutEmailHint') }})</span>
              </span>
              <div class="relative">
                <BaseText
                  v-model="form.email"
                  :v="v$.email"
                  type="email"
                  input-type="email"
                  autocomplete="email"
                />
                <ErrorMessage :v="v$.email" />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <span class="text-sm text-gray-300">{{ t('showcase.premium.checkoutAddress') }}</span>
              <div class="relative">
                <BaseDeliveryAddress v-model="form.address" :v="v$.address" />
                <ErrorMessage :v="v$.address" />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <span class="text-sm text-gray-300">
                {{ t('showcase.premium.checkoutDeliveryTime') }}
                <span class="font-normal text-gray-500">({{ t('showcase.premium.checkoutDeliveryTimeHint') }})</span>
              </span>
              <div class="relative">
                <BaseText v-model="form.deliveryTime" :v="v$.deliveryTime" type="deliveryTime" />
                <ErrorMessage :v="v$.deliveryTime" />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <span class="text-sm text-gray-300">{{ t('showcase.premium.checkoutComment') }}</span>
              <div class="relative">
                <BaseTextarea v-model="form.comment" :v="v$.comment" type="checkoutComment" :rows="4" />
                <ErrorMessage :v="v$.comment" />
              </div>
            </div>

            <button
              type="submit"
              :disabled="orderStore.loading"
              class="mt-2 w-full rounded-xl bg-[#dc5b41] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#dc5b41]/20 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
            >
              {{ orderStore.loading ? t('showcase.premium.checkoutSubmitting') : t('showcase.premium.checkoutSubmit') }}
            </button>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseDeliveryAddress from '@/components/inputs/BaseDeliveryAddress.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import BaseTextarea from '@/components/inputs/BaseTextarea.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import { LINK_TEMPLATES } from '@/constants'
import { useShowcaseCartStore } from '@/stores/showcaseCartStore'
import { useShowcaseOrderStore } from '@/stores/showcaseOrderStore'
import type { IShowcaseCartLine } from '@/types/showcaseCart'
import { linesToOrderPayload } from '@/types/showcaseOrder'
import { underscoreToSpace } from '@/utils/textHelpers'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
import { computed, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const cartStore = useShowcaseCartStore()
const orderStore = useShowcaseOrderStore()

const placeSlug = computed(() => String(route.params.id ?? ''))

const placeSlugDisplay = computed(() => underscoreToSpace(placeSlug.value))

const lines = computed(() => cartStore.linesInCart)

const lineTotal = (line: IShowcaseCartLine) => line.dish.price * line.quantity

const grandTotal = computed(() => lines.value.reduce((sum, line) => sum + lineTotal(line), 0))

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  deliveryTime: '',
  comment: '',
})

const rules = computed(() => ({
  firstName: { required },
  lastName: { required },
  phone: { required, minLength: minLength(10) },
  email: {
    email: helpers.withMessage(
      () => t('errors.email.email'),
      (value: string) =>
        !helpers.req(value) ||
        !String(value).trim() ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()),
    ),
  },
  address: { required },
  deliveryTime: {},
  comment: {},
}))

const v$ = useVuelidate(rules, form)

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  const cartLines = cartStore.linesInCart
  if (cartLines.length === 0) return

  const result = await orderStore.submitOrder({
    placeSlug: placeSlug.value,
    customer: { ...form },
    lines: linesToOrderPayload(cartLines),
    total: grandTotal.value,
  })

  if (result.success) {
    await router.push(LINK_TEMPLATES.MENU(placeSlugDisplay.value))
  }
}

onMounted(() => {
  cartStore.load(placeSlug.value)
})
</script>
