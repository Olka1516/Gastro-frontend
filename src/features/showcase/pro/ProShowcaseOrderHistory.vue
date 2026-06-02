<template>
  <section id="orders" class="min-h-[55vh] scroll-mt-28 bg-[#0f0f11] px-6 pb-24 pt-28 md:px-12 md:pt-32 lg:px-24">
    <div class="mx-auto max-w-4xl">
      <h2 class="text-2xl font-bold tracking-tight text-white md:text-3xl">
        {{ t('showcase.premium.orderHistoryTitle') }}
      </h2>
      <p class="mt-2 max-w-2xl text-gray-400">
        {{ t('showcase.premium.orderHistoryHint') }}
      </p>

      <ul v-if="entries.length" class="mt-10 flex flex-col gap-4">
        <ProShowcaseOrderHistoryCard v-for="entry in entries" :key="entry.id" :entry="entry" />
      </ul>

      <div v-else class="mt-10 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center">
        <p class="text-gray-500">{{ t('showcase.premium.orderHistoryEmpty') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IShowcaseLocalOrderHistoryEntry } from '@/types/showcaseOrder'
import {
  SHOWCASE_ORDER_HISTORY_STORAGE_PREFIX,
  SHOWCASE_ORDER_HISTORY_UPDATED_EVENT,
  placeSlugFromShowcaseRoute,
  readShowcaseOrderHistory,
} from '@/utils/showcaseOrderHistoryStorage'
import ProShowcaseOrderHistoryCard from './ProShowcaseOrderHistoryCard.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

const entries = ref<IShowcaseLocalOrderHistoryEntry[]>([])

const load = () => {
  entries.value = readShowcaseOrderHistory(placeSlugFromShowcaseRoute(route))
}

const onHistoryUpdated = () => {
  load()
}

const onStorage = (ev: StorageEvent) => {
  if (!ev.key?.startsWith(SHOWCASE_ORDER_HISTORY_STORAGE_PREFIX)) return
  load()
}

onMounted(() => {
  load()
  window.addEventListener(SHOWCASE_ORDER_HISTORY_UPDATED_EVENT, onHistoryUpdated)
  window.addEventListener('storage', onStorage)
})

onUnmounted(() => {
  window.removeEventListener(SHOWCASE_ORDER_HISTORY_UPDATED_EVENT, onHistoryUpdated)
  window.removeEventListener('storage', onStorage)
})

watch(
  () => [route.params.id, route.path] as const,
  () => load(),
)
</script>
