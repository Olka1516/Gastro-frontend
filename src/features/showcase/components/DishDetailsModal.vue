<template>
  <Teleport to="body">
    <Transition name="dish-modal">
      <div v-if="dish" class="fixed inset-0 z-[1100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        @click="emit('close')">
        <div
          class="w-full max-w-2xl bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-3xl border border-[#2a2930] overflow-hidden shadow-2xl"
          @click.stop>
          <div class="relative h-64 bg-[#111]">
            <img v-if="typeof dish.image === 'string'" :src="dish.image" :alt="dish.name"
              class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent"></div>
            <button type="button"
              class="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all"
              aria-label="Close modal" @click="emit('close')">
              ✕
            </button>
          </div>

          <div class="p-6 md:p-8">
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-white text-2xl md:text-3xl font-bold">{{ dish.name }}</h3>
              <span class="px-4 py-2 rounded-xl text-white font-bold" :style="priceBadgeStyle">
                ${{ Number(dish.price || 0).toFixed(2) }}
              </span>
            </div>

            <p class="text-gray-300 mt-4 leading-relaxed">
              {{ dish.description || t('dashboard.menu.noDescription') }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-3">
              <span class="px-3 py-1.5 rounded-full border border-[#2a2930] text-gray-300 text-sm">
                {{ categoryName }}
              </span>
              <span :class="[
                'px-3 py-1.5 rounded-full text-sm border',
                dish.isAvailable === 'available'
                  ? 'text-green-300 border-green-500/40 bg-green-500/10'
                  : 'text-red-300 border-red-500/40 bg-red-500/10',
              ]">
                {{ dish.isAvailable === 'available' ? t('dashboard.available') : t('dashboard.unavailable') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { IDish } from '@/types/menu';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = withDefaults(
  defineProps<{
    dish: IDish | null
    categoryName: string
    menuIconColor?: string
  }>(),
  {
    menuIconColor: '#dc5b41',
  },
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { t } = useI18n()

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '')
  const fullHex =
    normalized.length === 3
      ? normalized
        .split('')
        .map((char) => char + char)
        .join('')
      : normalized

  const isHex = /^[0-9a-f]{6}$/i.test(fullHex)
  if (!isHex) return `rgba(220, 91, 65, ${alpha})`

  const r = parseInt(fullHex.slice(0, 2), 16)
  const g = parseInt(fullHex.slice(2, 4), 16)
  const b = parseInt(fullHex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const priceBadgeStyle = computed(() => ({
  background: `linear-gradient(to right, ${props.menuIconColor}, ${hexToRgba(props.menuIconColor, 0.85)})`,
}))
</script>

<style scoped>
.dish-modal-enter-active,
.dish-modal-leave-active {
  transition: opacity 0.2s ease;
}

.dish-modal-enter-from,
.dish-modal-leave-to {
  opacity: 0;
}
</style>
