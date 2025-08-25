<template>
  <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">{{ t('landing.signUp') }}</h2>

  <form class="space-y-4" @submit.prevent="submit" autocomplete="on">
    <div>
      <BaseText
        v-model="userData.email"
        :v="v$.email"
        type="email"
        :error="error"
        autocomplete="username"
      />
      <ErrorMessage :v="v$.email" :error="error" />
    </div>

    <div>
      <BaseText
        v-model="userData.placeName"
        :v="v$.placeName"
        type="placeName"
        :error="error"
        autocomplete="organization"
      />
      <ErrorMessage :v="v$.placeName" :error="error" />
    </div>

    <div>
      <BasePassword
        v-model="userData.password"
        :v="v$.password"
        type="password"
        autocomplete="new-password"
      />
      <ErrorMessage :v="v$.password" />
    </div>

    <div>
      <BasePassword
        v-model="userData.confirmPassword"
        :v="v$.confirmPassword"
        type="confirmPassword"
        autocomplete="new-password"
      />
      <ErrorMessage :v="v$.confirmPassword" />
    </div>

    <button
      type="submit"
      class="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
    >
      {{ t('button.signUp') }}
    </button>
  </form>
</template>

<script setup lang="ts">
import BasePassword from '@/components/inputs/BasePassword.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import { signUpByUserData } from '@/services'
import type { TRequestError } from '@/types'
import useVuelidate from '@vuelidate/core'
import { email, minLength, required, sameAs } from '@vuelidate/validators'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userData = reactive({
  email: '',
  placeName: '',
  password: '',
  confirmPassword: '',
})

const error = ref('')

const rules = {
  email: { required, email },
  placeName: { required },
  password: { required, minLength: minLength(6) },
  confirmPassword: {
    required,
    sameAs: sameAs(computed(() => userData.password)),
  },
}

const v$ = useVuelidate(rules, userData)

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
  try {
    const { placeName, email, password } = userData
    await signUpByUserData({
      placeName,
      email,
      password,
    })
    // TODO: to pay
  } catch (err) {
    const message = err as TRequestError
    error.value = message.response?.data.message || ''
  }
}
</script>
