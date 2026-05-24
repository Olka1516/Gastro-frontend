<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-300">{{ t('dashboard.settings.currency') }}</span>
      <select
        v-model="currency"
        class="h-11 w-full cursor-pointer rounded-lg border border-[#2a2930] bg-[#1a191f] px-3 text-sm text-white outline-none transition focus:border-[#dc5b41]"
      >
        <option v-for="code in CURRENCY_CODES" :key="code" :value="code">
          {{ t(`dashboard.settings.currencies.${code}`) }}
        </option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-300">{{ t('dashboard.settings.menuWelcomeText') }}</span>
      <p class="text-xs leading-relaxed text-gray-500">{{ t('dashboard.settings.menuWelcomeTextHint') }}</p>
      <textarea
        v-model="menuWelcomeText"
        rows="3"
        maxlength="280"
        class="w-full resize-y rounded-lg border border-[#2a2930] bg-[#1a191f] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#dc5b41]"
        :placeholder="t('showcase.welcomeDescription')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CURRENCY_CODES, type CurrencyCode } from '@/constants/currency'
import { useI18n } from 'vue-i18n'

const currency = defineModel<CurrencyCode>('currency', { required: true })
const menuWelcomeText = defineModel<string>('menuWelcomeText', { default: '' })

const { t } = useI18n()
</script>
