<template>
  <div class="min-h-screen bg-[#0f0f11]">
    <!-- Header Block -->
    <BaseHeader :limit="300" :navigations="navs" :activeSection="activeSection" />

    <!-- Main Menu Block -->
    <MainBlock />

    <!-- Footer Block -->
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseFooter from '@/components/BaseFooter.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import MainBlock from './MainBlock.vue'

const activeSection = ref('')

const navs = ['menu'] // Navigation items for showcase

const onScroll = () => {
  const menuEl = document.getElementById('menu')
  if (!menuEl) return

  const rect = menuEl.getBoundingClientRect()
  if (rect.top <= 100 && rect.bottom >= 100) {
    activeSection.value = 'Menu'
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped></style>
