import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../features/landing/LandingPage.vue') },
    { path: '/dashboard', component: () => import('../features/dashboard/DashboardPage.vue') },
  ],
})

router.beforeEach(async (to, from, next) => {
  const store = useUserStore()
  await store.setUserAuthorized()
  next()
})

export default router
