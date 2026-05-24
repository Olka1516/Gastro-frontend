<template>
  <div class="flex h-full min-h-0 flex-col overflow-hidden p-4 sm:p-5 lg:p-6">
    <div v-if="!hideProfile" class="mb-6 transition-all duration-300 lg:mb-8">
      <div :class="['mb-2 flex items-center gap-3', isDesktop && isClose ? 'justify-center' : '']">
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] shadow-lg sm:h-10 sm:w-10"
          :title="isDesktop && isClose ? userInfo.placeName : undefined">
          <span class="text-base font-bold text-white sm:text-lg">{{ initials }}</span>
        </div>
        <div v-if="showExpandedContent" class="min-w-0 overflow-hidden">
          <h2 class="truncate text-base font-bold text-white sm:text-xl">
            {{ userInfo.placeName }}
          </h2>
          <p class="truncate text-xs text-gray-400">{{ userInfo.email }}</p>
        </div>
      </div>
      <div v-if="showExpandedContent"
        class="mt-3 h-px bg-gradient-to-r from-transparent via-[#dc5b41]/30 to-transparent sm:mt-4" />
    </div>

    <nav class="custom-scrollbar flex-1 overflow-y-auto">
      <ul class="space-y-1.5 sm:space-y-2">
        <li v-for="data in navs" :key="data.name">
          <button :class="[
            'group relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 transition-all duration-200 sm:px-4 sm:py-3',
            isActive(data)
              ? 'bg-gradient-to-r from-[#dc5b41]/20 to-[#e66a4f]/20 text-[#dc5b41] shadow-md'
              : 'text-gray-300 hover:bg-[#2a2930] hover:text-white',
            isDesktop && isClose ? 'justify-center px-2' : '',
          ]" :title="isDesktop && isClose ? t(data.name) : ''" @click="$emit('nav', data)">
            <div v-if="isActive(data)"
              class="absolute bottom-0 left-0 top-0 w-1 rounded-r bg-gradient-to-b from-[#dc5b41] to-[#e66a4f]" />

            <div :class="[
              'flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-200',
              isActive(data) ? 'scale-100' : 'group-hover:scale-105',
              isDesktop && isClose ? 'mx-auto' : '',
            ]">
              <img v-if="data.image" :src="getIconPath(data.image)" :alt="t(data.name)" class="h-5 w-5"
                :style="getIconStyle(data)" />
            </div>

            <span v-if="showExpandedContent" :class="[
              'whitespace-nowrap text-sm font-medium transition-all duration-200',
              isActive(data) ? 'font-semibold' : '',
            ]">
              {{ t(data.name) }}
            </span>
          </button>
        </li>
      </ul>
    </nav>

    <div class="flex flex-col gap-2 mt-2">
      <SidebarPlanSwitcher :show-expanded-content="showExpandedContent" :is-desktop="isDesktop" :is-close="isClose" />

      <button type="button" :class="[
        'flex w-full cursor-pointer items-center gap-3 rounded-lg border border-[#dc5b41]/60 px-3 py-2 text-gray-300 transition-all duration-200 hover:bg-[#dc5b41]/15 hover:text-white sm:px-4 sm:py-2.5',
        isDesktop && isClose ? 'justify-center' : '',
      ]" :title="isDesktop && isClose ? t('button.logOut') : undefined" :aria-label="t('button.logOut')"
        @click="$emit('logout')">
        <img :src="getIconPath('logout')" :alt="t('button.logOut')" class="h-5 w-5 shrink-0" />
        <span v-if="showExpandedContent" class="text-sm font-medium">{{ t('button.logOut') }}</span>
      </button>

      <div class="my-3 border-t border-[#2a2930] transition-all duration-300 sm:my-4" />
      <div v-if="showExpandedContent" class="flex flex-col items-center">
        <p class="text-xs leading-tight text-gray-500">Gastro Dashboard</p>
        <p class="mt-1 text-[10px] leading-tight text-gray-600">v1.0.0</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '@/common/functions'
import type { IUserData } from '@/types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IBaseSidebarData } from '../../types'
import SidebarPlanSwitcher from './SidebarPlanSwitcher.vue'

const props = defineProps<{
  navs: IBaseSidebarData[]
  userInfo: IUserData
  activeNav?: IBaseSidebarData
  showExpandedContent: boolean
  isDesktop: boolean
  isClose: boolean
  hideProfile?: boolean
}>()

defineEmits<{
  (e: 'nav', data: IBaseSidebarData): void
  (e: 'logout'): void
}>()

const { t } = useI18n()

const initials = computed(() => {
  const placeName = props.userInfo.placeName || ''
  return (
    placeName
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'G'
  )
})

const isActive = (nav: IBaseSidebarData) => props.activeNav?.name === nav.name

const getIconPath = (imageName: string) => {
  const normalized = imageName === 'qrCode' ? 'qrcode' : imageName
  return getImage(`../assets/images/icons/${normalized}.svg`)
}

const getIconStyle = (nav: IBaseSidebarData) => {
  if (isActive(nav)) {
    return {
      filter:
        'brightness(0) saturate(100%) invert(54%) sepia(87%) saturate(2067%) hue-rotate(341deg) brightness(98%) contrast(87%)',
    }
  }
  return {
    filter: 'brightness(0) invert(1)',
  }
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #dc5b41 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #dc5b41, #e66a4f);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
