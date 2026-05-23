<template>
  <div class="flex min-h-screen min-w-0 flex-col gap-6 bg-[#0f0f11] p-4 sm:gap-8 sm:p-6 md:p-8 lg:p-12">
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f11]/80 backdrop-blur-sm">
      <BaseLoader />
    </div>

    <div class="flex flex-col gap-3 sm:gap-4">
      <h1 class="break-words text-2xl font-bold text-white sm:text-3xl md:text-4xl">
        {{ t('dashboard.home.welcome', { placeName: userInfo.placeName }) }}
      </h1>
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p class="text-base text-gray-400 sm:text-lg">{{ t('dashboard.home.subtitle') }}</p>
        <a
          class="flex shrink-0 cursor-pointer items-center gap-2 self-start text-base text-sky-600 sm:gap-3 sm:self-auto sm:text-lg"
          :href="menuPublicHref"
          target="_blank"
          rel="noopener noreferrer">
          {{ t('dashboard.home.link') }}
          <img
            src="@/assets/images/icons/link.svg"
            alt=""
            class="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      <DashboardCard
        v-for="card in cards"
        :key="card.id"
        v-bind="card"
        @click="card.id && $emit('navigateTo', card.navigateKey)" />
    </div>

    <div class="flex flex-col gap-3 sm:gap-4">
      <h2 class="text-xl font-bold text-white sm:text-2xl">{{ t('dashboard.home.quickLinks') }}</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <DashboardQuickLinks :links="quickLinks" @navigateTo="$emit('navigateTo', $event)" />
      </div>
    </div>

    <div
      class="rounded-lg border border-[#dc5b41]/30 bg-gradient-to-r from-[#1a191f] to-[#2a2930] p-5 sm:p-6 md:p-8">
      <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-start">
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] sm:h-14 sm:w-14 md:h-16 md:w-16">
          <span class="text-2xl sm:text-3xl">💡</span>
        </div>
        <div class="flex min-w-0 flex-col gap-2">
          <h3 class="text-lg font-bold text-white sm:text-xl">{{ t('dashboard.home.tip.title') }}</h3>
          <p class="text-sm leading-relaxed text-gray-300">
            {{ dailyTipDescription }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import { getMenuPublicHrefForNewTab } from '@/constants'
import { useDailyTip } from '@/features/dashboard/composables/useDailyTip'
import type { DashboardCardBind } from '@/features/dashboard/types'
import { getShowcaseOrdersForOwner, getTableReservationsForOwner } from '@/services/dashboard'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import { usePremiumDashboardStore } from '@/stores/premiumDashboard'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DashboardCard from './DashboardCard.vue'
import DashboardQuickLinks from './DashboardQuickLinks.vue'

const { t } = useI18n()
const { dailyTipDescription } = useDailyTip()
const userStore = useUserStore()
const premiumDashboardStore = usePremiumDashboardStore()
const categoriesDashboardStore = useCategoriesDashboardStore()

defineEmits<{
  (e: 'navigateTo', key: string): void
}>()

const loading = ref(true)
const userInfo = computed(() => userStore.$state)

const menuPublicHref = computed(() => getMenuPublicHrefForNewTab(userInfo.value.placeName))

const pendingOrdersCount = ref(0)
const pendingReservationsCount = ref(0)

const totalDishes = computed(() => premiumDashboardStore.dishes.length)
const availableDishes = computed(
  () => premiumDashboardStore.dishes.filter((d) => d.isAvailable === 'available').length,
)
const unavailableDishes = computed(
  () => premiumDashboardStore.dishes.filter((d) => d.isAvailable === 'unavailable').length,
)
const totalCategories = computed(() => categoriesDashboardStore.categories.length)

const quickLinks = [
  {
    key: 'menu',
    icon: 'table',
    title: 'dashboard.home.links.menu.title',
    description: 'dashboard.home.links.menu.description',
  },
  {
    key: 'orders',
    icon: 'tools-kitchen',
    title: 'dashboard.home.links.orders.title',
    description: 'dashboard.home.links.orders.description',
  },
  {
    key: 'reservations',
    icon: 'clock',
    title: 'dashboard.home.links.reservations.title',
    description: 'dashboard.home.links.reservations.description',
  },
  {
    key: 'analytics',
    icon: 'chart',
    title: 'dashboard.home.links.analytics.title',
    description: 'dashboard.home.links.analytics.description',
  },
  {
    key: 'categories',
    icon: 'category',
    title: 'dashboard.home.links.categories.title',
    description: 'dashboard.home.links.categories.description',
  },
  {
    key: 'settings',
    icon: 'settings',
    title: 'dashboard.home.links.settings.title',
    description: 'dashboard.home.links.settings.description',
  },
  {
    key: 'menu',
    icon: 'plus',
    title: 'dashboard.home.links.addDish.title',
    description: 'dashboard.home.links.addDish.description',
  },
]

const cards = computed<DashboardCardBind[]>(() => {
  return [
    {
      id: 'dishes',
      navigateKey: 'menu',
      variant: 'dark',
      clickable: true,
      hoverScale: true,
      title: t('dashboard.home.totalDishes'),
      value: totalDishes.value,
      showAvailability: true,
      availableCount: availableDishes.value,
      unavailableCount: unavailableDishes.value,
      availableText: t('dashboard.home.available'),
      unavailableText: t('dashboard.home.unavailable'),
      iconSrc: '../assets/images/icons/table.svg',
      iconAlt: 'dishes',
    },
    {
      id: 'categories',
      navigateKey: 'categories',
      variant: 'dark',
      clickable: true,
      hoverScale: true,
      title: t('dashboard.home.totalCategories'),
      value: totalCategories.value,
      showSubtitle: true,
      subtitle: t('dashboard.home.organized'),
      iconSrc: '../assets/images/icons/category.svg',
      iconAlt: 'categories',
    },
    {
      id: 'orders',
      navigateKey: 'orders',
      variant: 'dark',
      clickable: true,
      hoverScale: true,
      title: t('dashboard.standart.navs.orders'),
      value: pendingOrdersCount.value,
      showSubtitle: true,
      subtitle: t('dashboard.home.pendingStatusHint'),
      iconSrc: '../assets/images/icons/tools-kitchen.svg',
      iconAlt: 'orders',
    },
    {
      id: 'reservations',
      navigateKey: 'reservations',
      variant: 'dark',
      clickable: true,
      hoverScale: true,
      title: t('dashboard.standart.navs.reservations'),
      value: pendingReservationsCount.value,
      showSubtitle: true,
      subtitle: t('dashboard.home.pendingStatusHint'),
      iconSrc: '../assets/images/icons/clock.svg',
      iconAlt: 'reservations',
    },
  ]
})

async function loadPendingCounts() {
  try {
    const orders = await getShowcaseOrdersForOwner({ status: 'pending' })
    pendingOrdersCount.value = orders.length
  } catch {
    pendingOrdersCount.value = 0
  }
  try {
    const reservations = await getTableReservationsForOwner({ status: 'pending' })
    pendingReservationsCount.value = reservations.length
  } catch {
    pendingReservationsCount.value = 0
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      premiumDashboardStore.fetchDishes(),
      categoriesDashboardStore.fetchCategories(),
      loadPendingCounts(),
    ])
  } finally {
    loading.value = false
  }
})
</script>
