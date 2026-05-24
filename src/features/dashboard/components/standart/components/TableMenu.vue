<template>
  <div
    class="flex min-h-screen min-w-0 flex-col gap-6 bg-[#0f0f11] p-4 sm:gap-8 sm:p-6 md:p-8 lg:p-12 md:pt-16 sm:pt-16">
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f11]/80 backdrop-blur-sm">
      <BaseLoader />
    </div>

    <div class="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex min-w-0 flex-col gap-2">
        <h2 class="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          {{ t('dashboard.tableHead.table') }}
        </h2>
        <p class="text-sm text-gray-400">{{ t('dashboard.menu.subtitle') }}</p>
      </div>
      <BaseButton
        variant="gradient"
        class="w-full shrink-0 sm:w-auto"
        :icon="plusIcon"
        :text="t('dashboard.tableHead.addMeal')"
        @click="openAddDish"
      />
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      <div class="rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-4">
        <p class="mb-1 text-xs uppercase tracking-wider text-gray-400">
          {{ t('dashboard.menu.total') }}
        </p>
        <p class="text-xl font-bold tabular-nums text-white sm:text-2xl">{{ dishes.length }}</p>
      </div>
      <div class="rounded-lg border border-green-500/20 bg-gradient-to-br from-green-500/10 to-[#0f0f11] p-4">
        <p class="mb-1 text-xs uppercase tracking-wider text-gray-400">
          {{ t('dashboard.home.available') }}
        </p>
        <p class="text-xl font-bold tabular-nums text-green-400 sm:text-2xl">{{ availableDishes }}</p>
      </div>
      <div class="rounded-lg border border-red-500/20 bg-gradient-to-br from-red-500/10 to-[#0f0f11] p-4">
        <p class="mb-1 text-xs uppercase tracking-wider text-gray-400">
          {{ t('dashboard.home.unavailable') }}
        </p>
        <p class="text-xl font-bold tabular-nums text-red-400 sm:text-2xl">{{ unavailableDishes }}</p>
      </div>
    </div>

    <div
      v-if="dishes.length === 0"
      class="rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-8 text-center sm:p-12 md:p-20">
      <div class="flex flex-col items-center gap-4 sm:gap-6">
        <div
          class="flex h-24 w-24 items-center justify-center rounded-lg bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] shadow-[0_20px_60px_rgb(220,91,65,0.3)] sm:h-32 sm:w-32">
          <span class="text-5xl sm:text-6xl">🍽️</span>
        </div>
        <h3 class="text-2xl font-bold text-white sm:text-3xl">{{ t('dashboard.menu.noDishes') }}</h3>
        <p class="max-w-md px-2 text-sm text-gray-400 sm:text-base">{{ t('dashboard.menu.addFirstDish') }}</p>
        <BaseButton
          variant="gradient"
          size="large"
          class="mt-2 shadow-lg sm:mt-4 sm:w-auto"
          block
          :text="t('dashboard.tableHead.addMeal')"
          @click="openAddDish"
        />
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="data in dishes.slice((paginationPage - 1) * size, paginationPage * size)"
        :key="data.id"
        class="group flex h-full flex-col overflow-hidden rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-[#dc5b41]/50 hover:shadow-[0_20px_60px_rgba(220,91,65,0.2)]">
        <div class="relative h-44 overflow-hidden sm:h-52 md:h-56">
          <img
            v-if="typeof data.image === 'string'"
            :src="data.image"
            alt="dish"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent" />

          <div class="absolute right-3 top-3 sm:right-4 sm:top-4">
            <span
              :class="[
                'rounded-full px-2.5 py-1 text-[0.625rem] font-semibold shadow-lg backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-xs',
                data.isAvailable === 'available'
                  ? 'border border-green-500/30 bg-green-500/20 text-green-300'
                  : 'border border-red-500/30 bg-red-500/20 text-red-300',
              ]">
              {{
                data.isAvailable === 'available'
                  ? '✓ ' + t('dashboard.available')
                  : '✗ ' + t('dashboard.unavailable')
              }}
            </span>
          </div>

          <div class="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <div
              class="rounded-lg bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-3 py-1.5 shadow-lg backdrop-blur-md sm:px-4 sm:py-2">
              <span class="text-lg font-bold tabular-nums text-white sm:text-xl">
                {{ formatPrice(Number(data.price)) }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-6">
          <div class="flex min-w-0 flex-col gap-2">
            <h3 class="line-clamp-1 text-lg font-bold text-white sm:text-xl">{{ data.name }}</h3>
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center gap-1.5 rounded-full bg-[#2a2930] px-3 py-1 text-xs font-medium text-gray-300">
                <span class="h-1.5 w-1.5 rounded-full bg-[#dc5b41]" />
                {{ getCategoryName(data.category) }}
              </span>
            </div>
          </div>

          <p class="line-clamp-2 text-sm leading-relaxed text-gray-400">
            {{ data.description || t('dashboard.menu.noDescription') }}
          </p>

          <div class="mt-auto flex items-center gap-2 border-t border-[#2a2930] pt-3 sm:pt-4">
            <button
              type="button"
              class="group/btn flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#2a2930] py-2.5 transition-all duration-200 hover:bg-[#dc5b41]/20 sm:py-3"
              @click="openManageDish(data)">
              <img
                src="@/assets/images/icons/edit.svg"
                alt="edit"
                class="h-4 w-4 shrink-0 opacity-60 transition-opacity group-hover/btn:opacity-100 sm:h-5 sm:w-5" />
              <span class="truncate text-sm font-semibold text-white">{{ t('button.edit') }}</span>
            </button>
            <button
              type="button"
              class="group/btn shrink-0 rounded-lg bg-[#2a2930] p-2.5 transition-all duration-200 hover:bg-red-500/20 sm:p-3"
              :aria-label="t('dashboard.tableHead.deleteMeal')"
              @click="changeDeleteValue(data.id)">
              <img
                src="@/assets/images/icons/trash.svg"
                alt="delete"
                class="h-5 w-5 opacity-60 transition-opacity group-hover/btn:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <BasePagination
      v-if="dishes.length > 0"
      v-model:datas="dishes"
      v-model:paginationPage="paginationPage"
      :size />

    <BaseDelete
      v-model:openDelete="openDelete"
      text="dashboard.tableHead.deleteMeal"
      @handleProcess="(value) => deleteMeal(value)" />
    <ManageDish
      v-model:dish="editDish"
      v-model:openManage="openManage"
      text="dashboard.editText"
      :error
      @handleProcess="(value) => editMeal(value)" />
    <ManageDish
      v-model:dish="newDish"
      v-model:openManage="openAdd"
      text="dashboard.addText"
      :error
      @handleProcess="(value) => addMeal(value)" />
  </div>
</template>

<script setup lang="ts">
import plusIcon from '@/assets/images/icons/plus.svg'
import BaseButton from '@/components/BaseButton.vue'
import BaseLoader from '@/components/BaseLoader.vue'
import BasePagination from '@/components/BasePagination.vue'
import BaseDelete from '@/components/modals/BaseDelete.vue'
import { useDashboardCurrency } from '@/features/dashboard/composables/useDashboardCurrency'
import { defaultDish } from '@/features/dashboard/utils/default'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import { useStandartDashboardStore } from '@/stores/standartDashboard'
import type { IDish } from '@/types/menu'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ManageDish from '../../general/ManageDish.vue'

const { formatPrice } = useDashboardCurrency()

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
const standartDashboardStore = useStandartDashboardStore()
const categoriesDashboardStore = useCategoriesDashboardStore()

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
    const success = await standartDashboardStore.deleteDish(mealId.value)
    if (success) {
      await getDishes()
    } else {
      console.error('Failed to delete meal:', standartDashboardStore.error)
    }
  }
}

const openManageDish = (value: IDish) => {
  openManage.value = true
  Object.assign(editDish.value, value)
  document.body.style.overflow = 'hidden'
}

const editMeal = async (value: IDish) => {
  const success = await standartDashboardStore.editDish(value)
  if (success) {
    await getDishes()
  } else {
    console.error('Failed to edit meal:', standartDashboardStore.error)
  }
}

const openAddDish = () => {
  newDish.value = defaultDish()
  openAdd.value = true
  document.body.style.overflow = 'hidden'
}

const addMeal = async (value: IDish) => {
  const success = await standartDashboardStore.addDish(value)
  if (success) {
    await getDishes()
  } else {
    console.error('Failed to add meal:', standartDashboardStore.error)
  }
}

const getDishes = async () => {
  const { success } = await standartDashboardStore.fetchDishes()
  if (success) {
    dishes.value = standartDashboardStore.dishes
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
