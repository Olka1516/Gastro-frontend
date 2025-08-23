<template>
  <div
    class="rounded-3xl max-h-85 max-w-39 m-auto absolute inset-0 flex flex-wrap justify-center bg-white"
  >
    <p class="font-serif text-black text-l font-bold pt-8">{{ t('landing.platformText') }}</p>
    <div class="max-h-35 bg-stone-200 p-2 rounded-md">
      <img class="max-h-30" src="../assets/images/pizza.png" alt="" />
    </div>
    <div class="ml-4">
      <p class="font-bold text-s">{{ t('landing.platformPizzaText') }}</p>
      <p class="text-xs">{{ t('landing.platformReceiptText') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped></style>
