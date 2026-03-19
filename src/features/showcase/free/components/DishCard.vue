<template>
  <div
    class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-2xl border border-[#2a2930] overflow-hidden hover:border-[#dc5b41]/50 transition-all duration-300 hover:scale-[1.02] group shadow-lg hover:shadow-[0_20px_60px_rgba(220,91,65,0.2)] cursor-pointer"
    @click="handleClick">
    <div class="relative h-48 overflow-hidden">
      <img v-if="typeof dish.image === 'string'" :src="dish.image" :alt="dish.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent"></div>

      <div v-if="dish.isAvailable === 'unavailable'" class="absolute top-4 right-4">
        <span
          class="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg bg-red-500/20 text-red-300 border border-red-500/30">
          {{ t('dashboard.unavailable') }}
        </span>
      </div>

      <div class="absolute bottom-4 left-4">
        <div class="bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-4 py-2 rounded-xl shadow-lg backdrop-blur-md">
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
import type { IDish } from '@/types/menu'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  dish: IDish
}>()

const emit = defineEmits<{
  (e: 'click', dish: IDish): void
}>()

const handleClick = () => {
  emit('click', props.dish)
}
</script>

<style scoped></style>
