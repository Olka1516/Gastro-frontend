<template>
  <div>
    <div ref="triggerLine" class="absolute top-250 mt-40 h-[2px] w-full bg-transparent"></div>
    <div ref="container" class="w-full overflow-x-clip bg-[#0f0f11] min-h-[calc(100vh-156px)] px-4 py-10 sm:py-14">
      <div ref="viewport" class="mx-auto flex w-full max-w-[72rem] justify-center overflow-visible"
        :style="viewportStyle">
        <div class="relative shrink-0 overflow-visible" :style="shellStyle">
          <div class="phones-scene absolute left-0 top-0 overflow-visible" :style="sceneStyle">
            <div class="phones-row absolute flex items-center justify-center gap-4 overflow-visible max-md:gap-0"
              :style="phonesStyle">
              <div
                class="card phone-side phone-side--left relative z-10 flex h-115 w-70 shrink-0 flex-col gap-4 rounded-xl bg-[#161c20] p-6 opacity-0 max-md:-mr-[8.25rem]">
                <div class="relative flex items-center justify-center">
                  <img class="absolute left-0" src="@/assets/images/icons/arrow-left.svg" alt="" />
                  <h5 class="text-white">{{ t('landing.menu') }}</h5>
                </div>
                <MenuCard name="landing.firstMeal" meals="landing.soups" :start="0" :end="2" />
                <MenuCard name="landing.secondMeal" meals="landing.soups" :start="2" :end="4" />
              </div>

              <div
                class="phone-center relative z-20 flex h-125 w-70 shrink-0 flex-col justify-between gap-8 rounded-xl bg-[#161c20] p-6">
                <div class="flex justify-between">
                  <img src="@/assets/images/icons/arrow-left.svg" alt="" />
                  <h5 class="text-white">{{ t('landing.menu') }}</h5>
                  <img src="@/assets/images/icons/bag.svg" alt="" />
                </div>
                <div class="relative flex">
                  <div class="flex flex-col gap-4">
                    <h5 class="text-xs text-stone-400">{{ t('landing.name') }}</h5>
                    <h4 class="font-bold text-white">{{ t('landing.soups.1.name') }}</h4>
                    <span class="text-lg text-white">{{ t('landing.soups.1.price') }}</span>
                    <ul class="ml-4 flex flex-col gap-2">
                      <li v-for="value in tm('landing.soups.1.ingredients')" :key="value"
                        class="list-disc text-sm text-white">
                        {{ rt(value) }}
                      </li>
                    </ul>
                    <p class="w-full text-justify text-xs text-[#5d6073]">
                      {{ t('landing.soups.1.description') }}
                    </p>
                  </div>
                  <img
                    class="animatable absolute -right-14 z-4 h-25"
                    :src="getLandingImageUrl('soup_1.png')"
                    alt=""
                  />
                </div>
                <BaseButton variant="pill" :text="t('landing.addToCard')" />
              </div>

              <div
                class="card phone-side phone-side--right relative z-10 flex h-115 w-70 shrink-0 flex-col justify-between gap-4 rounded-xl bg-[#161c20] p-6 opacity-0 max-md:-ml-[8.25rem]">
                <div class="flex flex-col gap-4">
                  <div class="relative flex items-center justify-center">
                    <img class="absolute left-0" src="@/assets/images/icons/arrow-left.svg" alt="" />
                    <h5 class="text-white">{{ t('landing.checkout') }}</h5>
                  </div>
                  <CheckoutCard meals="landing.soups" :start="0" :end="3" />
                </div>
                <h4 class="text-xs font-bold text-white">{{ t('landing.sum', { sum: 24.7 }) }}</h4>
                <BaseButton variant="pill" :text="t('landing.buy')" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { getLandingImageUrl } from '../constants/landingImages'
