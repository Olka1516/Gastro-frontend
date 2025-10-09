<template>
  <div :class="['grid transition-all duration-300', sidebarStyle]">
    <BaseSidebar :navs @handleProcess="(value) => getSidebarStyle(value)" :userInfo />
    <component :is="TableMenu" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseSidebar from '../general/BaseSidebar.vue'
import type { IUserData } from '@/types'
import TableMenu from './TableMenu.vue'

defineProps<{ userInfo: IUserData }>()
const navs = ['dashboard.standart.navs.home', 'dashboard.standart.navs.menu']
const isSidebarClosed = ref(false)

const getSidebarStyle = (value: boolean) => {
  isSidebarClosed.value = value
}

const sidebarStyle = computed(() => {
  return isSidebarClosed.value
    ? 'grid-cols-[minmax(0,0.1fr)_minmax(0,1fr)]'
    : 'grid-cols-[minmax(0,0.24fr)_minmax(0,1fr)]'
})
</script>

<style scoped></style>
