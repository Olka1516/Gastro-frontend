import { getCurrencySymbol, parseCurrency } from '@/constants/currency'
import { intlLocaleForUi } from '@/lang'
import { useUserStore } from '@/stores/user'
import { formatMenuPrice } from '@/utils/formatPrice'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useDashboardCurrency() {
  const { locale, t } = useI18n()
  const { currency: currencyRef } = storeToRefs(useUserStore())

  const currency = computed(() => parseCurrency(currencyRef?.value))

  const numberLocale = computed(() => intlLocaleForUi(locale.value))

  const formatPrice = (amount: number) => {
    const code = currency.value
    const loc = numberLocale.value
    return formatMenuPrice(amount, code, loc)
  }

  const priceFieldLabel = computed(
    () => `${t('inputs.price')} (${getCurrencySymbol(currency.value)})`,
  )

  return { currency, numberLocale, formatPrice, priceFieldLabel }
}
