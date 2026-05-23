<template>
  <div
    :class="[
      'group rounded-lg p-4 transition-all duration-300 sm:p-5 md:p-6',
      baseClasses,
      hoverScale ? 'hover:scale-[1.02] sm:hover:scale-102' : '',
      clickable ? 'cursor-pointer' : 'cursor-default',
    ]"
    @click="onClick">
    <template v-if="showQuick">
      <div class="relative z-10 flex flex-col gap-2">
        <p v-if="quickTopText && showTopText" class="text-sm font-medium text-white/90">
          {{ quickTopText }}
        </p>
        <h3 v-if="quickHeading" class="text-xl font-bold text-white sm:text-2xl">
          {{ quickHeading }}
        </h3>
        <p v-if="quickDescription && showDescription" class="mt-2 text-xs text-white/80 sm:text-sm">
          {{ quickDescription }}
        </p>
      </div>
      <div
        v-if="variant === 'accent'"
        class="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150 sm:h-32 sm:w-32" />
      <slot name="quick-extra" />
    </template>

    <template v-else>
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0 flex flex-col gap-2">
          <p v-if="title && showTitle" class="text-sm text-gray-400">
            {{ title }}
          </p>
          <h3
            v-if="value !== null && value !== undefined"
            class="text-3xl font-bold tabular-nums text-white sm:text-4xl">
            {{ value }}
          </h3>
          <div
            v-if="showAvailability"
            class="mt-2 flex flex-col gap-1 text-xs sm:flex-row sm:flex-wrap sm:gap-2">
            <span v-if="availableCount !== null && showAvailable" class="text-green-500">
              ✓ {{ availableCount }} {{ availableText }}
            </span>
            <span v-if="unavailableCount !== null && showUnavailable" class="text-gray-500">
              ✗ {{ unavailableCount }} {{ unavailableText }}
            </span>
          </div>
          <p v-if="subtitle && showSubtitle" class="mt-2 text-xs text-gray-500">
            {{ subtitle }}
          </p>
        </div>
        <div
          v-if="iconSrc"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12"
          :class="iconWrapperClasses">
          <img :src="getImage(iconSrc)" :alt="iconAlt" class="h-5 w-5 sm:h-6 sm:w-6" :style="iconStyle" />
        </div>
      </div>
      <slot />
    </template>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '@/common/functions';
import type { DashboardCardBind } from '@/features/dashboard/types';
import { computed } from 'vue';

const emit = defineEmits<{
  (e: 'click'): void
}>()

const props = withDefaults(defineProps<DashboardCardBind>(), {
  variant: 'dark',
  clickable: false,
  hoverScale: true,
  value: null,
  iconAlt: '',
  invertIcon: true,
  showAvailability: false,
  availableCount: null,
  unavailableCount: null,
  availableText: '',
  unavailableText: '',
  showTitle: true,
  showSubtitle: true,
  showTopText: true,
  showDescription: true,
  showAvailable: true,
  showUnavailable: true,
  showQuick: false,
})

const baseClasses = computed(() => {
  if (props.variant === 'accent') {
    return 'relative overflow-hidden bg-gradient-to-br from-[#dc5b41] to-[#e66a4f]'
  }
  return 'bg-gradient-to-br from-[#1a191f] to-[#0f0f11] border border-[#2a2930] hover:border-[#dc5b41]/50'
})

const iconWrapperClasses = computed(() => {
  return 'bg-gradient-to-br from-[#dc5b41] to-[#e66a4f]'
})

const iconStyle = computed(() => {
  return props.invertIcon ? 'filter: brightness(0) invert(1)' : ''
})

function onClick() {
  if (props.clickable) emit('click')
}
</script>
