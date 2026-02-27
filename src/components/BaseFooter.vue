<template>
  <div class="w-full bg-[#131416] py-12 px-34 flex flex-col gap-8 text-center">
    <div class="flex text-center items-center justify-between">
      <h3 class="text-[#fff] text-2xl font-bold">Gastro</h3>
      <p class="text-center text-[#9496a1] text-sm max-w-90 font-bold">
        {{ t('footer.description') }}
      </p>
      <div class="flex gap-2">
        <img
          v-for="value in media"
          :key="value"
          :src="getImage(`../assets/images/icons/${value}.svg`)"
          alt=""
        />
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <hr class="h-px border-[#9496a1] scale-y-[0.4]" />
      <p class="text-xs text-[#2a2b2e]">{{ t('footer.copyright') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '@/common/functions'
import { useI18n } from 'vue-i18n'

const media = ['instagram', 'facebook', 'youtube']
const { t } = useI18n()
</script>

<style scoped></style>
