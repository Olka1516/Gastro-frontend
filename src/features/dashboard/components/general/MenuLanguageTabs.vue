<template>
  <div class="w-full" role="tablist" :aria-label="t('dashboard.categories.languagesTablist')">
    <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 w-full">
      <button
        v-for="lang in MENU_LANGUAGES"
        :key="lang.code"
        type="button"
        role="tab"
        :aria-selected="modelValue === lang.code"
        :tabindex="modelValue === lang.code ? 0 : -1"
        class="relative flex flex-col items-center justify-center gap-0.5 min-w-0 min-h-[3.25rem] px-1 py-1.5 rounded-[0.625rem] text-[0.625rem] font-bold tracking-wide cursor-pointer transition-all duration-200 active:scale-[0.97]"
        :class="tabClasses(lang.code)"
        :title="lang.nativeLabel"
        @click="emit('update:modelValue', lang.code)"
      >
        <span class="text-lg leading-none shrink-0" aria-hidden="true">{{ lang.flag }}</span>
        <span class="text-[0.5625rem] leading-none">{{ lang.code.toUpperCase() }}</span>
        <span
          class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200"
          :class="dotClasses(lang.code)"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MENU_LANGUAGES } from '@/constants/menuLanguages'
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
    return 'border border-[#dc5b41] bg-gradient-to-br from-[#dc5b41]/20 to-[#dc5b41]/5 text-white shadow-[0_0_0_1px_rgba(220,91,65,0.25),0_4px_14px_rgba(220,91,65,0.15)]'
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
  if (isActive) return 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.4)]'
  return 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.55)]'
}
</script>
