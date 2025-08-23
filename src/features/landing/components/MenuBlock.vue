<template>
  <div class="max-h-35 bg-stone-200 p-2 rounded-md">
    <img class="max-h-30" :src="getImage(product.image)" alt="" />
  </div>
  <div>
    <p class="font-bold text-s">{{ t(product.name) }}</p>
    <p class="text-xs">{{ t(product.ingredients) }}</p>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Product } from '../types'

const { t } = useI18n()

defineProps<{ product: Product }>()

const getImage = (image: string) => {
  const st = new URL(`../assets/images/${image}.png`, import.meta.url)
  return st.pathname
}
</script>
