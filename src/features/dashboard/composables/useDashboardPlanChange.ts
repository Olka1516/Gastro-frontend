import { plans as landingPlans } from '@/features/landing/constants'
import type { Plan } from '@/features/landing/types'
import { getCheckoutId } from '@/services'
import { useUserStore } from '@/stores'
import { EPlan } from '@/types'
import { loadStripe } from '@stripe/stripe-js'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export function useDashboardPlanChange() {
  const userStore = useUserStore()
  const { planName } = storeToRefs(userStore)

  const openDelete = ref(false)
  const isProcessing = ref(false)

  const currentPlan = computed(() => planName.value ?? EPlan.free)

  const loadCheckout = async (value: Plan) => {
    const id = await getCheckoutId({ ...value, returnTo: 'dashboard' })
    const stripe = await stripePromise
    if (!stripe) {
      console.error('Stripe failed to load')
      return
    }
    await stripe.redirectToCheckout({ sessionId: id })
  }

  const selectPlan = async (target: (typeof landingPlans)[number]) => {
    if (target.name === currentPlan.value) return

    if (target.name === EPlan.free) {
      if (currentPlan.value !== EPlan.free) {
        openDelete.value = true
        document.body.style.overflow = 'hidden'
      }
      return
    }

    isProcessing.value = true
    try {
      await loadCheckout(target)
    } finally {
      isProcessing.value = false
    }
  }

  const confirmFreePlan = async (confirmed: boolean) => {
    if (!confirmed) return
    isProcessing.value = true
    try {
      await userStore.putFreePlan()
    } finally {
      isProcessing.value = false
    }
  }

  return {
    landingPlans,
    currentPlan,
    openDelete,
    isProcessing,
    selectPlan,
    confirmFreePlan,
  }
}
