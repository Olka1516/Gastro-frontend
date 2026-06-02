<template>
  <button v-if="!isDesktop && !isMobileOpen" ref="menuButtonRef" type="button"
    class="fixed right-3 top-3 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-[#dc5b41]/80 bg-[#1a191f]/95 text-white shadow-lg backdrop-blur-sm transition hover:bg-[#2a2930] lg:hidden"
    :aria-label="t('header.menuOpen')" @click="openMobileDrawer">
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M4 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>

  <aside v-if="isDesktop" aria-label="Sidebar"
    class="relative sticky top-0 z-auto flex h-screen w-full flex-col border-r border-[#2a2930] bg-gradient-to-b from-[#1a191f] to-[#0f0f11]">
    <div
      class="absolute top-5 -right-3 z-10 flex h-10 w-6 items-center justify-center rounded-r-lg bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] shadow-lg transition-all duration-300 hover:scale-105">
      <button type="button"
        class="flex h-full w-full cursor-pointer items-center justify-center rounded-[inherit] p-1.5 transition hover:bg-white/10"
        aria-label="Toggle sidebar" @click="toggleDesktopCollapse">
        <img :class="[
          'h-4 w-4 transition-transform duration-300 filter brightness-0 invert',
          getStyleImg,
        ]" src="@/assets/images/icons/arrow-left.svg" alt="" />
      </button>
    </div>

    <BaseSidebarInner :navs="navs" :user-info="userInfo" :active-nav="activeNav"
      :show-expanded-content="showExpandedContent" :is-desktop="true" :is-close="isClose" @nav="handleNavClick"
      @logout="handleLogOut" />
  </aside>

  <Teleport to="body">
    <Transition name="sidebar" :duration="{ enter: 560, leave: 580 }">
      <div v-if="!isDesktop && isMobileOpen"
        class="dashboard-sidebar-overlay fixed inset-0 z-[1001] overflow-hidden overscroll-none lg:hidden"
        :style="originStyle" @keydown.esc="closeMobileDrawer">
        <div class="dashboard-sidebar-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true"
          @click="closeMobileDrawer" />
        <aside aria-label="Sidebar"
          class="dashboard-sidebar-panel fixed inset-y-0 right-0 flex w-full max-w-full flex-col overscroll-contain border-l border-[#2a2930] bg-gradient-to-b from-[#1a191f] to-[#0f0f11] shadow-2xl"
          role="dialog" :aria-modal="true">
          <div class="dashboard-sidebar-content flex h-full min-h-0 flex-col">
            <div class="flex shrink-0 items-center justify-between border-b border-[#2a2930] px-5 py-4">
              <div class="min-w-0 pr-3">
                <h2 class="truncate text-lg font-bold text-white">{{ userInfo.placeName }}</h2>
                <p class="truncate text-xs text-gray-400">{{ userInfo.email }}</p>
              </div>
              <button type="button"
                class="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#dc5b41]/80 text-white transition-colors hover:bg-white/5"
                :aria-label="t('header.menuClose')" @click="closeMobileDrawer">
                <img src="@/assets/images/icons/exit_white.svg" alt="" class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <BaseSidebarInner class="flex-1 min-h-0" :navs="navs" :user-info="userInfo" :active-nav="activeNav"
              :show-expanded-content="true" :is-desktop="false" :is-close="false" hide-profile @nav="handleNavClick"
              @logout="handleLogOut" />
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { IUserData } from '@/types'
import { useBodyScrollLock } from '@/utils/bodyScrollLock'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import type { IBaseSidebarData } from '../../types'
import BaseSidebarInner from './BaseSidebarInner.vue'

const LG_BREAKPOINT = '(min-width: 1024px)'

const { t } = useI18n()
const store = useUserStore()
const router = useRouter()

defineProps<{
  navs: IBaseSidebarData[]
  userInfo: IUserData
  activeNav?: IBaseSidebarData
}>()

const emit = defineEmits<{
  (e: 'handleProcess', value: boolean): void
  (e: 'handleNav', data: IBaseSidebarData): void
}>()

const menuButtonRef = ref<HTMLButtonElement | null>(null)
const isClose = ref(false)
const isMobileOpen = ref(false)
const isDesktop = ref(true)
const triggerAnchor = ref<{ x: number; y: number } | null>(null)

const showExpandedContent = computed(() => !isClose.value)

const getStyleImg = computed(() => (isClose.value ? 'rotate-180' : ''))

const originStyle = computed(() => {
  const anchor = triggerAnchor.value
  const fallbackX = typeof window !== 'undefined' ? window.innerWidth - 32 : 0
  const fallbackY = 28
  return {
    '--sidebar-origin-x': `${anchor?.x ?? fallbackX}px`,
    '--sidebar-origin-y': `${anchor?.y ?? fallbackY}px`,
  }
})

