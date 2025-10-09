<template>
  <aside aria-label="Sidebar" :class="['bg-[#1a191f] min-h-screen p-6 relative']">
    <div class="absolute top-12 -right-2 w-4 h-8 bg-[#dc5b41] flex justify-center items-center">
      <button class="cursor-pointer" @click="changeClose">
        <img
          :class="['transition-transform duration-300', getStyleImg]"
          src="@/assets/images/icons/arrow-left.svg"
          alt=""
        />
      </button>
    </div>
    <nav>
      <h2 :class="[animateElement, 'text-white text-xl font-bold']">{{ userInfo.placeName }}</h2>
      <ul>
        <li v-for="value in navs" :key="value">
          <a :class="animateElement" href="/dashboard">{{ t(value) }}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { IUserData } from '@/types'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineProps<{ navs: string[]; userInfo: IUserData }>()
const emit = defineEmits<{
  (e: 'handleProcess', value: boolean): void
}>()

const isClose = ref(false)

const getStyleImg = computed(() => {
  return isClose.value ? 'rotate-y-180' : ''
})

const changeClose = () => {
  isClose.value = !isClose.value
  emit('handleProcess', isClose.value)
}

const animateElement = computed(() => (isClose.value ? 'hide-element' : 'show-element'))
</script>

<style scoped>
@keyframes hideElement {
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes showElement {
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
}

.hide-element {
  animation: hideElement 0.2s ease-in-out forwards;
}

.show-element {
  animation: showElement 0.3s ease-in-out forwards;
}
</style>
