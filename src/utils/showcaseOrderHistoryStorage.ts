import type {
  IShowcaseLocalOrderHistoryEntry,
  IShowcaseLocalOrderHistoryLine,
  IShowcaseOrderCustomer,
  IShowcaseOrderLinePayload,
} from '@/types/showcaseOrder'
import { spaceToUnderscore } from '@/utils/textHelpers'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const SHOWCASE_ORDER_HISTORY_UPDATED_EVENT = 'showcase-order-history-updated'

export const SHOWCASE_ORDER_HISTORY_STORAGE_PREFIX = 'showcase-order-history:'

export const SHOWCASE_CART_STORAGE_PREFIX = 'showcase-cart:'

const STORAGE_PREFIX = SHOWCASE_ORDER_HISTORY_STORAGE_PREFIX
const MAX_ENTRIES = 40

function decodeURIComponentSafe(s: string): string {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

export function canonicalShowcasePlaceSlug(raw: string): string {
  return spaceToUnderscore(decodeURIComponentSafe(raw.trim()))
}

function normalizeHistoryLookupKey(slug: string): string {
  return canonicalShowcasePlaceSlug(slug).toLowerCase()
}

export function showcaseOrderHistoryStorageKey(placeSlug: string): string {
  return `${STORAGE_PREFIX}${canonicalShowcasePlaceSlug(placeSlug)}`
}

export function placeSlugFromShowcaseRoute(route: RouteLocationNormalizedLoaded): string {
  const raw = route.params.id
  if (raw != null) {
    const s = Array.isArray(raw) ? raw[0] : raw
    const t = String(s ?? '').trim()
    if (t) return decodeURIComponentSafe(t)
  }
  const m = route.path.match(/^\/menu\/([^/]+)/)
  return m ? decodeURIComponentSafe(m[1]) : ''
}

const isRecord = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null

function normalizeHistoryLine(x: unknown): IShowcaseLocalOrderHistoryLine | null {
  if (!isRecord(x)) return null
  const name = typeof x.name === 'string' ? x.name : '—'
  const quantity = Number(x.quantity)
  const unitPrice = Number(x.unitPrice)
  if (!Number.isFinite(quantity) || !Number.isFinite(unitPrice)) return null
  const categoryName = typeof x.categoryName === 'string' ? x.categoryName : ''
  return { name, quantity, unitPrice, categoryName }
}

export function normalizeHistoryEntry(o: unknown): IShowcaseLocalOrderHistoryEntry | null {
  if (!isRecord(o)) return null
  const id = o.id
  const placedAt = o.placedAt
  if (typeof id !== 'string' || !id.trim()) return null
  if (typeof placedAt !== 'string' || !placedAt.trim()) return null
  const total = Number(o.total)
  if (!Number.isFinite(total)) return null
  const customerSummary =
    typeof o.customerSummary === 'string' && o.customerSummary.trim()
      ? o.customerSummary.trim()
      : '—'
  if (!Array.isArray(o.lines)) return null
  const lines = o.lines
    .map(normalizeHistoryLine)
    .filter((l): l is IShowcaseLocalOrderHistoryLine => l !== null)
  return {
    id: id.trim(),
    placedAt: placedAt.trim(),
    total,
    customerSummary,
    lines,
    source: 'server',
  }
}

export function normalizeCartLineToHistoryEntry(
  o: unknown,
): IShowcaseLocalOrderHistoryEntry | null {
  if (!isRecord(o)) return null
  if (o.status !== 'ordered') return null
  const lineId = o.lineId
  if (typeof lineId !== 'string' || !lineId.trim()) return null
  const quantity = Number(o.quantity)
  if (!Number.isFinite(quantity) || quantity < 1) return null
  const addedAt = typeof o.addedAt === 'string' ? o.addedAt.trim() : ''
  if (!addedAt) return null
  const dish = o.dish
  if (!isRecord(dish)) return null
  const name = typeof dish.name === 'string' ? dish.name : '—'
  const price = Number(dish.price)
  if (!Number.isFinite(price)) return null
  const categoryName = typeof dish.categoryName === 'string' ? dish.categoryName : ''
  const unitPrice = price
  const total = quantity * unitPrice
  return {
    id: `cart:${lineId.trim()}`,
    placedAt: addedAt,
    total,
    customerSummary: '—',
    lines: [{ name, quantity, unitPrice, categoryName }],
    source: 'cart',
  }
}

function listLocalStorageKeysWithPrefix(prefix: string): string[] {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k?.startsWith(prefix)) keys.push(k)
  }
  return keys
}

