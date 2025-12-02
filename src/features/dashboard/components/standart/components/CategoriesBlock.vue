<template>
  <div class="p-12 flex flex-col items-center gap-12">
    <div class="flex items-center justify-between w-full">
      <h2 class="text-white">{{ t('dashboard.tableHead.categories') }}</h2>
      <button @click="openAddCategory" class="text-white bg-[#dc5b41] px-4 py-2 cursor-pointer">
        {{ t('dashboard.tableHead.addCategory') }}
      </button>
    </div>
    <div v-if="categoriesList.length === 0" class="w-full text-center py-12">
      <p class="text-white text-lg">{{ t('dashboard.tableHead.noCategories') }}</p>
    </div>
    <template v-else>
      <table class="min-w-full border-collapse text-sm">
        <thead class="bg-[#dc5b41]">
          <tr>
            <th v-for="value in tableHead" :key="value" class="px-4 py-2 text-white">
              {{ t(`dashboard.tableHead.${value}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categoriesList.slice(
              (paginationPage - 1) * size,
              paginationPage * size,
            )"
            :key="category.id"
            class="bg-[#1a191f] text-center border border-gray-500"
          >
            <td class="px-4 py-2 text-white text-sm">{{ category.name }}</td>
            <td class="px-4 py-2">
              <button class="mr-8 cursor-pointer" @click="openManageCategory(category)">
                <img src="@/assets/images/icons/edit.svg" alt="" />
              </button>
              <button class="cursor-pointer" @click="changeDeleteValue(category.id)">
                <img src="@/assets/images/icons/trash.svg" alt="" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <BasePagination
        v-model:datas="categoriesList as any"
        v-model:paginationPage="paginationPage"
        :size
      />
    </template>
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

const size = 5
const openDelete = ref(false)
const openManage = ref(false)
const openAdd = ref(false)
const categoryId = ref('')
const error = ref('')
const editCategoryData = ref<ICategory>(defaultCategory())
const newCategory = ref<ICategory>(defaultCategory())
const paginationPage = ref(1)
const tableHead = ['name', 'settings']
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
