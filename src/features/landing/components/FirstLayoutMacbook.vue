<template>
  <div
    class="min-h-86 max-w-134 m-auto absolute top-4 left-15 flex flex-wrap justify-center bg-white"
  >
    <p class="font-serif text-black text-3xl font-bold">{{ t('landing.platformText') }}</p>
    <div class="grid grid-cols-2 gap-x-8 gap-y-4" v-for="value in products" :key="value.name">
      <MenuBlock :product="value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MenuBlock from './MenuBlock.vue'

const { t } = useI18n()

const products = [
  {
    image: 'pizza',
    name: 'landing.platformPizzaText',
    ingredients: 'landing.platformReceiptText',
  },
  {
    image: 'meal',
    name: 'landing.platformMealText',
    ingredients: 'landing.platformMealReceiptText',
  },
]
</script>

<style scoped></style>
