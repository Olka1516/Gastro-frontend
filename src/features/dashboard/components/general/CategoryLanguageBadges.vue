<template>
  <div class="flex flex-wrap items-center gap-1.5" :title="titleText">
    <span v-for="lang in MENU_LANGUAGES" :key="lang.code"
      class="inline-flex text-white h-[1.375rem] w-[1.375rem] items-center justify-center rounded-md transition-[opacity,transform,box-shadow] duration-200 ease-in-out"
      :class="filledSet.has(lang.code)
        ? 'border border-[#dc5b41]/35 bg-[#dc5b41]/15 opacity-100'
        : 'border border-[#2a2930] bg-[#1a191f] opacity-35 grayscale'
        " :title="lang.nativeLabel">
      <span class="text-xs leading-none" aria-hidden="true">{{ lang.flag }}</span>
    </span>
    <span class="ml-0.5 text-[10px] font-semibold tabular-nums text-white">
      {{ filledCount }}/{{ MENU_LANGUAGES.length }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { MENU_LANGUAGES } from '@/constants/menuLanguages'
import { categoryFilledLanguagesFromCategory } from '@/features/dashboard/utils/categoryTranslations'
import type { ICategory } from '@/types/menu'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  category: ICategory
}>()

const { t } = useI18n()

const filledCodes = computed(() => categoryFilledLanguagesFromCategory(props.category))
const filledSet = computed(() => new Set(filledCodes.value))
const filledCount = computed(() => filledCodes.value.length)

const titleText = computed(() =>
  t('dashboard.categories.languagesFilled', {
    count: filledCount.value,
    total: MENU_LANGUAGES.length,
  }),
)
</script>
