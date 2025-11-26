<template>
  <div class="p-12 flex flex-col items-center gap-12">
    <div class="flex items-center justify-between w-full">
      <h2 class="text-white">Table</h2>
      <button @click="openAddDish" class="text-white bg-[#dc5b41] px-4 py-2 cursor-pointer">
        Add Meal
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
          v-for="data in tempData.slice((paginationPage - 1) * size, paginationPage * size)"
          :key="data.id"
          class="bg-[#1a191f] text-center border border-gray-500"
        >
          <template v-for="(value, key) in data" :key="key">
            <img
              class="w-30 px-4 py-2 block mx-auto"
              v-if="key === 'image'"
              src="https://h5p.org/sites/default/files/h5p/content/825/images/image-53e9e429bba63.jpg"
              alt=""
            />
            <td v-else-if="tableHead.includes(key)" class="px-4 py-2 text-white text-sm">
              {{ value }}
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
    <BasePagination v-model:datas="tempData" v-model:paginationPage="paginationPage" :size />
    <BaseDelete
      text="dashboard.tableHead.deleteMeal"
      v-model:openDelete="openDelete"
      @handleProcess="(value) => deleteMeal(value)"
    />
    <ManageDish
      text="dashboard.editText"
      v-model:dish="editDish"
      v-model:openManage="openManage"
      :category="tempCategory"
      :error
      @handleProcess="(value) => editMeal(value)"
    />
    <ManageDish
      text="dashboard.addText"
      v-model:dish="newDish"
      v-model:openManage="openAdd"
      :category="tempCategory"
      :error
      @handleProcess="(value) => addMeal(value)"
    />
  </div>
</template>

<script setup lang="ts">
import BasePagination from '@/components/BasePagination.vue'
import BaseDelete from '@/components/modal/BaseDelete.vue'
import { useStandartDashboardStore } from '@/stores/standartDashboard'
import type { IDish } from '@/types/menu'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ManageDish from '../general/ManageDish.vue'

const size = 5
const openDelete = ref(false)
const openManage = ref(false)
const openAdd = ref(false)
const mealId = ref('')
const error = ref('')
const editDish = ref<IDish>({
  name: '',
  image: '',
  price: 0,
  description: '',
  category: '',
  id: '',
  isAvailable: 'available',
  ownerId: '',
})
const newDish = ref<IDish>({
  name: '',
  image: '',
  price: 0,
  description: '',
  category: '',
  id: '',
  isAvailable: 'available',
  ownerId: '',
})
const paginationPage = ref(1)
const tableHead = ['name', 'image', 'price', 'category', 'settings']
const tempCategory = reactive(['meal', 'breakfast', 'diner'])
const tempData: IDish[] = [
  {
    name: 'test 1',
    image:
      'https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA',
    price: 10,
    category: 'meal',
    description: 'test test tets',
    id: '1',
    isAvailable: 'available',
    ownerId: '',
  },
  {
    name: 'test 2',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '2',
    isAvailable: 'available',
    ownerId: '',
  },
  {
    name: 'test 3',
    image: 'lal',
    price: 10,
    description: 'test test tets',
    category: 'meal',
    id: '3',
    isAvailable: 'available',
    ownerId: '',
  },
  {
    name: 'test 4',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '4',
    isAvailable: 'available',
    ownerId: '',
  },
  {
    name: 'test 5',
    image: 'lal',
    price: 10,
    description: 'test test tets',
    category: 'meal',
    id: '5',
    isAvailable: 'available',
    ownerId: '',
  },
  {
    name: 'test 6',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '6',
    isAvailable: 'available',
    ownerId: '',
  },
  {
    name: 'test 7',
    image: 'lal',
    price: 10,
    category: 'meal',
    description: 'test test tets',
    id: '7',
    isAvailable: 'available',
    ownerId: '',
  },
  {
    name: 'test 8',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '8',
    isAvailable: 'available',
    ownerId: '',
  },
  {
    name: 'test 9',
    image: 'lal',
    price: 10,
    description: 'test test tets',
    category: 'meal',
    id: '9',
    isAvailable: 'available',
    ownerId: '',
  },
  {
    name: 'test 10',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '10',
    isAvailable: 'available',
    ownerId: '',
  },
  {
    name: 'test 11',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '11',
    isAvailable: 'available',
    ownerId: '',
  },
]

const { t } = useI18n()
const standartDashboardStore = useStandartDashboardStore()

const changeDeleteValue = (id: string) => {
  openDelete.value = true
  mealId.value = id
  document.body.style.overflow = 'hidden'
}
const deleteMeal = async (value: boolean) => {
  if (value && mealId.value) {
    const success = await standartDashboardStore.deleteDish(mealId.value)
    if (success) {
      // Видаляємо з локальних даних після успішного видалення
      const index = tempData.findIndex((dish) => dish.id === mealId.value)
      if (index !== -1) {
        tempData.splice(index, 1)
      }
      console.log('Deleted meal with id:', mealId.value)
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
    // Оновлюємо локальні дані після успішного редагування
    const index = tempData.findIndex((dish) => dish.id === value.id)
    if (index !== -1) {
      tempData[index] = { ...value }
    }
  } else {
    console.error('Failed to edit meal:', standartDashboardStore.error)
  }
}

const openAddDish = () => {
  openAdd.value = true
  Object.assign(newDish.value, {
    name: '',
    image: '',
    price: undefined,
    description: '',
    category: '',
    id: '',
  })
  document.body.style.overflow = 'hidden'
}

const addMeal = async (value: IDish) => {
  const success = await standartDashboardStore.addDish(value)
  if (success) {
    // Оновлюємо локальні дані після успішного додавання
    const newMeal = {
      ...value,
      id: Date.now().toString(), // Тимчасовий ID, поки не отримаємо з бекенду
      ownerId: 'current-user-id',
    }
    tempData.push(newMeal)
    console.log('Added new meal:', newMeal)
  } else {
    console.error('Failed to add meal:', standartDashboardStore.error)
  }
}
</script>

<style scoped></style>
