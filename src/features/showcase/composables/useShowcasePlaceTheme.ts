import { DEFAULT_MENU_DISH_LAYOUT, parseMenuDishLayout } from '@/constants/menuDishLayout'
import type { MenuDishLayout } from '@/constants/menuDishLayout'
import { useShowcaseStore } from '@/stores/showcaseStore'
import { useUserStore } from '@/stores/user'
import { spaceToUnderscore, underscoreToSpace } from '@/utils/textHelpers'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

export const DEFAULT_SHOWCASE_MENU_BG = '#0f0f11'
export const DEFAULT_SHOWCASE_MENU_ICON = '#dc5b41'

export function useShowcasePlaceTheme(placeKey: MaybeRefOrGetter<string>) {
  const showcaseStore = useShowcaseStore()
  const userStore = useUserStore()

  const routePlaceUnderscored = computed(() => String(toValue(placeKey) ?? '').trim())

  const isOwnerPreview = computed(
    () =>
      userStore.isUserAuthorized &&
      !!userStore.placeName &&
      spaceToUnderscore(userStore.placeName) === routePlaceUnderscored.value,
  )

  const menuBackgroundColor = computed(() => {
    const fromApi = showcaseStore.placeBranding?.menuBackgroundColor?.trim()
    if (fromApi) return fromApi
    return DEFAULT_SHOWCASE_MENU_BG
  })

  const menuIconColor = computed(() => {
    const fromApi = showcaseStore.placeBranding?.menuIconColor?.trim()
    if (fromApi) return fromApi
    return DEFAULT_SHOWCASE_MENU_ICON
  })

  const logoUrl = computed(() => showcaseStore.placeBranding?.logo?.trim() || '')

  const displayPlaceName = computed(() => {
    if (isOwnerPreview.value && userStore.placeName) return userStore.placeName
    const key = routePlaceUnderscored.value
    return underscoreToSpace(key) || key
  })

  const menuDishLayout = computed((): MenuDishLayout => {
    const fromApi = showcaseStore.placeBranding?.menuDishLayout
    if (fromApi) return parseMenuDishLayout(fromApi)
    if (isOwnerPreview.value && userStore.menuDishLayout)
      return parseMenuDishLayout(userStore.menuDishLayout)
    return DEFAULT_MENU_DISH_LAYOUT
  })

  return {
    menuBackgroundColor,
    menuIconColor,
    logoUrl,
    displayPlaceName,
    menuDishLayout,
  }
}
