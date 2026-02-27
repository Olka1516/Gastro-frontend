<template>
  <div>
    <div ref="triggerLine" class="absolute top-250 h-[2px] bg-transparent w-full mt-40"></div>
    <div ref="container" class="w-full bg-[#0f0f11] min-h-[calc(100vh-156px)]">
      <div class="w-[calc(100%-256px)] h-full m-auto flex justify-center items-center gap-4">
        <div class="card opacity-0 bg-[#161c20] h-115 w-70 rounded-xl p-6 flex flex-col gap-4">
          <div class="relative flex items-center justify-center">
            <img class="absolute left-0" src="@/assets/images/icons/arrow-left.svg" alt="" />
            <h5 class="text-white">{{ t('landing.menu') }}</h5>
          </div>
          <MenuCard name="landing.firstMeal" meals="landing.soups" :start="0" :end="2" />
          <MenuCard name="landing.secondMeal" meals="landing.soups" :start="2" :end="4" />
        </div>

        <div class="bg-[#161c20] h-125 w-70 rounded-xl p-6 flex flex-col justify-between gap-8">
          <div class="flex justify-between">
            <img src="@/assets/images/icons/arrow-left.svg" alt="" />
            <h5 class="text-white">{{ t('landing.menu') }}</h5>
            <img src="@/assets/images/icons/bag.svg" alt="" />
          </div>
          <div class="relative flex">
            <div class="flex flex-col gap-4">
              <h5 class="text-stone-400 text-xs">{{ t('landing.name') }}</h5>
              <h4 class="text-white font-bold">{{ t('landing.soups.1.name') }}</h4>
              <span class="text-white text-lg">{{ t('landing.soups.1.price') }}</span>
              <ul class="flex flex-col gap-2 ml-4">
                <li
                  class="text-white list-disc text-sm"
                  v-for="value in tm('landing.soups.1.ingredients')"
                  :key="value"
                >
                  {{ rt(value) }}
                </li>
              </ul>
              <p class="text-[#5d6073] text-xs w-full text-justify">
                {{ t('landing.soups.1.description') }}
              </p>
            </div>
            <img
              class="animatable absolute -right-14 h-25 z-4"
              src="../assets/images/landing/soup_1.png"
              alt=""
            />
          </div>
          <button class="cursor-pointer text-xs text-white bg-[#dc5b41] px-12 py-2 rounded-3xl">
            {{ t('landing.addToCard') }}
          </button>
        </div>

        <div
          class="card opacity-0 bg-[#161c20] h-115 w-70 rounded-xl p-6 flex flex-col gap-4 justify-between"
        >
          <div class="flex flex-col gap-4">
            <div class="relative flex items-center justify-center">
              <img class="absolute left-0" src="@/assets/images/icons/arrow-left.svg" alt="" />
              <h5 class="text-white">{{ t('landing.checkout') }}</h5>
            </div>
            <CheckoutCard meals="landing.soups" :start="0" :end="3" />
          </div>
          <h4 class="text-white font-bold text-xs">{{ t('landing.sum', { sum: 24.7 }) }}</h4>
          <button class="cursor-pointer text-white bg-[#dc5b41] px-12 py-2 rounded-3xl text-xs">
            {{ t('landing.buy') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MenuCard from './MenuCard.vue'
import CheckoutCard from './CheckoutCard.vue'
import { onMounted, ref } from 'vue'

const { t, tm, rt } = useI18n()

const triggerLine = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)

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

onMounted(() => {
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
</script>

<style>
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

.spin-once {
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

.deviate-once {
  animation: deviateOnce 2.5s ease-in-out forwards;
}
</style>
