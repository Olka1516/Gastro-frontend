<template>
  <component :is="planComponent" />
</template>

<script setup lang="ts">
import { plans } from '@/features/showcase/constants/plans'
import { showcasePlanContextKey } from '@/features/showcase/types/showcasePlanContext'
import { computed, inject } from 'vue'

const ctx = inject(showcasePlanContextKey)!

const planComponent = computed(() => {
  const name = ctx.value?.planName
  return name ? plans[name] : null
})
</script>
