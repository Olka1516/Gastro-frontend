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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <span class="text-sm text-gray-300">{{ t('dashboard.settings.menuBackgroundColor') }}</span>
            <div class="flex items-center gap-2">
              <input v-model="formData.menuBackgroundColor" type="color"
                class="h-11 w-14 min-w-14 rounded-lg border border-[#2a2930] bg-[#1a191f] p-1 cursor-pointer" />
              <input v-model="formData.menuBackgroundColor" type="text"
                class="h-11 w-full rounded-lg border border-[#2a2930] bg-[#1a191f] px-3 text-white"
                placeholder="#0f0f11" @blur="normalizeColor('menuBackgroundColor', DEFAULT_MENU_BG_COLOR)" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-sm text-gray-300">{{ t('dashboard.settings.menuIconColor') }}</span>
            <div class="flex items-center gap-2">
              <input v-model="formData.menuIconColor" type="color"
                class="h-11 w-14 min-w-14 rounded-lg border border-[#2a2930] bg-[#1a191f] p-1 cursor-pointer" />
              <input v-model="formData.menuIconColor" type="text"
                class="h-11 w-full rounded-lg border border-[#2a2930] bg-[#1a191f] px-3 text-white"
                placeholder="#dc5b41" @blur="normalizeColor('menuIconColor', DEFAULT_MENU_ICON_COLOR)" />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-sm text-gray-300">{{ t('dashboard.settings.logo') }}</span>
          <BaseDragFile :url="formData.logo" @update="handleLogoUpdate" />
        </div>

        <button type="submit"
          class="cursor-pointer w-full py-2 mt-4 bg-[#dc5b41] text-white font-semibold rounded-lg shadow-md hover:bg-[#dc5b34] transition">
          {{ t('button.edit') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseDragFile from '@/components/inputs/BaseDragFile.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
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
const DEFAULT_MENU_BG_COLOR = '#0f0f11'
const DEFAULT_MENU_ICON_COLOR = '#dc5b41'

const formData = reactive({
  placeName: '',
  email: '',
  menuBackgroundColor: DEFAULT_MENU_BG_COLOR,
  menuIconColor: DEFAULT_MENU_ICON_COLOR,
  logo: '' as string | File | null,
})

const rules = {
  email: { required, email },
  placeName: { required },
}

const v$ = useVuelidate(rules, formData)

const normalizeColor = (
  field: 'menuBackgroundColor' | 'menuIconColor',
  fallbackColor: string,
) => {
  const value = formData[field]?.trim().toLowerCase()
  const isHex = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(value)
  formData[field] = isHex ? value : fallbackColor
}

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  try {
    error.value = ''
    normalizeColor('menuBackgroundColor', DEFAULT_MENU_BG_COLOR)
    normalizeColor('menuIconColor', DEFAULT_MENU_ICON_COLOR)
    await store.updateUser({
      placeName: formData.placeName,
      email: formData.email,
      menuBackgroundColor: formData.menuBackgroundColor,
      menuIconColor: formData.menuIconColor,
      logo: formData.logo,
    })

    toastStore.sendSuccess(t('dashboard.settings.dataSuccessUpdated'))
  } catch (err) {
    const message = err as TRequestError
    error.value = message.response?.data.message || ''
  }
}

const handleLogoUpdate = (file: File) => {
  formData.logo = file
}

onMounted(() => {
  formData.placeName = store.placeName
  formData.email = store.email
  formData.menuBackgroundColor = store.menuBackgroundColor || DEFAULT_MENU_BG_COLOR
  formData.menuIconColor = store.menuIconColor || DEFAULT_MENU_ICON_COLOR
  formData.logo = store.logo || null
})
</script>

<style scoped></style>
