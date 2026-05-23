<template>
  <div id="menu" class="min-h-screen bg-[#0f0f11] py-16 px-8 md:px-12 lg:px-24 pt-32">
    <div v-if="loading" class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <BaseLoader />
    </div>

    <div class="text-center mb-16">
      <h1 class="text-white text-5xl font-bold mb-4">
        {{ userInfo?.placeName || t('showcase.menu') }}
      </h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        {{ menuWelcomeText || t('showcase.welcomeDescription') }}
      </p>
    </div>

    <div v-if="!loading && categoriesWithDishes.length === 0"
      class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-3xl border border-[#2a2930] p-20 text-center">
      <div class="flex flex-col items-center gap-6">
        <div
          class="w-32 h-32 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-3xl flex items-center justify-center shadow-[0_20px_60px_rgb(220,91,65,0.3)]">
          <span class="text-6xl">🍽️</span>
        </div>
        <h3 class="text-white text-3xl font-bold">{{ t('showcase.noMenuAvailable') }}</h3>
        <p class="text-gray-400 text-base max-w-md">{{ t('showcase.menuComingSoon') }}</p>
      </div>
    </div>

    <template v-else>
      <ShowcaseCategoryTabs :categories="categoriesWithDishes" :active-id="activeCategoryId"
        @select="scrollToCategory" />

      <div class="space-y-20">
        <CategorySection v-for="category in categoriesWithDishes" :key="category.id"
          :ref="(el) => registerSection(category.id, el)" :category="category" :dishes="dishes"
          @dish-click="handleDishClick" />
      </div>
    </template>

    <DishDetailsModal :dish="selectedDish" :category-name="selectedDishCategoryName" @close="closeDishModal" />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import { useShowcaseCategoryScroll } from '@/features/showcase/composables/useShowcaseCategoryScroll'
import { useShowcasePlaceTheme } from '@/features/showcase/composables/useShowcasePlaceTheme'
import { useShowcaseStore } from '@/stores/showcaseStore'
import { useUserStore } from '@/stores/user'
import type { IDish } from '@/types/menu'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import DishDetailsModal from '../components/DishDetailsModal.vue'
import ShowcaseCategoryTabs from '../components/ShowcaseCategoryTabs.vue'
import CategorySection from './components/CategorySection.vue'

const { t } = useI18n()
const route = useRoute()
const userStore = useUserStore()
const showcaseStore = useShowcaseStore()

const loading = ref(true)
const dishes = ref<IDish[]>([])
const selectedDish = ref<IDish | null>(null)

const placeRouteKey = computed(() => String(route.params.id ?? ''))
const { menuWelcomeText } = useShowcasePlaceTheme(placeRouteKey)

const userInfo = computed(() => userStore.$state)
const selectedDishCategoryName = computed(() => {
  if (!selectedDish.value) return ''
  const category = showcaseStore.categories.find((item) => item.id === selectedDish.value?.category)
  return category?.name || selectedDish.value.category
})

const categoriesWithDishes = computed(() => {
  const availableDishes = dishes.value.filter((d) => d.isAvailable === 'available')

  return showcaseStore.categories
    .map((category) => ({
      ...category,
      dishCount: availableDishes.filter((d) => d.category === category.id).length,
    }))
    .filter((category) => category.dishCount > 0)
    .sort((a, b) => b.dishCount - a.dishCount)
})

const { activeCategoryId, registerSection, scrollToCategory, start } =
  useShowcaseCategoryScroll(categoriesWithDishes)

const handleDishClick = (dish: IDish) => {
  selectedDish.value = dish
  document.body.style.overflow = 'hidden'
}

const closeDishModal = () => {
  selectedDish.value = null
  document.body.style.overflow = ''
}

const fetchData = async () => {
  loading.value = true
  const placeName = route.params.id as string
  try {
    await Promise.all([
      showcaseStore.fetchDishes(placeName),
      showcaseStore.fetchCategories(placeName),
      showcaseStore.fetchPlaceBranding(placeName),
    ])
    dishes.value = showcaseStore.dishes
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchData()
  await start()
})
</script>
