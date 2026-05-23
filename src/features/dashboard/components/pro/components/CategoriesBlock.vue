<template>
  <div
    class="flex min-h-screen min-w-0 flex-col gap-6 bg-[#0f0f11] p-4 sm:gap-8 sm:p-6 md:p-8 lg:p-12 md:pt-16 sm:pt-16">
    <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f11]/80 backdrop-blur-sm">
      <BaseLoader />
    </div>

    <div class="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex min-w-0 flex-col gap-2">
        <h2 class="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          {{ t('dashboard.tableHead.categories') }}
        </h2>
        <p class="text-sm text-gray-400">{{ t('dashboard.categories.subtitle') }}</p>
      </div>
      <button
        type="button"
        class="group flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 sm:w-auto sm:gap-3 sm:px-6"
        @click="openAddCategory">
        <img
          src="@/assets/images/icons/plus.svg"
          alt=""
          class="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
          aria-hidden="true" />
        {{ t('dashboard.tableHead.addCategory') }}
      </button>
    </div>

    <div
      v-if="categoriesList.length === 0"
      class="rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-8 text-center sm:p-12 md:p-16">
      <div class="flex flex-col items-center gap-4 sm:gap-5">
        <div
          class="flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] sm:h-24 sm:w-24">
          <img
            src="@/assets/images/icons/category.svg"
            alt=""
            class="h-10 w-10 sm:h-12 sm:w-12"
            style="filter: brightness(0) invert(1)" />
        </div>
        <h3 class="text-xl font-semibold text-white sm:text-2xl">
          {{ t('dashboard.tableHead.noCategories') }}
        </h3>
        <p class="max-w-md px-2 text-sm text-gray-400">
          {{ t('dashboard.categories.noCategoriesDescription') }}
        </p>
        <button
          type="button"
          class="mt-2 w-full rounded-lg bg-[#dc5b41] px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#e66a4f] sm:mt-4 sm:w-auto"
          @click="openAddCategory">
          {{ t('dashboard.tableHead.addCategory') }}
        </button>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="category in categoriesList.slice((paginationPage - 1) * size, paginationPage * size)"
        :key="category.id"
        class="group relative overflow-hidden rounded-lg border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-4 transition-all duration-300 hover:scale-[1.02] hover:border-[#dc5b41]/50 sm:p-6">
        <div
          class="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#dc5b41]/5 transition-transform duration-500 group-hover:scale-150 sm:h-32 sm:w-32" />

        <div class="relative z-10 flex flex-col gap-3 sm:gap-4">
          <div class="flex min-w-0 items-start justify-between">
            <div class="flex min-w-0 flex-1 items-center gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] sm:h-12 sm:w-12">
                <img
                  src="@/assets/images/icons/category.svg"
                  alt="category"
                  class="h-5 w-5 sm:h-6 sm:w-6"
                  style="filter: brightness(0) invert(1)" />
              </div>
              <div class="flex min-w-0 flex-1 flex-col">
                <h3 class="truncate text-base font-bold text-white sm:text-lg">{{ category.name }}</h3>
                <p class="text-xs text-gray-400">{{ t('dashboard.categories.category') }}</p>
              </div>
            </div>
          </div>

          <CategoryLanguageBadges :category="category" />

          <div class="mt-1 flex items-center gap-2 sm:mt-2">
            <button
              type="button"
              class="group/btn flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#2a2930] p-2.5 transition-all duration-200 hover:bg-[#dc5b41]/20"
              @click="openManageCategory(category)">
              <img
                src="@/assets/images/icons/edit.svg"
                alt="edit"
                class="h-4 w-4 shrink-0 opacity-60 transition-opacity group-hover/btn:opacity-100" />
              <span class="truncate text-sm font-medium text-white">{{ t('button.edit') }}</span>
            </button>
            <button
              type="button"
              class="group/btn shrink-0 rounded-lg bg-[#2a2930] p-2.5 transition-all duration-200 hover:bg-red-500/20"
              :aria-label="t('dashboard.tableHead.deleteCategory')"
              @click="changeDeleteValue(category.id)">
              <img
                src="@/assets/images/icons/trash.svg"
                alt="delete"
                class="h-4 w-4 opacity-60 transition-opacity group-hover/btn:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <BasePagination
      v-if="categoriesList.length > 0"
      v-model:datas="categoriesList as any"
      v-model:paginationPage="paginationPage"
      :size />

    <BaseDelete
      v-model:openDelete="openDelete"
      text="dashboard.tableHead.deleteCategory"
      @handleProcess="(value) => deleteCategoryHandler(value)" />
    <ManageCategory
      v-model:category="editCategoryData"
      v-model:openManage="openManage"
      text="dashboard.editCategoryText"
      multilingual
      :error
      @handleProcess="(value) => editCategoryHandler(value)" />
    <ManageCategory
      v-model:category="newCategory"
      v-model:openManage="openAdd"
      text="dashboard.addCategoryText"
      multilingual
      :error
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
import CategoryLanguageBadges from '../../general/CategoryLanguageBadges.vue'
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

const handleCategoryApiError = (apiError?: string) => {
  if (!apiError) return
  if (apiError === ErrorMessageEnum.CategoryTranslationsPremiumOnly) {
    toastStore.sendError(t('apiCategory.categoryTranslationsPremiumOnly'))
  }
}

const changeDeleteValue = (id: string) => {
  openDelete.value = true
  categoryId.value = id
  document.body.style.overflow = 'hidden'
}

const deleteCategoryHandler = async (value: boolean) => {
  if (value && categoryId.value) {
    const response = await categoriesDashboardStore.deleteCategory(categoryId.value)
    if (response.success) {
      await getCategories()
    } else {
      handleCategoryApiError(response.error)
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
  const response = await categoriesDashboardStore.editCategory(value)
  if (response.success) {
    await getCategories()
  } else {
    handleCategoryApiError(response.error)
    console.error('Failed to edit category:', categoriesDashboardStore.error)
  }
}

const openAddCategory = () => {
  newCategory.value = defaultCategory()
  openAdd.value = true
  document.body.style.overflow = 'hidden'
}

const addCategoryHandler = async (value: ICategory) => {
  const response = await categoriesDashboardStore.addCategory(value)
  if (response.success) {
    await getCategories()
  } else {
    handleCategoryApiError(response.error)
    console.error('Failed to add category:', categoriesDashboardStore.error)
  }
}

const getCategories = async () => {
  const { success } = await categoriesDashboardStore.fetchCategories()
  if (success) {
    categoriesList.value = categoriesDashboardStore.categories
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
