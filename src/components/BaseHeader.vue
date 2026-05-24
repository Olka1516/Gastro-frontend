<template>
  <header :class="[
    'fixed inset-x-0 top-0 z-1000 box-border h-20 w-full max-w-full transition-colors duration-500',
    getHeaderBG().value,
  ]">
    <div :class="[
      'mx-auto h-full min-w-0 w-full',
      'max-header:flex max-header:items-center max-header:justify-between max-header:gap-4 max-header:px-4 max-header:sm:px-6',
      'header:grid header:w-full header:items-center header:justify-center header:gap-0 header:px-46',
      !props.isMenuPage
        ? 'header:grid-cols-[200px_minmax(0,1fr)_200px] header:justify-items-center'
        : 'header:grid-cols-[minmax(0,1fr)_auto] header:justify-items-stretch',
    ]">
      <div :class="['min-w-0 shrink-0', props.isMenuPage && 'header:hidden']">
        <a v-if="!props.isMenuPage" href="/" class="logo" aria-label="На головну">
          <span class="text-white"> Gastro </span>
        </a>
        <ShowcaseHeaderBrand v-else-if="menuPlaceKey" :place-key="menuPlaceKey" />
      </div>

      <button ref="menuButtonRef" type="button"
        class="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#dc5b41]/80 text-white transition-colors hover:bg-white/5 header:hidden"
        :aria-expanded="sidebarOpen" :aria-controls="HEADER_SIDEBAR_PANEL_ID"
        :aria-label="sidebarOpen ? t('header.menuClose') : t('header.menuOpen')" @click="toggleSidebar">
        <img v-if="sidebarOpen" src="@/assets/images/icons/exit_white.svg" alt="" class="h-5 w-5" aria-hidden="true" />
        <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <path d="M4 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>

      <nav class="hidden min-w-0 header:flex" aria-label="Головна навігація">
        <ul class="flex flex-nowrap items-center gap-18">
          <li v-for="nav in navigations" :key="nav" class="shrink-0">
            <RouterLink v-if="props.isMenuPage && props.showcaseNavBasePath" :to="showcaseNavTo(nav)" :class="[
              showcaseLinkClass(nav).value,
              'inline-block whitespace-nowrap transition-colors duration-500',
            ]">
              {{ t(`navs.${nav.toLowerCase()}`) }}
            </RouterLink>
            <a v-else-if="!props.isMenuPage" :class="[linkColor(nav).value, 'transition-colors duration-300']"
              class="inline-block whitespace-nowrap transition-colors duration-500" @click="setActiveNav(nav)"
              :href="`#${nav.toLowerCase()}`">{{ t(`navs.${nav.toLowerCase()}`) }}</a>
            <a v-else :class="[linkColor(nav).value, 'transition-colors duration-300']"
              class="inline-block whitespace-nowrap transition-colors duration-500" :href="`#${nav.toLowerCase()}`">{{
                t(`navs.${nav.toLowerCase()}`) }}</a>
          </li>
        </ul>
      </nav>

      <nav v-if="
        props.isMenuPage && (props.showWishlist || props.isPremiumMenu || store.isUserAuthorized)
      " class="hidden w-auto shrink-0 flex-nowrap items-center justify-end gap-4 justify-self-end header:flex"
        aria-label="Меню закладу">
        <BaseLanguageSelector v-if="showMenuLanguageSelector" mode="menu" />
        <button v-if="props.showWishlist" type="button"
          class="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#dc5b41] text-white transition-colors hover:bg-white/5"
          :aria-label="t('showcase.wishlist.open')" @click="wishlistModalOpen = true">
          <span class="text-base leading-none" aria-hidden="true">♥</span>
          <span v-if="wishlistStore.count > 0"
            class="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#dc5b41] px-1 text-[10px] font-bold leading-none text-white">
            {{ wishlistStore.count > 99 ? '99+' : wishlistStore.count }}
          </span>
        </button>
        <button v-if="props.isPremiumMenu" type="button"
          class="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#dc5b41] transition-colors hover:bg-white/5"
          :aria-label="t('showcase.premium.cart')" @click="cartModalOpen = true">
          <img src="@/assets/images/icons/bag.svg" alt="" class="h-5 w-5" />
          <span v-if="cartBadgeCount > 0"
            class="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#dc5b41] px-1 text-[10px] font-bold leading-none text-white">
            {{ cartBadgeCount > 99 ? '99+' : cartBadgeCount }}
          </span>
        </button>
        <button v-if="showDashboardOnThisMenu" type="button"
          class="cursor-pointer whitespace-nowrap rounded-lg bg-[#dc5b41] px-3 py-1.5 text-sm text-white transition-transform duration-300 hover:scale-105"
          @click="changeRoute(LINK_TEMPLATES.DASHBOARD)">
          {{ t('button.dashboard') }}
        </button>
      </nav>

      <nav v-else-if="!props.isMenuPage" class="hidden items-center justify-end gap-8 header:flex"
        aria-label="Головна навігація">
        <BaseLanguageSelector v-if="showMenuLanguageSelector" mode="ui" />
        <ul class="flex gap-8" v-if="!store.isUserAuthorized">
          <li>
            <button @click="setOpenAuthModal(true, 'signUp')"
              class="cursor-pointer text-[#fff] bg-[#dc5b41] px-4 py-1 rounded-lg hover:scale-105 transition-transform duration-300">
              {{ t('button.signUp') }}
            </button>
          </li>
          <li>
            <button @click="setOpenAuthModal(true, 'signIn')"
              class="cursor-pointer text-[#fff] border border-[#dc5b41] px-4 py-1 rounded-lg hover:scale-105 transition-transform duration-300">
              {{ t('button.signIn') }}
            </button>
          </li>
        </ul>
        <ul class="flex gap-8" v-else>
          <li>
            <button @click="changeRoute(LINK_TEMPLATES.DASHBOARD)"
              class="cursor-pointer text-[#fff] bg-[#dc5b41] px-4 py-1 rounded-lg hover:scale-105 transition-transform duration-300">
              {{ t('button.dashboard') }}
            </button>
          </li>
          <li>
            <button @click="store.logOut"
              class="cursor-pointer text-[#fff] border border-[#dc5b41] px-4 py-1 rounded-lg hover:scale-105 transition-transform duration-300">
              {{ t('button.logOut') }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <BaseHeaderSidebar v-model="sidebarOpen" :trigger-anchor="sidebarTriggerAnchor" :navigations="navigations"
    :active-section="active" :is-menu-page="isMenuPage" :is-premium-menu="isPremiumMenu"
    :is-landing-page="isLandingPage" :showcase-nav-base-path="showcaseNavBasePath" :show-wishlist="showWishlist"
    @landing-nav="setActiveNav" @open-auth="(modal) => setOpenAuthModal(true, modal)"
    @open-dashboard="changeRoute(LINK_TEMPLATES.DASHBOARD)" @logout="store.logOut"
    @open-wishlist="wishlistModalOpen = true" @open-cart="cartModalOpen = true" />

  <AuthTeleportModals v-model:open="open" v-model:activeModal="activeModal"
    @handleProcess="changeRoute(LINK_TEMPLATES.DASHBOARD)" />

  <ShowcaseCartModal v-model="cartModalOpen" />
  <ShowcaseWishlistModal v-model="wishlistModalOpen" :show-add-to-cart="props.isPremiumMenu" />

  <div id="scrollArea" :style="{ '--limit-length': props.limit }"></div>
</template>

<script setup lang="ts">
import BaseHeaderSidebar from '@/components/modals/BaseHeaderSidebar.vue'
import BaseLanguageSelector from '@/components/BaseLanguageSelector.vue'
import AuthTeleportModals from '@/components/modals/auth/AuthTeleportModals.vue'
import { HEADER_SIDEBAR_PANEL_ID, useHeaderNav } from '@/components/header/useHeaderNav'
import { LINK_TEMPLATES } from '@/constants'
import ShowcaseCartModal from '@/features/showcase/components/ShowcaseCartModal.vue'
import ShowcaseHeaderBrand from '@/features/showcase/components/ShowcaseHeaderBrand.vue'
import ShowcaseWishlistModal from '@/features/showcase/components/ShowcaseWishlistModal.vue'
import { useShowcaseStore } from '@/stores/showcaseStore'
import { useUserStore } from '@/stores'
import { useShowcaseCartStore } from '@/stores/showcaseCartStore'
import { useShowcaseMenuLanguageStore } from '@/stores/showcaseMenuLanguageStore'
import { useShowcaseWishlistStore } from '@/stores/showcaseWishlistStore'
import type { ModalKey } from '@/types'
import { spaceToUnderscore } from '@/utils/textHelpers'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const store = useUserStore()
const showcaseStore = useShowcaseStore()
const router = useRouter()
const route = useRoute()

const props = withDefaults(
  defineProps<{
    limit: number
    navigations: string[]
    activeSection: string
    isMenuPage?: boolean
    isPremiumMenu?: boolean
    isLandingPage?: boolean
    showcaseNavBasePath?: string
    showWishlist?: boolean
  }>(),
  {
    isMenuPage: false,
    isPremiumMenu: false,
    isLandingPage: false,
    showcaseNavBasePath: undefined,
    showWishlist: false,
  },
)

const menuPlaceKey = computed(() => {
  if (!props.isMenuPage) return ''
  const id = route.params.id
  return typeof id === 'string' ? id.trim() : ''
})

const { t } = useI18n()
const active = ref(props.activeSection)
const isLimit = ref(true)
const open = ref(false)
const cartModalOpen = ref(false)
const wishlistModalOpen = ref(false)
const sidebarOpen = ref(false)
const menuButtonRef = ref<HTMLButtonElement | null>(null)
const sidebarTriggerAnchor = ref<{ x: number; y: number } | null>(null)
const wishlistStore = useShowcaseWishlistStore()
const cartStore = useShowcaseCartStore()
const menuLangStore = useShowcaseMenuLanguageStore()
const activeModal = ref<ModalKey>('signUp')

const { linkColor, showcaseNavTo, showcaseLinkClass, setActiveNav } = useHeaderNav(
  active,
  () => props.showcaseNavBasePath,
)

const cartBadgeCount = computed(() =>
  cartStore.linesInCart.reduce((sum, line) => sum + line.quantity, 0),
)

const showMenuLanguageSelector = computed(
  () => props.isLandingPage || (props.isMenuPage && props.isPremiumMenu),
)

const showDashboardOnThisMenu = computed(() => {
  if (!store.isUserAuthorized || !store.placeName) return false
  const slug = route.params.id
  if (typeof slug !== 'string' || !slug.trim()) return false
  return spaceToUnderscore(store.placeName) === slug.trim()
})

const options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0,
}

