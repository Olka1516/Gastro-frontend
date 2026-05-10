<template>
  <div
    id="menu"
    class="min-h-screen pb-24 pt-28 md:pt-32"
    :style="pageStyle"
    :data-menu-dish-layout="menuDishLayout"
  >
    <div v-if="loading" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
      :style="loadingStyle">
      <BaseLoader />
    </div>

    <div class="relative overflow-hidden px-6 md:px-12 lg:px-24 pb-16 pt-8">
      <div
        class="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[min(1200px,100vw)] -translate-x-1/2 rounded-full opacity-35 blur-3xl"
        :style="heroGlowStyle" />
      <div class="pointer-events-none absolute top-24 right-0 h-64 w-64 rounded-full opacity-20 blur-3xl"
        :style="heroGlowSecondaryStyle" />

      <div class="relative mx-auto max-w-4xl text-center">
        <img v-if="logoUrl" :src="logoUrl" :alt="displayPlaceName || t('showcase.menu')"
          class="mx-auto mb-8 h-24 w-auto max-w-[260px] object-contain drop-shadow-lg" />

        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {{ displayPlaceName || t('showcase.menu') }}
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
          {{ t('showcase.premium.description') }}
        </p>
      </div>
    </div>

    <div class="px-6 md:px-12 lg:px-24">
      <div v-if="!loading && categoriesWithDishes.length === 0"
        class="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-br from-[#1c1b22] to-[#121116] p-16 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div class="flex flex-col items-center gap-6">
          <div class="flex h-28 w-28 items-center justify-center rounded-2xl shadow-xl" :style="iconBadgeStyle">
            <span class="text-5xl">🍽️</span>
          </div>
          <h3 class="text-2xl font-bold text-white md:text-3xl">
            {{ t('showcase.noMenuAvailable') }}
          </h3>
          <p class="max-w-md text-gray-400">{{ t('showcase.menuComingSoon') }}</p>
        </div>
      </div>

      <div v-else class="mx-auto max-w-6xl space-y-24 pb-16">
        <CategorySection
          v-for="category in categoriesWithDishes"
          :key="category.id"
          :category="category"
          :dishes="dishes"
          :liked-dish-ids="likedDishIds"
          :menu-icon-color="menuIconColor"
          :menu-dish-layout="menuDishLayout"
          :show-add-to-cart="true"
          class="scroll-mt-28"
          @dish-click="handleDishClick"
          @toggle-like="handleToggleLike"
        />
      </div>
    </div>

    <DishDetailsModal :dish="selectedDish" :category-name="selectedDishCategoryName" :menu-icon-color="menuIconColor"
      @close="closeDishModal" />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import { useShowcasePlaceTheme } from '@/features/showcase/composables/useShowcasePlaceTheme'
import { useShowcaseCartStore } from '@/stores/showcaseCartStore'
import { useShowcaseStore } from '@/stores/showcaseStore'
import { useShowcaseWishlistStore } from '@/stores/showcaseWishlistStore'
import type { IDish } from '@/types/menu'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import DishDetailsModal from '../components/DishDetailsModal.vue'
import CategorySection from '../components/CategorySection.vue'

const { t } = useI18n()
const route = useRoute()
const showcaseStore = useShowcaseStore()
const cartStore = useShowcaseCartStore()
const wishlistStore = useShowcaseWishlistStore()
const { likedDishIds } = storeToRefs(wishlistStore)

const placeRouteKey = computed(() => String(route.params.id ?? ''))
const { menuBackgroundColor, menuIconColor, logoUrl, displayPlaceName, menuDishLayout } =
  useShowcasePlaceTheme(placeRouteKey)

const loading = ref(true)
const dishes = ref<IDish[]>([])
const selectedDish = ref<IDish | null>(null)
const activeCategoryId = ref<string | null>(null)

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
  backgroundColor: hexToRgba(menuBackgroundColor.value, 0.85),
}))

const iconBadgeStyle = computed(() => ({
  backgroundColor: menuIconColor.value,
}))

const heroGlowStyle = computed(() => ({
  background: `radial-gradient(ellipse at center, ${hexToRgba(menuIconColor.value, 0.55)} 0%, transparent 70%)`,
}))

const heroGlowSecondaryStyle = computed(() => ({
  background: `radial-gradient(circle at center, ${hexToRgba(menuIconColor.value, 0.35)} 0%, transparent 65%)`,
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

const handleToggleLike = (dishId: string) => {
  wishlistStore.toggle(dishId)
}

const updateActiveCategoryFromScroll = () => {
  const ids = categoriesWithDishes.value.map((c) => c.id)
  const headerOffset = 140
  let current: string | null = null

  for (const id of ids) {
    const el = document.getElementById(id)
    if (!el) continue
    const top = el.getBoundingClientRect().top
    if (top <= headerOffset) {
      current = id
    }
  }

  activeCategoryId.value = current ?? ids[0] ?? null
}

let scrollListenerAttached = false

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

watch(placeRouteKey, (slug) => {
  cartStore.load(slug)
  wishlistStore.load(slug)
})

onMounted(async () => {
  cartStore.load(placeRouteKey.value)
  wishlistStore.load(placeRouteKey.value)
  await fetchData()
  updateActiveCategoryFromScroll()
  window.addEventListener('scroll', updateActiveCategoryFromScroll, { passive: true })
  scrollListenerAttached = true
})

onUnmounted(() => {
  if (scrollListenerAttached) {
    window.removeEventListener('scroll', updateActiveCategoryFromScroll)
  }
  document.body.style.overflow = ''
})
</script>

<style scoped></style>
