<template>
  <header :class="[
    'w-full fixed z-1000 h-20 grid justify-items-center justify-center px-46 items-center transition-colors duration-500',
    getHeaderBG().value,
    !props.isMenuPage ? 'grid-cols-[200px_minmax(0,1fr)_200px]' : 'grid-cols-[0fr_1fr]',
  ]">
    <div v-if="!props.isMenuPage">
      <a href="/" class="logo" aria-label="На головну">
        <span class="text-white"> Gastro </span>
      </a>
    </div>

    <nav aria-label="Головна навігація">
      <ul class="flex gap-18">
        <li v-for="nav in navigations" :key="nav">
          <a v-if="!props.isMenuPage" :class="[linkColor(nav).value, 'transition-colors duration-300']"
            class="transition-colors duration-500" @click="setActiveNav(nav)" :href="`#${nav.toLowerCase()}`">{{
              t(`navs.${nav.toLowerCase()}`) }}</a>
          <a v-else :class="[linkColor(nav).value, 'transition-colors duration-300']"
            class="transition-colors duration-500" :href="`#${nav.toLowerCase()}`">{{ t(`navs.${nav.toLowerCase()}`)
            }}</a>
        </li>
      </ul>
    </nav>

    <nav v-if="props.isMenuPage && (props.isPremiumMenu || store.isUserAuthorized)"
      class="flex w-[200px] flex-wrap items-center justify-end gap-12 justify-self-end" aria-label="Меню закладу">
      <button v-if="props.isPremiumMenu" type="button"
        class="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#dc5b41]"
        :aria-label="t('showcase.premium.cart')" @click="cartModalOpen = true">
        <img src="@/assets/images/icons/bag.svg" alt="" class="h-5 w-5" />
      </button>
      <button v-if="store.isUserAuthorized" type="button"
        class="cursor-pointer whitespace-nowrap rounded-lg bg-[#dc5b41] px-3 py-1.5 text-sm text-white transition-transform duration-300 hover:scale-105"
        @click="changeRoute(LINK_TEMPLATES.DASHBOARD)">
        {{ t('button.dashboard') }}
      </button>
    </nav>

    <nav v-else-if="!props.isMenuPage" aria-label="Головна навігація">
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
  </header>
  <AuthTeleportModals v-model:open="open" v-model:activeModal="activeModal"
    @handleProcess="changeRoute(LINK_TEMPLATES.DASHBOARD)" />

  <ShowcaseCartModal v-model="cartModalOpen" />

  <div id="scrollArea" :style="{ '--limit-length': props.limit }"></div>
</template>

<script setup lang="ts">
import { LINK_TEMPLATES } from '@/constants'
import AuthTeleportModals from '@/components/modals/auth/AuthTeleportModals.vue'
import ShowcaseCartModal from '@/features/showcase/components/ShowcaseCartModal.vue'
import type { ModalKey } from '@/types'
import { useUserStore } from '@/stores'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()
const props = withDefaults(
  defineProps<{
    limit: number
    navigations: string[]
    activeSection: string
    isMenuPage?: boolean
    isPremiumMenu?: boolean
  }>(),
  { isMenuPage: false, isPremiumMenu: false },
)

const { t } = useI18n()
const active = ref(props.activeSection)
const isLimit = ref(true)
const open = ref(false)
const cartModalOpen = ref(false)
const activeModal = ref<ModalKey>('signUp')

const options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0,
}

const callback: IntersectionObserverCallback = () => {
  isLimit.value = !isLimit.value
}

const observer = new IntersectionObserver(callback, options)

const linkColor = (key: string) => {
  return computed(() => {
    if (active.value === key) return 'text-[#dc5b41]'
    return 'text-white'
  })
}

const getHeaderBG = () => {
  return computed(() =>
    isLimit.value ? ['backdrop-blur-md', 'bg-black/10'] : ['backdrop-blur-none', 'bg-transparent'],
  )
}

const setOpenAuthModal = (key: boolean, nav: ModalKey) => {
  open.value = key
  activeModal.value = nav
  document.body.style.overflow = 'hidden'
}

const setActiveNav = (nav: string) => {
  active.value = nav
}

const changeRoute = async (link: string) => {
  await router.push(link)
}

watch(
  () => props.activeSection,
  () => {
    active.value = props.activeSection
  },
)

onMounted(() => {
  const target = document.querySelector('#scrollArea')
  if (target) {
    observer.observe(target)
  }
})
</script>

<style scoped></style>
