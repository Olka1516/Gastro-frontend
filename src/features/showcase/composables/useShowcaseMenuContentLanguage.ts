import { mapUiLocaleToMenuLanguage } from '@/features/dashboard/utils/categoryApi'
import { getDishDisplayDescription, getDishDisplayName } from '@/features/dashboard/utils/dishApi'
import { useShowcaseMenuLanguageStore } from '@/stores/showcaseMenuLanguageStore'
import type { IDish } from '@/types/menu'
import { storeToRefs } from 'pinia'
import { computed, type MaybeRef, unref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useShowcaseMenuContentLanguage = () => {
  const { locale } = useI18n()
  const menuLangStore = useShowcaseMenuLanguageStore()
  const { enabled: menuLangEnabled, languageCode: menuLanguageCode } = storeToRefs(menuLangStore)

  const menuContentLangCode = computed(() =>
    menuLangEnabled.value ? menuLanguageCode.value : mapUiLocaleToMenuLanguage(locale.value),
  )

  const getDishLabels = (dish: IDish) => ({
    name: getDishDisplayName(dish, menuContentLangCode.value),
    description: getDishDisplayDescription(dish, menuContentLangCode.value),
  })

  const useDishLabels = (dish: MaybeRef<IDish | null | undefined>) =>
    computed(() => {
      const value = unref(dish)
      if (!value) return { name: '', description: '' }
      return getDishLabels(value)
    })

  return {
    menuContentLangCode,
    getDishLabels,
    useDishLabels,
  }
}
