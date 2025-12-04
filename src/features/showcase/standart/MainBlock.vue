<template>
  <div id="menu" class="min-h-screen bg-[#0f0f11] py-16 px-8 md:px-12 lg:px-24 pt-32">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <BaseLoader />
    </div>

    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-white text-5xl font-bold mb-4">
        {{ userInfo?.placeName || t('showcase.menu') }}
      </h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        {{ t('showcase.welcomeDescription') }}
      </p>
    </div>

    <!-- Empty State -->
    <div
      v-if="!loading && categoriesWithDishes.length === 0"
      class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-3xl border border-[#2a2930] p-20 text-center"
    >
      <div class="flex flex-col items-center gap-6">
        <div
          class="w-32 h-32 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-3xl flex items-center justify-center shadow-[0_20px_60px_rgb(220,91,65,0.3)]"
        >
          <span class="text-6xl">🍽️</span>
        </div>
        <h3 class="text-white text-3xl font-bold">{{ t('showcase.noMenuAvailable') }}</h3>
        <p class="text-gray-400 text-base max-w-md">{{ t('showcase.menuComingSoon') }}</p>
      </div>
    </div>

    <!-- Categories Sections -->
    <div v-else class="space-y-20">
      <CategorySection
        v-for="category in categoriesWithDishes"
        :key="category.id"
        :category="category"
        :dishes="dishes"
        @dish-click="handleDishClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import { useStandartDashboardStore } from '@/stores/standartDashboard'
import { useUserStore } from '@/stores/user'
import type { IDish } from '@/types/menu'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CategorySection from './components/CategorySection.vue'

const { t } = useI18n()
const userStore = useUserStore()
const standartDashboardStore = useStandartDashboardStore()
const categoriesDashboardStore = useCategoriesDashboardStore()

const loading = ref(true)
const dishes = ref<IDish[]>([])

const userInfo = computed(() => userStore.$state)

const categoriesWithDishes = computed(() => {
  const availableDishes = dishes.value.filter((d) => d.isAvailable === 'available')

  return categoriesDashboardStore.categories
    .map((category) => ({
      ...category,
      dishCount: availableDishes.filter((d) => d.category === category.id).length,
    }))
    .filter((category) => category.dishCount > 0)
    .sort((a, b) => b.dishCount - a.dishCount)
})

const handleDishClick = (dish: IDish) => {
  // Here you can add modal or navigation logic for dish details
  console.log('Dish clicked:', dish)
}

const fetchData = async () => {
  loading.value = true
  try {
    await Promise.all([
      standartDashboardStore.fetchDishes(),
      categoriesDashboardStore.fetchCategories(),
    ])
    dishes.value = standartDashboardStore.dishes
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchData()
})
</script>

<style scoped></style>
