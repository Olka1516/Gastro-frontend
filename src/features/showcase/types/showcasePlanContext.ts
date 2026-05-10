import type { EPlan } from '@/types'
import type { ComputedRef, InjectionKey } from 'vue'

export interface ShowcasePlanContext {
  planName: EPlan
  placeSlug: string
}

export const showcasePlanContextKey: InjectionKey<ComputedRef<ShowcasePlanContext | null>> =
  Symbol('showcasePlanContext')
