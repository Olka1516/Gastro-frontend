<template>
  <div
    class="min-h-screen min-w-0 bg-[#0f0f11] p-4 sm:p-6 md:p-8 lg:p-12 sm:pt-[64px] lg:pt-[64px] md:pt-[64px] flex flex-col gap-6 sm:gap-8">
    <div v-if="loading" class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <BaseLoader />
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
      <div class="flex flex-col gap-2 min-w-0">
        <h2 class="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
          {{ t('dashboard.tableHead.categories') }}
        </h2>
        <p class="text-gray-400 text-sm">{{ t('dashboard.categories.subtitle') }}</p>
      </div>
      <button @click="openAddCategory"
        class="w-full sm:w-auto shrink-0 text-white bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-5 sm:px-6 py-3 cursor-pointer rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2 sm:gap-3 group">
        <span class="text-2xl group-hover:rotate-90 transition-transform duration-300 leading-none">+</span>
        {{ t('dashboard.tableHead.addCategory') }}
      </button>
    </div>

    <div v-if="categoriesList.length === 0"
      class="bg-[#1a191f] rounded-xl sm:rounded-2xl border border-[#2a2930] p-8 sm:p-12 md:p-16 text-center">
      <div class="flex flex-col items-center gap-4 sm:gap-5">
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-xl sm:rounded-2xl flex items-center justify-center">
          <img src="@/assets/images/icons/category.svg" alt="" class="w-10 h-10 sm:w-12 sm:h-12"
            style="filter: brightness(0) invert(1)" />
        </div>
        <h3 class="text-white text-xl sm:text-2xl font-semibold">
          {{ t('dashboard.tableHead.noCategories') }}
        </h3>
        <p class="text-gray-400 text-sm max-w-md px-2">
          {{ t('dashboard.categories.noCategoriesDescription') }}
        </p>
        <button @click="openAddCategory"
          class="mt-2 sm:mt-4 w-full sm:w-auto text-white bg-[#dc5b41] px-6 py-3 rounded-xl hover:bg-[#e66a4f] transition-all duration-300 hover:scale-105 font-semibold">
          {{ t('dashboard.tableHead.addCategory') }}
        </button>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="category in categoriesList.slice((paginationPage - 1) * size, paginationPage * size)"
        :key="category.id"
        class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#2a2930] hover:border-[#dc5b41]/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden">
        <div
          class="absolute -right-8 -top-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#dc5b41]/5 rounded-full group-hover:scale-150 transition-transform duration-500">
        </div>

        <div class="relative z-10 flex flex-col gap-3 sm:gap-4">
          <div class="flex items-start justify-between min-w-0">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-lg sm:rounded-xl flex items-center justify-center">
                <img src="@/assets/images/icons/category.svg" alt="category" class="w-5 h-5 sm:w-6 sm:h-6"
                  style="filter: brightness(0) invert(1)" />
              </div>
              <div class="flex flex-col min-w-0 flex-1">
                <h3 class="text-white text-base sm:text-lg font-bold truncate">
                  {{ category.name }}
                </h3>
                <p class="text-gray-400 text-xs">{{ t('dashboard.categories.category') }}</p>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 mt-1 sm:mt-2">
            <button @click="openManageCategory(category)"
              class="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#2a2930] hover:bg-[#dc5b41]/20 transition-all duration-200 group/btn min-w-0">
              <img src="@/assets/images/icons/edit.svg" alt="edit"
                class="w-4 h-4 shrink-0 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
              <span class="text-white text-sm font-medium truncate">{{ t('button.edit') }}</span>
            </button>
            <button @click="changeDeleteValue(category.id)"
              class="p-2.5 shrink-0 rounded-lg bg-[#2a2930] hover:bg-red-500/20 transition-all duration-200 group/btn"
              title="Delete">
              <img src="@/assets/images/icons/trash.svg" alt="delete"
                class="w-4 h-4 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <BasePagination v-if="categoriesList.length > 0" v-model:datas="categoriesList as any"
      v-model:paginationPage="paginationPage" :size />

    <BaseDelete text="dashboard.tableHead.deleteCategory" v-model:openDelete="openDelete"
      @handleProcess="(value) => deleteCategoryHandler(value)" />
    <ManageCategory text="dashboard.editCategoryText" v-model:category="editCategoryData"
      v-model:openManage="openManage" :error @handleProcess="(value) => editCategoryHandler(value)" />
    <ManageCategory text="dashboard.addCategoryText" v-model:category="newCategory" v-model:openManage="openAdd" :error
      @handleProcess="(value) => addCategoryHandler(value)" />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import BasePagination from '@/components/BasePagination.vue'
import BaseDelete from '@/components/modals/BaseDelete.vue'
import { defaultCategory } from '@/features/dashboard/utils/default'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import { notificationStore } from '@/stores/notificationStore'
import { ErrorMessageEnum } from '@/types'
import type { ICategory } from '@/types/menu'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ManageCategory from '../../general/ManageCategory.vue'

const size = 6
const loading = ref(true)
const openDelete = ref(false)
const openManage = ref(false)
const openAdd = ref(false)
const categoryId = ref('')
const error = ref('')
const editCategoryData = ref<ICategory>(defaultCategory())
const newCategory = ref<ICategory>(defaultCategory())
const paginationPage = ref(1)
const categoriesList = ref<ICategory[]>([])

const { t } = useI18n()
const categoriesDashboardStore = useCategoriesDashboardStore()
const toastStore = notificationStore()

const changeDeleteValue = (id: string) => {
  openDelete.value = true
  categoryId.value = id
  document.body.style.overflow = 'hidden'
}

const deleteCategoryHandler = async (value: boolean) => {
  if (value && categoryId.value) {
    const success = await categoriesDashboardStore.deleteCategory(categoryId.value)
    if (success) {
      await getCategories()
    } else {
      console.error('Failed to delete category:', categoriesDashboardStore.error)
    }
  }
}

const openManageCategory = (value: ICategory) => {
  openManage.value = true
  Object.assign(editCategoryData.value, value)
  document.body.style.overflow = 'hidden'
}

const editCategoryHandler = async (value: ICategory) => {
  const success = await categoriesDashboardStore.editCategory(value)
  if (success) {
    await getCategories()
  } else {
    console.error('Failed to edit category:', categoriesDashboardStore.error)
  }
}

const openAddCategory = () => {
  newCategory.value = defaultCategory()
  openAdd.value = true
  document.body.style.overflow = 'hidden'
}

const getCategories = async () => {
  const { success } = await categoriesDashboardStore.fetchCategories()
  if (success) {
    categoriesList.value = categoriesDashboardStore.categories
  }
}

const addCategoryHandler = async (value: ICategory) => {
  const response = await categoriesDashboardStore.addCategory(value)
  if (response.success) {
    await getCategories()
  } else {
    if (response.error === ErrorMessageEnum.FreePlanItemsLimit) {
      toastStore.sendError(t('dashboard.categories.freePlanItemsLimit'))
    }
    console.error('Failed to add category:', categoriesDashboardStore.error)
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await getCategories()
  } finally {
    loading.value = false
  }
})
</script>
