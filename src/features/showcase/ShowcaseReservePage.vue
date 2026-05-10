<template>
  <div class="min-h-screen bg-[#0f0f11]">
    <BaseHeader :limit="300" :navigations="navs" :active-section="activeSection" :is-menu-page="true"
      :is-premium-menu="true" :showcase-nav-base-path="menuBasePath" />

    <div class="px-4 pb-16 pt-24 text-white sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl">
        <h1 class="text-2xl font-bold tracking-tight md:text-3xl">
          {{ t('showcase.premium.reserveTitle') }}
        </h1>
        <p class="mt-2 text-sm text-gray-400">{{ t('showcase.premium.reserveSubtitle') }}</p>

        <section
          class="mt-10 rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-5 shadow-xl sm:p-6"
          aria-labelledby="reserve-form-heading">
          <h2 id="reserve-form-heading" class="text-lg font-bold text-white">
            {{ t('showcase.premium.reserveFormSection') }}
          </h2>

          <form class="mt-6 flex flex-col gap-5" @submit.prevent="handleSubmit">
            <div class="grid gap-4 sm:grid-cols-2 reserve-native-datetime">
              <div class="flex flex-col gap-1.5">
                <span class="text-sm text-gray-300">{{ t('showcase.premium.reserveDate') }}</span>
                <div class="relative">
                  <BaseText v-model="form.date" :v="v$.date" type="reserveDate" input-type="date" autocomplete="off" />
                  <ErrorMessage :v="v$.date" />
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm text-gray-300">{{ t('showcase.premium.reserveTime') }}</span>
                <div class="relative">
                  <BaseText v-model="form.time" :v="v$.time" type="reserveTime" input-type="time" autocomplete="off" />
                  <ErrorMessage :v="v$.time" />
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <span class="text-sm text-gray-300">{{
                t('showcase.premium.reservePartySize')
                }}</span>
              <div class="relative">
                <BaseText v-model="form.partySize" :v="v$.partySize" type="partySize" input-type="number"
                  autocomplete="off" />
                <ErrorMessage :v="v$.partySize" />
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="flex flex-col gap-1.5">
                <span class="text-sm text-gray-300">{{
                  t('showcase.premium.checkoutFirstName')
                  }}</span>
                <div class="relative">
                  <BaseText v-model="form.firstName" :v="v$.firstName" type="firstName" autocomplete="given-name" />
                  <ErrorMessage :v="v$.firstName" />
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <span class="text-sm text-gray-300">{{
                  t('showcase.premium.checkoutLastName')
                  }}</span>
                <div class="relative">
                  <BaseText v-model="form.lastName" :v="v$.lastName" type="lastName" autocomplete="family-name" />
                  <ErrorMessage :v="v$.lastName" />
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <span class="text-sm text-gray-300">{{ t('showcase.premium.checkoutPhone') }}</span>
              <div class="relative">
                <BaseText v-model="form.phone" :v="v$.phone" type="phone" input-type="tel" autocomplete="tel" />
                <ErrorMessage :v="v$.phone" />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <span class="text-sm text-gray-300">{{ t('showcase.premium.reserveEmail') }}</span>
              <div class="relative">
                <BaseText v-model="form.email" :v="v$.email" type="email" input-type="email" autocomplete="email" />
                <ErrorMessage :v="v$.email" />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <span class="text-sm text-gray-300">{{ t('showcase.premium.reserveComment') }}</span>
              <div class="relative">
                <BaseTextarea v-model="form.comment" :v="v$.comment" type="reserveComment" :rows="4" />
                <ErrorMessage :v="v$.comment" />
              </div>
            </div>

            <p class="text-xs text-gray-500">{{ t('showcase.premium.reserveLegalHint') }}</p>

            <button type="submit" :disabled="reservationStore.loading"
              class="mt-2 w-full rounded-xl bg-[#dc5b41] py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:pointer-events-none disabled:opacity-60">
              {{
                reservationStore.loading
                  ? t('showcase.premium.reserveSubmitting')
                  : t('showcase.premium.reserveSubmit')
              }}
            </button>
          </form>
        </section>
      </div>
    </div>

    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseFooter from '@/components/BaseFooter.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import BaseTextarea from '@/components/inputs/BaseTextarea.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import { showcasePlanContextKey } from '@/features/showcase/types/showcasePlanContext'
import { useShowcaseReservationStore } from '@/stores/showcaseReservationStore'
import { EPlan } from '@/types'
import useVuelidate from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
import { computed, inject, reactive, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const ctx = inject(showcasePlanContextKey)
const reservationStore = useShowcaseReservationStore()

const activeSection = ref('')
const navs = ['menu', 'orders', 'reserve']
const menuBasePath = computed(() => `/menu/${String(route.params.id ?? '')}`)

watchEffect(() => {
  const c = ctx?.value
  if (!c) return
  if (c.planName !== EPlan.premium) {
    router.replace({ path: menuBasePath.value })
  }
})

const form = reactive({
  date: '',
  time: '',
  partySize: '' as string | number,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  comment: '',
})

const rules = computed(() => ({
  date: { required },
  time: { required },
  partySize: {
    required,
    validParty: helpers.withMessage(
      () => t('errors.reserve.partySize'),
      (value: string | number) => {
        const n = Number(value)
        return Number.isFinite(n) && n >= 1 && n <= 50
      },
    ),
  },
  firstName: { required },
  lastName: { required },
  phone: { required, minLength: minLength(10) },
  email: {
    required,
    email: helpers.withMessage(
      () => t('errors.email.email'),
      (value: string) =>
        !helpers.req(value) ||
        !String(value).trim() ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()),
    ),
  },
  comment: {},
}))

const v$ = useVuelidate(rules, form)

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  const placeSlug = String(route.params.id ?? '')
  const partySize = Number(form.partySize)

  const result = await reservationStore.submitReservation({
    placeSlug,
    payload: {
      visitDate: form.date,
      visitTime: form.time,
      partySize,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      comment: form.comment.trim() || undefined,
    },
  })

  if (!result.success) return

  v$.value.$reset()
  Object.assign(form, {
    date: '',
    time: '',
    partySize: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    comment: '',
  })
}
</script>

<style scoped>
.reserve-native-datetime :deep(input[type='date']),
.reserve-native-datetime :deep(input[type='time']) {
  color-scheme: dark;
}
</style>
