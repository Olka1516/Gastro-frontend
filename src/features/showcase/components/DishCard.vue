<template>
  <div v-if="layout === 'list'"
    class="dish-card-list group flex w-full overflow-hidden rounded-xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] shadow-lg transition-colors duration-200 hover:border-[#3d3c44] cursor-pointer"
    :style="dishCardStyle" @click="handleClick">
    <div class="relative h-[5.5rem] w-[5.5rem] shrink-0 sm:h-28 sm:w-28">
      <img v-if="typeof dish.image === 'string'" :src="dish.image" :alt="dishLabels.name"
        class="h-full w-full object-cover transition duration-300 group-hover:brightness-105" />
      <div v-else class="flex h-full w-full items-center justify-center bg-[#2a2930] text-xl text-white/25">
        —
      </div>

      <div v-if="dish.isAvailable === 'unavailable'" class="absolute left-1 top-1">
        <span
          class="rounded-md border border-red-500/30 bg-red-500/25 px-1.5 py-0.5 text-[10px] font-semibold text-red-200 backdrop-blur-sm">
          {{ t('dashboard.unavailable') }}
        </span>
      </div>
    </div>

    <div
      class="flex min-h-[5.5rem] min-w-0 flex-1 flex-col justify-center gap-1 border-l border-[#2a2930]/70 py-2.5 pl-3 pr-2 sm:min-h-28 sm:pl-4">
      <div class="flex items-start justify-between gap-2 sm:gap-3">
        <h3 class="line-clamp-2 text-left text-base font-bold leading-snug text-white sm:text-lg">
          {{ dishLabels.name }}
        </h3>
        <div class="shrink-0 rounded-lg px-2 py-0.5 text-sm font-bold tabular-nums text-white sm:text-base"
          :style="priceBadgeStyle">
          ${{ Number(dish.price || 0).toFixed(2) }}
        </div>
      </div>
      <p class="line-clamp-2 text-left text-xs leading-relaxed text-gray-400 sm:text-sm">
        {{ dishLabels.description || t('dashboard.menu.noDescription') }}
      </p>
    </div>

    <div
      class="flex shrink-0 flex-col items-center justify-center gap-1.5 border-l border-[#2a2930]/60 bg-[#0c0c0e]/50 px-2 py-2 sm:gap-2 sm:px-3">
      <button type="button" :class="[
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer',
        isLiked ? 'text-white' : 'border-white/20 bg-[#0f0f11]/80 text-white/85',
      ]" :style="likeButtonStyle" aria-label="Like dish" @click.stop="emit('toggleLike', dish.id)">
        <span class="text-base leading-none">{{ isLiked ? '♥' : '♡' }}</span>
      </button>
      <button v-if="showAddToCart" type="button" :class="[
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer',
        quantityInCart > 0 ? 'text-white' : 'border-white/20 bg-[#0f0f11]/80 text-white/85',
      ]" :style="cartButtonStyle" :aria-label="quantityInCart > 0 ? t('showcase.premium.removeFromCart') : t('showcase.premium.addToCart')
        " @click.stop="handleCartToggle">
        <img :src="quantityInCart > 0 ? iconSubtract : iconPlus" alt="" class="h-5 w-5 object-contain" />
      </button>
    </div>
  </div>

  <article v-else-if="layout === 'magazine'"
    class="dish-card-magazine group cursor-pointer rounded-2xl border border-[#2a2930] bg-[#141318] p-5 shadow-lg transition-colors duration-200 hover:border-[#3f3e47] sm:p-6 md:flex md:gap-10 md:p-8"
    :style="dishCardStyle" @click="handleClick">
    <div
      class="relative mx-auto mb-6 w-full max-w-[280px] shrink-0 sm:max-w-[320px] md:order-2 md:mb-0 md:mx-0 md:w-[42%] md:max-w-[340px]">
      <div class="rounded-2xl bg-[#0a0a0c] p-2 ring-1 ring-inset ring-white/[0.06] md:sticky md:top-28">
        <div
          class="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl bg-[#121214]">
          <img v-if="typeof dish.image === 'string'" :src="dish.image" :alt="dishLabels.name" decoding="async"
            class="max-h-full max-w-full object-contain" />
          <div v-else class="text-3xl text-white/15">—</div>

          <div v-if="dish.isAvailable === 'unavailable'" class="absolute left-2 top-2 z-10">
            <span
              class="rounded-md border border-red-500/35 bg-red-950/80 px-2 py-1 text-[10px] font-semibold text-red-200 backdrop-blur-sm">
              {{ t('dashboard.unavailable') }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex min-w-0 flex-1 flex-col justify-start gap-8 md:order-1 md:justify-between md:gap-0 md:self-stretch">
      <div class="shrink-0">
        <p v-if="categoryName" class="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          {{ categoryName }}
        </p>
        <h3 class="text-balance text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
          {{ dishLabels.name }}
        </h3>
        <div class="mt-3 h-px w-16 rounded-full" :style="{ backgroundColor: menuIconColor || '#dc5b41' }" />
        <p class="mt-5 text-[15px] leading-[1.65] text-gray-400 sm:text-base">
          {{ dishLabels.description || t('dashboard.menu.noDescription') }}
        </p>
      </div>

      <div class="flex shrink-0 flex-wrap items-center gap-4 border-t border-white/[0.06] pt-6 md:mt-0">
        <span class="text-2xl font-semibold tabular-nums text-white sm:text-[1.65rem]">
          ${{ Number(dish.price || 0).toFixed(2) }}
        </span>
        <div class="ml-auto flex items-center gap-2">
          <button type="button" :class="[
            'flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors cursor-pointer',
            isLiked ? 'border-transparent text-white' : 'border-[#2f2e35] bg-[#1a191f] text-gray-300 hover:border-[#3d3c44]',
          ]" :style="isLiked ? likeButtonStyle : undefined" aria-label="Like dish"
            @click.stop="emit('toggleLike', dish.id)">
            <span class="leading-none">{{ isLiked ? '♥' : '♡' }}</span>
          </button>
          <button v-if="showAddToCart" type="button" :class="[
            'flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors cursor-pointer',
            quantityInCart > 0 ? 'border-red-500/50 bg-[#1a191f] text-white' : 'border-[#2f2e35] bg-[#1a191f] text-gray-200 hover:border-[#3d3c44]',
          ]" :style="quantityInCart === 0 ? cartButtonStyle : undefined" :aria-label="quantityInCart > 0 ? t('showcase.premium.removeFromCart') : t('showcase.premium.addToCart')
            " @click.stop="handleCartToggle">
            <img :src="quantityInCart > 0 ? iconSubtract : iconPlus" alt="" class="h-5 w-5 object-contain" />
          </button>
        </div>
      </div>
    </div>
  </article>

  <div v-else
    class="dish-card bg-gradient-to-br from-[#1a191f] to-[#0f0f11] rounded-lg border border-[#2a2930] overflow-hidden transition-all duration-300 hover:scale-102 group shadow-lg cursor-pointer"
    :style="dishCardStyle" @click="handleClick">
    <div class="relative h-48 overflow-hidden">
      <img v-if="typeof dish.image === 'string'" :src="dish.image" :alt="dishLabels.name"
        class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent"></div>

      <button type="button" :class="[
        'absolute top-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 z-10 cursor-pointer',
        isLiked ? 'text-white' : 'bg-[#0f0f11]/70 border-white/20 text-white/80',
      ]" :style="likeButtonStyle" @click.stop="emit('toggleLike', dish.id)" aria-label="Like dish">
        <span class="text-lg leading-none">{{ isLiked ? '♥' : '♡' }}</span>
      </button>

      <div v-if="dish.isAvailable === 'unavailable'" class="absolute top-4 left-4">
        <span
          class="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg bg-red-500/20 text-red-300 border border-red-500/30">
          {{ t('dashboard.unavailable') }}
        </span>
      </div>

      <div class="absolute bottom-4 left-4">
        <div class="px-4 py-2 rounded-xl shadow-lg backdrop-blur-md" :style="priceBadgeStyle">
          <span class="text-white text-lg font-bold">${{ Number(dish.price || 0).toFixed(2) }}</span>
        </div>
      </div>

      <button v-if="showAddToCart" type="button" :class="[
        'absolute bottom-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 z-10 cursor-pointer',
        quantityInCart > 0 ? 'text-white' : 'bg-[#0f0f11]/70 border-white/20 text-white/80',
      ]" :style="cartButtonStyle" :aria-label="quantityInCart > 0 ? t('showcase.premium.removeFromCart') : t('showcase.premium.addToCart')
        " @click.stop="handleCartToggle">
        <img :src="quantityInCart > 0 ? iconSubtract : iconPlus" alt="" class="h-6 w-6 object-contain" />
      </button>
    </div>

    <div class="p-5 flex flex-col gap-3">
      <h3 class="text-white text-xl font-bold line-clamp-1">{{ dishLabels.name }}</h3>
      <p class="text-gray-400 text-sm line-clamp-2 leading-relaxed">
        {{ dishLabels.description || t('dashboard.menu.noDescription') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import iconPlus from '@/assets/images/icons/plus.svg'
import iconSubtract from '@/assets/images/icons/substract.svg'
import { DEFAULT_MENU_DISH_LAYOUT, type MenuDishLayout } from '@/constants/menuDishLayout'
import { useShowcaseMenuContentLanguage } from '@/features/showcase/composables/useShowcaseMenuContentLanguage'
import { useShowcaseCartStore } from '@/stores/showcaseCartStore'
import type { IDish } from '@/types/menu'
import { computed, toRef } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { useDishLabels, getDishLabels } = useShowcaseMenuContentLanguage()

const props = withDefaults(
  defineProps<{
    dish: IDish
    layout?: MenuDishLayout
    isLiked: boolean
    menuIconColor: string
    showAddToCart?: boolean
    categoryName?: string
  }>(),
  { showAddToCart: false, categoryName: '', layout: DEFAULT_MENU_DISH_LAYOUT },
)

const emit = defineEmits<{
  (e: 'click', dish: IDish): void
  (e: 'toggleLike', dishId: string): void
}>()

const cartStore = useShowcaseCartStore()
const dishLabels = useDishLabels(toRef(props, 'dish'))

const quantityInCart = computed(() => {
  if (!props.showAddToCart) return 0
  return cartStore.linesInCart.find((l) => l.dishId === props.dish.id)?.quantity ?? 0
})

const handleCartToggle = () => {
  if (quantityInCart.value > 0) {
    cartStore.decrementOrRemoveDish(props.dish.id)
    return
  }
  const name = props.categoryName.trim() || props.dish.category
  const labels = getDishLabels(props.dish)
  cartStore.addDish(props.dish, name, labels)
}

const handleClick = () => {
  emit('click', props.dish)
}

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '')
  const fullHex =
    normalized.length === 3
      ? normalized
        .split('')
        .map((char) => char + char)
        .join('')
      : normalized

  const isHex = /^[0-9a-f]{6}$/i.test(fullHex)
  if (!isHex) return `rgba(220, 91, 65, ${alpha})`

  const r = parseInt(fullHex.slice(0, 2), 16)
  const g = parseInt(fullHex.slice(2, 4), 16)
  const b = parseInt(fullHex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const dishCardStyle = computed(() => ({
  '--menu-icon-color': props.menuIconColor || '#dc5b41',
  '--menu-icon-color-alpha-20': hexToRgba(props.menuIconColor || '#dc5b41', 0.2),
  '--menu-icon-color-alpha-50': hexToRgba(props.menuIconColor || '#dc5b41', 0.5),
}))

const likeButtonStyle = computed(() => ({
  backgroundColor: props.isLiked ? hexToRgba(props.menuIconColor || '#dc5b41', 0.9) : undefined,
  borderColor: props.isLiked ? props.menuIconColor || '#dc5b41' : undefined,
}))

const priceBadgeStyle = computed(() => ({
  background: `linear-gradient(to right, ${props.menuIconColor || '#dc5b41'}, ${hexToRgba(
    props.menuIconColor || '#dc5b41',
    0.85,
  )})`,
}))

const cartButtonStyle = computed(() => {
  const c = props.menuIconColor || '#dc5b41'
  if (quantityInCart.value > 0) {
    return {
      backgroundColor: hexToRgba('#0f0f11', 0.85),
      borderColor: '#ef4444',
    }
  }
  return {
    backgroundColor: hexToRgba(c, 0.92),
    borderColor: hexToRgba(c, 0.5),
  }
})
</script>
