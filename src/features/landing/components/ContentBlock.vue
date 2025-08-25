<template>
  <main
    class="w-full bg-[#0f0f11] flex flex-col justify-center items-center min-h-screen gap-4 px-24"
  >
    <h2 class="text-[#fff]">{{ t('landing.welcomeText') }}</h2>
    <h1 class="text-[#fff]">{{ t('landing.readyTemplates') }}</h1>
    <p class="text-[#fff]">{{ t('landing.readyTemplatesDescription') }}</p>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped></style>
