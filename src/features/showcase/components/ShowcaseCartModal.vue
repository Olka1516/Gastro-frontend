<template>
  <Teleport to="body">
    <Transition name="cart-modal">
      <div v-if="modelValue"
        class="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog"
        aria-modal="true" :aria-label="t('showcase.premium.cart')" @click.self="close">
        <div
          class="flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] shadow-2xl"
          @click.stop>
          <div class="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <h2 class="text-lg font-bold text-white md:text-xl">
              {{ t('showcase.premium.cart') }}
            </h2>
            <button type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              :aria-label="t('showcase.premium.cartClose')" @click="close">
              ✕
            </button>
          </div>

          <div class="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <p v-if="lines.length === 0" class="py-12 text-center text-gray-400">
              {{ t('showcase.premium.cartEmpty') }}
            </p>
            <ul v-else class="flex flex-col gap-3">
              <li v-for="line in lines" :key="line.lineId"
                class="flex flex-wrap items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3 sm:flex-nowrap">
                <div class="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#111]">
                  <img v-if="line.dish.image" :src="line.dish.image" :alt="line.dish.name"
                    class="h-full w-full object-cover" />
                  <div v-else class="flex h-full w-full items-center justify-center text-2xl text-white/30">
                    🍽
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between">
                    <p class="font-semibold text-white">{{ line.dish.name }}</p>
                    <p class="shrink-0 self-start font-bold text-white sm:pt-1">
                      {{ formatPrice(lineTotal(line)) }}
                    </p>
                  </div>
                  <p class="mt-0.5 text-xs text-gray-500">{{ line.dish.categoryName }}</p>
                  <div class="mt-2 flex flex-wrap items-center justify-between gap-4">
                    <p class="shrink-0 text-sm leading-none text-gray-400">
                      {{ formatPrice(line.dish.price) }} / {{ t('showcase.premium.cartUnit') }}
                    </p>
                    <div class="inline-flex items-center rounded-lg border border-white/15 bg-black/40" role="group"
                      :aria-label="t('showcase.premium.cartQuantity')">
                      <button type="button"
                        class="flex h-7 w-7 shrink-0 items-center justify-center text-sm leading-none text-white transition-colors hover:bg-white/10"
                        :aria-label="t('showcase.premium.cartDecrease')"
                        @click.stop="cartStore.decrementLineQuantity(line.lineId)">
                        −
                      </button>
                      <input :value="line.quantity" type="number" inputmode="numeric" min="1" max="999"
                        class="h-7 w-9 border-x border-white/15 bg-transparent text-center text-xs font-semibold text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        :aria-label="t('showcase.premium.cartQuantity')" @click.stop
                        @change="onQuantityInput(line.lineId, $event)" @keydown.enter="blurQuantityInput" />
                      <button type="button"
                        class="flex h-7 w-7 shrink-0 items-center justify-center text-sm leading-none text-white transition-colors hover:bg-white/10"
                        :aria-label="t('showcase.premium.cartIncrease')"
                        @click.stop="cartStore.incrementLineQuantity(line.lineId)">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div v-if="lines.length > 0" class="flex shrink-0 flex-col gap-4 border-t border-white/10 px-5 py-4">
            <div class="flex items-center justify-between text-white">
              <span class="text-gray-400">{{ t('showcase.premium.cartTotal') }}</span>
              <span class="text-xl font-bold">{{ formatPrice(grandTotal) }}</span>
            </div>
            <BaseButton
              v-if="placeSlug"
              variant="showcase"
              block
              pressable
              :text="t('showcase.premium.goToCheckout')"
              @click="goToCheckout"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { LINK_TEMPLATES } from '@/constants'
import { useShowcasePlaceTheme } from '@/features/showcase/composables/useShowcasePlaceTheme'
import { useShowcaseCartStore } from '@/stores/showcaseCartStore'
import type { IShowcaseCartLine } from '@/types/showcaseCart'
import { computed, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const cartStore = useShowcaseCartStore()

const placeSlug = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? id : ''
})

const { formatPrice } = useShowcasePlaceTheme(placeSlug)

const lines = computed(() => cartStore.linesInCart)

const lineTotal = (line: IShowcaseCartLine) => line.dish.price * line.quantity

const grandTotal = computed(() => lines.value.reduce((sum, line) => sum + lineTotal(line), 0))

const close = () => {
  emit('update:modelValue', false)
}

const goToCheckout = async () => {
  if (!placeSlug.value || lines.value.length === 0) return
  close()
  await router.push(LINK_TEMPLATES.MENU_CHECKOUT(placeSlug.value))
}

const onQuantityInput = (lineId: string, event: Event) => {
  const el = event.target as HTMLInputElement
  cartStore.setLineQuantity(lineId, Number(el.value))
}

const blurQuantityInput = (event: KeyboardEvent) => {
  const el = event.target
  if (el instanceof HTMLInputElement) el.blur()
}

watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  },
  { immediate: true },
)

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.cart-modal-enter-active,
.cart-modal-leave-active {
  transition: opacity 0.2s ease;
}

.cart-modal-enter-active .rounded-2xl,
.cart-modal-leave-active .rounded-2xl {
  transition: transform 0.2s ease;
}

.cart-modal-enter-from,
.cart-modal-leave-to {
  opacity: 0;
}

.cart-modal-enter-from .rounded-2xl,
.cart-modal-leave-to .rounded-2xl {
  transform: scale(0.96);
}
</style>
