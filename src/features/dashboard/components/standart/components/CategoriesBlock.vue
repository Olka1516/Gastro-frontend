<template>
  <div class="p-12 flex flex-col gap-8 min-h-screen bg-[#0f0f11]">
    <!-- Header -->
    <div class="flex items-center justify-between w-full">
      <div class="flex flex-col gap-2">
        <h2 class="text-white text-3xl font-bold">{{ t('dashboard.tableHead.categories') }}</h2>
        <p class="text-gray-400 text-sm">{{ t('dashboard.categories.subtitle') }}</p>
      </div>
      <button
        @click="openAddCategory"
        class="text-white bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] px-6 py-3 cursor-pointer rounded-2xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-3 group"
      >
        <span class="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
        {{ t('dashboard.tableHead.addCategory') }}
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-if="categoriesList.length === 0"
      class="bg-[#1a191f] rounded-2xl border border-[#2a2930] p-16 text-center"
    >
      <div class="flex flex-col items-center gap-4">
        <div
          class="w-24 h-24 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-2xl flex items-center justify-center"
        >
          <span class="text-5xl">📂</span>
        </div>
        <h3 class="text-white text-2xl font-semibold">
          {{ t('dashboard.tableHead.noCategories') }}
        </h3>
        <p class="text-gray-400 text-sm max-w-md">
          {{ t('dashboard.categories.noCategoriesDescription') }}
        </p>
        <button
          @click="openAddCategory"
          class="mt-4 text-white bg-[#dc5b41] px-6 py-3 rounded-xl hover:bg-[#e66a4f] transition-all duration-300 hover:scale-105"
        >
          {{ t('dashboard.tableHead.addCategory') }}
        </button>
      </div>
    </div>

    <!-- Categories Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="category in categoriesList.slice((paginationPage - 1) * size, paginationPage * size)"
        :key="category.id"
        class="bg-gradient-to-br from-[#1a191f] to-[#0f0f11] p-6 rounded-2xl border border-[#2a2930] hover:border-[#dc5b41]/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
      >
        <!-- Background decoration -->
        <div
          class="absolute -right-8 -top-8 w-32 h-32 bg-[#dc5b41]/5 rounded-full group-hover:scale-150 transition-transform duration-500"
        ></div>

        <!-- Content -->
        <div class="relative z-10 flex flex-col gap-4">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-xl flex items-center justify-center"
              >
                <img
                  src="@/assets/images/icons/category.svg"
                  alt="category"
                  class="w-6 h-6"
                  style="filter: brightness(0) invert(1)"
                />
              </div>
              <div class="flex flex-col">
                <h3 class="text-white text-lg font-bold">{{ category.name }}</h3>
                <p class="text-gray-400 text-xs">{{ t('dashboard.categories.category') }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 mt-2">
            <button
              @click="openManageCategory(category)"
              class="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#2a2930] hover:bg-[#dc5b41]/20 transition-all duration-200 group/btn"
            >
              <img
                src="@/assets/images/icons/edit.svg"
                alt="edit"
                class="w-4 h-4 opacity-60 group-hover/btn:opacity-100 transition-opacity"
              />
              <span class="text-white text-sm font-medium">{{ t('button.edit') }}</span>
            </button>
            <button
              @click="changeDeleteValue(category.id)"
              class="p-2.5 rounded-lg bg-[#2a2930] hover:bg-red-500/20 transition-all duration-200 group/btn"
              title="Delete"
            >
              <img
                src="@/assets/images/icons/trash.svg"
                alt="delete"
                class="w-4 h-4 opacity-60 group-hover/btn:opacity-100 transition-opacity"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <BasePagination
      v-if="categoriesList.length > 0"
      v-model:datas="categoriesList as any"
      v-model:paginationPage="paginationPage"
      :size
    />

    <!-- Modals -->
    <BaseDelete
      text="dashboard.tableHead.deleteCategory"
      v-model:openDelete="openDelete"
      @handleProcess="(value) => deleteCategoryHandler(value)"
    />
    <ManageCategory
      text="dashboard.editCategoryText"
      v-model:category="editCategoryData"
      v-model:openManage="openManage"
      :error
      @handleProcess="(value) => editCategoryHandler(value)"
    />
    <ManageCategory
      text="dashboard.addCategoryText"
      v-model:category="newCategory"
      v-model:openManage="openAdd"
      :error
      @handleProcess="(value) => addCategoryHandler(value)"
    />
  </div>
</template>

<script setup lang="ts">
import BasePagination from '@/components/BasePagination.vue'
import BaseDelete from '@/components/modal/BaseDelete.vue'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import type { ICategory } from '@/types/menu'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ManageCategory from '../../general/ManageCategory.vue'
import { defaultCategory } from '../utils/default'

const size = 6
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

const addCategoryHandler = async (value: ICategory) => {
  const success = await categoriesDashboardStore.addCategory(value)
  if (success) {
    await getCategories()
  } else {
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
  await getCategories()
})
</script>

<style scoped></style>
