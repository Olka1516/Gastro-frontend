<template>
  <section
    v-if="items.length > 1"
    class="overflow-hidden rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11]"
    :aria-busy="saving">
    <button
      type="button"
      class="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-[#dc5b41]/5 sm:items-center sm:p-5"
      :aria-expanded="open"
      :aria-controls="panelId"
      @click="open = !open">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-base font-semibold text-white sm:text-lg">
            {{ t('dashboard.categories.orderTitle') }}
          </h3>
          <span v-if="!open" class="rounded-md bg-[#2a2930] px-2 py-0.5 text-xs text-gray-400">
            {{ t('dashboard.categories.orderCollapsedHint', { count: items.length }) }}
          </span>
          <span v-if="saving" class="text-xs text-gray-400">{{ t('dashboard.categories.orderSaving') }}</span>
        </div>
        <p v-if="open" class="mt-1 text-xs text-gray-400 sm:text-sm">
          {{ t('dashboard.categories.orderHint') }}
        </p>
      </div>
      <span class="mt-0.5 flex shrink-0 items-center gap-1.5 sm:mt-0">
        <span class="hidden text-xs font-medium text-gray-400 sm:inline">
          {{ open ? t('dashboard.categories.orderClose') : t('dashboard.categories.orderOpen') }}
        </span>
        <ChevronDownIcon
          class="h-5 w-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': open }"
          aria-hidden="true" />
      </span>
    </button>

    <div v-show="open" :id="panelId" class="border-t border-[#2a2930] px-4 pb-4 sm:px-5 sm:pb-5">
      <ul class="flex flex-col gap-2 pt-4" role="list">
        <li
          v-for="(category, index) in items"
          :key="category.id"
          class="flex items-center gap-3 rounded-lg border border-[#2a2930] bg-[#0f0f11]/60 px-3 py-2.5 sm:px-4">
          <span
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#2a2930] text-sm font-semibold text-gray-300"
            aria-hidden="true">
            {{ index + 1 }}
          </span>
          <span class="min-w-0 flex-1 truncate text-sm font-medium text-white sm:text-base">
            {{ category.name }}
          </span>
          <div class="flex shrink-0 items-center gap-1">
            <button
              type="button"
              class="rounded-lg bg-[#2a2930] p-2 text-white transition-colors hover:bg-[#dc5b41]/25 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="saving || index === 0"
              :aria-label="t('dashboard.categories.orderMoveUp')"
              @click="emit('move', { id: category.id, direction: 'up' })">
              <ChevronUpIcon class="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="rounded-lg bg-[#2a2930] p-2 text-white transition-colors hover:bg-[#dc5b41]/25 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="saving || index === items.length - 1"
              :aria-label="t('dashboard.categories.orderMoveDown')"
              @click="emit('move', { id: category.id, direction: 'down' })">
              <ChevronDownIcon class="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
import type { ICategory } from '@/types/menu'
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  items: ICategory[]
  saving?: boolean
}>()

const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  move: [{ id: string; direction: 'up' | 'down' }]
}>()

const { t } = useI18n()
const panelId = useId()
</script>
