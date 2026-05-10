<template>
  <div class="min-h-screen bg-[#0f0f11]">
    <BaseHeader
      :limit="300"
      :navigations="navs"
      :active-section="activeSection"
      :is-menu-page="true"
      :is-premium-menu="true"
      :showcase-nav-base-path="menuBasePath"
      :show-wishlist="true"
    />

    <MainBlock />

    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseFooter from '@/components/BaseFooter.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import MainBlock from './MainBlock.vue'

const route = useRoute()
const activeSection = ref('')
const navs = ['menu', 'orders', 'reserve']

const menuBasePath = computed(() => `/menu/${String(route.params.id ?? '')}`)
</script>

<style scoped></style>
