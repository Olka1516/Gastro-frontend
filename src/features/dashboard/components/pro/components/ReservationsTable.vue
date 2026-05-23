<template>
  <div
    class="relative overflow-hidden rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] shadow-xl">
    <div class="overflow-x-auto transition-[padding] duration-200" :class="{ 'pb-40': rescheduleRow }">
      <table class="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr class="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
            <th class="px-5 py-4 font-semibold">{{ t('dashboard.reservations.colReceived') }}</th>
            <th class="px-5 py-4 font-semibold">{{ t('dashboard.reservations.colVisit') }}</th>
            <th class="px-5 py-4 font-semibold">{{ t('dashboard.reservations.colParty') }}</th>
            <th class="px-5 py-4 font-semibold">{{ t('dashboard.reservations.colGuest') }}</th>
            <th class="px-5 py-4 font-semibold">{{ t('dashboard.reservations.colContact') }}</th>
            <th class="px-5 py-4 font-semibold">{{ t('dashboard.reservations.colComment') }}</th>
            <th class="px-5 py-4 font-semibold">{{ t('dashboard.reservations.colStatus') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id"
            class="border-b border-white/5 text-gray-200 transition-colors hover:bg-white/[0.02]">
            <td class="px-5 py-4 text-gray-400">{{ formatReceivedAt(row.createdAt) }}</td>
            <td class="px-5 py-4 whitespace-nowrap">{{ row.visitDate }} · {{ row.visitTime }}</td>
            <td class="px-5 py-4">{{ row.partySize }}</td>
            <td class="px-5 py-4">{{ row.firstName }} {{ row.lastName }}</td>
            <td class="px-5 py-4">
              <div class="flex flex-col gap-0.5 text-xs">
                <span>{{ row.phone }}</span>
                <span class="text-gray-500">{{ row.email }}</span>
              </div>
            </td>
            <td class="max-w-[200px] px-5 py-4 text-gray-400 truncate" :title="row.comment || undefined">
              {{ row.comment || '—' }}
            </td>
            <td class="px-5 py-4">
              <BaseOrdersStatusFilter :model-value="statusModel(row)" :option-values="rowStatusOptionValues"
                option-label-key-prefix="dashboard.reservations.status" :id="'reservation-row-status-' + row.id"
                hide-label inline :aria-label="t('dashboard.reservations.colStatus')"
                @update:model-value="(v) => onStatusInput(row, v)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-full opacity-0">
      <div v-if="rescheduleRow"
        class="absolute inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0f0f11]/95 px-5 py-4 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
        role="region" :aria-label="t('dashboard.reservations.rescheduleHint')">
        <div class="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div class="min-w-0 flex-1 space-y-1">
            <p class="text-sm font-semibold text-white">
              {{ rescheduleRow.firstName }} {{ rescheduleRow.lastName }}
            </p>
            <p class="text-xs text-gray-500">
              {{ t('dashboard.reservations.rescheduleCurrentSlot') }}:
              {{ rescheduleRow.visitDate }} · {{ rescheduleRow.visitTime }}
            </p>
            <p class="text-xs text-gray-400">{{ t('dashboard.reservations.rescheduleHint') }}</p>
          </div>
          <div class="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[320px]">
            <div class="grid gap-3 sm:grid-cols-2 reserve-native-datetime">
              <label class="flex flex-col gap-1">
                <span class="text-[10px] uppercase tracking-wider text-gray-500">{{
                  t('dashboard.reservations.rescheduleNewDate')
                }}</span>
                <BaseText v-model="rescheduleDraft.visitDate" :v="rescheduleFieldV" type="reserveDate" input-type="date"
                  autocomplete="off" />
              </label>
              <label class="flex flex-col gap-1">
                <span class="text-[10px] uppercase tracking-wider text-gray-500">{{
                  t('dashboard.reservations.rescheduleNewTime')
                }}</span>
                <BaseText v-model="rescheduleDraft.visitTime" :v="rescheduleFieldV" type="reserveTime" input-type="time"
                  autocomplete="off" />
              </label>
            </div>
            <div class="flex flex-wrap gap-2">
              <BaseButton
                size="compact"
                :scale-on-hover="false"
                class="px-4 hover:opacity-90"
                :text="t('dashboard.reservations.rescheduleSave')"
                @click="confirmReschedule"
              />
              <button type="button"
                class="rounded-lg border border-[#2a2930] px-4 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-white/5"
                @click="cancelReschedule">
                {{ t('dashboard.reservations.rescheduleCancel') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseOrdersStatusFilter from '@/components/inputs/BaseOrdersStatusFilter.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import { notificationStore } from '@/stores/notificationStore'
import type { ITableReservation } from '@/types/tableReservation'
import { TABLE_RESERVATION_STATUSES } from '@/types/tableReservation'
import { formatReservationReceivedAt } from '@/utils/formatTableReservation'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  rows: ITableReservation[]
}>()

const emit = defineEmits<{
  (
    e: 'statusChange',
    row: ITableReservation,
    value: string,
    reschedule?: { visitDate: string; visitTime: string },
  ): void
}>()

const { t, locale } = useI18n()
const notify = notificationStore()

const rowStatusOptionValues = [...TABLE_RESERVATION_STATUSES] as string[]

const rescheduleFieldV = {
  $invalid: false,
  $dirty: false,
  $touch: () => { },
}

const rescheduleRowId = ref<string | null>(null)
const rescheduleDraft = reactive({ visitDate: '', visitTime: '' })

const rescheduleRow = computed(() =>
  rescheduleRowId.value ? props.rows.find((r) => r.id === rescheduleRowId.value) ?? null : null,
)

const formatReceivedAt = (iso: string) => formatReservationReceivedAt(iso, locale.value)

const statusModel = (row: ITableReservation) =>
  rescheduleRowId.value === row.id ? 'rescheduled' : row.status

const clearReschedule = () => {
  rescheduleRowId.value = null
  rescheduleDraft.visitDate = ''
  rescheduleDraft.visitTime = ''
}

const onStatusInput = (row: ITableReservation, value: string) => {
  if (value === 'rescheduled') {
    rescheduleRowId.value = row.id
    rescheduleDraft.visitDate = row.visitDate
    rescheduleDraft.visitTime = row.visitTime
    return
  }
  if (rescheduleRowId.value === row.id) {
    clearReschedule()
  }
  emit('statusChange', row, value)
}

const cancelReschedule = () => {
  clearReschedule()
}

const confirmReschedule = () => {
  const row = rescheduleRow.value
  if (!row) return
  if (!rescheduleDraft.visitDate?.trim() || !rescheduleDraft.visitTime?.trim()) {
    notify.sendError('dashboard.reservations.rescheduleValidation')
    return
  }
  emit('statusChange', row, 'rescheduled', {
    visitDate: rescheduleDraft.visitDate.trim(),
    visitTime: rescheduleDraft.visitTime.trim(),
  })
  clearReschedule()
}
</script>

<style scoped>
.reserve-native-datetime :deep(input[type='date']),
.reserve-native-datetime :deep(input[type='time']) {
  color-scheme: dark;
}
</style>
