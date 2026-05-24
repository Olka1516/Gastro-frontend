<template>
  <div ref="rootRef" class="relative w-full sm:w-auto sm:min-w-[14rem]">
    <button
      type="button"
      :aria-expanded="open"
      aria-haspopup="dialog"
      :aria-label="t('dashboard.analytics.period.customAria')"
      :class="[
        'flex w-full items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200',
        active
          ? 'border-[#dc5b41]/50 bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] text-white shadow-md'
          : 'border-[#2a2930] bg-[#1a191f] text-gray-300 hover:border-[#3a3942] hover:text-white',
      ]"
      @click="toggleOpen"
    >
      <span class="shrink-0 opacity-80" aria-hidden="true">📅</span>
      <span class="min-w-0 truncate text-left">{{ displayLabel }}</span>
      <span class="ml-auto shrink-0 text-xs opacity-70" aria-hidden="true">{{ open ? '▴' : '▾' }}</span>
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="open"
        ref="panelRef"
        class="absolute left-0 right-0 sm:right-auto z-30 mt-2 w-full sm:w-[18.5rem] rounded-2xl border border-[#2a2930] bg-[#1a191f] p-4 shadow-2xl"
        role="dialog"
        :aria-label="t('dashboard.analytics.period.calendarAria')"
      >
        <AnalyticsPeriodCalendar
          :model-value="modelValue"
          @update:model-value="onRangeUpdate"
          @complete="onRangeComplete"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {
  dateRangeYmdToMs,
  parseYmdLocal,
  type AnalyticsDateRangeYmd,
} from '@/features/dashboard/composables/useAnalyticsPeriodStats'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AnalyticsPeriodCalendar from './AnalyticsPeriodCalendar.vue'

const props = defineProps<{
  modelValue: AnalyticsDateRangeYmd
  active?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: AnalyticsDateRangeYmd]
  select: []
}>()

const { t, locale } = useI18n()

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const dateLocale = computed(() => (locale.value === 'ua' ? 'uk-UA' : 'en-GB'))

const rangeFormatter = computed(
  () =>
    new Intl.DateTimeFormat(dateLocale.value, {
      day: 'numeric',
      month: 'short',
    }),
)

const displayLabel = computed(() => {
  const ms = dateRangeYmdToMs(props.modelValue)
  if (!ms) return t('dashboard.analytics.period.customPlaceholder')
  const start = parseYmdLocal(props.modelValue.startYmd)
  const end = parseYmdLocal(props.modelValue.endYmd)
  if (!start || !end) return t('dashboard.analytics.period.customPlaceholder')
  const [from, to] = start <= end ? [start, end] : [end, start]
  const fmt = rangeFormatter.value
  if (props.modelValue.startYmd === props.modelValue.endYmd) {
    return fmt.format(from)
  }
  return `${fmt.format(from)} – ${fmt.format(to)}`
})

function toggleOpen() {
  open.value = !open.value
  if (open.value) emit('select')
}

function onRangeUpdate(value: AnalyticsDateRangeYmd) {
  emit('update:modelValue', value)
  emit('select')
}

function onRangeComplete() {
  open.value = false
}

function onDocumentPointerDown(e: PointerEvent) {
  if (!open.value) return
  const root = rootRef.value
  if (root && !root.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
})
</script>
