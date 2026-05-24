<template>
  <a
    href="#menu"
    class="flex min-w-0 max-w-[11rem] items-center gap-2 sm:max-w-[14rem]"
    :aria-label="placeTitle"
    @click="emit('navigate')"
  >
    <img
      v-if="logoUrl"
      :src="logoUrl"
      :alt="placeTitle"
      class="h-9 w-9 shrink-0 rounded-full border border-white/10 bg-white/5 object-contain"
    />
    <span
      v-else
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#dc5b41]/40 bg-[#dc5b41]/15 text-sm font-bold text-[#dc5b41]"
      aria-hidden="true"
    >
      {{ placeInitial }}
    </span>
    <span v-if="!logoUrl" class="truncate text-sm font-semibold text-white">
      {{ placeTitle }}
    </span>
  </a>
</template>

<script setup lang="ts">
import { useShowcasePlaceTheme } from '@/features/showcase/composables/useShowcasePlaceTheme'
import { computed, toRef } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  placeKey: string
}>()

const emit = defineEmits<{
  navigate: []
}>()

const { t } = useI18n()
const { logoUrl, displayPlaceName } = useShowcasePlaceTheme(toRef(props, 'placeKey'))

const placeTitle = computed(() => displayPlaceName.value?.trim() || t('showcase.menu'))

const placeInitial = computed(() => {
  const name = placeTitle.value
  return name.charAt(0).toUpperCase()
})
</script>