let mediaQuery: MediaQueryList | null = null

const syncBreakpoint = () => {
  isDesktop.value = mediaQuery?.matches ?? window.innerWidth >= 1024
  if (isDesktop.value) {
    isMobileOpen.value = false
  }
}

onMounted(() => {
  mediaQuery = window.matchMedia(LG_BREAKPOINT)
  syncBreakpoint()
  mediaQuery.addEventListener('change', syncBreakpoint)
})

onUnmounted(() => {
  mediaQuery?.removeEventListener('change', syncBreakpoint)
})

useBodyScrollLock(() => isMobileOpen.value && !isDesktop.value)

const emitCollapseState = () => {
  emit('handleProcess', isClose.value)
}

const openMobileDrawer = () => {
  const el = menuButtonRef.value
  if (el) {
    const rect = el.getBoundingClientRect()
    triggerAnchor.value = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  } else {
    triggerAnchor.value = {
      x: typeof window !== 'undefined' ? window.innerWidth - 32 : 0,
      y: 28,
    }
  }
  isMobileOpen.value = true
}

const closeMobileDrawer = () => {
  isMobileOpen.value = false
}

const toggleDesktopCollapse = () => {
  isClose.value = !isClose.value
  emitCollapseState()
}

const handleNavClick = (data: IBaseSidebarData) => {
  emit('handleNav', data)
  if (!isDesktop.value) {
    closeMobileDrawer()
  }
}

const handleLogOut = async () => {
  closeMobileDrawer()
  store.logOut()
  await router.push('/')
}
</script>

<style scoped>
.dashboard-sidebar-overlay {
  width: 100%;
  max-width: 100%;
}

.sidebar-enter-active .dashboard-sidebar-backdrop {
  transition: opacity 0.35s ease-out;
}

.sidebar-enter-active .dashboard-sidebar-panel {
  transition: clip-path 0.52s cubic-bezier(0.22, 1, 0.36, 1);
}

.sidebar-enter-active .dashboard-sidebar-content {
  transition:
    opacity 0.3s ease-out 0.24s,
    transform 0.36s cubic-bezier(0.22, 1, 0.36, 1) 0.24s;
}

.sidebar-enter-from .dashboard-sidebar-backdrop {
  opacity: 0;
}

.sidebar-enter-from .dashboard-sidebar-panel {
  clip-path: circle(0px at var(--sidebar-origin-x) var(--sidebar-origin-y));
}

.sidebar-enter-from .dashboard-sidebar-content {
  opacity: 0;
  transform: translateX(1rem);
}

.sidebar-enter-to .dashboard-sidebar-backdrop {
  opacity: 1;
}

.sidebar-enter-to .dashboard-sidebar-panel {
  clip-path: circle(150vmax at var(--sidebar-origin-x) var(--sidebar-origin-y));
}

.sidebar-enter-to .dashboard-sidebar-content {
  opacity: 1;
  transform: translateX(0);
}

.sidebar-leave-active .dashboard-sidebar-content {
  transition:
    opacity 0.18s ease-in,
    transform 0.2s ease-in;
}

.sidebar-leave-active .dashboard-sidebar-panel {
  transition: clip-path 0.48s cubic-bezier(0.55, 0, 1, 0.45) 0.1s;
}

.sidebar-leave-active .dashboard-sidebar-backdrop {
  transition: opacity 0.3s ease-in 0.28s;
}

.sidebar-leave-from .dashboard-sidebar-backdrop {
  opacity: 1;
}

.sidebar-leave-from .dashboard-sidebar-panel {
  clip-path: circle(150vmax at var(--sidebar-origin-x) var(--sidebar-origin-y));
}

.sidebar-leave-from .dashboard-sidebar-content {
  opacity: 1;
  transform: translateX(0);
}

.sidebar-leave-to .dashboard-sidebar-backdrop {
  opacity: 0;
}

.sidebar-leave-to .dashboard-sidebar-panel {
  clip-path: circle(0px at var(--sidebar-origin-x) var(--sidebar-origin-y));
}

.sidebar-leave-to .dashboard-sidebar-content {
  opacity: 0;
  transform: translateX(0.75rem);
}

@media (prefers-reduced-motion: reduce) {

  .sidebar-enter-active .dashboard-sidebar-backdrop,
  .sidebar-enter-active .dashboard-sidebar-panel,
  .sidebar-enter-active .dashboard-sidebar-content,
  .sidebar-leave-active .dashboard-sidebar-backdrop,
  .sidebar-leave-active .dashboard-sidebar-panel,
  .sidebar-leave-active .dashboard-sidebar-content {
    transition: none !important;
  }

  .sidebar-enter-from .dashboard-sidebar-content,
  .sidebar-leave-to .dashboard-sidebar-content {
    transform: none;
  }
}
</style>
