<template>
  <div class="p-12 flex flex-col gap-8 min-h-screen bg-[#0f0f11]">
    <div v-if="loading" class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <BaseLoader />
    </div>

    <div class="flex items-center justify-between w-full">
      <div class="flex flex-col gap-2">
        <h2 class="text-white text-4xl font-bold">{{ t('dashboard.tableHead.table') }}</h2>
        <p class="text-gray-400 text-sm">{{ t('dashboard.menu.subtitle') }}</p>
      </div>
      <button @click="openAddDish"
        class="text-white bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-6 py-3 cursor-pointer rounded-2xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-3 group">
        <span class="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
        {{ t('dashboard.tableHead.addMeal') }}
      </button>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-4 rounded-xl border border-[#2a2930]">
        <p class="text-gray-400 text-xs uppercase tracking-wider mb-1">
          {{ t('dashboard.menu.total') }}
        </p>
        <p class="text-white text-2xl font-bold">{{ dishes.length }}</p>
      </div>
      <div class="bg-gradient-to-br from-green-500/10 to-[#0f0f11] p-4 rounded-xl border border-green-500/20">
        <p class="text-gray-400 text-xs uppercase tracking-wider mb-1">
          {{ t('dashboard.home.available') }}
        </p>
        <p class="text-green-400 text-2xl font-bold">{{ availableDishes }}</p>
      </div>
      <div class="bg-gradient-to-br from-red-500/10 to-[#0f0f11] p-4 rounded-xl border border-red-500/20">
        <p class="text-gray-400 text-xs uppercase tracking-wider mb-1">
          {{ t('dashboard.home.unavailable') }}
        </p>
        <p class="text-red-400 text-2xl font-bold">{{ unavailableDishes }}</p>
      </div>
    </div>

    <div v-if="dishes.length === 0"
      class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-3xl border border-[#2a2930] p-20 text-center">
      <div class="flex flex-col items-center gap-6">
        <div
          class="w-32 h-32 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-3xl flex items-center justify-center shadow-[0_20px_60px_rgb(220,91,65,0.3)]">
          <span class="text-6xl">🍽️</span>
        </div>
        <h3 class="text-white text-3xl font-bold">{{ t('dashboard.menu.noDishes') }}</h3>
        <p class="text-gray-400 text-base max-w-md">{{ t('dashboard.menu.addFirstDish') }}</p>
        <button @click="openAddDish"
          class="mt-4 text-white bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg font-semibold">
          {{ t('dashboard.tableHead.addMeal') }}
        </button>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="data in dishes.slice((paginationPage - 1) * size, paginationPage * size)" :key="data.id"
        class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-3xl border border-[#2a2930] overflow-hidden hover:border-[#dc5b41]/50 transition-all duration-300 hover:scale-[1.02] group shadow-xl hover:shadow-[0_20px_60px_rgba(220,91,65,0.2)]">
        <div class="relative h-56 overflow-hidden">
          <img v-if="typeof data.image === 'string'" :src="data.image" alt="dish"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent"></div>

          <div class="absolute top-4 right-4">
            <span :class="[
              'px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg',
              data.isAvailable === 'available'
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-red-500/20 text-red-300 border border-red-500/30',
            ]">
              {{
                data.isAvailable === 'available'
                  ? '✓ ' + t('dashboard.available')
                  : '✗ ' + t('dashboard.unavailable')
              }}
            </span>
          </div>

          <div class="absolute bottom-4 left-4">
            <div class="bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-4 py-2 rounded-xl shadow-lg backdrop-blur-md">
              <span class="text-white text-xl font-bold">${{ Number(data.price).toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div class="p-6 flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <h3 class="text-white text-xl font-bold line-clamp-1">{{ data.name }}</h3>
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a2930] text-gray-300 text-xs font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-[#dc5b41]"></span>
                {{ getCategoryName(data.category) }}
              </span>
            </div>
          </div>

          <p class="text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {{ data.description || t('dashboard.menu.noDescription') }}
          </p>

          <div class="flex items-center gap-2 mt-2 pt-4 border-t border-[#2a2930]">
            <button @click="openManageDish(data)"
              class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2a2930] hover:bg-[#dc5b41]/20 transition-all duration-200 group/btn">
              <img src="@/assets/images/icons/edit.svg" alt="edit"
                class="w-5 h-5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
              <span class="text-white text-sm font-semibold">{{ t('button.edit') }}</span>
            </button>
            <button @click="changeDeleteValue(data.id)"
              class="p-3 rounded-xl bg-[#2a2930] hover:bg-red-500/20 transition-all duration-200 group/btn"
              title="Delete">
              <img src="@/assets/images/icons/trash.svg" alt="delete"
                class="w-5 h-5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <BasePagination v-if="dishes.length > 0" v-model:datas="dishes" v-model:paginationPage="paginationPage" :size />

    <BaseDelete text="dashboard.tableHead.deleteMeal" v-model:openDelete="openDelete"
      @handleProcess="(value) => deleteMeal(value)" />
    <ManageDish text="dashboard.editText" v-model:dish="editDish" v-model:openManage="openManage" :error
      @handleProcess="(value) => editMeal(value)" />
    <ManageDish text="dashboard.addText" v-model:dish="newDish" v-model:openManage="openAdd" :error
      @handleProcess="(value) => addMeal(value)" />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import BasePagination from '@/components/BasePagination.vue'
import BaseDelete from '@/components/modal/BaseDelete.vue'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import type { IDish } from '@/types/menu'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ManageDish from '../../general/ManageDish.vue'
import { defaultDish } from '@/features/dashboard/utils/default'
import { useFreeDashboardStore } from '@/stores/freeDashboard'
import { ErrorMessageEnum } from '@/types'
import { notificationStore } from '@/stores'

const size = 6
const loading = ref(true)
const openDelete = ref(false)
const openManage = ref(false)
const openAdd = ref(false)
const mealId = ref('')
const error = ref('')
const editDish = ref<IDish>(defaultDish())
const newDish = ref<IDish>(defaultDish())
const paginationPage = ref(1)
const dishes = ref<IDish[]>([])

const { t } = useI18n()
const freeDashboardStore = useFreeDashboardStore()
const categoriesDashboardStore = useCategoriesDashboardStore()
const toastStore = notificationStore()

const categoryNameMap = computed(() => {
  const map = new Map<string, string>()
  categoriesDashboardStore.categories.forEach((cat) => {
    map.set(cat.id, cat.name)
  })
  return map
})

const getCategoryName = (categoryId: string): string => {
  return categoryNameMap.value.get(categoryId) || categoryId
}

const availableDishes = computed(() => {
  return dishes.value.filter((d) => d.isAvailable === 'available').length
})

const unavailableDishes = computed(() => {
  return dishes.value.filter((d) => d.isAvailable === 'unavailable').length
})

const changeDeleteValue = (id: string) => {
  openDelete.value = true
  mealId.value = id
  document.body.style.overflow = 'hidden'
}

const deleteMeal = async (value: boolean) => {
  if (value && mealId.value) {
    const success = await freeDashboardStore.deleteDish(mealId.value)
    if (success) {
      await getDishes()
    } else {
      console.error('Failed to delete meal:', freeDashboardStore.error)
    }
  }
}

const openManageDish = (value: IDish) => {
  openManage.value = true
  Object.assign(editDish.value, value)
  document.body.style.overflow = 'hidden'
}

const editMeal = async (value: IDish) => {
  const success = await freeDashboardStore.editDish(value)
  if (success) {
    await getDishes()
  } else {
    console.error('Failed to edit meal:', freeDashboardStore.error)
  }
}

const openAddDish = () => {
  newDish.value = defaultDish()
  openAdd.value = true
  document.body.style.overflow = 'hidden'
}

const addMeal = async (value: IDish) => {
  const response = await freeDashboardStore.addDish(value)
  if (response.success) {
    await getDishes()
  } else {
    if (response.error === ErrorMessageEnum.FreePlanItemsLimit) {
      toastStore.sendError(t('dashboard.menu.freePlanItemsLimit'))
    }
    console.error('Failed to add meal:', freeDashboardStore.error)
  }
}

const getDishes = async () => {
  const { success } = await freeDashboardStore.fetchDishes()
  if (success) {
    dishes.value = freeDashboardStore.dishes
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([getDishes(), categoriesDashboardStore.fetchCategories()])
  } finally {
    loading.value = false
  }
})
</script>

<style scoped></style>
