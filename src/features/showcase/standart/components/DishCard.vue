<template>
  <div
    class="dish-card bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-2xl border border-[#2a2930] overflow-hidden transition-all duration-300 hover:scale-[1.02] group shadow-lg cursor-pointer"
    :style="dishCardStyle" @click="handleClick">
    <div class="relative h-48 overflow-hidden">
      <img v-if="typeof dish.image === 'string'" :src="dish.image" :alt="dish.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent"></div>

      <button type="button" :class="[
        'absolute top-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 z-10',
        isLiked
          ? 'text-white'
          : 'bg-[#0f0f11]/70 border-white/20 text-white/80',
      ]" :style="likeButtonStyle" @click.stop="emit('toggleLike', dish.id)" aria-label="Like dish">
        <span class="text-lg leading-none">{{ isLiked ? '♥' : '♡' }}</span>
      </button>

      <div v-if="dish.isAvailable === 'unavailable'" class="absolute top-4 left-4">
        <span
          class="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg bg-red-500/20 text-red-300 border border-red-500/30">
          {{ t('dashboard.unavailable') }}
        </span>
      </div>

      <div class="absolute bottom-4 left-4">
        <div class="px-4 py-2 rounded-xl shadow-lg backdrop-blur-md" :style="priceBadgeStyle">
          <span class="text-white text-lg font-bold">${{ Number(dish.price || 0).toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <div class="p-5 flex flex-col gap-3">
      <h3 class="text-white text-xl font-bold line-clamp-1">{{ dish.name }}</h3>
      <p class="text-gray-400 text-sm line-clamp-2 leading-relaxed">
        {{ dish.description || t('dashboard.menu.noDescription') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDish } from '@/types/menu';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps<{
  dish: IDish
  isLiked: boolean
  menuIconColor: string
}>()

const emit = defineEmits<{
  (e: 'click', dish: IDish): void
  (e: 'toggleLike', dishId: string): void
}>()

const handleClick = () => {
  emit('click', props.dish)
}

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

const dishCardStyle = computed(() => ({
  '--menu-icon-color': props.menuIconColor || '#dc5b41',
  '--menu-icon-color-alpha-20': hexToRgba(props.menuIconColor || '#dc5b41', 0.2),
  '--menu-icon-color-alpha-50': hexToRgba(props.menuIconColor || '#dc5b41', 0.5),
}))

const likeButtonStyle = computed(() => ({
  backgroundColor: props.isLiked ? hexToRgba(props.menuIconColor || '#dc5b41', 0.9) : undefined,
  borderColor: props.isLiked ? props.menuIconColor || '#dc5b41' : undefined,
}))

const priceBadgeStyle = computed(() => ({
  background: `linear-gradient(to right, ${props.menuIconColor || '#dc5b41'}, ${hexToRgba(
    props.menuIconColor || '#dc5b41',
    0.85,
  )})`,
}))
</script>

<style scoped>
.dish-card:hover {
  border-color: var(--menu-icon-color-alpha-50);
  box-shadow: 0 20px 60px var(--menu-icon-color-alpha-20);
}
</style>
