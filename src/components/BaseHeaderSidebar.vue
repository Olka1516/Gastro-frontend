<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="header-sidebar-overlay fixed inset-0 z-[1001] overflow-hidden overscroll-none lg:hidden"
      @keydown.esc="close"
    >
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        @click="close"
      />
      <aside
        :id="HEADER_SIDEBAR_PANEL_ID"
        class="header-sidebar-panel absolute inset-y-0 right-0 flex flex-col border-l border-[#2a2930] bg-gradient-to-b from-[#1a191f] to-[#0f0f11] shadow-2xl"
        role="dialog"
        :aria-modal="true"
        :aria-label="t('header.sidebarNav')"
      >
        <div class="flex items-center justify-between border-b border-[#2a2930] px-5 py-5">
          <a href="/" class="logo" aria-label="На головну" @click="close">
            <span class="text-lg font-semibold text-white">Gastro</span>
          </a>
          <button
            type="button"
            class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#dc5b41]/80 text-white transition-colors hover:bg-white/5"
            :aria-label="t('header.menuClose')"
            @click="close"
          >
            <img src="@/assets/images/icons/exit_white.svg" alt="" class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div class="custom-scrollbar flex flex-1 flex-col justify-between gap-6 overflow-y-auto px-5 py-6">
          <nav aria-label="Головна навігація">
            <ul class="flex flex-col gap-1">
              <li v-for="nav in navigations" :key="`sidebar-${nav}`">
                <RouterLink
                  v-if="isMenuPage && showcaseNavBasePath"
                  :to="showcaseNavTo(nav)"
                  :class="[
                    showcaseLinkClass(nav).value,
                    'block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-300 hover:bg-white/5',
                  ]"
                  @click="close"
                >
                  {{ t(`navs.${nav.toLowerCase()}`) }}
                </RouterLink>
                <a
                  v-else-if="!isMenuPage"
                  :class="[linkColor(nav).value, 'transition-colors duration-300']"
                  class="block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-300 hover:bg-white/5"
                  :href="`#${nav.toLowerCase()}`"
                  @click="onLandingNav(nav)"
                >
                  {{ t(`navs.${nav.toLowerCase()}`) }}
                </a>
                <a
                  v-else
                  :class="[linkColor(nav).value, 'transition-colors duration-300']"
                  class="block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-300 hover:bg-white/5"
                  :href="`#${nav.toLowerCase()}`"
                  @click="close"
                >
                  {{ t(`navs.${nav.toLowerCase()}`) }}
                </a>
              </li>
            </ul>
          </nav>

          <div
            v-if="isMenuPage && (showWishlist || isPremiumMenu || store.isUserAuthorized)"
            class="flex flex-col gap-4 border-t border-[#2a2930] pt-6"
            aria-label="Меню закладу"
          >
            <MenuLanguageSelector v-if="showMenuLanguageSelector" mode="menu" />
            <button
              v-if="showWishlist"
              type="button"
              class="relative flex w-full cursor-pointer items-center gap-3 rounded-lg border border-[#dc5b41] px-4 py-3 text-left text-white transition-colors hover:bg-white/5"
              :aria-label="t('showcase.wishlist.open')"
              @click="emitOpenWishlist"
            >
              <span class="text-base leading-none" aria-hidden="true">♥</span>
              <span>{{ t('showcase.wishlist.open') }}</span>
              <span
                v-if="wishlistStore.count > 0"
                class="ml-auto flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#dc5b41] px-1.5 text-xs font-bold text-white"
              >
                {{ wishlistStore.count > 99 ? '99+' : wishlistStore.count }}
              </span>
            </button>
            <button
              v-if="isPremiumMenu"
              type="button"
              class="relative flex w-full cursor-pointer items-center gap-3 rounded-lg border border-[#dc5b41] px-4 py-3 text-left text-white transition-colors hover:bg-white/5"
              :aria-label="t('showcase.premium.cart')"
              @click="emitOpenCart"
            >
              <img src="@/assets/images/icons/bag.svg" alt="" class="h-5 w-5" />
              <span>{{ t('showcase.premium.cart') }}</span>
              <span
                v-if="cartBadgeCount > 0"
                class="ml-auto flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#dc5b41] px-1.5 text-xs font-bold text-white"
              >
                {{ cartBadgeCount > 99 ? '99+' : cartBadgeCount }}
              </span>
            </button>
            <button
              v-if="showDashboardOnThisMenu"
              type="button"
              class="w-full cursor-pointer rounded-lg bg-[#dc5b41] px-4 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
              @click="emitOpenDashboard"
            >
              {{ t('button.dashboard') }}
            </button>
          </div>

          <div
            v-else-if="!isMenuPage"
            class="flex flex-col gap-4 border-t border-[#2a2930] pt-6"
            aria-label="Головна навігація"
          >
            <MenuLanguageSelector v-if="showMenuLanguageSelector" mode="ui" />
            <template v-if="!store.isUserAuthorized">
              <button
                type="button"
                class="w-full cursor-pointer rounded-lg bg-[#dc5b41] px-4 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
                @click="emitOpenAuth('signUp')"
              >
                {{ t('button.signUp') }}
              </button>
              <button
                type="button"
                class="w-full cursor-pointer rounded-lg border border-[#dc5b41] px-4 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
                @click="emitOpenAuth('signIn')"
              >
                {{ t('button.signIn') }}
              </button>
            </template>
            <template v-else>
              <button
                type="button"
                class="w-full cursor-pointer rounded-lg bg-[#dc5b41] px-4 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
                @click="emitOpenDashboard"
              >
                {{ t('button.dashboard') }}
              </button>
              <button
                type="button"
                class="w-full cursor-pointer rounded-lg border border-[#dc5b41] px-4 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
                @click="emitLogout"
              >
                {{ t('button.logOut') }}
              </button>
            </template>
          </div>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import MenuLanguageSelector from '@/components/MenuLanguageSelector.vue'
