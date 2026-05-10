<template>
  <div :class="[
    'p-6 rounded-lg transition-all duration-300 group',
    baseClasses,
    hoverScale ? 'hover:scale-102' : '',
    clickable ? 'cursor-pointer' : 'cursor-default',
  ]" @click="onClick">
    <template v-if="showQuick">
      <div class="relative z-10 flex flex-col gap-2">
        <p v-if="quickTopText && showTopText" class="text-white/90 text-sm font-medium">
          {{ quickTopText }}
        </p>
        <h3 class="text-white text-2xl font-bold" v-if="quickHeading">
          {{ quickHeading }}
        </h3>
        <p v-if="quickDescription && showDescription" class="text-white/80 text-xs mt-2">
          {{ quickDescription }}
        </p>
      </div>
      <div v-if="variant === 'accent'"
        class="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
      <slot name="quick-extra" />
    </template>

    <template v-else>
      <div class="flex items-start justify-between">
        <div class="flex flex-col gap-2">
          <p v-if="title && showTitle" class="text-gray-400 text-sm">
            {{ title }}
          </p>
          <h3 v-if="value !== null && value !== undefined" class="text-white text-4xl font-bold">
            {{ value }}
          </h3>
          <div v-if="showAvailability" class="flex gap-2 text-xs mt-2">
            <span v-if="availableCount !== null && showAvailable" class="text-green-500">
              ✓ {{ availableCount }} {{ availableText }}
            </span>
            <span v-if="unavailableCount !== null && showUnavailable" class="text-gray-500">
              ✗ {{ unavailableCount }} {{ unavailableText }}
            </span>
          </div>
          <p v-if="subtitle && showSubtitle" class="text-gray-500 text-xs mt-2">
            {{ subtitle }}
          </p>
        </div>
        <div v-if="iconSrc" class="w-12 h-12 rounded-lg flex items-center justify-center" :class="iconWrapperClasses">
          <img :src="getImage(iconSrc)" :alt="iconAlt" class="w-6 h-6" :style="iconStyle" />
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

<style scoped></style>
