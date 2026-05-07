<template>
  <div class="min-h-screen bg-[#0f0f11] p-12 flex flex-col gap-8">
    <div v-if="loading" class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <BaseLoader />
    </div>

    <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div class="flex flex-col gap-2">
        <h2 class="text-white text-4xl font-bold">{{ t('dashboard.orders.title') }}</h2>
        <p class="text-gray-400 text-sm">{{ t('dashboard.orders.subtitle') }}</p>
      </div>
      <BaseOrdersStatusFilter :model-value="ordersStatusFilter" @update:model-value="onStatusFilterChange" />
    </div>

    <div v-if="ordersError" class="rounded-2xl border border-red-500/30 bg-red-500/5 px-6 py-4 text-sm text-red-300">
      {{ t('dashboard.orders.loadError') }}
    </div>

    <div v-else-if="!loading && showcaseOrders.length === 0"
      class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-16 text-center shadow-xl">
      <div class="flex flex-col items-center gap-4">
        <div
          class="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dc5b41]/20 to-[#e66a4f]/10 text-4xl">
          📋
        </div>
        <h3 class="text-xl font-bold text-white">{{ t('dashboard.orders.emptyTitle') }}</h3>
        <p class="max-w-md text-gray-400">{{ t('dashboard.orders.emptyHint') }}</p>
      </div>
    </div>

    <div v-else
      class="overflow-hidden rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] shadow-xl">
      <OrdersTable :orders="sortedOrders" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import BaseOrdersStatusFilter from '@/components/inputs/BaseOrdersStatusFilter.vue'
import { sortShowcaseOrdersByDateDesc } from '@/features/dashboard/composables/useShowcaseOrdersTable'
import { usePremiumDashboardStore } from '@/stores/premiumDashboard'
import type { ShowcaseOrderStatusFilter } from '@/types/showcaseOrder'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import OrdersTable from './OrdersTable.vue'

const { t } = useI18n()
const premiumStore = usePremiumDashboardStore()
const { showcaseOrders, ordersError, ordersStatusFilter } = storeToRefs(premiumStore)

const loading = ref(true)

const sortedOrders = computed(() => sortShowcaseOrdersByDateDesc(showcaseOrders.value))

const fetchOrders = async () => {
  loading.value = true
  await premiumStore.fetchShowcaseOrders()
  loading.value = false
}

const onStatusFilterChange = async (value: string) => {
  loading.value = true
  await premiumStore.setOrdersStatusFilter(value as ShowcaseOrderStatusFilter)
  loading.value = false
}

onMounted(fetchOrders)
</script>

<style scoped></style>
