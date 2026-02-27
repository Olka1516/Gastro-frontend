<template>
  <div :class="['grid transition-all duration-300', sidebarStyle]">
    <BaseSidebar
      :navs="navs"
      :userInfo
      :activeNav="activeNav"
      @handleProcess="(value) => getSidebarStyle(value)"
      @handleNav="handleNav"
    />
    <component :is="activeNav.component" @navigateTo="navigateTo" />
  </div>
</template>

<script setup lang="ts">
import type { IUserData } from '@/types'  
import { computed, markRaw, ref } from 'vue'
import type { IBaseSidebarData } from '../../types'
import BaseSidebar from '../general/BaseSidebar.vue'
import Categories from './components/CategoriesBlock.vue'
import HomeBlock from './components/HomeBlock.vue'
import SettingsBlock from './components/SettingsBlock.vue'
import TableMenu from './components/TableMenu.vue'
import QRCodeBlock from './components/QRCodeBlock.vue'

defineProps<{ userInfo: IUserData }>()

const navs = [
  { name: 'dashboard.standart.navs.home', component: markRaw(HomeBlock), image: 'home' },
  { name: 'dashboard.standart.navs.menu', component: markRaw(TableMenu), image: 'table' },
  { name: 'dashboard.standart.navs.categories', component: markRaw(Categories), image: 'category' },
  { name: 'dashboard.standart.navs.qrCode', component: markRaw(QRCodeBlock), image: 'qrCode' },
  {
    name: 'dashboard.standart.navs.settings',
    component: markRaw(SettingsBlock),
    image: 'settings',
  },
]

const activeNav = ref<IBaseSidebarData>(navs[0])

const isSidebarClosed = ref(false)

const getSidebarStyle = (value: boolean) => {
  isSidebarClosed.value = value
}

const handleNav = (data: IBaseSidebarData) => {
  activeNav.value = data
}

const navigateTo = (key: string) => {
  const nav = navs.find((n) => n.name.includes(key))
  if (nav) {
    activeNav.value = nav
  }
}

const sidebarStyle = computed(() => {
  return isSidebarClosed.value
    ? 'grid-cols-[minmax(0,0.1fr)_minmax(0,1fr)]'
    : 'grid-cols-[minmax(0,0.24fr)_minmax(0,1fr)]'
})
</script>

<style scoped></style>
