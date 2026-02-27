<template>
  <header
    :class="getHeaderBG().value"
    class="w-full fixed z-1000 h-20 flex justify-between px-56 items-center transition-colors duration-500"
  >
    <div>
      <a href="/" class="logo" aria-label="На головну">
        <span class="text-white"> Gastro </span>
      </a>
    </div>

    <nav aria-label="Головна навігація">
      <ul class="flex gap-18">
        <li v-for="nav in navigations" :key="nav">
          <a
            :class="[linkColor(nav).value, 'transition-colors duration-300']"
            class="transition-colors duration-500"
            @click="setActiveNav(nav)"
            :href="`#${nav.toLowerCase()}`"
            >{{ t(`navs.${nav.toLowerCase()}`) }}</a
          >
        </li>
      </ul>
    </nav>
  </header>

  <div id="scrollArea" :style="{ '--limit-length': props.limit }"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ limit: number; navigations: string[]; activeSection: string }>()
const { t } = useI18n()
const active = ref(props.navigations[0])
const isLimit = ref(true)

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

const setActiveNav = (nav: string) => {
  active.value = nav
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
