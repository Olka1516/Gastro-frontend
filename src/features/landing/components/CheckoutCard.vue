<template>
  <div class="flex flex-col gap-2">
    <div
      class="bg-[#1f242b] p-4 rounded-xl flex gap-4 justify-center items-center"
      v-for="(soup, i) in soupsArray.slice(start, end)"
      :key="i"
    >
      <img
        class="animatable h-12 mx-auto"
        :src="getImage(`../features/landing/assets/images/landing/soup_${start + i + 1}.png`)"
      />
      <div>
        <h3 class="text-[10px] text-white">{{ soup.name }}</h3>
        <p class="text-[10px] text-[#5d6073] line-clamp-1">{{ soup.description }}</p>
      </div>
      <div class="flex flex-col items-end gap-1">
        <img class="h-3" src="@/assets/images/icons/trash.svg" alt="" />
        <span class="text-xs text-white">{{ soup.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '@/common/functions'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ meals: string; start: number; end: number }>()
const { tm } = useI18n()

const soupsArray = computed(() => Object.values(tm(props.meals)))
</script>

<style scoped></style>
