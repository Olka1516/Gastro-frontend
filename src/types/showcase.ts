import type { CurrencyCode } from '@/constants/currency'
import type { MenuDishLayout } from '@/constants/menuDishLayout'

export interface IPlaceBranding {
  menuBackgroundColor: string
  menuIconColor: string
  logo: string
  menuDishLayout?: MenuDishLayout
  currency?: CurrencyCode
  menuWelcomeText?: string
}
