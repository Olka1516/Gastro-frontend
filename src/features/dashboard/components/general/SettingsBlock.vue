<template>
  <div class="p-12 flex flex-col items-center gap-12">
    <h2 class="text-white text-2xl font-bold w-full">
      {{ t('dashboard.standart.navs.settings') }}
    </h2>

    <div class="w-full max-w-md">
      <form class="space-y-6" @submit.prevent="handleSubmit" autocomplete="on">
        <div class="relative">
          <BaseText
            v-model="formData.placeName"
            :v="v$.placeName"
            type="placeName"
            :error="error"
            autocomplete="organization"
          />
          <ErrorMessage :v="v$.placeName" :error="error" />
        </div>

        <div class="relative">
          <BaseText
            v-model="formData.email"
            :v="v$.email"
            type="email"
            :error="error"
            autocomplete="username"
            inputType="email"
          />
          <ErrorMessage :v="v$.email" :error="error" />
        </div>

        <button
          type="submit"
          class="cursor-pointer w-full py-2 mt-4 bg-[#dc5b41] text-white font-semibold rounded-lg shadow-md hover:bg-[#dc5b34] transition"
        >
          {{ t('button.edit') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseText from '@/components/inputs/BaseText.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import { useUserStore } from '@/stores'
import type { TRequestError } from '@/types'
import useVuelidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useUserStore()
const error = ref('')

const formData = reactive({
  placeName: '',
  email: '',
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
    })
  } catch (err) {
    const message = err as TRequestError
    error.value = message.response?.data.message || ''
  }
}

onMounted(() => {
  formData.placeName = store.placeName
  formData.email = store.email
})
</script>

<style scoped></style>
