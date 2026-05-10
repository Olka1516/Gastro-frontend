<template>
  <h2 class="text-2xl font-semibold text-white text-center mb-6">{{ t('landing.signIn') }}</h2>

  <form class="space-y-6" @submit.prevent="submit" autocomplete="on">
    <div class="relative">
      <BaseText
        v-model="userData.email"
        :v="v$.email"
        type="email"
        :error="error"
        autocomplete="username"
      />
      <ErrorMessage :v="v$.email" :error="error" />
    </div>

    <div class="relative">
      <BasePassword
        v-model="userData.password"
        :v="v$.password"
        type="password"
        autocomplete="new-password"
      />
      <ErrorMessage :v="v$.password" :error="error" />
    </div>

    <button
      type="submit"
      class="cursor-pointer w-full py-2 mt-4 bg-[#dc5b41] text-white font-semibold rounded-lg shadow-md hover:bg-[#dc5b34] transition"
    >
      {{ t('button.signIn') }}
    </button>
  </form>
</template>

<script setup lang="ts">
import BasePassword from '@/components/inputs/BasePassword.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import { notificationStore, useUserStore } from '@/stores'
import type { TRequestError } from '@/types'
import useVuelidate from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const store = useUserStore()
const toastStore = notificationStore()
const { t } = useI18n()
const userData = reactive({
  email: '',
  password: '',
})
const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const error = ref('')

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
}

const v$ = useVuelidate(rules, userData)

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
  try {
    const { email, password } = userData
    await store.signIn({
      email,
      password,
    })
    emit('closeModal')
    toastStore.sendSuccess('toasts.signIn')
  } catch (err) {
    const message = err as TRequestError
    error.value = message.response?.data.message || ''
    toastStore.sendError('toasts.error')
  }
}
</script>
