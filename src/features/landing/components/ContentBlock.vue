<template>
  <main class="w-full bg-[#0f0f11]">
    <div
      class="w-[calc(100%-256px)] text-center m-auto min-h-screen flex flex-col justify-center items-center gap-4"
    >
      <h3 class="text-[#dc5b41] font-bold opacity-0 animate-fade-in" style="animation-delay: 0.4s">
        {{ t('landing.welcomeText') }}
      </h3>

      <h1
        class="text-[#fff] text-5xl font-bold opacity-0 animate-fade-in"
        style="animation-delay: 0.4s"
      >
        {{ t('landing.readyTemplates') }}
      </h1>

      <p class="max-w-3xl text-[#ccc] opacity-0 animate-fade-in" style="animation-delay: 1.3s">
        {{ t('landing.readyTemplatesDescription') }}
      </p>

      <a
        href="#plans"
        class="cursor-pointer text-[#fff] bg-[#dc5b41] px-8 py-2 opacity-0 animate-fade-in"
        style="animation-delay: 1.9s"
      >
        {{ t('button.buyNow') }}
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease forwards;
}
</style>
