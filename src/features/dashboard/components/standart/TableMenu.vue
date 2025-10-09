<template>
  <div class="p-12 flex flex-col items-center gap-12">
    <h2 class="text-white">Table</h2>
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
  </div>
</template>

<script setup lang="ts">
import BasePagination from '@/components/BasePagination.vue'
import BaseDelete from '@/components/modal/BaseDelete.vue'
import type { IDish } from '@/types/menu'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ManageDish from '../general/ManageDish.vue'

const size = 2
const openDelete = ref(false)
const openManage = ref(false)
const mealId = ref('')
const error = ref('')
const editDish = ref<IDish>({
  name: '',
  image: '',
  price: 0,
  description: '',
  id: '',
})
const paginationPage = ref(1)
const tableHead = ['name', 'image', 'price', 'category', 'settings']
const tempCategory = reactive(['meal', 'breakfast', 'diner'])
const tempData = [
  {
    name: 'test 1',
    image: 'lal',
    price: 10,
    category: 'meal',
    description: 'test test tets',
    id: '1',
  },
  {
    name: 'test 2',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '2',
  },
  {
    name: 'test 3',
    image: 'lal',
    price: 10,
    description: 'test test tets',
    category: 'meal',
    id: '3',
  },
  {
    name: 'test 4',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '4',
  },
  { name: 'test 5', image: 'lal', price: 10, description: 'test test tets', id: '5' },
  {
    name: 'test 6',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '6',
  },
  {
    name: 'test 7',
    image: 'lal',
    price: 10,
    category: 'meal',
    description: 'test test tets',
    id: '7',
  },
  {
    name: 'test 8',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '8',
  },
  {
    name: 'test 9',
    image: 'lal',
    price: 10,
    description: 'test test tets',
    category: 'meal',
    id: '9',
  },
  {
    name: 'test 10',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '10',
  },
  {
    name: 'test 11',
    image: 'lala',
    description: 'test test tets 2',
    price: 40,
    category: 'meal',
    id: '11',
  },
]

const { t } = useI18n()

const changeDeleteValue = (id: string) => {
  openDelete.value = true
  mealId.value = id
  document.body.style.overflow = 'hidden'
}
const deleteMeal = (value: boolean) => {
  if (value) {
    console.log('id', mealId.value)
  }
}

const openManageDish = (value: IDish) => {
  openManage.value = true
  Object.assign(editDish.value, value)
  document.body.style.overflow = 'hidden'
}

const editMeal = (value: IDish) => {
  console.log(value)
}
</script>

<style scoped></style>
