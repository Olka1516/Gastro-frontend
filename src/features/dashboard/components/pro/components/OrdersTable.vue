<template>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[1000px] border-collapse text-left text-sm">
      <thead>
        <tr class="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
          <th v-for="col in ORDER_TABLE_COLUMNS" :key="col.key" class="px-5 py-4 font-semibold" :class="col.thClass">
            {{ t(col.labelKey) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <OrderTableRow
          v-for="order in orders"
          :key="order.id"
          :order="order"
          @select="openOrder"
        />
      </tbody>
    </table>
    <OrderDetailModal v-if="selectedOrder" :order="selectedOrder" @close="selectedOrder = null" />
  </div>
</template>

<script setup lang="ts">
import { useShowcaseOrdersTable } from '@/features/dashboard/composables/useShowcaseOrdersTable'
import type { IShowcasePlacedOrder } from '@/types/showcaseOrder'
import { provide, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ORDER_TABLE_COLUMNS } from '@/features/dashboard/constants'
import { showcaseOrdersTableKey } from '@/features/dashboard/constants'
import OrderDetailModal from './OrderDetailModal.vue'
import OrderTableRow from './OrderTableRow.vue'

defineProps<{ orders: IShowcasePlacedOrder[] }>()

const { t } = useI18n()
const selectedOrder = ref<IShowcasePlacedOrder | null>(null)

const openOrder = (order: IShowcasePlacedOrder) => {
  selectedOrder.value = order
}

provide(showcaseOrdersTableKey, useShowcaseOrdersTable())
</script>
