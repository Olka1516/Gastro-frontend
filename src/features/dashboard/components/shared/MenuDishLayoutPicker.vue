<template>
  <div class="flex flex-col gap-3">
    <div>
      <span class="text-sm text-gray-300">{{ t('dashboard.settings.menuDishLayout.label') }}</span>
      <p class="mt-1 text-xs text-gray-500 leading-snug">
        {{ t('dashboard.settings.menuDishLayout.hint') }}
      </p>
    </div>

    <div
      class="grid grid-cols-1 gap-3 sm:grid-cols-3"
      role="radiogroup"
      :aria-label="t('dashboard.settings.menuDishLayout.label')"
    >
      <button
        v-for="opt in options"
        :key="opt.value"
        type="button"
        role="radio"
        :aria-checked="model === opt.value"
        class="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-xl border bg-[#141318] text-left transition outline-none focus-visible:ring-2 focus-visible:ring-[#dc5b41] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f11]"
        :class="
          model === opt.value
            ? 'border-[#dc5b41] shadow-[0_0_0_1px_rgba(220,91,65,0.35)]'
            : 'border-[#2a2930] hover:border-[#3d3c44] hover:bg-[#18171c]'
        "
        @click="model = opt.value"
      >
        <span
          v-if="model === opt.value"
          class="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#dc5b41] text-white shadow-md"
          aria-hidden="true"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        <div
          class="relative border-b border-[#2a2930] bg-[#0c0c0e] px-3 py-3"
          :class="model === opt.value ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'"
        >
          <div class="mx-auto aspect-[5/4] max-h-[88px] w-full max-w-[140px] rounded-lg bg-[#1a191f] p-2 ring-1 ring-white/5">
            <MenuLayoutMiniPreview :variant="opt.value" />
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-1.5 px-3 pb-3.5 pt-3 sm:pt-3">
          <span
            class="text-sm font-semibold leading-tight"
            :class="model === opt.value ? 'text-white' : 'text-gray-200'"
          >
            {{ t(opt.titleKey) }}
          </span>
          <span class="text-xs leading-relaxed text-gray-500">
            {{ t(opt.descKey) }}
          </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DEFAULT_MENU_DISH_LAYOUT,
  MENU_DISH_LAYOUT_VALUES,
  type MenuDishLayout,
} from '@/constants/menuDishLayout'
import { useI18n } from 'vue-i18n'
import MenuLayoutMiniPreview from './MenuLayoutMiniPreview.vue'

const { t } = useI18n()

const model = defineModel<MenuDishLayout>({ default: DEFAULT_MENU_DISH_LAYOUT })

const options: { value: MenuDishLayout; titleKey: string; descKey: string }[] =
  MENU_DISH_LAYOUT_VALUES.map((value) => ({
    value,
    titleKey: `dashboard.settings.menuDishLayout.${value}.title`,
    descKey: `dashboard.settings.menuDishLayout.${value}.description`,
  }))
</script>
