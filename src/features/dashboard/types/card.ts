
export type CardVariant = 'dark' | 'accent'

export type DashboardCardBind = {
  id: string
  navigateKey: string
  variant?: CardVariant
  clickable?: boolean
  hoverScale?: boolean
  title?: string
  value?: number | string | null
  subtitle?: string
  iconSrc?: string
  iconAlt?: string
  invertIcon?: boolean
  showAvailability?: boolean
  availableCount?: number | null
  unavailableCount?: number | null
  availableText?: string
  unavailableText?: string
  showTitle?: boolean
  showSubtitle?: boolean
  showTopText?: boolean
  showDescription?: boolean
  showAvailable?: boolean
  showUnavailable?: boolean
  showQuick?: boolean
  quickTopText?: string
  quickHeading?: string
  quickDescription?: string
}
