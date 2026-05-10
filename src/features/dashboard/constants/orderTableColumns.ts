export type OrderTableColumn = {
  key: string
  labelKey: string
  thClass?: string
}

export const ORDER_TABLE_COLUMNS: OrderTableColumn[] = [
  { key: 'date', labelKey: 'dashboard.orders.colDate' },
  { key: 'status', labelKey: 'dashboard.orders.colStatus' },
  { key: 'customer', labelKey: 'dashboard.orders.colCustomer' },
  { key: 'contact', labelKey: 'dashboard.orders.colContact' },
  { key: 'address', labelKey: 'dashboard.orders.colAddress' },
  { key: 'items', labelKey: 'dashboard.orders.colItems' },
  { key: 'total', labelKey: 'dashboard.orders.colTotal', thClass: 'text-right' },
]
