<template>
  <div class="p-12 flex flex-col gap-8 min-h-screen bg-[#0f0f11]">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <BaseLoader />
    </div>
    <!-- Welcome Header -->
    <div class="flex flex-col gap-4">
      <h1 class="text-white text-4xl font-bold">
        {{ t('dashboard.home.welcome', { placeName: userInfo.placeName }) }}
      </h1>
      <div class="flex justify-between">
        <p class="text-gray-400 text-lg">{{ t('dashboard.home.subtitle') }}</p>
        <RouterLink
          class="flex gap-4 text-sky-600 cursor-pointer text-lg"
          :to="LINK_TEMPLATES.MENU(userInfo.placeName)"
          >{{ t('dashboard.home.link') }}
          <img src="@/assets/images/icons/link.svg" alt="" />
        </RouterLink>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Dishes Card -->
      <div
        class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-6 rounded-2xl border border-[#2a2930] hover:border-[#dc5b41]/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
      >
        <div class="flex items-start justify-between">
          <div class="flex flex-col gap-2">
            <p class="text-gray-400 text-sm">{{ t('dashboard.home.totalDishes') }}</p>
            <h3 class="text-white text-4xl font-bold">{{ totalDishes }}</h3>
            <div class="flex gap-2 text-xs mt-2">
              <span class="text-green-500">
                ✓ {{ availableDishes }} {{ t('dashboard.home.available') }}
              </span>
              <span class="text-gray-500">
                ✗ {{ unavailableDishes }} {{ t('dashboard.home.unavailable') }}
              </span>
            </div>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          >
            <img
              src="@/assets/images/icons/table.svg"
              alt="dishes"
              class="w-6 h-6"
              style="filter: brightness(0) invert(1)"
            />
          </div>
        </div>
      </div>

      <!-- Total Categories Card -->
      <div
        class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-6 rounded-2xl border border-[#2a2930] hover:border-[#dc5b41]/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
      >
        <div class="flex items-start justify-between">
          <div class="flex flex-col gap-2">
            <p class="text-gray-400 text-sm">{{ t('dashboard.home.totalCategories') }}</p>
            <h3 class="text-white text-4xl font-bold">{{ totalCategories }}</h3>
            <p class="text-gray-500 text-xs mt-2">{{ t('dashboard.home.organized') }}</p>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          >
            <img
              src="@/assets/images/icons/category.svg"
              alt="categories"
              class="w-6 h-6"
              style="filter: brightness(0) invert(1)"
            />
          </div>
        </div>
      </div>

      <!-- Quick Action Card -->
      <div
        class="bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] p-6 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden"
        @click="$emit('navigateTo', 'menu')"
      >
        <div class="relative z-10 flex flex-col gap-2">
          <p class="text-white/90 text-sm font-medium">{{ t('dashboard.home.quickAction') }}</p>
          <h3 class="text-white text-2xl font-bold">{{ t('dashboard.home.manageMenu') }}</h3>
          <p class="text-white/80 text-xs mt-2">{{ t('dashboard.home.addEditDishes') }}</p>
        </div>
        <div
          class="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"
        ></div>
      </div>
    </div>

    <!-- Quick Links Section -->
    <div class="flex flex-col gap-4 mt-4">
      <h2 class="text-white text-2xl font-bold">{{ t('dashboard.home.quickLinks') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="link in quickLinks"
          :key="link.key"
          @click="$emit('navigateTo', link.key)"
          class="bg-[#1a191f] p-6 rounded-xl border border-[#2a2930] hover:border-[#dc5b41] transition-all duration-300 hover:translate-y-[-4px] group"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 bg-[#2a2930] rounded-lg flex items-center justify-center group-hover:bg-[#dc5b41]/20 transition-all duration-300"
            >
              <img
                :src="getIconPath(link.icon)"
                :alt="link.key"
                class="w-6 h-6"
                style="
                  filter: brightness(0) saturate(100%) invert(54%) sepia(87%) saturate(2067%)
                    hue-rotate(341deg) brightness(98%) contrast(87%);
                "
              />
            </div>
            <div class="flex flex-col items-start">
              <h4 class="text-white font-semibold text-left">{{ t(link.title) }}</h4>
              <p class="text-gray-400 text-xs text-left">{{ t(link.description) }}</p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Recent Activity / Tips Section -->
    <div
      class="bg-gradient-to-r from-[#1a191f] to-[#2a2930] p-8 rounded-2xl border border-[#dc5b41]/30"
    >
      <div class="flex items-start gap-4">
        <div
          class="w-16 h-16 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-2xl flex items-center justify-center flex-shrink-0"
        >
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
import { getImage } from '@/common/functions'
import { LINK_TEMPLATES } from '@/constants'
import BaseLoader from '@/components/BaseLoader.vue'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import { useStandartDashboardStore } from '@/stores/standartDashboard'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

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

const getIconPath = (imageName: string) => {
  return getImage(`../assets/images/icons/${imageName}.svg`)
}

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