import { useI18n } from 'vue-i18n'
import MenuCard from './MenuCard.vue'
import CheckoutCard from './CheckoutCard.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const PHONE_WIDTH = 280
const PHONE_GAP = 16
const DESIGN_WIDTH = PHONE_WIDTH * 3 + PHONE_GAP * 2
const DESIGN_HEIGHT = 500
const MOBILE_OVERLAP = 132
const OVERLAP_LAYOUT_WIDTH = PHONE_WIDTH + (PHONE_WIDTH - MOBILE_OVERLAP) * 2
const MOBILE_LAYOUT_MAX = 768

const BLEED_X = 56
const BLEED_Y = 40

const { t, tm, rt } = useI18n()

const triggerLine = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const viewport = ref<HTMLElement | null>(null)
const scale = ref(1)
const layoutWidth = ref(DESIGN_WIDTH)

const canvasWidth = computed(() => layoutWidth.value + BLEED_X * 2)
const canvasHeight = computed(() => DESIGN_HEIGHT + BLEED_Y * 2)

const shellStyle = computed(() => {
  const s = scale.value
  return {
    width: `${Math.ceil(canvasWidth.value * s)}px`,
    height: `${Math.ceil(canvasHeight.value * s)}px`,
  }
})

const sceneStyle = computed(() => ({
  width: `${canvasWidth.value}px`,
  height: `${canvasHeight.value}px`,
  transform: `scale(${scale.value})`,
  transformOrigin: 'top left',
}))

const phonesStyle = computed(() => ({
  left: `${BLEED_X}px`,
  top: `${BLEED_Y}px`,
  width: `${layoutWidth.value}px`,
  height: `${DESIGN_HEIGHT}px`,
}))

const viewportStyle = computed(() => ({
  minHeight: `${Math.ceil(canvasHeight.value * scale.value) + 32}px`,
}))

function updateScale() {
  if (!viewport.value) return
  const available = viewport.value.clientWidth
  const useOverlap = available < MOBILE_LAYOUT_MAX
  layoutWidth.value = useOverlap ? OVERLAP_LAYOUT_WIDTH : DESIGN_WIDTH
  scale.value = Math.min(1, available / canvasWidth.value)
}

function runAnimations() {
  const imgs = document.querySelectorAll<HTMLImageElement>('.animatable')
  imgs.forEach((img, index) => {
    setTimeout(() => {
      img.classList.remove('spin-once')
      void img.offsetWidth
      img.classList.add('spin-once')
    }, index * 200)
  })
  const cards = document.querySelectorAll<HTMLElement>('.card')
  cards.forEach((card, index) => {
    const angle = index % 2 === 0 ? '-5deg' : '5deg'
    card.style.setProperty('--angle', angle)
    card.classList.remove('deviate-once')
    void card.offsetWidth
    card.classList.add('deviate-once')
  })
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  updateScale()
  resizeObserver = new ResizeObserver(() => updateScale())
  if (viewport.value) resizeObserver.observe(viewport.value)

  if (!triggerLine.value || !container.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runAnimations()
        }
      })
    },
    { threshold: 0.3 },
  )
  const observerContainer = new IntersectionObserver(
    (entries) => {
      entries.forEach(() => {
        const cards = document.querySelectorAll<HTMLElement>('.card')
        cards.forEach((card) => {
          card.style.opacity = '0'
          card.classList.remove('deviate-once')
        })
      })
    },
    { threshold: 0.01 },
  )

  observer.observe(triggerLine.value)
  observerContainer.observe(container.value)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.phones-scene {
  will-change: transform;
}

@media (max-width: 767px) {
  .phone-center {
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);
  }
}

@keyframes spinOnce {
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(0.7);
  }

  100% {
    transform: rotate(380deg) scale(1);
  }
}

:deep(.spin-once) {
  animation: spinOnce 1s ease-in-out forwards;
}

@keyframes deviateOnce {
  0% {
    transform: rotate(0deg);
    opacity: 0;
  }

  50% {
    transform: rotate(var(--angle, 5deg));
    opacity: 0.5;
  }

  100% {
    transform: rotate(0deg);
    opacity: 1;
  }
}

:deep(.deviate-once) {
  animation: deviateOnce 2.5s ease-in-out forwards;
}
</style>
