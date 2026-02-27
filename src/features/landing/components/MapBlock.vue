<template>
  <div ref="block" class="bg-[#0f0f11] h-[calc(100vh-50px)] flex relative overflow-hidden">
    <div class="fade-item absolute z-500 top-20 xl:left-60 flex md:left-20">
      <div class="bg-[#1a191f] flex flex-col gap-6 p-12 items-start">
        <h3 class="fade-item text-white text-2xl font-bold">{{ t('landing.openTime') }}</h3>
        <hr class="fade-item w-full border-[#403f43]" />
        <div class="w-full flex flex-col gap-4">
          <div
            v-for="value in tm('landing.times')"
            :key="value.day"
            class="fade-item grid grid-cols-[80px_110px_115px] gap-8 items-center"
          >
            <h4 class="text-white text-xl">{{ rt(value.day) }}</h4>
            <hr class="w-full border-1 border-[#403f43]" />
            <h4 class="text-white text-xl">{{ rt(value.time) }}</h4>
          </div>
        </div>
        <hr class="fade-item w-full border-[#403f43]" />
        <p class="fade-item text-white text-xl">{{ t('landing.bookTable') }}</p>
        <a href="#plans" class="cursor-pointer fade-item text-[#fff] bg-[#dc5b41] px-8 py-2">
          {{ t('button.reserveNow') }}
        </a>
      </div>

      <div class="flex flex-col gap-2 p-12 items-start w-140">
        <h5 class="fade-item text-[#dc5b41] text-lg">{{ t('landing.visitUs') }}</h5>
        <h3 class="fade-item font-bold text-white text-2xl">{{ t('landing.comeAndTaste') }}</h3>
        <p class="fade-item text-[#5d6073] text-sm">{{ t('landing.comeToUs') }}</p>
      </div>
    </div>

    <div class="fade-item m-auto mb-25">
      <VMap
        style="height: 300px; width: calc(100vw - 284px)"
        :center="[48.620485, -337.700137]"
        :zoom="14"
        :zoomControl="false"
        :keyboard="false"
        :boxZoom="false"
        :scrollWheelZoom="false"
        :doubleClickZoom="false"
        :touchZoom="false"
        :dragging="false"
      >
        <VMapOsmTileLayer />
      </VMap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { VMap, VMapOsmTileLayer } from 'vue-map-ui'

const { t, tm, rt } = useI18n()

const block = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!block.value) return

  const items = block.value.querySelectorAll<HTMLElement>('.fade-item')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          items.forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.2}s`
            el.classList.add('fade-in')
          })
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  observer.observe(block.value)
})

onUnmounted(() => {
  if (observer && block.value) {
    observer.unobserve(block.value)
  }
})
</script>

<style scoped>
.fade-item {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
}
</style>
