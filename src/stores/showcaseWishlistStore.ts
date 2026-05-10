import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const storageKey = (placeSlug: string) => `showcase-likes:${placeSlug}`

export const useShowcaseWishlistStore = defineStore('showcaseWishlist', () => {
  const placeSlug = ref('')
  const likedDishIds = ref<string[]>([])

  const count = computed(() => likedDishIds.value.length)

  const persist = () => {
    if (!placeSlug.value) return
    localStorage.setItem(storageKey(placeSlug.value), JSON.stringify(likedDishIds.value))
  }

  const load = (slug: string) => {
    placeSlug.value = slug
    if (!slug) {
      likedDishIds.value = []
      return
    }
    const raw = localStorage.getItem(storageKey(slug))
    if (!raw) {
      likedDishIds.value = []
      return
    }
    try {
      const parsed: unknown = JSON.parse(raw)
      likedDishIds.value = Array.isArray(parsed)
        ? parsed.filter((id): id is string => typeof id === 'string')
        : []
    } catch {
      likedDishIds.value = []
    }
  }

  const toggle = (dishId: string) => {
    if (!placeSlug.value) return
    const isLiked = likedDishIds.value.includes(dishId)
    likedDishIds.value = isLiked
      ? likedDishIds.value.filter((id) => id !== dishId)
      : [...likedDishIds.value, dishId]
    persist()
  }

  return {
    placeSlug,
    likedDishIds,
    count,
    load,
    toggle,
    persist,
  }
})
