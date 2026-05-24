import { DAILY_TIP_COUNT } from '@/features/dashboard/constants/dailyTips'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

function getDailyTipIndex(date = new Date()): number {
  const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  let hash = 0
  for (let i = 0; i < dayKey.length; i++) {
    hash = (hash << 5) - hash + dayKey.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % DAILY_TIP_COUNT
}

export function useDailyTip() {
  const { t } = useI18n()

  const tipIndex = computed(() => getDailyTipIndex())

  const dailyTipDescription = computed(() =>
    t(`dashboard.home.tip.items.${tipIndex.value}`),
  )

  return { dailyTipDescription }
}
