<template>
  <div class="min-h-screen bg-[#0f0f11]">
    <BaseHeader :limit="300" :navigations="navs" :active-section="activeSection" :is-menu-page="true"
      :is-premium-menu="true" :showcase-nav-base-path="menuBasePath" />

    <ProShowcaseOrderHistory />

    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseFooter from '@/components/BaseFooter.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import { showcasePlanContextKey } from '@/features/showcase/types/showcasePlanContext'
import { EPlan } from '@/types'
import { computed, inject, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProShowcaseOrderHistory from './ProShowcaseOrderHistory.vue'

const route = useRoute()
const router = useRouter()
const ctx = inject(showcasePlanContextKey)

const activeSection = ref('')
const navs = ['menu', 'orders', 'reserve']

const menuBasePath = computed(() => `/menu/${String(route.params.id ?? '')}`)

watchEffect(() => {
  const c = ctx?.value
  if (!c) return
  if (c.planName !== EPlan.premium) {
    router.replace({ path: menuBasePath.value })
  }
})
</script>
