<template>
  <Teleport to="body">
    <Transition name="wishlist-modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-label="t('showcase.wishlist.title')"
        @click.self="close"
      >
        <div
          class="flex max-h-[min(90vh,820px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f] to-[#0f0f11] shadow-2xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <h2 class="text-lg font-bold text-white md:text-xl">
              {{ t('showcase.wishlist.title') }}
            </h2>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              :aria-label="t('showcase.wishlist.close')"
              @click="close"
            >
              ✕
            </button>
          </div>

          <div class="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <p v-if="orderedWishlistDishes.length === 0" class="py-12 text-center text-gray-400">
              {{ t('showcase.wishlist.empty') }}
            </p>
            <div
              v-else
              class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <DishCard
                v-for="dish in orderedWishlistDishes"
                :key="dish.id"
                :dish="dish"
                :is-liked="true"
                :menu-icon-color="menuIconColor"
                :show-add-to-cart="showAddToCart"
                :category-name="categoryNameForDish(dish)"
                @click="openDish"
                @toggle-like="onToggleLike"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <DishDetailsModal
    :dish="selectedDish"
    :category-name="selectedDishCategoryName"
    :menu-icon-color="menuIconColor"
    @close="closeDishModal"
  />
</template>

<script setup lang="ts">
import { useShowcasePlaceTheme } from '@/features/showcase/composables/useShowcasePlaceTheme'
import { useShowcaseStore } from '@/stores/showcaseStore'
import { useShowcaseWishlistStore } from '@/stores/showcaseWishlistStore'
import type { IDish } from '@/types/menu'
import { computed, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import DishCard from './DishCard.vue'
import DishDetailsModal from './DishDetailsModal.vue'

const props = defineProps<{
  modelValue: boolean
  showAddToCart?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { t } = useI18n()
const route = useRoute()
const showcaseStore = useShowcaseStore()
const wishlistStore = useShowcaseWishlistStore()

const placeRouteKey = computed(() => String(route.params.id ?? ''))
const { menuIconColor } = useShowcasePlaceTheme(placeRouteKey)

const selectedDish = ref<IDish | null>(null)

const orderedWishlistDishes = computed(() => {
  const byId = new Map(showcaseStore.dishes.map((d) => [d.id, d]))
  return wishlistStore.likedDishIds.map((id) => byId.get(id)).filter((d): d is IDish => !!d)
})

const categoryNameForDish = (dish: IDish) => {
  const category = showcaseStore.categories.find((c) => c.id === dish.category)
  return category?.name ?? dish.category
}

const selectedDishCategoryName = computed(() => {
  if (!selectedDish.value) return ''
  return categoryNameForDish(selectedDish.value)
})

const close = () => {
  emit('update:modelValue', false)
}

const openDish = (dish: IDish) => {
  selectedDish.value = dish
}

const closeDishModal = () => {
  selectedDish.value = null
}

const onToggleLike = (dishId: string) => {
  wishlistStore.toggle(dishId)
}

watch(
  () => props.modelValue,
  async (open) => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const slug = placeRouteKey.value
      if (
        slug &&
        wishlistStore.likedDishIds.length > 0 &&
        showcaseStore.dishes.length === 0
      ) {
        await Promise.all([
          showcaseStore.fetchDishes(slug),
          showcaseStore.fetchCategories(slug),
          showcaseStore.fetchPlaceBranding(slug),
        ])
      }
    } else {
      selectedDish.value = null
      document.body.style.overflow = ''
    }
  },
  { immediate: true },
)

watch(placeRouteKey, (slug) => {
  if (slug) wishlistStore.load(slug)
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.wishlist-modal-enter-active,
.wishlist-modal-leave-active {
  transition: opacity 0.2s ease;
}

.wishlist-modal-enter-active .rounded-2xl,
.wishlist-modal-leave-active .rounded-2xl {
  transition: transform 0.2s ease;
}

.wishlist-modal-enter-from,
.wishlist-modal-leave-to {
  opacity: 0;
}

.wishlist-modal-enter-from .rounded-2xl,
.wishlist-modal-leave-to .rounded-2xl {
  transform: scale(0.96);
}
</style>
