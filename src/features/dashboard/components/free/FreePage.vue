<template>
  <div
    class="grid min-h-screen w-full grid-cols-1 transition-all duration-300"
    :class="sidebarStyle">
    <BaseSidebar
      :navs="navs"
      :userInfo
      :activeNav="activeNav"
      @handleProcess="(value) => getSidebarStyle(value)"
      @handleNav="handleNav" />
    <div class="min-w-0 overflow-x-hidden">
      <component :is="activeNav.component" @navigateTo="navigateTo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserData } from '@/types';
import { computed, markRaw, ref } from 'vue';
import type { IBaseSidebarData } from '../../types';
import BaseSidebar from '../general/BaseSidebar.vue';
import QRCodeBlock from '../general/QRCodeBlock.vue';
import SettingsBlock from '../general/SettingsBlock.vue';
import CategoriesBlock from './components/CategoriesBlock.vue';
import HomeBlock from './components/HomeBlock.vue';
import TableMenu from './components/TableMenu.vue';

defineProps<{ userInfo: IUserData }>()

const navs = [
  { name: 'dashboard.free.navs.home', component: markRaw(HomeBlock), image: 'home' },
  { name: 'dashboard.free.navs.menu', component: markRaw(TableMenu), image: 'table' },
  { name: 'dashboard.free.navs.categories', component: markRaw(CategoriesBlock), image: 'category' },
  { name: 'dashboard.free.navs.qrCode', component: markRaw(QRCodeBlock), image: 'qrCode' },
  {
    name: 'dashboard.free.navs.settings',
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
    ? 'lg:grid-cols-[minmax(4.5rem,0.09fr)_minmax(0,1fr)]'
    : 'lg:grid-cols-[minmax(13rem,0.24fr)_minmax(0,1fr)]'
})
</script>
