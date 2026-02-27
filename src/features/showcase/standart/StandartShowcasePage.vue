<template>
  <div class="min-h-screen bg-[#0f0f11]">
    <!-- Header Block -->
    <BaseHeader
      :limit="300"
      :navigations="navs"
      :activeSection="activeSection"
      :isMenuPage="true"
    />

    <!-- Main Menu Block -->
    <MainBlock />

    <!-- Footer Block -->
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseFooter from '@/components/BaseFooter.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import { ref } from 'vue'
import MainBlock from './MainBlock.vue'

const activeSection = ref('')

const navs = ['menu'] // Navigation items for showcase
</script>

<style scoped></style>
