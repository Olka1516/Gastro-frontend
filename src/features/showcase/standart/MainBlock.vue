<template>
  <div id="menu" class="min-h-screen pb-20 pt-24 sm:pb-24 sm:pt-28 md:pt-32" :style="pageStyle"
    :data-menu-dish-layout="menuDishLayout">
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      :style="loadingStyle">
      <BaseLoader />
    </div>

    <header
      class="mx-auto max-w-xl px-4 pb-10 pt-2 sm:max-w-2xl sm:px-6 sm:pb-12 sm:pt-4 md:px-10 md:pb-14 lg:px-16 lg:pb-16 xl:px-24">
      <div class="relative isolate py-5 sm:py-7">
        <div
          class="pointer-events-none absolute inset-x-3 top-1/2 h-[88%] -translate-y-1/2 overflow-hidden rounded-[1.75rem] sm:inset-x-4 sm:rounded-[2rem]"
          aria-hidden="true">
          <div class="absolute inset-y-0 left-0 w-[58%]" :style="heroBandLeftStyle" />
          <div class="absolute inset-y-0 right-0 w-[42%]" :style="heroBandRightStyle" />
        </div>

        <article
          class="relative mx-auto flex min-h-[6.75rem] items-center rounded-[1.75rem] border py-4 pl-[4.75rem] pr-12 shadow-[0_10px_36px_rgba(0,0,0,0.35)] sm:min-h-[7.75rem] sm:rounded-[2rem] sm:pl-24 sm:pr-14"
          :style="heroCardStyle">
          <div
            class="absolute -left-5 top-1/2 z-10 size-[4.75rem] -translate-y-1/2 overflow-hidden rounded-full border p-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:-left-7 sm:size-24"
            :style="heroLogoRingStyle">
            <img v-if="logoUrl" :src="logoUrl" :alt="displayPlaceName || t('showcase.menu')"
              class="size-full rounded-full object-contain" />
            <div v-else class="flex size-full items-center justify-center rounded-full text-2xl font-bold sm:text-3xl"
              :style="iconBadgeStyle">
              {{ placeInitial }}
            </div>
          </div>

          <div class="min-w-0 flex-1 py-0.5">
            <h1 class="font-serif text-xl font-bold leading-tight sm:text-[1.65rem] md:text-[1.75rem]"
              :style="heroTitleStyle">
              {{ displayPlaceName || t('showcase.menu') }}
            </h1>
            <p class="mt-1.5 line-clamp-2 text-xs leading-snug sm:text-sm sm:leading-relaxed"
              :style="heroSubtitleStyle">
              {{ t('showcase.welcomeDescription') }}
            </p>
          </div>

          <a v-if="!loading && firstCategoryId" :href="`#${firstCategoryId}`"
            class="absolute -right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 sm:-right-4 sm:size-11"
            :style="heroActionButtonStyle" :aria-label="t('showcase.menu')">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true" :style="heroArrowStyle">
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </a>
        </article>
      </div>
    </header>

    <div v-if="!loading && categoriesWithDishes.length === 0"
      class="mx-4 rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-12 text-center sm:mx-6 sm:p-16 md:mx-10 md:p-20 lg:mx-16 xl:mx-24">
      <div class="flex flex-col items-center gap-6">
        <div class="w-32 h-32 rounded-lg flex items-center justify-center" :style="iconBadgeStyle">
          <span class="text-6xl">🍽️</span>
        </div>
        <h3 class="text-white text-3xl font-bold">{{ t('showcase.noMenuAvailable') }}</h3>
        <p class="text-gray-400 text-base max-w-md">{{ t('showcase.menuComingSoon') }}</p>
      </div>
    </div>

    <template v-else>
      <div class="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <ShowcaseCategoryTabs
          :categories="categoriesWithDishes"
          :active-id="activeCategoryId"
          :accent-color="menuIconColor"
          :panel-background="menuBackgroundColor"
          @select="scrollToCategory"
        />

        <div class="space-y-16 sm:space-y-20">
          <CategorySection
            v-for="category in categoriesWithDishes"
            :key="category.id"
            :ref="(el) => registerSection(category.id, el)"
            :category="category"
            :dishes="dishes"
            :liked-dish-ids="likedDishIds"
            :menu-icon-color="menuIconColor"
            :menu-dish-layout="menuDishLayout"
            @dish-click="handleDishClick"
            @toggle-like="handleToggleLike"
          />
        </div>
      </div>
    </template>

    <DishDetailsModal :dish="selectedDish" :category-name="selectedDishCategoryName" :menu-icon-color="menuIconColor"
      @close="closeDishModal" />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import { useShowcaseCategoryScroll } from '@/features/showcase/composables/useShowcaseCategoryScroll'
import { useShowcasePlaceTheme } from '@/features/showcase/composables/useShowcasePlaceTheme'
import { useShowcaseStore } from '@/stores/showcaseStore'
import { useShowcaseWishlistStore } from '@/stores/showcaseWishlistStore'
import type { IDish } from '@/types/menu'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import CategorySection from '../components/CategorySection.vue'
import DishDetailsModal from '../components/DishDetailsModal.vue'
import ShowcaseCategoryTabs from '../components/ShowcaseCategoryTabs.vue'

const { t } = useI18n()
const route = useRoute()
const showcaseStore = useShowcaseStore()
const wishlistStore = useShowcaseWishlistStore()
const { likedDishIds } = storeToRefs(wishlistStore)

const placeRouteKey = computed(() => String(route.params.id ?? ''))
const { menuBackgroundColor, menuIconColor, logoUrl, displayPlaceName, menuDishLayout } =
  useShowcasePlaceTheme(placeRouteKey)

const loading = ref(true)
const dishes = ref<IDish[]>([])
const selectedDish = ref<IDish | null>(null)

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
  color: menuBackgroundColor.value,
}))

const heroBandLeftStyle = computed(() => ({
  backgroundColor: menuIconColor.value,
}))

const heroBandRightStyle = computed(() => ({
  background: `linear-gradient(135deg, ${hexToRgba(menuIconColor.value, 0.35)} 0%, ${menuBackgroundColor.value} 100%)`,
}))

const heroCardStyle = computed(() => ({
  backgroundColor: '#1a191f',
  borderColor: hexToRgba(menuIconColor.value, 0.28),
}))

const heroLogoRingStyle = computed(() => ({
  backgroundColor: menuBackgroundColor.value,
  borderColor: hexToRgba(menuIconColor.value, 0.35),
}))

const heroTitleStyle = computed(() => ({
  color: '#e8e9ed',
}))

const heroSubtitleStyle = computed(() => ({
  color: '#9496a1',
}))

const heroActionButtonStyle = computed(() => ({
  backgroundColor: '#1a191f',
  borderColor: hexToRgba(menuIconColor.value, 0.4),
}))

const heroArrowStyle = computed(() => ({
  color: menuIconColor.value,
}))

const placeInitial = computed(() => {
  const name = displayPlaceName.value?.trim()
  return name ? name.charAt(0).toUpperCase() : '?'
})

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

const firstCategoryId = computed(() => categoriesWithDishes.value[0]?.id ?? '')

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

const handleToggleLike = (dishId: string) => {
  wishlistStore.toggle(dishId)
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

watch(placeRouteKey, (slug) => {
  wishlistStore.load(slug)
})

onMounted(async () => {
  wishlistStore.load(placeRouteKey.value)
  await fetchData()
  await start()
})
</script>
