import type {
  IShowcaseOrderLinePayload,
  IShowcasePlacedOrder,
  ShowcaseOrderStatus,
} from '@/types/showcaseOrder'
import { intlLocaleForUi } from '@/lang'
import { useI18n } from 'vue-i18n'

export function sortShowcaseOrdersByDateDesc(orders: IShowcasePlacedOrder[]) {
  return [...orders].sort((a, b) => {
    const ta = a.createdAt ? Date.parse(a.createdAt) : 0
    const tb = b.createdAt ? Date.parse(b.createdAt) : 0
    return tb - ta
  })
}

const STATUS_BADGE_CLASS: Record<ShowcaseOrderStatus, string> = {
  pending: 'bg-amber-500/20 text-amber-200 border border-amber-500/35',
  confirmed: 'bg-sky-500/20 text-sky-200 border border-sky-500/35',
  completed: 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/35',
  cancelled: 'bg-red-500/20 text-red-200 border border-red-500/35',
}

export function useShowcaseOrdersTable() {
  const { locale } = useI18n()

  const formatOrderDate = (iso?: string) => {
    if (!iso) return '—'
    const d = Date.parse(iso)
    if (Number.isNaN(d)) return iso
    return new Intl.DateTimeFormat(intlLocaleForUi(locale.value), {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(d)
  }

  const formatCustomerName = (order: IShowcasePlacedOrder) => {
    const c = order.customer
    if (!c) return '—'
    const parts = [c.firstName, c.lastName].filter(Boolean)
    return parts.length ? parts.join(' ') : '—'
  }

  const formatLinesSummary = (lines: IShowcaseOrderLinePayload[] | undefined) => {
    if (!lines?.length) return '—'
    return lines.map((l) => `${l.name} ×${l.quantity}`).join(', ')
  }

  const statusBadgeClass = (status: ShowcaseOrderStatus) => STATUS_BADGE_CLASS[status]

  return {
    formatOrderDate,
    formatCustomerName,
    formatLinesSummary,
    statusBadgeClass,
  }
}
