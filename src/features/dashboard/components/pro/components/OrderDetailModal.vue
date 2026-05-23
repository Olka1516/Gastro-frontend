<template>
  <Teleport to="body">
    <Transition name="order-modal">
      <div
        v-if="order"
        class="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click="emit('close')"
      >
        <div
          class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] shadow-2xl"
          @click.stop
        >
          <div class="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
            <div>
              <h3 class="text-lg font-bold text-white">{{ t('dashboard.orders.modalTitle') }}</h3>
              <p class="mt-1 text-sm text-gray-400">
                {{ formatOrderDate(order.createdAt) }} · {{ formatCustomerName(order) }}
              </p>
            </div>
            <button
              type="button"
              class="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/15"
              aria-label="Close"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>

          <div class="space-y-5 px-6 py-5">
            <div>
              <p class="text-xs font-medium uppercase tracking-wider text-gray-400">
                {{ t('dashboard.orders.colStatus') }}
              </p>
              <p class="mt-2">
                <span
                  :class="[
                    'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                    statusBadgeClass(order.status),
                  ]"
                >
                  {{ t(`dashboard.orders.status.${order.status}`) }}
                </span>
              </p>
            </div>

            <div class="grid gap-3 text-sm text-gray-300">
              <p>
                <span class="text-gray-500">{{ t('dashboard.orders.colContact') }}:</span>
                {{ order.customer?.phone || '—' }}
                <span v-if="order.customer?.email" class="mt-1 block text-xs text-gray-500">
                  {{ order.customer.email }}
                </span>
              </p>
              <p>
                <span class="text-gray-500">{{ t('dashboard.orders.colAddress') }}:</span>
                {{ order.customer?.address || '—' }}
              </p>
              <p>
                <span class="text-gray-500">{{ t('dashboard.orders.colItems') }}:</span>
                {{ formatLinesSummary(order.lines) }}
              </p>
              <p v-if="order.customer?.comment" class="text-xs italic text-gray-500">
                {{ order.customer.comment }}
              </p>
              <p class="text-right font-semibold text-white">
                {{ t('dashboard.orders.colTotal') }}:
                {{ formatMenuPrice(Number(order.total), currency, numberLocale) }}
              </p>
            </div>

            <BaseOrdersStatusFilter
              :id="'order-detail-status'"
              v-model="draftStatus"
              :label-key="'dashboard.orders.changeStatus'"
              :option-values="statusOptions"
            />

            <div class="flex flex-wrap justify-end gap-3 pt-2">
              <button
                type="button"
                class="rounded-lg border border-[#2a2930] px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5"
                :disabled="saving"
                @click="emit('close')"
              >
                {{ t('dashboard.orders.modalCancel') }}
              </button>
              <BaseButton
                size="compact"
                :scale-on-hover="false"
                class="px-4 hover:opacity-90 disabled:opacity-50"
                :disabled="saving || draftStatus === order.status"
                :text="saving ? t('dashboard.orders.modalSaving') : t('dashboard.orders.modalSave')"
                @click="onSave"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseOrdersStatusFilter from '@/components/inputs/BaseOrdersStatusFilter.vue'
import { useDashboardCurrency } from '@/features/dashboard/composables/useDashboardCurrency'
import { useShowcaseOrdersTable } from '@/features/dashboard/composables/useShowcaseOrdersTable'
import { formatMenuPrice } from '@/utils/formatPrice'
import { usePremiumDashboardStore } from '@/stores/premiumDashboard'
import { notificationStore } from '@/stores/notificationStore'
import { SHOWCASE_ORDER_STATUSES, type IShowcasePlacedOrder, type ShowcaseOrderStatus } from '@/types/showcaseOrder'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ order: IShowcasePlacedOrder }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { t } = useI18n()
const { formatOrderDate, formatCustomerName, formatLinesSummary, statusBadgeClass } =
  useShowcaseOrdersTable()
const { currency, numberLocale } = useDashboardCurrency()
const premiumStore = usePremiumDashboardStore()
const notify = notificationStore()

const statusOptions = [...SHOWCASE_ORDER_STATUSES]
const draftStatus = ref<ShowcaseOrderStatus>(props.order.status)
const saving = ref(false)

watch(
  () => props.order,
  (o) => {
    draftStatus.value = o.status
  },
  { deep: true },
)

const onSave = async () => {
  if (draftStatus.value === props.order.status) return
  saving.value = true
  const result = await premiumStore.updateShowcaseOrderStatus(props.order.id, draftStatus.value)
  saving.value = false
  if (result.success) {
    notify.sendSuccess('dashboard.orders.statusUpdated')
    emit('close')
  } else {
    notify.sendError('dashboard.orders.statusUpdateFailed')
  }
}
</script>

<style scoped>
.order-modal-enter-active,
.order-modal-leave-active {
  transition: opacity 0.2s ease;
}

.order-modal-enter-from,
.order-modal-leave-to {
  opacity: 0;
}
</style>
