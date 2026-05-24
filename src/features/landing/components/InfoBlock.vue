<template>
  <div ref="container"
    class="w-full overflow-x-clip bg-[#0f0f11] px-4 py-14 md:min-h-[calc(100vh-150px)] md:px-18 md:py-24">
    <div
      class="flex w-full flex-col items-center gap-8 transition-transform duration-2500 ease-in-out md:items-stretch md:flex-row md:items-center md:justify-between md:gap-16 lg:gap-24"
      :style="{ transform: `translateX(${offset}px)` }">
      <img :key="`info-hero-${index}`"
        class="h-auto w-auto min-h-32 min-w-32 max-h-44 max-w-[min(100%,13rem)] shrink-0 object-contain sm:max-h-52 md:h-100 md:max-h-100 md:max-w-[min(42vw,22rem)] md:shrink-0 lg:max-w-[min(38vw,26rem)]"
        :src="displaySrc" :alt="t(title)" @error="onImageError" />

      <div
        class="flex w-full flex-col items-center gap-6 md:min-h-100 md:max-w-2xl md:flex-1 md:items-start md:justify-between md:gap-0 lg:max-w-none xl:max-w-3xl">
        <div class="relative flex w-full justify-center md:justify-start">
          <img :class="[circleFlipClass, showCircle ? 'opacity-100' : 'opacity-0']"
            class="pointer-events-none absolute -top-2 z-1 h-28 w-28 object-contain opacity-0 transition-opacity duration-1700 ease-in-out md:-top-4 md:h-140 md:w-auto"
            src="@/assets/images/circles.png" alt="" />
          <div
            class="relative z-2 flex w-full max-w-xl flex-col items-center gap-4 py-2 text-center md:max-w-none md:items-start md:gap-8 md:px-6 md:text-left"
          >
            <h3 class="text-xl font-bold text-white sm:text-2xl">
              {{ t(title) }}
            </h3>
            <p class="text-sm leading-relaxed text-[#5d6073] sm:text-base md:text-lg">
              {{ t(description) }}
            </p>
          </div>
        </div>

        <BaseButton
          href="#info"
          :text="t(buttonText)"
          size="compact"
          class="relative z-2 w-full text-center md:mx-6 md:w-auto"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getInfoBlockImageUrl, INFO_BLOCK_IMAGE_URLS } from '../constants/infoBlocks'

const { t } = useI18n()

const props = defineProps<{
  img: string
  title: string
  description: string
  buttonText: string
  index: number
}>()

const SLIDE_DISTANCE = 200

const heroImageSrc = computed(() => getInfoBlockImageUrl(props.index))

const displaySrc = ref(heroImageSrc.value)

watch(heroImageSrc, (url) => {
  displaySrc.value = url
})

const onImageError = () => {
  displaySrc.value = INFO_BLOCK_IMAGE_URLS[1]
}

const container = ref<HTMLElement | null>(null)
const showCircle = ref(false)
const offset = ref(0)

const direction = props.index % 2 === 0 ? -1 : 1

const circleFlipClass = props.index % 2 === 0 ? 'left-0 right-auto scale-x-[-1]' : 'right-0'

let observer: IntersectionObserver | null = null

const setHiddenOffset = () => {
  offset.value = direction * SLIDE_DISTANCE
}

onMounted(() => {
  displaySrc.value = heroImageSrc.value

  if (!container.value) return

  setHiddenOffset()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          offset.value = 0
          showCircle.value = true
        } else {
          setHiddenOffset()
          showCircle.value = false
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )

  observer.observe(container.value)

  const rect = container.value.getBoundingClientRect()
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    offset.value = 0
    showCircle.value = true
  }
})

onUnmounted(() => {
  if (observer && container.value) {
    observer.unobserve(container.value)
  }
})
</script>
