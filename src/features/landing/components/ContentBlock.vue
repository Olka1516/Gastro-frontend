<template>
  <main class="w-full overflow-x-clip bg-[#0f0f11]">
    <div
      class="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-4xl flex-col items-center justify-center gap-5 px-4 py-16 text-center sm:gap-6 sm:px-6 sm:py-20 lg:max-w-5xl lg:gap-8"
    >
      <h3
        class="animate-fade-in text-sm font-bold text-[#dc5b41] opacity-0 sm:text-base"
        style="animation-delay: 0.4s"
      >
        {{ t('landing.welcomeText') }}
      </h3>

      <h1
        class="animate-fade-in text-3xl font-bold leading-tight text-white opacity-0 sm:text-4xl md:text-5xl"
        style="animation-delay: 0.4s"
      >
        {{ t('landing.readyTemplates') }}
      </h1>

      <p
        class="animate-fade-in max-w-3xl text-sm leading-relaxed text-[#ccc] opacity-0 sm:text-base md:text-lg"
        style="animation-delay: 1.3s"
      >
        {{ t('landing.readyTemplatesDescription') }}
      </p>

      <a
        href="#plans"
        class="animate-fade-in mt-1 cursor-pointer rounded-lg bg-[#dc5b41] px-8 py-2.5 text-sm text-white opacity-0 transition-transform duration-300 hover:scale-105 sm:mt-2 sm:text-base"
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
