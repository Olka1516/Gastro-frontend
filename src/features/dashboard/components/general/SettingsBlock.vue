<template>
  <div class="p-12 flex flex-col items-center gap-12">
    <h2 class="text-white text-2xl font-bold w-full">
      {{ t('dashboard.standart.navs.settings') }}
    </h2>

    <div class="w-full max-w-md">
      <form class="space-y-6" @submit.prevent="handleSubmit" autocomplete="on">
        <div class="relative">
          <BaseText v-model="formData.placeName" :v="v$.placeName" type="placeName" :error="error"
            autocomplete="organization" />
          <ErrorMessage :v="v$.placeName" :error="error" />
        </div>

        <div class="relative">
          <BaseText v-model="formData.email" :v="v$.email" type="email" :error="error" autocomplete="username"
            inputType="email" />
          <ErrorMessage :v="v$.email" :error="error" />
        </div>

        <SettingsPlaceExtras v-model:currency="formData.currency" v-model:menu-welcome-text="formData.menuWelcomeText" />

        <BaseButton
          type="submit"
          block
          :scale-on-hover="false"
          class="mt-4 shadow-md hover:bg-[#dc5b34]"
          :text="t('button.edit')"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import SettingsPlaceExtras from '@/features/dashboard/components/shared/SettingsPlaceExtras.vue'
import { DEFAULT_CURRENCY, parseCurrency } from '@/constants/currency'
import { notificationStore, useUserStore } from '@/stores'
import type { TRequestError } from '@/types'
import useVuelidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useUserStore()
const toastStore = notificationStore()
const error = ref('')

const formData = reactive({
  placeName: '',
  email: '',
  currency: DEFAULT_CURRENCY,
  menuWelcomeText: '',
})

const rules = {
  email: { required, email },
  placeName: { required },
}

const v$ = useVuelidate(rules, formData)

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  try {
    error.value = ''
    await store.updateUser({
      placeName: formData.placeName,
      email: formData.email,
      currency: formData.currency,
      menuWelcomeText: formData.menuWelcomeText.trim(),
    })

    toastStore.sendSuccess(t('dashboard.settings.dataSuccessUpdated'))
  } catch (err) {
    const message = err as TRequestError
    error.value = message.response?.data.message || ''
  }
}

onMounted(() => {
  formData.placeName = store.placeName
  formData.email = store.email
  formData.currency = parseCurrency(store.currency)
  formData.menuWelcomeText = store.menuWelcomeText || ''
})
</script>
