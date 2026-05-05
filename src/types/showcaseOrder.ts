import type { IShowcaseCartLine } from '@/types/showcaseCart'

export interface IShowcaseOrderCustomer {
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  deliveryTime: string
  comment: string
}

export interface IShowcaseOrderLinePayload {
  dishId: string
  quantity: number
  unitPrice: number
  name: string
  categoryName: string
}

export interface IShowcaseOrderPayload {
  customer: IShowcaseOrderCustomer
  lines: IShowcaseOrderLinePayload[]
  total: number
}

export const SHOWCASE_ORDER_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const

export type ShowcaseOrderStatus = (typeof SHOWCASE_ORDER_STATUSES)[number]

export type ShowcaseOrderStatusFilter = ShowcaseOrderStatus | 'all'

/** Order as returned for the owner dashboard (GET list). */
export interface IShowcasePlacedOrder {
  id: string
  createdAt?: string
  status: ShowcaseOrderStatus
  customer: IShowcaseOrderCustomer
  lines: IShowcaseOrderLinePayload[]
  total: number
}

export const linesToOrderPayload = (lines: IShowcaseCartLine[]): IShowcaseOrderLinePayload[] =>
  lines.map((l) => ({
    dishId: l.dishId,
    quantity: l.quantity,
    unitPrice: l.dish.price,
    name: l.dish.name,
    categoryName: l.dish.categoryName,
  }))
