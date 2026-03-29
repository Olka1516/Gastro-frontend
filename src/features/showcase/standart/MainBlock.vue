<template>
  <div id="menu" class="min-h-screen py-16 px-8 md:px-12 lg:px-24 pt-32" :style="pageStyle">
    <div v-if="loading" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
      :style="loadingStyle">
      <BaseLoader />
    </div>

    <div class="text-center mb-16">
      <h1 class="text-white text-5xl font-bold mb-4">
        {{ userInfo?.placeName || t('showcase.menu') }}
      </h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        {{ t('showcase.welcomeDescription') }}
      </p>
    </div>

    <div v-if="!loading && categoriesWithDishes.length === 0"
      class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-3xl border border-[#2a2930] p-20 text-center">
      <div class="flex flex-col items-center gap-6">
        <div class="w-32 h-32 rounded-3xl flex items-center justify-center" :style="iconBadgeStyle">
          <span class="text-6xl">🍽️</span>
        </div>
        <h3 class="text-white text-3xl font-bold">{{ t('showcase.noMenuAvailable') }}</h3>
        <p class="text-gray-400 text-base max-w-md">{{ t('showcase.menuComingSoon') }}</p>
      </div>
    </div>

    <div v-else class="space-y-20">
      <CategorySection v-for="category in categoriesWithDishes" :key="category.id" :category="category" :dishes="dishes"
        :liked-dish-ids="likedDishIds" :menu-icon-color="menuIconColor" @dish-click="handleDishClick"
        @toggle-like="handleToggleLike" />
    </div>

    <DishDetailsModal :dish="selectedDish" :category-name="selectedDishCategoryName" :menu-icon-color="menuIconColor"
      @close="closeDishModal" />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import { useShowcaseStore } from '@/stores/showcaseStore'
import { useUserStore } from '@/stores/user'
import type { IDish } from '@/types/menu'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import DishDetailsModal from '../components/DishDetailsModal.vue'
import CategorySection from './components/CategorySection.vue'

const { t } = useI18n()
const route = useRoute()
const userStore = useUserStore()
const showcaseStore = useShowcaseStore()
const DEFAULT_MENU_BG_COLOR = '#0f0f11'
const DEFAULT_MENU_ICON_COLOR = '#dc5b41'

const loading = ref(true)
const dishes = ref<IDish[]>([])
const likedDishIds = ref<string[]>([])
const selectedDish = ref<IDish | null>(null)

const userInfo = computed(() => userStore.$state)
const menuBackgroundColor = computed(() => userStore.menuBackgroundColor || DEFAULT_MENU_BG_COLOR)
const menuIconColor = computed(() => userStore.menuIconColor || DEFAULT_MENU_ICON_COLOR)

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
  if (!isHex) {
    return `rgba(15, 15, 17, ${alpha})`
  }

  const r = parseInt(fullHex.slice(0, 2), 16)
  const g = parseInt(fullHex.slice(2, 4), 16)
  const b = parseInt(fullHex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const pageStyle = computed(() => ({
  backgroundColor: menuBackgroundColor.value,
}))

const loadingStyle = computed(() => ({
  backgroundColor: hexToRgba(menuBackgroundColor.value, 0.8),
}))

const iconBadgeStyle = computed(() => ({
  backgroundColor: menuIconColor.value,
  boxShadow: `0 20px 60px ${hexToRgba(menuIconColor.value, 0.3)}`,
}))
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

const handleDishClick = (dish: IDish) => {
  selectedDish.value = dish
  document.body.style.overflow = 'hidden'
}

const closeDishModal = () => {
  selectedDish.value = null
  document.body.style.overflow = ''
}

const likesStorageKey = computed(() => `showcase-likes:${String(route.params.id || '')}`)

const loadLikedDishes = () => {
  const raw = localStorage.getItem(likesStorageKey.value)
  if (!raw) {
    likedDishIds.value = []
    return
  }

  try {
    const parsed = JSON.parse(raw)
    likedDishIds.value = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    likedDishIds.value = []
  }
}

const saveLikedDishes = () => {
  localStorage.setItem(likesStorageKey.value, JSON.stringify(likedDishIds.value))
}

const handleToggleLike = (dishId: string) => {
  const isLiked = likedDishIds.value.includes(dishId)
  likedDishIds.value = isLiked
    ? likedDishIds.value.filter((id) => id !== dishId)
    : [...likedDishIds.value, dishId]
  saveLikedDishes()
}

const fetchData = async () => {
  loading.value = true
  const placeName = route.params.id as string
  try {
    await Promise.all([
      showcaseStore.fetchDishes(placeName),
      showcaseStore.fetchCategories(placeName),
    ])
    dishes.value = showcaseStore.dishes
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loadLikedDishes()
  await fetchData()
})
</script>

<style scoped></style>
