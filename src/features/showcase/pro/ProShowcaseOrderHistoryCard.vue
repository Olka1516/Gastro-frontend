<template>
  <li
    class="rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.35)] sm:p-6"
  >
    <div class="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
      <div>
        <p class="text-sm text-gray-500">{{ t('showcase.premium.orderHistoryPlacedAt') }}</p>
        <p class="mt-1 font-medium text-white">{{ placedAtLabel }}</p>
      </div>
      <p class="text-lg font-bold text-white">{{ formatPrice(Number(entry.total)) }}</p>
    </div>
    <ul class="mt-4 flex flex-col gap-2 text-sm text-gray-300">
      <li v-for="(line, idx) in entry.lines" :key="idx" class="flex justify-between gap-4">
        <span class="min-w-0">
          <span class="text-white">{{ line.name }}</span>
          <span v-if="line.categoryName" class="ml-2 text-xs text-gray-500">
            {{ line.categoryName }}
          </span>
        </span>
        <span class="shrink-0 text-gray-400">
          {{ line.quantity }} × {{ formatPrice(Number(line.unitPrice)) }}
        </span>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { useShowcasePlaceTheme } from '@/features/showcase/composables/useShowcasePlaceTheme'
import type { IShowcaseLocalOrderHistoryEntry } from '@/types/showcaseOrder'
import { computed } from 'vue'
import { intlLocaleForUi } from '@/lang'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const props = defineProps<{ entry: IShowcaseLocalOrderHistoryEntry }>()

const route = useRoute()
const { t, locale } = useI18n()
const { formatPrice } = useShowcasePlaceTheme(() => String(route.params.id ?? ''))

const placedAtLabel = computed(() => {
  const iso = props.entry.placedAt
  const d = Date.parse(iso)
  if (Number.isNaN(d)) return iso
  return new Intl.DateTimeFormat(intlLocaleForUi(locale.value), {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d)
})
</script>
