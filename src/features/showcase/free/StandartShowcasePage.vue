<template>
  <div class="min-h-screen bg-[#0f0f11]">
    <BaseHeader :limit="300" :navigations="navs" :activeSection="activeSection" :isMenuPage="true" />

    <MainBlock />

    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseFooter from '@/components/BaseFooter.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import { ref } from 'vue'
import MainBlock from './MainBlock.vue'

const activeSection = ref('')

const navs = ['menu']
</script>

<style scoped></style>
