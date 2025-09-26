<template>
  <div class="bg-[#131416] h-80 flex m-auto">
    <div class="flex max-w-250 justify-between m-auto gap-8">
      <div class="relative" v-for="(value, idx) in datas" :key="value.text" ref="blocks">
        <img
          class="h-15 absolute z-1 -right-4 -top-4"
          :src="getImage(`../features/landing/assets/images/landing/${value.text}.png`)"
          alt=""
        />
        <div class="relative flex flex-col w-50 items-center text-center gap-4 z-2">
          <h3 class="text-white text-5xl font-bold">
            {{ animatedNumbers[idx] }}{{ value.suffix }}
          </h3>
          <p class="text-[#5d6073]">{{ t(`landing.${value.text}`) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { datas } from '../constants/numbers'
import { getImage } from '@/common/functions'

const { t } = useI18n()

const animatedNumbers = ref(datas.map(() => 0))
const blocks = ref<HTMLElement[]>([])

const animateNumber = (index: number, target: number, duration = 1500) => {
  const startTime = performance.now()

  const step = (currentTime: number) => {
    const progress = Math.min((currentTime - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    animatedNumbers.value[index] = Math.floor(target * eased)

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
          const index = blocks.value.indexOf(entry.target as HTMLElement)
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
