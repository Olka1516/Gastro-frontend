<template>
  <div
    ref="container"
    class="h-[calc(100vh-150px)] w-full bg-[#0f0f11] py-24 px-18 overflow-hidden"
  >
    <div
      :class="divClass"
      class="flex m-auto gap-24 max-w-[calc(100%-120px)] transition-transform duration-2500 ease-in-out"
      :style="{ transform: `translateX(${offset}px)` }"
    >
      <img class="h-100" src="../assets/images/landing/soup_2.png" alt="" />
      <div class="flex flex-col justify-between items-start">
        <div class="relative flex">
          <img
            :class="[imgClass, showCircle ? 'opacity-100' : 'opacity-0']"
            class="absolute z-1 right-0 -top-4 h-140 transition-opacity duration-1700 ease-in-out"
            src="@/assets/images/circles.png"
            alt=""
          />
          <div class="relative z-2 flex flex-col gap-8 px-6 py-2">
            <h3 class="text-white text-2xl">{{ t(title) }}</h3>
            <p class="text-[#5d6073] text-lg">{{ t(description) }}</p>
          </div>
        </div>
        <button class="cursor-pointer relative z-2 text-[#fff] bg-[#dc5b41] px-8 py-4 mx-6">
          {{ t(buttonText) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  img: string
  title: string
  description: string
  buttonText: string
  index: number
}>()

const container = ref<HTMLElement | null>(null)
const showCircle = ref(false)
const offset = ref(0)

const divClass = props.index % 2 === 0 ? 'flex-row-reverse' : ''
const imgClass = props.index % 2 === 0 ? 'scale-x-[-1] left-0' : ''
const direction = props.index % 2 === 0 ? -1 : 1

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!container.value) return

  offset.value = direction * 200

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          offset.value = 0
          showCircle.value = true
        } else {
          offset.value = direction * 200
          showCircle.value = false
        }
      })
    },
    { threshold: 0.3 },
  )

  observer.observe(container.value)
})

onUnmounted(() => {
  if (observer && container.value) {
    observer.unobserve(container.value)
  }
})
</script>
