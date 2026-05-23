<template>
  <tr
    class="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.03] last:border-0"
    tabindex="0"
    role="button"
    @click="emit('select', order)"
    @keydown.enter.prevent="emit('select', order)"
    @keydown.space.prevent="emit('select', order)"
  >
    <td class="whitespace-nowrap px-5 py-4 text-gray-300">
      {{ formatOrderDate(order.createdAt) }}
    </td>
    <td class="whitespace-nowrap px-5 py-4">
      <span :class="[
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
        statusBadgeClass(order.status),
      ]">
        {{ t(`dashboard.orders.status.${order.status}`) }}
      </span>
    </td>
    <td class="px-5 py-4 text-white">
      <span class="font-medium">{{ formatCustomerName(order) }}</span>
    </td>
    <td class="max-w-[200px] px-5 py-4 text-gray-300">
      <div class="break-words">{{ order.customer?.phone || '—' }}</div>
      <div v-if="order.customer?.email" class="mt-1 break-all text-xs text-gray-500">
        {{ order.customer.email }}
      </div>
    </td>
    <td class="max-w-[220px] px-5 py-4 text-gray-300">
      <p class="line-clamp-2">{{ order.customer?.address || '—' }}</p>
      <p v-if="order.customer?.deliveryTime" class="mt-1 text-xs text-gray-500">
        {{ order.customer.deliveryTime }}
      </p>
    </td>
    <td class="max-w-[280px] px-5 py-4 text-gray-300">
      <p class="line-clamp-3">{{ formatLinesSummary(order.lines) }}</p>
      <p v-if="order.customer?.comment" class="mt-2 text-xs italic text-gray-500">
        {{ order.customer.comment }}
      </p>
    </td>
    <td class="whitespace-nowrap px-5 py-4 text-right font-semibold text-white">
      {{ formatMenuPrice(Number(order.total), currency, numberLocale) }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { showcaseOrdersTableKey } from '@/features/dashboard/constants'
import { useDashboardCurrency } from '@/features/dashboard/composables/useDashboardCurrency'
import type { IShowcasePlacedOrder } from '@/types/showcaseOrder'
import { formatMenuPrice } from '@/utils/formatPrice'
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{ order: IShowcasePlacedOrder }>()

const emit = defineEmits<{
  (e: 'select', order: IShowcasePlacedOrder): void
}>()

const { t } = useI18n()
const { currency, numberLocale } = useDashboardCurrency()
const { formatOrderDate, formatCustomerName, formatLinesSummary, statusBadgeClass } =
  inject(showcaseOrdersTableKey)!
</script>
