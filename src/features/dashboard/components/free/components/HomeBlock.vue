<template>
  <div class="min-h-screen min-w-0 bg-[#0f0f11] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col gap-6 sm:gap-8">
    <div v-if="loading" class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <BaseLoader />
    </div>

    <div class="flex flex-col gap-3 sm:gap-4">
      <h1 class="text-white text-2xl sm:text-3xl md:text-4xl font-bold break-words">
        {{ t('dashboard.home.welcome', { placeName: userInfo.placeName }) }}
      </h1>
      <div class="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
        <p class="text-gray-400 text-base sm:text-lg">{{ t('dashboard.home.subtitle') }}</p>
        <a class="flex gap-2 sm:gap-3 items-center text-sky-600 cursor-pointer text-base sm:text-lg shrink-0 self-start sm:self-auto"
          :href="menuPublicHref" target="_blank" rel="noopener noreferrer">
          {{ t('dashboard.home.link') }}
          <img src="@/assets/images/icons/link.svg" alt="menu link" class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        </a>
      </div>
    </div>

    <div
      class="bg-gradient-to-r from-[#1a191f] to-[#2a2930] p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-[#dc5b41]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
      <div class="flex flex-col gap-2 min-w-0">
        <p class="text-[#dc5b41] text-xs sm:text-sm font-semibold uppercase tracking-wide">
          Free plan
        </p>
        <h2 class="text-white text-xl sm:text-2xl font-bold">
          {{ t('dashboard.home.quickAction') }}
        </h2>
        <p class="text-gray-300 text-sm max-w-xl">{{ t('dashboard.home.addEditDishes') }}</p>
      </div>
      <button @click="$emit('navigateTo', 'menu')"
        class="w-full sm:w-fit shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] text-white font-semibold hover:scale-105 transition-all duration-300 text-center">
        {{ t('dashboard.home.manageMenu') }}
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="bg-[#1a191f] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#2a2930]">
        <p class="text-gray-400 text-sm">{{ t('dashboard.home.totalDishes') }}</p>
        <h3 class="text-white text-3xl sm:text-4xl font-bold mt-2 tabular-nums">
          {{ totalDishes }}
        </h3>
      </div>

      <div class="bg-[#1a191f] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#2a2930]">
        <p class="text-gray-400 text-sm">{{ t('dashboard.home.totalCategories') }}</p>
        <h3 class="text-white text-3xl sm:text-4xl font-bold mt-2 tabular-nums">
          {{ totalCategories }}
        </h3>
      </div>

      <div class="bg-[#1a191f] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-green-500/30">
        <p class="text-gray-400 text-sm">{{ t('dashboard.home.available') }}</p>
        <h3 class="text-green-400 text-3xl sm:text-4xl font-bold mt-2 tabular-nums">
          {{ availableDishes }}
        </h3>
      </div>

      <div class="bg-[#1a191f] p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-red-500/30">
        <p class="text-gray-400 text-sm">{{ t('dashboard.home.unavailable') }}</p>
        <h3 class="text-red-400 text-3xl sm:text-4xl font-bold mt-2 tabular-nums">
          {{ unavailableDishes }}
        </h3>
      </div>
    </div>

    <div class="flex flex-col gap-3 sm:gap-4">
      <h2 class="text-white text-xl sm:text-2xl font-bold">{{ t('dashboard.home.quickLinks') }}</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button v-for="action in quickActions" :key="action.key" @click="$emit('navigateTo', action.key)"
          class="bg-[#1a191f] p-4 sm:p-5 rounded-xl border border-[#2a2930] hover:border-[#dc5b41] transition-all duration-300 text-left group hover:translate-y-[-3px]">
          <div
            class="w-10 h-10 rounded-lg bg-[#2a2930] group-hover:bg-[#dc5b41]/20 transition-all duration-300 flex items-center justify-center mb-3">
            <img
              :src="getIconPath(action.icon)"
              :alt="action.key"
              class="h-6 w-6 shrink-0 object-contain pointer-events-none"
              style="filter: brightness(0) saturate(100%) invert(54%) sepia(87%) saturate(2067%) hue-rotate(341deg) brightness(98%) contrast(87%);" />
          </div>
          <p class="text-white font-semibold">{{ t(action.title) }}</p>
          <p class="text-gray-400 text-sm mt-1">{{ t(action.description) }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '@/common/functions'
import BaseLoader from '@/components/BaseLoader.vue'
import { getMenuPublicHrefForNewTab } from '@/constants'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import { useFreeDashboardStore } from '@/stores/freeDashboard'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineEmits<{
  (e: 'navigateTo', key: string): void
}>()

const { t } = useI18n()
const userStore = useUserStore()
const freeDashboardStore = useFreeDashboardStore()
const categoriesDashboardStore = useCategoriesDashboardStore()

const loading = ref(true)
const userInfo = computed(() => userStore.$state)
const menuPublicHref = computed(() => getMenuPublicHrefForNewTab(userInfo.value.placeName))
const totalDishes = computed(() => freeDashboardStore.dishes.length)
const totalCategories = computed(() => categoriesDashboardStore.categories.length)
const availableDishes = computed(
  () => freeDashboardStore.dishes.filter((dish) => dish.isAvailable === 'available').length,
)
const unavailableDishes = computed(
  () => freeDashboardStore.dishes.filter((dish) => dish.isAvailable === 'unavailable').length,
)

const getIconPath = (imageName: string) => {
  return getImage(`../assets/images/icons/${imageName}.svg`)
}

const quickActions = [
  {
    key: 'menu',
    icon: 'table',
    title: 'dashboard.home.links.menu.title',
    description: 'dashboard.home.links.menu.description',
  },
  {
    key: 'categories',
    icon: 'category',
    title: 'dashboard.home.links.categories.title',
    description: 'dashboard.home.links.categories.description',
  },
  {
    key: 'qrCode',
    icon: 'qrcode',
    title: 'dashboard.standart.navs.qrCode',
    description: 'dashboard.home.link',
  },
]

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      freeDashboardStore.fetchDishes(),
      categoriesDashboardStore.fetchCategories(),
    ])
  } finally {
    loading.value = false
  }
})
</script>
