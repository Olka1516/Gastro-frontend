<template>
  <div role="group" :aria-label="t('dashboard.analytics.period.calendarAria')">
    <div class="flex items-center justify-between gap-3 mb-3">
      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-[#2a2930] hover:text-white"
        :aria-label="t('dashboard.analytics.period.prevMonth')"
        @click="shiftMonth(-1)"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <p class="text-white text-sm font-semibold capitalize">{{ monthTitle }}</p>
      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-[#2a2930] hover:text-white"
        :aria-label="t('dashboard.analytics.period.nextMonth')"
        @click="shiftMonth(1)"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>

    <div class="grid grid-cols-7 gap-0.5 mb-1" aria-hidden="true">
      <span
        v-for="label in weekdayLabels"
        :key="label"
        class="text-center text-[0.6rem] font-medium uppercase tracking-wide text-gray-500 py-1"
      >
        {{ label }}
      </span>
    </div>

    <div class="grid grid-cols-7 gap-0.5" role="grid" :aria-label="monthTitle">
      <button
        v-for="cell in calendarCells"
        :key="cell.key"
        type="button"
        role="gridcell"
        :disabled="cell.disabled"
        :aria-label="cell.ariaLabel"
        :class="dayButtonClass(cell)"
        @click="onDayClick(cell.ymd)"
        @mouseenter="hoverYmd = cell.ymd"
        @mouseleave="hoverYmd = null"
      >
        {{ cell.day }}
      </button>
    </div>

    <p v-if="pickHint" class="mt-3 text-xs text-gray-500">{{ pickHint }}</p>
  </div>
</template>

<script setup lang="ts">
import {
  dateRangeYmdToMs,
  parseYmdLocal,
  ymdFromDate,
  type AnalyticsDateRangeYmd,
} from '@/features/dashboard/composables/useAnalyticsPeriodStats'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: AnalyticsDateRangeYmd
}>()

const emit = defineEmits<{
  'update:modelValue': [value: AnalyticsDateRangeYmd]
  complete: []
}>()

const { t, locale } = useI18n()

const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth())
const awaitingEnd = ref(false)
const hoverYmd = ref<string | null>(null)

const dateLocale = computed(() => (locale.value === 'ua' ? 'uk-UA' : 'en-GB'))

const monthFormatter = computed(
  () =>
    new Intl.DateTimeFormat(dateLocale.value, {
      month: 'long',
      year: 'numeric',
    }),
)

const dayFormatter = computed(
  () =>
    new Intl.DateTimeFormat(dateLocale.value, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
)

const todayYmd = computed(() => ymdFromDate(new Date()))

const selectionBounds = computed(() => {
  const { startYmd, endYmd } = props.modelValue
  if (!startYmd || !endYmd) return null
  return startYmd <= endYmd ? { start: startYmd, end: endYmd } : { start: endYmd, end: startYmd }
})

const pickHint = computed(() => {
  if (awaitingEnd.value) return t('dashboard.analytics.period.pickEnd')
  return ''
})

const monthTitle = computed(() =>
  monthFormatter.value.format(new Date(viewYear.value, viewMonth.value, 1)),
)

const weekdayLabels = computed(() => {
  const monday = new Date(2024, 0, 1)
  const fmt = new Intl.DateTimeFormat(dateLocale.value, { weekday: 'short' })
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return fmt.format(d)
  })
})

type CalendarCell = {
  key: string
  ymd: string
  day: number
  inMonth: boolean
  disabled: boolean
  inRange: boolean
  isStart: boolean
  isEnd: boolean
  isToday: boolean
  ariaLabel: string
}

const calendarCells = computed((): CalendarCell[] => {
  const year = viewYear.value
  const month = viewMonth.value
  const first = new Date(year, month, 1)
  const startOffset = (first.getDay() + 6) % 7
  const gridStart = new Date(year, month, 1 - startOffset)
  const bounds = selectionBounds.value
  const hover = hoverYmd.value

  let previewStart: string | null = bounds?.start ?? null
  let previewEnd: string | null = bounds?.end ?? null
  if (awaitingEnd.value && hover && props.modelValue.startYmd) {
    previewStart =
      props.modelValue.startYmd <= hover ? props.modelValue.startYmd : hover
    previewEnd =
      props.modelValue.startYmd <= hover ? hover : props.modelValue.startYmd
  }

  const cells: CalendarCell[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    const ymd = ymdFromDate(d)
    const inMonth = d.getMonth() === month
    const disabled = ymd > todayYmd.value
    const isToday = ymd === todayYmd.value
    const rangeStart = previewStart
    const rangeEnd = previewEnd

    const inRange =
      !!rangeStart && !!rangeEnd && ymd >= rangeStart && ymd <= rangeEnd && !disabled
    const isStart = ymd === rangeStart
    const isEnd = ymd === rangeEnd

    cells.push({
      key: ymd,
      ymd,
      day: d.getDate(),
      inMonth,
      disabled,
      inRange,
      isStart,
      isEnd,
      isToday,
      ariaLabel: dayFormatter.value.format(d),
    })
  }
  return cells
})

function dayButtonClass(cell: CalendarCell): string {
  const base =
    'relative h-8 w-full rounded-md text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#dc5b41]'

  if (cell.disabled) {
    return `${base} text-gray-600 cursor-not-allowed`
  }
  if (cell.isStart || cell.isEnd) {
    return `${base} bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] text-white shadow-md`
  }
  if (cell.inRange) {
    return `${base} bg-[#dc5b41]/20 text-white`
  }
  if (cell.isToday) {
    return `${base} text-[#dc5b41] ring-1 ring-[#dc5b41]/50 hover:bg-[#2a2930]`
  }
  if (!cell.inMonth) {
    return `${base} text-gray-600 hover:bg-[#2a2930] hover:text-gray-300`
  }
  return `${base} text-gray-300 hover:bg-[#2a2930] hover:text-white`
}

function shiftMonth(delta: number) {
  const d = new Date(viewYear.value, viewMonth.value + delta, 1)
  viewYear.value = d.getFullYear()
  viewMonth.value = d.getMonth()
}

function onDayClick(ymd: string) {
  if (ymd > todayYmd.value) return

  if (!awaitingEnd.value) {
    emit('update:modelValue', { startYmd: ymd, endYmd: ymd })
    awaitingEnd.value = true
    return
  }

  const start = props.modelValue.startYmd
  const [startYmd, endYmd] = start <= ymd ? [start, ymd] : [ymd, start]
  emit('update:modelValue', { startYmd, endYmd })
  awaitingEnd.value = false
  emit('complete')
}

watch(
  () => props.modelValue,
  (range) => {
    const end = parseYmdLocal(range.endYmd)
    if (end) {
      viewYear.value = end.getFullYear()
      viewMonth.value = end.getMonth()
    }
  },
  { immediate: true },
)
</script>