const callback: IntersectionObserverCallback = () => {
  isLimit.value = !isLimit.value
}

const observer = new IntersectionObserver(callback, options)

const getHeaderBG = () => {
  return computed(() =>
    isLimit.value ? ['backdrop-blur-md', 'bg-black/10'] : ['backdrop-blur-none', 'bg-transparent'],
  )
}

const toggleSidebar = () => {
  if (menuButtonRef.value) {
    const rect = menuButtonRef.value.getBoundingClientRect()
    sidebarTriggerAnchor.value = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }
  sidebarOpen.value = !sidebarOpen.value
}

const setOpenAuthModal = (key: boolean, nav: ModalKey) => {
  open.value = key
  activeModal.value = nav
  document.body.style.overflow = 'hidden'
}

const changeRoute = async (link: string) => {
  await router.push(link)
}

watch(
  () => props.activeSection,
  (value) => {
    active.value = value
  },
)

watch(
  () => route.fullPath,
  () => {
    sidebarOpen.value = false
  },
)

watch(
  () => [props.showWishlist, route.params.id] as const,
  ([show, id]) => {
    if (show && typeof id === 'string' && id) wishlistStore.load(id)
  },
  { immediate: true },
)

watch(
  () => [props.isPremiumMenu, route.params.id] as const,
  ([premium, id]) => {
    if (premium && typeof id === 'string' && id) cartStore.load(id)
  },
  { immediate: true },
)

watch(
  () => [props.isMenuPage, props.isPremiumMenu, route.params.id] as const,
  ([menuPage, premium, id]) => {
    if (menuPage && premium && typeof id === 'string' && id.trim()) {
      menuLangStore.enableForPlace(id.trim())
      return
    }
    if (menuPage && !premium) {
      menuLangStore.disable()
    }
  },
  { immediate: true },
)

watch(
  menuPlaceKey,
  (key) => {
    if (key) void showcaseStore.fetchPlaceBranding(key)
  },
  { immediate: true },
)

onMounted(() => {
  const target = document.querySelector('#scrollArea')
  if (target) {
    observer.observe(target)
  }
})

onUnmounted(() => {
  observer.disconnect()
  sidebarOpen.value = false
})
</script>
