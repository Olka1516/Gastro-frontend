<template>
  <div :class="['grid transition-all duration-300', sidebarStyle]">
    <BaseSidebar
      :navs="navs"
      :userInfo
      @handleProcess="(value) => getSidebarStyle(value)"
      @handleNav="handleNav"
    />
    <component :is="activeNav.component" />
  </div>
</template>

<script setup lang="ts">
import type { IUserData } from '@/types'
import { computed, ref } from 'vue'
import type { IBaseSidebarData } from '../../types'
import BaseSidebar from '../general/BaseSidebar.vue'
import Categories from './components/CategoriesBlock.vue'
import TableMenu from './components/TableMenu.vue'

defineProps<{ userInfo: IUserData }>()

const navs = [
  { name: 'dashboard.standart.navs.home', component: Categories },
  { name: 'dashboard.standart.navs.menu', component: TableMenu },
  { name: 'dashboard.standart.navs.categories', component: Categories },
]

const activeNav = ref<IBaseSidebarData>(navs[0])

const isSidebarClosed = ref(false)

const getSidebarStyle = (value: boolean) => {
  isSidebarClosed.value = value
}

const handleNav = (data: IBaseSidebarData) => {
  activeNav.value = data
}

const sidebarStyle = computed(() => {
  return isSidebarClosed.value
    ? 'grid-cols-[minmax(0,0.1fr)_minmax(0,1fr)]'
    : 'grid-cols-[minmax(0,0.24fr)_minmax(0,1fr)]'
})
</script>

<style scoped></style>
