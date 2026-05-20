<template>
  <div class="flex flex-wrap items-center gap-1.5" :title="titleText">
    <span
      v-for="lang in MENU_LANGUAGES"
      :key="lang.code"
      class="lang-badge"
      :class="filledSet.has(lang.code) ? 'lang-badge--filled' : 'lang-badge--empty'"
      :title="lang.nativeLabel"
    >
      <span class="lang-badge__flag" aria-hidden="true">{{ lang.flag }}</span>
    </span>
    <span class="text-[10px] font-semibold text-gray-500 tabular-nums ml-0.5">
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

<style scoped>
.lang-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 0.375rem;
  transition:
    opacity 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.lang-badge__flag {
  font-size: 0.75rem;
  line-height: 1;
}

.lang-badge--filled {
  background: rgba(220, 91, 65, 0.15);
  border: 1px solid rgba(220, 91, 65, 0.35);
  opacity: 1;
}

.lang-badge--empty {
  background: #1a191f;
  border: 1px solid #2a2930;
  opacity: 0.35;
  filter: grayscale(0.6);
}

.group:hover .lang-badge--filled {
  box-shadow: 0 0 8px rgba(220, 91, 65, 0.25);
}
</style>
