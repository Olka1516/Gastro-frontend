import type { IShowcasePlacedOrder } from '@/types/showcaseOrder'
import type { ITableReservation } from '@/types/tableReservation'

export type PeriodBounds = { dayStart: number; weekStart: number; monthStart: number }

export type AnalyticsDateRangeYmd = { startYmd: string; endYmd: string }

export type AnalyticsDateRangeMs = { startMs: number; endMs: number }

export function ymdFromDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseYmdLocal(ymd: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd)
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 0, 0, 0, 0)
  return Number.isNaN(d.getTime()) ? null : d
}

export function endOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)
}

export function defaultLastDaysRange(days = 7, now = new Date()): AnalyticsDateRangeYmd {
  const end = startOfLocalDay(now)
  const start = new Date(end)
  start.setDate(start.getDate() - (days - 1))
  return { startYmd: ymdFromDate(start), endYmd: ymdFromDate(end) }
}

export function dateRangeYmdToMs(range: AnalyticsDateRangeYmd): AnalyticsDateRangeMs | null {
  const startDate = parseYmdLocal(range.startYmd)
  const endDate = parseYmdLocal(range.endYmd)
  if (!startDate || !endDate) return null
  const [startMs, endMs] =
    startDate.getTime() <= endDate.getTime()
      ? [startDate.getTime(), endOfLocalDay(endDate).getTime()]
      : [endDate.getTime(), endOfLocalDay(startDate).getTime()]
  return { startMs, endMs }
}

export function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function startOfLocalWeekMonday(d: Date): Date {
  const day = d.getDay()
  const offset = day === 0 ? -6 : 1 - day
  const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + offset)
  monday.setHours(0, 0, 0, 0)
  return monday
}

export function startOfLocalMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)
}

export function getPeriodBounds(now = new Date()): PeriodBounds {
  return {
    dayStart: startOfLocalDay(now).getTime(),
    weekStart: startOfLocalWeekMonday(now).getTime(),
    monthStart: startOfLocalMonth(now).getTime(),
  }
}

export function orderCreatedAtMs(order: IShowcasePlacedOrder): number | null {
  if (!order.createdAt) return null
  const t = new Date(order.createdAt).getTime()
  return Number.isNaN(t) ? null : t
}

export function aggregateOrdersSince(
  orders: IShowcasePlacedOrder[],
  sinceMs: number,
  untilMs = Number.POSITIVE_INFINITY,
): { count: number; revenue: number } {
  let count = 0
  let revenue = 0
  for (const o of orders) {
    const t = orderCreatedAtMs(o)
    if (t === null || t < sinceMs || t > untilMs) continue
    count += 1
    revenue += o.total ?? 0
  }
  return { count, revenue }
}

export function countReservationsSince(
  reservations: ITableReservation[],
  sinceMs: number,
  untilMs = Number.POSITIVE_INFINITY,
): number {
  let n = 0
  for (const r of reservations) {
    const t = new Date(r.createdAt).getTime()
    if (!Number.isNaN(t) && t >= sinceMs && t <= untilMs) n += 1
  }
  return n
}

export function countOrdersWithStatusSince(
  orders: IShowcasePlacedOrder[],
  status: IShowcasePlacedOrder['status'],
  sinceMs: number,
  untilMs = Number.POSITIVE_INFINITY,
): number {
  let n = 0
  for (const o of orders) {
    if (o.status !== status) continue
    const t = orderCreatedAtMs(o)
    if (t === null || t < sinceMs || t > untilMs) continue
    n += 1
  }
  return n
}

export interface DishOrderPopularity {
  dishId: string
  name: string
  orderCount: number
}

export function dishPopularityByOrderCount(
  orders: IShowcasePlacedOrder[],
  sinceMs: number,
  limit = 15,
  untilMs = Number.POSITIVE_INFINITY,
): DishOrderPopularity[] {
  const map = new Map<string, { name: string; orderCount: number }>()
  for (const order of orders) {
    if (order.status === 'cancelled') continue
    const t = orderCreatedAtMs(order)
    if (t === null || t < sinceMs || t > untilMs) continue
    const lines = order.lines ?? []
    if (lines.length === 0) continue
    const seenDishInOrder = new Set<string>()
    for (const line of lines) {
      const id = line.dishId
      if (!id) continue
      if (!map.has(id)) {
        map.set(id, { name: (line.name || id).trim() || id, orderCount: 0 })
      }
      if (!seenDishInOrder.has(id)) {
        seenDishInOrder.add(id)
        map.get(id)!.orderCount += 1
      }
    }
  }
  return [...map.entries()]
    .map(([dishId, v]) => ({ dishId, name: v.name, orderCount: v.orderCount }))
    .sort((a, b) => b.orderCount - a.orderCount || a.name.localeCompare(b.name))
    .slice(0, limit)
}
