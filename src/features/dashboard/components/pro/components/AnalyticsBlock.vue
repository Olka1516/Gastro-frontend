<template>
  <div class="min-h-screen bg-[#0f0f11] p-12 flex flex-col gap-8">
    <div v-if="loading" class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <BaseLoader />
    </div>

    <div class="flex flex-col gap-2 max-w-3xl">
      <h2 class="text-white text-4xl font-bold">{{ t('dashboard.analytics.title') }}</h2>
      <p class="text-gray-400 text-sm">{{ t('dashboard.analytics.subtitle') }}</p>
      <p class="text-gray-300 text-sm leading-relaxed mt-2">
        {{ t('dashboard.analytics.intro') }}
      </p>
    </div>

    <div v-if="loadError" class="rounded-2xl border border-red-500/30 bg-red-500/5 px-6 py-4 text-sm text-red-300">
      {{ t('dashboard.analytics.loadError') }}
    </div>

    <template v-else>
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div
            class="inline-flex flex-wrap rounded-xl border border-[#2a2930] bg-[#1a191f] p-1 gap-1 w-full sm:w-auto"
            role="tablist"
            :aria-label="t('dashboard.analytics.period.aria')"
          >
            <button
              v-for="opt in periodOptions"
              :key="opt.value"
              type="button"
              role="tab"
              :aria-selected="periodMode === 'preset' && selectedPeriod === opt.value"
              :class="[
                'flex-1 sm:flex-none min-w-[5.5rem] px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                periodMode === 'preset' && selectedPeriod === opt.value
                  ? 'bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2930]',
              ]"
              @click="selectPreset(opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>

          <AnalyticsCustomPeriodInput
            v-model="customRange"
            :active="periodMode === 'custom'"
            @select="periodMode = 'custom'"
          />
        </div>

        <article
          class="rounded-2xl border border-[#dc5b41]/40 bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-6 sm:p-8 shadow-xl">
          <p class="text-gray-400 text-sm font-medium">{{ activePeriodTitle }}</p>
          <p class="text-white text-4xl font-bold tabular-nums mt-2">{{ activeOrderStats.count }}</p>
          <p class="text-gray-500 text-sm mt-1">{{ t('dashboard.analytics.cards.ordersCaption') }}</p>
          <div class="mt-6 pt-6 border-t border-[#2a2930]">
            <p class="text-gray-500 text-xs uppercase tracking-wide">{{ t('dashboard.analytics.cards.revenue') }}</p>
            <p class="text-[#dc5b41] text-2xl font-semibold tabular-nums mt-1">{{ formatMoney(activeOrderStats.revenue)
            }}</p>
          </div>
        </article>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article
            class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-6 shadow-xl flex flex-col gap-2">
            <p class="text-gray-400 text-sm font-medium">{{ t('dashboard.analytics.cards.avgCheck') }}</p>
            <p class="text-white text-3xl font-bold tabular-nums">{{ formatMoney(avgCheckActive) }}</p>
            <p class="text-gray-500 text-xs mt-1">{{ t('dashboard.analytics.cards.avgCheckHint') }}</p>
          </article>

          <article
            class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-6 shadow-xl flex flex-col gap-2">
            <p class="text-gray-400 text-sm font-medium">{{ t('dashboard.analytics.cards.completed') }}</p>
            <p class="text-white text-3xl font-bold tabular-nums">{{ completedInActivePeriod }}</p>
            <p class="text-gray-500 text-xs mt-1">{{ t('dashboard.analytics.cards.completedHint') }}</p>
          </article>

          <article
            class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-6 shadow-xl flex flex-col gap-2">
            <p class="text-gray-400 text-sm font-medium">{{ t('dashboard.analytics.cards.reservations') }}</p>
            <p class="text-white text-3xl font-bold tabular-nums">{{ reservationsInActivePeriod }}</p>
            <p class="text-gray-500 text-xs mt-1">{{ t('dashboard.analytics.cards.reservationsHint') }}</p>
          </article>

          <article
            class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-6 shadow-xl flex flex-col gap-2">
            <p class="text-gray-400 text-sm font-medium">{{ t('dashboard.analytics.cards.pendingNow') }}</p>
            <p class="text-white text-3xl font-bold tabular-nums">{{ pendingOrdersCount }}</p>
            <p class="text-gray-500 text-xs mt-1">{{ t('dashboard.analytics.cards.pendingHint') }}</p>
          </article>
        </div>
      </div>

      <DishPopularityBarChart :items="dishPopularity" />

    </template>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import {
  aggregateOrdersSince,
  countOrdersWithStatusSince,
  countReservationsSince,
  dateRangeYmdToMs,
  defaultLastDaysRange,
  dishPopularityByOrderCount,
  getPeriodBounds,
  type AnalyticsDateRangeYmd,
} from '@/features/dashboard/composables/useAnalyticsPeriodStats'
import { useDashboardCurrency } from '@/features/dashboard/composables/useDashboardCurrency'
import { getShowcaseOrdersForOwner, getTableReservationsForOwner } from '@/services/dashboard'
import type { IShowcasePlacedOrder } from '@/types/showcaseOrder'
import type { ITableReservation } from '@/types/tableReservation'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AnalyticsCustomPeriodInput from './AnalyticsCustomPeriodInput.vue'
import DishPopularityBarChart from './DishPopularityBarChart.vue'

