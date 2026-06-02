<template>
  <div class="w-full" role="tablist" :aria-label="t('dashboard.categories.languagesTablist')">
    <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 w-full">
      <button v-for="lang in MENU_LANGUAGES" :key="lang.code" type="button" role="tab"
        :aria-selected="modelValue === lang.code" :tabindex="modelValue === lang.code ? 0 : -1"
        class="menu-lang-tab relative grid min-w-0 min-h-[3.25rem] place-items-center rounded-[0.625rem] px-2 py-2 text-sm font-bold tracking-wider cursor-pointer transition-all duration-200 active:scale-[0.97]"
        :class="tabClasses(lang.code)" :title="lang.nativeLabel" @click="emit('update:modelValue', lang.code)">
        <span class="menu-lang-tab__code">{{ getLanguageDisplayCode(lang.code) }}</span>
        <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200"
          :class="dotClasses(lang.code)" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MENU_LANGUAGES, getLanguageDisplayCode } from '@/constants/menuLanguages'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: string
  filledLanguages: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', code: string): void
}>()

const { t } = useI18n()

const filledSet = computed(() => new Set(props.filledLanguages))

const tabClasses = (code: string) => {
  const isActive = props.modelValue === code
  const isFilled = filledSet.value.has(code)

  if (isActive) {
    return 'border border-[#dc5b41] bg-gradient-to-br from-[#dc5b41]/20 to-[#dc5b41]/5 text-white'
  }

  return [
    'border text-gray-400 bg-gradient-to-br from-[#1a191f] to-[#121118]',
    'hover:border-[#dc5b41]/40 hover:text-gray-200',
    isFilled ? 'border-[#3d3835]' : 'border-[#2a2930]',
  ].join(' ')
}

const dotClasses = (code: string) => {
  const isActive = props.modelValue === code
  const isFilled = filledSet.value.has(code)

  if (!isFilled) return 'bg-zinc-600'
  if (isActive) return 'bg-white'
  return 'bg-emerald-400'
}
</script>

<style scoped>
.menu-lang-tab__code {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 0.8125rem;
  line-height: 1;
  letter-spacing: 0.08em;
}
</style>
