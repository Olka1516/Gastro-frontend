<template>
  <div v-for="link in links" :key="link.key" @click="$emit('navigateTo', link.key)"
    class="bg-[#1a191f] p-6 rounded-lg border border-[#2a2930] hover:border-[#dc5b41] transition-all duration-300 hover:scale-102 cursor-pointer group">
    <div class="flex items-center gap-4">
      <div
        class="w-12 h-12 bg-[#2a2930] rounded-lg flex items-center justify-center group-hover:bg-[#dc5b41]/20 transition-all duration-300">
        <img :src="getIconPath(link.icon)" :alt="link.key" class="w-6 h-6"
          style="filter: brightness(0) saturate(100%) invert(54%) sepia(87%) saturate(2067%) hue-rotate(341deg) brightness(98%) contrast(87%);" />
      </div>
      <div class="flex flex-col items-start">
        <h4 class="text-white font-semibold text-left">{{ t(link.title) }}</h4>
        <p class="text-gray-400 text-xs text-left">{{ t(link.description) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '@/common/functions'
import { useI18n } from 'vue-i18n'

type QuickLink = {
  key: string
  icon: string
  title: string
  description: string
}

defineEmits<{
  (e: 'navigateTo', key: string): void
}>()

defineProps<{
  links: QuickLink[]
}>()

const { t } = useI18n()

const getIconPath = (imageName: string) => {
  return getImage(`../assets/images/icons/${imageName}.svg`)
}
</script>

<style scoped></style>
