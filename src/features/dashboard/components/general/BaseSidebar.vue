<template>
  <aside aria-label="Sidebar"
    class="bg-gradient-to-b from-[#1a191f] to-[#0f0f11] h-screen sticky top-0 relative border-r border-[#2a2930] transition-all duration-300">
    <div
      class="absolute top-6 -right-3 w-6 h-10 bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] flex justify-center items-center rounded-r-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-10">
      <button class="cursor-pointer p-1.5 hover:bg-white/10 rounded transition-all duration-200" @click="changeClose"
        aria-label="Toggle sidebar">
        <img :class="[
          'transition-transform duration-300 w-4 h-4 filter brightness-0 invert',
          getStyleImg,
        ]" src="@/assets/images/icons/arrow-left.svg" alt="" />
      </button>
    </div>

    <div class="h-full flex flex-col p-6 overflow-hidden">
      <div class="mb-8 transition-all duration-300">
        <div class="flex items-center gap-3 mb-2">
          <div v-if="!isClose"
            class="w-10 h-10 bg-gradient-to-br from-[#dc5b41] to-[#e66a4f] rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
            <span class="text-white font-bold text-lg">{{ getInitials }}</span>
          </div>
          <div v-if="!isClose" class="overflow-hidden">
            <h2 class="text-white text-xl font-bold truncate">{{ userInfo.placeName }}</h2>
            <p class="text-gray-400 text-xs truncate">{{ userInfo.email }}</p>
          </div>
          <div v-else class="w-full">
            <h2 class="text-white text-lg font-bold text-center truncate px-1">
              {{ userInfo.placeName }}
            </h2>
          </div>
        </div>
        <div v-if="!isClose" class="h-px bg-gradient-to-r from-transparent via-[#dc5b41]/30 to-transparent mt-4"></div>
        <div v-else class="h-px bg-gradient-to-r from-transparent via-[#dc5b41]/30 to-transparent mt-2 mx-2"></div>
      </div>

      <nav class="flex-1 overflow-y-auto custom-scrollbar">
        <ul class="space-y-2">
          <li v-for="data in navs" :key="data.name">
            <button :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden',
              isActive(data)
                ? 'bg-gradient-to-r from-[#dc5b41]/20 to-[#e66a4f]/20 text-[#dc5b41] shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-[#2a2930]',
              isClose ? 'justify-center px-2' : '',
            ]" @click="$emit('handleNav', data)" :title="isClose ? t(data.name) : ''">
              <div v-if="isActive(data)"
                class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#dc5b41] to-[#e66a4f] rounded-r"></div>

              <div :class="[
                'w-5 h-5 flex items-center justify-center flex-shrink-0 transition-transform duration-200',
                isActive(data) ? 'scale-100' : 'group-hover:scale-105',
                isClose ? 'mx-auto' : '',
              ]">
                <img v-if="data.image" :src="getIconPath(data.image)" :alt="t(data.name)" :class="['w-5 h-5']"
                  :style="getIconStyle(data)" />
              </div>

              <span v-if="!isClose" :class="[
                'font-medium text-sm transition-all duration-200 whitespace-nowrap',
                isActive(data) ? 'font-semibold' : '',
              ]">
                {{ t(data.name) }}
              </span>
            </button>
          </li>
        </ul>
      </nav>

      <div :class="['flex flex-col', isClose ? 'gap-2' : '']">
        <button type="button" :class="[
          'cursor-pointer flex items-center rounded-lg border border-[#dc5b41]/60 text-gray-300 hover:text-white hover:bg-[#dc5b41]/15 transition-all duration-200 w-full gap-3 px-4 py-2.5',
          ,
          isClose ? 'justify-center' : '',
        ]" :title="isClose ? t('button.logOut') : undefined" :aria-label="t('button.logOut')" @click="handleLogOut">
          <img :src="getIconPath('logout')" :alt="t('button.logOut')" class="w-5 h-5" />
          <span v-if="!isClose" class="font-medium text-sm">{{ t('button.logOut') }}</span>
        </button>

        <div :class="['transition-all duration-300 my-4 border-t border-[#2a2930]']"></div>
        <div :class="['flex flex-col items-center', isClose ? 'w-full text-center px-0.5' : '']">
          <p class="text-gray-500 text-xs leading-tight">Gastro Dashboard</p>
          <p class="text-gray-600 text-[10px] mt-1 leading-tight">v1.0.0</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { getImage } from '@/common/functions'
import { useUserStore } from '@/stores'
import type { IUserData } from '@/types'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { IBaseSidebarData } from '../../types'

const { t } = useI18n()
const store = useUserStore()
const router = useRouter()

const props = defineProps<{
  navs: IBaseSidebarData[]
  userInfo: IUserData
  activeNav?: IBaseSidebarData
}>()

const emit = defineEmits<{
  (e: 'handleProcess', value: boolean): void
  (e: 'handleNav', data: IBaseSidebarData): void
}>()

const isClose = ref(false)

const getStyleImg = computed(() => {
  return isClose.value ? 'rotate-180' : ''
})

const changeClose = () => {
  isClose.value = !isClose.value
  emit('handleProcess', isClose.value)
}

const handleLogOut = async () => {
  store.logOut()
  await router.push('/')
}

const isActive = (nav: IBaseSidebarData) => {
  return props.activeNav?.name === nav.name
}

const getInitials = computed(() => {
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

const getIconPath = (imageName: string) => {
  return getImage(`../assets/images/icons/${imageName}.svg`)
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
@keyframes hideElement {
  from {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-10px);
  }
}

@keyframes showElement {
  from {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }
}

.hide-element {
  animation: hideElement 0.3s ease-in-out forwards;
}

.show-element {
  animation: showElement 0.3s ease-in-out forwards;
}

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
  transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #e66a4f, #dc5b41);
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: transparent;
}

aside {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