type Period = 'day' | 'week' | 'month'
type PeriodMode = 'preset' | 'custom'

const { t, locale } = useI18n()
const { formatPrice: formatMoney } = useDashboardCurrency()

const loading = ref(true)
const loadError = ref(false)
const allOrders = ref<IShowcasePlacedOrder[]>([])
const allReservations = ref<ITableReservation[]>([])
const selectedPeriod = ref<Period>('week')
const periodMode = ref<PeriodMode>('preset')
const customRange = ref<AnalyticsDateRangeYmd>(defaultLastDaysRange(7))

const bounds = computed(() => getPeriodBounds())

const customRangeMs = computed(() => dateRangeYmdToMs(customRange.value))

const activeSince = computed(() => {
  if (periodMode.value === 'custom') {
    return customRangeMs.value?.startMs ?? 0
  }
  const b = bounds.value
  if (selectedPeriod.value === 'day') return b.dayStart
  if (selectedPeriod.value === 'week') return b.weekStart
  return b.monthStart
})

const activeUntil = computed(() => {
  if (periodMode.value === 'custom') {
    return customRangeMs.value?.endMs ?? Number.POSITIVE_INFINITY
  }
  return Number.POSITIVE_INFINITY
})

const activeOrderStats = computed(() =>
  aggregateOrdersSince(allOrders.value, activeSince.value, activeUntil.value),
)

const activePeriodTitle = computed(() => {
  if (periodMode.value === 'custom') {
    const ms = customRangeMs.value
    if (!ms) return t('dashboard.analytics.period.invalid')
    const loc = locale.value === 'ua' ? 'uk-UA' : 'en-GB'
    const fmt = new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'short', year: 'numeric' })
    const start = new Date(ms.startMs)
    const end = new Date(ms.endMs)
    if (customRange.value.startYmd === customRange.value.endYmd) {
      return fmt.format(start)
    }
    return `${fmt.format(start)} – ${fmt.format(end)}`
  }
  if (selectedPeriod.value === 'day') return t('dashboard.analytics.period.day')
  if (selectedPeriod.value === 'week') return t('dashboard.analytics.period.week')
  return t('dashboard.analytics.period.month')
})

function selectPreset(period: Period) {
  periodMode.value = 'preset'
  selectedPeriod.value = period
}

const periodOptions = computed(() => [
  { value: 'day' as const, label: t('dashboard.analytics.period.day') },
  { value: 'week' as const, label: t('dashboard.analytics.period.week') },
  { value: 'month' as const, label: t('dashboard.analytics.period.month') },
])

const avgCheckActive = computed(() => {
  const { count, revenue } = activeOrderStats.value
  return count > 0 ? revenue / count : 0
})

const completedInActivePeriod = computed(() =>
  countOrdersWithStatusSince(
    allOrders.value,
    'completed',
    activeSince.value,
    activeUntil.value,
  ),
)

const pendingOrdersCount = computed(() => allOrders.value.filter((o) => o.status === 'pending').length)

const reservationsInActivePeriod = computed(() =>
  countReservationsSince(allReservations.value, activeSince.value, activeUntil.value),
)

const dishPopularity = computed(() =>
  dishPopularityByOrderCount(
    allOrders.value,
    activeSince.value,
    15,
    activeUntil.value,
  ),
)

onMounted(async () => {
  loading.value = true
  loadError.value = false
  try {
    const [orders, reservations] = await Promise.all([
      getShowcaseOrdersForOwner({ status: 'all' }),
      getTableReservationsForOwner({ status: 'all' }),
    ])
    allOrders.value = orders
    allReservations.value = reservations
  } catch {
    loadError.value = true
    allOrders.value = []
    allReservations.value = []
  } finally {
    loading.value = false
  }
})
</script>
