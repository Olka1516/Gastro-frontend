import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../features/landing/LandingPage.vue') },
    { path: '/dashboard', component: () => import('../features/dashboard/DashboardPage.vue') },
    {
      path: '/menu/:id',
      component: () => import('../features/showcase/AppBlock.vue'),
      children: [
        {
          path: '',
          name: 'showcase-place',
          component: () => import('../features/showcase/ShowcasePlanHost.vue'),
        },
        {
          path: 'orders',
          name: 'showcase-place-orders',
          component: () => import('../features/showcase/pro/ProShowcaseOrdersPage.vue'),
        },
        {
          path: 'checkout',
          name: 'showcase-checkout',
          component: () => import('../features/showcase/ShowcaseCheckoutPage.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.path === from.path && to.fullPath !== from.fullPath) {
    next()
    return
  }
  const store = useUserStore()
  await store.setUserAuthorized()
  next()
})

export default router
