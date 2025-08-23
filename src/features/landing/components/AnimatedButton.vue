<template>
  <div class="h-[calc(100vh-100px)] flex items-end justify-end">
    <div class="relative flex items-center justify-center">
      <svg viewBox="0 0 200 200" class="absolute w-32 h-32 animate-[spin_10s_linear_infinite]">
        <defs>
          <path
            id="circlePath"
            d="M 100,100 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
            fill="none"
          />
        </defs>

        <text class="text-gray-600 text-[12px] uppercase tracking-[0.15em]">
          <textPath href="#circlePath" startOffset="50%" text-anchor="middle">
            {{ t('landing.clickMe') }}
          </textPath>
        </text>
      </svg>

      <button class="relative z-10">
        <img class="w-20 h-20" src="@/assets/images/icons/arrow-down.svg" alt="arrow" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped></style>
