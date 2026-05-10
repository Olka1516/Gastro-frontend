import { useShowcaseOrdersTable } from '@/features/dashboard/composables/useShowcaseOrdersTable'
import type { InjectionKey } from 'vue'

export type ShowcaseOrdersTableHelpers = ReturnType<typeof useShowcaseOrdersTable>

export const showcaseOrdersTableKey: InjectionKey<ShowcaseOrdersTableHelpers> =
  Symbol('showcaseOrdersTable')
