<template>
  <div
    v-for="(link, idx) in links"
    :key="`${link.key}-${link.icon}-${idx}`"
    class="group min-w-0 cursor-pointer rounded-lg border border-[#2a2930] bg-[#1a191f] p-4 transition-all duration-300 hover:border-[#dc5b41] hover:translate-y-[-2px] sm:p-5 sm:hover:scale-[1.02]"
    @click="$emit('navigateTo', link.key)">
    <div class="flex min-w-0 items-center gap-3 sm:gap-4">
      <div
        class="flex aspect-square h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2a2930] transition-all duration-300 group-hover:bg-[#dc5b41]/20 sm:h-12 sm:w-12">
        <img
          :src="getIconPath(link.icon)"
          :alt="link.key"
          class="pointer-events-none h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6"
          style="filter: brightness(0) saturate(100%) invert(54%) sepia(87%) saturate(2067%) hue-rotate(341deg) brightness(98%) contrast(87%);" />
      </div>
      <div class="flex min-w-0 flex-col items-start">
        <h4 class="text-left text-sm font-semibold text-white sm:text-base">{{ t(link.title) }}</h4>
        <p class="mt-0.5 text-left text-xs text-gray-400 line-clamp-2">{{ t(link.description) }}</p>
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
