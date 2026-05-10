<template>
  <div class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-6 sm:p-8 shadow-xl flex flex-col gap-4">
    <div>
      <h3 class="text-white text-xl font-bold">{{ t('dashboard.analytics.chart.title') }}</h3>
      <p class="text-gray-500 text-sm mt-1">{{ t('dashboard.analytics.chart.subtitle') }}</p>
    </div>

    <div v-if="!items.length"
      class="flex flex-col items-center justify-center gap-3 py-16 text-center text-gray-500 text-sm">
      <span class="text-4xl opacity-60" aria-hidden="true">📊</span>
      <p>{{ t('dashboard.analytics.chart.empty') }}</p>
    </div>

    <div v-else class="relative w-full min-h-[280px] h-[min(32rem,calc(2.25rem*var(--bar-rows,8)))]"
      :style="{ '--bar-rows': String(Math.max(items.length, 4)) }">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DishOrderPopularity } from '@/features/dashboard/composables/useAnalyticsPeriodStats'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { useI18n } from 'vue-i18n'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<{
  items: DishOrderPopularity[]
}>()

const { t } = useI18n()

function truncateLabel(name: string, max = 36) {
  const s = name.trim()
  if (s.length <= max) return s
  return `${s.slice(0, max - 1)}…`
}

const chartData = computed(() => ({
  labels: props.items.map((i) => truncateLabel(i.name)),
  datasets: [
    {
      label: t('dashboard.analytics.chart.datasetLabel'),
      data: props.items.map((i) => i.orderCount),
      backgroundColor: 'rgba(220, 91, 65, 0.72)',
      borderColor: 'rgba(220, 91, 65, 1)',
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
}))

const chartOptions = computed(() => ({
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15, 15, 17, 0.95)',
      titleColor: '#f3f4f6',
      bodyColor: '#d1d5db',
      borderColor: 'rgba(220, 91, 65, 0.35)',
      borderWidth: 1,
      callbacks: {
        label: (ctx: { parsed?: { x?: number } }) => {
          const n = ctx.parsed?.x ?? 0
          return t('dashboard.analytics.chart.tooltipLine', { count: n })
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: { color: 'rgba(255,255,255,0.06)' },
      ticks: {
        color: '#9ca3af',
        stepSize: 1,
        precision: 0,
      },
      title: {
        display: true,
        text: t('dashboard.analytics.chart.xAxis'),
        color: '#6b7280',
        font: { size: 11 },
      },
    },
    y: {
      grid: { display: false },
      ticks: {
        color: '#e5e7eb',
        font: { size: 11 },
        autoSkip: false,
      },
    },
  },
}))
</script>

<style scoped></style>