function listHistoryStorageKeyNames(): string[] {
  return listLocalStorageKeysWithPrefix(STORAGE_PREFIX)
}

function matchingHistoryStorageKeys(placeSlug: string): string[] {
  if (!placeSlug.trim()) return []
  const target = normalizeHistoryLookupKey(placeSlug)
  return listHistoryStorageKeyNames().filter((fullKey) => {
    const suffix = fullKey.slice(STORAGE_PREFIX.length)
    return normalizeHistoryLookupKey(suffix) === target
  })
}

function matchingCartStorageKeys(placeSlug: string): string[] {
  if (!placeSlug.trim()) return []
  const target = normalizeHistoryLookupKey(placeSlug)
  return listLocalStorageKeysWithPrefix(SHOWCASE_CART_STORAGE_PREFIX).filter((fullKey) => {
    const suffix = fullKey.slice(SHOWCASE_CART_STORAGE_PREFIX.length)
    return normalizeHistoryLookupKey(suffix) === target
  })
}

function mergeHistoryItemIntoMap(
  byId: Map<string, IShowcaseLocalOrderHistoryEntry>,
  item: unknown,
) {
  const e = normalizeHistoryEntry(item) ?? normalizeCartLineToHistoryEntry(item)
  if (e) byId.set(e.id, e)
}

export function readShowcaseOrderHistory(placeSlug: string): IShowcaseLocalOrderHistoryEntry[] {
  if (!placeSlug.trim()) return []
  const byId = new Map<string, IShowcaseLocalOrderHistoryEntry>()
  for (const fullKey of matchingHistoryStorageKeys(placeSlug)) {
    const raw = localStorage.getItem(fullKey)
    if (!raw) continue
    try {
      const parsed: unknown = JSON.parse(raw)
      if (!Array.isArray(parsed)) continue
      for (const item of parsed) {
        mergeHistoryItemIntoMap(byId, item)
      }
    } catch {
      console.error('Error parsing showcase order history:', fullKey, raw)
    }
  }
  for (const fullKey of matchingCartStorageKeys(placeSlug)) {
    const raw = localStorage.getItem(fullKey)
    if (!raw) continue
    try {
      const parsed: unknown = JSON.parse(raw)
      if (!Array.isArray(parsed)) continue
      for (const item of parsed) {
        mergeHistoryItemIntoMap(byId, item)
      }
    } catch {
      console.error('Error parsing showcase cart:', fullKey, raw)
    }
  }
  return [...byId.values()].sort((a, b) => {
    const ta = Date.parse(a.placedAt)
    const tb = Date.parse(b.placedAt)
    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0
    if (Number.isNaN(ta)) return 1
    if (Number.isNaN(tb)) return -1
    return tb - ta
  })
}

export function customerSummaryForHistory(c: IShowcaseOrderCustomer): string {
  const parts = [c.firstName, c.lastName].filter((x) => typeof x === 'string' && x.trim())
  const name = parts.join(' ').trim()
  const phone = typeof c.phone === 'string' ? c.phone.trim() : ''
  if (name && phone) return `${name} · ${phone}`
  return name || phone || '—'
}

export function linesSnapshotForHistory(lines: IShowcaseOrderLinePayload[]) {
  return lines.map((l) => ({
    name: l.name,
    quantity: l.quantity,
    unitPrice: l.unitPrice,
    categoryName: l.categoryName,
  }))
}

export function appendShowcaseOrderHistory(
  placeSlug: string,
  entry: IShowcaseLocalOrderHistoryEntry,
): void {
  if (!placeSlug.trim() || !entry.id) return
  const canonicalKey = showcaseOrderHistoryStorageKey(placeSlug)
  const prev = readShowcaseOrderHistory(placeSlug).filter((e) => e.source !== 'cart')
  const withoutDup = prev.filter((e) => e.id !== entry.id)
  const next = [entry, ...withoutDup].slice(0, MAX_ENTRIES)
  localStorage.setItem(canonicalKey, JSON.stringify(next))
  window.dispatchEvent(
    new CustomEvent(SHOWCASE_ORDER_HISTORY_UPDATED_EVENT, {
      detail: { placeSlug: canonicalShowcasePlaceSlug(placeSlug) },
    }),
  )
}
