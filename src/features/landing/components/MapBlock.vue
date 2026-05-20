<template>
  <div ref="block" class="w-full overflow-x-clip bg-[#0f0f11]">
    <div class="flex flex-col lg:hidden">
      <div class="relative z-10 mx-auto flex w-full flex-col gap-5 px-4 pt-14 sm:gap-6">
        <div class="fade-item mx-auto flex w-full max-w-xl flex-col items-center gap-2 text-center">
          <h5 class="text-base text-[#dc5b41] sm:text-lg">
            {{ t('landing.visitUs') }}
          </h5>
          <h3 class="text-xl font-bold text-white sm:text-2xl">
            {{ t('landing.comeAndTaste') }}
          </h3>
          <p class="text-sm leading-relaxed text-[#5d6073] sm:text-base">
            {{ t('landing.comeToUs') }}
          </p>
        </div>

        <div
          class="fade-item relative z-30 -mb-8 flex w-full flex-col items-start gap-5 rounded-xl bg-[#1a191f] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.55)] sm:-mb-10 sm:gap-6 sm:p-8 md:-mb-12">
          <h3 class="text-xl font-bold text-white sm:text-2xl">
            {{ t('landing.openTime') }}
          </h3>
          <hr class="w-full border-[#403f43]" />
          <div class="flex w-full flex-col">
            <div v-for="value in tm('landing.times')" :key="value.day"
              class="fade-item flex items-center justify-between gap-4 border-b border-[#403f43] py-3 last:border-b-0 sm:py-3.5">
              <h4 class="text-base text-white sm:text-lg">
                {{ rt(value.day) }}
              </h4>
              <h4 class="shrink-0 text-right text-base text-white sm:text-lg">
                {{ rt(value.time) }}
              </h4>
            </div>
          </div>
          <hr class="w-full border-[#403f43]" />
          <p class="text-base text-white sm:text-lg">
            {{ t('landing.bookTable') }}
          </p>
          <a href="#plans"
            class="fade-item cursor-pointer rounded-lg bg-[#dc5b41] px-8 py-2 text-white transition-transform duration-300 hover:scale-105">
            {{ t('button.reserveNow') }}
          </a>
        </div>
      </div>

      <div class="fade-item relative z-0 mx-auto w-full px-4 pb-14">
        <div class="map-shell map-shell--mobile w-full overflow-hidden rounded-xl ring-1 ring-white/5">
          <VMap class="map-view rounded-xl" :center="mapCenter" :zoom="14" :zoom-control="false" :keyboard="false"
            :box-zoom="false" :scroll-wheel-zoom="false" :double-click-zoom="false" :touch-zoom="false"
            :dragging="false">
            <VMapOsmTileLayer />
          </VMap>
        </div>
      </div>
    </div>

    <div class="relative hidden h-[calc(100vh-50px)] overflow-hidden lg:flex">
      <div class="fade-item absolute top-20 z-500 flex md:left-20 xl:left-60">
        <div class="flex flex-col items-start gap-6 rounded-lg bg-[#1a191f] p-12">
          <h3 class="fade-item text-2xl font-bold text-white">
            {{ t('landing.openTime') }}
          </h3>
          <hr class="fade-item w-full border-[#403f43]" />
          <div class="flex w-full flex-col gap-4">
            <div v-for="value in tm('landing.times')" :key="value.day"
              class="fade-item grid grid-cols-[80px_110px_115px] items-center gap-8">
              <h4 class="text-xl text-white">{{ rt(value.day) }}</h4>
              <hr class="w-full border border-[#403f43]" />
              <h4 class="text-xl text-white">{{ rt(value.time) }}</h4>
            </div>
          </div>
          <hr class="fade-item w-full border-[#403f43]" />
          <p class="fade-item text-xl text-white">{{ t('landing.bookTable') }}</p>
          <a href="#plans" class="fade-item cursor-pointer rounded-lg bg-[#dc5b41] px-8 py-2 text-[#fff]">
            {{ t('button.reserveNow') }}
          </a>
        </div>

        <div class="flex w-140 flex-col items-start gap-2 p-12">
          <h5 class="fade-item text-lg text-[#dc5b41]">
            {{ t('landing.visitUs') }}
          </h5>
          <h3 class="fade-item text-2xl font-bold text-white">
            {{ t('landing.comeAndTaste') }}
          </h3>
          <p class="fade-item text-sm text-[#5d6073]">{{ t('landing.comeToUs') }}</p>
        </div>
      </div>

      <div class="fade-item m-auto mb-25">
        <VMap class="rounded-lg" style="height: 300px; width: calc(100vw - 284px)" :center="mapCenter" :zoom="14"
          :zoom-control="false" :keyboard="false" :box-zoom="false" :scroll-wheel-zoom="false"
          :double-click-zoom="false" :touch-zoom="false" :dragging="false">
          <VMapOsmTileLayer />
        </VMap>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { VMap, VMapOsmTileLayer } from 'vue-map-ui'

const { t, tm, rt } = useI18n()

const mapCenter: [number, number] = [48.620485, -337.700137]

const block = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const getVisibleFadeItems = () => {
  if (!block.value) return []
  return Array.from(block.value.querySelectorAll<HTMLElement>('.fade-item')).filter(
    (el) => el.getClientRects().length > 0,
  )
}

const playFadeIn = () => {
  getVisibleFadeItems().forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`
    el.classList.add('fade-in')
  })
}

onMounted(() => {
  if (!block.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playFadeIn()
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
  )

  observer.observe(block.value)

  const rect = block.value.getBoundingClientRect()
  if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
    playFadeIn()
    observer?.unobserve(block.value)
  }
})

onUnmounted(() => {
  if (observer && block.value) {
    observer.unobserve(block.value)
  }
})
</script>

<style scoped>
.map-shell--mobile {
  height: 14rem;
}

@media (min-width: 640px) {
  .map-shell--mobile {
    height: 18rem;
  }
}

@media (min-width: 768px) {
  .map-shell--mobile {
    height: 20rem;
  }
}

.map-view {
  width: 100%;
  height: 100%;
}

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
