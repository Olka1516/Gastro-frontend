<template>
  <h4 class="text-white font-bold text-xs">{{ t(name) }}</h4>
  <div class="flex gap-2">
    <div
      class="bg-[#1f242b] p-4 rounded-xl flex flex-col gap-1 w-115"
      v-for="(soup, i) in soupsArray.slice(start, end)"
      :key="i"
    >
      <img
        class="animatable h-15 mx-auto"
        :src="getImage(`../features/landing/assets/images/landing/soup_${start + i + 1}.png`)"
        alt=""
      />
      <h3 class="text-[9px] text-white">{{ soup.name }}</h3>
      <span class="text-[10px] text-white">{{ soup.price }}</span>
      <p class="text-[9px] text-[#5d6073] line-clamp-1">{{ soup.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '@/common/functions'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ name: string; meals: string; start: number; end: number }>()
const { t, tm } = useI18n()

const soupsArray = computed(() => Object.values(tm(props.meals)))
</script>

<style scoped></style>