import { HEADER_SIDEBAR_PANEL_ID, useHeaderNav } from '@/components/header/useHeaderNav'
import { useUserStore } from '@/stores'
import { useShowcaseCartStore } from '@/stores/showcaseCartStore'
import { useShowcaseWishlistStore } from '@/stores/showcaseWishlistStore'
import type { ModalKey } from '@/types'
import { spaceToUnderscore } from '@/utils/textHelpers'
import { computed, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
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

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'landing-nav': [nav: string]
  'open-auth': [modal: ModalKey]
  'open-dashboard': []
  logout: []
  'open-wishlist': []
  'open-cart': []
}>()

const { t } = useI18n()
const route = useRoute()
const store = useUserStore()
const wishlistStore = useShowcaseWishlistStore()
const cartStore = useShowcaseCartStore()

const { linkColor, showcaseNavTo, showcaseLinkClass } = useHeaderNav(
  () => props.activeSection,
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

const setBodyScrollLock = (locked: boolean) => {
  const overflow = locked ? 'hidden' : ''
  document.documentElement.style.overflow = overflow
  document.documentElement.style.overflowX = overflow
  document.body.style.overflow = overflow
  document.body.style.overflowX = overflow
}

const close = () => {
  emit('update:modelValue', false)
}

const onLandingNav = (nav: string) => {
  emit('landing-nav', nav)
  close()
}

const emitOpenAuth = (modal: ModalKey) => {
  close()
  emit('open-auth', modal)
}

const emitOpenDashboard = () => {
  close()
  emit('open-dashboard')
}

const emitLogout = () => {
  close()
  emit('logout')
}

const emitOpenWishlist = () => {
  close()
  emit('open-wishlist')
}

const emitOpenCart = () => {
  close()
  emit('open-cart')
}

watch(
  () => props.modelValue,
  (open) => setBodyScrollLock(open),
  { immediate: true },
)

watch(
  () => route.fullPath,
  () => close(),
)

onUnmounted(() => {
  setBodyScrollLock(false)
})
</script>

<style scoped>
.header-sidebar-overlay {
  width: 100%;
  max-width: 100%;
}

.header-sidebar-panel {
  width: min(20rem, 85%);
  max-width: 85%;
  overscroll-behavior: contain;
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
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #dc5b41, #e66a4f);
  border-radius: 3px;
}
</style>
