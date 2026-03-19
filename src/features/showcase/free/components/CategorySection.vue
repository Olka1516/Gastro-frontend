<template>
  <section :id="category.id" class="scroll-mt-24">
    <div class="mb-8">
      <div class="flex items-center gap-4 mb-2">
        <div
          class="w-12 h-12 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-xl flex items-center justify-center shadow-lg">
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
      <div class="h-px bg-gradient-to-r from-[#dc5b41]/50 via-[#dc5b41]/30 to-transparent mt-4"></div>
    </div>

    <div v-if="categoryDishes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DishCard v-for="dish in categoryDishes" :key="dish.id" :dish="dish" @click="handleDishClick" />
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
}>()

const emit = defineEmits<{
  (e: 'dishClick', dish: IDish): void
}>()

const categoryDishes = computed(() => {
  return props.dishes.filter(
    (dish) => dish.category === props.category.id && dish.isAvailable === 'available',
  )
})

const handleDishClick = (dish: IDish) => {
  emit('dishClick', dish)
}
</script>

<style scoped></style>
