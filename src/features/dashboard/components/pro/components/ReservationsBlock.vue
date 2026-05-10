<template>
  <div class="min-h-screen bg-[#0f0f11] p-12 flex flex-col gap-8">
    <div v-if="loading" class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <BaseLoader />
    </div>

    <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div class="flex flex-col gap-2">
        <h2 class="text-white text-4xl font-bold">{{ t('dashboard.reservations.title') }}</h2>
        <p class="text-gray-400 text-sm">{{ t('dashboard.reservations.subtitle') }}</p>
      </div>
      <BaseOrdersStatusFilter
        :model-value="reservationsStatusFilter"
        :option-values="reservationFilterOptionValues"
        option-label-key-prefix="dashboard.reservations.status"
        id="reservations-list-status-filter"
        @update:model-value="onReservationFilterChange"
      />
    </div>

    <div v-if="reservationsError"
      class="rounded-2xl border border-red-500/30 bg-red-500/5 px-6 py-4 text-sm text-red-300">
      {{ t('dashboard.reservations.loadError') }}
    </div>

    <div v-else-if="!loading && tableReservations.length === 0"
      class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-16 text-center shadow-xl">
      <div class="flex flex-col items-center gap-4">
        <div
          class="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dc5b41]/20 to-[#e66a4f]/10 text-4xl">
          📅
        </div>
        <h3 class="text-xl font-bold text-white">{{ t('dashboard.reservations.emptyTitle') }}</h3>
        <p class="max-w-md text-gray-400">{{ t('dashboard.reservations.emptyHint') }}</p>
      </div>
    </div>

    <ReservationsTable v-else :rows="tableReservations" @status-change="onRowStatusChange" />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import BaseOrdersStatusFilter from '@/components/inputs/BaseOrdersStatusFilter.vue'
import ReservationsTable from './ReservationsTable.vue'
import { usePremiumDashboardStore } from '@/stores/premiumDashboard'
import { notificationStore } from '@/stores/notificationStore'
import {
  TABLE_RESERVATION_STATUSES,
  type ITableReservation,
  type TableReservationStatus,
  type TableReservationStatusFilter,
} from '@/types/tableReservation'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const premiumStore = usePremiumDashboardStore()
const notify = notificationStore()
const { tableReservations, reservationsError, reservationsStatusFilter } = storeToRefs(premiumStore)

const loading = ref(true)

const reservationFilterOptionValues = [...TABLE_RESERVATION_STATUSES, 'all'] as string[]

const fetchReservations = async () => {
  loading.value = true
  await premiumStore.fetchTableReservations()
  loading.value = false
}

const onReservationFilterChange = async (value: string) => {
  loading.value = true
  await premiumStore.setReservationsStatusFilter(value as TableReservationStatusFilter)
  loading.value = false
}

const onRowStatusChange = async (
  row: ITableReservation,
  value: string,
  reschedule?: { visitDate: string; visitTime: string },
) => {
  const newStatus = value as TableReservationStatus
  const result = await premiumStore.updateTableReservationStatus(
    row.id,
    newStatus,
    newStatus === 'rescheduled' && reschedule
      ? { visitDate: reschedule.visitDate, visitTime: reschedule.visitTime }
      : undefined,
  )
  if (result.success) {
    notify.sendSuccess('dashboard.reservations.statusToast')
  } else {
    notify.sendError('dashboard.reservations.statusUpdateFailed')
  }
}

onMounted(fetchReservations)
</script>
