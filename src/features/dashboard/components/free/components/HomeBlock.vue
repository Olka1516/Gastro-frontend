<template>
  <div class="p-12 flex flex-col gap-8 min-h-screen bg-[#0f0f11]">
    <div v-if="loading" class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <BaseLoader />
    </div>

    <div class="flex flex-col gap-4">
      <h1 class="text-white text-4xl font-bold">
        {{ t('dashboard.home.welcome', { placeName: userInfo.placeName }) }}
      </h1>
      <div class="flex justify-between items-center gap-4 flex-wrap">
        <p class="text-gray-400 text-lg">{{ t('dashboard.home.subtitle') }}</p>
        <RouterLink class="flex gap-3 items-center text-sky-600 cursor-pointer text-lg"
          :to="LINK_TEMPLATES.MENU(userInfo.placeName)">
          {{ t('dashboard.home.link') }}
          <img src="@/assets/images/icons/link.svg" alt="menu link" />
        </RouterLink>
      </div>
    </div>

    <div
      class="bg-gradient-to-r from-[#1a191f] to-[#2a2930] p-8 rounded-2xl border border-[#dc5b41]/30 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div class="flex flex-col gap-2">
        <p class="text-[#dc5b41] text-sm font-semibold uppercase tracking-wide">Free plan</p>
        <h2 class="text-white text-2xl font-bold">{{ t('dashboard.home.quickAction') }}</h2>
        <p class="text-gray-300 text-sm max-w-xl">{{ t('dashboard.home.addEditDishes') }}</p>
      </div>
      <button @click="$emit('navigateTo', 'menu')"
        class="px-6 py-3 rounded-xl bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] text-white font-semibold hover:scale-105 transition-all duration-300 w-fit">
        {{ t('dashboard.home.manageMenu') }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div class="bg-[#1a191f] p-6 rounded-2xl border border-[#2a2930]">
        <p class="text-gray-400 text-sm">{{ t('dashboard.home.totalDishes') }}</p>
        <h3 class="text-white text-4xl font-bold mt-2">{{ totalDishes }}</h3>
      </div>

      <div class="bg-[#1a191f] p-6 rounded-2xl border border-[#2a2930]">
        <p class="text-gray-400 text-sm">{{ t('dashboard.home.totalCategories') }}</p>
        <h3 class="text-white text-4xl font-bold mt-2">{{ totalCategories }}</h3>
      </div>

      <div class="bg-[#1a191f] p-6 rounded-2xl border border-green-500/30">
        <p class="text-gray-400 text-sm">{{ t('dashboard.home.available') }}</p>
        <h3 class="text-green-400 text-4xl font-bold mt-2">{{ availableDishes }}</h3>
      </div>

      <div class="bg-[#1a191f] p-6 rounded-2xl border border-red-500/30">
        <p class="text-gray-400 text-sm">{{ t('dashboard.home.unavailable') }}</p>
        <h3 class="text-red-400 text-4xl font-bold mt-2">{{ unavailableDishes }}</h3>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h2 class="text-white text-2xl font-bold">{{ t('dashboard.home.quickLinks') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button v-for="action in quickActions" :key="action.key" @click="$emit('navigateTo', action.key)"
          class="bg-[#1a191f] p-5 rounded-xl border border-[#2a2930] hover:border-[#dc5b41] transition-all duration-300 text-left group hover:translate-y-[-3px]">
          <div
            class="w-10 h-10 rounded-lg bg-[#2a2930] group-hover:bg-[#dc5b41]/20 transition-all duration-300 flex items-center justify-center mb-3">
            <span class="text-xl">{{ action.icon }}</span>
          </div>
          <p class="text-white font-semibold">{{ t(action.title) }}</p>
          <p class="text-gray-400 text-sm mt-1">{{ t(action.description) }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import { LINK_TEMPLATES } from '@/constants'
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
const totalDishes = computed(() => freeDashboardStore.dishes.length)
const totalCategories = computed(() => categoriesDashboardStore.categories.length)
const availableDishes = computed(
  () => freeDashboardStore.dishes.filter((dish) => dish.isAvailable === 'available').length,
)
const unavailableDishes = computed(
  () => freeDashboardStore.dishes.filter((dish) => dish.isAvailable === 'unavailable').length,
)

const quickActions = [
  {
    key: 'menu',
    icon: '🍽️',
    title: 'dashboard.home.links.menu.title',
    description: 'dashboard.home.links.menu.description',
  },
  {
    key: 'categories',
    icon: '📂',
    title: 'dashboard.home.links.categories.title',
    description: 'dashboard.home.links.categories.description',
  },
  {
    key: 'qrCode',
    icon: '🔳',
    title: 'dashboard.standart.navs.qrCode',
    description: 'dashboard.home.link',
  },
]

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([freeDashboardStore.fetchDishes(), categoriesDashboardStore.fetchCategories()])
  } finally {
    loading.value = false
  }
})
</script>

<style scoped></style>
