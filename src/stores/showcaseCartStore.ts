import type { IDish } from '@/types/menu'
import type {
  IShowcaseCartLine,
  IShowcaseCartDishSnapshot,
  ShowcaseCartLineStatus,
} from '@/types/showcaseCart'
import {
  SHOWCASE_ORDER_HISTORY_UPDATED_EVENT,
  canonicalShowcasePlaceSlug,
} from '@/utils/showcaseOrderHistoryStorage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const storageKey = (placeSlug: string) => `showcase-cart:${placeSlug}`

const isRecord = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null

const isValidLine = (x: unknown): x is IShowcaseCartLine => {
  if (!isRecord(x)) return false
  if (typeof x.lineId !== 'string' || typeof x.dishId !== 'string') return false
  if (typeof x.quantity !== 'number' || !Number.isFinite(x.quantity) || x.quantity < 1) return false
  if (x.status !== 'in_cart' && x.status !== 'ordered') return false
  if (typeof x.addedAt !== 'string') return false
  const d = x.dish
  if (!isRecord(d)) return false
  if (typeof d.id !== 'string' || typeof d.name !== 'string') return false
  if (typeof d.description !== 'string') return false
  if (typeof d.price !== 'number' || typeof d.category !== 'string') return false
  if (typeof d.categoryName !== 'string') return false
  if (typeof d.image !== 'string') return false
  return true
}

const snapshotFromDish = (dish: IDish, categoryName: string): IShowcaseCartDishSnapshot => ({
  id: dish.id,
  name: dish.name,
  description: dish.description ?? '',
  price: Number(dish.price ?? 0),
  category: dish.category,
  categoryName,
  image: typeof dish.image === 'string' ? dish.image : '',
})

const newLineId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

export const useShowcaseCartStore = defineStore('showcaseCart', () => {
  const placeSlug = ref('')
  const lines = ref<IShowcaseCartLine[]>([])

  const linesInCart = computed(() => lines.value.filter((l) => l.status === 'in_cart'))
  const orderedLines = computed(() => lines.value.filter((l) => l.status === 'ordered'))

  const persist = () => {
    if (!placeSlug.value) return
    localStorage.setItem(storageKey(placeSlug.value), JSON.stringify(lines.value))
  }

  const load = (slug: string) => {
    placeSlug.value = slug
    if (!slug) {
      lines.value = []
      return
    }
    const raw = localStorage.getItem(storageKey(slug))
    if (!raw) {
      lines.value = []
      return
    }
    try {
      const parsed: unknown = JSON.parse(raw)
      lines.value = Array.isArray(parsed) ? parsed.filter(isValidLine) : []
    } catch {
      lines.value = []
    }
  }

  const addDish = (
    dish: IDish,
    categoryName: string,
    display?: { name?: string; description?: string },
  ) => {
    if (!placeSlug.value) return

    const snapshot = snapshotFromDish(dish, categoryName)
    if (display?.name?.trim()) snapshot.name = display.name.trim()
    if (display?.description !== undefined) snapshot.description = display.description

    const openLine = lines.value.find((l) => l.dishId === dish.id && l.status === 'in_cart')
    if (openLine) {
      openLine.quantity += 1
      openLine.dish = snapshot
    } else {
      lines.value.push({
        lineId: newLineId(),
        dishId: dish.id,
        quantity: 1,
        status: 'in_cart',
        addedAt: new Date().toISOString(),
        dish: snapshot,
      })
    }
    persist()
  }

  const setLineStatus = (lineId: string, status: ShowcaseCartLineStatus) => {
    const line = lines.value.find((l) => l.lineId === lineId)
    if (!line) return
    line.status = status
    persist()
  }

  const decrementOrRemoveDish = (dishId: string) => {
    if (!placeSlug.value) return
    const idx = lines.value.findIndex((l) => l.dishId === dishId && l.status === 'in_cart')
    if (idx === -1) return
    const line = lines.value[idx]
    if (line.quantity > 1) {
      line.quantity -= 1
    } else {
      lines.value.splice(idx, 1)
    }
    persist()
  }

  const incrementLineQuantity = (lineId: string) => {
    if (!placeSlug.value) return
    const line = lines.value.find((l) => l.lineId === lineId && l.status === 'in_cart')
    if (!line) return
    line.quantity = Math.min(line.quantity + 1, 999)
    persist()
  }

  const decrementLineQuantity = (lineId: string) => {
    if (!placeSlug.value) return
    const idx = lines.value.findIndex((l) => l.lineId === lineId && l.status === 'in_cart')
    if (idx === -1) return
    const line = lines.value[idx]
    if (line.quantity > 1) {
      line.quantity -= 1
    } else {
      lines.value.splice(idx, 1)
    }
    persist()
  }

  const setLineQuantity = (lineId: string, raw: number) => {
    if (!placeSlug.value) return
    const idx = lines.value.findIndex((l) => l.lineId === lineId && l.status === 'in_cart')
    if (idx === -1) return
    const q = Math.floor(Number(raw))
    if (!Number.isFinite(q) || q < 1) {
      lines.value.splice(idx, 1)
    } else {
      lines.value[idx].quantity = Math.min(q, 999)
    }
    persist()
  }

  const markInCartLinesAsOrdered = () => {
    if (!placeSlug.value) return
    let changed = false
    for (const line of lines.value) {
      if (line.status === 'in_cart') {
        line.status = 'ordered'
        changed = true
      }
    }
    if (changed) {
      persist()
      window.dispatchEvent(
        new CustomEvent(SHOWCASE_ORDER_HISTORY_UPDATED_EVENT, {
          detail: { placeSlug: canonicalShowcasePlaceSlug(placeSlug.value) },
        }),
      )
    }
  }

  return {
    placeSlug,
    lines,
    linesInCart,
    orderedLines,
    load,
    addDish,
    decrementOrRemoveDish,
    incrementLineQuantity,
    decrementLineQuantity,
    setLineQuantity,
    setLineStatus,
    markInCartLinesAsOrdered,
    persist,
  }
})
