<template>
  <footer class="w-full bg-[#131416] px-4 py-10 sm:px-6 sm:py-12 lg:px-16 xl:px-20">
    <div
      class="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left"
    >
      <h3 class="shrink-0 text-2xl font-bold text-white">Gastro</h3>

      <p
        class="max-w-md text-sm font-bold leading-relaxed text-[#9496a1] sm:text-base lg:max-w-lg lg:flex-1 lg:px-6 lg:text-center"
      >
        {{ t('footer.description') }}
      </p>

      <div class="flex shrink-0 items-center justify-center gap-3 sm:gap-4">
        <a
          v-for="value in media"
          :key="value.name"
          :href="value.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/5"
          :aria-label="value.name"
        >
          <img
            class="h-5 w-5 sm:h-6 sm:w-6"
            :src="getImage(`../assets/images/icons/${value.name}.svg`)"
            alt=""
          />
        </a>
      </div>
    </div>

    <div class="mx-auto mt-8 flex max-w-6xl flex-col gap-4 sm:mt-10">
      <hr class="h-px border-0 bg-[#9496a1]/40" />
      <p class="text-center text-xs text-[#5d6073] sm:text-sm">
        {{ t('footer.copyright') }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { getImage } from '@/common/functions'
import { useI18n } from 'vue-i18n'

const media = [
  { name: 'instagram', link: 'https://www.instagram.com/_olka_1518/' },
  { name: 'facebook', link: 'https://www.instagram.com/_olka_1518/' },
  { name: 'youtube', link: 'https://www.instagram.com/_olka_1518/' },
]

const { t } = useI18n()
</script>
