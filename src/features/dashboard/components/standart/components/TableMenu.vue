<template>
  <div class="p-12 flex flex-col items-center gap-12">
    <div class="flex items-center justify-between w-full">
      <h2 class="text-white">{{ t('dashboard.tableHead.table') }}</h2>
      <button @click="openAddDish" class="text-white bg-[#dc5b41] px-4 py-2 cursor-pointer">
        {{ t('dashboard.tableHead.addMeal') }}
      </button>
    </div>
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
          v-for="data in dishes.slice((paginationPage - 1) * size, paginationPage * size)"
          :key="data.id"
          class="bg-[#1a191f] text-center border border-gray-500"
        >
          <template v-for="(value, key) in data" :key="key">
            <img
              v-if="key === 'image' && typeof value === 'string'"
              class="w-35 h-30 object-cover object-center px-4 py-2 block mx-auto"
              :src="value"
              alt=""
            />
            <td v-else-if="tableHead.includes(key)" class="px-4 py-2 text-white text-sm">
              {{
                key === 'price'
                  ? Number(value).toFixed(2)
                  : key === 'category'
                    ? getCategoryName(value as string)
                    : value
              }}
            </td>
          </template>
          <td class="px-4 py-2">
            <button class="mr-8 cursor-pointer" @click="openManageDish(data)">
              <img src="@/assets/images/icons/edit.svg" alt="" />
            </button>
            <button class="cursor-pointer" @click="changeDeleteValue(data.id)">
              <img src="@/assets/images/icons/trash.svg" alt="" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <BasePagination v-model:datas="dishes" v-model:paginationPage="paginationPage" :size />
    <BaseDelete
      text="dashboard.tableHead.deleteMeal"
      v-model:openDelete="openDelete"
      @handleProcess="(value) => deleteMeal(value)"
    />
    <ManageDish
      text="dashboard.editText"
      v-model:dish="editDish"
      v-model:openManage="openManage"
      :error
      @handleProcess="(value) => editMeal(value)"
    />
    <ManageDish
      text="dashboard.addText"
      v-model:dish="newDish"
      v-model:openManage="openAdd"
      :error
      @handleProcess="(value) => addMeal(value)"
    />
  </div>
</template>

<script setup lang="ts">
import BasePagination from '@/components/BasePagination.vue'
import BaseDelete from '@/components/modal/BaseDelete.vue'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import { useStandartDashboardStore } from '@/stores/standartDashboard'
import type { IDish } from '@/types/menu'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ManageDish from '../../general/ManageDish.vue'
import { defaultDish } from '../utils/default'

const size = 5
const openDelete = ref(false)
const openManage = ref(false)
const openAdd = ref(false)
const mealId = ref('')
const error = ref('')
const editDish = ref<IDish>(defaultDish())
const newDish = ref<IDish>(defaultDish())
const paginationPage = ref(1)
const tableHead = ['name', 'price', 'category', 'image', 'settings']
const dishes = ref<IDish[]>([])

const { t } = useI18n()
const standartDashboardStore = useStandartDashboardStore()
const categoriesDashboardStore = useCategoriesDashboardStore()

// Маппінг ID -> назва категорії
const categoryNameMap = computed(() => {
  const map = new Map<string, string>()
  categoriesDashboardStore.categories.forEach((cat) => {
    map.set(cat.id, cat.name)
  })
  return map
})

// Функція для отримання назви категорії по ID
const getCategoryName = (categoryId: string): string => {
  return categoryNameMap.value.get(categoryId) || categoryId
}

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
  await Promise.all([getDishes(), categoriesDashboardStore.fetchCategories()])
})
</script>

<style scoped></style>
