<template>
  <section :id="category.id" class="scroll-mt-24">
    <div class="mb-8">
      <div class="flex items-center gap-4 mb-2">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" :style="iconBadgeStyle">
          <img src="@/assets/images/icons/category.svg" alt="category" class="w-6 h-6"
            style="filter: brightness(0) invert(1)" />
        </div>
        <div>
          <h2 class="text-white text-3xl font-bold">{{ category.name }}</h2>
          <p v-if="category.description" class="text-gray-400 text-sm mt-1">
            {{ category.description }}
          </p>
        </div>
      </div>
      <div class="h-px mt-4" :style="separatorStyle"></div>
    </div>

    <div v-if="categoryDishes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DishCard
        v-for="dish in categoryDishes"
        :key="dish.id"
        :dish="dish"
        :is-liked="likedDishIds.includes(dish.id)"
        :menu-icon-color="menuIconColor"
        @click="handleDishClick"
        @toggle-like="handleToggleLike"
      />
    </div>

    <div v-else
      class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-2xl border border-[#2a2930] p-12 text-center">
      <p class="text-gray-400 text-lg">{{ t('showcase.noDishesInCategory') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ICategory, IDish } from '@/types/menu'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DishCard from './DishCard.vue'

const { t } = useI18n()

const props = defineProps<{
  category: ICategory
  dishes: IDish[]
  likedDishIds: string[]
  menuIconColor: string
}>()

const emit = defineEmits<{
  (e: 'dishClick', dish: IDish): void
  (e: 'toggleLike', dishId: string): void
}>()

const categoryDishes = computed(() => {
  return props.dishes.filter(
    (dish) => dish.category === props.category.id && dish.isAvailable === 'available',
  )
})

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

const iconBadgeStyle = computed(() => ({
  backgroundColor: props.menuIconColor || '#dc5b41',
}))

const separatorStyle = computed(() => ({
  background: `linear-gradient(to right, ${hexToRgba(props.menuIconColor || '#dc5b41', 0.5)}, ${hexToRgba(
    props.menuIconColor || '#dc5b41',
    0.3,
  )}, transparent)`,
}))

const handleDishClick = (dish: IDish) => {
  emit('dishClick', dish)
}

const handleToggleLike = (dishId: string) => {
  emit('toggleLike', dishId)
}
</script>

<style scoped></style>
