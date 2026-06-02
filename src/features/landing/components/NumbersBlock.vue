<template>
  <div class="flex w-full justify-center bg-[#131416] px-4 py-14 md:h-80 md:py-0">
    <div
      class="mx-auto grid w-full max-w-[22rem] grid-cols-2 place-items-center gap-x-10 gap-y-14 sm:max-w-[26rem] sm:gap-x-12 sm:gap-y-16 md:flex md:max-w-250 md:items-center md:justify-between md:gap-8"
    >
      <div
        v-for="(value, idx) in datas"
        :key="value.text"
        :ref="(el) => setBlockRef(el, idx)"
        class="flex w-full max-w-[10.5rem] flex-col items-center md:w-50 md:max-w-none"
      >
        <div class="relative px-5 pt-5">
          <h3 class="relative z-2 text-center text-3xl font-bold leading-none text-white sm:text-4xl md:text-5xl">
            {{ formatAnimatedValue(idx) }}{{ value.suffix }}
          </h3>
          <img
            class="pointer-events-none absolute right-0 top-0 z-1 h-11 w-11 object-contain sm:h-13 sm:w-13 md:h-15 md:w-15"
            :src="getLandingImageUrl(`${value.text}.png`)"
            alt=""
          />
        </div>
        <p class="mt-3 max-w-[9.5rem] text-center text-xs leading-snug text-[#5d6073] sm:text-sm md:max-w-none md:text-base">
          {{ t(`landing.${value.text}`) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { datas } from '../constants/numbers'
import { getLandingImageUrl } from '../constants/landingImages'

const { t } = useI18n()

const animatedNumbers = ref(datas.map(() => 0))
const blocks = ref<(HTMLElement | null)[]>([])

const setBlockRef = (el: unknown, index: number) => {
  blocks.value[index] = el instanceof HTMLElement ? el : null
}

const formatAnimatedValue = (index: number) => {
  const target = datas[index].number
  const current = animatedNumbers.value[index]
  return Number.isInteger(target) ? current : Number(current.toFixed(1))
}

const animateNumber = (index: number, target: number, duration = 1500) => {
  const startTime = performance.now()
  const isDecimal = !Number.isInteger(target)

  const step = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const value = target * eased
    animatedNumbers.value[index] = isDecimal
      ? Math.round(value * 10) / 10
      : Math.floor(value)

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      animatedNumbers.value[index] = target
    }
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = blocks.value.findIndex((block) => block === entry.target)
          if (index !== -1 && animatedNumbers.value[index] === 0) {
            animateNumber(index, datas[index].number, 1500)
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  blocks.value.forEach((block) => {
    if (block) observer.observe(block)
  })
})
</script>
