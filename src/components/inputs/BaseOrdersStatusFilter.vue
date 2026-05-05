<template>
  <div class="flex w-full flex-col gap-1.5 sm:w-auto sm:min-w-[220px]">
    <label class="text-xs font-medium uppercase tracking-wider text-gray-400" :for="inputId">
      {{ t(labelKey) }}
    </label>
    <div class="group relative">
      <select
        :id="inputId"
        :value="modelValue"
        class="w-full cursor-pointer appearance-none rounded-lg border border-[#2a2930] bg-[#1a191f] py-2.5 pl-3 pr-11 text-sm text-white shadow-inner focus:border-[#dc5b41] focus:outline-none focus:ring-1 focus:ring-[#dc5b41]/40"
        @change="onChange"
      >
        <option v-for="opt in resolvedOptions" :key="opt" :value="opt">
          {{ t(`${optionLabelKeyPrefix}.${opt}`) }}
        </option>
      </select>
      <span
        class="pointer-events-none absolute inset-y-0 right-3 flex w-4 items-center justify-center"
        aria-hidden="true"
      >
        <img
          src="@/assets/images/icons/arrow-down.svg"
          alt=""
          class="h-4 w-4 shrink-0 origin-center opacity-80 transition-transform duration-300 ease-out group-focus-within:rotate-180"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SHOWCASE_ORDER_STATUSES,
  type ShowcaseOrderStatusFilter,
} from '@/types/showcaseOrder';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    modelValue: ShowcaseOrderStatusFilter
    labelKey?: string
    optionLabelKeyPrefix?: string
    id?: string
    optionValues?: ShowcaseOrderStatusFilter[]
  }>(),
  {
    labelKey: 'dashboard.orders.filterStatus',
    optionLabelKeyPrefix: 'dashboard.orders.status',
    id: undefined,
    optionValues: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: ShowcaseOrderStatusFilter): void
}>()

const inputId = computed(() => props.id ?? 'orders-status-filter')

const resolvedOptions = computed((): ShowcaseOrderStatusFilter[] => {
  if (props.optionValues?.length) return props.optionValues
  return [...SHOWCASE_ORDER_STATUSES, 'all']
})

const onChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value as ShowcaseOrderStatusFilter
  emit('update:modelValue', value)
}
</script>
