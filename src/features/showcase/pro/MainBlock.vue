<template>
  <div id="menu" class="min-h-screen pb-20 pt-[80px] sm:pb-24" :style="pageStyle"
    :data-menu-dish-layout="menuDishLayout">
    <div v-if="loading"
      class="fixed w-screen h-screen inset-0 bg-[#0f0f11]/94 flex items-center justify-center z-[2000]">
      <BaseLoader />
    </div>

    <div class="relative w-full overflow-hidden">
      <div
        class="pointer-events-none absolute -top-20 left-1/2 h-[min(280px,70vw)] w-[min(100vw,520px)] -translate-x-1/2 rounded-full opacity-30 blur-3xl sm:-top-28 sm:h-[340px] sm:w-[min(100vw,760px)] sm:opacity-35 md:-top-32 md:h-[420px] md:w-[min(1200px,100vw)]"
        :style="heroGlowStyle" aria-hidden="true" />
      <div
        class="pointer-events-none absolute top-12 right-0 hidden h-48 w-48 rounded-full opacity-20 blur-3xl sm:block sm:top-20 sm:h-56 sm:w-56 md:top-24 md:h-64 md:w-64"
        :style="heroGlowSecondaryStyle" aria-hidden="true" />

      <header
        class="relative z-10 mx-auto w-full max-w-2xl px-4 pb-12 pt-3 sm:max-w-3xl sm:px-6 sm:pb-14 sm:pt-4 md:px-10 md:pb-16 lg:px-16 lg:pb-16 xl:px-24">
        <div class="relative isolate mt-[74px] py-7 sm:py-9">
          <div
            class="pointer-events-none absolute inset-x-2 top-1/2 h-[90%] -translate-y-1/2 overflow-hidden rounded-[1.75rem] sm:inset-x-3 sm:rounded-[2rem]"
            aria-hidden="true">
            <div class="absolute inset-y-0 left-0 w-[58%]" :style="heroBandLeftStyle" />
            <div class="absolute inset-y-0 right-0 w-[42%]" :style="heroBandRightStyle" />
          </div>

          <article
            class="relative mx-auto flex w-full min-h-[8rem] items-center rounded-[1.75rem] border py-6 pl-[5.25rem] pr-14 shadow-[0_10px_36px_rgba(0,0,0,0.35)] sm:min-h-[9.25rem] sm:rounded-[2rem] sm:pl-[6.5rem] sm:pr-16"
            :style="heroCardStyle">
            <div
              class="absolute -left-5 top-1/2 z-10 size-20 -translate-y-1/2 overflow-hidden rounded-full border p-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:-left-7 sm:size-[6.5rem]"
              :style="heroLogoRingStyle">
              <img v-if="logoUrl" :src="logoUrl" :alt="displayPlaceName || t('showcase.menu')"
                class="size-full rounded-full object-contain" />
              <div v-else class="flex size-full items-center justify-center rounded-full text-2xl font-bold sm:text-3xl"
                :style="iconBadgeStyle">
                {{ placeInitial }}
              </div>
            </div>

            <div class="min-w-0 flex-1 py-0.5">
              <h1 class="font-serif text-xl font-bold leading-tight tracking-tight sm:text-[1.65rem] md:text-[1.75rem]"
                :style="heroTitleStyle">
                {{ displayPlaceName || t('showcase.menu') }}
              </h1>
              <p class="mt-1.5 line-clamp-2 text-xs leading-snug sm:text-sm sm:leading-relaxed"
                :style="heroSubtitleStyle">
                {{ menuWelcomeText || t('showcase.welcomeDescription') }}
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
    </div>

    <div v-if="!loading && categoriesWithDishes.length === 0"
      class="mx-4 rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-12 text-center sm:mx-6 sm:p-16 md:mx-10 md:p-20 lg:mx-16 xl:mx-24">
      <div class="flex flex-col items-center gap-6">
        <div class="flex h-32 w-32 items-center justify-center rounded-lg" :style="iconBadgeStyle">
          <span class="text-6xl">🍽️</span>
        </div>
        <h3 class="text-3xl font-bold text-white">{{ t('showcase.noMenuAvailable') }}</h3>
        <p class="max-w-md text-base text-gray-400">{{ t('showcase.menuComingSoon') }}</p>
      </div>
    </div>

    <template v-else>
      <div class="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <ShowcaseCategoryTabs :categories="categoriesWithDishes" :language-code="menuContentLangCode"
          :active-id="activeCategoryId" :accent-color="menuIconColor" :panel-background="menuBackgroundColor"
          @select="scrollToCategory" />

        <div class="space-y-16 sm:space-y-20">
          <CategorySection v-for="category in categoriesWithDishes" :key="category.id"
            :ref="(el) => registerSection(category.id, el)" :category="category" :dishes="dishes"
            :liked-dish-ids="likedDishIds" :menu-icon-color="menuIconColor" :menu-dish-layout="menuDishLayout"
            :show-add-to-cart="true" @dish-click="handleDishClick" @toggle-like="handleToggleLike" />
        </div>
      </div>
    </template>

    <DishDetailsModal :dish="selectedDish" :category-name="selectedDishCategoryName" :menu-icon-color="menuIconColor"
      @close="closeDishModal" />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import {
  filterCategoriesWithAvailableDishes,
  getCategoryDisplayName,
} from '@/features/dashboard/utils/categoryApi'
import { useShowcaseCategoryScroll } from '@/features/showcase/composables/useShowcaseCategoryScroll'
import { useShowcaseMenuContentLanguage } from '@/features/showcase/composables/useShowcaseMenuContentLanguage'
import { useShowcasePlaceTheme } from '@/features/showcase/composables/useShowcasePlaceTheme'
import { useShowcaseCartStore } from '@/stores/showcaseCartStore'
import { useShowcaseMenuLanguageStore } from '@/stores/showcaseMenuLanguageStore'
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
const cartStore = useShowcaseCartStore()
const menuLangStore = useShowcaseMenuLanguageStore()
const wishlistStore = useShowcaseWishlistStore()
const { likedDishIds } = storeToRefs(wishlistStore)
const { menuContentLangCode } = useShowcaseMenuContentLanguage()

