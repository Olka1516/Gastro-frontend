<template>
  <div class="p-12 flex flex-col gap-8 min-h-screen bg-[#0f0f11]">
    <div v-if="loading" class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <BaseLoader />
    </div>
    <div class="flex flex-col gap-4">
      <h1 class="text-white text-4xl font-bold">
        {{ t('dashboard.home.welcome', { placeName: userInfo.placeName }) }}
      </h1>
      <div class="flex justify-between">
        <p class="text-gray-400 text-lg">{{ t('dashboard.home.subtitle') }}</p>
        <RouterLink class="flex gap-4 text-sky-600 cursor-pointer text-lg"
          :to="LINK_TEMPLATES.MENU(userInfo.placeName)">{{ t('dashboard.home.link') }}
          <img src="@/assets/images/icons/link.svg" alt="" />
        </RouterLink>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard v-for="card in cards" :key="card.id" v-bind="card"
        @click="card.id && $emit('navigateTo', card.navigateKey)" />
    </div>

    <div class="flex flex-col gap-4 mt-4">
      <h2 class="text-white text-2xl font-bold">{{ t('dashboard.home.quickLinks') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardQuickLinks :links="quickLinks" @navigateTo="$emit('navigateTo', $event)" />
      </div>
    </div>

    <div class="bg-gradient-to-r from-[#1a191f] to-[#2a2930] p-8 rounded-2xl border border-[#dc5b41]/30">
      <div class="flex items-start gap-4">
        <div
          class="w-16 h-16 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-2xl flex items-center justify-center flex-shrink-0">
          <span class="text-3xl">💡</span>
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="text-white text-xl font-bold">{{ t('dashboard.home.tip.title') }}</h3>
          <p class="text-gray-300 text-sm leading-relaxed">
            {{ t('dashboard.home.tip.description') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import { LINK_TEMPLATES } from '@/constants'
import type { DashboardCardBind } from '@/features/dashboard/types'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import { useStandartDashboardStore } from '@/stores/standartDashboard'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DashboardCard from './DashboardCard.vue'
import DashboardQuickLinks from './DashboardQuickLinks.vue'

const { t } = useI18n()
const userStore = useUserStore()
const standartDashboardStore = useStandartDashboardStore()
const categoriesDashboardStore = useCategoriesDashboardStore()

defineEmits<{
  (e: 'navigateTo', key: string): void
}>()

const loading = ref(true)
const userInfo = computed(() => userStore.$state)

const totalDishes = computed(() => standartDashboardStore.dishes.length)
const availableDishes = computed(
  () => standartDashboardStore.dishes.filter((d) => d.isAvailable === 'available').length,
)
const unavailableDishes = computed(
  () => standartDashboardStore.dishes.filter((d) => d.isAvailable === 'unavailable').length,
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
    icon: 'table',
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
      id: 'quick',
      navigateKey: 'menu',
      variant: 'accent',
      clickable: true,
      hoverScale: true,
      showQuick: true,
      quickTopText: t('dashboard.home.quickAction'),
      quickHeading: t('dashboard.home.manageMenu'),
      quickDescription: t('dashboard.home.addEditDishes'),
    },
  ]
})

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      standartDashboardStore.fetchDishes(),
      categoriesDashboardStore.fetchCategories(),
    ])
  } finally {
    loading.value = false
  }
})
</script>

<style scoped></style>