const placeRouteKey = computed(() => String(route.params.id ?? ''))
const { menuBackgroundColor, menuIconColor, logoUrl, displayPlaceName, menuDishLayout, menuWelcomeText } =
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

const iconBadgeStyle = computed(() => ({
  backgroundColor: menuIconColor.value,
  color: menuBackgroundColor.value,
}))

const heroGlowStyle = computed(() => ({
  background: `radial-gradient(ellipse at center, ${hexToRgba(menuIconColor.value, 0.22)} 0%, ${hexToRgba(menuIconColor.value, 0)} 70%)`,
}))

const heroGlowSecondaryStyle = computed(() => ({
  background: `radial-gradient(ellipse at center, ${hexToRgba(menuIconColor.value, 0.14)} 0%, ${hexToRgba(menuIconColor.value, 0)} 70%)`,
}))

const heroBandLeftStyle = computed(() => ({
  backgroundColor: menuIconColor.value,
}))

const heroBandRightStyle = computed(() => ({
  background: `linear-gradient(135deg, ${hexToRgba(menuIconColor.value, 0.35)} 0%, ${menuBackgroundColor.value} 100%)`,
}))

const heroCardStyle = computed(() => ({
  backgroundColor: '#1a191f',
  borderColor: hexToRgba(menuIconColor.value, 0.38),
  borderTopColor: menuIconColor.value,
  borderTopWidth: '2px',
  boxShadow: `0 10px 36px rgba(0,0,0,0.35), 0 0 28px ${hexToRgba(menuIconColor.value, 0.14)}`,
}))

const heroLogoRingStyle = computed(() => ({
  backgroundColor: menuBackgroundColor.value,
  borderColor: hexToRgba(menuIconColor.value, 0.42),
  boxShadow: `0 8px 24px rgba(0,0,0,0.35), 0 0 16px ${hexToRgba(menuIconColor.value, 0.22)}`,
}))

const heroTitleStyle = computed(() => ({
  color: '#e8e9ed',
}))

const heroSubtitleStyle = computed(() => ({
  color: '#9496a1',
}))

const heroActionButtonStyle = computed(() => ({
  backgroundColor: '#1a191f',
  borderColor: hexToRgba(menuIconColor.value, 0.5),
  boxShadow: `0 6px 20px rgba(0,0,0,0.25), 0 0 14px ${hexToRgba(menuIconColor.value, 0.2)}`,
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
  if (!category) return selectedDish.value.category
  return getCategoryDisplayName(category, menuContentLangCode.value)
})

const categoriesWithDishes = computed(() =>
  filterCategoriesWithAvailableDishes(showcaseStore.categories, dishes.value),
)

const firstCategoryId = computed(() => categoriesWithDishes.value[0]?.id ?? '')

const { activeCategoryId, registerSection, scrollToCategory, start } =
  useShowcaseCategoryScroll(categoriesWithDishes)

const handleDishClick = (dish: IDish) => {
  selectedDish.value = dish
}

const closeDishModal = () => {
  selectedDish.value = null
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
  cartStore.load(slug)
  wishlistStore.load(slug)
})

onMounted(async () => {
  menuLangStore.enableForPlace(placeRouteKey.value)
  cartStore.load(placeRouteKey.value)
  wishlistStore.load(placeRouteKey.value)
  await fetchData()
  await start()
})

</script>
